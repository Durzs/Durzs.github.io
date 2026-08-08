/* ===================== PLAYER ===================== */
(function(){
var E=window.__EC, S=E.SCENES;
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

var XF=0.34;               /* cross-fade between scenes, seconds */
var T=0, i;

/* ---- mount scenes ---- */
for(i=0;i<S.length;i++){
  var sc=S[i];
  sc.t0=T; T+=sc.dur; sc.t1=T;
  var d=document.createElement('div');
  d.className='scene'; d.style.visibility='hidden';
  var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 1920 1080');
  svg.setAttribute('preserveAspectRatio','xMidYMid meet');
  d.appendChild(svg); film.appendChild(d);
  sc.el=d; sc.svg=svg;
  sc.build(svg);
}

/* ---- step chips ---- */
var chips=[];
for(i=0;i<6;i++){
  var c=document.createElement('div');
  c.className='step-chip'; c.textContent=String(i+1);
  stepsEl.appendChild(c); chips.push(c);
}

/* ---- chapters ---- */
var chapEl=document.getElementById('chapters'), chapBtns=[];
for(i=0;i<S.length;i++){
  (function(sc){
    if(!sc.chapter) return;
    var b=document.createElement('button');
    b.className='chip'; b.type='button'; b.textContent=sc.chapter;
    b.addEventListener('click',function(){ seek(sc.t0+0.01); });
    chapEl.appendChild(b); chapBtns.push({b:b,sc:sc});
  })(S[i]);
}
/* timeline marks */
var marks=document.getElementById('scrubMarks');
for(i=1;i<S.length;i++){
  var m=document.createElement('i'); m.style.left=(S[i].t0/T*100)+'%'; marks.appendChild(m);
}

/* ---- render ---- */
var lastCap=null, lastTitle=null, curScene=null;

function findScene(t){
  for(var k=S.length-1;k>=0;k--) if(t>=S[k].t0) return k;
  return 0;
}
function fadeAmt(x,a,b){ return x<a?0:(x>b?1:(x-a)/(b-a)); }

function render(t){
  t=Math.max(0,Math.min(T-0.001,t));
  var k=findScene(t), sc=S[k], lt=t-sc.t0, prev=k>0?S[k-1]:null;

  /* visibility + crossfade */
  for(var j=0;j<S.length;j++){
    var vis=(j===k)||(prev&&j===k-1&&lt<XF);
    if(S[j].el.style.visibility!==(vis?'visible':'hidden'))
      S[j].el.style.visibility=vis?'visible':'hidden';
    if(!vis) S[j].el.style.opacity=0;
  }
  if(prev&&lt<XF){
    prev.el.style.opacity=String(1-lt/XF);
    prev.update(Math.min(prev.dur,prev.dur-0.001));
    sc.el.style.opacity=String(lt/XF);
  } else {
    sc.el.style.opacity='1';
  }
  sc.update(lt);
  curScene=sc;

  /* theme */
  var dark = sc.darkAt ? sc.darkAt(lt) : !!sc.dark;
  stage.classList.toggle('dark',dark);
  stage.style.background = sc.bg ? sc.bg(lt) : (dark?'#0D1719':'#E9EDE6');

  /* header */
  var showH = !sc.hideHeader;
  var hA = showH ? fadeAmt(lt,0.15,0.9)*(1-fadeAmt(lt,sc.dur-0.5,sc.dur-0.05)) : 0;
  eyeEl.style.opacity=hA; titleEl.style.opacity=hA;
  eyeEl.style.transform='translateY('+((1-hA)*10)+'px)';
  titleEl.style.transform='translateY('+((1-hA)*14)+'px)';
  if(lastTitle!==sc.id){
    eyeT.textContent=sc.eyebrow||''; titleEl.textContent=sc.title||''; lastTitle=sc.id;
  }

  /* step chips */
  var showSteps = !!sc.step;
  stepsEl.style.opacity = showSteps ? hA : 0;
  if(showSteps) for(var q=0;q<6;q++){
    chips[q].className='step-chip'+(q+1===sc.step?' on':(q+1<sc.step?' done':''));
  }

  /* caption */
  var html='', a=0;
  if(sc.cues) for(var c=0;c<sc.cues.length;c++){
    var cu=sc.cues[c], s0=cu[0], s1=cu[0]+cu[1];
    if(lt>=s0-0.25&&lt<=s1+0.3){
      html=cu[2];
      a=fadeAmt(lt,s0,s0+0.22)*(1-fadeAmt(lt,s1-0.02,s1+0.26));
      break;
    }
  }
  if(html!==lastCap){ capEl.innerHTML=html; lastCap=html; }
  capEl.style.opacity=a;
  capEl.style.transform='translateY('+((1-a)*7)+'px)';

  progEl.style.width=(t/T*100)+'%';

  /* ui */
  if(!CAPTURE){
    fill.style.width=(t/T*100)+'%';
    timeEl.textContent=fmt(t)+' / '+fmt(T);
    for(var z=0;z<chapBtns.length;z++)
      chapBtns[z].b.setAttribute('aria-current', chapBtns[z].sc===sc ? 'true':'false');
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

function fmt(s){ var m=Math.floor(s/60), x=Math.floor(s%60); return m+':'+(x<10?'0':'')+x; }
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
  var availH=window.innerHeight-(CAPTURE?0:150);
  var s=Math.min(availW/1920,availH/1080);
  if(CAPTURE) s=1;
  frame.style.transform='scale('+s+')';
  wrap.style.width=(1920*s)+'px';
  wrap.style.height=(1080*s)+'px';
}
window.addEventListener('resize',resize);
resize();

/* ---- capture hooks ---- */
if(CAPTURE) document.body.classList.add('capture');
window.__ec={ seek:function(t){ render(t); }, duration:T, scenes:S.map(function(s){return {id:s.id,t0:s.t0,dur:s.dur};}) };

/* ---- go ---- */
function boot(){
  resize(); render(0);
  window.__ecReady=true;
  if(!CAPTURE && !/[?&]paused=1/.test(location.search)) play();
  var m=/[?&]t=([0-9.]+)/.exec(location.search);
  if(m){ pause(); seek(parseFloat(m[1])); }
}
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(boot); else setTimeout(boot,300);
})();
