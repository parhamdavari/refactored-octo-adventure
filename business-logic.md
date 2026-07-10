# Payesh — Business Logic Document

## What is Payesh?

Payesh is a **cryptocurrency deposit monitoring service** delivered through Telegram. It watches exchange wallets for incoming deposits and sends real-time alerts to a user's Telegram channel. Think of it as a personal deposit watchdog — connect your exchange API, point it at a channel, and get notified the moment money lands.

---

## Target Users

- **Crypto traders** who receive deposits across multiple exchanges and want instant, centralized alerts
- **OTC desks / P2P operators** who need to confirm incoming payments quickly
- **Small teams** managing shared exchange accounts who need channel-based notifications

The primary market is **Iran** (Farsi-first, BSC/BEP20 payments), with English as the secondary language.

---

## Core Value Proposition

| Problem | Payesh Solution |
|---|---|
| Logging into exchanges to check deposits is slow | Real-time alerts sent to your Telegram channel |
| Managing multiple exchanges is fragmented | One bot monitors multiple exchanges simultaneously |
| Need to confirm payments for P2P/OTC deals instantly | Instant alerts with full tx details (amount, network, addresses) |
| Want historical deposit summaries | Daily, weekly, monthly reports with USDT conversion |

---

## How It Works — End to End

### 1. Onboarding (via Telegram Bot)

User starts the Payesh master bot on Telegram and goes through a setup wizard:

1. **Choose exchange** — Select from supported exchanges (Toobit, Binance, BingX, KuCoin)
2. **Enter API credentials** — API Key + Secret Key (read-only permissions only)
3. **Verify keys** — Bot validates credentials live against the exchange via ccxt
4. **Connect Telegram channel** — User provides channel ID; bot must be added as channel admin
5. **Done** — Worker node starts monitoring that exchange for deposits

### 2. Deposit Monitoring (Worker Process)

Each connected exchange runs as an independent worker process:

- Polls the exchange every **2 minutes** for recent deposits (last 5)
- Detects new deposits by checking against a deduplication database
- Classifies deposit status: **Completed**, **Processing**, **Failed**, **Unknown**
- Sends a rich HTML alert to the user's Telegram channel with:
  - Amount and currency
  - Exchange name
  - Current balance of that currency
  - Network (chain)
  - Date/time
  - Deposit addresses (from/to)
  - Transaction ID
- Runs on **Linux (systemd)** in production; local dev mode on macOS

### 3. Subscription & Payment

- **30-day subscription** for **5 USDT** (BSC/BEP20 network)
- Payment flow:
  1. User receives wallet address
  2. Sends USDT to the address
  3. Submits the transaction ID (TxID) to the bot
  4. Admin receives a notification with approve/reject buttons
  5. On approval: subscription extended 30 days, all user's worker nodes restart
  6. On rejection: user notified
- When subscription expires:
  - All worker nodes are automatically stopped
  - User receives expiry notification
  - Exchange monitoring halts until renewed
- **3-day free trial** available once per user, activated instantly

### 4. Reports

Users can generate deposit reports on demand:

| Report | Period |
|---|---|
| Daily | Since midnight (user's timezone) |
| Weekly | Since configured week start day |
| Monthly | Since 1st of current month |

Reports show:
- Deposits grouped by currency
- Total amount per currency
- **USDT-equivalent value** (fetched live from Binance)
- Total portfolio value in USDT

### 5. User Settings

| Setting | Options |
|---|---|
| Timezone | Any IANA timezone (e.g., `Asia/Tehran`, `Europe/Stockholm`) |
| Week start day | Saturday, Sunday, or Monday |
| Language | English, Farsi |

---

## User Roles

### Regular User
- Connect/manage exchange monitors
- View subscription status
- Generate reports
- Manage settings
- Activate free trial

### Super Admin
- Receives payment approval requests
- Approves or rejects subscription payments (with one click)
- Gets notified of every new visitor to the bot
- Has full access to all user management functions

---

## Supported Exchanges

| Exchange | ID |
|---|---|
| Toobit | `toobit` |
| Binance | `binance` |
| BingX | `bingx` |
| KuCoin | `kucoin` |

API keys are validated both by format (regex) and live connection test (ccxt `fetch_balance`).

---

## Database Entities

### Users
| Field | Description |
|---|---|
| `user_id` | Telegram user ID (primary key) |
| `expire_date` | Subscription expiration timestamp |
| `is_trial_used` | Whether free trial has been claimed |
| `language` | `en` or `fa` |
| `timezone` | IANA timezone string |
| `week_start` | Day of week (0=Monday, 5=Saturday, 6=Sunday) |
| `username`, `first_name`, `last_name` | Telegram profile info |
| `last_seen` | Last interaction timestamp |

### Transactions
| Field | Description |
|---|---|
| `txid` | Exchange-specific transaction ID (primary key) |
| `exchange` | Exchange name |
| `user_id` | Owner's Telegram ID |
| `currency` | Cryptocurrency symbol |
| `amount` | Deposit amount |
| `created_at` | When the deposit was detected |

---

## Key User Journeys

### New User — First-Time Setup
```
Start Bot → Welcome Screen → Activate Free Trial → Connect Exchange
→ Enter API Keys → Verify Keys → Set Channel → Alerts Begin
```

### Returning User — Check Status
```
Start Bot → View Status (Active/Expired) → My Exchanges → View Details
```

### Subscription Renewal
```
Subscription Expires → Bot Stops Workers → User Pays USDT
→ Submits TxID → Admin Approves → Workers Restart → Monitoring Resumes
```

### Generate Report
```
Start Bot → Report → Choose Timeframe → Report Generated
(shows deposits, amounts, USDT values)
```

---

## Notifications & Alerts

### To User's Channel (Deposit Alerts)
- Triggered on every new deposit detected
- Rich HTML formatting with full transaction details
- Status indicators: ✅ Completed, 🟡 Processing, 🔴 Failed, 🔵 Status Update

### To Admin
- New visitor notifications (when a user starts the bot)
- Payment approval requests (with approve/reject inline buttons)

### To User (System Messages)
- Subscription extended / declined
- License expired
- Exchange added / removed / updated

---

## Internationalization

- **English** (default)
- **Farsi** (primary market language)
- Language selection persists per user
- All bot messages are fully translated
- Worker alerts also respect user language preference

---

## Architecture Summary

```
┌─────────────────────────────────────────────┐
│              MASTER BOT (main.py)            │
│  ┌─────────────┐  ┌───────────────────────┐  │
│  │  Telegram    │  │  SQLite Database      │  │
│  │  Bot API     │  │  (users, transactions)│  │
│  └─────────────┘  └───────────────────────┘  │
│         │                                     │
│  ┌──────┴──────┐                             │
│  │  Config      │  Manages user accounts,    │
│  │  Files       │  subscriptions, setup,     │
│  │  (.env)      │  payments, settings        │
│  └──────┬──────┘                             │
└─────────┼────────────────────────────────────┘
          │ One .env per exchange connection
          ▼
┌─────────────────────────────────────────────┐
│           WORKER (worker.py)                 │
│  ┌─────────────┐  ┌───────────────────────┐  │
│  │  ccxt        │  │  Telegram Bot         │  │
│  │  (exchange)  │  │  (channel alerts)     │  │
│  └─────────────┘  └───────────────────────┘  │
│  Polls every 2 min → Detects deposits        │
│  → Sends alerts to user's channel            │
└─────────────────────────────────────────────┘
```

---

## Business Model

- **Revenue**: 5 USDT / 30-day subscription per user
- **Costs**: Server hosting (Azure Linux), Telegram bot token (free), exchange API access (free)
- **Growth levers**: Free 3-day trial, multi-exchange support, bilingual (Iran + international)
- **Payment method**: Manual USDT transfer (BSC/BEP20) with admin approval
