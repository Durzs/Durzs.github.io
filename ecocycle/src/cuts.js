/* ============================================================
   CUTS — three edits of the same fourteen scenes.

   An entry plays a window [from, to] of a scene's own timeline,
   mapped onto `dur` seconds of the cut. Narration is written per
   cut, so a shorter edit is re-scripted rather than merely clipped.
   ============================================================ */
(function(){
var E=window.__EC;

E.CUTS=[

/* ---------------------------------------------------------- FULL */
{ id:'full', label:'Full', note:'the whole explanation' },   /* entries filled in by the player */

/* ---------------------------------------------------------- 3-MINUTE PITCH */
{ id:'pitch3', label:'Pitch', note:'for a 3-minute slot', entries:[

 {id:'title', from:0.2, to:6.4, dur:5, cues:[
   [1.5,3.0,'How EcoCycle collects used cooking oil.']]},

 {id:'drain', from:0.3, to:23, dur:16, cues:[
   [0.3,5.0,'Thousands of small kitchens in the Pavuna–Meriti basin fry food every day.'],
   [5.6,4.8,'Nobody buys the used oil, so it goes down the drain.'],
   [10.8,4.6,'One litre can contaminate up to <b>25,000 litres</b> of water.'],
   [15.6,0.3,'']]},

 {id:'flood', from:1.5, to:14, dur:9, cues:[
   [0.2,4.2,'Inside the pipes it hardens into a <u>fatberg</u>, and the drain blocks.'],
   [4.8,3.9,'<u>13,000</u> unblocking operations a year. The same streets flood every season.']]},

 {id:'gap', from:0.5, to:18.5, dur:15, cues:[
   [0.3,5.2,'The catadores who work these streets live on cardboard, at <b>R$0.15–0.40 a kilo</b>.'],
   [5.9,4.8,'The oil going past them sells for <b>R$0.80–2.50 a litre</b>.'],
   [11.1,3.6,'Demand for it grew over 700% in a decade. None of it reaches them.']]},

 {id:'idea', from:0.8, to:18.6, dur:12, cues:[
   [0.4,4.4,'The workers exist. The buyers exist.'],
   [5.2,6.2,'What is missing is the layer in between — one that collects the oil and <i>proves</i> what it is.']]},

 {id:'step1', from:0.2, to:21, dur:12, cues:[
   [0.3,5.4,"One. A shop registers at the residents' association and gets a PET bottle with its own code."],
   [6.1,5.4,'Nothing to buy, nothing to pay. Households can join too, for <s>Green Points</s>.']]},

 {id:'step2', from:0.2, to:26, dur:18, cues:[
   [0.3,5.2,'Two. A catador from the local cooperative collects at the door, and scans the code.'],
   [5.9,5.8,'One scan records four things: how much, from where, when, and who collected it.'],
   [12.3,5.2,'The oil stops being anonymous waste. It has a history.']]},

 {id:'step3', from:0.2, to:26.5, dur:17, cues:[
   [0.3,5.4,'Three. Everything is pooled at a neighbourhood hub, and tested for water and dirt.'],
   [6.1,5.4,'The batch only ships if the total matches the sum of every scan.'],
   [12.1,4.6,'Twenty-four small pickups become one verified, contract-grade batch.']]},

 {id:'step4', from:0.2, to:22.5, dur:14, cues:[
   [0.3,5.4,'Four. The batch is sold under contract — to several processors, never just one.'],
   [6.1,7.4,'PROVE depended on a single refinery. When it shut down in 2026, the collected oil had nowhere to go.']]},

 {id:'step5', from:0.2, to:27, dur:17, cues:[
   [0.3,4.6,'Five. The money comes back by a rule fixed in advance.'],
   [5.2,5.8,'<s>40%</s> to the catadores who collected it; 20% to households; 20% as Green Points in local shops;'],
   [11.4,5.2,'and 20% to the Faetequinho course, which already trades free classes for used oil.']]},

 {id:'step6', from:0.2, to:28.5, dur:17, cues:[
   [0.3,4.6,'Six. Every scan teaches the system.'],
   [5.1,5.6,'It forecasts volume by zone, shortens the routes, and flags the shops about to drop out.'],
   [11.1,5.4,'Two dashboards: one for the city, one for buyers looking for verified supply.']]},

 {id:'recap', from:0.2, to:18, dur:9, cues:[
   [0.3,8.2,'Kitchen. Scan. Hub. Contract. Payment. And data that makes the next round cheaper.']]},

 {id:'results', from:0.2, to:18, dur:12, cues:[
   [0.3,4.8,'The Jardim América pilot: <b>75,678 litres</b> recovered a year.'],
   [5.5,6.0,'R$113,517 of revenue against R$105,000 of cost — and R$1.27 of social value per R$1 invested.']]},

 {id:'close', from:0.2, to:10, dur:7, cues:[
   [0.3,2.9,'Same oil. A different path.'],
   [3.5,3.2,'EcoCycle — a collection system for the last mile.']]}
]},

/* ---------------------------------------------------------- 1-MINUTE SHORT */
{ id:'short1', label:'Short', note:'the 60-second version', entries:[

 {id:'title', from:0.6, to:6.4, dur:2, cues:[]},

 {id:'drain', from:2.0, to:22, dur:6, cues:[
   [0.15,5.5,'Used cooking oil goes down the drain, hardens in the pipes and blocks them.']]},

 {id:'flood', from:2.0, to:12, dur:4, cues:[
   [0.1,3.7,'Blocked pipes flood the same low-income streets, every season.']]},

 {id:'gap', from:1.0, to:18, dur:6, cues:[
   [0.1,5.7,'That oil is worth several times the cardboard catadores live on — and none of it reaches them.']]},

 {id:'step2', from:5.0, to:24, dur:8, cues:[
   [0.1,3.7,"A catador collects it at the door and scans the bottle's code:"],
   [4.0,3.8,'how much, from where, when, who.']]},

 {id:'step3', from:8.0, to:26, dur:6, cues:[
   [0.1,5.7,'Pickups are pooled and verified at a neighbourhood hub — one contract-grade batch.']]},

 {id:'step4', from:0.2, to:7.0, dur:5, cues:[
   [0.1,4.7,'Sold under contract to several processors, never just one.']]},

 {id:'step5', from:1.2, to:17, dur:7, cues:[
   [0.1,6.6,'<s>40%</s> of the revenue goes to the catadores; the rest to households, local shops and a school course.']]},

 {id:'step6', from:4.0, to:24, dur:6, cues:[
   [0.1,5.7,'Every scan sharpens the next round: forecasts, routes, retention.']]},

 {id:'results', from:0.2, to:17, dur:7, cues:[
   [0.1,2.9,'<b>75,678 litres</b> recovered a year.'],
   [3.2,3.6,'The pilot pays for itself — R$1.27 of social value per R$1.']]},

 {id:'close', from:0.2, to:9, dur:5, cues:[
   [0.2,4.5,'EcoCycle — a collection system for the last mile.']]}
]}

];
})();
