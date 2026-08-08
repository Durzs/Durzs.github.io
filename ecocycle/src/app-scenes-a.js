/* ===================== ACT 1 — THE TRAP ===================== */
(function(){
var E=window.__EC, e=E.e, g=E.g, tx=E.tx, txl=E.txl, P=E.P, D=E.D;
var pr=E.pr, ep=E.ep, eo=E.eo, eio=E.eio, eb=E.eb, ei=E.ei, cl=E.cl, mix=E.mix, fade=E.fade, hexmix=E.hexmix, rnd=E.rnd;
var draw=E.draw, along=E.along, op=E.op, xf=E.xf, set=E.set;

/* ---------------------------------------------------------- 0. TITLE */
E.scene({
  id:'title', dark:true, chapter:'Opening', dur:9, hideHeader:true,
  cues:[[4.6,3.9,'Four minutes. Six steps. One litre of used cooking oil.']],
  build:function(s){
    var r=this.r={};
    r.drop=E.gDrop({x:960,y:0,s:2.2,c:P.oilGlow});
    s.appendChild(r.drop);
    r.rings=[];
    for(var i=0;i<3;i++){
      var c=e('ellipse',{cx:960,cy:470,rx:20,ry:6,fill:'none',stroke:P.oil,'stroke-width':3,opacity:0});
      r.rings.push(c); s.appendChild(c);
    }
    r.pool=e('ellipse',{cx:960,cy:470,rx:0,ry:0,fill:P.oil,opacity:.9});
    s.appendChild(r.pool);
    r.t1=tx('EcoCycle',{x:960,y:600,size:148,f:'d',w:800,fill:'#F2F7F4',anchor:'middle',ls:'-.035em'});
    r.t2=tx('How the collector system works',{x:960,y:672,size:46,f:'b',w:500,fill:'#9FC0BA',anchor:'middle'});
    r.rule=e('path',{d:'M700,716 H1220',stroke:P.oil,'stroke-width':3,fill:'none'});
    r.t3=tx('Used cooking oil · Pavuna–Meriti Basin · Rio de Janeiro',
      {x:960,y:766,size:22,f:'m',fill:'#7E9491',anchor:'middle',ls:'.18em'});
    s.appendChild(r.t1); s.appendChild(r.t2); s.appendChild(r.rule); s.appendChild(r.t3);
  },
  update:function(t){
    var r=this.r;
    var fall=pr(t,.25,1.45);
    xf(r.drop,'translate(960,'+mix(-60,462,ei(fall))+') scale('+mix(2.6,1.9,fall)+')');
    op(r.drop, t<1.45?1:0);
    for(var i=0;i<3;i++){
      var p=pr(t,1.45+i*.26,2.9+i*.26);
      set(r.rings[i],{rx:mix(14,300,eo(p)),ry:mix(4,74,eo(p))});
      op(r.rings[i], p<=0?0:(1-p)*.8);
    }
    var pp=pr(t,1.4,2.2);
    set(r.pool,{rx:mix(0,62,eo(pp)),ry:mix(0,16,eo(pp))});
    op(r.pool,pp*(1-pr(t,2.4,3.4)));
    var a=pr(t,1.6,2.5);
    op(r.t1,a); xf(r.t1,'translate(0,'+mix(26,0,eo(a))+')');
    op(r.t2,pr(t,2.1,3.0));
    draw(r.rule,ep(t,2.5,3.4));
    op(r.t3,pr(t,3.0,3.9));
  }
});

/* ---------------------------------------------------------- 1. THE DRAIN */
E.scene({
  id:'drain', dark:true, chapter:'The problem', dur:24,
  eyebrow:'The problem', title:'Where the oil goes today',
  cues:[
    [0.4,5.0,'In the Pavuna–Meriti basin, thousands of small kitchens fry food every day.'],
    [5.6,5.4,'When the oil is used up, there is no one to sell it to — so it goes down the drain.'],
    [11.2,5.6,'A single litre can contaminate up to <b>25,000 litres</b> of water.'],
    [17.2,6.2,'Inside the pipes it cools, hardens and traps everything else: a <u>fatberg</u>.']
  ],
  build:function(s){
    var r=this.r={},i;
    /* underground */
    r.soil=e('rect',{x:0,y:500,width:1920,height:580,fill:'#101E20'});
    s.appendChild(r.soil);
    var hatch=[];
    for(i=0;i<40;i++) hatch.push(e('path',{d:'M'+(i*54-40)+',500 l60,580',stroke:'#16292B','stroke-width':2}));
    r.hatch=g({opacity:0},hatch); s.appendChild(r.hatch);
    r.street=e('rect',{x:0,y:492,width:1920,height:16,fill:'#233A3C'});
    s.appendChild(r.street);

    /* shops on the street */
    r.shops=[];
    var names=['LANCHONETE','BAR DO ZÉ','PASTELARIA'];
    for(i=0;i<3;i++){
      var sh=E.gShop({x:150+i*490,y:364,s:.85,c:'#1C2E30',ln:'#3B565A',ink:'#0B1517',
        awn:[P.oil,'#C7563F','#2E7E86'][i],label:names[i],labelFill:'#DCE8E4'});
      r.shops.push(sh); s.appendChild(sh);
    }
    r.shopLbl=E.gLabel('SMALL RESTAURANTS · BARS · SNACK SHOPS',{x:150,y:330,fill:'#7E9491'});
    s.appendChild(r.shopLbl);

    /* the kitchen sink between the shops, and the pan tipping into it */
    r.sink=g({opacity:0},[
      e('path',{d:'M396,470 h128 l-12,30 h-104 z',fill:'#22383B',stroke:'#4E7B80','stroke-width':3}),
      e('path',{d:'M396,470 h128',stroke:'#7C9497','stroke-width':4})
    ]);
    s.appendChild(r.sink);
    r.pan=g({transform:'translate(460,440) scale(1.5)'},[
      e('path',{d:'M-34,-10 a34,20 0 0 0 68,0 z',fill:'#40595C',stroke:'#7C9497','stroke-width':3}),
      e('path',{d:'M34,-12 h34',stroke:'#7C9497','stroke-width':6,'stroke-linecap':'round'})
    ]);
    s.appendChild(r.pan);

    /* main sewer pipe */
    r.pipeIn=e('rect',{x:0,y:596,width:1920,height:124,fill:'#0A1315'});
    s.appendChild(r.pipeIn);
    r.pipeTop=e('path',{d:'M0,596 H1920',stroke:'#3B565A','stroke-width':5});
    r.pipeBot=e('path',{d:'M0,720 H1920',stroke:'#3B565A','stroke-width':5});
    /* drop pipe from the sink */
    r.dropPipe=e('path',{d:'M425,500 v96 M495,500 v96',stroke:'#3B565A','stroke-width':5,fill:'none'});
    s.appendChild(r.dropPipe); s.appendChild(r.pipeTop); s.appendChild(r.pipeBot);

    /* water flowing in the pipe */
    var wv=[];
    for(i=0;i<3;i++) wv.push(e('path',{d:'M0,'+(680+i*12)+' H1920',stroke:'#20444A','stroke-width':7,'stroke-linecap':'round','stroke-dasharray':'140 90'}));
    r.water=g({opacity:0},wv); s.appendChild(r.water);

    /* the pour */
    r.pour=e('path',{d:'M460,472 C460,516 460,540 460,596',stroke:P.oil,'stroke-width':13,fill:'none','stroke-linecap':'round'});
    s.appendChild(r.pour);
    r.splat=e('ellipse',{cx:460,cy:706,rx:0,ry:0,fill:P.oil,opacity:.85});
    s.appendChild(r.splat);

    /* oil coating the pipe walls */
    r.coatTop=e('rect',{x:0,y:596,width:1920,height:0,fill:P.oilDeep,opacity:.85});
    r.coatBot=e('rect',{x:0,y:720,width:1920,height:0,fill:P.oilDeep,opacity:.85});
    s.appendChild(r.coatTop); s.appendChild(r.coatBot);

    /* fatberg lump */
    r.berg=g({transform:'translate(1210,658)'},[
      e('path',{d:'M-150,58 C-150,-14 -104,-58 -44,-58 C6,-58 22,-30 58,-34 C118,-40 152,4 152,58 z',fill:'#6B4F22'}),
      e('path',{d:'M-150,58 C-150,-14 -104,-58 -44,-58 C6,-58 22,-30 58,-34 C118,-40 152,4 152,58 z',fill:'none',stroke:P.oilDeep,'stroke-width':4})
    ]);
    r.bergWrap=g({opacity:0},[r.berg]); s.appendChild(r.bergWrap);
    /* trapped debris */
    r.junk=[];
    for(i=0;i<9;i++){
      var jx=1120+rnd(i*3.1)*180, jy=632+rnd(i*7.7)*66;
      var j=rnd(i)>.5
        ? e('rect',{x:jx,y:jy,width:20,height:11,rx:2,fill:'#95A6A4',transform:'rotate('+(rnd(i*5)*90-45)+','+jx+','+jy+')'})
        : e('path',{d:'M'+jx+','+jy+' q14,-13 26,2',stroke:'#95A6A4','stroke-width':3,fill:'none'});
      r.junk.push(j); s.appendChild(j);
    }
    /* label + stats */
    r.bergLbl=g({opacity:0},[
      e('path',{d:'M1210,586 v-52 h150',stroke:P.risk,'stroke-width':3,fill:'none'}),
      tx('FATBERG',{x:1372,y:528,size:26,f:'m',fill:P.risk,ls:'.16em'}),
      tx('grease + waste, welded to the pipe',{x:1372,y:558,size:20,f:'b',fill:'#9FB3B0'})
    ]);
    s.appendChild(r.bergLbl);

    r.stat=E.gChip({x:96,y:786,t:'1 L OF OIL  →  25,000 L OF WATER CONTAMINATED',bg:'#16292B',stroke:'#3B565A',fill:'#F2B75B',size:22,h:54});
    s.appendChild(r.stat);
    /* flow arrow shrinking */
    r.flow=E.gArrow({d:'M1560,658 H1800',c:'#4E7B80',w:6});
    s.appendChild(r.flow);
    r.blocked=tx('FLOW ↓',{x:1680,y:770,size:20,f:'m',fill:P.risk,anchor:'middle',ls:'.1em',opacity:0});
    s.appendChild(r.blocked);
  },
  update:function(t){
    var r=this.r,i;
    op(r.soil,pr(t,0,.6)); op(r.hatch,pr(t,.3,1.4)*.9); op(r.street,pr(t,0,.6));
    op(r.pipeIn,pr(t,.4,1.2)); op(r.pipeTop,pr(t,.4,1.2)); op(r.pipeBot,pr(t,.4,1.2));
    op(r.dropPipe,pr(t,.6,1.4));
    for(i=0;i<3;i++){
      var a=pr(t,.3+i*.25,1.1+i*.25);
      op(r.shops[i],a); xf(r.shops[i],'translate('+(150+i*490)+','+mix(388,364,eo(a))+') scale(.85)');
    }
    op(r.shopLbl,pr(t,1.1,1.9));
    op(r.water,pr(t,1.2,2.2)*.9);
    for(i=0;i<3;i++) set(r.water.childNodes[i],{'stroke-dashoffset':-(t*(120+i*40))%230});

    /* pour */
    var pourP=pr(t,4.4,5.6);
    xf(r.pan,'translate(460,440) scale(1.5) rotate('+mix(0,-52,eo(pr(t,4.1,4.9)))+')');
    op(r.pan,pr(t,3.4,4.1)*(1-pr(t,10.0,10.8)));
    op(r.sink,pr(t,3.0,3.8));
    draw(r.pour,pourP*(1-pr(t,9.6,10.4)));
    var sp=pr(t,5.4,6.4);
    set(r.splat,{rx:mix(0,58,eo(sp)),ry:mix(0,13,eo(sp))}); op(r.splat,sp*(1-pr(t,9.6,10.6)));

    /* coating */
    var co=pr(t,6.0,10.5);
    set(r.coatTop,{height:mix(0,26,eo(co))});
    set(r.coatBot,{y:mix(720,694,eo(co)),height:mix(0,26,eo(co))});
    op(r.stat,fade(t,10.6,11.4));

    /* fatberg */
    var bg=pr(t,12.6,17.4);
    op(r.bergWrap,pr(t,12.6,13.4));
    xf(r.berg,'translate(1210,658) scale('+mix(.28,1,eo(bg))+',' +mix(.2,1,eo(bg))+')');
    for(i=0;i<9;i++){
      var jp=pr(t,12.2+i*.34,13.4+i*.34);
      op(r.junk[i],jp*(1-pr(t,17.0,18.2)));
      xf(r.junk[i],'translate('+mix(360,0,eo(jp))+',0)');
    }
    op(r.bergLbl,pr(t,17.6,18.6));
    draw(r.flow.r.path,pr(t,7.8,8.8)*(1-.62*pr(t,15.0,19.0)));
    op(r.blocked,pr(t,19.4,20.4));
    if(t>19.4) set(r.flow.r.path,{stroke:hexmix('#4E7B80',P.risk,pr(t,19.0,20.6))});
  }
});

/* ---------------------------------------------------------- 2. THE FLOOD */
E.scene({
  id:'flood', dark:true, chapter:'The flood', dur:15,
  eyebrow:'The problem', title:'And then the rain comes',
  cues:[
    [0.3,5.0,'A blocked drain has nowhere to send the rain.'],
    [5.6,4.8,'About <u>13,000</u> unblocking operations a year in the Baixada Fluminense.'],
    [10.8,3.9,'The water rises in the same low-income streets, every season.']
  ],
  build:function(s){
    var r=this.r={},i;
    r.sky=e('rect',{x:0,y:150,width:1920,height:552,fill:'#122226'});
    s.appendChild(r.sky);
    /* rain */
    r.rain=[];
    for(i=0;i<70;i++){
      var x=rnd(i*1.7)*1980-30;
      var l=e('path',{d:'M'+x+',0 l-9,34',stroke:'#4E7B80','stroke-width':2.4,'stroke-linecap':'round',opacity:.55});
      r.rain.push({n:l,x:x,ph:rnd(i*9.1)}); s.appendChild(l);
    }
    /* houses */
    r.houses=[];
    for(i=0;i<4;i++){
      var h=E.gHouse({x:150+i*420,y:462,w:250,h:238,c:'#1E3134',ln:'#415F63',roof:'#2B4145'});
      r.houses.push(h); s.appendChild(h);
    }
    r.ground=e('rect',{x:0,y:700,width:1920,height:12,fill:'#2A4245'});
    s.appendChild(r.ground);
    /* water: a gradient that sinks into the ground colour, plus a live surface line */
    s.appendChild(e('defs',null,[
      e('linearGradient',{id:'floodgrad',x1:'0',y1:'0',x2:'0',y2:'1'},[
        e('stop',{offset:'0','stop-color':'#3A5F98'}),
        e('stop',{offset:'0.35','stop-color':'#2C4C80'}),
        e('stop',{offset:'1','stop-color':'#0D1719'})
      ])
    ]));
    r.waterBody=e('rect',{x:0,y:700,width:1920,height:0,fill:'url(#floodgrad)',opacity:.86});
    s.appendChild(r.waterBody);
    r.waveA=e('path',{d:'',fill:'none',stroke:'#4A74B8','stroke-width':5,'stroke-linecap':'round'});
    r.waveB=e('path',{d:'',fill:'none',stroke:'#82A6DC','stroke-width':3,'stroke-linecap':'round'});
    s.appendChild(r.waveA); s.appendChild(r.waveB);
    /* floating loss */
    r.floats=[
      g(null,[e('rect',{x:0,y:0,width:56,height:80,rx:5,fill:'#7E9491'}),e('path',{d:'M0,34 h56',stroke:'#122226','stroke-width':3})]),
      g(null,[e('rect',{x:0,y:0,width:82,height:44,rx:6,fill:'#8FA6A5'})]),
      g(null,[e('path',{d:'M0,40 v-32 h58 v32 z',fill:'#6E8785'})])
    ];
    for(i=0;i<3;i++) s.appendChild(r.floats[i]);
    /* level marker */
    r.level=g({opacity:0},[
      e('path',{d:'M96,570 H1824',stroke:'#F0705E','stroke-width':3,'stroke-dasharray':'14 12',fill:'none'}),
      tx('FLOOD LEVEL',{x:96,y:556,size:20,f:'m',fill:'#F0705E',ls:'.16em'})
    ]);
    s.appendChild(r.level);
    r.note=E.gChip({x:1074,y:214,t:'JANUARY 2024 · PAVUNA METRO STATION FLOODED',bg:'#1B2E31',stroke:'#3B565A',fill:'#F0705E',size:20,h:50});
    s.appendChild(r.note);
    r.cost=g({opacity:0},[
      tx('13,000',{x:96,y:290,size:96,f:'d',w:800,fill:'#F0705E',ls:'-.03em'}),
      txl(['unblocking operations a year,','paid for by the public'],{x:96,y:334,size:24,f:'b',fill:'#9FB3B0',lh:32})
    ]);
    s.appendChild(r.cost);
  },
  update:function(t){
    var r=this.r,i;
    op(r.sky,pr(t,0,.6));
    for(i=0;i<4;i++){
      var a=pr(t,.2+i*.14,1.0+i*.14);
      op(r.houses[i],a);
    }
    op(r.ground,pr(t,.3,1.0));
    for(i=0;i<70;i++){
      var o=r.rain[i], y=((t*(700+rnd(i)*420)+o.ph*900)%600)+150;
      xf(o.n,'translate(0,'+y+')'); op(o.n,pr(t,.4,1.6)*.5*(y>660?0:1));
    }
    /* rising water */
    var FLOOR=1080, rise=eio(pr(t,2.2,9.0))*116;
    set(r.waterBody,{y:700-rise,height:rise+(FLOOR-700)});
    var top=700-rise, dA='M0,'+top+' ', dB='M0,'+(top+11)+' ';
    for(i=0;i<=24;i++){
      var x=i*80, y1=top+Math.sin(t*1.7+i*.55)*7, y2=top+11+Math.sin(t*2.3+i*.4+1.2)*6;
      dA+='L'+x+','+y1+' '; dB+='L'+x+','+y2+' ';
    }
    set(r.waveA,{d:dA}); set(r.waveB,{d:dB});
    op(r.waveA,pr(t,2.2,3.0)); op(r.waveB,pr(t,2.4,3.2)*.6); op(r.waterBody,pr(t,2.2,3.0)*.86);
    /* floating objects */
    var fx=[420,980,1500], fy=[0,10,4];
    for(i=0;i<3;i++){
      var p=pr(t,4.0+i*.7,5.2+i*.7);
      xf(r.floats[i],'translate('+(fx[i]+Math.sin(t*.7+i)*26)+','+(top-56+fy[i]+Math.sin(t*1.6+i*2)*5)+') rotate('+Math.sin(t*1.1+i)*7+')');
      op(r.floats[i],p);
    }
    op(r.level,pr(t,8.4,9.4));
    op(r.note,pr(t,10.4,11.4));
    op(r.cost,pr(t,5.8,6.8)*(1-pr(t,13.6,14.6)));
  }
});

/* ---------------------------------------------------------- 3. THE VALUE GAP */
E.scene({
  id:'gap', dark:true, chapter:'The value gap', dur:19,
  eyebrow:'The problem', title:'The value that flows past',
  cues:[
    [0.3,4.6,'Here is the strange part: that oil is worth money.'],
    [5.0,6.2,'The catadores who already work these streets live on cardboard, at <b>R$0.15–0.40 a kilo</b>.'],
    [11.4,7.2,'The oil going past them sells for <b>R$0.80–2.50 a litre</b> — and demand for it grew over 700% in a decade.']
  ],
  build:function(s){
    var r=this.r={},i;

    /* ---- left column: what they sell today ---- */
    r.cardLbl=g({opacity:0},[
      tx('WHAT THEY SELL TODAY',{x:96,y:280,size:20,f:'m',fill:'#8CA3A0',ls:'.16em'}),
      tx('Cardboard',{x:96,y:342,size:52,f:'d',w:800,fill:'#E8F0ED',ls:'-.02em'})
    ]);
    s.appendChild(r.cardLbl);
    r.card=g({opacity:0,transform:'translate(96,392)'},[
      e('path',{d:'M0,60 h230 v-22 h-230 z',fill:'#6B6250'}),
      e('path',{d:'M10,38 h230 v-22 h-230 z',fill:'#7A705C'}),
      e('path',{d:'M0,16 h230 v-24 h-230 z',fill:'#8A7F68'})
    ]);
    s.appendChild(r.card);
    r.cardVal=g({opacity:0},[
      tx('R$0.15 – 0.40',{x:96,y:552,size:52,f:'d',w:800,fill:'#C6D6D2',ls:'-.02em'}),
      tx('per kilogram',{x:96,y:590,size:24,f:'b',fill:'#7E9491'}),
      tx('falling price · the material that sustains them today',{x:96,y:632,size:22,f:'b',fill:'#7E9491'})
    ]);
    s.appendChild(r.cardVal);

    /* the catador, bottom left */
    r.cat=E.gCatador({x:-140,y:790,s:1.15,ln:'#CFE0DC',sk:'#4E9A93',cart:'#1E3134'});
    s.appendChild(r.cat);

    /* ---- divider ---- */
    r.div=e('path',{d:'M1010,264 V700',stroke:'#28403F','stroke-width':2,fill:'none'});
    s.appendChild(r.div);

    /* ---- right column: what flows past ---- */
    r.oilLbl=g({opacity:0},[
      tx('WHAT FLOWS PAST THEM',{x:1130,y:280,size:20,f:'m',fill:'#8CA3A0',ls:'.16em'}),
      tx('Used cooking oil',{x:1130,y:342,size:52,f:'d',w:800,fill:'#F2B75B',ls:'-.02em'})
    ]);
    s.appendChild(r.oilLbl);
    r.bottle=E.gBottle({x:1130,y:386,s:1.5,seed:9,ln:'#CFE0DC',qr:false});
    op(r.bottle,0); s.appendChild(r.bottle);
    r.oilVal=g({opacity:0},[
      tx('R$0.80 – 2.50',{x:1250,y:552,size:52,f:'d',w:800,fill:'#F2B75B',ls:'-.02em'}),
      tx('per litre',{x:1250,y:590,size:24,f:'b',fill:'#9FB3B0'}),
      tx('rising price · industry short of feedstock',{x:1250,y:632,size:22,f:'b',fill:'#9FB3B0'})
    ]);
    s.appendChild(r.oilVal);

    /* the stream that misses them, into a drain */
    r.stream=e('path',{d:'M1180,530 C1180,620 1160,690 1160,742',
      stroke:P.oil,'stroke-width':14,fill:'none','stroke-linecap':'round',opacity:.9});
    s.appendChild(r.stream);
    r.drain=g({opacity:0},[
      e('rect',{x:1090,y:742,width:150,height:24,rx:5,fill:'#0B1517',stroke:'#3B565A','stroke-width':3}),
      e('path',{d:'M1104,746 v16 M1128,746 v16 M1152,746 v16 M1176,746 v16 M1200,746 v16 M1224,746 v16',stroke:'#3B565A','stroke-width':4})
    ]);
    s.appendChild(r.drain);
    r.drainLbl=tx('into the drain',{x:1165,y:794,size:21,f:'b',fill:'#7E9491',anchor:'middle',opacity:0});
    s.appendChild(r.drainLbl);

    /* the gap between them */
    r.reach=e('path',{d:'M470,742 H960',stroke:'#4E7B80','stroke-width':4,fill:'none','stroke-dasharray':'12 12'});
    s.appendChild(r.reach);
    r.reachLbl=tx('no channel between the two',{x:730,y:712,size:22,f:'b',fill:'#7E9491',anchor:'middle',opacity:0});
    s.appendChild(r.reachLbl);

    /* demand, right column */
    r.bars=g({opacity:0},[
      tx('+700%',{x:1250,y:722,size:60,f:'d',w:800,fill:'#F2B75B',ls:'-.03em'}),
      tx('industrial demand, 2012 → 2022',{x:1250,y:760,size:23,f:'b',fill:'#9FB3B0'}),
      tx('17.8 → 148.4 million litres of biodiesel made from used oil',
         {x:1250,y:792,size:20,f:'m',fill:'#7E9491'})
    ]);
    s.appendChild(r.bars);
  },
  update:function(t){
    var r=this.r;
    /* left column */
    op(r.cardLbl,pr(t,1.2,2.2));
    var cs=pr(t,2.0,3.0);
    op(r.card,cs); xf(r.card,'translate(96,'+mix(410,392,eo(cs))+')');
    op(r.cardVal,pr(t,4.4,5.4));
    /* the catador walks in */
    var walk=pr(t,.3,2.4);
    op(r.cat,Math.min(1,walk*4));
    xf(r.cat,'translate('+mix(-140,150,eio(walk))+',790) scale(1.15)');
    var sw=(walk<1?1:0)*Math.sin(t*8)*20;
    xf(r.cat.r.legA,'rotate('+sw+',0,26)'); xf(r.cat.r.legB,'rotate('+(-sw)+',0,26)');
    op(r.div,pr(t,6.0,7.0)*.9);
    /* right column */
    op(r.oilLbl,pr(t,6.6,7.6));
    var bs=pr(t,7.2,8.2);
    op(r.bottle,bs); xf(r.bottle,'translate(1130,'+mix(404,386,eo(bs))+') scale(1.5)');
    draw(r.stream,ep(t,8.4,10.0,eio));
    op(r.drain,pr(t,9.4,10.2)); op(r.drainLbl,pr(t,10.2,11.0));
    op(r.oilVal,pr(t,11.4,12.4));
    /* the gap */
    draw(r.reach,ep(t,12.6,13.8)); op(r.reach,pr(t,12.6,13.0)*.85);
    op(r.reachLbl,pr(t,13.6,14.4));
    /* demand */
    var dm=pr(t,14.6,15.6);
    op(r.bars,dm); xf(r.bars,'translate(0,'+mix(14,0,eo(dm))+')');
  }
});

/* ---------------------------------------------------------- 4. THE MISSING LAYER */
E.scene({
  id:'idea', chapter:'The idea', dur:19,
  eyebrow:'The idea', title:'The missing layer',
  bg:function(t){ return hexmix('#0D1719','#E9EDE6',pr(t,0.15,1.5)); },
  darkAt:function(t){ return t<0.75; },
  cues:[
    [1.2,5.0,'The workers exist. The buyers exist.'],
    [6.4,6.4,'What is missing is the layer in between — something that collects the oil and <i>proves</i> what it is.'],
    [13.0,5.4,'That layer is the collector system. It runs in six steps.']
  ],
  build:function(s){
    var r=this.r={},i;
    r.left=E.gCard({x:96,y:300,w:560,title:'ALREADY THERE · THE WORKERS',rows:[],accent:P.sys,bg:'#FFFFFF'});
    r.left.appendChild(txl(['281,000+ catadores,','recognized by Brazilian law','since 2010. Organized in','cooperatives that can sign','contracts.'],
      {x:22,y:96,size:27,f:'b',fill:P.ink,lh:38}));
    E.set(r.left.childNodes[0],{height:300});
    s.appendChild(r.left);
    r.right=E.gCard({x:1264,y:300,w:560,title:'ALREADY THERE · THE BUYERS',rows:[],accent:P.oil,bg:'#FFFFFF'});
    r.right.appendChild(txl(['Biodiesel, soap and feed','industries short of feedstock.','Demand grew 700% while','collection stayed flat.'],
      {x:22,y:96,size:27,f:'b',fill:P.ink,lh:38}));
    E.set(r.right.childNodes[0],{height:300});
    s.appendChild(r.right);

    r.gapBox=g({opacity:0},[
      e('rect',{x:700,y:300,width:520,height:300,rx:12,fill:'none',stroke:P.risk,'stroke-width':4,'stroke-dasharray':'16 14'}),
      tx('?',{x:960,y:498,size:150,f:'d',w:800,fill:P.risk,anchor:'middle',opacity:.85}),
      tx('NO WAY TO GET FROM ONE TO THE OTHER',{x:960,y:640,size:21,f:'m',fill:P.risk,anchor:'middle',ls:'.1em'})
    ]);
    s.appendChild(r.gapBox);

    r.bar=g({opacity:0},[
      e('rect',{x:700,y:300,width:520,height:300,rx:12,fill:P.sys}),
      tx('EcoCycle',{x:960,y:400,size:56,f:'d',w:800,fill:'#F2F7F4',anchor:'middle',ls:'-.02em'}),
      tx('collect  ·  verify  ·  sell',{x:960,y:452,size:26,f:'m',fill:'#9FD3CE',anchor:'middle',ls:'.06em'}),
      e('path',{d:'M760,500 H1160',stroke:'#2E7E86','stroke-width':2}),
      txl(['turns scattered oil into','a batch a company can','sign a contract for'],{x:960,y:542,size:24,f:'b',fill:'#CFE7E3',anchor:'middle',lh:32})
    ]);
    s.appendChild(r.bar);

    /* connective arrows */
    r.aL=E.gArrow({d:'M666,450 H690',c:P.sys,w:5});
    r.aR=E.gArrow({d:'M1230,450 H1256',c:P.sys,w:5});
    s.appendChild(r.aL); s.appendChild(r.aR);

    /* six steps preview */
    var labels=['REGISTER','COLLECT','POOL','SELL','PAY','LEARN'];
    r.steps=[];
    for(i=0;i<6;i++){
      var x=176+i*270;
      var n=g({opacity:0,transform:'translate('+x+',690)'},[
        e('rect',{x:0,y:0,width:230,height:96,rx:12,fill:'#FFFFFF',stroke:P.line,'stroke-width':2.5}),
        e('circle',{cx:40,cy:48,r:22,fill:P.sys}),
        tx(String(i+1),{x:40,y:56,size:24,f:'m',fill:'#F2F7F4',anchor:'middle'}),
        tx(labels[i],{x:76,y:56,size:21,f:'m',fill:P.ink,ls:'.09em'})
      ]);
      r.steps.push(n); s.appendChild(n);
    }
  },
  update:function(t){
    var r=this.r,i;
    var a=pr(t,1.2,2.2);
    op(r.left,a); E.xf(r.left,'translate('+mix(40,96,eo(a))+',300)');
    var b=pr(t,1.6,2.6);
    op(r.right,b); E.xf(r.right,'translate('+mix(1320,1264,eo(b))+',300)');
    op(r.gapBox,pr(t,3.4,4.4)*(1-pr(t,8.4,9.2)));
    var c=pr(t,8.6,9.8);
    op(r.bar,c);
    E.xf(r.bar,'translate(0,'+mix(30,0,eo(c))+') scale(1)');
    draw(r.aL.r.path,ep(t,9.6,10.2)); draw(r.aR.r.path,ep(t,9.8,10.4));
    for(i=0;i<6;i++){
      var p=pr(t,13.2+i*.34,13.9+i*.34);
      op(r.steps[i],p);
      E.xf(r.steps[i],'translate('+(176+i*270)+','+mix(714,690,eb(p))+')');
    }
  }
});

})();
