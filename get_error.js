import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });

  try {
    const response = await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    if (!response.ok()) {
      console.log('Response not OK:', response.status());
    }
  } catch (e) {
    console.log('Goto failed:', e.message);
  }

  await browser.close();
})();
