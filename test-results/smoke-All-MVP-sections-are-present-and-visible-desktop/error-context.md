# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.js >> All MVP sections are present and visible
- Location: tests/smoke.spec.js:41:1

# Error details

```
Error: Missing sections: ScrollReveal, FeaturedProject, MetricMarvels, Writing, Footer

expect(received).toHaveLength(expected)

Expected length: 0
Received length: 5
Received array:  ["ScrollReveal", "FeaturedProject", "MetricMarvels", "Writing", "Footer"]
```

# Page snapshot

```yaml
- main [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]: AS
    - generic [ref=e6]:
      - link "About" [ref=e7] [cursor=pointer]:
        - /url: "#about"
      - link "Work" [ref=e8] [cursor=pointer]:
        - /url: "#work"
      - link "Decisions" [ref=e9] [cursor=pointer]:
        - /url: "#decisions"
      - link "Contact" [ref=e10] [cursor=pointer]:
        - /url: "#contact"
    - generic [ref=e11]: 22:39:57 IST
  - generic [ref=e12]:
    - img "Abhijeet Sant" [ref=e14]
    - generic [ref=e17]: Mumbai · India
    - generic [ref=e18]:
      - generic [ref=e19]: Product Manager
      - generic [ref=e20]: Abhijeet Sant
      - generic [ref=e21]:
        - text: Ambiguity in.
        - text: Clarity out.
        - text: Shipped.
      - generic [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e24]: 0→1 Builder
          - generic [ref=e25]: Systems Thinker
          - generic [ref=e26]: Data-led
        - generic [ref=e27]: Scroll
  - paragraph [ref=e30]:
    - generic [ref=e31]: I've been doing this work longer than I knew what to call it. Trade finance platforms in the Nordics, workforce intelligence in the US, now building from India — three geographies, one discipline. I document my thinking. I defend my calls. I build in public.
    - generic [ref=e32]: The work speaks. This portfolio is the transcript.
  - generic [ref=e33]:
    - img "Abhijeet Sant" [ref=e35]
    - generic [ref=e36]:
      - paragraph [ref=e37]:
        - text: I learned to think in systems, to understand users deeply, to take complexity and turn it into
        - strong [ref=e38]: decisions that move products forward.
        - text: The ceiling was not loud — it was the accumulation of small realizations that ownership would always be limited.
      - paragraph [ref=e39]:
        - text: Coming back was not the obvious move. But India was uncertain
        - strong [ref=e40]: in the way open doors are uncertain.
        - text: I want to shape something, not inherit it.
        - link "Read the full story →" [ref=e41] [cursor=pointer]:
          - /url: /story.html
      - generic [ref=e43]:
        - link "LinkedIn" [ref=e44] [cursor=pointer]:
          - /url: https://linkedin.com/in/abhijeetsant
          - img [ref=e45]
        - link "GitHub" [ref=e49] [cursor=pointer]:
          - /url: https://github.com/abhijeetsant
          - img [ref=e50]
        - link "Substack" [ref=e52] [cursor=pointer]:
          - /url: https://secondfurther.substack.com
          - img [ref=e53]
        - link "Medium" [ref=e55] [cursor=pointer]:
          - /url: https://medium.com/@abhijeetsant
          - img [ref=e56]
      - link "Resume ↓" [ref=e59] [cursor=pointer]:
        - /url: /sant_abhijeet.pdf
  - generic [ref=e60]:
    - generic [ref=e61]: Featured Project
    - generic [ref=e62]:
      - generic [ref=e64]:
        - generic [ref=e65]: Product Strategy · 2026
        - generic [ref=e66]: SIOKI
        - generic [ref=e67]: Ship It or Kill It
      - generic:
        - generic:
          - text: View
          - text: Project
    - paragraph [ref=e69]:
      - text: 12 real decisions. The companies that made them.
      - text: The lessons they left behind.
    - generic [ref=e72]:
      - generic [ref=e73]: Instagram
      - generic [ref=e74]: Apple
      - generic [ref=e75]: Amazon
      - generic [ref=e76]: Netflix
      - generic [ref=e77]: Twitter
      - generic [ref=e78]: Microsoft
      - generic [ref=e79]: Uber
      - generic [ref=e80]: Spotify
      - generic [ref=e81]: Facebook
      - generic [ref=e82]: Slack
      - generic [ref=e83]: Dropbox
      - generic [ref=e84]: Pinterest
      - generic [ref=e85]: Instagram
      - generic [ref=e86]: Apple
      - generic [ref=e87]: Amazon
      - generic [ref=e88]: Netflix
      - generic [ref=e89]: Twitter
      - generic [ref=e90]: Microsoft
      - generic [ref=e91]: Uber
      - generic [ref=e92]: Spotify
      - generic [ref=e93]: Facebook
      - generic [ref=e94]: Slack
      - generic [ref=e95]: Dropbox
      - generic [ref=e96]: Pinterest
  - generic [ref=e97]:
    - generic [ref=e98]: Selected Projects
    - link "Lucid Lucid" [ref=e99] [cursor=pointer]:
      - /url: "#"
      - generic [ref=e102]: Lucid
      - generic [ref=e105]: Lucid
    - link "Specter Specter" [ref=e106] [cursor=pointer]:
      - /url: "#"
      - generic [ref=e109]: Specter
      - generic [ref=e112]: Specter
  - generic [ref=e113]:
    - generic [ref=e114]:
      - generic [ref=e115]:
        - generic [ref=e116]: "[ 03 ] · Decision Log"
        - generic [ref=e117]:
          - text: The calls I made.
          - text: The price I paid.
      - generic [ref=e118]:
        - text: Real decisions. Real trade-offs.
        - text: What I chose and what it cost.
    - generic [ref=e120]:
      - generic [ref=e122]:
        - generic [ref=e123]:
          - generic [ref=e124]: 01 · Feature Scoping · Q1 2026
          - generic [ref=e125]: Lucid
        - generic [ref=e126]:
          - generic [ref=e127]:
            - generic [ref=e129]: "01"
            - generic [ref=e136]: The Choice
            - paragraph [ref=e137]: Shipped detection-only MVP with no user dashboard. Chose to validate core AI detection accuracy before investing in UI.
          - generic [ref=e138]:
            - generic [ref=e140]: "02"
            - generic [ref=e147]: The Sacrifice
            - paragraph [ref=e148]: Delayed onboarding flow by 6 weeks. Early testers had no visibility into what was being flagged or why.
          - generic [ref=e149]:
            - generic [ref=e151]: "03"
            - generic [ref=e158]: The Signal
            - paragraph [ref=e159]: Detection accuracy hit 91% in beta. Users forgave the bare UI because the core promise worked. Right call.
        - generic [ref=e160]:
          - generic [ref=e161]:
            - generic [ref=e162]: Confidence Score
            - generic [ref=e163]: 72%
          - generic [ref=e164]:
            - generic [ref=e165]: Outcome
            - generic [ref=e166]: Validated
          - generic [ref=e167]:
            - generic [ref=e168]: Reversibility
            - generic [ref=e169]: High
      - generic:
        - generic:
          - generic:
            - generic: 02 · ATS Roadmap · Q3 2024
            - generic: Collabera
          - generic:
            - generic:
              - generic:
                - generic: "01"
              - generic:
                - generic: The Choice
              - paragraph: Deprioritized bulk candidate import requested by 12 enterprise clients to ship interview scheduling automation first.
            - generic:
              - generic:
                - generic: "02"
              - generic:
                - generic: The Sacrifice
              - paragraph: Three clients escalated. Sales pushed back hard. One client threatened to reduce contract scope.
            - generic:
              - generic:
                - generic: "03"
              - generic:
                - generic: The Signal
              - paragraph: Interview scheduling reduced time-to-hire by 60%. The 12 clients requesting bulk import renewed at higher tiers anyway.
          - generic:
            - generic:
              - generic: Confidence Score
              - generic: 61%
            - generic:
              - generic: Outcome
              - generic: 60% ↓ TTH
            - generic:
              - generic: Reversibility
              - generic: Medium
      - generic:
        - generic:
          - generic:
            - generic: 03 · AI Platform · Q1 2022
            - generic: Archemy
          - generic:
            - generic:
              - generic:
                - generic: "01"
              - generic:
                - generic: The Choice
              - paragraph: Rebuilt the explainability layer from scratch instead of patching the existing model output display clients complained about.
            - generic:
              - generic:
                - generic: "02"
              - generic:
                - generic: The Sacrifice
              - paragraph: 4-week engineering freeze on new features. Two planned client demos pushed. CTO was skeptical of the full rebuild.
            - generic:
              - generic:
                - generic: "03"
              - generic:
                - generic: The Signal
              - paragraph: New explainability layer became the top-cited reason in client renewal conversations. 90% retention that quarter.
          - generic:
            - generic:
              - generic: Confidence Score
              - generic: 55%
            - generic:
              - generic: Outcome
              - generic: 90% Retention
            - generic:
              - generic: Reversibility
              - generic: Low
```

# Test source

```ts
  35  |   expect(consoleErrors, `Console errors: ${consoleErrors.join('\n')}`).toHaveLength(0);
  36  | });
  37  | 
  38  | // ─────────────────────────────────────────────────────────────
  39  | // Test 2 — All MVP sections are present and visible
  40  | // ─────────────────────────────────────────────────────────────
  41  | test('All MVP sections are present and visible', async ({ page }) => {
  42  |   await page.goto('/');
  43  |   await page.waitForLoadState('networkidle');
  44  | 
  45  |   // Sections: try data-testid first, fall back to heading/role
  46  |   const sections = [
  47  |     {
  48  |       name: 'Hero',
  49  |       selectors: ['[data-testid="hero"]', 'section#hero', '[data-section="hero"]'],
  50  |       headingPattern: /abhijeet|portfolio|designer|product/i,
  51  |     },
  52  |     {
  53  |       name: 'ScrollReveal',
  54  |       selectors: ['[data-testid="scroll-reveal"]', '[data-section="scroll-reveal"]'],
  55  |       headingPattern: null, // structural component, no heading expected
  56  |     },
  57  |     {
  58  |       name: 'About',
  59  |       selectors: ['[data-testid="about"]', 'section#about', '[data-section="about"]'],
  60  |       headingPattern: /about/i,
  61  |     },
  62  |     {
  63  |       name: 'FeaturedProject',
  64  |       selectors: ['[data-testid="featured-project"]', '[data-section="featured-project"]'],
  65  |       headingPattern: /featured|case study|project/i,
  66  |     },
  67  |     {
  68  |       name: 'SelectedProjects',
  69  |       selectors: ['[data-testid="selected-projects"]', '[data-section="selected-projects"]'],
  70  |       headingPattern: /selected|projects|work/i,
  71  |     },
  72  |     {
  73  |       name: 'DecisionLog',
  74  |       selectors: ['[data-testid="decision-log"]', '[data-section="decision-log"]'],
  75  |       headingPattern: /decision|log/i,
  76  |     },
  77  |     {
  78  |       name: 'MetricMarvels',
  79  |       selectors: ['[data-testid="metric-marvels"]', '[data-section="metric-marvels"]'],
  80  |       headingPattern: /metric|marvel|number|impact/i,
  81  |     },
  82  |     {
  83  |       name: 'Writing',
  84  |       selectors: ['[data-testid="writing"]', 'section#writing', '[data-section="writing"]'],
  85  |       headingPattern: /writing|articles|blog/i,
  86  |     },
  87  |     {
  88  |       name: 'Footer',
  89  |       selectors: ['[data-testid="footer"]', 'footer', '[data-section="footer"]'],
  90  |       headingPattern: null,
  91  |     },
  92  |   ];
  93  | 
  94  |   const missing = [];
  95  |   const found = [];
  96  | 
  97  |   for (const section of sections) {
  98  |     let located = false;
  99  | 
  100 |     // Try explicit selectors
  101 |     for (const sel of section.selectors) {
  102 |       const el = page.locator(sel).first();
  103 |       if ((await el.count()) > 0 && (await el.isVisible())) {
  104 |         found.push(`${section.name} (selector: ${sel})`);
  105 |         located = true;
  106 |         break;
  107 |       }
  108 |     }
  109 | 
  110 |     // Fall back to heading text match
  111 |     if (!located && section.headingPattern) {
  112 |       const headings = page.locator('h1, h2, h3, h4, h5, h6, p');
  113 |       const count = await headings.count();
  114 |       for (let i = 0; i < count; i++) {
  115 |         const el = headings.nth(i);
  116 |         const text = await el.textContent().catch(() => '');
  117 |         if (section.headingPattern.test(text) && (await el.isVisible())) {
  118 |           found.push(`${section.name} (heading text: "${text.trim().slice(0, 60)}")`);
  119 |           located = true;
  120 |           break;
  121 |         }
  122 |       }
  123 |     }
  124 | 
  125 |     if (!located) {
  126 |       missing.push(section.name);
  127 |     }
  128 |   }
  129 | 
  130 |   console.log('\nSections found:', found.join('\n  '));
  131 |   if (missing.length > 0) {
  132 |     console.log('Sections MISSING:', missing.join(', '));
  133 |   }
  134 | 
> 135 |   expect(missing, `Missing sections: ${missing.join(', ')}`).toHaveLength(0);
      |                                                              ^ Error: Missing sections: ScrollReveal, FeaturedProject, MetricMarvels, Writing, Footer
  136 | });
  137 | 
  138 | // ─────────────────────────────────────────────────────────────
  139 | // Test 3 — No horizontal overflow on mobile
  140 | // ─────────────────────────────────────────────────────────────
  141 | test('No horizontal overflow on mobile', async ({ page, isMobile }) => {
  142 |   await page.goto('/');
  143 |   await page.waitForLoadState('networkidle');
  144 | 
  145 |   const overflow = await page.evaluate(() => ({
  146 |     scrollWidth: document.documentElement.scrollWidth,
  147 |     clientWidth: document.documentElement.clientWidth,
  148 |   }));
  149 | 
  150 |   console.log(`scrollWidth=${overflow.scrollWidth}, clientWidth=${overflow.clientWidth}`);
  151 | 
  152 |   expect(
  153 |     overflow.scrollWidth,
  154 |     `Horizontal overflow detected: scrollWidth (${overflow.scrollWidth}) > clientWidth (${overflow.clientWidth})`
  155 |   ).toBeLessThanOrEqual(overflow.clientWidth);
  156 | });
  157 | 
  158 | // ─────────────────────────────────────────────────────────────
  159 | // Test 4 — No broken images
  160 | // ─────────────────────────────────────────────────────────────
  161 | test('No broken images', async ({ page }) => {
  162 |   await page.goto('/');
  163 |   await page.waitForLoadState('networkidle');
  164 | 
  165 |   const brokenImages = await page.evaluate(() => {
  166 |     const imgs = Array.from(document.querySelectorAll('img'));
  167 |     return imgs
  168 |       .filter((img) => !img.naturalWidth || img.naturalWidth === 0)
  169 |       .map((img) => ({ src: img.src, alt: img.alt }));
  170 |   });
  171 | 
  172 |   const allImages = await page.evaluate(() =>
  173 |     Array.from(document.querySelectorAll('img')).map((img) => ({
  174 |       src: img.src,
  175 |       alt: img.alt,
  176 |       naturalWidth: img.naturalWidth,
  177 |     }))
  178 |   );
  179 | 
  180 |   console.log(`\nTotal images found: ${allImages.length}`);
  181 |   allImages.forEach((img) =>
  182 |     console.log(`  [${img.naturalWidth > 0 ? 'OK' : 'BROKEN'}] ${img.src} (alt: "${img.alt}")`)
  183 |   );
  184 | 
  185 |   if (brokenImages.length > 0) {
  186 |     console.log('Broken images:', brokenImages);
  187 |   }
  188 | 
  189 |   expect(brokenImages, `Broken images: ${JSON.stringify(brokenImages)}`).toHaveLength(0);
  190 | });
  191 | 
  192 | // ─────────────────────────────────────────────────────────────
  193 | // Test 5 — /story route loads
  194 | // ─────────────────────────────────────────────────────────────
  195 | test('/story route loads with content', async ({ page }) => {
  196 |   const consoleErrors = [];
  197 |   page.on('console', (msg) => {
  198 |     if (msg.type() === 'error') {
  199 |       const text = msg.text();
  200 |       if (text.includes('Download the React DevTools') || text.includes('favicon')) return;
  201 |       consoleErrors.push(text);
  202 |     }
  203 |   });
  204 | 
  205 |   const response = await page.goto('/story');
  206 |   expect(response.status()).toBe(200);
  207 | 
  208 |   await page.waitForLoadState('networkidle');
  209 | 
  210 |   const bodyText = await page.evaluate(() => document.body.innerText);
  211 |   console.log(`\n/story body text length: ${bodyText.length} chars`);
  212 | 
  213 |   if (consoleErrors.length > 0) console.log('Console errors:', consoleErrors);
  214 | 
  215 |   expect(consoleErrors, `Console errors on /story: ${consoleErrors.join('\n')}`).toHaveLength(0);
  216 |   expect(bodyText.length, '/story page has too little content').toBeGreaterThan(500);
  217 | });
  218 | 
  219 | // ─────────────────────────────────────────────────────────────
  220 | // Test 6 — All external links have valid hrefs
  221 | // ─────────────────────────────────────────────────────────────
  222 | test('All external links have valid hrefs', async ({ page }) => {
  223 |   await page.goto('/');
  224 |   await page.waitForLoadState('networkidle');
  225 | 
  226 |   const externalLinks = await page.evaluate(() =>
  227 |     Array.from(document.querySelectorAll('a[target="_blank"]')).map((a) => ({
  228 |       href: a.href,
  229 |       text: a.textContent?.trim().slice(0, 60),
  230 |       rel: a.rel,
  231 |     }))
  232 |   );
  233 | 
  234 |   console.log(`\nExternal links found (${externalLinks.length}):`);
  235 |   externalLinks.forEach((link) =>
```