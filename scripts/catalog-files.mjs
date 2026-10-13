import { lstat, readdir, readFile, realpath } from 'node:fs/promises';
import { resolve, join, sep } from 'node:path';

export function relativePath(value) {
  if (typeof value !== 'string' || value.length < 1 || value.length > 240 ||
      /[\\:%?#\u0000-\u0020\u007f]/u.test(value) || value.startsWith('/')) {
    throw new Error(`Unsafe relative path: ${String(value)}`);
  }
  visibleText(value, 'path');
  for (const part of value.split('/')) {
    if (!part || part === '.' || part === '..' || /[. ]$/u.test(part) ||
        /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(?:\.|$)/iu.test(part)) {
      throw new Error(`Unsafe path component: ${value}`);
    }
  }
  return value;
}

export function visibleText(value, label) {
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u200b\u200e\u200f\u202a-\u202e\u2060-\u206f\ufeff]/u.test(value)) {
    throw new Error(`${label}: control or invisible formatting character`);
  }
  if (/<!--|<\s*(?:script|style|iframe|object|embed|base)\b|\b(?:hidden|aria-hidden)\s*=|display\s*:\s*none|visibility\s*:\s*hidden/iu.test(value)) {
    throw new Error(`${label}: hidden or active markup is unsupported`);
  }
}

export async function safeLocation(root, path) {
  relativePath(path);
  const absoluteRoot = await realpath(root);
  const target = resolve(absoluteRoot, ...path.split('/'));
  if (!target.startsWith(absoluteRoot + sep)) throw new Error(`Path escapes root: ${path}`);
  let current = absoluteRoot;
  for (const part of path.split('/')) {
    current = join(current, part);
    const info = await lstat(current);
    if (info.isSymbolicLink()) throw new Error(`Symlinks are unsupported: ${path}`);
  }
  return target;
}

export async function textFile(root, path, limit = 65536, inspect = true) {
  const target = await safeLocation(root, path);
  const info = await lstat(target);
  if (!info.isFile() || info.size > limit || info.size === 0) {
    throw new Error(`${path}: expected a nonempty regular file of at most ${limit} bytes`);
  }
  if ((info.mode & 0o111) !== 0) throw new Error(`${path}: executable file mode is unsupported`);
  const bytes = await readFile(target);
  const value = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  if (inspect) visibleText(value, path);
  return { bytes, value };
}

export async function bundleFiles(root, directory) {
  const target = await safeLocation(root, directory);
  const result = [];
  async function visit(location, prefix) {
    for (const entry of await readdir(location, { withFileTypes: true })) {
      const path = `${prefix}/${entry.name}`;
      relativePath(path);
      if (entry.isSymbolicLink()) throw new Error(`Symlinks are unsupported: ${path}`);
      if (entry.isDirectory()) await visit(join(location, entry.name), path);
      else if (entry.isFile()) result.push(path);
      else throw new Error(`Unsupported filesystem entry: ${path}`);
    }
  }
  await visit(target, directory);
  return result.sort();
}

export function localLinks(text, documentPath) {
  const links = [];
  const pattern = /!?\[[^\]\n]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+"[^"]*")?\s*\)/gu;
  for (const match of text.matchAll(pattern)) {
    const target = match[1] ?? match[2];
    if (target.startsWith('#')) continue;
    if (/^https?:\/\//iu.test(target)) {
      const url = new URL(target);
      if (url.username || url.password) throw new Error(`${documentPath}: credential-bearing URL`);
      continue; // Whether this is evidence or an instruction loader requires semantic review.
    }
    if (/^[a-z][a-z0-9+.-]*:/iu.test(target) || target.startsWith('//')) {
      throw new Error(`${documentPath}: unsupported link scheme`);
    }
    const path = target.split('#')[0];
    relativePath(path);
    const parent = documentPath.includes('/') ? documentPath.slice(0, documentPath.lastIndexOf('/') + 1) : '';
    links.push(parent + path);
  }
  // Reference-style links have the same structural resolution requirement.
  for (const match of text.matchAll(/^\s*\[[^\]]+\]:\s*(\S+)/gmu)) {
    links.push(...localLinks(`[reference](${match[1]})`, documentPath));
  }
  return links;
}
