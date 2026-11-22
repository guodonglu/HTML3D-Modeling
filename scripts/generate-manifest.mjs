import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const REPO_OWNER = 'guodonglu';
const REPO_NAME = 'HTML3D-Modeling';
const BRANCH = 'main';

const files = fs.readdirSync(rootDir);
const htmlFiles = files.filter(f => f.endsWith('.html') && f.toLowerCase() !== 'index.html');

// Read existing models.json if present to preserve custom metadata
let existingManifest = {};
const manifestPath = path.join(rootDir, 'models.json');
if (fs.existsSync(manifestPath)) {
  try {
    existingManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (e) {}
}

const existingMap = new Map((existingManifest.models || []).map(m => [m.filename, m]));

const models = htmlFiles.map((filename) => {
  const filePath = path.join(rootDir, filename);
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract <title>
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  const parsedTitle = titleMatch ? titleMatch[1].trim() : filename.replace(/\.html$/i, '');

  // Extract meta description
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  let parsedDesc = descMatch ? descMatch[1].trim() : '';

  // Fallback to subtitle or headings in content
  if (!parsedDesc) {
    const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    const pMatch = content.match(/<p[^>]*>([^<]+)<\/p>/i);
    if (pMatch) parsedDesc = pMatch[1].trim();
    else if (h1Match) parsedDesc = h1Match[1].trim();
    else parsedDesc = '3D 结构交互建模与动态仿真';
  }

  const existing = existingMap.get(filename) || {};
  const id = filename.replace(/\.html$/i, '').toLowerCase().replace(/[^a-z0-9-_]/g, '-');

  return {
    id: existing.id || id,
    filename,
    title: existing.title || parsedTitle,
    subtitle: existing.subtitle || '',
    category: existing.category || '3D建模',
    tags: existing.tags || ['Three.js', 'WebGL', '3D结构'],
    description: existing.description || parsedDesc,
    path: filename,
    previewUrl: `https://${REPO_OWNER}.github.io/${REPO_NAME}/${filename}`,
    rawUrl: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${filename}`,
    author: existing.author || REPO_OWNER,
    createdAt: existing.createdAt || new Date().toISOString().split('T')[0]
  };
});

const manifest = {
  name: 'HTML3d建模',
  repo: `${REPO_OWNER}/${REPO_NAME}`,
  branch: BRANCH,
  updatedAt: new Date().toISOString(),
  pagesBaseUrl: `https://${REPO_OWNER}.github.io/${REPO_NAME}/`,
  rawBaseUrl: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/`,
  total: models.length,
  models
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`✓ Generated models.json with ${models.length} 3D model(s).`);
