/* ===================== PLAYER ===================== */
(function(){
var E=window.__EC, S=E.SCENES, CUTS=E.CUTS;
var film=document.getElementById('film'),
    stage=document.getElementById('stage'),
    capEl=document.getElementById('cap'),
    eyeEl=document.getElementById('eyebrow'),
    eyeT=document.getElementById('eyebrow-t'),
    titleEl=document.getElementById('title'),
    stepsEl=document.getElementById('steps'),
    progEl=document.getElementById('prog'),
    frame=document.getElementById('frame'),
    wrap=frame.parentNode;

var XF=0.34;               /* cross-fade between entries, seconds */
var i, byId={};

/* ---- mount every scene once; cuts reuse them ---- */
for(i=0;i<S.length;i++){
  var sc=S[i];
  var d=document.createElement('div');
  d.className='scene'; d.style.visibility='hidden';
  var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 1920 1080');
  svg.setAttribute('preserveAspectRatio','xMidYMid meet');
  d.appendChild(svg); film.appendChild(d);
  sc.el=d; sc.svg=svg; byId[sc.id]=sc;
  sc.build(svg);
}

/* the full cut is every scene, at its own pace */
for(i=0;i<CUTS.length;i++) if(CUTS[i].id==='full'){
  CUTS[i].entries=S.map(function(sc){
    return {id:sc.id,from:0,to:sc.dur,dur:sc.dur,cues:sc.cues||[]};
  });
}

/* ---- program: the active cut, laid out on one timeline ---- */
var PROG=[], T=0, CUT=null;
function loadCut(id){
  var cut=null;
  for(var k=0;k<CUTS.length;k++) if(CUTS[k].id===id) cut=CUTS[k];
  if(!cut) cut=CUTS[0];
  CUT=cut; PROG=[]; T=0;
  for(var j=0;j<cut.entries.length;j++){
    var en=cut.entries[j], sc=byId[en.id];
    if(!sc) continue;
    PROG.push({
      sc:sc, t0:T, dur:en.dur, from:en.from, to:en.to,
      cues:en.cues||sc.cues||[],
      chapter:en.chapter||sc.chapter,
      eyebrow:en.eyebrow||sc.eyebrow,
      title:en.title||sc.title
    });
    T+=en.dur;
  }
  buildChapters(); buildMarks(); lastTitle=null; lastCap=null;
  if(cutBtns.length) for(var q=0;q<cutBtns.length;q++)
    cutBtns[q].b.setAttribute('aria-current', cutBtns[q].id===cut.id ? 'true':'false');
  return T;
}
/* native time inside a scene for a given entry-local time */
function nat(en,lt){ return en.from + (en.to-en.from)*(en.dur?cl01(lt/en.dur):0); }
function cl01(v){ return v<0?0:(v>1?1:v); }

/* ---- step chips ---- */
var chips=[];
for(i=0;i<6;i++){
  var c=document.createElement('div');
  c.className='step-chip'; c.textContent=String(i+1);
  stepsEl.appendChild(c); chips.push(c);
}

/* ---- chapters + timeline marks ---- */
var chapEl=document.getElementById('chapters'), chapBtns=[];
var marks=document.getElementById('scrubMarks');
function buildChapters(){
  chapEl.innerHTML=''; chapBtns=[];
  for(var k=0;k<PROG.length;k++) (function(en){
    if(!en.chapter) return;
    var b=document.createElement('button');
    b.className='chip'; b.type='button'; b.textContent=en.chapter;
    b.addEventListener('click',function(){ seek(en.t0+0.01); });
    chapEl.appendChild(b); chapBtns.push({b:b,en:en});
  })(PROG[k]);
}
function buildMarks(){
  marks.innerHTML='';
  for(var k=1;k<PROG.length;k++){
    var m=document.createElement('i'); m.style.left=(PROG[k].t0/T*100)+'%'; marks.appendChild(m);
  }
}

/* ---- cut selector ---- */
var cutEl=document.getElementById('cutbar'), cutBtns=[];
function buildCutBar(){
  if(!cutEl) return;
  cutEl.innerHTML='';
  for(var k=0;k<CUTS.length;k++) (function(cut){
    var total=0;
    for(var j=0;j<cut.entries.length;j++) total+=cut.entries[j].dur;
    var b=document.createElement('button');
    b.className='chip cut'; b.type='button';
    b.textContent=cut.label+' · '+fmt(total);
    b.title=cut.note||'';
    b.addEventListener('click',function(){
      var wasPlaying=playing; pause();
      loadCut(cut.id); now=0; render(0);
      if(wasPlaying) play();
    });
    cutEl.appendChild(b); cutBtns.push({b:b,id:cut.id});
  })(CUTS[k]);
}

/* ---- render ---- */
var lastCap=null, lastTitle=null;

function findEntry(t){
  for(var k=PROG.length-1;k>=0;k--) if(t>=PROG[k].t0) return k;
  return 0;
}
function fadeAmt(x,a,b){ return x<a?0:(x>b?1:(x-a)/(b-a)); }

function render(t){
  t=Math.max(0,Math.min(T-0.001,t));
  var k=findEntry(t), en=PROG[k], lt=t-en.t0, prev=k>0?PROG[k-1]:null;
  var sc=en.sc, ntime=nat(en,lt);

  /* visibility + crossfade (a scene can appear in several entries, never adjacent) */
  for(var j=0;j<S.length;j++){
    var vis=(S[j]===sc)||(prev&&S[j]===prev.sc&&lt<XF);
    if(S[j].el.style.visibility!==(vis?'visible':'hidden'))
      S[j].el.style.visibility=vis?'visible':'hidden';
    if(!vis) S[j].el.style.opacity=0;
  }
  if(prev&&lt<XF&&prev.sc!==sc){
    prev.sc.el.style.opacity=String(1-lt/XF);
    prev.sc.update(Math.min(prev.sc.dur-0.001,prev.to));
    sc.el.style.opacity=String(lt/XF);
  } else {
    sc.el.style.opacity='1';
  }
  sc.update(ntime);

  /* theme */
  var dark = sc.darkAt ? sc.darkAt(ntime) : !!sc.dark;
  stage.classList.toggle('dark',dark);
  stage.style.background = sc.bg ? sc.bg(ntime) : (dark?'#0D1719':'#E9EDE6');

  /* header */
  var showH = !sc.hideHeader;
  var hA = showH ? fadeAmt(lt,0.15,0.9)*(1-fadeAmt(lt,en.dur-0.5,en.dur-0.05)) : 0;
  eyeEl.style.opacity=hA; titleEl.style.opacity=hA;
  eyeEl.style.transform='translateY('+((1-hA)*10)+'px)';
  titleEl.style.transform='translateY('+((1-hA)*14)+'px)';
  if(lastTitle!==en.t0+'|'+sc.id){
    eyeT.textContent=en.eyebrow||''; titleEl.textContent=en.title||'';
    lastTitle=en.t0+'|'+sc.id;
  }

  /* step chips */
  var showSteps = !!sc.step;
  stepsEl.style.opacity = showSteps ? hA : 0;
  if(showSteps) for(var q=0;q<6;q++)
    chips[q].className='step-chip'+(q+1===sc.step?' on':(q+1<sc.step?' done':''));

  /* caption */
  var html='', a=0;
  for(var c=0;c<en.cues.length;c++){
    var cu=en.cues[c], s0=cu[0], s1=cu[0]+cu[1];
    if(lt>=s0-0.25&&lt<=s1+0.3){
      html=cu[2];
      a=fadeAmt(lt,s0,s0+0.2)*(1-fadeAmt(lt,s1-0.02,s1+0.24));
      break;
    }
  }
  if(html!==lastCap){ capEl.innerHTML=html; lastCap=html; }
  capEl.style.opacity=a;
  capEl.style.transform='translateY('+((1-a)*7)+'px)';

  progEl.style.width=(t/T*100)+'%';

  if(!CAPTURE){
    fill.style.width=(t/T*100)+'%';
    timeEl.textContent=fmt(t)+' / '+fmt(T);
    for(var z=0;z<chapBtns.length;z++)
      chapBtns[z].b.setAttribute('aria-current', chapBtns[z].en===en ? 'true':'false');
  }
  now=t;
}

/* ---- transport ---- */
var now=0, playing=false, raf=null, anchor=0, anchorT=0;
var playBtn=document.getElementById('playBtn'),
    fill=document.getElementById('scrubFill'),
    timeEl=document.getElementById('time'),
    scrub=document.getElementById('scrub');
var CAPTURE=/[?&]capture=1/.test(location.search);

function fmt(s){ var m=Math.floor(s/60), x=Math.round(s%60); if(x===60){m++;x=0;} return m+':'+(x<10?'0':'')+x; }
function tick(){
  if(!playing) return;
  var t=anchorT+(performance.now()-anchor)/1000;
  if(t>=T){ render(T-0.001); pause(); return; }
  render(t); raf=requestAnimationFrame(tick);
}
function play(){
  if(now>=T-0.02) now=0;
  playing=true; anchor=performance.now(); anchorT=now;
  playBtn.textContent='❚❚ Pause'; playBtn.setAttribute('aria-label','Pause');
  raf=requestAnimationFrame(tick);
}
function pause(){
  playing=false; if(raf) cancelAnimationFrame(raf);
  playBtn.textContent='▶ Play'; playBtn.setAttribute('aria-label','Play');
}
function seek(t){ now=Math.max(0,Math.min(T-0.01,t)); anchorT=now; anchor=performance.now(); render(now); }

playBtn.addEventListener('click',function(){ playing?pause():play(); });
document.getElementById('backBtn').addEventListener('click',function(){ seek(now-10); });
document.getElementById('fwdBtn').addEventListener('click',function(){ seek(now+10); });

function scrubTo(ev){
  var r=scrub.getBoundingClientRect();
  seek(((ev.clientX-r.left)/r.width)*T);
}
var dragging=false;
scrub.addEventListener('pointerdown',function(ev){ dragging=true; scrub.setPointerCapture(ev.pointerId); scrubTo(ev); });
scrub.addEventListener('pointermove',function(ev){ if(dragging) scrubTo(ev); });
scrub.addEventListener('pointerup',function(){ dragging=false; });
scrub.addEventListener('keydown',function(ev){
  if(ev.key==='ArrowRight'){ seek(now+5); ev.preventDefault(); }
  if(ev.key==='ArrowLeft'){ seek(now-5); ev.preventDefault(); }
});
document.addEventListener('keydown',function(ev){
  if(ev.target.tagName==='BUTTON'&&ev.key===' ') return;
  if(ev.key===' '){ playing?pause():play(); ev.preventDefault(); }
  else if(ev.key==='ArrowRight'){ seek(now+5); }
  else if(ev.key==='ArrowLeft'){ seek(now-5); }
});

/* ---- responsive scaling ---- */
function resize(){
  var pad=CAPTURE?0:32;
  var availW=window.innerWidth-pad;
  var availH=window.innerHeight-(CAPTURE?0:186);
  var s=Math.min(availW/1920,availH/1080);
  if(CAPTURE) s=1;
  frame.style.transform='scale('+s+')';
  wrap.style.width=(1920*s)+'px';
  wrap.style.height=(1080*s)+'px';
}
window.addEventListener('resize',resize);

/* ---- boot ---- */
if(CAPTURE) document.body.classList.add('capture');
buildCutBar();
var m=/[?&]cut=([a-z0-9]+)/i.exec(location.search);
loadCut(m?m[1]:'full');
resize();

window.__ec={
  seek:function(t){ render(t); },
  get duration(){ return T; },
  setCut:function(id){ loadCut(id); render(0); return T; },
  cuts:CUTS.map(function(c){ return c.id; }),
  scenes:function(){ return PROG.map(function(en){ return {id:en.sc.id,t0:en.t0,dur:en.dur,cues:en.cues}; }); }
};

function boot(){
  resize(); render(0);
  window.__ecReady=true;
  var st=/[?&]t=([0-9.]+)/.exec(location.search);
  if(st){ seek(parseFloat(st[1])); }
  else if(!CAPTURE && !/[?&]paused=1/.test(location.search)) play();
}
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(boot); else setTimeout(boot,300);
})();
