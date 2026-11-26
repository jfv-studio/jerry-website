/* jerryflorez.com — slider arrow-cursor.

   Over a Webflow slider the mouse becomes a ← / → arrow with a "current / total"
   fraction; clicking the left or right half advances the slider that way.
   Self-contained: injects its own styles and cursor element, so it loads as a
   single <script src>. Works with Finsweet-built sliders (reads slides/dots live).

   Note the pointer-events:none rule on the native arrows: those arrows are
   "wide-area" and were firing on the same physical click as this script's
   arrow.click(), advancing TWO slides per click. Disabling their pointer events
   leaves this script the single driver (a programmatic .click() still works),
   so each click advances exactly one slide. */
(function () {
  if (window.__jfCursor) return;
  window.__jfCursor = 1;

  var CSS = [
    '.w-slider.rs-arrow-slider, .w-slider.rs-arrow-slider * { cursor: none !important; }',
    '.w-slider.rs-arrow-slider .w-slider-arrow-left, .w-slider.rs-arrow-slider .w-slider-arrow-right { pointer-events: none; }',
    '.rs-cursor{ position:fixed; top:0; left:0; z-index:9999; display:flex; align-items:center; gap:8px; padding:8px 12px; transform:translate(-50%,-50%); pointer-events:none; opacity:0; transition:opacity .15s ease; font-family:inherit; font-size:13px; letter-spacing:.02em; color:#fff; mix-blend-mode:difference; white-space:nowrap; will-change:transform; }',
    '.rs-cursor.is-visible{ opacity:1; }',
    '.rs-cursor .rs-arrow{ font-size:20px; line-height:1; }',
    '.rs-cursor .rs-frac{ font-variant-numeric:tabular-nums; opacity:.85; }'
  ].join('\n');

  function init() {
    var sliders = document.querySelectorAll('.w-slider');
    if (!sliders.length) return;

    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    var cursor = document.createElement('div');
    cursor.className = 'rs-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span class="rs-arrow">←</span><span class="rs-frac">1 / 1</span>';
    document.body.appendChild(cursor);

    var arrowEl = cursor.querySelector('.rs-arrow');
    var fracEl  = cursor.querySelector('.rs-frac');
    var activeSlider = null;
    var goingRight = true;

    function updateFraction() {
      if (!activeSlider) return;
      var dots = activeSlider.querySelectorAll('.w-slider-dot');
      if (!dots.length) { fracEl.textContent = ''; return; }
      var total = dots.length, current = 1;
      dots.forEach(function (d, i) { if (d.classList.contains('w-active')) current = i + 1; });
      fracEl.textContent = current + ' / ' + total;
    }

    sliders.forEach(function (slider) {
      slider.classList.add('rs-arrow-slider');

      slider.addEventListener('mouseenter', function () {
        activeSlider = slider;
        cursor.classList.add('is-visible');
        updateFraction();
      });
      slider.addEventListener('mouseleave', function () {
        activeSlider = null;
        cursor.classList.remove('is-visible');
      });
      slider.addEventListener('mousemove', function (e) {
        var rect = slider.getBoundingClientRect();
        goingRight = (e.clientX - rect.left) > rect.width / 2;
        arrowEl.textContent = goingRight ? '→' : '←';
      });
      slider.addEventListener('click', function () {
        var arrow = slider.querySelector(goingRight ? '.w-slider-arrow-right' : '.w-slider-arrow-left');
        if (arrow) arrow.click();
        setTimeout(updateFraction, 50);
      });
    });

    document.addEventListener('mousemove', function (e) {
      cursor.style.transform = 'translate(calc(-50% + ' + e.clientX + 'px), calc(-50% + ' + e.clientY + 'px))';
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
