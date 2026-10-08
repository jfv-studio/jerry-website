/* jerryflorez.com — front-page "Selected Works" filter gallery.
   Drop <div id="jf-gallery"></div> into Webflow, then load this file.
   Scatter + parallax + blur-focus gallery, Contact-sheet view, discipline filters.
   Data: reads a Webflow Collection List inside #jf-gallery (.jfg-item[data-*]) if present,
   otherwise uses the baked set below. Uses the site's own fonts. Scoped under #jf-gallery. */
(function(){
  var root=document.getElementById('jf-gallery');
  if(!root || root.getAttribute('data-built')) return;
  root.setAttribute('data-built','1');

  var BAKED={"projects": [{"name": "Dorado", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae52e09bdc82fc4d64a0_611a95d5de36180f59e69d94_Dorado%2520Box%2520Mockup%25202%2520(for%2520web).jpeg", "cats": ["Identity Design", "Creative Direction", "Digital/Web"], "client": "Dorado", "bite": "Defining a small jewellery business's brand identity and strategy.", "imp": 72, "cred": 70, "url": "/projects/dorado-jewellery"}, {"name": "Insights", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae497ed16e2cda021352_61a417612d39c18fd951bd78_UAL%2520Insights%2520resized%2520for%2520web-2.jpeg", "cats": ["Identity Design"], "client": "UAL Insights", "bite": "An experimental, hands-on approach to design.", "imp": 56, "cred": 85, "url": "/projects/insights"}, {"name": "TrAIN", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae4243494b2988cf01b6_61a41a1e8ac9ffa4c4948825_UAL%2520TrAIN%2520resized%2520for%2520web-3.jpeg", "cats": ["Identity Design"], "client": "UAL TrAIN", "bite": "Designing to convey blurred boundaries and our constantly changing, shape-shifting world.", "imp": 55, "cred": 84, "url": "/projects/train"}, {"name": "pensaer.", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae3f215430ac73195d23_6559721b309c6b9c06f244a2_Screenshot%25202023-11-19%2520at%252002.25.29.png", "cats": ["Identity Design", "Digital/Web", "Photography", "Creative Direction", "Community"], "client": "pensaer.", "bite": "A revamp of a young and growing architecture practice's website and branded documents.", "imp": 88, "cred": 85, "url": "/projects/pensaer"}, {"name": "Close To Home", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae3b927b8668a558929c_65597d776c639cb0757a64eb_Screenshot%25202023-11-19%2520at%252003.13.40.png", "cats": ["Identity Design"], "client": "The London School of Architecture", "bite": "An identity design for the London School of Architecture's end of year degree show.", "imp": 54, "cred": 86, "url": "/projects/close-to-home"}, {"name": "The xx - Night + Day", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae2ae86c42448ed8890b_611aa4f72923c0d154000792__MG_8566%2520(for%2520web).jpeg", "cats": ["Photography"], "client": "Shot for XL Recordings", "bite": "A week following the footsteps of The XX's members as they arrive and settle in their week-long Brixton residency, Night", "imp": 58, "cred": 95, "url": "/projects/the-xx-night-day"}, {"name": "Barry", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae12a25814533519c912_6543e70659137019a320f781_Barry%2520by%2520JF%2520Draft%2520-%2520000083880025.jpeg", "cats": ["Photography"], "client": "Pensaer London", "bite": "Published in the Architects Journal. Barry Road provides an elegant rear extension using hand-crafted materials, enhanci", "imp": 62, "cred": 90, "url": "/projects/barry-road"}, {"name": "Kirkwood", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae0ed59afc1e091c80f9_6543e9227b2c009caea85444_Kirkwood%2520by%2520JF%2520-1-6.jpeg", "cats": ["Photography"], "client": "Pensaer London", "bite": "\"The use of oak to give warmth to the atmosphere, and the use of painted brickwork to give texture and depth, has create", "imp": 60, "cred": 88, "url": "/projects/kirkwood"}, {"name": "USB", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae037ed16e2cda01fd3f_655935f4aced22f21dd853e4_Screenshot%25202023-11-18%2520at%252022.08.48.png", "cats": ["Photography"], "client": "USB film", "bite": "Documenting live events by USB film, bringing to the forefront London's underground alternative music scene.", "imp": 60, "cred": 70, "url": "/projects/usb"}, {"name": "Casino", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adff7c5809b502e6f05c_65593e91ef2f6abce104ba87_Casino%2520by%2520JF%2520-%25203858-2-EII%2520for%2520web.jpeg", "cats": ["Photography"], "client": "Pensaer London.", "bite": "", "imp": 60, "cred": 85, "url": "/projects/casino"}, {"name": "Collect Fair 2025", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adee0dfd462531bda847_69b4918c3a139e0a3a4e5689_68e0171c2dddf1ae4b8dfe07_7FBD1921-4F83-4A00-9DE6-925A29CC2C49_1_105_c.jpeg", "cats": ["Photography"], "client": "", "bite": "", "imp": 58, "cred": 75, "url": "/projects/collect-fair-2025"}, {"name": "Ælfred", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adec30978ba5ca65fe30_6a7486b185cd91cd19af4082_FC228D39-73D1-4130-926C-D13766BCC33A.jpeg", "cats": ["Photography"], "client": "Ælfred", "bite": "Photographic campaign for Ælfred, featured in their socials and their landing page, after a website refresh.", "imp": 74, "cred": 68, "url": "/projects/aelfred"}, {"name": "LA MURALLA", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ade743494b2988ced88a_6a88482931acf65474d885a7_C0909E5B-D5B3-424F-8E02-39F425593C24.jpeg", "cats": ["Photography"], "client": "", "bite": "Dcoumenting Ricardo Bofill's Muralla Roja in Barcelona.", "imp": 68, "cred": 92, "url": "/projects/la-muralla"}, {"name": "Sculpture: Closer", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adcad02344918b967a1a_67996e8489482f2552c152ba_KOLEKT_J_FLOREZ.png", "cats": ["Sculpture", "Fine Art"], "client": "", "bite": "With no initial point of reference other than its natural veins and sedimentary layers, the alabaster was hand-carved an", "imp": 64, "cred": 80, "url": "/projects/sculpture-closer"}, {"name": "BARTON: The Afterlife", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adc8c73664421bdbb419_69b46f37e56806560545631c_Screenshot%25202026-03-13%2520at%252020.10.28.png", "cats": ["Creative Direction"], "client": "Barton", "bite": "We worked over the course of a year to build a world reminiscent of the album's emotional journey, from loss, to ecstasy", "imp": 95, "cred": 80, "url": "/projects/cover-art-the-afterlife"}, {"name": "Fragments", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adc5e245dc490a0b30aa_69b495917089a80ecc5654d6_4DBC2C47-3004-4E6B-AAC9-1EC5A828DC9B_1_105_c.webp", "cats": ["Mixed Media", "Fine Art"], "client": "", "bite": "", "imp": 70, "cred": 78, "url": "/projects/fragments"}, {"name": "Sobremesa", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adbd98da448bf03ed77e_611d0c48bd944b8fec78b286_60050028.jpeg", "cats": ["Installation & Experience"], "client": "", "bite": "Winning competition entry designed as part of Pebble Haus Collective for London Festival of Architecture", "imp": 66, "cred": 72, "url": "/projects/sobremesa"}, {"name": "Livesey Exchange Bar", "img": "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ad9658e8630f136640b6_655985b2f4d3d4dd565ce4c9_Livesey%2520Bar%2520by%2520JF%2520-%2520web%2520IMG_3907.jpeg", "cats": ["Installation & Experience"], "client": "Pempeople", "bite": "Constructed a bar for charity Pempeople's new Livesey Exchange 2 community space.", "imp": 60, "cred": 65, "url": "/projects/livesey-exchange-bar"}], "categories": ["Community", "Creative Direction", "Digital/Web", "Fine Art", "Identity Design", "Installation & Experience", "Mixed Media", "Photography", "Sculpture"]};

  /* ---- data: prefer a CMS collection list if the page provides one ---- */
  function realSrc(img){
    var s=img.currentSrc||img.getAttribute('src')||img.src||'';
    var bad=function(u){return !u||u.indexOf('data:')===0||u.indexOf('placeholder')>=0||u.indexOf('/plugins/')>=0;};
    if(!bad(s)) return s;
    var bg=(img.style&&img.style.backgroundImage)||'';
    var m=bg.match(/url\((["'])(.*?)\1\)/)||bg.match(/url\(([^)]+)\)/);
    var u=(m?(m[2]||m[1]):'').replace(/^["']|["']$/g,'');
    if(u&&u!=='none'&&!bad(u)) return u;
    var ds=img.getAttribute('data-src'); if(ds&&!bad(ds)) return ds;
    var ss=img.getAttribute('srcset'); if(ss){var f=ss.split(',')[0].trim().split(' ')[0]; if(f&&!bad(f)) return f;}
    return '';
  }
  function readList(){
    var nodes=root.querySelectorAll('.jfg-item');
    if(!nodes.length) return null;
    var projects=[], cats={};
    [].forEach.call(nodes,function(n){
      var src=n.getAttribute('data-img')||'';
      if(!src){var ii=n.querySelectorAll('img');for(var q=0;q<ii.length;q++){var s=realSrc(ii[q]);if(s){src=s;break;}}}
      if(!src) return;
      var cs=(n.getAttribute('data-cats')||'').replace(/ \/ /g,'/').split(',').map(function(s){return s.trim();}).filter(Boolean);
      cs.forEach(function(c){cats[c]=1;});
      var a=n.querySelector('a'), url=n.getAttribute('data-url')||(a&&a.getAttribute('href'))||(n.tagName==='A'?n.getAttribute('href'):'');
      projects.push({name:n.getAttribute('data-name')||'',img:src,cats:cs,url:url||'',
        client:n.getAttribute('data-client')||'',bite:n.getAttribute('data-bite')||'',
        imp:parseFloat(n.getAttribute('data-imp'))||55,cred:parseFloat(n.getAttribute('data-cred'))||70});
    });
    var listWrap=nodes[0].closest('.w-dyn-list')||nodes[0].parentNode;
    if(listWrap) listWrap.style.display='none';
    return projects.length?{projects:projects,categories:Object.keys(cats).sort()}:null;
  }
  var DATA=readList()||BAKED;
  var ALLOW=['Photography','Identity Design','Creative Direction','Digital/Web','Installation & Experience','Community','Fine Art','Book Design','Writing/Theory'];
  var filterCats=ALLOW.filter(function(c){return (DATA.categories||[]).indexOf(c)>=0;});

  /* ---- scoped styles ---- */
  var CSS=`
  #jf-gallery{--bg:#000;--ink:#f2f0ec;--mute:rgba(242,240,236,.42);--faint:rgba(242,240,236,.14);
    --frame:rgba(242,240,236,.12);--red:#e6392e;
    --display:"Bluunext Webfont","Bluunext",sans-serif;--ui:"Bluunext Titling","Bluunext Webfont",sans-serif;
    --serif:"Averia Serif Libre",Georgia,serif;--ease:cubic-bezier(.16,.84,.44,1);
    --pb:env(safe-area-inset-bottom,0px);
    position:relative;display:flex;height:100vh;background:transparent;color:var(--ink);
    font-family:var(--ui);-webkit-font-smoothing:antialiased;overflow:hidden;}
  #jf-gallery *{box-sizing:border-box;}
  #jf-gallery .jfg-rail{width:33vw;flex:0 0 33vw;z-index:3;padding:clamp(88px,12vh,130px) 2.4vw 34px 2.8vw;display:flex;flex-direction:column;opacity:0;filter:blur(8px);will-change:opacity,filter;}
  #jf-gallery .jfg-vt{align-self:flex-start;appearance:none;background:none;border:1px solid var(--faint);
    color:rgba(242,240,236,.8);font-family:var(--ui);font-size:10px;letter-spacing:.2em;text-transform:uppercase;
    padding:7px 13px;cursor:pointer;transition:border-color .4s,color .4s;}
  #jf-gallery .jfg-vt:hover{border-color:var(--red);color:var(--ink);}
  #jf-gallery .jfg-filters{margin-top:26px;display:flex;flex-direction:column;align-items:flex-start;gap:3px;}
  #jf-gallery .jfg-cat{appearance:none;background:none;border:0;padding:3px 0;margin:0;cursor:pointer;font-family:var(--ui);
    font-size:12px;letter-spacing:.07em;line-height:1.25;color:rgba(242,240,236,.82);text-transform:uppercase;text-align:left;
    transition:color .3s,filter .3s,opacity .3s;}
  #jf-gallery .jfg-cat:hover{color:var(--ink);}
  #jf-gallery .jfg-filters:hover .jfg-cat:not(:hover):not(.pinned){filter:blur(1.7px);opacity:.4;}
  #jf-gallery .jfg-cat.jfg-dim:not(:hover):not(.pinned){filter:blur(1.7px);opacity:.38;}
  #jf-gallery .jfg-cat.pinned{color:var(--red);} #jf-gallery .jfg-cat.pinned::before{content:"— ";}
  #jf-gallery .jfg-cat:focus-visible{outline:1px solid var(--red);outline-offset:3px;}
  #jf-gallery .jfg-info{margin-top:auto;}
  #jf-gallery .jfg-swlabel{font-family:var(--display);font-weight:700;font-size:clamp(12px,1.0vw,16px);letter-spacing:.02em;text-transform:uppercase;color:rgba(242,240,236,.86);margin-bottom:18px;}
  #jf-gallery .jfg-focus{height:180px;transition:opacity .42s ease,filter .42s ease;}
  #jf-gallery .jfg-name{font-family:var(--display);font-weight:700;font-size:clamp(20px,2.2vw,34px);line-height:1.03;letter-spacing:.004em;}
  #jf-gallery .jfg-meta{margin-top:10px;font-family:var(--ui);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);}
  #jf-gallery .jfg-desc{margin-top:12px;font-family:var(--serif);font-weight:300;font-size:14px;line-height:1.5;color:rgba(242,240,236,.78);max-width:33ch;}
  #jf-gallery .jfg-stage{flex:1;height:100%;overflow:hidden;position:relative;}
  #jf-gallery .jfg-stage.gallery{overflow:hidden;}
  #jf-gallery .jfg-stage.gallery .jfg-fig{transition:filter .5s var(--ease),opacity .5s var(--ease);}
  #jf-gallery .jfg-stage::-webkit-scrollbar{width:7px;} #jf-gallery .jfg-stage::-webkit-scrollbar-thumb{background:var(--faint);border-radius:4px;}
  #jf-gallery .jfg-track{position:relative;width:100%;}
  #jf-gallery .jfg-fig{position:absolute;margin:0;display:block;will-change:transform,filter,opacity;}
  #jf-gallery .jfg-fig .inner{display:block;text-decoration:none;color:inherit;cursor:pointer;transform-origin:center center;transition:transform .9s var(--ease),filter .9s var(--ease);}
  #jf-gallery .jfg-fig.hov .inner{transform:scale(1.045);filter:brightness(1.07);}
  #jf-gallery .jfg-fig.locked.hov .inner{transform:none;filter:none;}
  #jf-gallery .jfg-fig img{display:block;width:100%;height:auto;border:1px solid var(--frame);background:#0a0a0a;box-shadow:0 14px 60px rgba(0,0,0,.6);}
  #jf-gallery .jfg-closer{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0;z-index:5;padding:0 8vw;}
  #jf-gallery .jfg-closer .ci{max-width:22ch;text-align:center;font-family:var(--serif);font-weight:300;font-size:clamp(22px,2.4vw,34px);line-height:1.35;color:var(--ink);}
  #jf-gallery .jfg-closer .ci em{color:var(--red);font-style:normal;}
  @media (prefers-reduced-motion: reduce){#jf-gallery .jfg-fig .inner,#jf-gallery .jfg-focus{transition:none;}}
  @media (max-width:820px){
    #jf-gallery{height:100vh;}
    #jf-gallery .jfg-rail{position:absolute;left:0;right:0;bottom:0;width:100%;flex:none;z-index:10;padding:14px 5vw calc(12px + var(--pb));
      background:linear-gradient(0deg,rgba(0,0,0,.92) 72%,rgba(0,0,0,0));flex-direction:column-reverse;}
    #jf-gallery .jfg-vt{display:none;} #jf-gallery .jfg-filters{margin:10px 0 0;flex-flow:row wrap;gap:5px 16px;} #jf-gallery .jfg-cat{font-size:12px;}
    #jf-gallery .jfg-info{margin:0;} #jf-gallery .jfg-swlabel{display:none;} #jf-gallery .jfg-focus{height:auto;} #jf-gallery .jfg-name{font-size:20px;} #jf-gallery .jfg-desc{display:none;} #jf-gallery .jfg-meta{margin-top:7px;}
  }`;
  var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);

  /* ---- build DOM ---- */
  function el(tag,cls,html){var e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e;}
  var rail=el('aside','jfg-rail');
  var viewToggle=el('button','jfg-vt','Contact sheet view'); viewToggle.type='button';
  var filtersEl=el('nav','jfg-filters');
  var info=el('div','jfg-info');
  info.appendChild(el('div','jfg-swlabel','Selected Works'));
  var block=el('div','jfg-focus');
  var pName=el('div','jfg-name','—'), pMeta=el('div','jfg-meta'), pDesc=el('div','jfg-desc');
  block.appendChild(pName); block.appendChild(pMeta); block.appendChild(pDesc); info.appendChild(block);
  rail.appendChild(viewToggle); rail.appendChild(filtersEl); rail.appendChild(info);
  var stage=el('main','jfg-stage'), track=el('div','jfg-track');
  var closer=el('div','jfg-closer','<div class="ci">I design the <em>atmosphere</em> that makes a story feel real, through an inquisitive process.</div>');
  stage.appendChild(track); stage.appendChild(closer);
  root.appendChild(rail); root.appendChild(stage);

  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp=function(v,a,b){return v<a?a:v>b?b:v;};
  function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
  var pinned=new Set(),preview=null,mode='scroll',hoverIdx=-1,SEED=(Math.random()*4294967296)>>>0,lastW=-1;

  var figs=DATA.projects.map(function(p,i){
    var norm=clamp((p.imp-52)/43,0,1);
    var fig=el('figure','jfg-fig');
    var inner=document.createElement('a'); inner.className='inner'; inner.href=p.url||'#';
    if(p.url) inner.setAttribute('aria-label',p.name);
    var img=new Image(); img.src=p.img; img.alt=p.name; img.loading='eager';
    inner.appendChild(img); fig.appendChild(inner); track.appendChild(fig);
    var F={p:p,fig:fig,norm:norm,aspect:1,speed:0.86+norm*0.34,baseBlur:(1-norm)*1.0,x:0,y:0,w:0,h:0,gx:0,gy:0,baseZ:10+Math.round(norm*80),locked:false};
    img.addEventListener('load',function(){ F.aspect=(img.naturalWidth/img.naturalHeight)||1; if(mode==='scroll'){layout();sizePin();schedule();} else {layoutGallery();paintGallery();} });
    fig.addEventListener('mouseenter',function(){var lk=pinned.size>0&&!isMatch(p);if(lk)return;hoverIdx=figs.indexOf(F);fig.classList.add('hov');if(mode==='gallery')setFocus(p);schedule();});
    fig.addEventListener('mouseleave',function(){fig.classList.remove('hov');if(hoverIdx===figs.indexOf(F))hoverIdx=-1;if(mode==='gallery')clearFocus();schedule();});
    return F;
  });

  var catBtns=[];
  filterCats.forEach(function(cat){
    var b=el('button','jfg-cat',cat); b.type='button';
    b.addEventListener('click',function(){pinned.has(cat)?pinned.delete(cat):pinned.add(cat);b.classList.toggle('pinned',pinned.has(cat));refresh();});
    b.addEventListener('mouseenter',function(){preview=cat;refresh();});
    b.addEventListener('mouseleave',function(){preview=null;refresh();});
    filtersEl.appendChild(b);
    catBtns.push({cat:cat,el:b});
  });
  /* mirror the focused/hovered project's disciplines onto the filter list:
     matching filters stay sharp, the rest reverse-blur (so cats needn't be listed under the title) */
  function previewCats(cats){
    catBtns.forEach(function(cb){
      var lit = !cats || cb.el.classList.contains('pinned') || cats.indexOf(cb.cat)>=0;
      cb.el.classList.toggle('jfg-dim', !lit);
    });
  }
  function isMatch(p){if(pinned.size){var ok=false;pinned.forEach(function(c){if(p.cats.indexOf(c)>=0)ok=true;});return ok;}if(preview)return p.cats.indexOf(preview)>=0;return true;}

  function layout(){
    var sw=stage.clientWidth, sh=stage.clientHeight||innerHeight;
    var rng=mulberry32(SEED), MAXO=0.05, placed=[], y=sh*0.33, maxB=0;
    /* interleave placement order big/small so no screen gets a clump of big images */
    var byImp=figs.map(function(f,i){return i;}).sort(function(a,b){return figs[b].norm-figs[a].norm;});
    var seq=[], lo=0, hi=byImp.length-1;
    while(lo<=hi){ seq.push(byImp[lo++]); if(lo<=hi) seq.push(byImp[hi--]); }
    seq.forEach(function(fi,pos){
      var f=figs[fi], n=f.norm, wFrac=0.40+n*0.30, back=(n<0.38&&rng()<0.5); if(back)wFrac*=0.70;
      var w=clamp(wFrac*sw,sw*0.22,sw*0.80), h=w/f.aspect, yy=y, bestX=0, bestOv=1e9;
      /* even vertical pitch (no gaps); pick the least-overlapping X */
      for(var tries=0;tries<24;tries++){
        var xFrac=back?0.14+rng()*0.58:(pos%2===0?rng()*0.30:0.52+rng()*0.34);
        var x=clamp(xFrac*(sw-w),0,sw-w), mo=0;
        for(var k=0;k<placed.length;k++){var r=placed[k];
          var ix=Math.max(0,Math.min(x+w,r.x+r.w)-Math.max(x,r.x)), iy=Math.max(0,Math.min(yy+h,r.y+r.h)-Math.max(yy,r.y));
          var ov=ix*iy/Math.min(w*h,r.w*r.h); if(ov>mo)mo=ov;
        }
        if(mo<bestOv){bestOv=mo;bestX=x;}
        if(mo<=MAXO) break;
      }
      f.w=w;f.h=h;f.x=bestX;f.y=yy; placed.push({x:bestX,y:yy,w:w,h:h});
      f.fig.style.width=w+'px';f.fig.style.left=bestX+'px';f.fig.style.top=yy+'px';
      y=yy+ sh*0.42 + h*0.16 + rng()*sh*0.12; maxB=Math.max(maxB,yy+h);
    });
    var need=0; figs.forEach(function(f){var sc=(f.y+f.h/2-sh/2)/f.speed; if(sc>need)need=sc;});
    track.style.height=(need+sh*1.7)+'px';
  }
  function layoutGallery(){
    var sw=stage.clientWidth, sh=stage.clientHeight||innerHeight, n=figs.length;
    var cols=clamp(Math.round(sw/300),3,5), rows=Math.ceil(n/cols), cw=sw/cols, chh=sh/rows, rng=mulberry32(0xCA7A106);
    figs.forEach(function(f,i){
      var col=i%cols, row=Math.floor(i/cols), nn=f.norm;
      var w=clamp((0.5+nn*0.34)*cw, cw*0.42, cw*0.92);
      if(w/f.aspect>chh*0.86) w=chh*0.86*f.aspect;
      var h=w/f.aspect, jx=(rng()*2-1)*cw*0.17, jy=(rng()*2-1)*chh*0.17;
      f.gx=clamp(col*cw+cw/2+jx-w/2,2,sw-w-2); f.gy=clamp(row*chh+chh/2+jy-h/2,2,sh-h-2);
      f.fig.style.width=w+'px';f.fig.style.left=f.gx+'px';f.fig.style.top=f.gy+'px';f.fig.style.zIndex=20+Math.round(nn*40);
    });
    track.style.height=sh+'px';
  }

  var ticking=false;
  function schedule(){if(mode==='scroll'&&!ticking){ticking=true;requestAnimationFrame(applyScroll);}}
  function applyScroll(){
    ticking=false;
    var sr=stage.getBoundingClientRect(), scroll=stage.scrollTop, cy=sr.height/2, half=sr.height*0.5||1;
    var maxScroll=Math.max(1,track.offsetHeight-sr.height);
    var endP=clamp((scroll-(maxScroll-sr.height*0.9))/(sr.height*0.9),0,1);
    var best=-1,bestScore=1e9;
    figs.forEach(function(f,i){
      var centreY=(f.y+f.h/2)-scroll*f.speed, d=Math.abs(centreY-cy)/half; if(d>1)d=1;
      var match=isMatch(f.p); f.locked=(pinned.size>0&&!match); f.fig.classList.toggle('locked',f.locked);
      var forced=(i===hoverIdx&&!f.locked), t=forced?0:d, blur,op;
      if(f.locked){blur=8;op=0.08+f.p.cred/100*0.14;}
      else{blur=f.baseBlur*t+t*t*4.5; op=1-t*0.46;}
      blur+=endP*7; op*=(1-endP*0.85);
      f.fig.style.transform='translateY('+(reduce?0:scroll*(1-f.speed)).toFixed(1)+'px)';
      f.fig.style.filter='blur('+blur.toFixed(2)+'px)';
      f.fig.style.opacity=op.toFixed(3);
      /* whatever is nearest the centreline rises to the top so it is never buried */
      f.fig.style.zIndex = f.locked ? 1 : (forced ? 600 : f.baseZ);
      if(!f.locked){var s=forced?-1:d; if(s<bestScore){bestScore=s;best=i;}}
    });
    closer.style.opacity=endP.toFixed(3); closer.style.filter='blur('+((1-endP)*10).toFixed(1)+'px)';
    var emergeIn=reduce?1:clamp(scroll/(sr.height*0.12),0,1);
    var railA=reduce?1:emergeIn*(1-endP);                 /* emerge at start, submerge at end */
    rail.style.opacity=railA.toFixed(3); rail.style.filter='blur('+((1-railA)*8).toFixed(1)+'px)';
    if(best>=0&&endP<0.5) setFocus(DATA.projects[best]);
  }
  function paintGallery(){
    figs.forEach(function(f){
      var match=isMatch(f.p); f.locked=(pinned.size>0&&!match); f.fig.classList.toggle('locked',f.locked);
      var blur=0,op=1;
      if(f.locked){blur=6;op=0.12+f.p.cred/100*0.14;}
      else if(preview&&!pinned.size&&!match){blur=3.5;op=0.42;}
      f.fig.style.transform='none'; f.fig.style.filter=blur?'blur('+blur+'px)':'none'; f.fig.style.opacity=op;
    });
    closer.style.opacity='0';
  }
  function refresh(){ mode==='scroll'?schedule():paintGallery(); }

  var cur='',swapping=false,pendName='';
  function clearFocus(){cur='';swapping=false;pName.textContent='';pMeta.textContent='';pDesc.textContent='';block.style.opacity='1';block.style.filter='none';previewCats(null);}
  function paint(p){pName.textContent=p.name;pMeta.textContent=(p.client||'');pDesc.textContent=p.bite;previewCats(p.cats);}
  function setFocus(p){
    if(p.name===cur||(swapping&&p.name===pendName))return;
    if(cur===''){cur=p.name;paint(p);return;}
    cur=p.name;pendName=p.name;swapping=true;
    block.style.opacity='0';block.style.filter='blur(7px)';
    setTimeout(function(){paint(p);requestAnimationFrame(function(){block.style.opacity='1';block.style.filter='blur(0px)';setTimeout(function(){swapping=false;},180);});},170);
  }

  function setMode(m){
    mode=m; stage.classList.toggle('gallery',m==='gallery'); viewToggle.textContent=m==='gallery'?'Gallery view':'Contact sheet view';
    if(m==='gallery'){stage.scrollTop=0;layoutGallery();paintGallery();rail.style.opacity='1';rail.style.filter='blur(0px)';clearFocus();} else {layout();schedule();}
    sizePin();
  }
  viewToggle.addEventListener('click',function(){setMode(mode==='scroll'?'gallery':'scroll');});

  /* ---- pinned scroll: the section locks to the top, then page-scroll drives the gallery,
     then it releases to reveal the next section (footer) ---- */
  var wrap=document.createElement('div'); wrap.className='jfg-pin';
  root.parentNode.insertBefore(wrap,root); wrap.appendChild(root);
  root.style.position='sticky'; root.style.top='0';
  function internalMax(){ return Math.max(0, track.offsetHeight - stage.clientHeight); }
  var pinH=0;
  /* keep the pin geometry constant across modes so switching to Contact sheet
     doesn't collapse the pin (which let the whole section scroll away) */
  function sizePin(){ if(mode==='scroll'){ pinH=stage.clientHeight+internalMax(); } wrap.style.height=(pinH||stage.clientHeight)+'px'; }
  function onPageScroll(){
    if(mode!=='scroll') return;
    var im=internalMax(); if(im<1){schedule();return;}
    var top=wrap.getBoundingClientRect().top;
    stage.scrollTop=clamp(-top,0,im);
    schedule();
  }
  window.addEventListener('scroll',onPageScroll,{passive:true});
  window.addEventListener('resize',function(){
    var w=stage.clientWidth;
    if(w!==lastW){ lastW=w; if(mode==='scroll'){layout();} else {layoutGallery();} }
    sizePin(); (mode==='scroll'?schedule():paintGallery());
  });
  layout(); sizePin(); schedule();
})();
