import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

async function generatePDF() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('Navigating to slides...');
  await page.goto('http://localhost:5173/slides/ai-state-2026', {
    waitUntil: 'networkidle0'
  });
  
  // Wait for Reveal.js to initialize
  await page.waitForTimeout(2000);
  
  console.log('Generating PDF...');
  
  // Create public directory if it doesn't exist
  const publicDir = join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  await page.pdf({
    path: join(publicDir, 'ai-state-2026.pdf'),
    width: '1920px',
    height: '1080px',
    printBackground: true,
    pageRanges: '1-'
  });
  
  await browser.close();
  
  console.log('PDF generated: public/ai-state-2026.pdf');
}

generatePDF().catch(console.error);
