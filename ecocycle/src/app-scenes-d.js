/* ===================== ACT 3 — RECAP, RESULTS, CLOSE ===================== */
(function(){
var E=window.__EC, e=E.e, g=E.g, tx=E.tx, txl=E.txl, P=E.P;
var pr=E.pr, ep=E.ep, eo=E.eo, eio=E.eio, eb=E.eb, cl=E.cl, mix=E.mix, fade=E.fade, rnd=E.rnd;
var draw=E.draw, along=E.along, op=E.op, xf=E.xf, set=E.set;

/* ---------------------------------------------------------- RECAP */
E.scene({
  id:'recap', chapter:'The whole cycle', dur:20,
  eyebrow:'The whole cycle', title:'One litre, end to end',
  cues:[
    [0.3,3.4,'So, the whole cycle:'],
    [4.0,7.4,'Kitchen. Scan. Hub. Contract. Payment. And data that makes the next round cheaper.'],
    [12.0,6.6,'The same litre that used to harden inside a pipe now pays a wage.']
  ],
  build:function(s){
    var r=this.r={},i;
    var nodes=[
      {t:'KITCHEN',s:'coded bottle',x:220,y:300},
      {t:'CATADOR',s:'scan at the door',x:620,y:300},
      {t:'HUB',s:'pooled + tested',x:1020,y:300},
      {t:'PROCESSORS',s:'contracts',x:1420,y:300},
      {t:'INCOME',s:'40% catadores',x:1420,y:600},
      {t:'PLATFORM',s:'forecast · routes',x:620,y:600}
    ];
    r.nodes=[];
    for(i=0;i<nodes.length;i++){
      var n=nodes[i], col=i<4?P.sys:P.money;
      var box=g({opacity:0,transform:'translate('+n.x+','+n.y+')'},[
        e('rect',{x:0,y:0,width:300,height:118,rx:12,fill:P.paper,stroke:col,'stroke-width':3}),
        e('circle',{cx:34,cy:34,r:16,fill:col}),
        tx(String(i+1),{x:34,y:41,size:19,f:'m',fill:'#FFFFFF',anchor:'middle'}),
        tx(n.t,{x:64,y:42,size:25,f:'m',fill:col,ls:'.08em'}),
        tx(n.s,{x:24,y:90,size:23,f:'b',fill:P.muted})
      ]);
      r.nodes.push(box); s.appendChild(box);
    }
    /* the oil path forward, the money path back */
    r.oilPath=e('path',{d:'M520,359 H620 M920,359 H1020 M1320,359 H1420',fill:'none',stroke:P.oil,'stroke-width':5});
    r.p1=E.gArrow({d:'M528,359 H612',c:P.oil,w:5});
    r.p2=E.gArrow({d:'M928,359 H1012',c:P.oil,w:5});
    r.p3=E.gArrow({d:'M1328,359 H1412',c:P.oil,w:5});
    r.p4=E.gArrow({d:'M1570,426 V592',c:P.money,w:5});
    r.p5=E.gArrow({d:'M1412,659 H928',c:P.money,w:5});
    r.p6=E.gArrow({d:'M620,659 C420,659 370,540 370,426',c:P.sys,w:5});
    var ps=[r.p1,r.p2,r.p3,r.p4,r.p5,r.p6];
    for(i=0;i<6;i++) s.appendChild(ps[i]);
    r.ps=ps;
    r.lbl1=tx('the oil moves out',{x:770,y:270,size:20,f:'m',fill:P.oilDeep,anchor:'middle',opacity:0});
    r.lbl2=tx('the value moves back',{x:1170,y:700,size:20,f:'m',fill:P.money,anchor:'middle',opacity:0});
    r.lbl3=tx('the data closes the loop',{x:300,y:520,size:20,f:'m',fill:P.sys,anchor:'middle',opacity:0});
    s.appendChild(r.lbl1); s.appendChild(r.lbl2); s.appendChild(r.lbl3);
    r.dotOil=e('circle',{cx:0,cy:0,r:13,fill:P.oil,opacity:0});
    r.dotMon=e('circle',{cx:0,cy:0,r:13,fill:P.money,opacity:0});
    s.appendChild(r.dotOil); s.appendChild(r.dotMon);
  },
  update:function(t){
    var r=this.r,i;
    for(i=0;i<6;i++){
      var p=pr(t,.3+i*.5,1.1+i*.5);
      op(r.nodes[i],p);
      var n=[[220,300],[620,300],[1020,300],[1420,300],[1420,600],[620,600]][i];
      xf(r.nodes[i],'translate('+n[0]+','+mix(n[1]+16,n[1],eo(p))+')');
      draw(r.ps[i].r.path,ep(t,1.4+i*.5,2.2+i*.5));
    }
    op(r.lbl1,pr(t,4.4,5.2)); op(r.lbl2,pr(t,6.4,7.2)); op(r.lbl3,pr(t,8.0,8.8));
    /* travelling dots */
    var segs=[r.p1,r.p2,r.p3];
    var tp=pr(t,9.4,13.0);
    if(tp>0&&tp<1){
      var k=Math.min(2,Math.floor(tp*3)), lp=(tp*3)%1;
      var pt=along(segs[k].r.path,lp);
      set(r.dotOil,{cx:pt.x,cy:pt.y}); op(r.dotOil,1);
    } else op(r.dotOil,0);
    var mp=pr(t,13.2,17.2);
    if(mp>0&&mp<1){
      var segs2=[r.p4,r.p5,r.p6], k2=Math.min(2,Math.floor(mp*3)), lp2=(mp*3)%1;
      var pt2=along(segs2[k2].r.path,lp2);
      set(r.dotMon,{cx:pt2.x,cy:pt2.y,fill:k2===2?P.sys:P.money}); op(r.dotMon,1);
    } else op(r.dotMon,0);
  }
});

/* ---------------------------------------------------------- RESULTS */
E.scene({
  id:'results', chapter:'What it adds up to', dur:21,
  eyebrow:'What it adds up to', title:'The pilot, in numbers',
  cues:[
    [0.4,5.0,'In the Jardim América pilot: <b>75,678 litres</b> recovered a year.'],
    [5.8,6.4,'R$113,517 of revenue against R$105,000 of cost — the pilot pays for itself.'],
    [12.6,7.6,'R$1.27 of social value for every R$1 invested, and around 91 tonnes of CO₂ avoided.']
  ],
  build:function(s){
    var r=this.r={},i;
    var tiles=[
      {v:'75,678',u:'litres of used oil recovered a year',c:P.oilDeep,acc:P.oil},
      {v:'1.08',u:'R$ returned for every R$1 of cost',c:P.money,acc:P.money},
      {v:'1.27',u:'R$ of social value per R$1 invested',c:P.sys,acc:P.sys},
      {v:'91 t',u:'CO₂-equivalent avoided each year',c:'#6B4FA0',acc:'#6B4FA0'}
    ];
    r.tiles=[]; r.vals=[];
    for(i=0;i<4;i++){
      var x=96+i*440, tl=tiles[i];
      var n=g({opacity:0,transform:'translate('+x+',300)'},[
        e('rect',{x:0,y:0,width:392,height:250,rx:14,fill:P.paper,stroke:P.line,'stroke-width':2.5}),
        e('rect',{x:0,y:0,width:392,height:7,rx:3.5,fill:tl.acc})
      ]);
      var v=tx(tl.v,{x:32,y:132,size:76,f:'d',w:800,fill:tl.c,ls:'-.035em'});
      n.appendChild(v);
      n.appendChild(txl(tl.u.split(' ').reduce(function(a,w){
        if(!a.length||(a[a.length-1]+' '+w).length>26) a.push(w); else a[a.length-1]+=' '+w; return a;},[]),
        {x:32,y:178,size:23,f:'b',fill:P.muted,lh:30}));
      r.tiles.push(n); r.vals.push(v); s.appendChild(n);
    }
    r.bar=g({opacity:0,transform:'translate(96,596)'},[
      tx('REVENUE',{x:0,y:0,size:19,f:'m',fill:P.muted,ls:'.14em'}),
      e('rect',{x:0,y:16,width:1116,height:44,rx:8,fill:P.money}),
      tx('R$113,517',{x:1092,y:47,size:26,f:'m',fill:'#FFFFFF',anchor:'end'}),
      tx('COST',{x:0,y:96,size:19,f:'m',fill:P.muted,ls:'.14em'}),
      e('rect',{x:0,y:112,width:1032,height:44,rx:8,fill:P.line}),
      tx('R$105,000',{x:1008,y:143,size:26,f:'m',fill:P.ink,anchor:'end'}),
      e('path',{d:'M1116,16 v140',stroke:P.money,'stroke-width':2,'stroke-dasharray':'6 6'}),
      tx('surplus R$8,517',{x:1136,y:96,size:23,f:'b',w:700,fill:P.money})
    ]);
    s.appendChild(r.bar);
    r.foot=tx('and every litre collected is a litre that never hardens inside the drainage network.',
      {x:96,y:790,size:26,f:'b',fill:P.ink});
    op(r.foot,0); s.appendChild(r.foot);
  },
  update:function(t){
    var r=this.r,i;
    for(i=0;i<4;i++){
      var p=pr(t,.3+i*.55,1.2+i*.55);
      op(r.tiles[i],p);
      xf(r.tiles[i],'translate('+(96+i*440)+','+mix(322,300,eb(p))+')');
    }
    /* count-up on the first two tiles */
    var c1=ep(t,.6,2.4);
    r.vals[0].textContent=Math.round(75678*c1).toLocaleString('en-US');
    var c2=ep(t,1.4,3.4);
    r.vals[1].textContent=(1.08*c2).toFixed(2);
    var c3=ep(t,2.0,4.0);
    r.vals[2].textContent=(1.27*c3).toFixed(2);
    op(r.bar,pr(t,6.2,7.2));
    op(r.foot,pr(t,15.0,16.0));
  }
});

/* ---------------------------------------------------------- CLOSE */
E.scene({
  id:'close', chapter:'Close', dur:13, hideHeader:true,
  cues:[
    [0.5,4.2,'Same oil. A different path.'],
    [5.2,4.6,'EcoCycle — a collection system for the last mile.']
  ],
  build:function(s){
    var r=this.r={};
    r.oldL=tx('BEFORE',{x:96,y:250,size:20,f:'m',fill:P.risk,ls:'.18em'});
    r.oldP=tx('kitchen  →  drain  →  river  →  flood',{x:96,y:318,size:44,f:'d',w:700,fill:P.risk,ls:'-.02em'});
    r.newL=tx('NOW',{x:96,y:430,size:20,f:'m',fill:P.sys,ls:'.18em'});
    r.newP=tx('kitchen  →  catador  →  hub  →  industry  →  income',{x:96,y:498,size:44,f:'d',w:700,fill:P.sys,ls:'-.02em'});
    r.rule=e('path',{d:'M96,562 H1824',stroke:P.line,'stroke-width':2});
    s.appendChild(r.oldL); s.appendChild(r.oldP); s.appendChild(r.newL); s.appendChild(r.newP); s.appendChild(r.rule);
    r.mark=g({opacity:0},[
      tx('EcoCycle',{x:96,y:684,size:92,f:'d',w:800,fill:P.ink,ls:'-.035em'}),
      tx('AI-driven logistics for used cooking oil · structural income for waste pickers · lower flood risk',
        {x:96,y:730,size:24,f:'b',fill:P.muted}),
      tx('Thaís da Silva Oliveira Mendes · Diego Patricio Urzúa Escobar · Caio Peixoto Galdino · 吴宗琴 · 孙滢斐',
        {x:96,y:786,size:20,f:'m',fill:P.muted,ls:'.04em'})
    ]);
    s.appendChild(r.mark);
  },
  update:function(t){
    var r=this.r;
    var a=pr(t,.3,1.2), b=pr(t,1.6,2.6);
    op(r.oldL,a); op(r.oldP,a*(1-.55*pr(t,2.2,3.2)));
    op(r.newL,b); op(r.newP,b);
    draw(r.rule,ep(t,3.0,4.2));
    op(r.mark,pr(t,4.6,5.8));
  }
});

})();
