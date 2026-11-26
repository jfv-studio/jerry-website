/* jerryflorez.com — Finsweet CMS Slider ↔ Webflow double-init guard.

   Problem this fixes:
   Finsweet CMS Slider rebuilds a slider's slides AFTER Webflow has already
   initialised that slider on its placeholder slides. Webflow then initialises
   it a second time without clearing the first pass, so the nav arrows (and the
   dots / swipe) end up bound TWICE. One click or swipe fires "next" twice, so
   the slider advances two slides at a time — you see 1, 3, 5 … to the end, then
   the loop wraps and catches 2, 4, 6 …  The CMS order itself is correct.

   Fix:
   Re-initialise Webflow exactly once, after Finsweet has finished building the
   slides, so every control fires a single "next". destroy() tears down the
   duplicated handlers, ready() rebinds them once, and ix2.init() restores the
   page interactions. Harmless to re-run on a project page.

   Load on any project/template page that uses a Finsweet CMS Slider. */
(function () {
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push(['cmsslider', function () {
    if (window.Webflow && Webflow.require) {
      try {
        Webflow.destroy();            // clear the duplicated slider handlers
        Webflow.ready();              // rebind the slider ONCE
        var ix = Webflow.require('ix2');
        if (ix && ix.init) ix.init(); // restore Webflow interactions
      } catch (e) {}
    }
  }]);
})();
