// scripts/convert-obsidian.mjs
import { readdir, readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const WRITEUPS_DIR = 'src/content/writeups';

// Convierte "Pasted image 20261002010618.png" → "Pasted-image-20261002010618.png"
function sanitizeFilename(name) {
  return name.replace(/\s+/g, '-');
}

async function processWriteupFolder(folderPath, folderName) {
  console.log(`\n📁 Procesando: ${folderName}`);
  const entries = await readdir(folderPath, { withFileTypes: true });

  // 1. Encontrar el .md principal
  const mdFile = entries.find(e => e.isFile() && extname(e.name) === '.md');
  if (!mdFile) {
    console.log(`   ⚠️  No hay .md en ${folderName}, saltando...`);
    return;
  }

  // 2. Renombrar el .md a index.md si no lo es
  const mdPath = join(folderPath, mdFile.name);
  const indexPath = join(folderPath, 'index.md');
  if (mdFile.name !== 'index.md') {
    await rename(mdPath, indexPath);
    console.log(`   ✅ Renombrado: ${mdFile.name} → index.md`);
  }

  // 3. Leer el contenido
  let content = await readFile(indexPath, 'utf-8');

  // 4. Detectar todas las imágenes referenciadas
  const obsidianImgRegex = /!\[\[([^\]]+\.(png|jpg|jpeg|gif|webp|svg))\]\]/gi;
  const matches = [...content.matchAll(obsidianImgRegex)];

  if (matches.length === 0) {
    console.log(`   ℹ️  Sin imágenes Obsidian en este writeup`);
    return;
  }

  console.log(`   🔍 Encontradas ${matches.length} imágenes`);

  // 5. Asegurar que existe la carpeta Images
  const imagesDir = join(folderPath, 'Images');
  if (!existsSync(imagesDir)) {
    await mkdir(imagesDir, { recursive: true });
  }

  // 6. Renombrar archivos con espacios en la carpeta Images
  const imageFiles = await readdir(imagesDir);
  const renamedFiles = new Map();
  for (const file of imageFiles) {
    const sanitized = sanitizeFilename(file);
    if (file !== sanitized) {
      await rename(join(imagesDir, file), join(imagesDir, sanitized));
      renamedFiles.set(file, sanitized);
      console.log(`   🖼️  ${file} → ${sanitized}`);
    }
  }

  // 7. Reemplazar sintaxis Obsidian por Markdown estándar
  content = content.replace(obsidianImgRegex, (match, filename) => {
    // Buscar el archivo real (puede estar ya renombrado)
    const sanitized = sanitizeFilename(filename);
    const finalName = renamedFiles.get(filename) || sanitized;
    // URL-encode por si queda algún carácter raro (paréntesis, etc.)
    const encoded = encodeURIComponent(finalName);
    return `![${finalName}](./Images/${encoded})`;
  });

  await writeFile(indexPath, content, 'utf-8');
  console.log(`   ✅ Sintaxis convertida`);
}

async function main() {
  console.log('🚀 Convirtiendo writeups de Obsidian a Markdown estándar...\n');

  if (!existsSync(WRITEUPS_DIR)) {
    console.error(`❌ No existe la carpeta ${WRITEUPS_DIR}`);
    process.exit(1);
  }

  const folders = await readdir(WRITEUPS_DIR, { withFileTypes: true });
  for (const folder of folders) {
    if (folder.isDirectory()) {
      await processWriteupFolder(join(WRITEUPS_DIR, folder.name), folder.name);
    }
  }

  console.log('\n✨ ¡Listo! Revisa los archivos por si acaso antes de commitear.');
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});