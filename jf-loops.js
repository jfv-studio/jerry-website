/* jerryflorez.com — motion loops for project galleries.
   Certain gallery stills have a matching 3s silent video loop. This script finds those
   stills (by their Webflow filename) and plays the loop on hover, cross-fading from the
   still. Works in the slider and the grid. No CMS changes needed. */
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  /* map: substring of the still's filename -> its loop video URL.
     These keys are the 6 poster frames in the Telling the Bees
     `additional-images` column; each poster is the first frame of its loop,
     so the cross-fade from still to video is seamless. */
  var LOOPS={
    'ttb-loop-01': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6ac91652f4cdaff775b5e626_ttb-loop-87s-flowers.mp4',
    'ttb-loop-02': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6ac9164d050e6f4f39e7798a_ttb-loop-120s-bee-asters.mp4',
    'ttb-loop-03': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6ac9164fa4ac5cd81349dd35_ttb-loop-345s-hive2.mp4',
    'ttb-loop-04': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6ac9164fc443597661ec87f0_ttb-loop-348s-beekeeper-hive.mp4',
    'ttb-loop-05': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6ac91650d8d09e047d99fda8_ttb-loop-429s-flowers2.mp4',
    'ttb-loop-06': 'https://cdn.prod.website-files.com/602d605a12decb1b2d8eda8c/6ac91651a4ac5cd81349de10_ttb-loop-690s-flower-lace.mp4'
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
