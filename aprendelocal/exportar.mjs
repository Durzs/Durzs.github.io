/**
 * Exporta la intro cuadro a cuadro, con tiempos exactos, a 1920×1080 o 1080×1920.
 *
 * Grabar la pantalla pierde cuadros y depende de la máquina. Aquí cada cuadro
 * se calcula para su segundo exacto (window.AL.renderAt) y se fotografía.
 *
 *   node aprendelocal/exportar.mjs 16x9        (30 cuadros por segundo)
 *   node aprendelocal/exportar.mjs 9x16 25     (otro ritmo de cuadros)
 *
 * Necesita Playwright con Chromium y conexión para Google Fonts. Si ffmpeg
 * está instalado, arma además el MP4 (H.264, yuv420p) junto a los cuadros.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));
const formato = process.argv[2] === '9x16' ? '9x16' : '16x9';
const fps = Number(process.argv[3]) || 30;
const [W, H] = formato === '9x16' ? [1080, 1920] : [1920, 1080];
const carpeta = join(aqui, 'cuadros', formato);
mkdirSync(carpeta, { recursive: true });

const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await pagina.goto(`${pathToFileURL(join(aqui, 'intro.html')).href}?formato=${formato}&limpio=1`);
await pagina.waitForFunction(() => window.AL && window.AL.listo, null, { timeout: 60000 });

const familias = await pagina.evaluate(() => [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, '')));
for (const f of ['Archivo', 'Newsreader']) {
  if (!familias.includes(f)) console.warn(`Aviso: ${f} no cargó desde Google Fonts; los cuadros saldrán con la fuente de respaldo.`);
}

const duracion = await pagina.evaluate(() => window.AL.duracion);
const total = Math.round(duracion * fps);
for (let i = 0; i < total; i++) {
  await pagina.evaluate((t) => window.AL.renderAt(t), i / fps);
  await pagina.screenshot({ path: join(carpeta, `cuadro_${String(i).padStart(5, '0')}.png`) });
  if (i % fps === 0) process.stdout.write(`\r${i / fps} s de ${duracion} s`);
}
await navegador.close();
console.log(`\n${total} cuadros en ${carpeta}`);

const video = join(aqui, `aprendelocal_intro_${formato}.mp4`);
const ff = spawnSync('ffmpeg', ['-y', '-framerate', String(fps), '-i', join(carpeta, 'cuadro_%05d.png'),
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-movflags', '+faststart', video], { stdio: 'inherit' });
if (ff.error) console.log('ffmpeg no está instalado: quedan los cuadros PNG para armar el video en el editor.');
else if (ff.status === 0) console.log(`Video: ${video}`);
