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
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const XLSX_PATH = resolve(__dirname, 'data/kodifikator.xlsx');

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

// Inspect structure
console.log('Sheet:', sheetName);
console.log('Total data rows:', rows.length);

// Category distribution helps design the settlement filter in the next step
const catCounts = {};
for (const row of rows) {
  const key = row.category || '(none)';
  catCounts[key] = (catCounts[key] || 0) + 1;
}
console.log('\nCategory distribution:');
console.table(catCounts);

console.log(
  '\nSample oblast row:',
  rows.find(r => r.category === 'O')
);
console.log(
  'Sample settlement (level 4):',
  rows.find(r => r.level4)
);
