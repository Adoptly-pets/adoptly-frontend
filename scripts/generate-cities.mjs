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
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const XLSX_PATH = resolve(__dirname, 'data/kodifikator.xlsx');
const REGIONS_PATH = resolve(__dirname, '../src/constants/regions.json');
const CITIES_DIR = resolve(__dirname, '../src/constants/cities');

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
    hromadaCode: row.level3,
  });
}

// District/hromada codes → display names. KATOTTG stores hromada as adjective
// only (sometimes with trailing space, e.g. "Табачненська "); append "громада".
const districtNameByCode = {};
const hromadaNameByCode = {};
for (const row of rows) {
  if (row.category === 'P') {
    districtNameByCode[row.level2] = row.name;
  } else if (row.category === 'H') {
    hromadaNameByCode[row.level3] = `${row.name.trim()} громада`;
  }
}

const dropped = [];
for (const [slug, items] of Object.entries(citiesByRegion)) {
  const seen = new Set();
  const unique = [];
  for (const item of items) {
    const key = `${item.uk}|${item.hromadaCode}`;
    if (seen.has(key)) {
      dropped.push({ region: slug, name: item.uk });
      continue;
    }
    seen.add(key);
    unique.push(item);
  }
  citiesByRegion[slug] = unique;
}

if (dropped.length > 0) {
  const byRegion = {};
  for (const d of dropped) {
    byRegion[d.region] = (byRegion[d.region] || 0) + 1;
  }
  console.warn(
    `\nDropped ${dropped.length} same-name settlements within one hromada:`
  );
  console.table(byRegion);
}

// Ukrainian collator ensures "и" ≠ "і" and "ґ" ≠ "г" sort correctly.
const collator = new Intl.Collator('uk');

mkdirSync(CITIES_DIR, { recursive: true });

let totalWritten = 0;
const perRegionCounts = {};

for (const [slug, items] of Object.entries(citiesByRegion)) {
  // Group items by uk name — all duplicates need suffixes.
  const groups = {};
  for (const item of items) {
    (groups[item.uk] ||= []).push(item);
  }

  const labels = [];
  for (const [name, group] of Object.entries(groups)) {
    if (group.length === 1) {
      labels.push(name);
      continue;
    }

    // Try hromada name only; escalate to hromada + district if display names clash.
    const hromadaLabels = group.map(
      item => `${name} (${hromadaNameByCode[item.hromadaCode]})`
    );
    if (new Set(hromadaLabels).size === group.length) {
      labels.push(...hromadaLabels);
      continue;
    }

    const fullLabels = group.map(
      item =>
        `${name} (${hromadaNameByCode[item.hromadaCode]}, ${districtNameByCode[item.districtCode]} р-н)`
    );
    labels.push(...fullLabels);
  }

  labels.sort((a, b) => collator.compare(a, b));

  const filePath = resolve(CITIES_DIR, `${slug}.json`);
  writeFileSync(filePath, JSON.stringify(labels, null, 2) + '\n');

  perRegionCounts[slug] = labels.length;
  totalWritten += labels.length;
}

console.log('Cities per region:');
console.table(perRegionCounts);
console.log('\nTotal settlements written:', totalWritten);
console.log('Files written to:', CITIES_DIR);
