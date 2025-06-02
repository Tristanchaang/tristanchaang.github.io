import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fsPromises = fs.promises;

const languages = ['my', 'zh', 'hk', 'fr', 'jp', 'en'];
const compiledDir = path.join(__dirname, 'compiled');

// Helper to copy a folder recursively
async function copyDir(src, dest) {
    await fsPromises.mkdir(dest, { recursive: true });
    const entries = await fsPromises.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await fsPromises.copyFile(srcPath, destPath);
        }
    }
}

// Helper to remove tags with unwanted lang attributes from HTML files
async function cleanHtmlFiles(folder, keepLang) {
    const files = await fsPromises.readdir(folder, { withFileTypes: true });
    for (const file of files) {
        const filePath = path.join(folder, file.name);
        if (file.isDirectory()) {
            await cleanHtmlFiles(filePath, keepLang);
        } else if (file.name.endsWith('.html')) {
            let content = await fsPromises.readFile(filePath, 'utf8');
            // Remove tags with lang attribute for other languages
            for (const lang of languages) {
                if (lang !== keepLang) {
                    // Remove opening and closing tags with lang="lang"
                    const regex = new RegExp(`<([a-zA-Z0-9]+)[^>]*lang=["']${lang}["'][^>]*>[\\s\\S]*?<\\/\\1>`, 'gi');
                    content = content.replace(regex, '');
                }
            }
            await fsPromises.writeFile(filePath, content, 'utf8');
        }
    }
}

async function main() {
    // 1. Copy /compiled into each language folder
    for (const lang of languages) {
        const destDir = path.join(__dirname, lang);
        await copyDir(compiledDir, destDir);
        await cleanHtmlFiles(destDir, lang);
    }
    // 2. Copy /en into root
    const enDir = path.join(__dirname, 'en');
    await copyDir(enDir, __dirname);
}

main().catch(console.error);


