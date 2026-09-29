(function(){
  var started=false;
  function css(el,o){
    for(var k in o){ el.style[k]=o[k]; }
  }
  var menuDone=false;
  function initMenu(){
    if(menuDone) return;
    var navbar=document.querySelector(`.navbar-2`)
      ||document.querySelector(`.w-nav`);
    var menu=document.querySelector(`.nav-menu-2`);
    if(!navbar||!menu) return;
    menuDone=true;
    var B=12, MS=500;
    var st=document.createElement(`style`);
    st.textContent=`.nav-menu-2{`
      +`transform:none !important;`
      +`transition:opacity `+MS+`ms ease,`
      +`filter `+MS+`ms ease !important;}`
      +`.nav-title.fullscreen.right:hover{`
      +`color:var(--primary-blue);}`;
    document.head.appendChild(st);
    function isOpen(){
      if(navbar.querySelector(
        `.w-nav-button.w--open`
      )){ return true; }
      var ov=navbar.querySelector(
        `.w-nav-overlay`
      );
      if(ov&&getComputedStyle(ov).display
        !==`none`){ return true; }
      return false;
    }
    function apply(){
      var o=isOpen();
      menu.style.opacity=o?`1`:`0`;
      menu.style.filter=o
        ?`blur(0px)`
        :`blur(`+B+`px)`;
    }
    var mo=new MutationObserver(apply);
    mo.observe(navbar,{
      attributes:true,
      subtree:true,
      attributeFilter:[`class`,`style`]
    });
    apply();
  }
  function boot(){
    if(started) return;
    var slider=document.querySelector(
      `.slider-2.w-slider`
    );
    if(!slider) return;
    var imgs=[].slice.call(
      slider.querySelectorAll(`.w-slide img`)
    );
    if(!imgs.length) return;
    started=true;
    try{ setup(slider,imgs); }
    catch(e){ console.error(`PILE ERROR:`,e); }
  }
  function setup(slider,imgs){
    var MARGIN=25;
    var OFFSET=6;
    var ROT=0;
    var FLICKER_MS=150;
    var IDLE_MS=250;
    var WIN=10;
    var SIZE=100-2*MARGIN;

    var mask=slider.querySelector(
      `.w-slider-mask`
    )||slider;
    var arrows=slider.querySelectorAll(
      `.w-slider-arrow-left,`+
      `.w-slider-arrow-right,.w-slider-nav`
    );
    [].forEach.call(arrows,function(a){
      a.style.display=`none`;
    });

    if(getComputedStyle(mask).position===`static`){
      mask.style.position=`relative`;
    }
    var h0=Math.round(
      mask.getBoundingClientRect().height
    );
    if(h0){
      mask.style.height=h0+`px`;
      slider.style.height=h0+`px`;
    }
    mask.style.overflow=`hidden`;
    mask.style.background=`#000`;
    var landing=slider.closest(
      `.full-height-section`
    )||slider.closest(`section`);
    if(landing){
      landing.style.background=`#000`;
    }

    var urls=imgs.map(function(img){
      return img.currentSrc
        ||img.getAttribute(`src`)
        ||img.src;
    });
    urls.forEach(function(u){
      var p=new Image();
      p.src=u;
    });
    [].forEach.call(
      slider.querySelectorAll(`.w-slide`),
      function(s){ s.style.display=`none`; }
    );

    var pile=document.createElement(`div`);
    css(pile,{
      position:`absolute`,
      left:`0`,
      top:`0`,
      width:`100%`,
      height:`100%`,
      overflow:`hidden`,
      pointerEvents:`none`,
      zIndex:`2`
    });
    mask.appendChild(pile);

    var LOGO_W=55;
    var FADE_END=0.7;
    var MAX_BLUR=16;
    var INTRO_MS=900;
    var REVEAL_DELAY=400;
    var origLogo=document.querySelector(
      `.white-nav-jf`
    );
    var logoImgEl=origLogo
      ?origLogo.querySelector(`img`)
      :null;
    if(logoImgEl){
      origLogo.style.display=`none`;
      var lg=document.createElement(`img`);
      lg.src=logoImgEl.currentSrc
        ||logoImgEl.getAttribute(`src`)
        ||logoImgEl.src;
      css(lg,{
        position:`fixed`,
        left:`50%`,
        top:`50%`,
        transform:`translate(-50%,-50%)`,
        width:LOGO_W+`px`,
        height:`auto`,
        zIndex:`99999`,
        pointerEvents:`none`,
        opacity:`0`,
        filter:`brightness(0) invert(1)`
      });
      document.body.appendChild(lg);

      var intro=false;
      function fadeLogo(){
        if(!intro){ return; }
        var vh=window.innerHeight*FADE_END;
        var p=window.scrollY/vh;
        if(p<0){ p=0; }
        if(p>1){ p=1; }
        lg.style.opacity=String(1-p);
        var bl=(p*MAX_BLUR).toFixed(1);
        lg.style.filter=
          `brightness(0) invert(1) `+
          `blur(`+bl+`px)`;
      }
      window.addEventListener(
        `scroll`,fadeLogo,{passive:true}
      );

      var shown=false;
      function showLogo(){
        if(shown){ return; }
        shown=true;
        var kf=[
          {opacity:0,
           filter:`brightness(0) invert(1) `+
             `blur(16px)`},
          {opacity:1,
           filter:`brightness(0) invert(1) `+
             `blur(0px)`}
        ];
        function done(){
          lg.style.opacity=`1`;
          lg.style.filter=
            `brightness(0) invert(1) blur(0px)`;
          intro=true;
          fadeLogo();
        }
        if(lg.animate){
          var an=lg.animate(kf,{
            duration:INTRO_MS,
            easing:`ease`,
            fill:`forwards`
          });
          an.onfinish=function(){
            an.cancel();
            done();
          };
        }else{
          done();
        }
      }

      var pre=document.querySelector(
        `.preloader`
      );
      var seen=false;
      var t0=Date.now();
      function go(){
        clearInterval(wait);
        setTimeout(showLogo,REVEAL_DELAY);
      }
      var wait=setInterval(function(){
        if(!pre){ go(); return; }
        var d=getComputedStyle(pre).display;
        if(d!==`none`){
          seen=true;
        }else if(seen){
          go();
        }else if(Date.now()-t0>3000){
          go();
        }
      },60);
      setTimeout(function(){
        if(!shown){ showLogo(); }
      },12000);
    }

    var layers=[];
    var counter=0;
    function reflow(){
      var i,d,L;
      for(i=0;i<layers.length;i++){
        d=layers.length-1-i;
        L=layers[i];
        if(d>=WIN){ L.style.opacity=`0`; }
        L.style.zIndex=i;
      }
      while(layers.length>WIN+3){
        var o=layers.shift();
        if(o.parentNode){
          o.parentNode.removeChild(o);
        }
      }
    }
    function revealNext(){
      var u=urls[counter%urls.length];
      var dx=(Math.random()*2-1)*OFFSET;
      var dy=(Math.random()*2-1)*OFFSET;
      var rot=(Math.random()*2-1)*ROT;
      var L=document.createElement(`div`);
      var tf=`translate(`+dx+`%,`+dy+`%) `+
        `rotate(`+rot+`deg)`;
      css(L,{
        position:`absolute`,
        left:`0`,
        top:`0`,
        width:`100%`,
        height:`100%`,
        display:`flex`,
        alignItems:`center`,
        justifyContent:`center`,
        opacity:`0`,
        transform:tf,
        transition:`opacity 0.45s ease`
      });
      var im=document.createElement(`img`);
      im.src=u;
      im.loading=`eager`;
      css(im,{
        maxWidth:SIZE+`%`,
        maxHeight:SIZE+`%`,
        width:`auto`,
        height:`auto`,
        display:`block`
      });
      L.appendChild(im);
      pile.appendChild(L);
      layers.push(L);
      counter++;
      reflow();
      requestAnimationFrame(function(){
        L.style.opacity=`1`;
      });
    }
    revealNext();

    var SCROLL_MS=850;
    function easeInOut(t){
      return t<0.5?4*t*t*t
        :1-Math.pow(-2*t+2,3)/2;
    }
    function glide(el){
      var s=window.scrollY;
      var e=el.getBoundingClientRect().top+s;
      var t0=null;
      function step(ts){
        if(!t0){ t0=ts; }
        var p=(ts-t0)/SCROLL_MS;
        if(p>1){ p=1; }
        window.scrollTo(0,s+(e-s)*easeInOut(p));
        if(p<1){ requestAnimationFrame(step); }
      }
      requestAnimationFrame(step);
    }
    var target=
      document.querySelector(`#Cover-section`)
      ||document.querySelector(
        `.cover-section.construction`
      )
      ||document.querySelector(`.cover-section`);
    if(landing&&target){
      landing.style.cursor=`pointer`;
      landing.addEventListener(
        `click`,
        function(e){
          if(e.target.closest&&
            e.target.closest(
              `a,button,input,`+
              `textarea,select,label`
            )){ return; }
          glide(target);
        }
      );
    }

    var last=0;
    function mark(){ last=Date.now(); }
    window.addEventListener(
      `mousemove`,mark,{passive:true}
    );
    window.addEventListener(
      `touchmove`,mark,{passive:true}
    );
    setInterval(function(){
      if(Date.now()-last<IDLE_MS){
        revealNext();
      }
    },FLICKER_MS);

    var rz;
    window.addEventListener(`resize`,function(){
      clearTimeout(rz);
      rz=setTimeout(function(){
        mask.style.height=``;
        slider.style.height=``;
        var h=Math.round(
          mask.getBoundingClientRect().height
        );
        if(h){
          mask.style.height=h+`px`;
          slider.style.height=h+`px`;
        }
      },200);
    });
  }
  function run(){ initMenu(); boot(); }
  document.addEventListener(
    `DOMContentLoaded`,run
  );
  window.addEventListener(`load`,run);
  if(window.Webflow&&Webflow.push){
    Webflow.push(run);
  }
  var n=0;
  var t=setInterval(function(){
    run();
    if(started||(menuDone&&++n>40)){
      clearInterval(t);
    }
  },150);
})();
