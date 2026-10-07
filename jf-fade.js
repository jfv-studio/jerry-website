/* jerryflorez.com — soft blur-in for project-page images.
   Add this to the Works project template (Page Settings → Before </body>, or an Embed).
   Each targeted image starts blurred + transparent and resolves to sharp as it loads —
   matching the front-gallery / nav blur language. Catches Finsweet-cloned slides too. */
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var SEL = '.lightbox-collection-item img, .lightbox-image, .collection-list-slide-image, .w-slide img, .related-projects';
  var MS = 800, BLUR = 14;   /* fade duration (ms) and start blur (px) */

  function reveal(img){ img.style.opacity='1'; img.style.filter='blur(0px)'; }
  function prep(img){
    if(img.dataset.jfFade) return;
    img.dataset.jfFade='1';
    img.style.transition='opacity '+MS+'ms ease, filter '+MS+'ms ease';
    img.style.opacity='0';
    img.style.filter='blur('+BLUR+'px)';
    var go=function(){ requestAnimationFrame(function(){ requestAnimationFrame(reveal.bind(null,img)); }); };
    if(img.complete && img.naturalWidth) go();
    else { img.addEventListener('load', go, {once:true}); img.addEventListener('error', reveal.bind(null,img), {once:true}); }
    /* safety: never leave an image stuck hidden */
    setTimeout(reveal.bind(null,img), MS+2500);
  }
  function scan(){ var n=document.querySelectorAll(SEL); for(var i=0;i<n.length;i++) prep(n[i]); }

  scan();
  document.addEventListener('DOMContentLoaded', scan);
  window.addEventListener('load', scan);
  /* Finsweet copies CMS images into slides after load — watch for them */
  if(window.MutationObserver){
    var mo=new MutationObserver(function(m){ for(var i=0;i<m.length;i++){ if(m[i].addedNodes && m[i].addedNodes.length){ scan(); return; } } });
    try{ mo.observe(document.body,{childList:true,subtree:true}); }catch(e){}
  }
})();
