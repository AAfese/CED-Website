import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';
const width = process.argv[4] ? parseInt(process.argv[4], 10) : 1440;
const height = process.argv[5] ? parseInt(process.argv[5], 10) : 900;

const outDir = join(process.cwd(), 'temporary screenshots');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

// Auto-increment screenshot-N so we never overwrite.
let n = 1;
const existing = readdirSync(outDir).filter((f) => /^screenshot-\d+/.test(f));
for (const f of existing) {
  const m = /^screenshot-(\d+)/.exec(f);
  if (m) n = Math.max(n, parseInt(m[1], 10) + 1);
}
const outPath = join(outDir, `screenshot-${n}${label}.png`);

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
// Force scroll-reveal elements visible so full-page capture isn't blank.
await page.evaluate(() => {
  document.querySelectorAll('.reveal').forEach((el) => {
    el.classList.add('in');
    el.style.transitionDelay = '0ms';
  });
});
// Give fonts/video a moment to settle.
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
console.log(`Saved ${outPath}`);
