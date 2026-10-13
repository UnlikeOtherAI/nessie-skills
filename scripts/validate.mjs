import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { readdir } from 'node:fs/promises';
import { bundleFiles, localLinks, relativePath, safeLocation, textFile, visibleText } from './catalog-files.mjs';

const hashPattern = /^[a-f0-9]{64}$/u;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const categories = new Set([
  'Everyday work and planning', 'Brand and audience', 'SEO, websites and content',
  'Social media and video', 'Email marketing', 'Campaigns, advertising and partnerships',
  'Reporting and launches', 'Engineering',
]);

function fail(condition, message) {
  if (!condition) throw new Error(message);
}

function object(value, label, required, optional = []) {
  fail(value !== null && typeof value === 'object' && !Array.isArray(value), `${label}: expected object`);
  const allowed = new Set([...required, ...optional]);
  fail(required.every((key) => Object.hasOwn(value, key)), `${label}: missing required property`);
  fail(Object.keys(value).every((key) => allowed.has(key)), `${label}: unknown property`);
}

function string(value, label, limit = 1000) {
  fail(typeof value === 'string' && value.trim().length > 0 && value.length <= limit, `${label}: invalid string`);
  visibleText(value, label);
}

function list(value, label, limit = 50) {
  fail(Array.isArray(value) && value.length > 0 && value.length <= limit, `${label}: invalid nonempty list`);
  fail(new Set(value).size === value.length, `${label}: duplicate value`);
}

function hashes(value, paths, label) {
  fail(value !== null && typeof value === 'object' && !Array.isArray(value), `${label}: expected hash record`);
  fail(Object.keys(value).length === paths.length && paths.every((path) => Object.hasOwn(value, path)), `${label}: incomplete path coverage`);
  for (const [path, hash] of Object.entries(value)) {
    relativePath(path);
    fail(typeof hash === 'string' && hashPattern.test(hash), `${label}: invalid SHA-256`);
  }
}

async function validateSource(root, source, documents, label) {
  if (source === null) return;
  object(source, label, ['repository', 'commit', 'paths', 'authors', 'license', 'notices', 'changes'], ['sourceHashes', 'adaptedHashes']);
  string(source.repository, `${label}.repository`);
  const url = new URL(source.repository);
  fail(url.protocol === 'https:' && !url.username && !url.password && !url.search && !url.hash, `${label}: repository must be nonsecret HTTPS`);
  fail(typeof source.commit === 'string' && /^[a-f0-9]{40}$/u.test(source.commit), `${label}: commit must be a full SHA`);
  list(source.paths, `${label}.paths`);
  source.paths.forEach(relativePath);
  list(source.authors, `${label}.authors`);
  source.authors.forEach((author) => string(author, `${label}.author`, 200));
  fail(source.license === 'MIT' || source.license === 'Apache-2.0', `${label}: unsupported license`);
  string(source.changes, `${label}.changes`, 2500);
  list(source.notices, `${label}.notices`);
  for (const path of source.notices) await textFile(root, path, 65536, false);
  if (source.sourceHashes !== undefined) hashes(source.sourceHashes, source.paths, `${label}.sourceHashes`);
  if (source.adaptedHashes !== undefined) {
    hashes(source.adaptedHashes, documents.map((item) => item.path), `${label}.adaptedHashes`);
    for (const item of documents) fail(source.adaptedHashes[item.path] === item.sha256, `${label}: adapted hash mismatch`);
  }
}

async function validateSkill(root, skill, seenSlugs) {
  object(skill, 'skill', ['slug', 'name', 'description', 'category', 'origin', 'source', 'documents']);
  fail(typeof skill.slug === 'string' && skill.slug.length <= 80 && slugPattern.test(skill.slug), 'skill: invalid slug');
  fail(!seenSlugs.has(skill.slug), `Duplicate slug: ${skill.slug}`);
  seenSlugs.add(skill.slug);
  string(skill.name, `${skill.slug}.name`, 150);
  string(skill.description, `${skill.slug}.description`, 600);
  fail(categories.has(skill.category), `${skill.slug}: unknown initial category`);
  fail(skill.origin === 'community' || skill.origin === 'nessie', `${skill.slug}: invalid origin`);
  fail(skill.origin !== 'nessie' || skill.source === null, `${skill.slug}: derived material cannot claim Nessie authorship`);
  fail(skill.origin !== 'community' || skill.source !== null, `${skill.slug}: community source is required`);
  list(skill.documents, `${skill.slug}.documents`, 20);
  const paths = new Set();
  const files = new Set();
  const contents = [];
  let bytes = 0;
  for (const document of skill.documents) {
    object(document, `${skill.slug}.document`, ['path', 'file', 'sha256']);
    relativePath(document.path);
    fail(document.path.endsWith('.md'), `${skill.slug}: only Markdown instruction files are supported`);
    fail(!paths.has(document.path.toLowerCase()), `${skill.slug}: duplicate canonical document path`);
    paths.add(document.path.toLowerCase());
    const file = `skills/${skill.slug}/${document.path}`;
    fail(document.file === file, `${skill.slug}: document file must remain inside its bundle`);
    fail(typeof document.sha256 === 'string' && hashPattern.test(document.sha256), `${skill.slug}: invalid document hash`);
    const content = await textFile(root, file, 18000);
    fail(digest(content.bytes) === document.sha256, `${file}: hash mismatch`);
    bytes += content.bytes.length;
    contents.push({ path: document.path, content: content.value });
    files.add(file);
  }
  fail(skill.documents.some((item) => item.path === 'SKILL.md'), `${skill.slug}: SKILL.md is required`);
  fail(bytes <= 18000, `${skill.slug}: bundle exceeds 18000 instruction bytes`);
  // This includes all manifest strings and complete local instructions. The product
  // still measures its own final serialized Jev envelope, including review questions.
  const combined = Buffer.byteLength(JSON.stringify({ ...skill, contents }), 'utf8');
  fail(combined <= 18000, `${skill.slug}: combined metadata and instructions exceed 18000 bytes`);
  for (const content of contents) {
    for (const link of localLinks(content.content, content.path)) {
      fail(skill.documents.some((item) => item.path === link), `${skill.slug}: unresolved local reference ${link}`);
    }
  }
  const actual = await bundleFiles(root, `skills/${skill.slug}`);
  fail(actual.length === files.size && actual.every((file) => files.has(file)), `${skill.slug}: unlisted bundle file`);
  await validateSource(root, skill.source, skill.documents, `${skill.slug}.source`);
  if (skill.source?.license === 'Apache-2.0') {
    for (const content of contents) fail(content.content.includes('Modified for Nessie.'), `${skill.slug}: modification notice missing`);
  }
  return { slug: skill.slug, bytes, combined };
}

async function validateLicenses(root, catalog) {
  const { value } = await textFile(root, 'license-index.json', 262144);
  const index = JSON.parse(value);
  object(index, 'license index', ['schemaVersion', 'default', 'skills']);
  fail(index.schemaVersion === 1, 'Unsupported license index version');
  object(index.default, 'default license', ['license', 'authors', 'notice']);
  fail(index.default.license === 'MIT', 'Default license must be MIT');
  list(index.default.authors, 'default authors');
  index.default.authors.forEach((author) => string(author, 'default author', 200));
  await textFile(root, index.default.notice, 65536, false);
  fail(Array.isArray(index.skills) && index.skills.length === catalog.skills.length, 'License index must cover every skill');
  const seen = new Set();
  for (const row of index.skills) {
    object(row, 'license row', ['slug', 'license', 'authors', 'adaptedBy', 'notices']);
    fail(!seen.has(row.slug), 'Duplicate license index slug');
    seen.add(row.slug);
    const skill = catalog.skills.find((item) => item.slug === row.slug);
    fail(skill !== undefined, 'Unknown license index slug');
    const expectedLicense = skill.source?.license ?? index.default.license;
    const expectedAuthors = skill.source?.authors ?? index.default.authors;
    fail(row.license === expectedLicense && JSON.stringify(row.authors) === JSON.stringify(expectedAuthors), `${row.slug}: license/author mismatch`);
    string(row.adaptedBy, 'adapter', 200);
    list(row.notices, 'license notices');
    for (const path of row.notices) await textFile(root, path, 65536, false);
    if (skill.source !== null) fail(JSON.stringify(row.notices) === JSON.stringify(skill.source.notices), `${row.slug}: notice mismatch`);
  }
}

export async function validateCatalog(root) {
  const { value } = await textFile(root, 'catalog.json', 524288);
  const catalog = JSON.parse(value);
  object(catalog, 'catalog', ['schemaVersion', 'skills', 'apps']);
  fail(catalog.schemaVersion === 1, 'Unsupported catalog version');
  fail(Array.isArray(catalog.skills) && catalog.skills.length > 0 && catalog.skills.length <= 1000, 'Invalid skills list');
  fail(Array.isArray(catalog.apps) && catalog.apps.length === 0, 'App import is not supported by schema version 1');
  const seen = new Set();
  const results = [];
  for (const skill of catalog.skills) results.push(await validateSkill(root, skill, seen));
  const directory = await safeLocation(root, 'skills');
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    fail(entry.isDirectory() && seen.has(entry.name), `Unlisted or unsupported skill entry: ${entry.name}`);
  }
  await validateLicenses(root, catalog);
  return { skills: results.length, apps: 0, largest: results.reduce((a, b) => a.combined > b.combined ? a : b) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const result = await validateCatalog(resolve(process.argv[2] ?? '.'));
    process.stdout.write(`Validated ${result.skills} skill bundles and ${result.apps} app manifests. Largest combined bundle: ${result.largest.slug}, ${result.largest.combined} bytes.\n`);
  } catch (error) {
    process.stderr.write(`Catalog validation failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}
