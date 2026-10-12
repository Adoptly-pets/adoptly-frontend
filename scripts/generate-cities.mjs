/**
 * KATOTTG settlements → src/constants/cities/<slug>.json
 *
 * KATOTTG edition: 2026-07-07
 * Source: https://mininfra.gov.ua/diialnist/
 *         rozvytok-mistsevoho-samovriaduvannia/
 *         kodyfikator-administratyvno-terytorialnykh-odynyts-ta-terytorii-terytorialnykh-hromad
 *
 * Usage:
 *   1. Place the KATOTTG XLSX at scripts/data/kodifikator.xlsx
 *   2. Run: npm run generate:cities
 */

import XLSX from 'xlsx';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const XLSX_PATH = resolve(__dirname, 'data/kodifikator.xlsx');
const REGIONS_PATH = resolve(__dirname, '../src/constants/regions.json');

const regions = JSON.parse(readFileSync(REGIONS_PATH, 'utf8'));

// regions.json uses the short name "АР Крим"; KATOTTG uses the full form.
const KATOTTG_TO_REGION_UK = {
  'Автономна Республіка Крим': 'АР Крим',
};

const regionSlug = r => r.en.toLowerCase().replace(/\s+/g, '-');
const regionByUk = Object.fromEntries(regions.map(r => [r.uk, r]));

const workbook = XLSX.readFile(XLSX_PATH);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
// Row 0 is an approval notice ("ЗАТВЕРДЖЕНО наказом..."), row 1 is empty, row 2
// is the title ("Кодифікатор..."), row 3 is the Ukrainian header (Перший
// рівень, ..., Категорія, Назва). Data starts at row 4. Supply explicit English
// column names so downstream code reads cleanly.
const rows = XLSX.utils.sheet_to_json(sheet, {
  range: 4,
  header: ['level1', 'level2', 'level3', 'level4', 'extra', 'category', 'name'],
  defval: null,
});

// Map oblast code → region slug from O + K rows.
const codeToSlug = {};
for (const row of rows) {
  if (row.category !== 'O' && row.category !== 'K') continue;
  const ukName = KATOTTG_TO_REGION_UK[row.name] || row.name;
  const region = regionByUk[ukName];
  if (!region) {
    throw new Error(`No region.json entry for KATOTTG name "${row.name}"`);
  }
  codeToSlug[row.level1] = regionSlug(region);
}

// K regions (Kyiv, Sevastopol) are shown as themselves only — don't include any
// M/X/C rows that live under them.
const specialCityCodes = new Set(
  rows.filter(r => r.category === 'K').map(r => r.level1)
);

const SETTLEMENT_CATEGORIES = new Set(['M', 'X', 'C']);

// Group settlements by region slug.
const citiesByRegion = {};
for (const row of rows) {
  const slug = codeToSlug[row.level1];
  if (!slug) continue;

  if (row.category === 'K') {
    if (!citiesByRegion[slug]) {
      citiesByRegion[slug] = [];
    }
    citiesByRegion[slug].push({ uk: row.name });
    continue;
  }

  if (!SETTLEMENT_CATEGORIES.has(row.category)) continue;
  if (specialCityCodes.has(row.level1)) continue;

  if (!citiesByRegion[slug]) {
    citiesByRegion[slug] = [];
  }
  citiesByRegion[slug].push({
    uk: row.name,
    districtCode: row.level2,
  });
}

console.log('Cities per region:');
console.table(
  Object.fromEntries(
    Object.entries(citiesByRegion).map(([slug, items]) => [slug, items.length])
  )
);
console.log(
  '\nTotal settlements:',
  Object.values(citiesByRegion).reduce((sum, arr) => sum + arr.length, 0)
);
