/* jerryflorez.com — pre-footer logo wall.
   Two centred, reflowing groups of red marks (Featured in / Work and collaborations),
   ordered by prestige. Transparent — drops into a cover div.
   Embed:  <div id="jf-logos"></div>
           <script src="https://cdn.jsdelivr.net/gh/jfv-studio/jerry-website@<hash>/jf-logos.js"></script>
   Images load from img/logos/ relative to this script, so they ride the same @hash. */
(function () {
  var S = document.currentScript;
  var BASE = (S && S.src ? S.src : '').replace(/\/[^\/]*$/, '/') + 'img/logos/';

  var FEATURED = [
    ['vogue-poland', 'Vogue'],
    ['wallpaper', 'Wallpaper*'],
    ['royal-academy', 'Royal Academy of Arts'],
    ['photographers-gallery', 'The Photographers’ Gallery'],
    ['dezeen', 'Dezeen'],
    ['evening-standard', 'Evening Standard'],
    ['architects-journal', 'The Architects’ Journal'],
    ['la-vanguardia', 'La Vanguardia'],
    ['reference-point', 'Reference Point'],
    ['parallax', 'Parallax'],
    ['french-fries', 'French Fries Magazine']
  ];
  var WORK = [
    ['apple', 'Apple'],
    ['riba', 'RIBA'],
    ['ual', 'University of the Arts London'],
    ['national-trust', 'National Trust'],
    ['nla', 'New London Architecture'],
    ['lsa', 'London School of Architecture'],
    ['academia', 'Academia'],
    ['pensaer', 'Pensaer'],
    ['barton', 'Barton'],
    ['hypha-studios', 'Hypha Studios'],
    ['kolekt', 'KOLEKT'],
    ['collect', 'Collect'],
    ['dorado', 'Dorado London'],
    ['aelfred', 'Ælfred'],
    ['livesey-exchange', 'Livesey Exchange'],
    ['phoenix-ch', 'Phoenix Community Housing'],
    ['smiths', 'SMITHS'],
    ['pebble-haus', 'Pebble Haus']
  ];

  var CSS = '' +
    '#jf-logos{--red:#df0707;--display:"Bluunext Webfont","Bluunext Titling","Bluunext",ui-sans-serif,-apple-system,sans-serif;' +
      'max-width:1000px;margin:0 auto;text-align:center;box-sizing:border-box;' +
      'padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:clamp(24px,5vw,56px);}' +
    '#jf-logos *{box-sizing:border-box;}' +
    '#jf-logos .jlw-group{margin-bottom:clamp(30px,5vw,52px);}' +
    '#jf-logos .jlw-group:last-child{margin-bottom:0;}' +
    '#jf-logos .jlw-label{font-family:var(--display);font-weight:700;font-size:clamp(12px,1vw,16px);' +
      'letter-spacing:.02em;text-transform:uppercase;color:currentColor;opacity:.86;margin:0 0 clamp(18px,3vw,30px);}' +
    '#jf-logos .jlw-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;' +
      'gap:clamp(22px,3.2vw,44px) clamp(26px,4vw,52px);}' +
    '#jf-logos .jlw-cell{display:flex;align-items:center;justify-content:center;}' +
    '#jf-logos .jlw-cell img{height:clamp(26px,3.4vw,38px);width:auto;max-width:min(210px,64vw);object-fit:contain;' +
      'opacity:.9;transition:opacity .25s ease;}' +
    '#jf-logos .jlw-cell img:hover{opacity:1;}';

  function row(list) {
    var r = document.createElement('div');
    r.className = 'jlw-row';
    list.forEach(function (it) {
      var cell = document.createElement('div');
      cell.className = 'jlw-cell';
      var img = document.createElement('img');
      img.src = BASE + it[0] + '-red.png';
      img.alt = it[1];
      img.loading = 'lazy';
      cell.appendChild(img);
      r.appendChild(cell);
    });
    return r;
  }
  function group(label, list) {
    var g = document.createElement('div');
    g.className = 'jlw-group';
    var l = document.createElement('p');
    l.className = 'jlw-label';
    l.textContent = label;
    g.appendChild(l);
    g.appendChild(row(list));
    return g;
  }

  function build() {
    var host = document.getElementById('jf-logos');
    if (!host || host.getAttribute('data-built')) return;
    host.setAttribute('data-built', '1');
    var style = document.createElement('style');
    style.textContent = CSS;
    host.appendChild(style);
    host.appendChild(group('Featured in', FEATURED));
    host.appendChild(group('Work and collaborations', WORK));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
