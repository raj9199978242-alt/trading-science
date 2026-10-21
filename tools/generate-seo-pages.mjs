import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const baseUrl = "https://www.tradingscience.in";
const logo = "assets/trading-science-logo.png";
const hero = "assets/stock-market-hero-1.avif";
const whatsapp = "https://wa.me/919211412456?text=Hello%20Trading%20Science%2C%0A%0AI%E2%80%99m%20really%20interested%20in%20understanding%20your%20working%20model.%20Could%20you%20please%20tell%20me%20more%20about%20how%20you%20operate%3F";

const pages = [];

function relPrefix(path) {
  const depth = path.split("/").filter(Boolean).length - 1;
  return depth <= 0 ? "" : "../".repeat(depth);
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function layout({ path, title, description, eyebrow, h1, lead, body, schema }) {
  const prefix = relPrefix(path);
  const canonical = `${baseUrl}/${path.replace(/index\.html$/, "")}`;
  pages.push(canonical);
  const json = schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : "";
  return `<!doctype html>
<html lang="en-IN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${baseUrl}/${logo}">
  <meta name="theme-color" content="#10283d">
  <link rel="icon" href="${prefix}favicon.ico" sizes="32x32">
  <link rel="icon" href="${prefix}assets/favicon-16.png" sizes="16x16" type="image/png">
  <link rel="icon" href="${prefix}assets/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="icon" href="${prefix}assets/favicon-48.png" sizes="48x48" type="image/png">
  <link rel="icon" href="${prefix}assets/favicon-96.png" sizes="96x96" type="image/png">
  <link rel="icon" href="${prefix}assets/favicon-192.png" sizes="192x192" type="image/png">
  <link rel="apple-touch-icon" href="${prefix}assets/apple-touch-icon.png" sizes="180x180">
  <link rel="manifest" href="${prefix}site.webmanifest">
  <link rel="stylesheet" href="${prefix}styles.css">
  ${json}
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="topbar">
    <nav class="container nav" aria-label="Main navigation">
      <a class="brand" href="${prefix}index.html"><img src="${prefix}${logo}" alt="Trading Science logo"><span>Trading Science</span></a>
      <button class="menu-toggle" type="button" aria-label="Open menu">Menu</button>
      <div class="links">
        <a href="${prefix}index.html">Home</a>
        <a href="${prefix}about-founder/index.html">Founder</a>
        <a href="${prefix}courses/index.html">Courses</a>
        <a href="${prefix}mission/index.html">Mission</a>
        <a href="${prefix}blog/index.html">Blog</a>
        <a href="${prefix}contact/index.html">Contact</a>
      </div>
      <div class="actions"><a class="btn" href="${whatsapp}">Chat with Consultant</a></div>
    </nav>
  </header>
  <main id="main">
    <section class="page-hero">
      <div class="container hero-grid">
        <div class="reveal">
          <p class="eyebrow">${esc(eyebrow)}</p>
          <h1>${esc(h1)}</h1>
          <p class="lead">${esc(lead)}</p>
          <div class="hero-actions">
            <a class="btn" href="${whatsapp}">Chat with Consultant</a>
            <a class="btn secondary" href="${prefix}courses/index.html">View Courses</a>
          </div>
        </div>
        <div class="hero-photo reveal"><img src="${prefix}${hero}" alt="Stock market learning visual"></div>
      </div>
    </section>
    ${body(prefix)}
  </main>
  <footer class="footer">
    <div class="container footer-grid">
      <div><img src="${prefix}${logo}" alt="Trading Science logo"><p>Trading Science - Learn. Analyse. Trade.</p><p>One-to-one stock market education through live Zoom sessions.</p></div>
      <div><h3>Courses</h3><a href="${prefix}courses/index.html">Course Details</a><a href="${prefix}courses/stock-market-course-for-beginners/index.html">Beginner Level</a><a href="${prefix}courses/technical-analysis-course/index.html">Intermediate Level</a><a href="${prefix}courses/advanced-trading-course/index.html">Advanced Level</a></div>
      <div><h3>Trading Science</h3><a href="${prefix}about-founder/index.html">About Kundan Kumar</a><a href="${prefix}mission/index.html">Vision and Mission</a><a href="${prefix}blog/index.html">Learning Blog</a><a href="${prefix}contact/index.html">Contact</a></div>
      <div><h3>Booking</h3><a href="${whatsapp}">WhatsApp 92114 12456</a><a href="${prefix}contact/index.html">Contact Page</a><p>Education only. No investment advice, tips, calls, or guaranteed outcomes.</p></div>
    </div>
    <div class="container footer-social"><a class="footer-x-link" href="https://x.com/1tradingscience" target="_blank" rel="noopener noreferrer" aria-label="Follow Trading Science on X"><svg class="footer-x-logo" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a></div>
    <div class="container bottom">© 2026 Trading Science. All rights reserved.</div>
  </footer>
  <script src="${prefix}script.js" defer></script>
</body>
</html>`;
}

function writePage(path, html) {
  const target = join(root, path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
}

const courseTopics = {
  beginner: ["Financial and stock markets", "Stocks, ETFs and other instruments", "NSE, BSE and market participants", "Orders, brokers and trading workflow", "Market terminology", "Reading charts and candlesticks", "Risk management basics", "Trading psychology"],
  intermediate: ["Market structure and trends", "Support and resistance", "Candlestick and chart patterns", "Volume analysis", "Moving averages", "RSI, MACD, VWAP and indicators", "Fibonacci analysis", "Breakouts and pullbacks", "Multi-timeframe analysis", "Entry, exit and stop-loss techniques", "Backtesting and trading journals"],
  advanced: ["Advanced market structure", "Price action and supply demand", "Liquidity and breakout analysis", "Advanced volume and VWAP", "Options and Open Interest", "Advanced trade management", "Position sizing and risk management", "Strategy development", "Backtesting and performance analysis", "Live market case studies", "Personal trading plan"]
};

function chips(items) {
  return `<div class="cards">${items.map((item) => `<div class="card"><h3>${esc(item)}</h3><p>Learn the concept through examples, chart discussion, and guided Q&amp;A.</p></div>`).join("")}</div>`;
}

function courseLevelCard(level, title, why, application, topics) {
  return `<article class="level-card reveal"><div class="level-number">${level}</div><h2>${title}</h2><p class="level-note"><strong>Why learn this:</strong> ${why}</p><p class="level-note"><strong>Application:</strong> ${application}</p><ul>${topics.map((topic) => `<li>${esc(topic)}</li>`).join("")}</ul></article>`;
}

function courseLevelsBody() {
  return `<section class="section course-level-section"><div class="container"><div class="section-head reveal"><p class="eyebrow">Stock Market Course</p><h2>Three clear levels, taught one-to-one.</h2><p class="lead">Learn what you need at your own pace through personalised live sessions. Start with the basics, move into technical analysis, then build a responsible trading system.</p></div><div class="level-grid">${courseLevelCard("01", "Beginner - Build Your Foundation", "You need a clear base before reading charts, placing orders, or discussing strategies.", "Understand market language, basic instruments, chart reading, and risk before entering deeper topics.", courseTopics.beginner)}${courseLevelCard("02", "Intermediate - Learn Technical Analysis", "Technical analysis helps you understand market structure instead of reacting randomly to price movement.", "Analyse trends, levels, patterns, indicators, entries, exits, and stop-loss planning with structure.", courseTopics.intermediate)}${courseLevelCard("03", "Advanced - Build Your Trading System", "Advanced learning connects price action, risk, psychology, and review into a repeatable process.", "Create a personal trading plan, manage positions responsibly, study live cases, and review performance.", courseTopics.advanced)}</div><div class="section soft session-panel"><div class="container"><h2>How the session works</h2><div class="cards"><div class="card"><h3>1. Share your level</h3><p>Tell us whether you are new, intermediate, or already trading.</p></div><div class="card"><h3>2. Pick your topics</h3><p>Choose the exact areas where you want clarity, practice, or review.</p></div><div class="card"><h3>3. Learn live</h3><p>Join a one-to-one Zoom session and work through concepts with examples.</p></div></div></div></div></div></section>`;
}

const courses = [
  ["courses/index.html", "Stock Market Courses | Trading Science", "Explore beginner, technical analysis, price action, risk management, psychology, and advanced trading courses through one-to-one Zoom sessions.", "Courses", "Stock market courses built around your questions", "Choose a structured level or book a focused topic-wise session with Kundan Kumar.", [...courseTopics.beginner, ...courseTopics.intermediate.slice(0, 4)]],
  ["courses/stock-market-course-for-beginners/index.html", "Stock Market Course for Beginners | Trading Science", "Beginner stock market course covering financial markets, NSE, BSE, orders, brokers, charts, candlesticks, risk basics, and trading psychology.", "Beginner Course", "Stock Market Course for Beginners", "Start from zero and build a clean foundation before moving into technical analysis.", courseTopics.beginner],
  ["courses/technical-analysis-course/index.html", "Technical Analysis Course | Trading Science", "Learn technical analysis through market structure, support and resistance, chart patterns, indicators, breakouts, pullbacks, and journals.", "Technical Analysis", "Technical Analysis Course", "Learn how to read charts with structure, context, and risk awareness.", courseTopics.intermediate],
  ["courses/advanced-trading-course/index.html", "Advanced Trading Course | Trading Science", "Advanced trading course for price action, liquidity, options, open interest, trade management, strategy development, and live case studies.", "Advanced Course", "Advanced Trading Course", "Build a personal trading framework from price action, risk, and review routines.", courseTopics.advanced],
  ["courses/price-action-course/index.html", "Price Action Course | Trading Science", "Learn price action, supply and demand, support resistance, breakouts, pullbacks, and chart reading through one-to-one sessions.", "Price Action", "Price Action Course", "Understand market movement without depending only on indicators.", ["Candlestick behaviour", "Market structure", "Supply and demand zones", "Breakout context", "Pullback planning", "Chart review practice"]],
  ["courses/options-open-interest-course/index.html", "Options and Open Interest Course | Trading Science", "Learn options basics, open interest, option chain reading, risk, and trade planning through educational one-to-one sessions.", "Options Learning", "Options and Open Interest Course", "Study options and OI as learning concepts, with risk awareness before strategy discussion.", ["Options basics", "Calls and puts", "Open Interest", "Option chain reading", "Risk in F&O", "Position sizing", "Scenario planning"]],
  ["courses/risk-management-course/index.html", "Risk Management Course for Traders | Trading Science", "Learn position sizing, stop-loss planning, risk limits, trading journals, and performance review for responsible market participation.", "Risk Management", "Risk Management Course", "Create rules that protect decision quality and reduce impulsive trading.", ["Risk per trade", "Position sizing", "Stop-loss planning", "Risk-reward", "Daily limits", "Journaling", "Performance review"]],
  ["courses/trading-psychology-course/index.html", "Trading Psychology Course | Trading Science", "Learn trading psychology, discipline, patience, overtrading control, and decision routines through one-to-one coaching sessions.", "Psychology", "Trading Psychology Course", "Work on the behaviour side of trading: patience, discipline, and review.", ["Fear and greed", "Overtrading", "Revenge trading", "Patience", "Decision checklist", "Routine building"]],
  ["courses/live-chart-review/index.html", "Live Chart Review Sessions | Trading Science", "Bring your charts, trades, or doubts to a live one-to-one Zoom review focused on learning and analysis, not tips or guarantees.", "Chart Review", "Live Chart Review Sessions", "Bring difficult charts and learn how to analyse them step by step.", ["Chart doubts", "Trade review", "Entry and exit logic", "Trend context", "Risk review", "Learning notes"]]
];

for (const [path, title, description, eyebrow, h1, lead, topics] of courses) {
  writePage(path, layout({
    path, title, description, eyebrow, h1, lead,
    schema: { "@context": "https://schema.org", "@type": "Course", name: h1, description },
    body: () => path === "courses/index.html" ? courseLevelsBody() : `<section class="section"><div class="container"><div class="section-head reveal"><p class="eyebrow">What You Can Learn</p><h2>Course contents</h2><p class="lead">Each topic can become a dedicated hourly live session. The path stays flexible so you can learn at your own pace.</p></div>${chips(topics)}<div class="section soft"><div class="container"><h2>How the session works</h2><div class="cards"><div class="card"><h3>1. Share your level</h3><p>Tell us whether you are a beginner, intermediate learner, or already trading.</p></div><div class="card"><h3>2. Select topics</h3><p>Pick the exact areas where you need clarity, practice, or review.</p></div><div class="card"><h3>3. Learn live</h3><p>Join a one-to-one Zoom session and work through concepts with examples.</p></div></div></div></div></div></section>`
  }));
}

writePage("about-founder/index.html", layout({
  path: "about-founder/index.html",
  title: "Kundan Kumar | Founder and CEO of Trading Science",
  description: "Learn about Kundan Kumar, Founder and CEO of Trading Science, an MBA in Finance with market experience since 2008.",
  eyebrow: "Founder",
  h1: "Kundan Kumar, Founder and CEO",
  lead: "An MBA in Finance with more than 16 years of market experience, focused on practical stock market education.",
  schema: { "@context": "https://schema.org", "@type": "Person", name: "Kundan Kumar", jobTitle: "Founder and CEO", worksFor: { "@type": "EducationalOrganization", name: "Trading Science" } },
  body: (p) => `<section class="section"><div class="container grid-2"><div class="reveal"><p class="eyebrow">Founder’s Journey</p><h2>Practical market learning, explained simply</h2><p class="lead">Mr. Kundan Kumar is an MBA in Finance with more than 16 years of experience in the stock market. He has worked in managerial roles within the brokerage industry since 2008, building practical experience in technical analysis, market behaviour, and trading psychology.</p><p>Through Trading Science, he helps learners develop knowledge, confidence, and discipline. The focus is education and decision quality, not tips or unrealistic promises.</p></div><div class="founder-card reveal"><img src="${p}assets/kundan-kumar-formal.jpg" alt="Kundan Kumar, Founder and CEO of Trading Science"></div></div></section>`
}));

const blogs = [
  ["how-to-learn-stock-market-for-beginners-india", "How to Learn the Stock Market as a Beginner in India", "A practical beginner path covering markets, brokers, charts, risk, and psychology."],
  ["technical-analysis-learning-path", "Technical Analysis Learning Path: From Charts to Trade Planning", "A step-by-step path for learning chart reading, trends, support resistance, and indicators."],
  ["risk-management-for-new-traders", "Risk Management for New Traders", "Why risk, position sizing, and journaling matter before strategies."],
  ["trading-psychology-discipline", "Trading Psychology: Building Discipline Before Strategy", "How patience, process, and emotional control shape trading decisions."],
  ["price-action-vs-indicators", "Price Action vs Indicators: What Should Beginners Learn First?", "How to combine raw price behaviour with useful indicators."],
  ["one-to-one-stock-market-learning", "Why One-to-One Stock Market Learning Works for Busy Learners", "How personalised sessions help learners focus on their actual doubts."]
];

writePage("blog/index.html", layout({
  path: "blog/index.html",
  title: "Stock Market Learning Blog | Trading Science",
  description: "Educational blogs on stock market basics, technical analysis, price action, risk management, trading psychology, and one-to-one learning.",
  eyebrow: "Blog",
  h1: "Stock market learning articles",
  lead: "Guides for learners who want practical, disciplined market education.",
  schema: { "@context": "https://schema.org", "@type": "Blog", name: "Trading Science Blog" },
  body: (p) => `<section class="section"><div class="container"><div class="cards">${blogs.map(([slug, title, desc]) => `<article class="card"><h3>${esc(title)}</h3><p>${esc(desc)}</p><a class="btn secondary" href="${p}blog/${slug}/index.html">Read article</a></article>`).join("")}</div></div></section>`
}));

writePage("mission/index.html", layout({
  path: "mission/index.html",
  title: "Vision and Mission | Trading Science",
  description: "Trading Science exists to make practical stock market education accessible through personalised one-to-one learning, clear concepts, risk awareness, and disciplined decision-making.",
  eyebrow: "Vision and Mission",
  h1: "Stock market education without unnecessary barriers",
  lead: "Trading Science helps learners understand markets with clarity, discipline, and personal guidance, without pressure, false promises, or confusing finance jargon.",
  schema: { "@context": "https://schema.org", "@type": "EducationalOrganization", name: "Trading Science", slogan: "Learn. Analyse. Trade." },
  body: () => `<section class="section"><div class="container grid-2"><div class="reveal"><p class="eyebrow">Our Vision</p><h2>Make market learning practical and accessible</h2><p class="lead">Many people want to learn the stock market but get stuck between random videos, complicated terminology, expensive fixed packages, and unrealistic claims. Trading Science is built to remove those barriers.</p><p>Our vision is to help learners build real understanding: how markets work, how charts are read, how risk is managed, and how disciplined decisions are made.</p></div><div class="card reveal"><h3>What we do not promise</h3><p>No guaranteed profit, no tips, no calls, no investment advice, and no pressure to buy a long package.</p><h3>What we focus on</h3><p>Concept clarity, chart practice, risk awareness, trading psychology, and one-to-one guidance based on the learner's actual questions.</p></div></div></section><section class="section soft"><div class="container"><div class="section-head reveal"><p class="eyebrow">Our Mission</p><h2>Educate learners to think before they trade</h2><p class="lead">We want every learner to understand the reason behind an analysis, not just copy an answer.</p></div><div class="cards"><div class="card"><h3>Personalised Learning</h3><p>Start from your current level and learn the topics that matter to you.</p></div><div class="card"><h3>Responsible Market Education</h3><p>Understand risk, uncertainty, and decision-making before focusing on strategies.</p></div><div class="card"><h3>Accessible Online Sessions</h3><p>Learn live through Zoom from anywhere in India, topic by topic, at your pace.</p></div></div></div></section>`
}));

for (const [slug, title, desc] of blogs) {
  writePage(`blog/${slug}/index.html`, layout({
    path: `blog/${slug}/index.html`, title: `${title} | Trading Science`, description: desc, eyebrow: "Learning Guide", h1: title, lead: desc,
    schema: { "@context": "https://schema.org", "@type": "Article", headline: title, description: desc },
    body: () => `<article class="section"><div class="container grid-2"><div><h2>What this guide covers</h2><p class="lead">${esc(desc)}</p><p>Stock market learning becomes easier when you follow a structured path instead of jumping between random videos, tips, and social media opinions. Start with concepts, then charts, then risk, then review.</p><p>At Trading Science, the purpose of every session is to improve understanding. We avoid profit guarantees and focus on process, discipline, market context, and responsible learning.</p></div><div class="card"><h3>Suggested session topics</h3><p>Bring your current doubts, charts, trades, or notes. We can turn them into a focused one-to-one session.</p><a class="btn" href="../../contact/index.html">Book a Session</a></div></div></article>`
  }));
}

const cities = ["Delhi", "Noida", "Gurugram", "Mumbai", "Pune", "Hyderabad", "Bengaluru", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Indore", "Surat", "Nagpur", "Patna", "Chandigarh", "Bhopal", "Kochi", "Coimbatore"];
for (const city of cities) {
  const slug = city.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  writePage(`locations/stock-market-course-${slug}/index.html`, layout({
    path: `locations/stock-market-course-${slug}/index.html`,
    title: `Stock Market Course in ${city} | Live 1-to-1 Zoom Learning`,
    description: `Learn stock market basics, technical analysis, price action, risk management, and trading psychology from ${city} through live one-to-one Zoom sessions.`,
    eyebrow: `${city} Learners`,
    h1: `Stock Market Course in ${city}`,
    lead: `Live one-to-one stock market learning for learners in ${city}, with hourly sessions based on the topics you want to understand.`,
    schema: { "@context": "https://schema.org", "@type": "Course", name: `Stock Market Course in ${city}`, areaServed: city },
    body: () => `<section class="section"><div class="container"><div class="section-head"><p class="eyebrow">Online Learning</p><h2>Learn from ${esc(city)} without relocating</h2><p class="lead">Book topic-wise Zoom sessions for beginner basics, technical analysis, options concepts, risk management, trading psychology, and live chart review.</p></div><div class="cards"><div class="card"><h3>Beginner friendly</h3><p>Start with market basics, NSE/BSE, orders, brokers, and terminology.</p></div><div class="card"><h3>Technical analysis</h3><p>Study charts, trends, support resistance, indicators, and trade planning.</p></div><div class="card"><h3>Flexible hourly model</h3><p>Pay based on the topic and time required instead of a fixed long package.</p></div></div></div></section>`
  }));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[`${baseUrl}/`, ...pages].map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`;
writeFileSync(join(root, "sitemap.xml"), sitemap);
writeFileSync(join(root, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`);
