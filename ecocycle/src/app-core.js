/* ============================================================
   EcoCycle — collector system explainer
   Deterministic timeline: every frame is a pure function of t.
   ============================================================ */
(function(){
'use strict';

/* ---------- palette ---------- */
var P = {
  oil:'#DE9226', oilDeep:'#A9661A', oilGlow:'#F2B75B', oilPale:'#F6DEB4',
  sys:'#0E5A63', sys2:'#12808C', sysPale:'#CFE2E1',
  money:'#1F7A4D', moneyPale:'#CDE4D6',
  water:'#3E6BB5', waterPale:'#D3DEEE',
  risk:'#C8452F', riskPale:'#F2D6CE',
  ink:'#0F1F1D', muted:'#5C6E6A', line:'#C6D0C8', paper:'#F7F8F4', ground:'#E9EDE6'
};
var D = { ink:'#E8F0ED', muted:'#8CA3A0', line:'#2A4245', surf:'#152528', surf2:'#1D3236', ground:'#0D1719' };

/* ---------- tiny dom helpers ---------- */
var NS='http://www.w3.org/2000/svg';
function e(tag,a,kids){
  var n=document.createElementNS(NS,tag),k;
  if(a) for(k in a){ if(a[k]!==null&&a[k]!==undefined) n.setAttribute(k,a[k]); }
  if(kids) for(var i=0;i<kids.length;i++){ if(kids[i]) n.appendChild(kids[i]); }
  return n;
}
function g(a,kids){ return e('g',a,kids); }
function set(n,a){ for(var k in a){ if(a[k]!==null&&a[k]!==undefined) n.setAttribute(k,a[k]); } return n; }
function op(n,v){ n.setAttribute('opacity',v); return n; }
function xf(n,v){ n.setAttribute('transform',v); return n; }

/* text: family f = 'd' display, 'b' body, 'm' mono */
var FAM={d:"'Bricolage Grotesque',sans-serif",b:"'Public Sans',sans-serif",m:"'IBM Plex Mono',monospace"};
function tx(str,o){
  o=o||{};
  var n=e('text',{
    x:o.x||0,y:o.y||0,
    'font-family':FAM[o.f||'b'],
    'font-size':o.size||24,
    'font-weight':o.w||500,
    fill:o.fill||P.ink,
    'text-anchor':o.anchor||'start',
    'letter-spacing':o.ls||0,
    opacity:o.opacity===undefined?1:o.opacity
  });
  n.textContent=str;
  return n;
}
function txl(lines,o){
  o=o||{};var lh=o.lh||(o.size||24)*1.28;
  var n=tx('',o);
  for(var i=0;i<lines.length;i++){
    var s=document.createElementNS(NS,'tspan');
    s.setAttribute('x',o.x||0); s.setAttribute('y',(o.y||0)+i*lh);
    s.textContent=lines[i]; n.appendChild(s);
  }
  return n;
}

/* ---------- math ---------- */
function cl(v,a,b){a=a===undefined?0:a;b=b===undefined?1:b;return v<a?a:(v>b?b:v);}
function pr(t,a,b){ return b<=a ? (t>=b?1:0) : cl((t-a)/(b-a)); }
function eo(t){ return 1-Math.pow(1-t,3); }
function eo2(t){ return 1-Math.pow(1-t,2); }
function ei(t){ return t*t*t; }
function eio(t){ return t<.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2; }
function eb(t){ var c=1.9; return 1+ (c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2); }
function mix(a,b,t){ return a+(b-a)*t; }
/* eased progress in [a,b] */
function ep(t,a,b,f){ return (f||eo)(pr(t,a,b)); }
/* appear then hold; returns 0..1 */
function fade(t,inA,inB,outA,outB){
  var v=pr(t,inA,inB);
  if(outA!==undefined) v=Math.min(v,1-pr(t,outA,outB));
  return v;
}
function hexmix(h1,h2,t){
  function p(h){return [parseInt(h.substr(1,2),16),parseInt(h.substr(3,2),16),parseInt(h.substr(5,2),16)];}
  var a=p(h1),b=p(h2),o='#';
  for(var i=0;i<3;i++){ var v=Math.round(mix(a[i],b[i],cl(t))).toString(16); o+=v.length<2?'0'+v:v; }
  return o;
}
/* deterministic pseudo-random */
function rnd(seed){ var x=Math.sin(seed*127.1+311.7)*43758.5453; return x-Math.floor(x); }

/* ============================================================
   icon library — every builder returns a <g>, refs on g.r
   ============================================================ */

/* pseudo-QR glyph, deterministic from seed */
function gQR(size,seed,fill,bg){
  var N=13, cell=size/N, kids=[], i,j;
  if(bg) kids.push(e('rect',{x:0,y:0,width:size,height:size,rx:2,fill:bg}));
  function finder(cx,cy){
    kids.push(e('rect',{x:cx*cell,y:cy*cell,width:cell*4,height:cell*4,fill:fill}));
    kids.push(e('rect',{x:(cx+1)*cell,y:(cy+1)*cell,width:cell*2,height:cell*2,fill:bg||'#fff'}));
    kids.push(e('rect',{x:(cx+1.4)*cell,y:(cy+1.4)*cell,width:cell*1.2,height:cell*1.2,fill:fill}));
  }
  for(i=0;i<N;i++)for(j=0;j<N;j++){
    var inF=(i<5&&j<5)||(i>N-6&&j<5)||(i<5&&j>N-6);
    if(inF) continue;
    if(rnd(seed+i*31.7+j*7.3)>0.5)
      kids.push(e('rect',{x:i*cell,y:j*cell,width:cell,height:cell,fill:fill}));
  }
  finder(0,0); finder(N-4,0); finder(0,N-4);
  return g(null,kids);
}

/* small shop / food establishment */
function gShop(o){
  o=o||{}; var w=o.w||210,h=o.h||150,c=o.c||'#D9DFD6',awn=o.awn||P.oil,ink=o.ink||P.ink,ln=o.ln||P.line;
  var k=[];
  k.push(e('rect',{x:0,y:0,width:w,height:h,rx:4,fill:c,stroke:ln,'stroke-width':2.5}));
  /* signboard */
  k.push(e('rect',{x:12,y:10,width:w-24,height:26,rx:3,fill:ink,opacity:.86}));
  /* awning */
  var aw=[];
  for(var i=0;i<5;i++){
    aw.push(e('path',{d:'M'+(12+i*((w-24)/5))+',46 h'+((w-24)/5)+' l-6,26 h-'+((w-24)/5)+' z',
      fill:i%2?awn:hexmix(awn,'#ffffff',.45)}));
  }
  k.push(g(null,aw));
  /* window + door */
  k.push(e('rect',{x:20,y:88,width:w*0.42,height:h-102,rx:3,fill:'#FFFFFF',opacity:.55,stroke:ln,'stroke-width':2}));
  k.push(e('rect',{x:w-20-w*0.28,y:84,width:w*0.28,height:h-84,rx:3,fill:ink,opacity:.14,stroke:ln,'stroke-width':2}));
  if(o.label) k.push(tx(o.label,{x:w/2,y:30,size:o.ls||15,f:'m',fill:o.labelFill||'#F3F6F2',anchor:'middle',ls:'.08em'}));
  var n=g({transform:'translate('+(o.x||0)+','+(o.y||0)+')'+(o.s?' scale('+o.s+')':'')},k);
  return n;
}

/* institution / residents' association */
function gCivic(o){
  o=o||{}; var w=o.w||260,h=o.h||170,c=o.c||P.sysPale,ln=o.ln||P.sys,k=[];
  k.push(e('path',{d:'M-14,34 L'+(w/2)+',-6 L'+(w+14)+',34 Z',fill:ln}));
  k.push(e('rect',{x:0,y:34,width:w,height:h-34,rx:4,fill:c,stroke:ln,'stroke-width':3}));
  for(var i=0;i<4;i++) k.push(e('rect',{x:22+i*((w-44)/4),y:58,width:22,height:h-92,rx:3,fill:'#FFFFFF',opacity:.6,stroke:ln,'stroke-width':2}));
  k.push(e('rect',{x:0,y:h-30,width:w,height:30,rx:3,fill:ln,opacity:.9}));
  if(o.label) k.push(tx(o.label,{x:w/2,y:h-10,size:o.ls||15,f:'m',fill:'#EFF6F4',anchor:'middle',ls:'.08em'}));
  return g({transform:'translate('+(o.x||0)+','+(o.y||0)+')'+(o.s?' scale('+o.s+')':'')},k);
}

/* processing plant */
function gPlant(o){
  o=o||{}; var c=o.c||'#DFE4DC',ln=o.ln||P.sys,k=[];
  k.push(e('rect',{x:0,y:60,width:190,height:110,rx:4,fill:c,stroke:ln,'stroke-width':3}));
  k.push(e('path',{d:'M28,60 v-46 h30 v46 M92,60 v-64 h30 v64',fill:'none',stroke:ln,'stroke-width':3}));
  k.push(e('rect',{x:140,y:20,width:46,height:150,rx:22,fill:'#FFFFFF',opacity:.65,stroke:ln,'stroke-width':3}));
  k.push(e('path',{d:'M140,96 h46',stroke:ln,'stroke-width':2.5,fill:'none',opacity:.6}));
  for(var i=0;i<3;i++) k.push(e('rect',{x:20+i*38,y:96,width:22,height:22,rx:2,fill:ln,opacity:.18}));
  return g({transform:'translate('+(o.x||0)+','+(o.y||0)+')'+(o.s?' scale('+o.s+')':'')},k);
}

/* simple house (riverside community) */
function gHouse(o){
  o=o||{}; var w=o.w||150,h=o.h||110,c=o.c||'#D7DDD4',ln=o.ln||P.line,k=[];
  k.push(e('path',{d:'M-10,26 L'+(w/2)+',-14 L'+(w+10)+',26 Z',fill:o.roof||'#B9C2B8'}));
  k.push(e('rect',{x:0,y:26,width:w,height:h-26,rx:3,fill:c,stroke:ln,'stroke-width':2.5}));
  k.push(e('rect',{x:18,y:48,width:34,height:30,rx:2,fill:'#FFFFFF',opacity:.6,stroke:ln,'stroke-width':2}));
  k.push(e('rect',{x:w-52,y:52,width:34,height:h-52,rx:2,fill:ln,opacity:.24}));
  return g({transform:'translate('+(o.x||0)+','+(o.y||0)+')'+(o.s?' scale('+o.s+')':'')},k);
}

/* PET bottle with amber fill + optional QR label. refs: fill, qr */
function gBottle(o){
  o=o||{}; var s=o.s||1, ln=o.ln||P.ink, k=[], r={};
  var body='M14,26 h32 v10 c0,6 6,6 6,14 v56 c0,7-5,12-12,12 h-20 c-7,0-12-5-12-12 v-56 c0,-8 6,-8 6,-14 z';
  var clip='clip'+Math.round(Math.random()*1e9);
  k.push(e('defs',null,[e('clipPath',{id:clip},[e('path',{d:body})])]));
  k.push(e('rect',{x:20,y:8,width:20,height:18,rx:3,fill:ln,opacity:.75}));
  k.push(e('path',{d:body,fill:'#FFFFFF',opacity:.55}));
  r.fill=e('rect',{x:0,y:60,width:60,height:60,fill:o.oil||P.oil,'clip-path':'url(#'+clip+')'});
  k.push(r.fill);
  k.push(e('path',{d:body,fill:'none',stroke:ln,'stroke-width':3}));
  if(o.qr!==false){
    r.qr=g({transform:'translate(16,58)'},[
      e('rect',{x:-4,y:-4,width:36,height:36,rx:3,fill:'#FBFBF7',stroke:ln,'stroke-width':2}),
      gQR(28,o.seed||7,ln,'#FBFBF7')
    ]);
    k.push(r.qr);
  }
  var n=g({transform:'translate('+(o.x||0)+','+(o.y||0)+') scale('+s+')'},k);
  n.r=r; return n;
}

/* oil drum at the hub. refs: fill */
function gDrum(o){
  o=o||{}; var w=o.w||120,h=o.h||150,ln=o.ln||P.sys,k=[],r={};
  var clip='dc'+Math.round(Math.random()*1e9);
  k.push(e('defs',null,[e('clipPath',{id:clip},[e('rect',{x:0,y:0,width:w,height:h,rx:12})])]));
  k.push(e('rect',{x:0,y:0,width:w,height:h,rx:12,fill:'#FFFFFF',opacity:.5}));
  r.fill=e('rect',{x:0,y:h,width:w,height:h,fill:o.oil||P.oil,'clip-path':'url(#'+clip+')',opacity:.92});
  k.push(r.fill);
  k.push(e('rect',{x:0,y:0,width:w,height:h,rx:12,fill:'none',stroke:ln,'stroke-width':3}));
  k.push(e('path',{d:'M0,'+(h*0.3)+' h'+w+' M0,'+(h*0.68)+' h'+w,stroke:ln,'stroke-width':2.5,opacity:.5}));
  k.push(e('ellipse',{cx:w/2,cy:0,rx:w/2,ry:9,fill:'#FFFFFF',opacity:.6,stroke:ln,'stroke-width':3}));
  var n=g({transform:'translate('+(o.x||0)+','+(o.y||0)+')'+(o.s?' scale('+o.s+')':'')},k);
  n.r=r; return n;
}

/* catador with a two-wheel cart. refs: legA, legB, body */
function gCatador(o){
  o=o||{}; var ln=o.ln||P.ink, sk=o.sk||P.sys, k=[], r={};
  /* cart */
  k.push(e('path',{d:'M40,-10 h96 v58 h-96 z',fill:o.cart||P.sysPale,stroke:ln,'stroke-width':3}));
  k.push(e('path',{d:'M40,-10 l-22,-24',stroke:ln,'stroke-width':4,fill:'none','stroke-linecap':'round'}));
  k.push(e('circle',{cx:62,cy:60,r:13,fill:'none',stroke:ln,'stroke-width':4}));
  k.push(e('circle',{cx:118,cy:60,r:13,fill:'none',stroke:ln,'stroke-width':4}));
  /* bottles poking out */
  for(var i=0;i<3;i++) k.push(e('rect',{x:52+i*30,y:-30,width:18,height:24,rx:4,fill:P.oil,opacity:.9,stroke:ln,'stroke-width':2}));
  /* body */
  r.legA=e('path',{d:'M0,26 l-12,36',stroke:ln,'stroke-width':6,fill:'none','stroke-linecap':'round'});
  r.legB=e('path',{d:'M0,26 l10,36',stroke:ln,'stroke-width':6,fill:'none','stroke-linecap':'round'});
  k.push(r.legA); k.push(r.legB);
  k.push(e('path',{d:'M0,-16 v44',stroke:sk,'stroke-width':16,fill:'none','stroke-linecap':'round'}));
  k.push(e('path',{d:'M0,-8 l20,4',stroke:sk,'stroke-width':8,fill:'none','stroke-linecap':'round'}));
  k.push(e('circle',{cx:0,cy:-30,r:13,fill:ln}));
  var n=g({transform:'translate('+(o.x||0)+','+(o.y||0)+')'+(o.s?' scale('+o.s+')':'')},k);
  n.r=r; return n;
}

/* phone with screen slot. refs: screen (g) */
function gPhone(o){
  o=o||{}; var w=o.w||120,h=o.h||210,ln=o.ln||P.ink,k=[],r={};
  k.push(e('rect',{x:0,y:0,width:w,height:h,rx:16,fill:'#101A1C',stroke:ln,'stroke-width':3}));
  k.push(e('rect',{x:8,y:14,width:w-16,height:h-28,rx:8,fill:o.screen||'#F5F8F4'}));
  k.push(e('rect',{x:w/2-16,y:5,width:32,height:5,rx:2.5,fill:'#5A6D6B'}));
  r.screen=g({transform:'translate(8,14)'});
  k.push(r.screen);
  var n=g({transform:'translate('+(o.x||0)+','+(o.y||0)+')'+(o.s?' scale('+o.s+')':'')},k);
  n.r=r; return n;
}

/* data card (paper) — rows of mono key/value */
function gCard(o){
  o=o||{}; var w=o.w||360,h=o.h||0,rows=o.rows||[],ln=o.ln||P.line,k=[],r={};
  var pad=o.pad||22, rh=o.rh||34, headH=o.title?46:10;
  h=h||headH+rows.length*rh+pad;
  k.push(e('rect',{x:0,y:0,width:w,height:h,rx:o.rx===undefined?10:o.rx,fill:o.bg||P.paper,stroke:o.stroke||ln,'stroke-width':o.sw||2.5}));
  if(o.accent) k.push(e('rect',{x:0,y:0,width:w,height:6,rx:3,fill:o.accent}));
  if(o.title) k.push(tx(o.title,{x:pad,y:34,size:o.ts||17,f:'m',fill:o.tf||P.sys,ls:'.14em'}));
  r.rows=[];
  for(var i=0;i<rows.length;i++){
    var y=headH+pad+i*rh-4;
    var a=tx(rows[i][0],{x:pad,y:y,size:o.rs||20,f:'m',fill:o.kf||P.muted});
    var b=tx(rows[i][1],{x:w-pad,y:y,size:o.rs||20,f:'m',fill:o.vf||P.ink,anchor:'end',w:500});
    k.push(a); k.push(b); r.rows.push([a,b]);
  }
  var n=g({transform:'translate('+(o.x||0)+','+(o.y||0)+')'},k);
  n.r=r; n.h=h; n.w=w; return n;
}

/* pill chip with mono label */
function gChip(o){
  o=o||{}; var t=o.t||'',sz=o.size||21,padx=o.padx||20,h=o.h||46;
  var w=o.w||(t.length*sz*0.62+padx*2);
  var k=[e('rect',{x:0,y:0,width:w,height:h,rx:h/2,fill:o.bg||'#FFFFFF',stroke:o.stroke||P.line,'stroke-width':2.5}),
         tx(t,{x:w/2,y:h/2+sz*0.36,size:sz,f:o.f||'m',fill:o.fill||P.ink,anchor:'middle',ls:o.ls||'.02em'})];
  var n=g({transform:'translate('+(o.x||0)+','+(o.y||0)+')'},k); n.w=w; n.h=h; return n;
}

/* arrow path that can be drawn progressively. refs: path */
function gArrow(o){
  var k=[],r={},col=o.c||P.sys,w=o.w||4;
  var id='ah'+Math.round(Math.random()*1e9);
  k.push(e('defs',null,[
    e('marker',{id:id,viewBox:'0 0 10 10',refX:'7',refY:'5',markerWidth:'5.2',markerHeight:'5.2',orient:'auto-start-reverse'},
      [e('path',{d:'M0,1 L9,5 L0,9 z',fill:col})])
  ]));
  r.path=e('path',{d:o.d,fill:'none',stroke:col,'stroke-width':w,'stroke-linecap':'round',
    'marker-end':o.head===false?null:'url(#'+id+')','stroke-dasharray':o.dash||null});
  k.push(r.path);
  var n=g(null,k); n.r=r;
  try{ n.len=r.path.getTotalLength?0:0; }catch(err){}
  return n;
}
/* progressive draw of a path (call after it is in the DOM) */
function draw(pathNode,p){
  var L=pathNode.__L;
  if(L===undefined){ L=pathNode.getTotalLength(); pathNode.__L=L; }
  pathNode.setAttribute('stroke-dasharray',L);
  pathNode.setAttribute('stroke-dashoffset',L*(1-cl(p)));
  pathNode.setAttribute('opacity',p<=0.001?0:1);
}
/* a dot travelling along a path */
function along(pathNode,p){
  var L=pathNode.__L;
  if(L===undefined){ L=pathNode.getTotalLength(); pathNode.__L=L; }
  return pathNode.getPointAtLength(L*cl(p));
}

/* rain / droplets etc. */
function gDrop(o){
  o=o||{};
  return e('path',{d:'M0,-14 C7,-4 11,1 11,7 A11,11 0 0 1 -11,7 C-11,1 -7,-4 0,-14 z',
    fill:o.c||P.oil,transform:'translate('+(o.x||0)+','+(o.y||0)+')'+(o.s?' scale('+o.s+')':'')});
}

/* section label above a group */
function gLabel(t,o){
  o=o||{};
  return tx(t,{x:o.x||0,y:o.y||0,size:o.size||19,f:'m',fill:o.fill||P.muted,ls:'.16em',anchor:o.anchor||'start'});
}

/* ============================================================
   scene registry
   ============================================================ */
var SCENES=[];
function scene(def){ SCENES.push(def); return def; }

/* expose to the scenes file */
window.__EC={ e:e,g:g,set:set,op:op,xf:xf,tx:tx,txl:txl,cl:cl,pr:pr,eo:eo,eo2:eo2,ei:ei,eio:eio,eb:eb,
  mix:mix,ep:ep,fade:fade,hexmix:hexmix,rnd:rnd,P:P,D:D,scene:scene,SCENES:SCENES,
  gQR:gQR,gShop:gShop,gCivic:gCivic,gPlant:gPlant,gHouse:gHouse,gBottle:gBottle,gDrum:gDrum,
  gCatador:gCatador,gPhone:gPhone,gCard:gCard,gChip:gChip,gArrow:gArrow,draw:draw,along:along,
  gDrop:gDrop,gLabel:gLabel,FAM:FAM };
})();
