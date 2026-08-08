const { chromium } = require('playwright');
const { spawn } = require('child_process');
const FPS = 30;
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const path = require('path');
const CUT = process.env.CUT || 'full';
const SUFFIX = {full:'', pitch3:'_3min', short1:'_1min'}[CUT] || ('_' + CUT);
const SRC = 'file://' + path.join(__dirname, '..', 'index.html') + '?capture=1&cut=' + CUT;
const OUT = path.join(__dirname, '..', 'EcoCycle_Collector_System' + SUFFIX + '.mp4');
(async () => {
  const b = await chromium.launch({args:['--force-color-profile=srgb','--font-render-hinting=none','--disable-lcd-text']});
  const p = await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  p.on('pageerror',e=>console.log('PAGEERROR',e.message));
  await p.goto(SRC);
  await p.waitForFunction('window.__ecReady===true',{timeout:30000});
  const dur = await p.evaluate('window.__ec.duration');
  const total = Math.floor(dur*FPS);
  console.log('rendering',total,'frames for',dur.toFixed(1),'s');
  const ff = spawn(FFMPEG,['-y','-f','image2pipe','-framerate',String(FPS),'-i','-',
    '-c:v','libx264','-preset','medium','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',OUT]);
  ff.stderr.on('data',()=>{});
  const t0=Date.now();
  for(let i=0;i<total;i++){
    await p.evaluate(t=>window.__ec.seek(t), i/FPS);
    const buf = await p.screenshot({type:'jpeg',quality:92});
    if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));
    if(i%300===0){
      const el=(Date.now()-t0)/1000;
      console.log(`${i}/${total}  ${(i/total*100).toFixed(1)}%  elapsed ${el.toFixed(0)}s  eta ${(el/Math.max(i,1)*(total-i)).toFixed(0)}s`);
    }
  }
  ff.stdin.end();
  await new Promise(r=>ff.on('close',r));
  await b.close();
  console.log('DONE');
})();
