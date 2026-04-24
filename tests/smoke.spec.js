import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─────────────────────────────────────────────────────────────
// Test 1 — Home page loads without errors
// ─────────────────────────────────────────────────────────────
test('Home page loads without console errors', async ({ page }) => {
  const consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore React DevTools extension warnings and favicon 404s
      if (
        text.includes('Download the React DevTools') ||
        text.includes('favicon') ||
        text.includes('net::ERR_') && text.includes('favicon')
      ) return;
      consoleErrors.push(text);
    }
  });

  const response = await page.goto('/');
  expect(response.status()).toBe(200);

  // Wait for page to settle
  await page.waitForLoadState('networkidle');

  if (consoleErrors.length > 0) {
    console.log('Console errors found:', consoleErrors);
  }
  expect(consoleErrors, `Console errors: ${consoleErrors.join('\n')}`).toHaveLength(0);
});

// ─────────────────────────────────────────────────────────────
// Test 2 — All MVP sections are present and visible
// ─────────────────────────────────────────────────────────────
test('All MVP sections are present and visible', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Sections: try data-testid first, fall back to heading/role
  const sections = [
    {
      name: 'Hero',
      selectors: ['[data-testid="hero"]', 'section#hero', '[data-section="hero"]'],
      headingPattern: /abhijeet|portfolio|designer|product/i,
    },
    {
      name: 'ScrollReveal',
      selectors: ['[data-testid="scroll-reveal"]', '[data-section="scroll-reveal"]'],
      headingPattern: null, // structural component, no heading expected
    },
    {
      name: 'About',
      selectors: ['[data-testid="about"]', 'section#about', '[data-section="about"]'],
      headingPattern: /about/i,
    },
    {
      name: 'FeaturedProject',
      selectors: ['[data-testid="featured-project"]', '[data-section="featured-project"]'],
      headingPattern: /featured|case study|project/i,
    },
    {
      name: 'SelectedProjects',
      selectors: ['[data-testid="selected-projects"]', '[data-section="selected-projects"]'],
      headingPattern: /selected|projects|work/i,
    },
    {
      name: 'DecisionLog',
      selectors: ['[data-testid="decision-log"]', '[data-section="decision-log"]'],
      headingPattern: /decision|log/i,
    },
    {
      name: 'MetricMarvels',
      selectors: ['[data-testid="metric-marvels"]', '[data-section="metric-marvels"]'],
      headingPattern: /metric|marvel|number|impact/i,
    },
    {
      name: 'Writing',
      selectors: ['[data-testid="writing"]', 'section#writing', '[data-section="writing"]'],
      headingPattern: /writing|articles|blog/i,
    },
    {
      name: 'Footer',
      selectors: ['[data-testid="footer"]', 'footer', '[data-section="footer"]'],
      headingPattern: null,
    },
  ];

  const missing = [];
  const found = [];

  for (const section of sections) {
    let located = false;

    // Try explicit selectors
    for (const sel of section.selectors) {
      const el = page.locator(sel).first();
      if ((await el.count()) > 0 && (await el.isVisible())) {
        found.push(`${section.name} (selector: ${sel})`);
        located = true;
        break;
      }
    }

    // Fall back to heading text match
    if (!located && section.headingPattern) {
      const headings = page.locator('h1, h2, h3, h4, h5, h6, p');
      const count = await headings.count();
      for (let i = 0; i < count; i++) {
        const el = headings.nth(i);
        const text = await el.textContent().catch(() => '');
        if (section.headingPattern.test(text) && (await el.isVisible())) {
          found.push(`${section.name} (heading text: "${text.trim().slice(0, 60)}")`);
          located = true;
          break;
        }
      }
    }

    if (!located) {
      missing.push(section.name);
    }
  }

  console.log('\nSections found:', found.join('\n  '));
  if (missing.length > 0) {
    console.log('Sections MISSING:', missing.join(', '));
  }

  expect(missing, `Missing sections: ${missing.join(', ')}`).toHaveLength(0);
});

// ─────────────────────────────────────────────────────────────
// Test 3 — No horizontal overflow on mobile
// ─────────────────────────────────────────────────────────────
test('No horizontal overflow on mobile', async ({ page, isMobile }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  console.log(`scrollWidth=${overflow.scrollWidth}, clientWidth=${overflow.clientWidth}`);

  expect(
    overflow.scrollWidth,
    `Horizontal overflow detected: scrollWidth (${overflow.scrollWidth}) > clientWidth (${overflow.clientWidth})`
  ).toBeLessThanOrEqual(overflow.clientWidth);
});

// ─────────────────────────────────────────────────────────────
// Test 4 — No broken images
// ─────────────────────────────────────────────────────────────
test('No broken images', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const brokenImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .filter((img) => !img.naturalWidth || img.naturalWidth === 0)
      .map((img) => ({ src: img.src, alt: img.alt }));
  });

  const allImages = await page.evaluate(() =>
    Array.from(document.querySelectorAll('img')).map((img) => ({
      src: img.src,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
    }))
  );

  console.log(`\nTotal images found: ${allImages.length}`);
  allImages.forEach((img) =>
    console.log(`  [${img.naturalWidth > 0 ? 'OK' : 'BROKEN'}] ${img.src} (alt: "${img.alt}")`)
  );

  if (brokenImages.length > 0) {
    console.log('Broken images:', brokenImages);
  }

  expect(brokenImages, `Broken images: ${JSON.stringify(brokenImages)}`).toHaveLength(0);
});

// ─────────────────────────────────────────────────────────────
// Test 5 — /story route loads
// ─────────────────────────────────────────────────────────────
test('/story route loads with content', async ({ page }) => {
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (text.includes('Download the React DevTools') || text.includes('favicon')) return;
      consoleErrors.push(text);
    }
  });

  const response = await page.goto('/story');
  expect(response.status()).toBe(200);

  await page.waitForLoadState('networkidle');

  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log(`\n/story body text length: ${bodyText.length} chars`);

  if (consoleErrors.length > 0) console.log('Console errors:', consoleErrors);

  expect(consoleErrors, `Console errors on /story: ${consoleErrors.join('\n')}`).toHaveLength(0);
  expect(bodyText.length, '/story page has too little content').toBeGreaterThan(500);
});

// ─────────────────────────────────────────────────────────────
// Test 6 — All external links have valid hrefs
// ─────────────────────────────────────────────────────────────
test('All external links have valid hrefs', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const externalLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[target="_blank"]')).map((a) => ({
      href: a.href,
      text: a.textContent?.trim().slice(0, 60),
      rel: a.rel,
    }))
  );

  console.log(`\nExternal links found (${externalLinks.length}):`);
  externalLinks.forEach((link) =>
    console.log(`  [${link.text}] ${link.href}  rel="${link.rel}"`)
  );

  const invalid = externalLinks.filter(
    (link) => !link.href || !link.href.startsWith('http')
  );

  if (invalid.length > 0) {
    console.log('Invalid external links:', invalid);
  }

  expect(invalid, `Invalid external link hrefs: ${JSON.stringify(invalid)}`).toHaveLength(0);
});

// ─────────────────────────────────────────────────────────────
// Test 7 — Full-page screenshots on both viewports
// ─────────────────────────────────────────────────────────────
test('Full-page screenshot', async ({ page, browserName }, testInfo) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Scroll to trigger any lazy-loaded content
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  const viewport = page.viewportSize();
  const isDesktop = viewport && viewport.width >= 1024;
  const filename = isDesktop ? 'desktop-home.png' : 'mobile-home.png';
  const screenshotPath = path.join(__dirname, 'screenshots', filename);

  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`\nScreenshot saved: ${screenshotPath}`);

  // Attach to test report for easy review
  await testInfo.attach(filename, { path: screenshotPath, contentType: 'image/png' });
});
