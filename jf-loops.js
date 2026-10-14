/* jerryflorez.com — motion loops for project galleries.
   Certain gallery stills have a matching 3s silent video loop. This script finds those
   stills (by their Webflow filename) and plays the loop on hover, cross-fading from the
   still. Works in the slider and the grid. No CMS changes needed. */
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  /* map: substring of the still's filename -> its loop video URL.
     These keys are the 24 poster frames in the Telling the Bees
     `additional-images` loop-column (slider removed); each poster is the first
     frame of its loop, so the cross-fade from still to video is seamless.
     Poem frames (20-23) carry the gold subtitle burned into both poster and loop. */
  var LOOPS={
    'ttb-loop-01': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6b1f9f16ce65011e382_ttb-loop-01.mp4',
    'ttb-loop-02': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6b34f05e5779886abf5_ttb-loop-02.mp4',
    'ttb-loop-03': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6b599529ad0936838c7_ttb-loop-03.mp4',
    'ttb-loop-04': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6ba936f18fcb59a166d_ttb-loop-04.mp4',
    'ttb-loop-05': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6bc99529ad093683ceb_ttb-loop-05.mp4',
    'ttb-loop-06': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6c1936f18fcb59a1741_ttb-loop-06.mp4',
    'ttb-loop-07': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6c4db838fd3ba15646f_ttb-loop-07.mp4',
    'ttb-loop-08': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6c9ff26d889fed394a6_ttb-loop-08.mp4',
    'ttb-loop-09': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6cc44e7787aaf57091c_ttb-loop-09.mp4',
    'ttb-loop-10': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6cf2abb0f33f9852499_ttb-loop-10.mp4',
    'ttb-loop-11': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6d2189a91346a9b5aa8_ttb-loop-11.mp4',
    'ttb-loop-12': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6d49b4685aa2084bdc0_ttb-loop-12.mp4',
    'ttb-loop-13': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6d68eba02df08cfc619_ttb-loop-13.mp4',
    'ttb-loop-14': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6d82f8ba4cda1e9b11d_ttb-loop-14.mp4',
    'ttb-loop-15': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6dc2abb0f33f9852ad7_ttb-loop-15.mp4',
    'ttb-loop-16': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6de43bed307c27bb365_ttb-loop-16.mp4',
    'ttb-loop-17': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6e02abb0f33f9852d10_ttb-loop-17.mp4',
    'ttb-loop-18': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6e4d1b5b1336b374715_ttb-loop-18.mp4',
    'ttb-loop-19': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6e7ff26d889fed39f68_ttb-loop-19.mp4',
    'ttb-loop-20': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6e92abb0f33f985329a_ttb-loop-20.mp4',
    'ttb-loop-21': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6eb99b8781e7241ba38_ttb-loop-21.mp4',
    'ttb-loop-22': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6ed45c5a3149058184e_ttb-loop-22.mp4',
    'ttb-loop-23': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6ef95c370074db1bb29_ttb-loop-23.mp4',
    'ttb-loop-24': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6acec6f100645de67a7a2582_ttb-loop-24.mp4'
  };
  function matchUrl(s){ for(var k in LOOPS){ if(s.indexOf(k)>=0) return LOOPS[k]; } return null; }

  function enhance(img){
    if(img.dataset.jfLoop) return;
    var src=img.currentSrc||img.getAttribute('src')||'';
    var url=matchUrl(src); if(!url) return;
    img.dataset.jfLoop='1';
    var host=img.parentNode; if(!host) return;
    if(getComputedStyle(host).position==='static') host.style.position='relative';
    var v=document.createElement('video');
    v.src=url; v.muted=true; v.loop=true; v.playsInline=true;
    v.setAttribute('muted',''); v.setAttribute('playsinline',''); v.preload='metadata';
    v.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .55s ease;pointer-events:none;z-index:2;';
    host.appendChild(v);
    var trigger=img.closest('.w-slide')||img.closest('.lightbox-collection-item')||host;
    var hideT;
    function on(){ clearTimeout(hideT); var p=v.play(); if(p&&p.catch)p.catch(function(){}); v.style.opacity='1'; }
    function off(){ v.style.opacity='0'; hideT=setTimeout(function(){ try{v.pause(); v.currentTime=0;}catch(e){} },600); }
    trigger.addEventListener('mouseenter',on);
    trigger.addEventListener('mouseleave',off);
    /* touch: tap toggles */
    trigger.addEventListener('click',function(){ v.style.opacity==='1'?off():on(); },{passive:true});
  }
  function scan(){ var n=document.querySelectorAll('img'); for(var i=0;i<n.length;i++) enhance(n[i]); }
  scan();
  document.addEventListener('DOMContentLoaded',scan);
  window.addEventListener('load',scan);
  if(window.MutationObserver){
    try{ new MutationObserver(function(){scan();}).observe(document.body,{childList:true,subtree:true}); }catch(e){}
  }
})();
