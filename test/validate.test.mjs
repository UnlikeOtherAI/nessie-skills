import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, writeFile, rm, symlink } from 'node:fs/promises';
import { resolve, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateCatalog } from '../scripts/validate.mjs';
import { relativePath } from '../scripts/catalog-files.mjs';

const repository = resolve(fileURLToPath(new URL('..', import.meta.url)));
const fixtureParent = join(repository, '.review-source');
const hash = (value) => createHash('sha256').update(value).digest('hex');

async function fixture(run) {
  await mkdir(fixtureParent, { recursive: true });
  const root = await mkdtemp(join(fixtureParent, 'validation-'));
  const body = '# Example\n\nCompare supplied facts and explain what remains unknown.\n';
  const catalog = { schemaVersion: 1, skills: [{
    slug: 'example', name: 'Example', description: 'A synthetic validation fixture.',
    category: 'Everyday work and planning', origin: 'nessie', source: null,
    documents: [{ path: 'SKILL.md', file: 'skills/example/SKILL.md', sha256: hash(body) }],
  }], apps: [] };
  const license = { schemaVersion: 1, default: { license: 'MIT', authors: ['Fixture Author'], notice: 'LICENSE' },
    skills: [{ slug: 'example', license: 'MIT', authors: ['Fixture Author'], adaptedBy: 'Fixture Author', notices: ['LICENSE'] }] };
  await mkdir(join(root, 'skills/example'), { recursive: true });
  await writeFile(join(root, 'skills/example/SKILL.md'), body);
  await writeFile(join(root, 'LICENSE'), 'Synthetic license notice for tests.\n');
  const save = async () => {
    await writeFile(join(root, 'catalog.json'), JSON.stringify(catalog));
    await writeFile(join(root, 'license-index.json'), JSON.stringify(license));
  };
  const document = async (value) => {
    await writeFile(join(root, 'skills/example/SKILL.md'), value);
    catalog.skills[0].documents[0].sha256 = hash(value);
  };
  await save();
  try { await run({ root, catalog, license, save, document }); }
  finally {
    assert.ok(root.startsWith(fixtureParent + sep) && root !== fixtureParent);
    await rm(root, { recursive: true, force: true });
  }
}

test('all 56 current candidates and legal notices validate', async () => {
  const result = await validateCatalog(repository);
  assert.equal(result.skills, 56);
  assert.equal(result.apps, 0);
  assert.ok(result.largest.combined < 18000);
});

test('synthetic evaluation data covers every candidate without claiming execution', async () => {
  const catalog = JSON.parse(await readFile(join(repository, 'catalog.json'), 'utf8'));
  const evaluation = JSON.parse(await readFile(join(repository, 'evals/workflow-cases.json'), 'utf8'));
  assert.equal(evaluation.schemaVersion, 1);
  assert.equal(evaluation.executionStatus, 'not_run');
  assert.equal(evaluation.cases.length, catalog.skills.length);
  assert.deepEqual(new Set(evaluation.cases.map((item) => item.slug)), new Set(catalog.skills.map((item) => item.slug)));
  for (const item of evaluation.cases) {
    assert.equal(typeof item.request, 'string');
    assert.ok(item.request.length > 0);
    assert.equal(typeof item.inputs, 'object');
    assert.ok(item.expectations.length >= 3);
    assert.ok(item.expectations.every((value) => typeof value === 'string' && value.length > 0));
  }
});

test('published JSON schema category and path rules describe the validator contract', async () => {
  const schema = JSON.parse(await readFile(join(repository, 'schema/catalog.schema.json'), 'utf8'));
  const catalog = JSON.parse(await readFile(join(repository, 'catalog.json'), 'utf8'));
  assert.equal(schema.properties.schemaVersion.const, catalog.schemaVersion);
  assert.equal(schema.properties.apps.maxItems, 0);
  assert.deepEqual(new Set(schema.$defs.skill.properties.category.enum), new Set(catalog.skills.map((item) => item.category)));
  const pathPattern = new RegExp(schema.$defs.path.pattern, 'u');
  assert.ok(pathPattern.test('references/example.md'));
  for (const path of ['/absolute', 'C:/absolute', 'references\\example.md', 'references/%2e%2e/file.md']) {
    assert.equal(pathPattern.test(path), false);
  }
});

test('valid original synthetic bundle validates', async () => fixture(async ({ root }) => {
  assert.equal((await validateCatalog(root)).skills, 1);
}));

for (const path of ['../outside.md', '/absolute.md', 'C:/outside.md', 'references\\file.md', 'references/%2e%2e/file.md',
  'references/./file.md', 'references//file.md', 'references/CON.md', 'references/file.md.', 'https://example.test/SKILL.md']) {
  test(`rejects unsafe path ${path}`, () => assert.throws(() => relativePath(path), /Unsafe/));
}

test('tampered document hash fails even when the filename is valid', async () => fixture(async ({ root }) => {
  await writeFile(join(root, 'skills/example/SKILL.md'), 'Changed body\n');
  await assert.rejects(validateCatalog(root), /hash mismatch/);
}));

test('a guessed remote file cannot become a local instruction dependency', async () => fixture(async ({ root, catalog, save }) => {
  catalog.skills[0].documents[0].file = 'https://example.test/remote/SKILL.md';
  await save();
  await assert.rejects(validateCatalog(root), /remain inside its bundle/);
}));

test('unknown fields cannot claim a security check or dependency authority', async () => fixture(async ({ root, catalog, save }) => {
  catalog.skills[0].checked = true;
  await save();
  await assert.rejects(validateCatalog(root), /unknown property/);
}));

test('all declared local Markdown references must resolve', async () => fixture(async ({ root, document, save }) => {
  await document('# Example\n\nRead [details](references/missing.md).\n');
  await save();
  await assert.rejects(validateCatalog(root), /unresolved local reference/);
}));

test('ordinary HTTPS evidence citations remain structurally allowed', async () => fixture(async ({ root, document, save }) => {
  await document('# Example\n\nCite [observed source](https://example.test/research).\n');
  await save();
  assert.equal((await validateCatalog(root)).skills, 1);
}));

test('declared references are checked and counted as part of the complete bundle', async () => fixture(async ({ root, catalog, document, save }) => {
  const reference = '## Evidence\n\nA synthetic observed result.\n';
  await mkdir(join(root, 'skills/example/references'));
  await writeFile(join(root, 'skills/example/references/evidence.md'), reference);
  catalog.skills[0].documents.push({ path: 'references/evidence.md', file: 'skills/example/references/evidence.md', sha256: hash(reference) });
  await document('# Example\n\nUse [evidence](references/evidence.md).\n');
  await save();
  assert.equal((await validateCatalog(root)).skills, 1);
  await writeFile(join(root, 'skills/example/references/evidence.md'), 'Tampered reference\n');
  await assert.rejects(validateCatalog(root), /hash mismatch/);
}));

test('unlisted executable assets in an instruction bundle fail', async () => fixture(async ({ root }) => {
  await writeFile(join(root, 'skills/example/install.sh'), 'echo forbidden fixture\n');
  await assert.rejects(validateCatalog(root), /unlisted bundle file/);
}));

test('invalid UTF-8 and binary instructions fail', async () => fixture(async ({ root, catalog, save }) => {
  const bytes = Buffer.from([0xff, 0xfe, 0x00]);
  await writeFile(join(root, 'skills/example/SKILL.md'), bytes);
  catalog.skills[0].documents[0].sha256 = hash(bytes);
  await save();
  await assert.rejects(validateCatalog(root), /encoded data|encoding/i);
}));

test('active or hidden markup and invisible metadata fail structurally', async () => {
  for (const value of ['# Example\n\n<!-- hidden -->\n', '# Example\n\n<script>1</script>\n', '# Example\n\ntext\u202ehidden\n']) {
    await fixture(async ({ root, document, save }) => {
      await document(value);
      await save();
      await assert.rejects(validateCatalog(root), /markup|invisible/);
    });
  }
  await fixture(async ({ root, catalog, save }) => {
    catalog.skills[0].description = 'Visible\u200bhidden';
    await save();
    await assert.rejects(validateCatalog(root), /invisible/);
  });
});

test('oversized combined bundles fail without truncation', async () => fixture(async ({ root, document, save }) => {
  await document('# Example\n\n' + 'Useful text. '.repeat(1600));
  await save();
  await assert.rejects(validateCatalog(root), /18000/);
}));

test('case aliases cannot duplicate a document identity', async () => fixture(async ({ root, catalog, save }) => {
  catalog.skills[0].documents.push({ ...catalog.skills[0].documents[0], path: 'skill.md', file: 'skills/example/skill.md' });
  await save();
  await assert.rejects(validateCatalog(root), /canonical document path/);
}));

test('license index drift blocks distribution', async () => fixture(async ({ root, license, save }) => {
  license.skills[0].license = 'Apache-2.0';
  await save();
  await assert.rejects(validateCatalog(root), /license\/author mismatch/);
}));

test('source and adapted hash records require complete exact-path coverage', async () => fixture(async ({ root, catalog, save }) => {
  const skill = catalog.skills[0];
  skill.origin = 'community';
  skill.source = { repository: 'https://github.com/example/source', commit: 'a'.repeat(40),
    paths: ['original/SKILL.md'], authors: ['Fixture Author'], license: 'MIT', notices: ['LICENSE'],
    changes: 'Synthetic adaptation.', sourceHashes: { 'original/SKILL.md': 'b'.repeat(64) },
    adaptedHashes: { 'SKILL.md': skill.documents[0].sha256 } };
  await save();
  assert.equal((await validateCatalog(root)).skills, 1);
  skill.source.sourceHashes = {};
  await save();
  await assert.rejects(validateCatalog(root), /incomplete path coverage/);
}));

test('symlinked bundle directories never allow reads outside the candidate', async () => fixture(async ({ root, catalog, save }) => {
  const outside = join(root, 'outside');
  await mkdir(outside);
  await writeFile(join(outside, 'SKILL.md'), '# Symlink fixture\n');
  const link = join(root, 'skills/link');
  await symlink(outside, link, process.platform === 'win32' ? 'junction' : 'dir');
  catalog.skills.push({ ...catalog.skills[0], slug: 'link', documents: [{ path: 'SKILL.md', file: 'skills/link/SKILL.md', sha256: hash('# Symlink fixture\n') }] });
  await save();
  await assert.rejects(validateCatalog(root), /Symlinks/);
}));

test('unsupported app entries cannot imply a completed public import path', async () => fixture(async ({ root, catalog, save }) => {
  catalog.apps.push({ slug: 'unverified' });
  await save();
  await assert.rejects(validateCatalog(root), /App import is not supported/);
}));
