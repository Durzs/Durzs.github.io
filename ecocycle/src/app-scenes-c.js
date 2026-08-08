/* ===================== ACT 2 — STEPS 4 · 5 · 6 ===================== */
(function(){
var E=window.__EC, e=E.e, g=E.g, tx=E.tx, txl=E.txl, P=E.P;
var pr=E.pr, ep=E.ep, eo=E.eo, eio=E.eio, eb=E.eb, cl=E.cl, mix=E.mix, fade=E.fade, rnd=E.rnd;
var draw=E.draw, along=E.along, op=E.op, xf=E.xf, set=E.set;

/* ---------------------------------------------------------- STEP 4 */
E.scene({
  id:'step4', chapter:'Step 4 · Sell', dur:24, step:4,
  eyebrow:'Step 4 of 6', title:'Sold under contract — to several buyers',
  cues:[
    [0.4,6.0,'Step four. The batch is sold under contract, to several processors — never just one.'],
    [6.8,7.2,'Rio learned this the hard way: the old PROVE programme depended on a single refinery.'],
    [14.4,5.4,'When it was shut down in 2026, the collected oil had nowhere to go.'],
    [20.2,3.4,'More than one buyer keeps the system alive.']
  ],
  build:function(s){
    var r=this.r={},i;
    r.batch=g({transform:'translate(120,420)'},[
      e('rect',{x:0,y:0,width:330,height:150,rx:12,fill:P.sys}),
      tx('VERIFIED BATCH',{x:24,y:44,size:20,f:'m',fill:'#9FD3CE',ls:'.14em'}),
      tx('480 L',{x:24,y:100,size:54,f:'d',w:800,fill:'#F2F7F4',ls:'-.02em'}),
      tx('24 sources · traced',{x:24,y:130,size:21,f:'b',fill:'#9FD3CE'})
    ]);
    s.appendChild(r.batch);

    var buyers=[['BIODIESEL','B15 blend, rising to B16'],['SOAP & OLEOCHEMICALS','industrial buyers'],['ANIMAL FEED','regional demand']];
    r.plants=[]; r.arrows=[]; r.lbls=[];
    for(i=0;i<3;i++){
      var y=250+i*212;
      var pl=E.gPlant({x:1320,y:y,s:.78,ln:P.sys});
      r.plants.push(pl); s.appendChild(pl);
      var a=E.gArrow({d:'M470,495 C760,495 900,'+(y+66)+' 1300,'+(y+66),c:P.oil,w:5});
      r.arrows.push(a); s.appendChild(a);
      var l=g({opacity:0},[
        tx(buyers[i][0],{x:1500,y:y+150,size:24,f:'m',fill:P.ink,ls:'.06em',anchor:'middle'}),
        tx(buyers[i][1],{x:1500,y:y+178,size:20,f:'b',fill:P.muted,anchor:'middle'})
      ]);
      r.lbls.push(l); s.appendChild(l);
    }

    /* the PROVE flashback */
    r.scrim=e('rect',{x:0,y:0,width:1920,height:1080,fill:P.ground,opacity:0});
    s.appendChild(r.scrim);
    r.fb=g({opacity:0},[
      e('rect',{x:300,y:246,width:1320,height:470,rx:16,fill:'#122123'}),
      tx('WHY NOT JUST ONE BUYER?',{x:344,y:308,size:22,f:'m',fill:'#7FBDB6',ls:'.16em'}),
      tx('PROVE · Rio de Janeiro, 2007–2026',{x:344,y:366,size:44,f:'d',w:700,fill:'#F1F6F3',ls:'-.02em'})
    ]);
    r.fbCoops=g({opacity:0},[
      e('rect',{x:344,y:430,width:250,height:120,rx:10,fill:'#1D3236',stroke:'#3B565A','stroke-width':2.5}),
      tx('30 cooperatives',{x:469,y:480,size:24,f:'b',w:600,fill:'#DCE8E4',anchor:'middle'}),
      tx('collecting oil',{x:469,y:512,size:20,f:'b',fill:'#8CA3A0',anchor:'middle'})
    ]);
    r.fbArrow=E.gArrow({d:'M614,490 H816',c:'#7FBDB6',w:5});
    r.fbRef=g({opacity:0},[
      e('rect',{x:836,y:430,width:290,height:120,rx:10,fill:'#1D3236',stroke:'#3B565A','stroke-width':2.5}),
      tx('ONE refinery',{x:981,y:480,size:24,f:'b',w:600,fill:'#DCE8E4',anchor:'middle'}),
      tx('Manguinhos',{x:981,y:512,size:20,f:'b',fill:'#8CA3A0',anchor:'middle'})
    ]);
    r.fbX=g({opacity:0},[
      e('path',{d:'M876,440 L1086,540 M1086,440 L876,540',stroke:'#F0705E','stroke-width':7,'stroke-linecap':'round'})
    ]);
    r.fbBreak=g({opacity:0},[
      e('path',{d:'M700,466 l26,24 l-26,24',stroke:'#F0705E','stroke-width':6,fill:'none','stroke-linecap':'round'}),
      e('path',{d:'M742,466 l-26,24 l26,24',stroke:'#F0705E','stroke-width':6,fill:'none','stroke-linecap':'round'})
    ]);
    r.fbNote=g({opacity:0},[
      txl(['January 2026: the refinery was','shut down by the national','petroleum agency.','','The collection model was fine.','Its single destination was not.'],
        {x:1180,y:452,size:26,f:'b',fill:'#DCE8E4',lh:36})
    ]);
    s.appendChild(r.fb); r.fb.appendChild(r.fbCoops); r.fb.appendChild(r.fbArrow);
    r.fb.appendChild(r.fbRef); r.fb.appendChild(r.fbX); r.fb.appendChild(r.fbBreak); r.fb.appendChild(r.fbNote);

    r.chip=E.gChip({x:600,y:756,t:'DIVERSIFIED DEMAND IS A DESIGN FEATURE, NOT A BONUS',fill:P.sys,size:21,h:52});
    s.appendChild(r.chip);
  },
  update:function(t){
    var r=this.r,i;
    var b=pr(t,.2,1.1); op(r.batch,b); xf(r.batch,'translate('+mix(80,120,eo(b))+',420)');
    for(i=0;i<3;i++){
      op(r.plants[i],pr(t,1.4+i*.3,2.3+i*.3));
      draw(r.arrows[i].r.path,ep(t,2.2+i*.42,3.6+i*.42));
      op(r.lbls[i],pr(t,3.0+i*.4,3.9+i*.4));
    }
    /* flashback */
    var f=fade(t,7.2,8.0,18.6,19.6);
    op(r.fb,f); op(r.scrim,f*.94);
    op(r.fbCoops,pr(t,8.2,9.0));
    draw(r.fbArrow.r.path,ep(t,9.0,9.8));
    op(r.fbRef,pr(t,9.6,10.4));
    op(r.fbNote,pr(t,11.0,12.0));
    op(r.fbX,pr(t,14.6,15.4));
    op(r.fbBreak,pr(t,15.6,16.4));
    /* arrows pulse back to life after the flashback */
    for(i=0;i<3;i++){
      var pulse=t>19.4?(0.55+0.45*Math.sin((t-19.4)*4-i*.9)):1;
      set(r.arrows[i].r.path,{'stroke-width':t>19.4?mix(5,8,cl(pulse)):5});
    }
    op(r.chip,pr(t,20.4,21.3));
  }
});

/* ---------------------------------------------------------- STEP 5 */
E.scene({
  id:'step5', chapter:'Step 5 · Pay', dur:30, step:5,
  eyebrow:'Step 5 of 6', title:'The money comes back, by a fixed rule',
  cues:[
    [0.4,5.2,'Step five. The money comes back to the same streets, by a rule fixed in advance.'],
    [5.8,4.8,'<s>Forty percent</s> goes to the catadores who collected it.'],
    [10.8,6.2,'Twenty percent to households that separate their oil, twenty percent as Green Points spent in local shops,'],
    [17.2,7.4,'and twenty percent to the Faetequinho course, which already trades free classes for used oil in Jardim América.'],
    [25.0,4.6,'In the pilot that is <s>R$113,517</s> a year, going back where the oil came from.']
  ],
  build:function(s){
    var r=this.r={},i;
    r.amt=g({opacity:0},[
      tx('R$113,517',{x:960,y:296,size:96,f:'d',w:800,fill:P.money,anchor:'middle',ls:'-.03em'}),
      tx('A YEAR, FROM 75,678 LITRES OF OIL  ·  PILOT SCENARIO',{x:960,y:338,size:21,f:'m',fill:P.muted,anchor:'middle',ls:'.14em'})
    ]);
    s.appendChild(r.amt);

    /* the split bar */
    var shares=[40,20,20,20], cols=[P.money,P.sys,P.oil,'#6B4FA0'];
    var X0=144, W=1632, x=X0;
    r.segs=[]; r.segTx=[];
    for(i=0;i<4;i++){
      var w=W*shares[i]/100;
      var sg=e('rect',{x:x,y:388,width:0,height:62,rx:8,fill:cols[i]});
      r.segs.push({n:sg,x:x,w:w}); s.appendChild(sg);
      var st=tx(shares[i]+'%',{x:x+w/2,y:430,size:30,f:'d',w:800,fill:'#FFFFFF',anchor:'middle',opacity:0});
      r.segTx.push(st); s.appendChild(st);
      x+=w+6;
    }

    /* the four destinations */
    var dest=[
      {t:'CATADORES',v:'R$45,407',d:['paid in reais, for','the work of collecting'],c:P.money},
      {t:'HOUSEHOLDS',v:'R$22,703',d:['incentive for separating','oil at home'],c:P.sys},
      {t:'GREEN POINTS',v:'R$22,703',d:['spent in shops inside','the neighbourhood'],c:P.oil},
      {t:'EDUCATION',v:'R$22,703',d:['the Faetequinho','preparatory course'],c:'#6B4FA0'}
    ];
    r.cols=[]; r.flows=[];
    for(i=0;i<4;i++){
      var cx=270+i*440;
      var icon=[
        /* catador */ g(null,[e('circle',{cx:0,cy:-14,r:13,fill:'#FFFFFF'}),e('path',{d:'M0,2 v26 M-14,42 l14,-14 l14,14 M-16,10 h32',stroke:'#FFFFFF','stroke-width':6,fill:'none','stroke-linecap':'round'})]),
        /* house */ g(null,[e('path',{d:'M-26,4 L0,-20 L26,4 z',fill:'#FFFFFF'}),e('rect',{x:-19,y:4,width:38,height:32,fill:'#FFFFFF'})]),
        /* shop */ g(null,[e('rect',{x:-26,y:-6,width:52,height:40,rx:3,fill:'#FFFFFF'}),e('path',{d:'M-30,-6 l8,-16 h44 l8,16 z',fill:'#FFFFFF',opacity:.75})]),
        /* book */ g(null,[e('path',{d:'M-26,-18 h22 a4,4 0 0 1 4,4 v40 a4,4 0 0 0 -4,-4 h-22 z',fill:'#FFFFFF'}),e('path',{d:'M26,-18 h-22 a4,4 0 0 0 -4,4 v40 a4,4 0 0 1 4,-4 h22 z',fill:'#FFFFFF',opacity:.8})])
      ][i];
      var n=g({opacity:0},[
        e('circle',{cx:cx,cy:558,r:52,fill:dest[i].c}),
        xf(icon,'translate('+cx+',556)'),
        tx(dest[i].t,{x:cx,y:648,size:21,f:'m',fill:P.muted,anchor:'middle',ls:'.12em'}),
        tx(dest[i].v,{x:cx,y:694,size:38,f:'d',w:800,fill:dest[i].c,anchor:'middle',ls:'-.02em'}),
        txl(dest[i].d,{x:cx,y:728,size:21,f:'b',fill:P.muted,anchor:'middle',lh:28})
      ]);
      r.cols.push(n); s.appendChild(n);
      var sx=r.segs[i].x+r.segs[i].w/2;
      var fa=E.gArrow({d:'M'+sx+',458 C'+sx+',490 '+cx+',480 '+cx+',498',c:dest[i].c,w:4});
      r.flows.push(fa); s.appendChild(fa);
    }

    r.fae=E.gChip({x:1120,y:786,t:'FAETEQUINHO · 13,737 L · 278 STUDENTS, FREE (2014–2022)',
      fill:'#6B4FA0',stroke:'#6B4FA0',bg:'#EFE9F6',size:19,h:48});
    s.appendChild(r.fae);
    r.note=E.gChip({x:96,y:786,t:'PAID IN REAIS — COLLECTORS NEED SPENDABLE CASH',fill:P.money,stroke:P.money,bg:P.moneyPale,size:19,h:48});
    s.appendChild(r.note);
  },
  update:function(t){
    var r=this.r,i;
    op(r.amt,pr(t,.3,1.3));
    var starts=[1.6,6.6,11.2,14.0];
    for(i=0;i<4;i++){
      var p=ep(t,starts[i],starts[i]+1.1,eo);
      set(r.segs[i].n,{width:r.segs[i].w*p});
      op(r.segTx[i],pr(t,starts[i]+.7,starts[i]+1.3));
      var q=pr(t,starts[i]+.5,starts[i]+1.6);
      draw(r.flows[i].r.path,ep(t,starts[i]+.6,starts[i]+1.4));
      op(r.cols[i],q);
      xf(r.cols[i],'translate(0,'+mix(18,0,eo(q))+')');
    }
    op(r.note,pr(t,8.2,9.0));
    op(r.fae,pr(t,20.0,21.0));
  }
});

/* ---------------------------------------------------------- STEP 6 */
E.scene({
  id:'step6', chapter:'Step 6 · Learn', dur:30, step:6,
  eyebrow:'Step 6 of 6', title:'Every scan makes the next round cheaper',
  cues:[
    [0.4,4.6,'Step six. All of those scans are data, and the data feeds back.'],
    [5.2,5.4,'The system forecasts how much oil each zone will produce next month,'],
    [10.8,5.6,'redraws the routes so collectors walk less and carry more,'],
    [16.6,5.8,'and flags the shops that are about to drop out, before they do.'],
    [22.6,6.6,'Two dashboards share what it sees: one for the city, one for buyers looking for verified supply.']
  ],
  build:function(s){
    var r=this.r={},i,j;
    r.plat=g({transform:'translate(380,232)'},[
      e('rect',{x:0,y:0,width:1160,height:88,rx:14,fill:P.sys}),
      tx('ECOCYCLE PLATFORM',{x:28,y:52,size:22,f:'m',fill:'#9FD3CE',ls:'.16em'}),
      tx('every scan since day one',{x:1132,y:52,size:22,f:'b',fill:'#DCEEEB',anchor:'end'})
    ]);
    s.appendChild(r.plat);
    r.feed=E.gArrow({d:'M960,320 V368',c:P.sys,w:5});
    s.appendChild(r.feed);

    /* three modules */
    var mods=[
      {t:'FORECAST',s:'how much oil, by zone, next month'},
      {t:'ROUTES',s:'the shortest walk that collects the most'},
      {t:'RETENTION',s:'who is about to stop handing oil over'}
    ];
    r.mods=[];
    for(i=0;i<3;i++){
      var x=96+i*592;
      var card=g({opacity:0,transform:'translate('+x+',384)'},[
        e('rect',{x:0,y:0,width:544,height:330,rx:14,fill:P.paper,stroke:P.line,'stroke-width':2.5}),
        e('rect',{x:0,y:0,width:544,height:6,rx:3,fill:P.sys2}),
        tx(mods[i].t,{x:26,y:52,size:23,f:'m',fill:P.sys,ls:'.14em'}),
        tx(mods[i].s,{x:26,y:84,size:21,f:'b',fill:P.muted})
      ]);
      r.mods.push(card); s.appendChild(card);
    }

    /* module 1: bar forecast */
    r.bars=[]; r.barsG=g(null,[]);
    for(i=0;i<6;i++){
      var b=e('rect',{x:40+i*80,y:250,width:52,height:0,rx:4,fill:i===5?'none':P.sys2,
        stroke:i===5?P.oil:'none','stroke-width':i===5?3:0,'stroke-dasharray':i===5?'8 7':null});
      r.bars.push(b); r.barsG.appendChild(b);
    }
    var mon=['MAR','APR','MAY','JUN','JUL','AUG'];
    for(i=0;i<6;i++) r.barsG.appendChild(tx(mon[i],{x:66+i*80,y:278,size:16,f:'m',fill:P.muted,anchor:'middle',ls:'.04em'}));
    r.fcast=tx('predicted',{x:466,y:86,size:19,f:'m',fill:P.oilDeep,anchor:'middle',opacity:0});
    r.barsG.appendChild(r.fcast);
    r.mods[0].appendChild(r.barsG);

    /* module 2: routes */
    r.pts=[[70,180],[150,140],[240,196],[330,132],[410,190],[470,146],[190,236],[350,240]];
    var mg=g(null,[]);
    for(i=0;i<r.pts.length;i++) mg.appendChild(e('circle',{cx:r.pts[i][0],cy:r.pts[i][1],r:7,fill:P.muted}));
    r.rBad=e('path',{d:'M70,180 L330,132 L190,236 L470,146 L240,196 L350,240 L150,140 L410,190',
      fill:'none',stroke:P.risk,'stroke-width':4,'stroke-linejoin':'round'});
    r.rGood=e('path',{d:'M70,180 L150,140 L240,196 L190,236 L350,240 L410,190 L470,146 L330,132',
      fill:'none',stroke:P.money,'stroke-width':4,'stroke-linejoin':'round'});
    mg.appendChild(r.rBad); mg.appendChild(r.rGood);
    r.rChip=E.gChip({x:300,y:274,t:'−31% DISTANCE',fill:P.money,stroke:P.money,bg:P.moneyPale,size:18,h:40});
    op(r.rChip,0); mg.appendChild(r.rChip);
    r.mods[1].appendChild(mg);

    /* module 3: retention list */
    var rows=[['JA-014','handing over weekly','ok'],['JA-021','handing over weekly','ok'],
              ['JA-033','2 missed pickups','warn'],['JA-108','handing over weekly','ok']];
    r.rows=[];
    for(i=0;i<4;i++){
      var col=rows[i][2]==='warn'?P.oil:P.money;
      var row=g({opacity:0,transform:'translate(26,'+(118+i*42)+')'},[
        e('rect',{x:0,y:0,width:492,height:38,rx:8,fill:rows[i][2]==='warn'?'#FBEFD9':'#FFFFFF',stroke:rows[i][2]==='warn'?P.oil:P.line,'stroke-width':2}),
        e('circle',{cx:22,cy:19,r:7,fill:col}),
        tx(rows[i][0],{x:44,y:26,size:19,f:'m',fill:P.ink}),
        tx(rows[i][1],{x:170,y:26,size:19,f:'b',fill:P.muted})
      ]);
      r.rows.push(row); r.mods[2].appendChild(row);
    }
    r.visit=E.gChip({x:26,y:288,t:'SEND A VISIT BEFORE THEY DROP OUT',fill:P.oilDeep,stroke:P.oil,bg:'#FBEFD9',size:17,h:38});
    op(r.visit,0); r.mods[2].appendChild(r.visit);

    /* dashboards */
    r.dash=[];
    var dtitle=[['FOR THE CITY','where oil is generated, street by street'],['FOR BUYERS','verified volume available, right now']];
    for(i=0;i<2;i++){
      var dx=96+i*916;
      var d=g({opacity:0,transform:'translate('+dx+',742)'},[
        e('rect',{x:0,y:0,width:812,height:112,rx:12,fill:'#FFFFFF',stroke:P.line,'stroke-width':2.5}),
        tx(dtitle[i][0],{x:24,y:44,size:20,f:'m',fill:P.sys,ls:'.14em'}),
        tx(dtitle[i][1],{x:24,y:78,size:22,f:'b',fill:P.muted})
      ]);
      if(i===0){
        var heat=g({transform:'translate(520,26)'},[]);
        for(j=0;j<24;j++){
          var v=rnd(j*3.7);
          heat.appendChild(e('rect',{x:(j%8)*32,y:Math.floor(j/8)*20,width:28,height:16,rx:3,
            fill:E.hexmix('#DCE6DF',P.oil,v)}));
        }
        d.appendChild(heat);
      } else {
        d.appendChild(tx('480 L',{x:788,y:56,size:40,f:'d',w:800,fill:P.oilDeep,anchor:'end'}));
        d.appendChild(tx('verified · ready to ship',{x:788,y:84,size:19,f:'m',fill:P.muted,anchor:'end'}));
      }
      r.dash.push(d); s.appendChild(d);
    }

    r.loop=g({opacity:0},[
      e('circle',{cx:1476,cy:234,r:26,fill:P.oil}),
      e('path',{d:'M1466,226 a12,12 0 1 1 -3,10',stroke:'#FFFFFF','stroke-width':4,fill:'none','stroke-linecap':'round'}),
      e('path',{d:'M1462,214 l4,12 l-12,2',stroke:'#FFFFFF','stroke-width':4,fill:'none','stroke-linecap':'round','stroke-linejoin':'round'})
    ]);
    s.appendChild(r.loop);
    r.loopLbl=tx('…and the next collection round starts smarter',{x:1540,y:360,size:22,f:'b',fill:P.oilDeep,anchor:'end',opacity:0});
    s.appendChild(r.loopLbl);
  },
  update:function(t){
    var r=this.r,i;
    op(r.plat,pr(t,.2,1.0));
    draw(r.feed.r.path,ep(t,1.0,1.8));
    var act=[ [4.6,10.4],[10.4,16.4],[16.4,22.4] ];
    for(i=0;i<3;i++){
      var app=pr(t,3.8+i*5.8,4.6+i*5.8);
      var live=t>=act[i][0]-0.4;
      op(r.mods[i],app*(live?1:.55));
      set(r.mods[i].childNodes[0],{stroke:(t>=act[i][0]&&t<act[i][1])?P.sys2:P.line,'stroke-width':(t>=act[i][0]&&t<act[i][1])?3.5:2.5});
    }
    /* forecast bars */
    var hv=[92,118,104,132,126,150];
    for(i=0;i<6;i++){
      var p=ep(t,4.6+i*.34,5.4+i*.34);
      set(r.bars[i],{height:hv[i]*p,y:250-hv[i]*p});
    }
    op(r.fcast,pr(t,7.4,8.2));
    /* routes */
    draw(r.rBad,ep(t,10.6,12.0));
    op(r.rBad,fade(t,10.6,11.0,13.0,13.8));
    draw(r.rGood,ep(t,13.4,14.8));
    op(r.rChip,pr(t,14.8,15.6));
    /* retention */
    for(i=0;i<4;i++) op(r.rows[i],pr(t,16.6+i*.3,17.2+i*.3));
    op(r.visit,pr(t,19.6,20.4));
    /* dashboards */
    for(i=0;i<2;i++){
      var dp=pr(t,22.8+i*.6,23.8+i*.6);
      op(r.dash[i],dp); xf(r.dash[i],'translate('+(96+i*916)+','+mix(762,742,eo(dp))+')');
    }
    /* loop */
    var lp=pr(t,26.0,27.0);
    op(r.loop,lp); xf(r.loop,'rotate('+(360*ep(t,26.2,27.6))+',1476,234)');
    op(r.loopLbl,pr(t,26.6,27.6));
  }
});

})();
