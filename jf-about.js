/* jerryflorez.com — About page "field of disciplines" diagram.
   Minimalist / avant-garde, monospace. Config via data-attrs on #jf-web:
   data-core, data-discs ("Label:weight, ..."), data-ink ("r,g,b"), data-bg, data-font */
(function(){
  var wrap=document.getElementById('jf-web');
  if(!wrap) return;
  var cv=document.getElementById('jf-canvas');
  if(!cv){
    cv=document.createElement('canvas');
    cv.id='jf-canvas';
    cv.style.cssText='display:block;width:100%;height:100%;';
    wrap.appendChild(cv);
  }
  var ctx=cv.getContext('2d');

  var CORE=wrap.getAttribute('data-core')||'Curiosity';
  var INK=wrap.getAttribute('data-ink')||'230,57,46';
  var BG=wrap.getAttribute('data-bg')||'#000000';
  var FONT=wrap.getAttribute('data-font')
    ||'ui-monospace,"SF Mono",Menlo,Monaco,"Roboto Mono",monospace';
  var raw=wrap.getAttribute('data-discs')
    ||'Photography:50, Art & Installation:20, Architecture:42, '
     +'Drawing:15, Brand & Identity:33, Sculpture:26';
  var DISCS=raw.split(',').map(function(s){
    var p=s.split(':');
    return [(p[0]||'').trim(), parseFloat(p[1])||20];
  }).filter(function(d){ return d[0]; });

  /* image floaters: data-images="url1, url2, ..."; optional per-url size "url|72" */
  var IMGSIZE=parseFloat(wrap.getAttribute('data-img-size'))||54;
  var GRAY=wrap.getAttribute('data-img-gray')==='1';
  var imgRaw=wrap.getAttribute('data-images')||'';
  var IMGS=imgRaw.split(',').map(function(s){
    var p=s.split('|'), u=(p[0]||'').trim();
    if(!u) return null;
    var im=new Image(); im.src=u;
    return { src:u, el:im, size:(parseFloat(p[1])||IMGSIZE) };
  }).filter(function(d){ return d; });

  var FLOW=0.016, FIELD=150, PUSH=0.5, keepR=90;
  var W=0,H=0,DPR=1,nodes=[],src={x:0,y:0},mouse={x:-1e9,y:-1e9,on:false};
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var LS=('letterSpacing' in ctx);

  function rel(e){ var r=cv.getBoundingClientRect(); return {x:e.clientX-r.left,y:e.clientY-r.top}; }
  function size(){
    DPR=Math.min(window.devicePixelRatio||1,2);
    var r=wrap.getBoundingClientRect(); W=r.width; H=r.height;
    cv.width=W*DPR; cv.height=H*DPR; ctx.setTransform(DPR,0,0,DPR,0,0);
    layout();
  }
  function layout(){
    src.x=W/2; src.y=H*0.5;
    var total=DISCS.length+IMGS.length, k=0, out=[];
    function place(i){ var a=(i/total)*6.2832, R=Math.min(W,H)*0.34;
      return {a:a,R:R}; }
    DISCS.forEach(function(d,i){
      var o=nodes[k], p=place(k);
      out.push({
        img:false, label:d[0], w:d[1],
        r:22+d[1]*0.55,           /* collision/spacing radius (weight) */
        dot:2.0+d[1]*0.045,       /* visible dot size (weight) */
        x:o?o.x:src.x+Math.cos(p.a)*p.R,
        y:o?o.y:src.y+Math.sin(p.a)*p.R*0.7,
        vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4,
        wp:k*1.9, wp2:k*2.7
      });
      k++;
    });
    IMGS.forEach(function(m){
      var o=nodes[k], p=place(k), half=m.size*0.5;
      out.push({
        img:true, el:m.el, size:m.size,
        r:half*1.15,              /* collision radius ~ half image */
        x:o?o.x:src.x+Math.cos(p.a)*p.R,
        y:o?o.y:src.y+Math.sin(p.a)*p.R*0.7,
        vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4,
        wp:k*1.9, wp2:k*2.7
      });
      k++;
    });
    nodes=out;
  }
  function step(t){
    var i,j,a,b,dx,dy,d;
    for(i=0;i<nodes.length;i++){ a=nodes[i];
      if(!reduced){ a.vx+=Math.cos(t*0.45+a.wp)*FLOW; a.vy+=Math.sin(t*0.53+a.wp2)*FLOW; }
      dx=a.x-src.x; dy=a.y-src.y; d=Math.hypot(dx,dy)||1;
      if(d<keepR){ var kf=(1-d/keepR)*0.14; a.vx+=dx/d*kf; a.vy+=dy/d*kf; }
      var m=a.r+18;
      if(a.x<m)a.vx+=0.05; if(a.x>W-m)a.vx-=0.05;
      if(a.y<m)a.vy+=0.05; if(a.y>H-m-14)a.vy-=0.05;
      if(mouse.on){ dx=a.x-mouse.x; dy=a.y-mouse.y; d=Math.hypot(dx,dy)||1;
        if(d<FIELD){ var k=(1-d/FIELD); k=k*k; a.vx+=dx/d*k*PUSH; a.vy+=dy/d*k*PUSH; } }
      a.vx*=0.985; a.vy*=0.985;
      var sp=Math.hypot(a.vx,a.vy); if(sp>1.4){ a.vx*=1.4/sp; a.vy*=1.4/sp; }
      a.x+=a.vx; a.y+=a.vy;
    }
    for(i=0;i<nodes.length;i++) for(j=i+1;j<nodes.length;j++){
      a=nodes[i]; b=nodes[j]; dx=b.x-a.x; dy=b.y-a.y; d=Math.hypot(dx,dy)||0.01;
      var rng=Math.min(W,H)*0.5;
      if(d<rng){ var rf=(1-d/rng)*0.04; a.vx-=dx/d*rf; a.vy-=dy/d*rf; b.vx+=dx/d*rf; b.vy+=dy/d*rf; }
      var mn=a.r+b.r+10; if(d<mn){ var ov=(mn-d)/d*0.5; a.x-=dx*ov; a.y-=dy*ov; b.x+=dx*ov; b.y+=dy*ov; }
    }
  }
  function draw(){
    if(BG==='transparent') ctx.clearRect(0,0,W,H);
    else { ctx.fillStyle=BG; ctx.fillRect(0,0,W,H); }
    var i,a;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    /* gap around the core word so spokes don't cross it */
    if(LS) ctx.letterSpacing='0.22em';
    ctx.font='13px '+FONT;
    var coreU=CORE.toUpperCase();
    var gap=Math.max(ctx.measureText(coreU).width/2+20,32);
    /* hairline spokes: core -> node */
    ctx.strokeStyle='rgba('+INK+',0.13)'; ctx.lineWidth=1;
    if(LS) ctx.letterSpacing='0px';
    for(i=0;i<nodes.length;i++){ a=nodes[i];
      if(a.img) continue;               /* images drift untethered */
      var vx=a.x-src.x, vy=a.y-src.y, dl=Math.hypot(vx,vy)||1;
      if(dl<=gap+2) continue;
      ctx.beginPath();
      ctx.moveTo(src.x+vx/dl*gap, src.y+vy/dl*gap);
      ctx.lineTo(a.x-vx/dl*(a.dot+3), a.y-vy/dl*(a.dot+3));
      ctx.stroke();
    }
    /* image floaters: small framed picture, hairline border */
    for(i=0;i<nodes.length;i++){ a=nodes[i];
      if(!a.img||!a.el.complete||!a.el.naturalWidth) continue;
      var iw=a.el.naturalWidth, ih=a.el.naturalHeight,
          s=a.size/Math.max(iw,ih), dw=iw*s, dh=ih*s,
          x0=a.x-dw/2, y0=a.y-dh/2;
      ctx.save();
      if(GRAY) ctx.filter='grayscale(1)';
      ctx.globalAlpha=0.92;
      ctx.drawImage(a.el,x0,y0,dw,dh);
      ctx.restore();
      ctx.strokeStyle='rgba('+INK+',0.28)'; ctx.lineWidth=1;
      ctx.strokeRect(x0+0.5,y0+0.5,dw-1,dh-1);
    }
    /* nodes: dot + uppercase mono label */
    if(LS) ctx.letterSpacing='0.14em';
    ctx.font='11px '+FONT;
    for(i=0;i<nodes.length;i++){ a=nodes[i];
      if(a.img) continue;
      ctx.fillStyle='rgba('+INK+',0.9)';
      ctx.beginPath(); ctx.arc(a.x,a.y,a.dot,0,7); ctx.fill();
      ctx.fillStyle='rgba('+INK+',0.66)';
      ctx.fillText(a.label.toUpperCase(), a.x, a.y+a.dot+13);
    }
    /* core word */
    if(LS) ctx.letterSpacing='0.22em';
    ctx.font='13px '+FONT;
    ctx.fillStyle='rgba('+INK+',0.95)';
    ctx.fillText(coreU, src.x, src.y);
    if(LS) ctx.letterSpacing='0px';
  }
  function loop(){ var t=performance.now()/1000; step(t); draw(); requestAnimationFrame(loop); }
  cv.addEventListener('pointermove',function(e){ var p=rel(e); mouse.x=p.x; mouse.y=p.y; mouse.on=true; });
  cv.addEventListener('pointerleave',function(){ mouse.on=false; });
  window.addEventListener('resize',size);
  if(window.ResizeObserver){ new ResizeObserver(size).observe(wrap); }
  size(); loop();
})();
