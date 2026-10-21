import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const whatsapp = "https://wa.me/919211412456?text=Hello%20Trading%20Science%2C%0A%0AI%E2%80%99m%20really%20interested%20in%20understanding%20your%20working%20model.%20Could%20you%20please%20tell%20me%20more%20about%20how%20you%20operate%3F";
const courses = [
  ["Course overview", "courses/index.html"],
  ["Beginner stock market course", "courses/stock-market-course-for-beginners/index.html"],
  ["Medium technical analysis", "courses/technical-analysis-course/index.html"],
  ["Advanced technical analysis", "courses/advanced-trading-course/index.html"],
  ["Price action", "courses/price-action-course/index.html"],
  ["Options and open interest", "courses/options-open-interest-course/index.html"],
  ["Risk management", "courses/risk-management-course/index.html"],
  ["Trading psychology", "courses/trading-psychology-course/index.html"],
  ["Live chart review", "courses/live-chart-review/index.html"]
];
const articles = [
  ["Learning blog", "blog/index.html"],
  ["Beginner guide", "blog/how-to-learn-stock-market-for-beginners-india/index.html"],
  ["Technical analysis learning path", "blog/technical-analysis-learning-path/index.html"],
  ["Risk management for new traders", "blog/risk-management-for-new-traders/index.html"],
  ["Trading psychology and discipline", "blog/trading-psychology-discipline/index.html"],
  ["Price action vs indicators", "blog/price-action-vs-indicators/index.html"],
  ["One-to-one learning", "blog/one-to-one-stock-market-learning/index.html"],
  ["Stock market training in Noida", "blog/stock-market-training-noida/index.html"],
  ["Share market training in Delhi", "blog/share-market-trading-training-delhi/index.html"]
];
const cities = ["Ahmedabad", "Bengaluru", "Bhopal", "Chandigarh", "Chennai", "Coimbatore", "Delhi", "Gurugram", "Hyderabad", "Indore", "Jaipur", "Kochi", "Kolkata", "Lucknow", "Mumbai", "Nagpur", "Noida", "Patna", "Pune", "Surat"];
const locations = cities.map((city) => [city, `locations/stock-market-course-${city.toLowerCase()}/index.html`]);
const info = [
  ["About Trading Science", "about-us/index.html"],
  ["About Kundan Kumar", "about-founder/index.html"],
  ["Vision and Mission", "mission/index.html"],
  ["Contact and booking", "contact/index.html"],
  ["Privacy Policy", "privacy-policy/index.html"],
  ["Terms of Use", "terms/index.html"],
  ["Accessibility Statement", "accessibility/index.html"]
];

function prefixFor(file) {
  const depth = relative(root, dirname(file)).split(/[\\/]/).filter(Boolean).length;
  return depth ? "../".repeat(depth) : "";
}

function group(prefix, title, links) {
  return `<section class="site-nav-group"><h2>${title}</h2>${links.map(([label, path]) => `<a href="${prefix}${path}">${label}</a>`).join("")}</section>`;
}

function navMarkup(prefix) {
  return `<header class="topbar"><nav class="container nav" aria-label="Main navigation"><a class="brand" href="${prefix}index.html" aria-label="Trading Science home"><img src="${prefix}assets/trading-science-logo.png" alt="Trading Science logo"><span>Trading Science</span></a><button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">Menu</button><div class="links"><a href="${prefix}index.html">Home</a><a href="${prefix}about-founder/index.html">Founder</a><a href="${prefix}courses/index.html">Courses</a><a href="${prefix}mission/index.html">Mission</a><a href="${prefix}blog/index.html">Blog</a><a href="${prefix}contact/index.html">Contact</a><details class="site-explore-menu"><summary>Explore</summary><div class="site-nav-panel"><div class="site-nav-groups">${group(prefix, "About", info)}${group(prefix, "Courses", courses)}${group(prefix, "Articles", articles)}${group(prefix, "Locations", locations)}</div></div></details></div><div class="actions"><a class="btn" href="${whatsapp}">Chat with Consultant</a></div></nav></header>`;
}

function syncHomePage(file) {
  let html = readFileSync(file, "utf8");
  if (!html.includes("class=\"site-explore-menu\"")) {
    const coursesLink = '<li class="navbar1_menu-link-item"><a class="navbar6_link" href="/courses/">Courses</a></li>';
    const missionLink = '<li class="navbar1_menu-link-item"><a class="navbar6_link" href="mission/index.html">Mission</a></li>';
    const explore = `<li class="navbar1_menu-link-item"><details class="site-explore-menu"><summary class="navbar6_link">Explore</summary><div class="site-nav-panel"><div class="site-nav-groups">${group("", "About", info)}${group("", "Courses", courses)}${group("", "Articles", articles)}${group("", "Locations", locations)}</div></div></details></li>`;
    html = html.replace(coursesLink, `${coursesLink}${missionLink}${explore}`);
    html = html.replace('href="/blog/"', 'href="blog/index.html"');
    html = html.replace(/href="https:\/\/wa\.me\/919211412456\?text=Hello%20Trading%20Science%2C%20I%20want%20to%20book%20a%201-to-1%20Zoom%20session\."(?=[^>]*>Contact<)/, 'href="contact/index.html"');
  }
  if (!html.includes('href="site-header.css"')) {
    html = html.replace("</head>", '<link rel="stylesheet" href="site-header.css"></head>');
  }
  writeFileSync(file, html);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : path.endsWith(".html") ? [path] : [];
  });
}

const home = join(root, "index.html");
syncHomePage(home);

for (const file of walk(root).filter((path) => path !== home)) {
  const html = readFileSync(file, "utf8");
  if (!html.includes("<header class=\"topbar\">")) continue;
  const prefix = prefixFor(file);
  let updated = html.replace(/<header class="topbar">[\s\S]*?<\/header>/, navMarkup(prefix));
  if (!updated.includes(`${prefix}site-header.css`)) {
    updated = updated.replace(`<link rel="stylesheet" href="${prefix}styles.css">`, `<link rel="stylesheet" href="${prefix}styles.css">\n  <link rel="stylesheet" href="${prefix}site-header.css">`);
  }
  writeFileSync(file, updated);
}
