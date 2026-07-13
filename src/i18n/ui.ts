// Central string dictionary. NO inline UI strings in components — everything
// user-facing lives here, keyed `section.key`. `en` is the source of truth for
// keys; `fa` = fluent Tehran Persian. Rich strings (with <span>/<strong>) are
// rendered via set:html at the call site.

export const languages = {
  en: "English",
  fa: "فارسی",
} as const;

export const defaultLang = "en";

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    // meta
    "meta.title": "Payesh — Crypto Deposit Monitoring Bot",
    "meta.description":
      "Payesh — Real-time cryptocurrency deposit monitoring bot for Telegram. Track Binance, KuCoin, Toobit, and BingX deposits instantly.",

    // header
    "header.brand": "PAYESH",
    "header.brand_sr": "Payesh",
    "header.nav.features": "Features",
    "header.nav.exchanges": "Exchanges",
    "header.nav.demo": "Demo",
    "header.nav.setup": "Setup",
    "header.nav.pricing": "Pricing",
    "header.open_bot": "Open Bot",
    "header.nav_label": "Navigation",
    "header.close_label": "Close navigation",

    // splash
    "splash.line1": "Track",
    "splash.line2": "crypto deposits,",
    "splash.line3": "instantly.",
    "splash.whale_alt":
      "Payesh geometric whale logo with floating crypto icons",

    // features
    "features.title": "Features",
    "features.lead":
      'Everything you need to monitor your crypto deposits. <span class="text-primary">Real-time</span>, <span class="text-primary">secure</span>, and <span class="text-primary">Telegram-native</span>.',
    "features.f1.title": "Multi-Exchange Monitoring",
    "features.f1.desc":
      "Watch Binance, KuCoin, Toobit, and BingX simultaneously from a single Telegram bot.",
    "features.f2.title": "Instant Alerts",
    "features.f2.desc":
      "Real-time HTML-formatted Telegram alerts the second a deposit lands in your account.",
    "features.f3.title": "Smart Reports",
    "features.f3.desc":
      "Daily, weekly, and monthly reports with live USDT value conversion for all deposits.",
    "features.f4.title": "Guaranteed Security",
    "features.f4.desc":
      "100% secure. Uses read-only API keys. We never ask for withdrawal permissions.",

    // tutorial
    "tutorial.title": "Getting Started",
    "tutorial.lead":
      'Connect your exchange to Payesh in <span class="text-primary">9 simple steps</span>.',
    "tutorial.s1.title": "Log in to Exchange",
    "tutorial.s1.desc": "Sign in to your exchange and open API Management.",
    "tutorial.s2.title": "Create API Keys",
    "tutorial.s2.desc":
      "Create keys with <strong>read-only</strong> permission only.",
    "tutorial.s3.title": "Store Keys Safely",
    "tutorial.s3.desc": "Save both keys securely. Never share them publicly.",
    "tutorial.s4.title": "Start the Bot",
    "tutorial.s4.desc":
      "Open Telegram, find <strong>@payeshappbot</strong>, tap Start.",
    "tutorial.s5.title": "Send API Keys",
    "tutorial.s5.desc": "Send your API Key and Secret Key to the bot.",
    "tutorial.s6.title": "Create Channel",
    "tutorial.s6.desc": "Create a Telegram channel for deposit alerts.",
    "tutorial.s7.title": "Add Bot as Admin",
    "tutorial.s7.desc":
      "Add <strong>@payeshappbot</strong> as admin with full access.",
    "tutorial.s8.title": "Forward a Message",
    "tutorial.s8.desc": "Forward any message from your channel to the bot.",
    "tutorial.s9.title": "You're All Set",
    "tutorial.s9.desc": "Payesh will now send instant deposit alerts!",

    // compatibility
    "compatibility.title": "Supported Exchanges & Networks",
    "compatibility.lead":
      'Connect to <span class="text-primary">major exchanges</span> and monitor deposits across <span class="text-primary">popular networks</span>.',
    "compatibility.exchanges_heading": "Supported Exchanges",
    "compatibility.networks_heading": "Supported Networks",

    // showcase
    "showcase.title": "See Payesh in Action",
    "showcase.lead":
      'Real <span class="text-primary">Telegram alerts</span> — exactly what you\'ll receive when a deposit lands.',
    "showcase.tab.deposit": "Deposit Alert",
    "showcase.tab.daily": "Daily Report",
    "showcase.tab.welcome": "Welcome Message",
    "showcase.bot_name": "Payesh | Crypto Deposit Monitor",
    "showcase.bot_tag": "bot",
    "showcase.worker": "Payesh Worker",
    "showcase.admin": "admin",
    "showcase.deposit_success": "Deposit Successful",
    "showcase.deposit_amount": "26.0 USDT — Completed",
    "showcase.label.exchange": "Exchange:",
    "showcase.label.balance": "Balance:",
    "showcase.val.balance": "3,120.19 USDT",
    "showcase.label.network": "Network:",
    "showcase.label.date": "Date:",
    "showcase.val.date": "2026-07-11 01:06:43",
    "showcase.label.to": "To:",
    "showcase.label.from": "From:",
    "showcase.label.txid": "TxID:",
    "showcase.report_btn": "Report",
    "showcase.generate_report": "Generate Report",
    "showcase.select_timeframe": "Select the timeframe for your report:",
    "showcase.daily_report": "Daily Report",
    "showcase.weekly_report": "Weekly Report",
    "showcase.monthly_report": "Monthly Report",
    "showcase.back": "Back",
    "showcase.hello": "Hello, Parham",
    "showcase.welcome_to": "Welcome to Payesh!",
    "showcase.status_label": "Status:",
    "showcase.status_active": "Active",
    "showcase.subscription_label": "Subscription:",
    "showcase.days_left": "1 Days Left",
    "showcase.what_do": "What would you like to do?",
    "showcase.menu.connect": "Connect Exchange",
    "showcase.menu.my_exchanges": "My Exchanges",
    "showcase.menu.subscription": "Subscription",
    "showcase.menu.settings": "Settings",
    "showcase.menu.report": "Report",
    "showcase.menu.free_trial": "Free Trial",
    "showcase.menu.support": "Support",
    "showcase.caption":
      "All alerts include full transaction details, TxID links, and USDT conversion values.",

    // pricing
    "pricing.title": "Pricing",
    "pricing.lead":
      'Simple, transparent pricing. <span class="text-primary">Start free</span>, upgrade when you\'re ready.',
    "pricing.cta": "Get Started",
    "pricing.free.name": "Free Trial",
    "pricing.free.price": "$0",
    "pricing.free.period": "3 days",
    "pricing.free.f1": "Full access to all features",
    "pricing.free.f2": "Up to 2 exchanges",
    "pricing.free.f3": "Instant Telegram alerts",
    "pricing.free.f4": "No credit card required",
    "pricing.free.message": "I'd like to start the free trial",
    "pricing.monthly.name": "Monthly",
    "pricing.monthly.price": "$5",
    "pricing.monthly.period": "/ month",
    "pricing.monthly.badge": "Most Popular",
    "pricing.monthly.f1": "Unlimited exchanges",
    "pricing.monthly.f2": "Instant Telegram alerts",
    "pricing.monthly.f3": "Daily, weekly & monthly reports",
    "pricing.monthly.f4": "Multi-exchange support",
    "pricing.monthly.message":
      "I'd like to subscribe to the Monthly plan (5 USDT / 30 days)",
    "pricing.annual.name": "Annually",
    "pricing.annual.price": "$40",
    "pricing.annual.period": "/ year",
    "pricing.annual.badge": "Best Value",
    "pricing.annual.f1": "Everything in Monthly",
    "pricing.annual.f2": "Priority support",
    "pricing.annual.f3": "Save $20 / year",
    "pricing.annual.message":
      "I'd like to subscribe to the Annual plan ($40 / year)",

    // footer
    "footer.brand": "Payesh",
    "footer.rights": "All rights reserved.",

    // language switcher
    "switcher.aria": "Switch to Persian",
  },
  fa: {
    // meta
    "meta.title": "پایش — ربات پایش لحظه‌ای واریز رمزارز در تلگرام",
    "meta.description":
      "پایش — ربات تلگرام برای پایش لحظه‌ای واریز رمزارز. واریزهای بایننس، کوکوین، توبیت و بینگ‌ایکس را همان لحظه دنبال کنید.",

    // header
    "header.brand": "پایش",
    "header.brand_sr": "پایش",
    "header.nav.features": "امکانات",
    "header.nav.exchanges": "صرافی‌ها",
    "header.nav.demo": "نمونه",
    "header.nav.setup": "راه‌اندازی",
    "header.nav.pricing": "تعرفه",
    "header.open_bot": "ورود به ربات",
    "header.nav_label": "منو",
    "header.close_label": "بستن منو",

    // splash
    "splash.line1": "رصد هوشمند",
    "splash.line2": "واریز رمزارز",
    "splash.line3": "در تلگرام",
    "splash.whale_alt": "لوگوی هندسی نهنگ پایش با آیکون‌های شناور رمزارز",

    // features
    "features.title": "امکانات",
    "features.lead":
      'هر چیزی که برای پایش واریزهای رمزارزت لازم داری. <span class="text-primary">لحظه‌ای</span>، <span class="text-primary">امن</span> و <span class="text-primary">یکپارچه با تلگرام</span>.',
    "features.f1.title": "پایش چند صرافی",
    "features.f1.desc":
      "بایننس، کوکوین، توبیت و بینگ‌ایکس را همزمان از یک ربات تلگرام زیر نظر بگیر.",
    "features.f2.title": "اعلان فوری",
    "features.f2.desc":
      "همان لحظه که واریز به حسابت می‌نشیند، اعلان مرتب و خوانا در تلگرام دریافت کن.",
    "features.f3.title": "گزارش‌های هوشمند",
    "features.f3.desc":
      "گزارش‌های روزانه، هفتگی و ماهانه همراه با تبدیل لحظه‌ای ارزش همه‌ی واریزها به تتر.",
    "features.f4.title": "امنیت تضمین‌شده",
    "features.f4.desc":
      "۱۰۰٪ امن. فقط از کلید API فقط‌خواندنی استفاده می‌کند و هرگز دسترسی برداشت نمی‌خواهد.",

    // tutorial
    "tutorial.title": "شروع کار",
    "tutorial.lead":
      'صرافی‌ات را در <span class="text-primary">۹ گام ساده</span> به پایش وصل کن.',
    "tutorial.s1.title": "ورود به صرافی",
    "tutorial.s1.desc": "وارد حساب صرافی‌ات شو و بخش مدیریت API را باز کن.",
    "tutorial.s2.title": "ساخت کلید API",
    "tutorial.s2.desc":
      "کلیدها را فقط با دسترسی <strong>فقط‌خواندنی</strong> بساز.",
    "tutorial.s3.title": "نگهداری امن کلیدها",
    "tutorial.s3.desc":
      "هر دو کلید را جای امن ذخیره کن. هیچ‌وقت آن‌ها را عمومی نکن.",
    "tutorial.s4.title": "اجرای ربات",
    "tutorial.s4.desc":
      "تلگرام را باز کن، <strong>@payeshappbot</strong> را پیدا کن و Start را بزن.",
    "tutorial.s5.title": "ارسال کلیدها",
    "tutorial.s5.desc": "کلید API و کلید Secret را برای ربات بفرست.",
    "tutorial.s6.title": "ساخت کانال",
    "tutorial.s6.desc": "یک کانال تلگرام برای اعلان‌های واریز بساز.",
    "tutorial.s7.title": "افزودن ربات به‌عنوان ادمین",
    "tutorial.s7.desc":
      "<strong>@payeshappbot</strong> را با دسترسی کامل به‌عنوان ادمین اضافه کن.",
    "tutorial.s8.title": "فوروارد یک پیام",
    "tutorial.s8.desc": "یک پیام از کانالت را برای ربات فوروارد کن.",
    "tutorial.s9.title": "تمام شد!",
    "tutorial.s9.desc":
      "از این به بعد پایش اعلان‌های واریز را همان لحظه برایت می‌فرستد!",

    // compatibility
    "compatibility.title": "صرافی‌ها و شبکه‌های پشتیبانی‌شده",
    "compatibility.lead":
      'به <span class="text-primary">صرافی‌های بزرگ</span> وصل شو و واریزها را روی <span class="text-primary">شبکه‌های پرکاربرد</span> زیر نظر بگیر.',
    "compatibility.exchanges_heading": "صرافی‌های پشتیبانی‌شده",
    "compatibility.networks_heading": "شبکه‌های پشتیبانی‌شده",

    // showcase
    "showcase.title": "پایش را در عمل ببین",
    "showcase.lead":
      'اعلان‌های <span class="text-primary">واقعی تلگرام</span> — دقیقاً همان چیزی که با هر واریز دریافت می‌کنی.',
    "showcase.tab.deposit": "اعلان واریز",
    "showcase.tab.daily": "گزارش روزانه",
    "showcase.tab.welcome": "پیام خوش‌آمد",
    "showcase.bot_name": "پایش | پایشگر واریز رمزارز",
    "showcase.bot_tag": "ربات",
    "showcase.worker": "کارگزار پایش",
    "showcase.admin": "ادمین",
    "showcase.deposit_success": "واریز موفق",
    "showcase.deposit_amount": "۲۶٫۰ تتر — تکمیل‌شده",
    "showcase.label.exchange": "صرافی:",
    "showcase.label.balance": "موجودی:",
    "showcase.val.balance": "۳٬۱۲۰٫۱۹ تتر",
    "showcase.label.network": "شبکه:",
    "showcase.label.date": "تاریخ:",
    "showcase.val.date": "۲۰۲۶-۰۷-۱۱ ۰۱:۰۶:۴۳",
    "showcase.label.to": "به:",
    "showcase.label.from": "از:",
    "showcase.label.txid": "شناسه تراکنش:",
    "showcase.report_btn": "گزارش",
    "showcase.generate_report": "ساخت گزارش",
    "showcase.select_timeframe": "بازه‌ی زمانی گزارش را انتخاب کن:",
    "showcase.daily_report": "گزارش روزانه",
    "showcase.weekly_report": "گزارش هفتگی",
    "showcase.monthly_report": "گزارش ماهانه",
    "showcase.back": "بازگشت",
    "showcase.hello": "سلام پرهام",
    "showcase.welcome_to": "به پایش خوش اومدی!",
    "showcase.status_label": "وضعیت:",
    "showcase.status_active": "فعال",
    "showcase.subscription_label": "اشتراک:",
    "showcase.days_left": "۱ روز باقی‌مانده",
    "showcase.what_do": "چه کاری می‌خواهی انجام بدهی؟",
    "showcase.menu.connect": "اتصال صرافی",
    "showcase.menu.my_exchanges": "صرافی‌های من",
    "showcase.menu.subscription": "اشتراک",
    "showcase.menu.settings": "تنظیمات",
    "showcase.menu.report": "گزارش",
    "showcase.menu.free_trial": "آزمایشی",
    "showcase.menu.support": "پشتیبانی",
    "showcase.caption":
      "همه‌ی اعلان‌ها شامل جزئیات کامل تراکنش، لینک شناسه تراکنش و تبدیل ارزش به تتر هستند.",

    // pricing
    "pricing.title": "تعرفه",
    "pricing.lead":
      'تعرفه‌ی ساده و شفاف. <span class="text-primary">رایگان شروع کن</span> و هر وقت آماده بودی ارتقا بده.',
    "pricing.cta": "شروع کن",
    "pricing.free.name": "آزمایشی",
    "pricing.free.price": "رایگان",
    "pricing.free.period": "۳ روزه",
    "pricing.free.f1": "دسترسی کامل به همه‌ی امکانات",
    "pricing.free.f2": "تا ۲ صرافی",
    "pricing.free.f3": "اعلان‌های لحظه‌ای تلگرام",
    "pricing.free.f4": "بدون نیاز به کارت بانکی",
    "pricing.free.message": "می‌خواهم دوره‌ی آزمایشی را شروع کنم",
    "pricing.monthly.name": "ماهانه",
    "pricing.monthly.price": "۵ دلار",
    "pricing.monthly.period": "ماهانه",
    "pricing.monthly.badge": "محبوب‌ترین",
    "pricing.monthly.f1": "صرافی نامحدود",
    "pricing.monthly.f2": "اعلان‌های لحظه‌ای تلگرام",
    "pricing.monthly.f3": "گزارش‌های روزانه، هفتگی و ماهانه",
    "pricing.monthly.f4": "پشتیبانی از چند صرافی",
    "pricing.monthly.message":
      "می‌خواهم اشتراک ماهانه (۵ تتر / ۳۰ روز) را تهیه کنم",
    "pricing.annual.name": "سالانه",
    "pricing.annual.price": "۴۰ دلار",
    "pricing.annual.period": "سالانه",
    "pricing.annual.badge": "به‌صرفه‌ترین",
    "pricing.annual.f1": "همه‌ی امکانات پلن ماهانه",
    "pricing.annual.f2": "پشتیبانی ویژه",
    "pricing.annual.f3": "۲۰ دلار صرفه‌جویی در سال",
    "pricing.annual.message":
      "می‌خواهم اشتراک سالانه (۴۰ دلار در سال) را تهیه کنم",

    // footer
    "footer.brand": "پایش",
    "footer.rights": "تمامی حقوق محفوظ است.",

    // language switcher
    "switcher.aria": "تغییر به انگلیسی",
  },
} satisfies Record<Lang, Record<string, string>>;
