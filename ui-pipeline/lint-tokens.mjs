#!/usr/bin/env node
// Использование: node ui-pipeline/lint-tokens.mjs <файлы .tsx .jsx .css .html ...>
// Ищет значения в обход токенов Hela. Код возврата 1, если есть нарушения.
//
// Правила:
//  - hex / rgb() / hsl() / oklch() вне tokens*.css
//  - px вне токенов (кроме 0 и 1)
//  - произвольные значения Tailwind: p-[13px], bg-[#111], w-[390px]
//  - дробные шаги шкалы кроме 0.5 / 1.5 / 2.5: p-3.5, gap-4.5
//  - стандартная палитра Tailwind: bg-red-500, text-white, border-black
//  - 100vh / h-screen (в Telegram использовать min-h-app)
// Не считается нарушением: атрибут sizes="…" у next/image.
// Исключение: строка с комментарием `lint-ignore: <причина>` пропускается.
// Не проверяет: числовые значения в style={{ padding: 13 }} (смотреть глазами).

import { readFileSync, existsSync } from "node:fs";
import { basename } from "node:path";

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Укажи файлы: node ui-pipeline/lint-tokens.mjs app/page.tsx components/x.tsx");
  process.exit(2);
}

const ALLOWED_PX = new Set(["0", "1"]);
const SKIP_FILES = new Set(["tokens.css", "tokens-tailwind.css"]);
const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const COLOR_UTIL =
  "bg|text|border|ring|outline|divide|fill|stroke|from|via|to|shadow|decoration|accent|caret|placeholder";
const SPACING_UTIL = "(?:-?[mp][trblxyse]?|gap(?:-[xy])?|space-[xy])";

// Порядок важен: найденное «блокируется» (заменяется пробелами), чтобы не считать дважды.
const rules = [
  {
    name: "произвольное значение Tailwind",
    hint: "возьми токен из таблицы в UI_RULES.md",
    re: /(?<![\w\]-])(?:[\w-]+:)*-?[a-z][\w-]*-\[[^\]\s]+\](?!:)/g,
  },
  {
    name: "стандартная палитра Tailwind",
    hint: "используй bg-surface-*, text-fg-*, bg-action-*, border-line-*",
    re: new RegExp(
      `(?<![\\w-])(?:${COLOR_UTIL})-(?:(?:${PALETTE})-\\d{2,3}|white|black)(?![\\w-])`,
      "g",
    ),
  },
  {
    name: "дробный шаг шкалы",
    hint: "разрешены только 0.5, 1.5, 2.5",
    re: new RegExp(`(?<![\\w-])${SPACING_UTIL}-(\\d+\\.5)(?![\\w.])`, "g"),
    skip: (m) => ["0.5", "1.5", "2.5"].includes(m[1]),
  },
  {
    name: "100vh / h-screen",
    hint: "высота экрана: min-h-app (учитывает Telegram)",
    re: /(?<![\w-])(?:min-|max-)?h-screen(?![\w-])|\b100vh\b/g,
  },
  { name: "hex-цвет", hint: "токен цвета", re: /(?<![&\w])#[0-9a-fA-F]{3,8}\b/g },
  { name: "rgb/hsl/oklch-цвет", hint: "токен цвета", re: /\b(?:rgba?|hsla?|oklch|oklab)\(/g },
  {
    name: "px вне токенов",
    hint: "шкала отступов/размеров или токен",
    re: /(?<![\w-])(-?\d*\.?\d+)px\b/g,
    skip: (m) => ALLOWED_PX.has(m[1]),
  },
];

let total = 0;

for (const file of files) {
  if (!existsSync(file)) {
    console.error(`Нет файла: ${file}`);
    process.exit(2);
  }
  if (SKIP_FILES.has(basename(file))) continue;

  const lines = readFileSync(file, "utf8").split("\n");
  let inComment = false;

  lines.forEach((line, i) => {
    if (/lint-ignore:\s*\S/.test(line)) return;
    let text = line;
    if (inComment) {
      const end = text.indexOf("*/");
      if (end === -1) return;
      text = text.slice(end + 2);
      inComment = false;
    }
    text = text.replace(/\/\*.*?\*\//g, "");
    const open = text.indexOf("/*");
    if (open !== -1) {
      text = text.slice(0, open);
      inComment = true;
    }
    text = text.replace(/(^|[^:])\/\/.*$/, "$1"); // // комментарии, но не https://
    text = text.replace(/var\(--[\w-]+(?:,[^)]*)?\)/g, ""); // значения через var(--token)
    if (/<meta\s+name=["']viewport/i.test(text)) return;
    text = text.replace(/\bsizes=(?:"[^"]*"|\{[^}]*\})/g, ""); // next/image sizes: подсказка загрузки, не стиль
    text = text.replace(/@media[^{]*/g, "").replace(/@container[^{]*/g, "");

    for (const rule of rules) {
      rule.re.lastIndex = 0;
      let m;
      const hits = [];
      while ((m = rule.re.exec(text))) {
        if (rule.skip && rule.skip(m)) continue;
        hits.push(m);
      }
      for (const h of hits) {
        total++;
        console.log(`${file}:${i + 1}  ${rule.name}  →  ${h[0]}   (${rule.hint})`);
        text = text.slice(0, h.index) + " ".repeat(h[0].length) + text.slice(h.index + h[0].length);
      }
    }
  });
}

if (total) {
  console.log(`\nНарушений: ${total}. Замени значения на токены (ui-pipeline/UI_RULES.md, раздел 3).`);
  process.exit(1);
}
console.log("Нарушений нет.");
