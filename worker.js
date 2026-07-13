// Geo redirect in front of the static assets. Visitors from Iran hitting the
// root are sent to the Persian site, unless they've made an explicit language
// choice (the `lang` cookie set by the switcher). Everything else — non-IR
// traffic, any non-root path, all English URLs — is served unchanged.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      const country = request.headers.get("CF-IPCountry");
      const cookie = request.headers.get("Cookie") || "";
      const hasLangPref = /(?:^|;\s*)lang=/.test(cookie);

      if (country === "IR" && !hasLangPref) {
        url.pathname = "/fa/";
        return Response.redirect(url.toString(), 302);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
