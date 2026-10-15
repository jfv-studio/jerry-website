/* jerryflorez.com — WORK page interaction layer.
   Left = project title index (as now). Right = three resting states:
     (1) REST     — right panel empty.
     (2) SCROLL   — a linear strip of cover images rises while you scroll, with the
                    branded blur-fade; the cover nearest the centre highlights its
                    title on the left; the strip fades out when you stop scrolling.
     (3) HOVER    — hovering a title fades the strip out and fades in 4–5 images from
                    that project as a clean, non-overlapping grid; leaving resumes.
   Precedence: HOVER > SCROLL > REST.

   DATA: put <div id="jf-work"></div> on the WORK page and load this file.
   Inside it, provide a Webflow Collection List whose items carry class "jfw-item" with:
     data-name   project title
     data-url    project link (or a child <a href>)
     data-cats   disciplines, comma-separated   (optional — used for the hover label)
   and 2–5 images bound inside each item (any <img>; first = cover for the strip).
   Bind the cover + up to four more single-image fields, or the project's main-image
   plus a few gallery stills. The script reads whatever <img> it finds, up to 5.
   No list found → the baked covers below render so the motion can be previewed. */
(function(){
  var root=document.getElementById('jf-work');
  if(!root||root.getAttribute('data-built'))return;
  root.setAttribute('data-built','1');

  /* baked preview set (covers only; real per-project multi-images come from the CMS) */
  var BAKED={projects:[
    {name:"BARTON: The Afterlife",cats:["Creative Direction"],url:"/projects/cover-art-the-afterlife",imgs:["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adc8c73664421bdbb419_69b46f37e56806560545631c_Screenshot%25202026-03-13%2520at%252020.10.28.png"]},
    {name:"pensaer.",cats:["Identity Design","Digital/Web"],url:"/projects/pensaer",imgs:["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae3f215430ac73195d23_6559721b309c6b9c06f244a2_Screenshot%25202023-11-19%2520at%252002.25.29.png"]},
    {name:"Dorado",cats:["Identity Design"],url:"/projects/dorado-jewellery",imgs:["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae52e09bdc82fc4d64a0_611a95d5de36180f59e69d94_Dorado%2520Box%2520Mockup%25202%2520(for%2520web).jpeg"]},
    {name:"LA MURALLA",cats:["Photography"],url:"/projects/la-muralla",imgs:["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ade743494b2988ced88a_6a88482931acf65474d885a7_C0909E5B-D5B3-424F-8E02-39F425593C24.jpeg"]},
    {name:"The xx — Night + Day",cats:["Photography"],url:"/projects/the-xx-night-day",imgs:["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae2ae86c42448ed8890b_611aa4f72923c0d154000792__MG_8566%2520(for%2520web).jpeg"]},
    {name:"Barry",cats:["Photography"],url:"/projects/barry-road",imgs:["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae12a25814533519c912_6543e70659137019a320f781_Barry%2520by%2520JF%2520Draft%2520-%2520000083880025.jpeg"]},
    {name:"Livesey Exchange Bar",cats:["Installation & Experience"],url:"/projects/livesey-exchange-bar",imgs:["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ad9658e8630f136640b6_655985b2f4d3d4dd565ce4c9_Livesey%2520Bar%2520by%2520JF%2520-%2520web%2520IMG_3907.jpeg"]},
    {name:"Sobremesa",cats:["Installation & Experience"],url:"/projects/sobremesa",imgs:["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adbd98da448bf03ed77e_611d0c48bd944b8fec78b286_60050028.jpeg"]},
    {name:"Fragments",cats:["Mixed Media","Fine Art"],url:"/projects/fragments",imgs:["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adc5e245dc490a0b30aa_69b495917089a80ecc5654d6_4DBC2C47-3004-4E6B-AAC9-1EC5A828DC9B_1_105_c.webp"]}
  ]};

  function realSrc(img){
    var s=img.currentSrc||img.getAttribute('src')||img.src||'';
    var bad=function(u){return !u||u.indexOf('data:')===0||u.indexOf('placeholder')>=0||u.indexOf('/plugins/')>=0;};
    if(!bad(s))return s;
    var bg=(img.style&&img.style.backgroundImage)||'',m=bg.match(/url\((["'])(.*?)\1\)/)||bg.match(/url\(([^)]+)\)/);
    var u=(m?(m[2]||m[1]):'').replace(/^["']|["']$/g,''); if(u&&u!=='none'&&!bad(u))return u;
    var ds=img.getAttribute('data-src'); if(ds&&!bad(ds))return ds;
    var ss=img.getAttribute('srcset'); if(ss){var f=ss.split(',')[0].trim().split(' ')[0]; if(f&&!bad(f))return f;}
    return '';
  }
  function readList(){
    var nodes=root.querySelectorAll('.jfw-item'); if(!nodes.length)return null;
    var projects=[];
    [].forEach.call(nodes,function(n){
      var imgs=[]; [].forEach.call(n.querySelectorAll('img'),function(im){var s=realSrc(im); if(s&&imgs.indexOf(s)<0&&imgs.length<5)imgs.push(s);});
      if(!imgs.length)return;
      var a=n.querySelector('a'),url=n.getAttribute('data-url')||(a&&a.getAttribute('href'))||(n.tagName==='A'?n.getAttribute('href'):'');
      var cats=(n.getAttribute('data-cats')||'').replace(/ \/ /g,'/').split(',').map(function(s){return s.trim();}).filter(Boolean);
      projects.push({name:n.getAttribute('data-name')||(a&&a.textContent.trim())||'',url:url||'',cats:cats,imgs:imgs});
    });
    var wrapL=nodes[0].closest('.w-dyn-list')||nodes[0].parentNode; if(wrapL)wrapL.style.display='none';
    return projects.length?{projects:projects}:null;
  }
  var DATA=readList()||BAKED, P=DATA.projects;

  /* ---------------- styles (scoped, site fonts, brand palette) ---------------- */
  var CSS=`
  #jf-work{--bg:#000;--ink:#f2f0ec;--mute:rgba(242,240,236,.42);--faint:rgba(242,240,236,.14);
    --frame:rgba(242,240,236,.12);--red:#e6392e;
    --display:"Bluunext Webfont","Bluunext",sans-serif;--ui:"Bluunext Titling","Bluunext Webfont",sans-serif;
    --serif:"Averia Serif Libre",Georgia,serif;--ease:cubic-bezier(.16,.84,.44,1);--pb:env(safe-area-inset-bottom,0px);
    position:relative;display:flex;height:100vh;background:transparent;color:var(--ink);
    font-family:var(--ui);-webkit-font-smoothing:antialiased;overflow:hidden;}
  #jf-work *{box-sizing:border-box;}
  #jf-work .jfw-rail{width:33vw;flex:0 0 33vw;z-index:4;padding:clamp(84px,12vh,128px) 2.4vw 34px 2.8vw;display:flex;flex-direction:column;}
  #jf-work .jfw-swlabel{font-family:var(--display);font-weight:700;font-size:clamp(12px,1.0vw,16px);letter-spacing:.02em;text-transform:uppercase;color:rgba(242,240,236,.86);margin-bottom:22px;}
  #jf-work .jfw-list{display:flex;flex-direction:column;align-items:flex-start;gap:2px;overflow:auto;scrollbar-width:none;}
  #jf-work .jfw-list::-webkit-scrollbar{display:none;}
  #jf-work .jfw-ti{appearance:none;background:none;border:0;padding:3px 0;margin:0;cursor:pointer;text-decoration:none;text-align:left;
    font-family:var(--display);font-weight:700;font-size:clamp(15px,1.5vw,22px);line-height:1.18;letter-spacing:.006em;
    color:rgba(242,240,236,.82);transition:color .35s var(--ease),filter .45s var(--ease),opacity .45s var(--ease);}
  #jf-work .jfw-ti:hover{color:var(--ink);}
  #jf-work .jfw-ti.active{color:var(--red);}
  #jf-work .jfw-ti.active::before{content:"— ";}
  /* when a title is hovered, or a cover is centred, the others recede (branded) */
  #jf-work .jfw-list.focusing .jfw-ti:not(.active):not(:hover){filter:blur(1.6px);opacity:.4;}
  #jf-work .jfw-ti:focus-visible{outline:1px solid var(--red);outline-offset:3px;}

  #jf-work .jfw-stage{flex:1;height:100%;position:relative;overflow:hidden;}
  /* SCROLL strip — a vertical column of covers */
  #jf-work .jfw-strip{position:absolute;inset:0;opacity:0;filter:blur(9px);transition:opacity .55s var(--ease),filter .55s var(--ease);will-change:opacity,filter;pointer-events:none;}
  #jf-work .jfw-strip.on{opacity:1;filter:blur(0px);pointer-events:auto;}
  #jf-work .jfw-cov{position:absolute;left:0;right:0;margin:0 auto;display:block;will-change:transform,filter,opacity;}
  #jf-work .jfw-cov a{display:block;text-decoration:none;}
  #jf-work .jfw-cov img{display:block;width:100%;height:auto;border:1px solid var(--frame);background:#0a0a0a;box-shadow:0 14px 60px rgba(0,0,0,.6);}
  /* HOVER grid — 4–5 images, clean, non-overlapping */
  #jf-work .jfw-grid{position:absolute;inset:0;padding:clamp(70px,10vh,120px) 4vw 6vh;display:grid;gap:14px;align-content:center;
    grid-template-columns:repeat(2,1fr);opacity:0;filter:blur(9px);transition:opacity .5s var(--ease),filter .5s var(--ease);pointer-events:none;}
  #jf-work .jfw-grid.on{opacity:1;filter:blur(0px);pointer-events:auto;}
  #jf-work .jfw-gi{margin:0;overflow:hidden;opacity:0;transform:translateY(8px);transition:opacity .5s var(--ease),transform .6s var(--ease);}
  #jf-work .jfw-grid.on .jfw-gi{opacity:1;transform:none;}
  #jf-work .jfw-gi:first-child{grid-column:1 / -1;}        /* hero image spans both columns */
  #jf-work .jfw-gi a{display:block;}
  #jf-work .jfw-gi img{display:block;width:100%;height:100%;object-fit:cover;border:1px solid var(--frame);background:#0a0a0a;}
  #jf-work .jfw-gi:first-child img{max-height:46vh;}
  #jf-work .jfw-gi:not(:first-child) img{aspect-ratio:4/5;}
  @media (prefers-reduced-motion:reduce){#jf-work .jfw-strip,#jf-work .jfw-grid,#jf-work .jfw-gi,#jf-work .jfw-cov{transition:none;}}
  @media (max-width:820px){
    #jf-work{height:auto;min-height:100vh;flex-direction:column;overflow:visible;}
    #jf-work .jfw-rail{width:100%;flex:none;padding:84px 6vw 10px;}
    #jf-work .jfw-list{overflow:visible;}
    #jf-work .jfw-stage{display:none;}                      /* motion layer is desktop; mobile = plain index */
  }`;
  var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);

  /* ---------------- build DOM ---------------- */
  function el(t,c,h){var e=document.createElement(t); if(c)e.className=c; if(h!=null)e.innerHTML=h; return e;}
  var rail=el('aside','jfw-rail');
  rail.appendChild(el('div','jfw-swlabel','Works'));
  var listEl=el('nav','jfw-list'); rail.appendChild(listEl);
  var stage=el('main','jfw-stage'), strip=el('div','jfw-strip'), grid=el('div','jfw-grid');
  stage.appendChild(strip); stage.appendChild(grid);
  root.appendChild(rail); root.appendChild(stage);

  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var clamp=function(v,a,b){return v<a?a:v>b?b:v;};
  var mode='rest', hoverIdx=-1, activeIdx=-1, off=0, maxOff=1, idleT=null, gridFor=-1;

  /* title index + cover figures */
  var titles=[], covs=[];
  P.forEach(function(p,i){
    var a=document.createElement('a'); a.className='jfw-ti'; a.href=p.url||'#'; a.textContent=p.name;
    a.addEventListener('mouseenter',function(){enterHover(i);});
    a.addEventListener('mouseleave',function(){leaveHover(i);});
    a.addEventListener('focus',function(){enterHover(i);});
    listEl.appendChild(a); titles.push(a);

    var fig=el('figure','jfw-cov'); var ia=document.createElement('a'); ia.href=p.url||'#'; ia.setAttribute('aria-label',p.name);
    var img=new Image(); img.src=p.imgs[0]; img.alt=p.name; img.loading='eager';
    ia.appendChild(img); fig.appendChild(ia); strip.appendChild(fig);
    var C={p:p,fig:fig,img:img,aspect:1,y:0,h:0};
    img.addEventListener('load',function(){C.aspect=(img.naturalWidth/img.naturalHeight)||1; layoutStrip(true);});
    covs.push(C);
  });

  /* ---------------- SCROLL strip geometry ---------------- */
  var COVW=0.52;                                   /* cover width as fraction of stage */
  function layoutStrip(render){
    var sw=stage.clientWidth, sh=stage.clientHeight||innerHeight, w=sw*COVW, y=sh*0.30, pitch=sh*0.72, maxB=0;
    covs.forEach(function(C){
      C.w=w; C.h=w/C.aspect; C.y=y;
      C.fig.style.width=w+'px';
      y+=Math.max(pitch, C.h+sh*0.14); maxB=C.y+C.h;
    });
    maxOff=Math.max(1, maxB - sh*0.5);             /* last cover can reach centre */
    sizePin();
    if(render!==false) paintStrip();
  }
  function paintStrip(){
    var sh=stage.clientHeight||innerHeight, cy=sh/2, best=-1, bestD=1e9;
    covs.forEach(function(C,i){
      var top=C.y-off, cc=top+C.h/2, d=Math.abs(cc-cy)/(sh*0.5); if(d>1)d=1;
      C.fig.style.top=top+'px';
      C.fig.style.transform='translateY(0px)';
      C.fig.style.filter='blur('+(d*d*3.2).toFixed(2)+'px)';
      C.fig.style.opacity=(1-d*0.5).toFixed(3);
      if(d<bestD){bestD=d;best=i;}
    });
    if(mode!=='hover') setActive(best);
  }

  /* ---------------- left-panel highlight ---------------- */
  function setActive(i){
    if(i===activeIdx)return; activeIdx=i;
    titles.forEach(function(t,k){t.classList.toggle('active',k===i);});
    listEl.classList.toggle('focusing', i>=0 && (mode==='scroll'||mode==='hover'));
  }

  /* ---------------- HOVER grid ---------------- */
  function buildGrid(i){
    if(gridFor===i)return; gridFor=i;
    grid.innerHTML='';
    var p=P[i], imgs=p.imgs.slice(0,5);
    if(imgs.length<2 && p.imgs.length) imgs=p.imgs;         /* single-image fallback */
    imgs.forEach(function(src){
      var f=el('figure','jfw-gi'); var a=document.createElement('a'); a.href=p.url||'#';
      var im=new Image(); im.src=src; im.alt=p.name; im.loading='eager';
      a.appendChild(im); f.appendChild(a); grid.appendChild(f);
    });
  }
  function enterHover(i){
    hoverIdx=i; mode='hover'; buildGrid(i);
    strip.classList.remove('on'); grid.classList.add('on'); setActive(i);
  }
  function leaveHover(i){
    if(hoverIdx!==i)return; hoverIdx=-1; grid.classList.remove('on');
    mode = scrolling ? 'scroll' : 'rest';
    if(mode==='scroll'){strip.classList.add('on'); paintStrip();}
    else { listEl.classList.remove('focusing'); setActive(-1); }
  }

  /* ---------------- scroll activity + pin ---------------- */
  var scrolling=false;
  function markScrolling(){
    scrolling=true;
    if(mode!=='hover'){mode='scroll'; strip.classList.add('on');}
    clearTimeout(idleT);
    idleT=setTimeout(function(){
      scrolling=false;
      if(mode==='scroll'){mode='rest'; strip.classList.remove('on'); listEl.classList.remove('focusing'); setActive(-1);}
    },480);
  }

  /* pin the section so page-scroll drives the strip offset, then releases (as home page) */
  var wrap=document.createElement('div'); wrap.className='jfw-pin';
  root.parentNode.insertBefore(wrap,root); wrap.appendChild(root);
  root.style.position='sticky'; root.style.top='0';
  function sizePin(){ wrap.style.height=((stage.clientHeight||innerHeight)+maxOff)+'px'; }
  function onScroll(){
    if(innerWidth<=820)return;
    var top=wrap.getBoundingClientRect().top, no=clamp(-top,0,maxOff);
    if(Math.abs(no-off)>0.5) markScrolling();
    off=no; if(mode!=='hover') paintStrip();
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',function(){layoutStrip();});
  layoutStrip();
})();
