// news-image-20261118 — a program that writes one image to /output/entry.png.
//
// The entry is a single 1024x1024 page, "The Day in Four Acts": the forty
// stories of Wednesday 18 November 2026 laid out as four horizontal time
// bands (Overnight, Morning, Afternoon, Evening) on cream paper in deep
// teal, coral and amber. The page was composed offline (flat PIL-drawn
// motifs, PIL-rendered text) and is stored beside this file as entry.png.
//
// This program only copies those bytes to the grader's output directory,
// so two runs write identical output.
//
// Node 22, standard library only. Outside the grader's container,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
}

function placeImage(outDir: string): number {
  if (!existsSync(source)) {
    throw new Error('entry.png is missing beside main.ts');
  }
  const head = readFileSync(source).subarray(0, PNG_MAGIC.length);
  if (!head.equals(PNG_MAGIC)) {
    throw new Error('entry.png is not a PNG file');
  }
  const target = join(outDir, 'entry.png');
  copyFileSync(source, target);
  return statSync(target).size;
}

const outDir = resolveOutputDir();
mkdirSync(outDir, { recursive: true });
const bytes = placeImage(outDir);
console.log(`wrote entry.png (${bytes} bytes) to ${outDir}`);
