// Browser Redirect
//
// Overview
// ----------------------------------------------------------------------------
// Redirect unsupported browsers to a friendly landing page prompting the user
// to upgrade their browser.
//
// The live version of this script live at: https://scholasticahq.com/scripts/browser_redirect.js
//
// Background
// ----------------------------------------------------------------------------
// The Internet has decided that browser detection is a bad practice. Instead,
// convention argues, you should detect specific features and provide fallbacks
// for browsers which don't support a given feature. This way, everyone can use
// the site, they just might not enjoy the same feature set as modern browsers.
// That's fine in theory. In practice, we need to redirect bad browsers. In order
// to ensure our users have a good experience, we need to QA test and debug any
// browser they might be using. Practically, we can only afford to check a few
// versions back. Beyond that, the site _might_ work fine but we can't be
// confident. All things considered, it's better for them to see a friendly
// redirect page than encounter bugs when trying to use the site.
//
// Implementation
// ----------------------------------------------------------------------------
// Inspired by [Modernizr](http://modernizr.com), we can use feature detection
// (rather than checking user agent) to detect the user's browser. To do this,
// we need to find a specific feature which is supported only by the modern
// browsers which should have access to our application.
//
// For us, the perfect feature is `String.prototype.includes` as this is
// supported all modern browsers and not IE11. Furthermore, because we're
// merely checking for the presence of a function, we don't need any libraries.
//
// While a bit indirect, this solution is _much more reliable_ than trying to
// determine browser based on user agent sting.
//
// For exactly which browser versions are excluded see:
// https://caniuse.com/#feat=es6-string-includes
//
// Usage
// ----------------------------------------------------------------------------
// There are two ways to use this script. The easiest way is to simply include
// this script at the very top of your `head` tag:
//
//    <script src="https://s3.amazonaws.com/scholasticahq.com/scripts/browser_redirect.js"></script>
//
// This script is publically available, so you can use it anywhere with no
// dependencies.
//
// _Note: Please manually update this live script any time you make changes to
// this file. We could automate this step, but this file changes very
// infrequently, so probably not worth it._
//
// Alternatively, you can `import` this script in your webpack bundle. This can
// be a good option if, for example, you don't want to encure the cost of an
// additional web request.
//
// Regardless of how you include the script, it is critical that you include it
// before any other scripts. This prevents an important gotcha because if some
// other script throws an error (very possible in an old browser) it could
// prevent further execution and thus your redirect code will never run. For
// example, if you load a recent version of jQuery before this script, then
// jQuery will throw an error in IE8, preventing further execution and causing
// your redirect code to fail.
//
(function() {
  var webCrawler = /bot|googlebot|crawler/i.test(navigator.userAgent)
  var badBrowser = typeof String.prototype.includes === "undefined"

  if (!webCrawler && badBrowser) {
    window.location = "https://scholasticahq.com/browser-redirect";
  }
}).call(this);
