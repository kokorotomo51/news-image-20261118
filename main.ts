// news-image-20261118 — a program that writes one image to /output/entry.png.
//
// The entry is a single front page summing up Wednesday 18 November 2026,
// composed offline (generated scene pictures + PIL-rendered text) and stored
// beside this file as entry.png. This program only copies those bytes to the
// grader's output directory, so both runs write identical output.
//
// Node 22, standard library only. Outside the grader's container,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
if (!existsSync(source)) {
  throw new Error('entry.png is missing beside main.ts');
}
const target = join(outDir, 'entry.png');
copyFileSync(source, target);
const { size } = statSync(target);
console.log(`wrote entry.png (${size} bytes) to ${outDir}`);
