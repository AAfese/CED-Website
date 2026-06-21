// One-off helper: transcode the QuickTime .mov into web-standard MP4 (+ WebM).
// Run: node convert-video.mjs   (safe to delete afterward)
import ffmpegPath from 'ffmpeg-static';
import { spawnSync } from 'node:child_process';
import { statSync } from 'node:fs';

const SRC = 'Updated Video.mov';
const OUT = 'feature';

function run(label, args) {
  console.log(`\n=== ${label} ===`);
  const res = spawnSync(ffmpegPath, args, { stdio: 'inherit' });
  if (res.status !== 0) {
    console.error(`${label} failed (exit ${res.status})`);
    process.exit(res.status || 1);
  }
}

// MP4 — H.264 High / yuv420p, downscaled to 1600w, faststart, no audio (muted autoplay band).
run(`${OUT}.mp4`, [
  '-y', '-i', SRC,
  '-an',
  '-vf', 'scale=1600:-2',
  '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
  '-crf', '23', '-preset', 'veryfast',
  '-movflags', '+faststart',
  `${OUT}.mp4`,
]);

// WebM — VP9, no audio. Open-format companion source.
run(`${OUT}.webm`, [
  '-y', '-i', SRC,
  '-an',
  '-vf', 'scale=1600:-2',
  '-c:v', 'libvpx-vp9', '-crf', '34', '-b:v', '0',
  '-row-mt', '1', '-deadline', 'good', '-cpu-used', '4',
  `${OUT}.webm`,
]);

const mb = (f) => (statSync(f).size / 1048576).toFixed(2);
console.log(`\nDone. Sizes — source: ${mb(SRC)}MB  ${OUT}.mp4: ${mb(`${OUT}.mp4`)}MB  ${OUT}.webm: ${mb(`${OUT}.webm`)}MB`);
