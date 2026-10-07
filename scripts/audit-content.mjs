import fs from 'node:fs/promises';
import { opportunities } from '../src/data/opportunities.ts';
import { categories } from '../src/data/categories.ts';
import { quizQuestions } from '../src/data/quiz.ts';
const file = process.argv[2];
if (!file)
  throw new Error(
    'Provide the fully extracted content PDF text path: node scripts/audit-content.mjs <source.txt>',
  );
const normalize = (s) =>
  s
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '');
const source = normalize(await fs.readFile(file, 'utf8'));
const linkSource = JSON.parse(await fs.readFile('docs/source-hyperlinks.json', 'utf8'));
const failures = [];
const rows = opportunities.map((item) => {
  const results = Object.fromEntries(
    ['name', 'description', 'timing', 'note'].map((key) => [
      key,
      source.includes(normalize(item[key])),
    ]),
  );
  for (const [key, match] of Object.entries(results))
    if (!match) failures.push(`${item.id}: ${key}`);
  if (
    item.officialUrl &&
    !linkSource.links.some((link) => link.uri === item.officialUrl && link.page === item.sourcePage)
  )
    failures.push(`${item.id}: URL provenance`);
  for (const resource of item.extraLinks ?? [])
    if (resource.url && !linkSource.links.some((link) => link.uri === resource.url))
      failures.push(`${item.id}: extra URL provenance`);
  return {
    ...results,
    id: item.id,
    name: item.name,
    sourcePage: item.sourcePage,
    url: item.officialUrl,
  };
});
const questions = quizQuestions.map((q) => ({
  id: q.id,
  question: source.includes(normalize(q.question)),
  answers: q.options.map((a) => source.includes(normalize(a.label))),
}));
for (const category of categories)
  for (const resource of category.resources ?? [])
    if (resource.url && !linkSource.links.some((link) => link.uri === resource.url))
      failures.push(`${category.id}: resource URL provenance`);
for (const q of questions)
  if (!q.question || q.answers.includes(false)) failures.push(`quiz ${q.id}`);
const report = {
  source: file,
  opportunityCount: opportunities.length,
  categoryCounts: Object.fromEntries(
    categories.map((c) => [c.id, opportunities.filter((o) => o.category === c.id).length]),
  ),
  officialLinks: opportunities.filter((o) => o.officialUrl).length,
  missingUrls: opportunities.filter((o) => !o.officialUrl).map((o) => o.id),
  opportunities: rows,
  questions,
  failures,
};
await fs.mkdir('docs', { recursive: true });
await fs.writeFile('docs/content-audit.json', JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      opportunities: report.opportunityCount,
      categories: report.categoryCounts,
      questions: questions.length,
      answers: questions.reduce((n, q) => n + q.answers.length, 0),
      missingUrls: report.missingUrls,
      failures,
    },
    null,
    2,
  ),
);
if (failures.length) process.exitCode = 1;
