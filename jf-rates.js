/* jerryflorez.com — Photography rate card + estimate builder.
   Drop <div id="jf-rates"></div> into a Webflow page, then load this file.
   Uses the site's own fonts (Bluunext Webfont, Bluunext Titling, Averia Serif Libre).
   Self-contained + scoped under #jf-rates so it won't touch Webflow styles. */
(function(){
  var root=document.getElementById('jf-rates');
  if(!root || root.getAttribute('data-built')) return;
  root.setAttribute('data-built','1');

  var CSS = `
  #jf-rates{--bg:#070707;--panel:#0e0e0e;--ink:#f2f0ec;--mute:rgba(242,240,236,.46);
    --faint:rgba(242,240,236,.13);--line:rgba(242,240,236,.10);--red:#e6392e;
    --display:"Bluunext Webfont","Bluunext",sans-serif;
    --ui:"Bluunext Titling","Bluunext Webfont",sans-serif;
    --serif:"Averia Serif Libre",Georgia,serif;
    --ease:cubic-bezier(.16,.84,.44,1);
    background:var(--bg);color:var(--ink);font-family:var(--serif);font-weight:300;line-height:1.55;
    padding:7vh 6vw 9vh;max-width:100%;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
  #jf-rates,#jf-rates *{box-sizing:border-box;}
  #jf-rates .jfr-wrap{max-width:1040px;margin:0 auto;}
  #jf-rates a{color:var(--red);text-decoration:none;}
  #jf-rates .eyebrow{font-family:var(--ui);font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:var(--mute);margin:0;}
  #jf-rates h1{font-family:var(--display);font-weight:700;font-size:clamp(40px,7vw,86px) !important;line-height:.96 !important;letter-spacing:.01em;margin:16px 0 0;}
  #jf-rates .statement{font-family:var(--serif);font-size:clamp(18px,1.9vw,24px);line-height:1.45;color:var(--ink);max-width:40ch;margin:26px 0 0;}
  #jf-rates .statement em{font-style:italic;color:#fff;}
  #jf-rates .lede{font-size:15px;color:var(--mute);max-width:58ch;margin:20px 0 0;}
  #jf-rates h2{font-family:var(--ui);font-size:12px !important;line-height:1.4 !important;letter-spacing:.3em;text-transform:uppercase;color:var(--mute);margin:56px 0 20px;font-weight:400 !important;}
  #jf-rates .tiers{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
  #jf-rates .tier{background:var(--panel);border:1px solid var(--line);padding:22px 20px;cursor:pointer;display:flex;flex-direction:column;
    transition:border-color .5s var(--ease),filter .5s var(--ease),opacity .5s var(--ease);}
  #jf-rates .tiers:hover .tier:not(:hover){filter:blur(2.4px);opacity:.5;}
  #jf-rates .tier:hover{border-color:rgba(242,240,236,.3);}
  #jf-rates .tier.active{border-color:var(--red);}
  #jf-rates .tier .tname{font-family:var(--display);font-weight:700;font-size:21px;}
  #jf-rates .tier .tsub{font-family:var(--ui);font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute);margin-top:4px;}
  #jf-rates .tier .from{font-family:var(--display);font-weight:700;font-size:27px;margin:16px 0 2px;}
  #jf-rates .tier .fromnote{font-family:var(--ui);font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--mute);}
  #jf-rates .tier ul{list-style:none;margin:16px 0 0;padding:0;flex:1;}
  #jf-rates .tier li{font-size:13px;line-height:1.45;padding:6px 0;border-top:1px solid var(--line);color:rgba(242,240,236,.82);}
  #jf-rates .tier li:first-child{border-top:0;}
  #jf-rates .pick{margin-top:16px;font-family:var(--ui);font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--red);opacity:0;transition:opacity .4s;}
  #jf-rates .tier:hover .pick,#jf-rates .tier.active .pick{opacity:1;}
  #jf-rates .builder{display:grid;grid-template-columns:1.25fr .9fr;gap:30px;align-items:start;}
  #jf-rates .row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 2px;border-top:1px solid var(--line);}
  #jf-rates .row:first-child{border-top:0;}
  #jf-rates .row label{font-family:var(--serif);font-size:16px;color:rgba(242,240,236,.9);}
  #jf-rates .row .hint{display:block;font-family:var(--ui);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);margin-top:3px;}
  #jf-rates select,#jf-rates input[type=number]{font-family:var(--ui);font-size:14px;color:var(--ink);background:var(--panel);border:1px solid var(--faint);padding:9px 11px;letter-spacing:.03em;transition:border-color .4s;border-radius:0;}
  #jf-rates select{min-width:150px;}
  #jf-rates select:focus,#jf-rates input:focus{outline:none;border-color:var(--red);}
  #jf-rates input[type=number]{width:80px;text-align:right;font-variant-numeric:tabular-nums;}
  #jf-rates .toggle{display:inline-flex;align-items:center;cursor:pointer;user-select:none;}
  #jf-rates .toggle input{position:absolute;opacity:0;pointer-events:none;}
  #jf-rates .sw{width:40px;height:20px;border:1px solid var(--faint);border-radius:20px;position:relative;transition:border-color .4s;}
  #jf-rates .sw::after{content:"";position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:var(--mute);transition:transform .4s var(--ease),background .4s;}
  #jf-rates .toggle input:checked + .sw{border-color:var(--red);}
  #jf-rates .toggle input:checked + .sw::after{transform:translateX(20px);background:var(--red);}
  #jf-rates .estimate{position:sticky;top:24px;background:var(--panel);border:1px solid var(--line);padding:26px 24px;}
  #jf-rates .est-label{font-family:var(--ui);font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:var(--mute);}
  #jf-rates .lines{margin:16px 0 6px;transition:opacity .45s ease,filter .45s ease;}
  #jf-rates .eline{display:flex;justify-content:space-between;gap:12px;font-family:var(--ui);font-size:13px;letter-spacing:.02em;padding:7px 0;color:rgba(242,240,236,.82);font-variant-numeric:tabular-nums;}
  #jf-rates .total{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-top:1px solid var(--faint);margin-top:12px;padding-top:16px;}
  #jf-rates .total .t-l{font-family:var(--ui);font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--mute);}
  #jf-rates .total .t-v{font-family:var(--display);font-weight:700;font-size:40px;font-variant-numeric:tabular-nums;transition:opacity .45s ease,filter .45s ease;}
  #jf-rates .est-note{font-family:var(--serif);font-size:12.5px;line-height:1.5;color:var(--mute);margin-top:16px;}
  #jf-rates .fine{margin-top:16px;columns:2;column-gap:40px;}
  #jf-rates .fine p{break-inside:avoid;font-size:13.5px;line-height:1.55;color:rgba(242,240,236,.72);margin:0 0 12px;}
  #jf-rates .fine b{font-family:var(--ui);font-weight:400;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink);display:block;margin-bottom:3px;}
  @media (max-width:900px){#jf-rates .tiers{grid-template-columns:repeat(2,1fr);} #jf-rates .tiers:hover .tier:not(:hover){filter:none;opacity:1;}}
  @media (max-width:820px){#jf-rates .builder{grid-template-columns:1fr;} #jf-rates .estimate{position:static;} #jf-rates .fine{columns:1;}}
  @media (max-width:520px){#jf-rates .tiers{grid-template-columns:1fr;} #jf-rates select{min-width:0;max-width:56vw;} #jf-rates .row{gap:10px;}}
  #jf-rates .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
  #jf-rates .step{border-top:1px solid var(--line);padding-top:16px;}
  #jf-rates .step .n{font-family:var(--ui);font-size:10px;letter-spacing:.24em;color:var(--red);}
  #jf-rates .step .sh{font-family:var(--display);font-weight:700;font-size:18px;margin:9px 0 7px;}
  #jf-rates .step p{font-size:13.5px;line-height:1.5;color:rgba(242,240,236,.74);margin:0;}
  #jf-rates .cta{margin-top:58px;border-top:1px solid var(--faint);padding-top:30px;display:flex;justify-content:space-between;align-items:flex-end;gap:28px;flex-wrap:wrap;}
  #jf-rates .cta h3{font-family:var(--display);font-weight:700;font-size:clamp(26px,3.2vw,44px);line-height:1.02;margin:0;max-width:16ch;}
  #jf-rates .cta .c-r{font-family:var(--serif);font-size:15px;line-height:1.5;color:rgba(242,240,236,.8);max-width:34ch;}
  #jf-rates .cta .c-r a{font-family:var(--ui);letter-spacing:.04em;display:inline-block;margin-top:8px;}
  @media (max-width:820px){#jf-rates .steps{grid-template-columns:1fr 1fr;}}
  @media (max-width:520px){#jf-rates .steps{grid-template-columns:1fr;}}
  @media (prefers-reduced-motion: reduce){#jf-rates *{transition-duration:.001ms !important;}}
  `;

  var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);

  root.innerHTML = `
  <div class="jfr-wrap">
    <p class="eyebrow">Jerry Florez — Architectural Photography</p>
    <h1>Rates &amp;<br>Licensing</h1>
    <p class="statement">I photograph spaces and the life that settles into them — drawn to atmosphere, imperfection and <em>a trace of the human</em> more than the pristine or the new. Working in analogue, I try to catch the ephemeral: how a place feels to be in, and what makes it stay with us.</p>
    <p class="lede">Choose a tier as a starting point, then shape the estimate to your brief. Guide prices — every project is quoted individually.</p>

    <h2>Choose a starting point</h2>
    <div class="tiers" id="jfr-tiers"></div>

    <h2>Shape your estimate</h2>
    <div class="builder">
      <div class="controls" id="jfr-controls">
        <div class="row"><label>Shoot<span class="hint">on-site, natural light + edit</span></label>
          <select id="jfr-shoot"><option value="800">Full day — £800</option><option value="500">Half day — £500</option></select></div>
        <div class="row"><label>Film<span class="hint">medium format brings depth; 35mm is leaner</span></label>
          <select id="jfr-fmt"><option value="mixed">Mixed — 120 + 35mm</option><option value="s35">35mm only</option></select></div>
        <div class="row"><label>Site visit<span class="hint">1 hour on site to plan shots in advance — complimentary</span></label>
          <label class="toggle"><input type="checkbox" id="jfr-visit"><span class="sw"></span></label></div>
        <div class="row"><label>Usage licence<span class="hint">% of creative fee</span></label>
          <select id="jfr-lic"><option value="0">None</option><option value="25">Basic — internal, social, web (+25%)</option><option value="50">Extended commercial — press, advertising (+50%)</option></select></div>
        <div class="row"><label>Additional licensed parties<span class="hint">+25% of fee each</span></label>
          <input type="number" id="jfr-tp" min="0" max="8" value="0"></div>
        <div class="row"><label>Assistant on set<span class="hint">£150/day</span></label>
          <label class="toggle"><input type="checkbox" id="jfr-asst"><span class="sw"></span></label></div>
        <div class="row"><label>Additional images<span class="hint">£40 each</span></label>
          <input type="number" id="jfr-img" min="0" max="60" value="0"></div>
        <div class="row"><label>Light retouching<span class="hint">£30 each</span></label>
          <input type="number" id="jfr-ret" min="0" max="60" value="0"></div>
        <div class="row"><label>Processing &amp; dev<span class="hint">turnaround, per roll</span></label>
          <select id="jfr-proc"><option value="35">Standard, 7-day — £35/roll</option><option value="56">Same-day — £56/roll</option></select></div>
        <div class="row"><label>Extra medium-format rolls<span class="hint">beyond base — ~£25 + processing</span></label>
          <input type="number" id="jfr-amf" min="0" max="20" value="0"></div>
        <div class="row"><label>Extra 35mm rolls<span class="hint">beyond base — ~£15 + processing</span></label>
          <input type="number" id="jfr-a35" min="0" max="20" value="0"></div>
      </div>
      <aside class="estimate">
        <div class="est-label">Estimate</div>
        <div class="lines" id="jfr-lines"></div>
        <div class="total"><span class="t-l">Total</span><span class="t-v" id="jfr-total">£0</span></div>
        <p class="est-note">Guide estimate. Film &amp; processing are passed through at cost; licence is charged on the creative fee only. Totals are rounded to the nearest £50; final figure confirmed per project.</p>
      </aside>
    </div>

    <h2>Good to know</h2>
    <div class="fine">
      <p><b>Base film included</b>Each shoot includes a working stock — 4×120 + 3×35mm on a full day, 2×120 + 2×35mm on a half (fewer on 35mm-only). Extra rolls billed at cost.</p>
      <p><b>Images</b>15–30 finished images on a full day (around 10 on a half), selected at the photographer's discretion; light &amp; colour correction included.</p>
      <p><b>Site visit</b>An hour on site before the shoot to walk through, plan compositions and agree the brief. Complimentary — included on several tiers, and happy to arrange it for any brief.</p>
      <p><b>Licensing</b>A percentage of the creative fee, not materials. Extended commercial covers magazines, print &amp; digital advertising and competitions; each additional party adds 25%.</p>
      <p><b>Expenses &amp; equipment</b>Film (~£25/roll 120, ~£15/roll 35mm) and processing (£35–£56/roll) billed at cost. Specialist lens or lighting rental quoted separately when a brief needs it.</p>
      <p><b>Events &amp; documentary</b>Quoted separately — from £500 half day, £720 full day. Enquire at <a href="mailto:studio@jerryflorez.com">studio@jerryflorez.com</a>.</p>
    </div>

    <h2>How it works</h2>
    <div class="steps">
      <div class="step"><div class="n">01</div><div class="sh">Enquiry &amp; brief</div><p>Tell me about the building and what it needs to say.</p></div>
      <div class="step"><div class="n">02</div><div class="sh">Site visit</div><p>An unhurried hour on site to walk through and plan the shots.</p></div>
      <div class="step"><div class="n">03</div><div class="sh">Shoot day</div><p>Natural light and analogue film, working at the building's pace.</p></div>
      <div class="step"><div class="n">04</div><div class="sh">Delivery</div><p>Edited images within three weeks — sooner when a brief needs it.</p></div>
    </div>

    <div class="cta">
      <h3>Let's photograph your building.</h3>
      <div class="c-r">Tell me about the project and we'll find the right fit — a coffee is always welcome.<a href="mailto:studio@jerryflorez.com">studio@jerryflorez.com</a></div>
    </div>
  </div>`;

  var TIERS=[
   {name:"Essentials",sub:"Half day",
    inc:["Half-day shoot + edit","Free site visit","Basic licence — internal, social, web","1 revision · 10 images","35mm, 3-week turnaround"],
    cfg:{shoot:500,fmt:"s35",visit:true,lic:25,tp:0,asst:false,img:0,ret:0,proc:35,amf:0,a35:0}},
   {name:"Lightweight",sub:"Full day",
    inc:["Full-day shoot + edit","Basic licence — internal, social, web","2 revisions · 15+ images","3-week turnaround","Base film included"],
    cfg:{shoot:800,fmt:"mixed",visit:false,lic:25,tp:0,asst:false,img:0,ret:0,proc:35,amf:0,a35:0}},
   {name:"Crafted",sub:"Full day + shared",
    inc:["Full-day shoot + edit","Free site visit","Basic licence + 1 shared party","3 revisions · 20+ images","2-week turnaround"],
    cfg:{shoot:800,fmt:"mixed",visit:true,lic:25,tp:1,asst:false,img:0,ret:0,proc:35,amf:0,a35:0}},
   {name:"Editorial",sub:"Full commercial",
    inc:["Full day + assistant + visit","Commercial licence + 2 parties","Light retouch · 15–30 images","7-day turnaround","Base film included"],
    cfg:{shoot:800,fmt:"mixed",visit:true,lic:50,tp:2,asst:true,img:0,ret:3,proc:35,amf:0,a35:0}}
  ];
  var MF_FILM=25, F35_FILM=15, VISIT=0;
  function $(id){return document.getElementById(id);}
  function num(id){var v=parseFloat($(id).value);return isFinite(v)?v:0;}
  function gbp(n){return '£'+(isFinite(n)?Math.round(n):0).toLocaleString('en-GB');}
  function round50(n){return Math.round(n/50)*50;}
  function gbpR(n){return gbp(round50(n));}
  function baseRolls(shoot,fmt){
    if(fmt==='s35') return shoot===800?{mf:0,r35:6}:{mf:0,r35:3};
    return shoot===800?{mf:4,r35:3}:{mf:2,r35:2};
  }
  function calc(c){
    var fee=c.shoot, visit=c.visit?VISIT:0;
    var service=fee+visit+(c.asst?150:0)+c.img*40+c.ret*30;
    var b=baseRolls(c.shoot,c.fmt);
    var mf=b.mf+c.amf, r35=b.r35+c.a35, rolls=mf+r35;
    var materials=mf*MF_FILM+r35*F35_FILM+rolls*c.proc;
    var licpct=c.lic+c.tp*25, licence=fee*(licpct/100);
    return {fee:fee,visit:visit,service:service,mf:mf,r35:r35,rolls:rolls,materials:materials,licpct:licpct,licence:licence,total:service+materials+licence};
  }
  function readUI(){return {shoot:num('jfr-shoot'),fmt:$('jfr-fmt').value,visit:$('jfr-visit').checked,
    lic:num('jfr-lic'),tp:num('jfr-tp'),asst:$('jfr-asst').checked,img:num('jfr-img'),ret:num('jfr-ret'),
    proc:num('jfr-proc'),amf:num('jfr-amf'),a35:num('jfr-a35')};}
  function writeUI(c){$('jfr-shoot').value=c.shoot;$('jfr-fmt').value=c.fmt;$('jfr-visit').checked=c.visit;
    $('jfr-lic').value=c.lic;$('jfr-tp').value=c.tp;$('jfr-asst').checked=c.asst;$('jfr-img').value=c.img;
    $('jfr-ret').value=c.ret;$('jfr-proc').value=c.proc;$('jfr-amf').value=c.amf;$('jfr-a35').value=c.a35;}

  var linesEl=$('jfr-lines'), totalEl=$('jfr-total');
  function softSwap(fn){linesEl.style.opacity=0;linesEl.style.filter='blur(5px)';totalEl.style.opacity=0;totalEl.style.filter='blur(6px)';
    setTimeout(function(){fn();requestAnimationFrame(function(){linesEl.style.opacity=1;linesEl.style.filter='blur(0)';totalEl.style.opacity=1;totalEl.style.filter='blur(0)';});},150);}
  function render(){
    var c=readUI(), r=calc(c), rows=[['Creative fee ('+(c.shoot===800?'full day':'half day')+')',gbp(r.fee)]];
    if(c.visit)rows.push(['Site visit','Included']);
    if(c.asst)rows.push(['Assistant on set',gbp(150)]);
    if(c.img)rows.push([c.img+' additional image'+(c.img>1?'s':''),gbp(c.img*40)]);
    if(c.ret)rows.push([c.ret+' light retouch'+(c.ret>1?'es':''),gbp(c.ret*30)]);
    if(r.licpct>0)rows.push(['Usage licence (+'+r.licpct+'% of fee)',gbp(r.licence)]);
    var fdesc=r.mf>0?(r.mf+'×120, '+r.r35+'×35mm'):(r.r35+'×35mm');
    rows.push(['Film &amp; processing — '+r.rolls+' rolls ('+fdesc+')',gbp(r.materials)]);
    linesEl.innerHTML=rows.map(function(x){return '<div class="eline"><span>'+x[0]+'</span><span>'+x[1]+'</span></div>';}).join('');
    totalEl.textContent=gbpR(r.total);
  }
  function update(soft){soft?softSwap(render):render();}

  var tiersEl=$('jfr-tiers');
  TIERS.forEach(function(t){
    var from=calc(t.cfg).total, el=document.createElement('div');
    el.className='tier'; el.tabIndex=0;
    el.innerHTML='<div class="tname">'+t.name+'</div><div class="tsub">'+t.sub+'</div>'+
      '<div class="from">from '+gbpR(from)+'</div><div class="fromnote">all-in · rounded · incl. base film</div>'+
      '<ul>'+t.inc.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul><div class="pick">Load into estimate →</div>';
    function choose(){var all=tiersEl.querySelectorAll('.tier');for(var i=0;i<all.length;i++)all[i].classList.remove('active');el.classList.add('active');writeUI(t.cfg);update(true);}
    el.addEventListener('click',choose);
    el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();choose();}});
    tiersEl.appendChild(el);
  });
  $('jfr-controls').addEventListener('input',function(){update(true);});
  writeUI(TIERS[1].cfg); tiersEl.querySelectorAll('.tier')[1].classList.add('active'); render();
})();
