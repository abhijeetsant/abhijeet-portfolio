import { useState, useRef, useEffect, useCallback } from "react";

// ─── CONFIG ──────────────────────────────────────────────────
const PROXY_URL = "/api/specter";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// ─── DEMO DATA ───────────────────────────────────────────────
const DEMO_PRODUCTS = {
  zomato: {
    name: "Zomato",
    tagline: "India's food delivery giant. Emotional complaints about pricing, trust, and support.",
    complaints: [
      "Delivery times are wildly inconsistent — 20 mins one day, 70 mins the next for the same restaurant",
      "The app pushes Zomato Gold constantly. I just want to order food, not get upsold every screen",
      "Restaurant ratings feel manipulated. Places with terrible food have 4.2 stars somehow",
      "Customer support is a chatbot loop. Impossible to reach a human when order is wrong",
      "Delivery charges + platform fee + surge pricing + packaging charges — my ₹200 meal costs ₹380",
      "Photos on the app look nothing like what arrives. Zero accountability for misleading listings",
      "Cancelled my order after 40 mins of waiting and they refused a full refund — only Zomato credits",
      "Delivery partners call asking for directions that are clearly on the map",
      "Vegetarian filter doesn't work properly — I keep getting shown non-veg restaurants",
      "Every festival there's a surge charge. Diwali, Holi, random Tuesday — always a reason to charge more",
      "The loyalty program changed three times in one year. Can't keep track of what points mean anymore",
      "Small restaurants near me disappeared because they can't afford the commission rates"
    ],
    ghostUsers: [
      { id: "z1", name: "Priya Nair", age: 27, location: "Bangalore, India", occupation: "UX Designer at a D2C startup", techFluency: "Power user", usagePattern: "Daily orderer, considering Swiggy switch", coreFrustration: "Hidden fees make every order feel like a bait-and-switch — the price I see is never the price I pay.", frustrationSource: "Reddit r/bangalore, Twitter", personality: "Direct, design-sensitive, tracks spending meticulously. Gets annoyed by dark patterns. Compares to international apps." },
      { id: "z2", name: "Rajesh Iyer", age: 44, location: "Mumbai, India", occupation: "Bank branch manager", techFluency: "Moderate", usagePattern: "Weekend orderer, family meals", coreFrustration: "When something goes wrong, there's no human to talk to — just a chatbot that goes in circles.", frustrationSource: "Google Play Store reviews", personality: "Patient but firm. Orders for family of four. Values reliability over speed. Not interested in gamification. Speaks formally." },
      { id: "z3", name: "Ananya Sharma", age: 21, location: "Delhi NCR, India", occupation: "College student", techFluency: "Native", usagePattern: "Frequent but price-sensitive, uses multiple platforms", coreFrustration: "The photos are lies. I ordered based on what looked amazing and got something completely different.", frustrationSource: "Twitter, Instagram stories, Reddit r/delhi", personality: "Vocal on social media. Screenshots bad orders. Compares prices across Zomato and Swiggy. Will roast a brand publicly. Uses slang." },
      { id: "z4", name: "Mohammed Farooq", age: 36, location: "Hyderabad, India", occupation: "Small restaurant owner (also a Zomato partner)", techFluency: "Moderate", usagePattern: "Uses Zomato from both sides — orders and lists his restaurant", coreFrustration: "Zomato takes 25-30% commission and still expects me to run discounts. My margins are being eaten.", frustrationSource: "Restaurant owner forums, WhatsApp groups", personality: "Sees the platform from supply side. Knows the economics cold. Frustrated that discounts beat quality." }
    ]
  },
  slack: {
    name: "Slack",
    tagline: "The workplace workhorse. Nuanced frustrations about notifications, threads, and bloat.",
    complaints: [
      "Threads are broken. Half my team replies in the channel, half in the thread. Context is always split",
      "Search is genuinely terrible. I know the message exists, I remember the words, and search can't find it",
      "Notification overload is real. 200+ unread messages every morning and no good way to triage",
      "The app uses 2GB+ of RAM just sitting idle. It's an Electron app pretending to be native",
      "Huddles are janky — audio cuts out, can't share screen reliably, and there's no recording",
      "Connect channels with external partners are confusing. Permissions are unclear",
      "Can't schedule messages properly — the UX for 'send later' is buried and unreliable",
      "Canvas launched and nobody uses it because it's a worse version of Notion inside Slack",
      "The free plan history limit kills small teams. Losing message history after 90 days is hostile",
      "Enterprise Grid pricing is opaque. Nobody can tell me what we're actually paying per seat",
      "Status updates are useless — nobody checks them, and they don't integrate with calendar",
      "The mobile app is a degraded experience. Half the features don't work or work differently"
    ],
    ghostUsers: [
      { id: "s1", name: "Marcus Chen", age: 32, location: "San Francisco, USA", occupation: "Engineering Manager, 12-person team", techFluency: "Power user", usagePattern: "All-day every day, tried Discord briefly", coreFrustration: "Threads fragment every conversation. My team can't agree on whether to reply in-thread or in-channel.", frustrationSource: "Hacker News, Reddit r/slack", personality: "Systems thinker. Frustrated by tools that create process problems. Speaks precisely. Will cite specific feature failures." },
      { id: "s2", name: "Fatima Al-Rashid", age: 38, location: "London, UK", occupation: "Head of Operations, Series B fintech", techFluency: "Advanced", usagePattern: "Heavy daily use, manages 6 workspaces", coreFrustration: "I spend 90 minutes every morning triaging notifications. Slack has become my job instead of a tool for my job.", frustrationSource: "LinkedIn, Twitter/X", personality: "Efficiency-obsessed. Measures time in 15-minute blocks. Considering async alternatives. Crisp, impatient sentences." },
      { id: "s3", name: "Tomás Rivera", age: 26, location: "Mexico City, Mexico", occupation: "Junior PM at a remote-first startup", techFluency: "High", usagePattern: "Daily, primarily mobile", coreFrustration: "The mobile app is a second-class citizen. Features I use on desktop don't exist on mobile. I'm remote — mobile IS my device.", frustrationSource: "App Store reviews, Reddit r/remotework", personality: "Remote-first advocate. Works across timezones. Judges tools by mobile experience. Casual and direct." },
      { id: "s4", name: "Wei Zhang", age: 41, location: "Singapore", occupation: "IT Director, 300-person regional office", techFluency: "Expert", usagePattern: "Admin-level, manages deployment for entire office", coreFrustration: "Enterprise Grid pricing is a black box. Every renewal comes with a surprise increase.", frustrationSource: "IT forums, Gartner peer reviews", personality: "Procurement-minded. Evaluates Slack against Teams quarterly. Speaks in terms of ROI and compliance." }
    ]
  },
  chatgpt: {
    name: "ChatGPT",
    tagline: "The AI everyone uses. Real gripes about reliability, pricing, and trust.",
    complaints: [
      "Memory is inconsistent. It remembers my cat's name but forgets the project context I set up yesterday",
      "Rate limits on GPT-4 make the Plus subscription feel like a scam. I pay $20/month to be told 'try again later'",
      "Hallucinations are still a real problem. It confidently cites papers that don't exist",
      "The model randomly gets worse at tasks it used to handle perfectly. Regression with no changelog",
      "Canvas/Artifacts are half-baked. It opens them when I don't want them and doesn't when I do",
      "Can't reliably work with files. Upload a CSV and it makes up data that isn't in the file",
      "The response style is exhaustingly verbose. Every answer has a preamble and a summary",
      "Custom GPTs are a graveyard. Built one, shared it, nobody can find it in the store",
      "It refuses to help with completely benign requests because of overzealous safety filters",
      "Pricing tiers are confusing. Plus, Team, Enterprise — and the feature differences change monthly",
      "Code interpreter sessions timeout and lose all state. In the middle of analysis, everything resets",
      "The app gives different quality responses than the website for the same prompt"
    ],
    ghostUsers: [
      { id: "c1", name: "David Park", age: 35, location: "Seoul, South Korea", occupation: "Senior Data Scientist", techFluency: "Expert", usagePattern: "Daily for work, evaluating Claude as alternative", coreFrustration: "I can't trust it with data. I uploaded a clean CSV and it hallucinated columns that didn't exist.", frustrationSource: "Reddit r/ChatGPT, Hacker News", personality: "Precision-oriented. Tests same prompt multiple times. Has a spreadsheet comparing AI tools. Dry, factual tone." },
      { id: "c2", name: "Sarah Mitchell", age: 29, location: "Austin, Texas, USA", occupation: "Content strategist, freelance", techFluency: "Moderate-high", usagePattern: "Daily, Plus subscriber, frustrated but locked in", coreFrustration: "I'm paying $20/month and hitting rate limits by 2pm. The free tier gets GPT-4 now, so what am I paying for?", frustrationSource: "Twitter/X, Reddit r/OpenAI", personality: "Value-conscious. Tracks ROI on subscriptions. Shares comparison screenshots on Twitter. Increasingly cynical about AI hype." },
      { id: "c3", name: "Kenji Watanabe", age: 51, location: "Tokyo, Japan", occupation: "Small business owner, import/export", techFluency: "Moderate", usagePattern: "Weekly, uses for translation and email drafting", coreFrustration: "It used to understand what I needed with simple instructions. Now I have to write an essay to get the same quality.", frustrationSource: "Google Play reviews, Japanese tech forums", personality: "Non-technical early adopter. Doesn't follow AI news. Just wants his tool to work. Speaks simply and directly." },
      { id: "c4", name: "Amara Okafor", age: 33, location: "Lagos, Nigeria", occupation: "Software engineer at a fintech startup", techFluency: "Expert", usagePattern: "Daily for coding, API + Plus subscription", coreFrustration: "The safety filters are absurd. It refused to help me write a pen testing script for my own company's security audit.", frustrationSource: "Twitter/X, dev.to, Reddit r/programming", personality: "Builder mentality. Frustrated by inconsistent guardrails. Judges tools by developer experience. Blunt and impatient." }
    ]
  }
};

// ─── PROMPTS ─────────────────────────────────────────────────
const buildGhostPrompt = (user, product, complaints) =>
  `You are ${user.name}, a ${user.age}-year-old ${user.occupation} based in ${user.location}. You are being interviewed about ${product}. Stay in character.

PROFILE: Tech: ${user.techFluency} | Usage: ${user.usagePattern} | Frustration: ${user.coreFrustration} | Style: ${user.personality}

REAL COMPLAINTS FROM USERS LIKE YOU:\n${complaints.join("\n")}

RULES: 2-4 sentences MAX. No markdown. Push back on leading questions. Express complaints as your own experience. Show real emotion. Never break character.`;

const buildAnalysisPrompt = (ghostUsers, conversations, product) => {
  const ids = ghostUsers.map(u => u.id).join(", ");
  const initials = ghostUsers.map(u => `"${u.name.split(" ").map(n => n[0]).join("")}"`).join(", ");
  return `Analyze interviews with ${ghostUsers.length} users of ${product}.

USERS:\n${ghostUsers.map(u => `- ${u.name} [${u.id}] (${u.age}, ${u.location}): "${u.coreFrustration}"`).join("\n")}

TRANSCRIPTS:\n${ghostUsers.map(u => {
    const c = conversations[u.id] || [];
    if (!c.length) return `--- ${u.name} ---\n(not interviewed)`;
    return `--- ${u.name} ---\n${c.map(m => `${m.role === "user" ? "Q" : u.name}: ${m.content}`).join("\n")}`;
  }).join("\n\n")}

Return ONLY valid JSON. No markdown. No backticks.

{"affinity":[{"label":"2-4 word theme","severity":"critical|high|opportunity|split","quotes":{"USER_ID":"paraphrased 1-sentence quote or null"}}],"graph":{"nodes":[{"id":"short_id","label":"2-3 words","type":"problem|effect|behavior|outcome|blocker|opportunity","specters":[${initials}],"col":0}],"edges":[{"from":"id","to":"id","relation":"verb","type":"negative|blocker|positive"}],"insight":"2 sentences on the key intervention point"},"tensions":[{"signal":"specific finding","counter":"the contradiction","implication":"what it means"}]}

IDS: ${ids} | INITIALS: ${initials}
RULES: affinity 4-6 themes with exact user IDs (${ids}). graph 8-10 nodes (col 0=problem,1=effect,2=behavior,3=outcome), 8-12 edges, 1+ blocks edge. tensions exactly 2.`;
};

// ─── GEMINI API ──────────────────────────────────────────────
const callProxy = async (system, messages, maxTokens = 300) => {
  const contents = [];
  contents.push({ role: "user", parts: [{ text: system + "\n\nBegin." }] });
  contents.push({ role: "model", parts: [{ text: "Ready." }] });
  for (const m of messages) contents.push({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.content }] });
  const res = await fetch(PROXY_URL, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents, generationConfig: { temperature: 0.85, maxOutputTokens: maxTokens, topP: 0.9 } })
  });
  if (!res.ok) throw new Error(`Proxy: ${res.status}`);
  const d = await res.json();
  return d?.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

const callDirect = async (key, system, messages, maxTokens = 300) => {
  const contents = [];
  contents.push({ role: "user", parts: [{ text: system + "\n\nBegin." }] });
  contents.push({ role: "model", parts: [{ text: "Ready." }] });
  for (const m of messages) contents.push({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.content }] });
  const res = await fetch(`${GEMINI_URL}?key=${key}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents, generationConfig: { temperature: 0.85, maxOutputTokens: maxTokens, topP: 0.9 } })
  });
  if (!res.ok) throw new Error(`Gemini: ${res.status}`);
  const d = await res.json();
  return d?.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

// ─── DESIGN TOKENS ───────────────────────────────────────────
const SEV = { critical: "#C0392B", high: "#E88B3A", opportunity: "#27AE60", split: "#C47B2B" };
const NODE_C = {
  problem: { bg: "#C0392B", t: "#FFF" }, effect: { bg: "#1A1A2E", t: "#FFF" },
  behavior: { bg: "#C47B2B", t: "#FFF" }, outcome: { bg: "#E67E22", t: "#FFF" },
  blocker: { bg: "#EEECEA", t: "#555" }, opportunity: { bg: "#27AE60", t: "#FFF" },
};
const EDGE_C = { negative: "#C0392B", blocker: "#999", positive: "#27AE60" };
const COL_X = { 0: 130, 1: 310, 2: 510, 3: 700 };

// ─── SMALL COMPONENTS ────────────────────────────────────────
const S = { f: "'Geist',sans-serif", k: "'Kaisei Tokumin',serif", m: "'IBM Plex Mono',monospace" };

const Dots = () => { const [d, setD] = useState(""); useEffect(() => { const i = setInterval(() => setD(v => v.length >= 3 ? "" : v + "."), 400); return () => clearInterval(i); }, []); return <span>{d}</span>; };

const PhaseBar = ({ phase }) => {
  const steps = ["Select", "Summon", "Specter", "Synthesize", "Share"];
  const idx = steps.findIndex(s => s.toLowerCase() === phase);
  return (
    <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", marginBottom: "2.2rem", flexWrap: "wrap" }}>
      {steps.map((s, i) => (
        <span key={s} style={{ fontFamily: S.f, fontSize: "0.66rem", letterSpacing: "0.1em", textTransform: "uppercase", color: i <= idx ? "#C47B2B" : "#CCC", fontWeight: i === idx ? 600 : 400, transition: "color 0.3s" }}>
          {`0${i + 1} ${s}`}{i < steps.length - 1 && <span style={{ margin: "0 0.3rem", color: i < idx ? "#C47B2B" : "#DDD" }}>—</span>}
        </span>
      ))}
    </div>
  );
};

const GhostCard = ({ user, active, interviewed, onClick }) => (
  <button onClick={onClick} style={{
    background: active ? "rgba(196,123,43,0.04)" : "#FFF", border: active ? "1.5px solid #C47B2B" : "1px solid rgba(0,0,0,0.08)",
    borderRadius: "12px", padding: "1.15rem", cursor: "pointer", textAlign: "left", transition: "all 0.2s",
    flex: "1 1 210px", minWidth: "210px", maxWidth: "270px", position: "relative"
  }}>
    {interviewed && <div style={{ position: "absolute", top: 11, right: 11, width: 7, height: 7, borderRadius: "50%", background: "#4CAF7D" }} />}
    <div style={{ width: 34, height: 34, borderRadius: "50%", background: active ? "#C47B2B" : "#EEECEA", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: S.k, fontSize: "0.75rem", color: active ? "#FFF" : "#666", marginBottom: "0.65rem" }}>
      {user.name.split(" ").map(n => n[0]).join("")}
    </div>
    <div style={{ fontFamily: S.k, fontSize: "1rem", color: "#111", marginBottom: "0.12rem" }}>{user.name}</div>
    <div style={{ fontFamily: S.f, fontSize: "0.68rem", color: "#999", marginBottom: "0.5rem" }}>{user.age} · {user.location}</div>
    <div style={{ fontFamily: S.f, fontSize: "0.72rem", color: "#666", lineHeight: 1.45, marginBottom: "0.5rem" }}>{user.occupation}</div>
    <div style={{ fontFamily: S.m, fontSize: "0.67rem", color: "#333", lineHeight: 1.5, borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "0.5rem", fontStyle: "italic" }}>"{user.coreFrustration}"</div>
  </button>
);

const Bubble = ({ msg, name }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: "1rem" }}>
    <span style={{ fontFamily: S.f, fontSize: "0.6rem", color: "#999", marginBottom: "0.2rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{msg.role === "user" ? "You" : name}</span>
    <div style={{ fontFamily: S.f, fontSize: "0.84rem", lineHeight: 1.7, color: "#111", maxWidth: "85%", background: msg.role === "user" ? "#EEECEA" : "transparent", padding: msg.role === "user" ? "0.6rem 0.9rem" : "0", borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "0" }}>{msg.content}</div>
  </div>
);

// ─── INSIGHT GRAPH ───────────────────────────────────────────
const InsightGraph = ({ data }) => {
  const [hov, setHov] = useState(null);
  const W = 840, H = 520;

  // Layout nodes into columns
  const nodes = [];
  const cols = {};
  const special = [];
  (data.nodes || []).forEach(n => {
    if (n.type === "opportunity" || n.type === "blocker") special.push(n);
    else { const c = n.col ?? 0; if (!cols[c]) cols[c] = []; cols[c].push(n); }
  });
  Object.entries(cols).forEach(([c, ns]) => {
    const x = COL_X[parseInt(c)] || 400;
    const sp = Math.min(130, (H - 180) / Math.max(ns.length, 1));
    ns.forEach((n, i) => nodes.push({ ...n, x, y: 150 + i * sp, sz: n.specters?.length || 1 }));
  });
  special.forEach((n, i) => nodes.push({ ...n, x: W * (0.4 + i * 0.25), y: H - 55, sz: n.specters?.length || 1 }));

  const edges = data.edges || [];
  const getN = id => nodes.find(n => n.id === id);
  const conn = nid => !hov || nid === hov || edges.some(e => (e.from === hov && e.to === nid) || (e.to === hov && e.from === nid));
  const eAct = e => !hov || e.from === hov || e.to === hov;
  const curve = (a, b) => { const mx = (a.x + b.x) / 2; return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`; };
  const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const nR = n => 20 + (n.sz || 1) * 5;
  const colLabels = [{ x: 130, l: "PROBLEMS" }, { x: 310, l: "EFFECTS" }, { x: 510, l: "BEHAVIORS" }, { x: 700, l: "OUTCOMES" }];

  return (
    <div>
      <div style={{ background: "#FFF", borderRadius: "14px", border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.03)" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
          {colLabels.map((c, i) => (
            <g key={c.l}>
              <rect x={c.x - 68} y={88} width={136} height={H - 115} rx={8} fill={i % 2 === 0 ? "rgba(0,0,0,0.012)" : "transparent"} />
              <text x={c.x} y={108} textAnchor="middle" style={{ fontFamily: S.f, fontSize: "7.5px", fill: "#CCC", fontWeight: 600, letterSpacing: "1.5px" }}>{c.l}</text>
              {i < 3 && <><line x1={c.x + 68} y1={105} x2={colLabels[i + 1].x - 68} y2={105} stroke="#EEE" strokeWidth={1} /><polygon points={`${colLabels[i + 1].x - 70},102 ${colLabels[i + 1].x - 70},108 ${colLabels[i + 1].x - 62},105`} fill="#EEE" /></>}
            </g>
          ))}
          {nodes.find(n => n.type === "opportunity") && (() => { const o = nodes.find(n => n.type === "opportunity"); return o ? <rect x={o.x - 70} y={o.y - 28} width={140} height={56} rx={10} fill="rgba(39,174,96,0.04)" stroke="rgba(39,174,96,0.1)" strokeWidth={1} strokeDasharray="4 3" /> : null; })()}
          {edges.map((e, i) => { const a = getN(e.from), b = getN(e.to); if (!a || !b) return null; const act = eAct(e); const m = mid(a, b); const c = EDGE_C[e.type] || "#999"; return (
            <g key={i} opacity={act ? 1 : 0.06} style={{ transition: "opacity 0.25s" }}>
              <path d={curve(a, b)} fill="none" stroke={c} strokeWidth={act && hov ? 2 : 1.3} strokeDasharray={e.type === "blocker" ? "5 3" : "none"} opacity={0.45} />
              <rect x={m.x - 22} y={m.y - 6} width={44} height={12} rx={3} fill="#F5F4F1" stroke="rgba(0,0,0,0.04)" strokeWidth={0.5} />
              <text x={m.x} y={m.y + 3} textAnchor="middle" style={{ fontFamily: S.f, fontSize: "6px", fill: c, fontWeight: 500 }}>{e.relation}</text>
            </g>
          ); })}
          {nodes.map(n => { const c = NODE_C[n.type] || NODE_C.effect; const ok = conn(n.id); const isH = hov === n.id; const r = nR(n); const w = n.label.split(" "); const l1 = w.length <= 2 ? n.label : w.slice(0, Math.ceil(w.length / 2)).join(" "); const l2 = w.length <= 2 ? null : w.slice(Math.ceil(w.length / 2)).join(" "); return (
            <g key={n.id} opacity={ok ? 1 : 0.08} style={{ cursor: "pointer", transition: "opacity 0.25s" }} onMouseEnter={() => setHov(n.id)} onMouseLeave={() => setHov(null)}>
              {isH && <circle cx={n.x} cy={n.y} r={r + 9} fill={c.bg} opacity={0.07} />}
              <circle cx={n.x} cy={n.y} r={r} fill={c.bg} />
              {l2 ? <><text x={n.x} y={n.y - 3} textAnchor="middle" style={{ fontFamily: S.f, fontSize: "8px", fill: c.t, fontWeight: 600 }}>{l1}</text><text x={n.x} y={n.y + 8} textAnchor="middle" style={{ fontFamily: S.f, fontSize: "8px", fill: c.t, fontWeight: 600 }}>{l2}</text></> : <text x={n.x} y={n.y + 3} textAnchor="middle" style={{ fontFamily: S.f, fontSize: "8px", fill: c.t, fontWeight: 600 }}>{n.label}</text>}
              {(n.specters || []).map((s, si) => { const a = ((si / n.specters.length) * Math.PI * 1.2) - Math.PI * 0.6; const ox = n.x + Math.cos(a) * (r + 12); const oy = n.y + Math.sin(a) * (r + 12); return (<g key={s}><circle cx={ox} cy={oy} r={7.5} fill="#F5F4F1" stroke="#FFF" strokeWidth={1.5} /><text x={ox} y={oy + 2.5} textAnchor="middle" style={{ fontFamily: S.k, fontSize: "5px", fill: "#888" }}>{s}</text></g>); })}
            </g>
          ); })}
        </svg>
      </div>
      {hov && (() => { const n = getN(hov); const inc = edges.filter(e => e.to === hov); const out = edges.filter(e => e.from === hov); return (
        <div style={{ background: "#FFF", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.06)", padding: "0.75rem 1rem", marginTop: "0.5rem", fontSize: "0.72rem", color: "#555", lineHeight: 1.6 }}>
          <span style={{ fontFamily: S.k, fontSize: "0.9rem", color: "#111" }}>{n.label}</span>
          <span style={{ fontSize: "0.6rem", color: "#999", marginLeft: "0.4rem" }}>{n.type}</span>
          {inc.length > 0 && <div style={{ marginTop: "0.2rem" }}><span style={{ fontSize: "0.58rem", color: "#999", textTransform: "uppercase", fontWeight: 600 }}>← </span>{inc.map(e => getN(e.from)?.label).filter(Boolean).join(", ")}</div>}
          {out.length > 0 && <div><span style={{ fontSize: "0.58rem", color: "#999", textTransform: "uppercase", fontWeight: 600 }}>→ </span>{out.map(e => `${getN(e.to)?.label} (${e.relation})`).filter(Boolean).join(", ")}</div>}
        </div>
      ); })()}
      {data.insight && (
        <div style={{ background: "rgba(196,123,43,0.04)", borderRadius: "10px", border: "1px solid rgba(196,123,43,0.1)", padding: "0.85rem 1.2rem", marginTop: "0.5rem", display: "flex", gap: "0.6rem" }}>
          <span style={{ fontFamily: S.k, fontSize: "1.2rem", color: "#C47B2B" }}>→</span>
          <div>
            <div style={{ fontSize: "0.58rem", color: "#C47B2B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.15rem" }}>Key Intervention Point</div>
            <p style={{ fontSize: "0.78rem", color: "#333", lineHeight: 1.6 }}>{data.insight}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── TENSION CARD VARIANTS ───────────────────────────────────
const TensionCard = ({ t, variant, product }) => {
  const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  if (variant === "dark") return (
    <div style={{ background: "#1A1A2E", borderRadius: "14px", padding: "1.8rem 1.6rem", color: "#E8E3DC", maxWidth: "560px", margin: "0 auto", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.3rem" }}>
        <span style={{ fontFamily: S.k, fontSize: "0.78rem", color: "#C47B2B" }}>SPECTER</span>
        <span style={{ fontFamily: S.f, fontSize: "0.58rem", color: "#555" }}>{product} · {date}</span>
      </div>
      <div style={{ background: "rgba(39,174,96,0.1)", borderRadius: "10px", padding: "0.9rem 1rem", marginBottom: "0.5rem" }}>
        <div style={{ fontFamily: S.f, fontSize: "0.58rem", color: "#27AE60", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>Signal</div>
        <p style={{ fontFamily: S.k, fontSize: "1rem", lineHeight: 1.5 }}>{t.signal}</p>
      </div>
      <div style={{ background: "rgba(192,57,43,0.1)", borderRadius: "10px", padding: "0.9rem 1rem", marginBottom: "0.9rem" }}>
        <div style={{ fontFamily: S.f, fontSize: "0.58rem", color: "#E74C3C", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>But</div>
        <p style={{ fontFamily: S.k, fontSize: "1rem", lineHeight: 1.5 }}>{t.counter}</p>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.7rem" }}>
        <div style={{ fontFamily: S.f, fontSize: "0.58rem", color: "#C47B2B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>So what</div>
        <p style={{ fontFamily: S.f, fontSize: "0.78rem", color: "#888", lineHeight: 1.6, fontStyle: "italic" }}>{t.implication}</p>
      </div>
    </div>
  );

  if (variant === "light") return (
    <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1px solid rgba(0,0,0,0.08)", padding: "1.8rem 1.6rem", maxWidth: "560px", margin: "0 auto", width: "100%", boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.3rem" }}>
        <span style={{ fontFamily: S.k, fontSize: "0.78rem", color: "#C47B2B" }}>SPECTER</span>
        <span style={{ fontFamily: S.f, fontSize: "0.58rem", color: "#999" }}>{product} · {date}</span>
      </div>
      <div style={{ background: "rgba(39,174,96,0.05)", borderRadius: "10px", padding: "0.9rem 1rem", marginBottom: "0.5rem" }}>
        <div style={{ fontFamily: S.f, fontSize: "0.58rem", color: "#27AE60", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>Signal</div>
        <p style={{ fontFamily: S.k, fontSize: "1rem", color: "#111", lineHeight: 1.5 }}>{t.signal}</p>
      </div>
      <div style={{ background: "rgba(192,57,43,0.04)", borderRadius: "10px", padding: "0.9rem 1rem", marginBottom: "0.9rem" }}>
        <div style={{ fontFamily: S.f, fontSize: "0.58rem", color: "#C0392B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>But</div>
        <p style={{ fontFamily: S.k, fontSize: "1rem", color: "#111", lineHeight: 1.5 }}>{t.counter}</p>
      </div>
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "0.7rem" }}>
        <div style={{ fontFamily: S.f, fontSize: "0.58rem", color: "#C47B2B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>So what</div>
        <p style={{ fontFamily: S.f, fontSize: "0.78rem", color: "#666", lineHeight: 1.6, fontStyle: "italic" }}>{t.implication}</p>
      </div>
    </div>
  );

  if (variant === "bold") return (
    <div style={{ background: "#111", borderRadius: "14px", padding: "1.8rem 1.6rem", maxWidth: "560px", margin: "0 auto", width: "100%", overflow: "hidden", position: "relative" }}>
      <div style={{ fontFamily: S.f, fontSize: "0.58rem", color: "#555", marginBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "#C47B2B", fontFamily: S.k }}>SPECTER</span>
        <span>{product}</span>
      </div>
      <p style={{ fontFamily: S.k, fontSize: "1.3rem", color: "#27AE60", lineHeight: 1.4, marginBottom: "1rem" }}>{t.signal}</p>
      <p style={{ fontFamily: S.k, fontSize: "1.3rem", color: "#E74C3C", lineHeight: 1.4, marginBottom: "1.2rem" }}>{t.counter}</p>
      <div style={{ borderTop: "1px solid #222", paddingTop: "0.8rem" }}>
        <p style={{ fontFamily: S.f, fontSize: "0.8rem", color: "#666", lineHeight: 1.6, fontStyle: "italic" }}>{t.implication}</p>
      </div>
    </div>
  );

  // data variant
  return (
    <div style={{ background: "#FAFAF8", borderRadius: "14px", border: "1px solid rgba(0,0,0,0.06)", padding: "1.6rem", maxWidth: "560px", margin: "0 auto", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
        <div><span style={{ fontFamily: S.k, fontSize: "0.75rem", color: "#C47B2B" }}>SPECTER</span><span style={{ fontFamily: S.f, fontSize: "0.55rem", color: "#CCC", margin: "0 0.4rem" }}>|</span><span style={{ fontFamily: S.f, fontSize: "0.55rem", color: "#999" }}>Research · {product}</span></div>
        <span style={{ fontFamily: S.m, fontSize: "0.55rem", color: "#CCC" }}>{date}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1rem" }}>
        <div style={{ background: "#FFF", borderRadius: "8px", padding: "0.8rem", borderLeft: "3px solid #27AE60" }}>
          <div style={{ fontFamily: S.f, fontSize: "0.55rem", color: "#27AE60", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>Signal</div>
          <p style={{ fontFamily: S.f, fontSize: "0.78rem", color: "#111", lineHeight: 1.5 }}>{t.signal}</p>
        </div>
        <div style={{ background: "#FFF", borderRadius: "8px", padding: "0.8rem", borderLeft: "3px solid #C0392B" }}>
          <div style={{ fontFamily: S.f, fontSize: "0.55rem", color: "#C0392B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>But</div>
          <p style={{ fontFamily: S.f, fontSize: "0.78rem", color: "#111", lineHeight: 1.5 }}>{t.counter}</p>
        </div>
      </div>
      <div style={{ fontFamily: S.f, fontSize: "0.75rem", color: "#666", lineHeight: 1.6, fontStyle: "italic", padding: "0.5rem 0 0", borderTop: "1px solid rgba(0,0,0,0.04)" }}>{t.implication}</div>
    </div>
  );
};

// ─── MAIN APP ────────────────────────────────────────────────
export default function Specter() {
  const [phase, setPhase] = useState("select");
  const [mode, setMode] = useState("demo");
  const [apiKey, setApiKey] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customProduct, setCustomProduct] = useState("");
  const [manualComplaints, setManualComplaints] = useState("");
  const [userCount, setUserCount] = useState(2);
  const [ghostUsers, setGhostUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const [conversations, setConversations] = useState({});
  const [inputMsg, setInputMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [synthTab, setSynthTab] = useState("affinity");
  const [shareVariant, setShareVariant] = useState("dark");
  const [activeTension, setActiveTension] = useState(0);
  const [complaints, setComplaints] = useState([]);

  const chatEnd = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [conversations, activeUserId]);
  useEffect(() => { if (phase === "specter") inputRef.current?.focus(); }, [phase, activeUserId]);

  const product = selectedProduct ? DEMO_PRODUCTS[selectedProduct] : null;
  const active = ghostUsers.find(u => u.id === activeUserId);
  const interviewed = Object.values(conversations).filter(c => c.length > 0).length;

  const callAI = useCallback(async (sys, msgs, maxT = 300) => {
    return mode === "demo" ? callProxy(sys, msgs, maxT) : callDirect(apiKey, sys, msgs, maxT);
  }, [mode, apiKey]);

  // ── Handlers ──
  const handleSelectProduct = (key) => { setSelectedProduct(key); setPhase("summon"); };
  const handleSelectCustom = () => { if (customProduct.trim()) setPhase("summon"); };

  const handleSummon = async () => {
    setPhase("summoning");
    setLoadMsg("Searching the graveyard");
    await new Promise(r => setTimeout(r, 700));
    setLoadMsg("Reconstructing voices");
    await new Promise(r => setTimeout(r, 700));
    setLoadMsg("Summoning specters");
    await new Promise(r => setTimeout(r, 500));
    if (mode === "demo" && product) {
      setGhostUsers(product.ghostUsers.slice(0, userCount));
      setComplaints(product.complaints);
    } else {
      const pn = customProduct;
      let raw;
      if (manualComplaints.trim()) { raw = manualComplaints.split("\n").filter(l => l.trim()); }
      else { const r = await callAI("Generate 12 realistic user complaints. One per line. No numbering.", [{ role: "user", content: `Product: ${pn}` }]); raw = r.split("\n").filter(l => l.trim().length > 10); }
      setComplaints(raw);
      const gp = `Generate ${userCount} user personas for "${pn}" from these complaints:\n${raw.join("\n")}\n\nReturn ONLY JSON array: [{"id":"u1","name":"Name","age":30,"location":"City","occupation":"Job","techFluency":"Level","usagePattern":"Pattern","coreFrustration":"Sentence","frustrationSource":"Platform","personality":"2-3 sentences"}]`;
      const gr = await callAI("Return only valid JSON.", [{ role: "user", content: gp }], 1500);
      try { setGhostUsers(JSON.parse(gr.replace(/```json|```/g, "").trim())); } catch { setGhostUsers([]); }
    }
    setConversations({}); setAnalysis(null); setActiveUserId(null); setPhase("specter");
  };

  const handleSend = async () => {
    if (!inputMsg.trim() || !active || loading) return;
    const msg = inputMsg.trim(); setInputMsg("");
    setConversations(p => ({ ...p, [activeUserId]: [...(p[activeUserId] || []), { role: "user", content: msg }] }));
    setLoading(true);
    try {
      const hist = [...(conversations[activeUserId] || []), { role: "user", content: msg }];
      const res = await callAI(buildGhostPrompt(active, product?.name || customProduct, complaints), hist);
      setConversations(p => ({ ...p, [activeUserId]: [...(p[activeUserId] || []), { role: "assistant", content: res }] }));
    } catch { setConversations(p => ({ ...p, [activeUserId]: [...(p[activeUserId] || []), { role: "assistant", content: "Having trouble responding. Try again?" }] })); }
    setLoading(false);
  };

  const handleSynthesize = async () => {
    setPhase("synthesize"); setSynthTab("affinity"); setLoading(true); setLoadMsg("Analyzing patterns");
    try {
      const prompt = buildAnalysisPrompt(ghostUsers, conversations, product?.name || customProduct);
      const res = await callAI("Return ONLY valid JSON. No markdown.", [{ role: "user", content: prompt }], 2500);
      setAnalysis(JSON.parse(res.replace(/```json|```/g, "").trim()));
    } catch { setAnalysis({ affinity: [], graph: { nodes: [], edges: [], insight: "Analysis failed. Try more interviews." }, tensions: [{ signal: "Couldn't generate.", counter: "Try again.", implication: "Interview 2+ specters with 3+ messages." }] }); }
    setLoading(false);
  };

  const reset = () => { setPhase("select"); setSelectedProduct(null); setCustomProduct(""); setManualComplaints(""); setGhostUsers([]); setActiveUserId(null); setConversations({}); setAnalysis(null); setComplaints([]); };
  const goInterview = id => { setActiveUserId(id); if (!conversations[id]) setConversations(p => ({ ...p, [id]: [] })); };

  // ── RENDER ──
  return (
    <div style={{ minHeight: "100vh", background: "#F5F4F1", fontFamily: S.f, color: "#111" }}>
      <link href="https://fonts.googleapis.com/css2?family=Kaisei+Tokumin:wght@400;700&family=IBM+Plex+Mono:ital@0;1&display=swap" rel="stylesheet" />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}input:focus,textarea:focus{outline:none}button:hover{opacity:0.88}@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}.fu{animation:fadeUp .4s ease forwards}`}</style>

      {/* Header */}
      <div style={{ padding: "1.4rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div>
          <div style={{ fontFamily: S.k, fontSize: "1.3rem", color: "#111" }}>SPECTER</div>
          <div style={{ fontSize: "0.66rem", color: "#999", marginTop: "0.08rem", letterSpacing: "0.06em" }}>Ghost users built from real frustrations</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
          <div style={{ display: "flex", background: "#EEECEA", borderRadius: "8px", padding: "2px" }}>
            {["demo", "live"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ fontFamily: S.f, fontSize: "0.66rem", padding: "0.32rem 0.85rem", border: "none", borderRadius: "6px", cursor: "pointer", background: mode === m ? "#FFF" : "transparent", color: mode === m ? "#111" : "#999", fontWeight: mode === m ? 500 : 400, textTransform: "uppercase", letterSpacing: "0.06em", transition: "all 0.2s" }}>{m}</button>
            ))}
          </div>
          {phase !== "select" && <button onClick={reset} style={{ fontSize: "0.66rem", padding: "0.32rem 0.85rem", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "6px", cursor: "pointer", background: "transparent", color: "#999" }}>Start over</button>}
        </div>
      </div>

      {/* Mode notice */}
      <div style={{ padding: "0.5rem 2.5rem", background: mode === "demo" ? "rgba(196,123,43,0.04)" : "rgba(39,174,96,0.04)", borderBottom: "1px solid rgba(0,0,0,0.03)", textAlign: "center" }}>
        <span style={{ fontSize: "0.65rem", color: "#666" }}>
          {mode === "demo" ? <>Demo runs on <span style={{ color: "#C47B2B", fontWeight: 500 }}>Gemini 2.5 Flash free tier</span> — switch to Live with your own key for faster results.</> : <>Live mode uses <span style={{ color: "#27AE60", fontWeight: 500 }}>your Gemini API key</span> — calls go directly to Google.</>}
        </span>
      </div>

      <div style={{ maxWidth: "940px", margin: "0 auto", padding: "1.8rem 1.5rem" }}>
        <PhaseBar phase={phase === "summoning" ? "summon" : phase} />

        {/* ── 01 SELECT ── */}
        {phase === "select" && (
          <div className="fu">
            <div style={{ textAlign: "center", marginBottom: "2.2rem" }}>
              <h1 style={{ fontFamily: S.k, fontSize: "1.9rem", fontWeight: 400, lineHeight: 1.3, marginBottom: "0.5rem" }}>Summon the users you've never met.</h1>
              <p style={{ fontSize: "0.85rem", color: "#666", maxWidth: "460px", margin: "0 auto", lineHeight: 1.7 }}>Real complaints. Synthetic personas. Honest answers.</p>
            </div>
            {mode === "demo" ? (
              <>
                <div style={{ fontSize: "0.66rem", color: "#999", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.7rem" }}>Pick a product</div>
                <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
                  {Object.entries(DEMO_PRODUCTS).map(([k, p]) => (
                    <button key={k} onClick={() => handleSelectProduct(k)} style={{ background: "#FFF", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "12px", padding: "1.15rem", cursor: "pointer", textAlign: "left", flex: "1 1 200px", minWidth: "200px", transition: "all 0.2s" }}>
                      <div style={{ fontFamily: S.k, fontSize: "1.1rem", color: "#111", marginBottom: "0.3rem" }}>{p.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#666", lineHeight: 1.5 }}>{p.tagline}</div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ fontSize: "0.66rem", color: "#999", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.35rem" }}>Gemini API Key</label>
                  <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="AIza..." style={{ width: "100%", padding: "0.65rem 0.9rem", fontFamily: S.m, fontSize: "0.78rem", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", background: "#FFF" }} />
                  <div style={{ fontSize: "0.62rem", color: "#999", marginTop: "0.25rem" }}>Your key stays in your browser. <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" style={{ color: "#C47B2B" }}>Get a free key →</a></div>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ fontSize: "0.66rem", color: "#999", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.35rem" }}>Product Name</label>
                  <input type="text" value={customProduct} onChange={e => setCustomProduct(e.target.value)} placeholder="e.g., Figma, Notion" style={{ width: "100%", padding: "0.65rem 0.9rem", fontSize: "0.8rem", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", background: "#FFF" }} />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ fontSize: "0.66rem", color: "#999", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.35rem" }}>Paste complaints <span style={{ textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                  <textarea value={manualComplaints} onChange={e => setManualComplaints(e.target.value)} placeholder="One per line" rows={3} style={{ width: "100%", padding: "0.65rem 0.9rem", fontSize: "0.78rem", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", background: "#FFF", resize: "vertical", lineHeight: 1.7 }} />
                </div>
                <button onClick={handleSelectCustom} disabled={!apiKey || !customProduct.trim()} style={{ fontFamily: S.k, fontSize: "0.9rem", padding: "0.7rem 2rem", background: apiKey && customProduct.trim() ? "#111" : "#CCC", color: "#FFF", border: "none", borderRadius: "8px", cursor: apiKey && customProduct.trim() ? "pointer" : "not-allowed" }}>Continue</button>
              </div>
            )}
          </div>
        )}

        {/* ── 02 SUMMON ── */}
        {phase === "summon" && (
          <div className="fu" style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: S.k, fontSize: "1.4rem", fontWeight: 400, marginBottom: "0.3rem" }}>How many specters?</h2>
            <p style={{ fontSize: "0.82rem", color: "#666", marginBottom: "1.5rem" }}>Each ghost user represents a distinct frustration archetype.</p>
            <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", marginBottom: "2rem" }}>
              {[2, 3, 4].map(n => (
                <button key={n} onClick={() => setUserCount(n)} style={{ fontFamily: S.f, fontSize: "0.78rem", padding: "0.55rem 1.3rem", border: userCount === n ? "1.5px solid #C47B2B" : "1px solid rgba(0,0,0,0.1)", borderRadius: "20px", cursor: "pointer", background: userCount === n ? "rgba(196,123,43,0.08)" : "#FFF", color: userCount === n ? "#C47B2B" : "#666", fontWeight: userCount === n ? 600 : 400, transition: "all 0.2s" }}>{n} specters</button>
              ))}
            </div>
            <button onClick={handleSummon} style={{ fontFamily: S.k, fontSize: "0.95rem", padding: "0.75rem 2.2rem", background: "#111", color: "#FFF", border: "none", borderRadius: "8px", cursor: "pointer" }}>Summon</button>
          </div>
        )}

        {/* Summoning loading */}
        {phase === "summoning" && (
          <div style={{ textAlign: "center", padding: "4.5rem 0" }} className="fu">
            <div style={{ fontFamily: S.k, fontSize: "1.3rem", color: "#111", marginBottom: "0.8rem" }}>{loadMsg}<Dots /></div>
            <div style={{ width: 140, height: 2, background: "#EEECEA", margin: "0 auto", borderRadius: 1, overflow: "hidden" }}>
              <div style={{ width: "60%", height: "100%", background: "#C47B2B", animation: "pulse 1.4s ease-in-out infinite" }} />
            </div>
          </div>
        )}

        {/* ── 03 SPECTER (cards + interview) ── */}
        {phase === "specter" && (
          <div className="fu">
            {!activeUserId ? (
              <>
                <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
                  <h2 style={{ fontFamily: S.k, fontSize: "1.35rem", fontWeight: 400, marginBottom: "0.3rem" }}>{ghostUsers.length} specters summoned.</h2>
                  <p style={{ fontSize: "0.8rem", color: "#666" }}>Select a ghost user to begin interviewing.</p>
                </div>
                <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap", justifyContent: "center" }}>
                  {ghostUsers.map(u => <GhostCard key={u.id} user={u} active={false} interviewed={(conversations[u.id]?.length || 0) > 0} onClick={() => goInterview(u.id)} />)}
                </div>
                {interviewed >= 2 && (
                  <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                    <button onClick={handleSynthesize} style={{ fontFamily: S.k, fontSize: "0.85rem", padding: "0.6rem 1.6rem", background: "transparent", color: "#C47B2B", border: "1.5px solid #C47B2B", borderRadius: "8px", cursor: "pointer" }}>Synthesize ({interviewed}/{ghostUsers.length} interviewed)</button>
                  </div>
                )}
              </>
            ) : active && (
              <>
                {/* User tabs */}
                <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.3rem", overflowX: "auto" }}>
                  {ghostUsers.map(u => (
                    <button key={u.id} onClick={() => setActiveUserId(u.id)} style={{ display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.35rem 0.7rem", border: activeUserId === u.id ? "1.5px solid #C47B2B" : "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", background: activeUserId === u.id ? "rgba(196,123,43,0.04)" : "#FFF", cursor: "pointer", whiteSpace: "nowrap" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: activeUserId === u.id ? "#C47B2B" : "#EEECEA", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: S.k, fontSize: "0.5rem", color: activeUserId === u.id ? "#FFF" : "#666" }}>{u.name.split(" ").map(n => n[0]).join("")}</div>
                      <span style={{ fontSize: "0.72rem", color: activeUserId === u.id ? "#111" : "#999" }}>{u.name.split(" ")[0]}</span>
                      {(conversations[u.id]?.length || 0) > 0 && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4CAF7D" }} />}
                    </button>
                  ))}
                </div>
                {/* Context */}
                <div style={{ background: "#FFF", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontFamily: S.k, fontSize: "1rem" }}>{active.name}</div>
                    <div style={{ fontSize: "0.7rem", color: "#666", marginTop: "0.1rem" }}>{active.age} · {active.location} · {active.occupation}</div>
                  </div>
                  <div style={{ fontFamily: S.m, fontSize: "0.65rem", color: "#C47B2B", fontStyle: "italic", maxWidth: "40%", textAlign: "right" }}>"{active.coreFrustration}"</div>
                </div>
                {/* Chat */}
                <div style={{ background: "#FFF", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "12px", minHeight: 260, maxHeight: 380, overflowY: "auto", padding: "1.1rem", marginBottom: "0.7rem" }}>
                  {(!conversations[activeUserId] || !conversations[activeUserId].length) && <div style={{ textAlign: "center", padding: "2rem 1rem", color: "#999", fontSize: "0.8rem" }}>Start interviewing {active.name.split(" ")[0]}.</div>}
                  {(conversations[activeUserId] || []).map((m, i) => <Bubble key={i} msg={m} name={active.name.split(" ")[0]} />)}
                  {loading && <div style={{ fontSize: "0.72rem", color: "#999", fontStyle: "italic" }}>{active.name.split(" ")[0]} is thinking<Dots /></div>}
                  <div ref={chatEnd} />
                </div>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <input ref={inputRef} type="text" value={inputMsg} onChange={e => setInputMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder={`Ask ${active.name.split(" ")[0]} anything...`} style={{ flex: 1, padding: "0.7rem 0.9rem", fontSize: "0.8rem", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", background: "#FFF" }} />
                  <button onClick={handleSend} disabled={!inputMsg.trim() || loading} style={{ padding: "0.7rem 1.2rem", fontSize: "0.78rem", background: inputMsg.trim() && !loading ? "#111" : "#CCC", color: "#FFF", border: "none", borderRadius: "8px", cursor: inputMsg.trim() && !loading ? "pointer" : "not-allowed", fontWeight: 500 }}>Send</button>
                </div>
                <div style={{ display: "flex", gap: "0.35rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                  {["What frustrates you most?", "What would make you stay?", "What alternatives have you tried?", "Would you pay more for a fix?"].map(q => (
                    <button key={q} onClick={() => setInputMsg(q)} style={{ fontSize: "0.65rem", padding: "0.25rem 0.6rem", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "6px", background: "#F5F4F1", color: "#666", cursor: "pointer" }}>{q}</button>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.3rem", paddingTop: "1rem", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                  <button onClick={() => setActiveUserId(null)} style={{ fontSize: "0.72rem", color: "#999", background: "transparent", border: "none", cursor: "pointer" }}>← All specters</button>
                  {interviewed >= 2 && <button onClick={handleSynthesize} style={{ fontFamily: S.k, fontSize: "0.8rem", padding: "0.45rem 1.2rem", background: "transparent", color: "#C47B2B", border: "1.5px solid #C47B2B", borderRadius: "8px", cursor: "pointer" }}>Synthesize</button>}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── 04 SYNTHESIZE ── */}
        {phase === "synthesize" && (
          <div className="fu">
            <div style={{ textAlign: "center", marginBottom: "1.3rem" }}>
              <h2 style={{ fontFamily: S.k, fontSize: "1.35rem", fontWeight: 400, marginBottom: "0.3rem" }}>Synthesize</h2>
              <p style={{ fontSize: "0.8rem", color: "#666" }}>{product?.name || customProduct} — {interviewed} specters</p>
            </div>
            {loading ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}><div style={{ fontFamily: S.k, fontSize: "1.1rem" }}>{loadMsg}<Dots /></div></div>
            ) : analysis && (
              <div>
                <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", marginBottom: "1.3rem" }}>
                  {[{ k: "affinity", l: "Affinity Map" }, { k: "graph", l: "Insight Graph" }].map(t => (
                    <button key={t.k} onClick={() => setSynthTab(t.k)} style={{ fontSize: "0.7rem", padding: "0.4rem 1rem", border: synthTab === t.k ? "1.5px solid #C47B2B" : "1px solid rgba(0,0,0,0.08)", borderRadius: "20px", cursor: "pointer", background: synthTab === t.k ? "rgba(196,123,43,0.06)" : "#FFF", color: synthTab === t.k ? "#C47B2B" : "#999", fontWeight: synthTab === t.k ? 600 : 400 }}>{t.l}</button>
                  ))}
                </div>

                {synthTab === "affinity" && analysis.affinity && (
                  <div style={{ overflowX: "auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: `170px repeat(${ghostUsers.length}, 1fr)`, gap: 0, minWidth: ghostUsers.length > 3 ? "700px" : "auto" }}>
                      <div style={{ padding: "0.6rem" }} />
                      {ghostUsers.map(u => (
                        <div key={u.id} style={{ padding: "0.5rem 0.4rem", textAlign: "center", borderBottom: "2px solid rgba(0,0,0,0.08)" }}>
                          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#C47B2B", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: S.k, fontSize: "0.65rem", color: "#FFF", margin: "0 auto 0.25rem" }}>{u.name.split(" ").map(n => n[0]).join("")}</div>
                          <div style={{ fontFamily: S.k, fontSize: "0.78rem" }}>{u.name}</div>
                          <div style={{ fontSize: "0.58rem", color: "#999" }}>{u.age} · {u.occupation.split(",")[0]}</div>
                        </div>
                      ))}
                    </div>
                    {analysis.affinity.map((th, ti) => {
                      const cnt = ghostUsers.filter(u => th.quotes?.[u.id] && th.quotes[u.id] !== null && th.quotes[u.id] !== "null").length;
                      return (
                        <div key={ti} style={{ display: "grid", gridTemplateColumns: `170px repeat(${ghostUsers.length}, 1fr)`, gap: 0, borderBottom: "1px solid rgba(0,0,0,0.04)", minWidth: ghostUsers.length > 3 ? "700px" : "auto" }}>
                          <div style={{ padding: "0.7rem 0.6rem", borderRight: "1px solid rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.15rem" }}>
                              <div style={{ width: 6, height: 6, borderRadius: 2, background: SEV[th.severity] || "#999" }} />
                              <span style={{ fontSize: "0.55rem", color: SEV[th.severity] || "#999", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{th.severity}</span>
                            </div>
                            <span style={{ fontSize: "0.73rem", color: "#111", lineHeight: 1.3, fontWeight: 500 }}>{th.label}</span>
                            <span style={{ fontSize: "0.55rem", color: "#999", marginTop: "0.1rem" }}>{cnt}/{ghostUsers.length}</span>
                          </div>
                          {ghostUsers.map(u => {
                            const q = th.quotes?.[u.id];
                            const has = q && q !== null && q !== "null";
                            return (
                              <div key={u.id} style={{ padding: "0.5rem 0.4rem", borderRight: "1px solid rgba(0,0,0,0.03)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 65 }}>
                                {has ? (
                                  <div style={{ background: "#FFF", borderLeft: `3px solid ${SEV[th.severity] || "#999"}`, borderRadius: "6px", padding: "0.45rem 0.55rem", width: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                                    <p style={{ fontFamily: S.m, fontSize: "0.63rem", color: "#333", lineHeight: 1.5, fontStyle: "italic" }}>"{q}"</p>
                                  </div>
                                ) : (
                                  <div style={{ width: "100%", minHeight: 45, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", background: "repeating-linear-gradient(45deg,transparent,transparent 4px,rgba(0,0,0,0.01) 4px,rgba(0,0,0,0.01) 8px)" }}>
                                    <span style={{ fontSize: "0.58rem", color: "#CCC" }}>—</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}

                {synthTab === "graph" && analysis.graph && (
                  <div>
                    <div style={{ display: "flex", gap: "0.7rem", justifyContent: "center", marginBottom: "0.6rem", flexWrap: "wrap" }}>
                      {[{ l: "Problem", c: "#C0392B" }, { l: "Effect", c: "#1A1A2E" }, { l: "Behavior", c: "#C47B2B" }, { l: "Outcome", c: "#E67E22" }, { l: "Blocker", c: "#999" }, { l: "Opportunity", c: "#27AE60" }].map(i => (
                        <div key={i.l} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: i.c }} /><span style={{ fontSize: "0.58rem", color: "#999" }}>{i.l}</span></div>
                      ))}
                    </div>
                    <InsightGraph data={analysis.graph} />
                  </div>
                )}

                <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                  <button onClick={() => { setPhase("share"); setActiveTension(0); setShareVariant("dark"); }} style={{ fontFamily: S.k, fontSize: "0.88rem", padding: "0.65rem 1.8rem", background: "#111", color: "#FFF", border: "none", borderRadius: "8px", cursor: "pointer" }}>Generate Tension Cards →</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── 05 SHARE ── */}
        {phase === "share" && analysis?.tensions && (
          <div className="fu">
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: S.k, fontSize: "1.35rem", fontWeight: 400, marginBottom: "0.3rem" }}>Share</h2>
              <p style={{ fontSize: "0.8rem", color: "#666", maxWidth: "400px", margin: "0 auto", lineHeight: 1.6 }}>The contradictions your research uncovered. Pick a style. Screenshot it. Start a conversation.</p>
            </div>

            {/* Tension selector */}
            {analysis.tensions.length > 1 && (
              <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", marginBottom: "1.2rem" }}>
                {analysis.tensions.map((_, i) => (
                  <button key={i} onClick={() => setActiveTension(i)} style={{ fontSize: "0.7rem", padding: "0.35rem 0.9rem", border: activeTension === i ? "1.5px solid #C47B2B" : "1px solid rgba(0,0,0,0.08)", borderRadius: "20px", cursor: "pointer", background: activeTension === i ? "rgba(196,123,43,0.06)" : "#FFF", color: activeTension === i ? "#C47B2B" : "#999", fontWeight: activeTension === i ? 600 : 400 }}>Tension {i + 1}</button>
                ))}
              </div>
            )}

            {/* Variant selector */}
            <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", marginBottom: "1.5rem" }}>
              {[{ k: "dark", l: "Dark Editorial" }, { k: "light", l: "Light Minimal" }, { k: "bold", l: "Bold Contrast" }, { k: "data", l: "Data Forward" }].map(v => (
                <button key={v.k} onClick={() => setShareVariant(v.k)} style={{ fontSize: "0.66rem", padding: "0.32rem 0.8rem", border: shareVariant === v.k ? "1.5px solid #C47B2B" : "1px solid rgba(0,0,0,0.08)", borderRadius: "6px", cursor: "pointer", background: shareVariant === v.k ? "rgba(196,123,43,0.06)" : "#FFF", color: shareVariant === v.k ? "#C47B2B" : "#999", fontWeight: shareVariant === v.k ? 500 : 400 }}>{v.l}</button>
              ))}
            </div>

            {/* Card */}
            <TensionCard t={analysis.tensions[activeTension]} variant={shareVariant} product={product?.name || customProduct} />

            {/* Export options */}
            <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
              {["📋 Copy as text", "📸 Export as PNG", "📄 Copy as Markdown"].map(a => (
                <button key={a} style={{ fontSize: "0.72rem", padding: "0.5rem 1rem", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", background: "#FFF", color: "#666", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>{a}</button>
              ))}
            </div>

            {/* Nav */}
            <div style={{ display: "flex", gap: "0.7rem", justifyContent: "center", marginTop: "1.5rem", paddingTop: "1.2rem", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
              <button onClick={() => setPhase("synthesize")} style={{ fontSize: "0.75rem", padding: "0.5rem 1.1rem", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", background: "transparent", color: "#666", cursor: "pointer" }}>← Back to Synthesize</button>
              <button onClick={reset} style={{ fontSize: "0.75rem", padding: "0.5rem 1.1rem", border: "none", borderRadius: "8px", background: "#111", color: "#FFF", cursor: "pointer" }}>New research</button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: "3.5rem", paddingTop: "1.3rem", borderTop: "1px solid rgba(0,0,0,0.05)", textAlign: "center" }}>
          <p style={{ fontSize: "0.65rem", color: "#999", lineHeight: 1.8 }}>
            SPECTER creates synthetic users grounded in real complaint data.<br />
            Ghost users are AI personas — not real people. Insights are directional, not definitive.<br />
            <span style={{ color: "#C47B2B" }}>Built by Abhijeet Sant</span> · 2026
          </p>
        </div>
      </div>
    </div>
  );
}
