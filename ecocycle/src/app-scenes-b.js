/* ===================== ACT 2 — STEPS 1 · 2 · 3 ===================== */
(function(){
var E=window.__EC, e=E.e, g=E.g, tx=E.tx, txl=E.txl, P=E.P;
var pr=E.pr, ep=E.ep, eo=E.eo, eio=E.eio, eb=E.eb, cl=E.cl, mix=E.mix, fade=E.fade, rnd=E.rnd;
var draw=E.draw, along=E.along, op=E.op, xf=E.xf, set=E.set;

/* the platform strip used in several steps */
function platform(o){
  o=o||{};
  var w=o.w||1160,h=88;
  var k=[
    e('rect',{x:0,y:0,width:w,height:h,rx:14,fill:P.sys}),
    tx('ECOCYCLE PLATFORM',{x:28,y:52,size:22,f:'m',fill:'#9FD3CE',ls:'.16em'}),
    tx('QR traceability  ·  every handoff logged',{x:w-28,y:52,size:22,f:'b',fill:'#DCEEEB',anchor:'end'})
  ];
  var n=g({transform:'translate('+(o.x||0)+','+(o.y||0)+')'},k); n.w=w; return n;
}

/* ---------------------------------------------------------- STEP 1 */
E.scene({
  id:'step1', chapter:'Step 1 · Register', dur:24, step:1,
  eyebrow:'Step 1 of 6', title:'Register, and get a bottle with a code',
  cues:[
    [0.4,5.4,"Step one. A small restaurant, bar or snack shop signs up at the residents' association."],
    [6.0,5.8,'It gets a clean PET bottle with a code of its own — and picks a fixed collection day.'],
    [12.2,5.0,'Nothing to buy, nothing to pay. The bottle is the account.'],
    [17.6,5.6,'Households on the same street can join too, and earn <s>Green Points</s> at local shops.']
  ],
  build:function(s){
    var r=this.r={},i;
    r.shop=E.gShop({x:110,y:400,s:1.0,label:'LANCHONETE',awn:P.oil});
    s.appendChild(r.shop);
    r.shopLbl=tx('the generator',{x:215,y:596,size:22,f:'b',fill:P.muted,anchor:'middle'});
    s.appendChild(r.shopLbl);

    r.a1=E.gArrow({d:'M348,470 H520',c:P.sys,w:5});
    s.appendChild(r.a1);

    r.civic=E.gCivic({x:566,y:376,w:300,h:190,label:"RESIDENTS' ASSOCIATION"});
    s.appendChild(r.civic);

    r.card=E.gCard({x:540,y:606,w:352,title:'REGISTRATION',accent:P.sys,rows:[
      ['id','JA-014'],['type','snack bar'],['pickup','Tue · 09:00'],['container','1 × 5 L PET']
    ]});
    s.appendChild(r.card);

    r.a2=E.gArrow({d:'M912,470 H1090',c:P.sys,w:5});
    s.appendChild(r.a2);

    r.bottle=E.gBottle({x:1150,y:330,s:2.9,seed:14});
    s.appendChild(r.bottle);
    r.qrTiles=[];
    r.bLbl=g({opacity:0},[
      e('path',{d:'M1330,430 H1430',stroke:P.line,'stroke-width':2.5}),
      tx('JA-014',{x:1446,y:438,size:30,f:'m',fill:P.sys}),
      tx('this code belongs to this shop',{x:1446,y:470,size:21,f:'b',fill:P.muted})
    ]);
    s.appendChild(r.bLbl);

    r.chips=[
      E.gChip({x:1150,y:702,t:'CLEAR PET BOTTLE — NOTHING TO BUY',fill:P.sys,size:20}),
      E.gChip({x:1150,y:760,t:'FREE FOR THE ESTABLISHMENT',fill:P.sys,size:20})
    ];
    for(i=0;i<2;i++) s.appendChild(r.chips[i]);

    r.house=g({opacity:0},[
      E.gHouse({x:0,y:0,w:120,h:96,c:P.moneyPale,ln:P.money,roof:'#8FBBA3'}),
      tx('households too',{x:60,y:126,size:21,f:'b',fill:P.money,anchor:'middle'})
    ]);
    xf(r.house,'translate(150,660)');
    s.appendChild(r.house);
    r.gp=E.gChip({x:300,y:690,t:'+ GREEN POINTS',fill:P.money,stroke:P.money,bg:P.moneyPale,size:21});
    s.appendChild(r.gp);
  },
  update:function(t){
    var r=this.r,i;
    var a=pr(t,.2,1.1); op(r.shop,a); xf(r.shop,'translate(110,'+mix(420,400,eo(a))+')');
    op(r.shopLbl,pr(t,1.0,1.8));
    draw(r.a1.r.path,ep(t,1.4,2.2));
    var c=pr(t,1.9,2.9); op(r.civic,c); xf(r.civic,'translate(566,'+mix(400,376,eo(c))+')');
    op(r.card,pr(t,3.2,4.0));
    for(i=0;i<r.card.r.rows.length;i++){
      var rp=pr(t,3.6+i*.42,4.2+i*.42);
      op(r.card.r.rows[i][0],rp); op(r.card.r.rows[i][1],rp);
    }
    draw(r.a2.r.path,ep(t,6.0,6.8));
    var b=pr(t,6.4,7.8);
    op(r.bottle,b); xf(r.bottle,'translate(1150,'+mix(360,330,eb(b))+') scale(2.9)');
    op(r.bottle.r.qr,pr(t,8.2,9.4));
    set(r.bottle.r.fill,{y:mix(120,52,ep(t,7.0,8.6,eio))});
    op(r.bLbl,pr(t,9.6,10.6));
    op(r.chips[0],pr(t,12.4,13.2));
    op(r.chips[1],pr(t,13.4,14.2));
    var h=pr(t,17.8,18.8);
    op(r.house,h); xf(r.house,'translate(150,'+mix(684,660,eo(h))+')');
    op(r.gp,pr(t,19.2,20.0));
  }
});

/* ---------------------------------------------------------- STEP 2 */
E.scene({
  id:'step2', chapter:'Step 2 · Collect', dur:28, step:2,
  eyebrow:'Step 2 of 6', title:'The catador collects, and scans',
  cues:[
    [0.4,5.0,'Step two. A catador from the local cooperative walks the route.'],
    [5.6,5.8,'At the door they check the oil through the clear bottle, and scan the code.'],
    [11.8,6.4,'That one scan records four things: how much, from where, when, and who collected it.'],
    [18.6,5.4,'The oil is no longer anonymous waste. It has a history.'],
    [24.4,3.2,'The shop keeps a receipt for it.']
  ],
  build:function(s){
    var r=this.r={},i;
    r.plat=platform({x:380,y:190,w:1160});
    s.appendChild(r.plat);
    r.logLbl=tx('THE LOG, FILLING UP',{x:380,y:306,size:18,f:'m',fill:P.muted,ls:'.16em'});
    op(r.logLbl,0); s.appendChild(r.logLbl);

    /* street level: one doorstep */
    r.road=e('rect',{x:0,y:712,width:1920,height:9,fill:P.line});
    s.appendChild(r.road);
    r.shop=E.gShop({x:96,y:562,s:1.0,label:'LANCHONETE',awn:P.oil});
    s.appendChild(r.shop);
    r.shopId=tx('JA-014',{x:200,y:748,size:21,f:'m',fill:P.muted,anchor:'middle'});
    s.appendChild(r.shopId);

    /* record cards flying up into the log strip */
    r.recs=[];
    var recData=[['18.0 L','JA-014'],['12.5 L','JA-021'],['9.5 L','JA-033'],['4.0 L','JA-108']];
    for(i=0;i<4;i++){
      var c=E.gCard({x:0,y:0,w:250,rows:[],pad:16,rx:8});
      set(c.childNodes[0],{height:66,fill:'#FFFFFF',stroke:P.sys,'stroke-width':2.5});
      c.appendChild(tx(recData[i][0],{x:18,y:30,size:22,f:'m',fill:P.oilDeep}));
      c.appendChild(tx(recData[i][1],{x:18,y:54,size:19,f:'m',fill:P.muted}));
      var q=E.gQR(34,i*13+3,P.sys,'#FFFFFF'); xf(q,'translate(198,16)'); c.appendChild(q);
      op(c,0); r.recs.push(c); s.appendChild(c);
    }

    /* catador at the door */
    r.cat=E.gCatador({x:-160,y:712,s:1.15});
    s.appendChild(r.cat);

    /* the scan close-up */
    r.zoom=g({opacity:0},[]);
    r.zBottle=E.gBottle({x:0,y:0,s:2.1,seed:14});
    r.zoom.appendChild(r.zBottle);
    r.zPhone=E.gPhone({x:222,y:22,s:1.05});
    r.zoom.appendChild(r.zPhone);
    var qq=E.gQR(74,14,P.sys,'#F5F8F4'); xf(qq,'translate(23,26)');
    r.zPhone.r.screen.appendChild(qq);
    r.zTick=g({opacity:0},[
      e('circle',{cx:63,cy:150,r:26,fill:P.money}),
      e('path',{d:'M51,150 l9,10 l17,-20',stroke:'#FFFFFF','stroke-width':5,fill:'none','stroke-linecap':'round','stroke-linejoin':'round'})
    ]);
    r.zPhone.r.screen.appendChild(r.zTick);
    r.zBeam=e('path',{d:'M196,74 H218',stroke:P.oil,'stroke-width':4,'stroke-dasharray':'8 8'});
    r.zoom.appendChild(r.zBeam);
    r.zoom.appendChild(tx('visual check through the clear bottle, then scan',
      {x:0,y:-22,size:21,f:'b',fill:P.muted}));
    xf(r.zoom,'translate(600,452)');
    s.appendChild(r.zoom);

    /* four things */
    r.four=[];
    var four=[['HOW MUCH','18.0 litres'],['FROM WHERE','JA-014 · Rua Aurora'],['WHEN','12 May, 09:12'],['WHO COLLECTED','C-07 · Coop. COOPAMA']];
    for(i=0;i<4;i++){
      var n=g({opacity:0,transform:'translate(1180,'+(496+i*76)+')'},[
        e('circle',{cx:16,cy:-8,r:15,fill:P.sysPale,stroke:P.sys,'stroke-width':2.5}),
        e('path',{d:'M9,-9 l5,6 l10,-12',stroke:P.sys,'stroke-width':3.5,fill:'none','stroke-linecap':'round','stroke-linejoin':'round'}),
        tx(four[i][0],{x:48,y:-14,size:18,f:'m',fill:P.muted,ls:'.14em'}),
        tx(four[i][1],{x:330,y:-14,size:27,f:'b',w:600,fill:P.ink})
      ]);
      r.four.push(n); s.appendChild(n);
    }
    r.hist=E.gChip({x:1180,y:800,t:'A CHAIN OF CUSTODY STARTS HERE',fill:P.sys,size:20});
    s.appendChild(r.hist);
  },
  update:function(t){
    var r=this.r,i;
    op(r.plat,pr(t,.2,1.0));
    op(r.road,pr(t,.1,.8));
    op(r.shop,pr(t,.2,1.0)); op(r.shopId,pr(t,.6,1.4));

    /* the catador arrives at the door and stays */
    var x=mix(-160,404,eio(pr(t,.8,3.4)));
    var moving=t>.8&&t<3.4;
    xf(r.cat,'translate('+x+',712) scale(1.15)');
    var sw=(moving?1:0)*Math.sin(t*8)*20;
    xf(r.cat.r.legA,'rotate('+sw+',0,26)'); xf(r.cat.r.legB,'rotate('+(-sw)+',0,26)');

    /* close-up scan */
    op(r.zoom,pr(t,5.6,6.6));
    xf(r.zoom,'translate(600,'+mix(472,452,eo(pr(t,5.6,6.8)))+')');
    op(r.zBeam,fade(t,7.2,7.6,8.8,9.1));
    set(r.zBeam,{'stroke-dashoffset':-(t*30)%16});
    op(r.zTick,pr(t,8.9,9.4));

    /* the four things */
    for(i=0;i<4;i++){
      var p=pr(t,11.8+i*.78,12.6+i*.78);
      op(r.four[i],p);
      xf(r.four[i],'translate('+mix(1210,1180,eo(p))+','+(496+i*76)+')');
    }
    op(r.hist,pr(t,19.0,19.9));

    /* records flying up into the log strip */
    op(r.logLbl,pr(t,9.6,10.4));
    var starts=[9.6,15.0,18.6,22.2];
    for(i=0;i<4;i++){
      var p=pr(t,starts[i],starts[i]+1.4);
      op(r.recs[i],Math.min(1,p*5));
      var yy=mix(560,330,eio(p)), xx=mix(660,398+i*270,eio(p));
      xf(r.recs[i],'translate('+xx+','+yy+') scale('+mix(.72,1,eo(p))+')');
    }
  }
});

/* ---------------------------------------------------------- STEP 3 */
E.scene({
  id:'step3', chapter:'Step 3 · Pool & verify', dur:28, step:3,
  eyebrow:'Step 3 of 6', title:'Pooled into one verified batch',
  cues:[
    [0.4,5.4,"Step three. Everything goes to a neighbourhood hub, hosted by the residents' association."],
    [6.0,5.8,'Small pickups are pooled into a single batch, and the oil is tested for water and dirt.'],
    [12.2,6.2,'The batch can only ship if the total matches the sum of every scan.'],
    [18.8,5.2,'That is what stops oil from quietly disappearing on the way.'],
    [24.4,3.2,'Twenty-four small deliveries, one contract-grade batch.']
  ],
  build:function(s){
    var r=this.r={},i;
    r.civic=E.gCivic({x:96,y:300,w:300,h:200,label:'HUB · JARDIM AMÉRICA'});
    s.appendChild(r.civic);

    /* incoming bottles along an arc */
    r.path=e('path',{d:'M120,700 C330,720 470,660 560,560',fill:'none',stroke:P.line,'stroke-width':2.5,'stroke-dasharray':'10 10'});
    s.appendChild(r.path);
    r.bots=[];
    for(i=0;i<8;i++){
      var b=E.gBottle({x:0,y:0,s:.78,seed:i*5+2});
      op(b,0); r.bots.push(b); s.appendChild(b);
    }
    r.drum=E.gDrum({x:600,y:470,w:150,h:190});
    s.appendChild(r.drum);
    r.drumLbl=tx('one batch',{x:675,y:698,size:22,f:'b',fill:P.muted,anchor:'middle'});
    s.appendChild(r.drumLbl);

    /* quality test */
    r.test=g({opacity:0,transform:'translate(830,470)'},[
      e('rect',{x:0,y:30,width:74,height:160,rx:8,fill:'#FFFFFF',stroke:P.ink,'stroke-width':3}),
      e('rect',{x:4,y:96,width:66,height:90,rx:5,fill:P.oil,opacity:.85}),
      e('path',{d:'M37,10 v96',stroke:P.ink,'stroke-width':4,'stroke-linecap':'round'}),
      e('circle',{cx:37,cy:120,r:15,fill:P.ink}),
      tx('DENSITY TEST',{x:37,y:222,size:17,f:'m',fill:P.muted,anchor:'middle',ls:'.1em'})
    ]);
    s.appendChild(r.test);
    r.qc=[
      E.gChip({x:940,y:470,t:'WATER CONTENT  ✓',fill:P.money,stroke:P.money,bg:P.moneyPale,size:19}),
      E.gChip({x:940,y:524,t:'NO LUBRICANTS  ✓',fill:P.money,stroke:P.money,bg:P.moneyPale,size:19})
    ];
    for(i=0;i<2;i++) s.appendChild(r.qc[i]);
    r.flag=E.gChip({x:600,y:790,t:'CONTAMINATED → TRACED BACK TO THE SOURCE',fill:P.risk,stroke:P.risk,bg:P.riskPale,size:19,h:48});
    s.appendChild(r.flag);

    /* the ledger */
    r.led=E.gCard({x:1230,y:300,w:594,title:'BATCH LEDGER · JA-2026-014',accent:P.sys,rows:[
      ['JA-014  ·  12 May 09:12','18.0 L'],
      ['JA-021  ·  12 May 09:26','12.5 L'],
      ['JA-033  ·  12 May 09:41',' 9.5 L'],
      ['JA-108  ·  12 May 10:02',' 4.0 L'],
      ['+ 20 more pickups','436.0 L']
    ]});
    s.appendChild(r.led);
    r.sum=g({opacity:0,transform:'translate(1230,548)'},[
      e('path',{d:'M22,0 H572',stroke:P.line,'stroke-width':2}),
      tx('SUM OF SCANS',{x:22,y:44,size:22,f:'m',fill:P.muted,ls:'.1em'}),
      tx('480.0 L',{x:572,y:44,size:26,f:'m',fill:P.ink,anchor:'end'}),
      tx('WEIGHED AT SHIPPING',{x:22,y:84,size:22,f:'m',fill:P.muted,ls:'.1em'}),
      tx('480.0 L',{x:572,y:84,size:26,f:'m',fill:P.ink,anchor:'end'})
    ]);
    s.appendChild(r.sum);
    r.match=g({opacity:0,transform:'translate(1230,656)'},[
      e('rect',{x:0,y:0,width:594,height:66,rx:10,fill:P.moneyPale,stroke:P.money,'stroke-width':2.5}),
      e('path',{d:'M28,34 l12,13 l22,-27',stroke:P.money,'stroke-width':5,fill:'none','stroke-linecap':'round','stroke-linejoin':'round'}),
      tx('MATCH — the batch may ship',{x:82,y:42,size:25,f:'b',w:600,fill:P.money})
    ]);
    s.appendChild(r.match);
    r.batch=g({opacity:0,transform:'translate(600,700)'},[
      e('rect',{x:0,y:0,width:500,height:74,rx:10,fill:P.sys}),
      tx('BATCH JA-2026-014',{x:24,y:32,size:21,f:'m',fill:'#9FD3CE',ls:'.1em'}),
      tx('480 L  ·  24 sources  ·  verified',{x:24,y:60,size:25,f:'b',w:600,fill:'#F2F7F4'})
    ]);
    s.appendChild(r.batch);
  },
  update:function(t){
    var r=this.r,i;
    op(r.civic,pr(t,.2,1.1));
    op(r.path,pr(t,.6,1.4)*.8);
    op(r.drum,pr(t,1.0,1.8)); op(r.drumLbl,pr(t,1.4,2.2));
    /* bottles travel the arc and pour in */
    var fill=0;
    for(i=0;i<8;i++){
      var st=2.0+i*.62, p=pr(t,st,st+1.5);
      op(r.bots[i], p>0 && p<1 ? 1 : 0);
      if(p>0&&p<1){
        var pt=along(r.path,p);
        xf(r.bots[i],'translate('+(pt.x-24)+','+(pt.y-60)+') scale(.78)');
      }
      if(p>=1) fill++;
    }
    var fl=cl(fill/8+ep(t,2.0,9.6)*0.12,0,1);
    set(r.drum.r.fill,{y:mix(190,26,fl)});
    op(r.test,pr(t,8.2,9.2));
    op(r.qc[0],pr(t,9.6,10.4)); op(r.qc[1],pr(t,10.2,11.0));
    op(r.flag,pr(t,19.2,20.2));
    op(r.led,pr(t,12.2,13.0));
    for(i=0;i<r.led.r.rows.length;i++){
      var rp=pr(t,12.6+i*.36,13.2+i*.36);
      op(r.led.r.rows[i][0],rp); op(r.led.r.rows[i][1],rp);
    }
    op(r.sum,pr(t,15.0,15.8));
    op(r.match,pr(t,17.0,17.9));
    var bt=pr(t,24.2,25.2);
    op(r.batch,bt); xf(r.batch,'translate(600,'+mix(724,700,eb(bt))+')');
  }
});

})();
