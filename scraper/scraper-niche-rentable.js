#!/usr/bin/env node
'use strict';

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const os    = require('os');
const path  = require('path');

const OUTPUT_FILE = path.join(process.cwd(), 'niche-rentable.html');

// ================================================================
// LISTE A — GRANDS MÉDIAS (trafic 1M+)
// Signal : forte demande → quels outils ils recommandent = outils populaires
// ================================================================
const DEMAND_SITES = [
  { name: 'Forbes Advisor',   url: 'https://www.forbes.com/advisor/business/software/', traffic:'62M/mois' },
  { name: 'PCMag',            url: 'https://www.pcmag.com/picks',                       traffic:'18.7M/mois' },
  { name: 'TechRadar',        url: 'https://www.techradar.com/best',                    traffic:'15.8M/mois' },
  { name: 'NerdWallet Biz',   url: 'https://www.nerdwallet.com/best/small-business/crm-software', traffic:'20.5M/mois' },
  { name: 'TechRepublic',     url: 'https://www.techrepublic.com/best/',                traffic:'5M+/mois' },
  { name: 'Business News Daily',url:'https://www.businessnewsdaily.com/technology',     traffic:'3M+/mois' },
  { name: 'Zapier Blog',      url: 'https://zapier.com/blog',                           traffic:'10M+/mois' },
];

// ================================================================
// LISTE B — BLOGUEURS AFFILIÉS (même modèle que Virdico)
// Signal : même objectif → quels sujets BOFU/MOFU ils traitent = opportunités
// ================================================================
const COMPETITORS = [
  { name: 'thetoolchief.com',         url: 'https://thetoolchief.com' },
  { name: 'relvnt.io',                url: 'https://relvnt.io' },
  { name: 'thebusinessdive.com',      url: 'https://thebusinessdive.com' },
  { name: 'techstackdaily.com',       url: 'https://techstackdaily.com' },
  { name: 'spotsaas.com',             url: 'https://www.spotsaas.com/blog' },
  { name: 'emailtooltester.com',      url: 'https://www.emailtooltester.com' },
  { name: 'wpbeginner.com',           url: 'https://www.wpbeginner.com/category/opinion/' },
  { name: 'explodingtopics.com',      url: 'https://explodingtopics.com/blog' },
  { name: 'behindrankings.com',       url: 'https://behindrankings.com' },
  { name: 'keytomic.com',             url: 'https://keytomic.com/blog' },
  { name: 'guidedsuccessacademy.com', url: 'https://guidedsuccessacademy.com' },
  { name: 'hackceleration.com',       url: 'https://hackceleration.com/labs' },
  { name: 'smartprocessflow.com',     url: 'https://smartprocessflow.com' },
  { name: 'techvaultai.com',          url: 'https://www.techvaultai.com' },
  { name: 'aiessentials.us',          url: 'https://aiessentials.us/blog' },
  { name: 'thetechedvocate.org',      url: 'https://www.thetechedvocate.org' },
  { name: 'fayedigital.com',          url: 'https://fayedigital.com/blog' },
  { name: 'innowise.com',             url: 'https://innowise.com/blog' },
  { name: 'seomator.com',             url: 'https://seomator.com/blog' },
  { name: 'aditsblogs.com',           url: 'https://aditsblogs.com' },
];

// ================================================================
// PROGRAMMES AFFILIÉS — classés par EPC décroissant
// ================================================================
const AFFILIATE_PROGRAMS = [
  // BOFU — RPM $30-225
  { tool:'Semrush',           stage:'BOFU', commission:'$200/vente + $10/trial', cookie:'120j', epc:3.50, network:'Impact',      category:'SEO',         affUrl:'https://www.semrush.com/affiliates/' },
  { tool:'HubSpot',           stage:'BOFU', commission:'30% récurrent',          cookie:'90j',  epc:2.90, network:'Impact',      category:'CRM',         affUrl:'https://www.hubspot.com/affiliates' },
  { tool:'Ahrefs',            stage:'BOFU', commission:'20% récurrent',          cookie:'60j',  epc:2.20, network:'Direct',      category:'SEO',         affUrl:'https://ahrefs.com/affiliates' },
  { tool:'ActiveCampaign',    stage:'BOFU', commission:'20-30% récurrent',       cookie:'90j',  epc:2.10, network:'PartnerStack',category:'Email CRM',   affUrl:'https://www.activecampaign.com/affiliate' },
  { tool:'Pipedrive',         stage:'BOFU', commission:'20% récurrent',          cookie:'90j',  epc:1.80, network:'Direct',      category:'CRM',         affUrl:'https://www.pipedrive.com/en/affiliates' },
  { tool:'Surfer SEO',        stage:'BOFU', commission:'25% récurrent',          cookie:'60j',  epc:1.90, network:'PartnerStack',category:'SEO',         affUrl:'https://surferseo.com/affiliate/' },
  { tool:'Monday.com',        stage:'BOFU', commission:'$200/vente',             cookie:'30j',  epc:1.50, network:'Impact',      category:'Productivity',affUrl:'https://monday.com/lp/affiliate/' },
  { tool:'Brevo',             stage:'BOFU', commission:'5€/lead + 100€/vente',   cookie:'60j',  epc:1.30, network:'CJ Affiliate',category:'Email',       affUrl:'https://www.brevo.com/affiliates/' },
  { tool:'ClickUp',           stage:'BOFU', commission:'20% récurrent',          cookie:'30j',  epc:1.20, network:'PartnerStack',category:'Productivity',affUrl:'https://clickup.com/affiliates' },
  { tool:'Zoho CRM',          stage:'BOFU', commission:'15% récurrent',          cookie:'60j',  epc:0.90, network:'Direct',      category:'CRM',         affUrl:'https://www.zoho.com/affiliates.html' },
  { tool:'Freshsales',        stage:'BOFU', commission:'15% récurrent',          cookie:'60j',  epc:0.80, network:'Direct',      category:'CRM',         affUrl:'https://www.freshworks.com/partners/affiliate/' },
  // MOFU — RPM $18-105
  { tool:'Zapier',            stage:'MOFU', commission:'30% récurrent',          cookie:'30j',  epc:1.40, network:'PartnerStack',category:'Automation',  affUrl:'https://zapier.com/partners/affiliates' },
  { tool:'Make (Integromat)', stage:'MOFU', commission:'20% récurrent',          cookie:'30j',  epc:1.10, network:'Direct',      category:'Automation',  affUrl:'https://www.make.com/en/affiliate' },
  { tool:'n8n',               stage:'MOFU', commission:'30% récurrent',          cookie:'60j',  epc:0.80, network:'Direct',      category:'Automation',  affUrl:'https://n8n.io/affiliates/' },
  { tool:'Notion',            stage:'MOFU', commission:'50% 1ère année',         cookie:'30j',  epc:0.90, network:'Direct',      category:'Productivity',affUrl:'https://www.notion.so/affiliates' },
  { tool:'Asana',             stage:'MOFU', commission:'(programme limité)',      cookie:'30j',  epc:0.60, network:'Direct',      category:'Productivity',affUrl:'https://asana.com/affiliate' },
];

// Outils à tracker dans les pages
const SAAS_TOOLS = [
  'HubSpot','Pipedrive','Salesforce','Zoho','Freshsales','Freshworks',
  'Notion','ClickUp','Asana','Monday','Trello','Basecamp',
  'Zapier','Make','n8n','Activepieces','Workato',
  'ActiveCampaign','Brevo','Mailchimp','ConvertKit','Klaviyo',
  'Semrush','Ahrefs','Surfer','Moz','SE Ranking',
  'Slack','Loom','Calendly','Typeform','Webflow','Framer','ChatGPT'
];

// ================================================================
// HTTP FETCH
// ================================================================
function fetchPage(rawUrl, hops = 0) {
  return new Promise(resolve => {
    if (hops > 5) return resolve('');
    // Hard global timeout — kills even stalled reads
    const globalTimer = setTimeout(() => { resolve(''); }, 12000);
    const done = (val) => { clearTimeout(globalTimer); resolve(val); };
    try {
      const u = new URL(rawUrl);
      const lib = u.protocol === 'https:' ? https : http;
      const req = lib.request({
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: 'GET',
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'identity',
          'Connection': 'close'
        }
      }, res => {
        if ([301,302,303,307,308].includes(res.statusCode) && res.headers.location) {
          const next = res.headers.location.startsWith('http')
            ? res.headers.location
            : `${u.protocol}//${u.hostname}${res.headers.location}`;
          fetchPage(next, hops + 1).then(done);
          return;
        }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', c => { if (data.length < 600000) data += c; });
        res.on('end',  () => done(data));
        res.on('error',() => done(''));
      });
      req.setTimeout(10000, () => { req.destroy(); done(''); });
      req.on('error', () => done(''));
      req.end();
    } catch { done(''); }
  });
}

// ================================================================
// EXTRACTION
// ================================================================
function extractArticles(html, baseUrl) {
  const articles = [], seen = new Set();
  const patterns = [
    /<a[^>]+href="([^"]*(?:review|compare|vs|best|alternative|pricing|top|guide)[^"]*)"[^>]*>([^<]{15,120})<\/a>/gi,
    /<h[23][^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>\s*([^<]{15,120})\s*<\/a>\s*<\/h[23]>/gi,
    /<a[^>]+class="[^"]*(?:post-title|entry-title|article-title|card-title)[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]{15,120})<\/a>/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(html)) !== null && articles.length < 20) {
      let aUrl = m[1].trim();
      const title = m[2].trim().replace(/\s+/g,' ').replace(/&amp;/g,'&').replace(/&#039;/g,"'");
      if (title.length < 12 || seen.has(title)) continue;
      if (aUrl.startsWith('/')) {
        try { const b = new URL(baseUrl); aUrl = `${b.protocol}//${b.hostname}${aUrl}`; } catch {}
      }
      if (!aUrl.startsWith('http')) continue;
      const isBOFU = /review|pricing|discount|coupon|trial|plan|cost|how much|worth it/i.test(title + aUrl);
      const isMOFU = /\bvs\b|compare|alternative|versus|instead of/i.test(title + aUrl);
      const stage  = isBOFU ? 'BOFU' : isMOFU ? 'MOFU' : 'TOFU';
      const tools  = SAAS_TOOLS.filter(t => new RegExp(`\\b${t}\\b`,'i').test(title));
      seen.add(title);
      articles.push({ title, url: aUrl, stage, tools });
    }
  }
  return articles.slice(0, 12);
}

function countTools(html) {
  return SAAS_TOOLS
    .map(t => ({ tool:t, count:(html.match(new RegExp(`\\b${t}\\b`,'gi'))||[]).length }))
    .filter(x => x.count >= 2)
    .sort((a,b) => b.count - a.count)
    .slice(0, 12);
}

function detectAffLinks(html) {
  return [
    { re:/href="[^"]*\/go\//i,           label:'/go/' },
    { re:/href="[^"]*\/recommends\//i,   label:'/recommends/' },
    { re:/href="[^"]*[?&]ref=/i,         label:'?ref=' },
    { re:/href="[^"]*[?&]via=/i,         label:'?via=' },
    { re:/partnerstack\.com/i,           label:'PartnerStack' },
    { re:/impact\.com/i,                 label:'Impact.com' },
    { re:/shareasale\.com/i,             label:'ShareASale' },
    { re:/cj\.com/i,                     label:'CJ Affiliate' },
  ].filter(p => p.re.test(html)).map(p => p.label);
}

// ================================================================
// SCRAPE
// ================================================================
async function scrapeList(list, label) {
  console.log(`\n[${label}] Scraping ${list.length} sites...`);
  const results = [];
  for (const site of list) {
    process.stdout.write(`  → ${site.name.padEnd(32)}`);
    const html = await fetchPage(site.url);
    if (!html) {
      console.log('❌ inaccessible');
      results.push({ ...site, articles:[], toolCounts:[], affLinks:[], status:'error' });
      continue;
    }
    const articles   = extractArticles(html, site.url);
    const toolCounts = countTools(html);
    const affLinks   = detectAffLinks(html);
    console.log(`✓  ${articles.length} articles · ${toolCounts.length} outils détectés`);
    results.push({ ...site, articles, toolCounts, affLinks, status:'ok' });
  }
  return results;
}

// ================================================================
// CALCUL DES OPPORTUNITÉS
// Outil mentionné dans les 2 listes + programme affilié = opportunité forte
// ================================================================
function computeOpportunities(demandResults, competitorResults) {
  const demandScore = {}, compScore = {};

  // Score demande (grands médias)
  demandResults.forEach(site => {
    site.toolCounts.forEach(({ tool, count }) => {
      demandScore[tool] = (demandScore[tool] || 0) + count;
    });
    site.articles.forEach(a => a.tools.forEach(t => {
      demandScore[t] = (demandScore[t] || 0) + 2;
    }));
  });

  // Score concurrent (blogueurs affiliés)
  competitorResults.forEach(site => {
    site.toolCounts.forEach(({ tool, count }) => {
      compScore[tool] = (compScore[tool] || 0) + count;
    });
    site.articles.forEach(a => a.tools.forEach(t => {
      compScore[t] = (compScore[t] || 0) + 2;
    }));
  });

  // Fusionner avec les programmes affiliés
  const allTools = new Set([...Object.keys(demandScore), ...Object.keys(compScore)]);
  const opps = [];

  allTools.forEach(tool => {
    const aff = AFFILIATE_PROGRAMS.find(p =>
      p.tool.toLowerCase().includes(tool.toLowerCase().slice(0,5)) ||
      tool.toLowerCase().includes(p.tool.toLowerCase().split(' ')[0].slice(0,5))
    );
    const ds = demandScore[tool] || 0;
    const cs = compScore[tool]   || 0;
    const score = ds * 2 + cs; // demande = poids double

    opps.push({
      tool,
      demandScore: ds,
      compScore:   cs,
      totalScore:  score,
      affiliate:   aff,
      priority:    aff?.stage === 'BOFU' ? 'BOFU' : aff?.stage === 'MOFU' ? 'MOFU' : 'TOFU',
      signal:      ds > 0 && cs > 0 ? 'FORT' : ds > 0 ? 'DEMANDE' : 'CONCURRENT',
    });
  });

  return opps
    .filter(o => o.totalScore > 0)
    .sort((a,b) => {
      // BOFU first, then by score
      const stageOrder = { BOFU:0, MOFU:1, TOFU:2 };
      if (stageOrder[a.priority] !== stageOrder[b.priority])
        return stageOrder[a.priority] - stageOrder[b.priority];
      return b.totalScore - a.totalScore;
    })
    .slice(0, 30);
}

// ================================================================
// HTML REPORT
// ================================================================
function buildHTML(demandResults, compResults, opportunities, now) {
  const dateStr = now.toLocaleDateString('fr-FR', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  const timeStr = now.toLocaleTimeString('fr-FR');

  const okD = demandResults.filter(r => r.status === 'ok').length;
  const okC = compResults.filter(r => r.status === 'ok').length;
  const totalArt = [...demandResults, ...compResults].reduce((s,r) => s + r.articles.length, 0);
  const topOpps = opportunities.filter(o => o.signal === 'FORT' && o.affiliate);

  const esc = s => String(s).replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const stag = s => s === 'BOFU'
    ? '<span class="tag tr">BOFU</span>'
    : s === 'MOFU'
    ? '<span class="tag ty">MOFU</span>'
    : '<span class="tag tb">TOFU</span>';
  const sig = s => s === 'FORT'
    ? '<span class="tag tg">FORT ★★</span>'
    : s === 'DEMANDE'
    ? '<span class="tag to">DEMANDE</span>'
    : '<span class="tag tt">CONCURRENT</span>';

  const siteCards = (list) => list.map(s => `
  <div class="card">
    <div class="card-head">
      <div>
        <strong style="color:#fff">${esc(s.name)}</strong>
        ${s.traffic ? `<span class="dim"> · ${s.traffic}</span>` : ''}
      </div>
      <span style="color:${s.status==='ok'?'var(--green)':'var(--red)'};font-size:11px;font-weight:700">
        ${s.status==='ok'?`✓ ${s.articles.length} art.`:'✗ Erreur'}
      </span>
    </div>
    ${s.toolCounts.slice(0,6).map(({tool,count}) => {
      const aff = AFFILIATE_PROGRAMS.find(p => p.tool.toLowerCase().includes(tool.toLowerCase().slice(0,5)) || tool.toLowerCase().includes(p.tool.toLowerCase().split(' ')[0].slice(0,5)));
      return `<div class="tool-row">
        <span style="color:#fff;font-size:12px">${esc(tool)}</span>
        <span style="color:var(--txt3);font-size:11px">${count}× mentions</span>
        ${aff ? `${stag(aff.stage)} <span style="color:var(--green);font-size:11px">${esc(aff.commission)}</span>` : ''}
      </div>`;
    }).join('') || '<p class="dim" style="font-size:11px">Aucun outil détecté</p>'}
  </div>`).join('');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Niche Rentable — ${dateStr}</title>
<style>
:root{
  --bg:#000;--bg2:#0a0a0a;--bg3:#111;--bg4:#181818;
  --border:#1f2937;--border2:#111827;
  --txt:#e5e5e5;--txt2:#b0b8c8;--txt3:#6b7280;
  --blue:#137cf0;--blue-lt:rgba(19,124,240,.12);--blue-bd:rgba(19,124,240,.3);
  --green:#22c55e;--green-lt:rgba(34,197,94,.1);--green-bd:rgba(34,197,94,.3);
  --orange:#f97316;--orange-lt:rgba(249,115,22,.1);--orange-bd:rgba(249,115,22,.3);
  --red:#ef4444;--red-lt:rgba(239,68,68,.1);--red-bd:rgba(239,68,68,.3);
  --yellow:#f59e0b;--yellow-lt:rgba(245,158,11,.1);--yellow-bd:rgba(245,158,11,.3);
  --teal:#14b8a6;--teal-lt:rgba(20,184,166,.1);--teal-bd:rgba(20,184,166,.3);
  --mono:'JetBrains Mono',Consolas,monospace;
}
*{margin:0;padding:0;box-sizing:border-box;}
body{background:var(--bg);color:var(--txt);font-family:'Segoe UI',system-ui,sans-serif;font-size:14px;line-height:1.65;padding:36px 44px;max-width:1300px;margin:0 auto;}
h2{font-size:16px;font-weight:800;color:#fff;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
section{margin-bottom:50px;}
table{width:100%;border-collapse:collapse;font-size:12px;margin-top:10px;}
th{text-align:left;padding:7px 13px;font-size:9px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--txt3);border-bottom:1px solid var(--border);background:var(--bg3);}
td{padding:9px 13px;border-bottom:1px solid rgba(31,41,55,.35);color:var(--txt2);vertical-align:middle;}
tr:last-child td{border-bottom:none;}
tr:hover td{background:rgba(255,255,255,.015);}
.tag{display:inline-flex;align-items:center;padding:2px 7px;border-radius:3px;font-size:9px;font-weight:700;font-family:var(--mono);margin:1px;}
.tr{background:var(--red-lt);color:var(--red);border:1px solid var(--red-bd);}
.ty{background:var(--yellow-lt);color:var(--yellow);border:1px solid var(--yellow-bd);}
.tb{background:var(--blue-lt);color:var(--blue);border:1px solid var(--blue-bd);}
.tg{background:var(--green-lt);color:var(--green);border:1px solid var(--green-bd);}
.to{background:var(--orange-lt);color:var(--orange);border:1px solid var(--orange-bd);}
.tt{background:var(--teal-lt);color:var(--teal);border:1px solid var(--teal-bd);}
.hero{background:linear-gradient(135deg,#000d1f,#001535 40%,#071d50);border-radius:14px;padding:36px 40px;margin-bottom:40px;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 55% 65% at 82% 30%,rgba(19,124,240,.38),transparent 68%);pointer-events:none;}
.stats{display:flex;gap:28px;flex-wrap:wrap;margin-top:20px;}
.stat-n{font-size:24px;font-weight:800;color:#fff;display:block;line-height:1;}
.stat-l{font-size:9px;color:rgba(255,255,255,.42);text-transform:uppercase;letter-spacing:1px;margin-top:3px;}
.chip{display:inline-block;background:rgba(19,124,240,.18);border:1px solid var(--blue-bd);color:var(--blue);font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:3px 11px;border-radius:20px;margin-bottom:14px;}
.opp-card{background:linear-gradient(135deg,rgba(34,197,94,.05),rgba(19,124,240,.03));border:1px solid rgba(34,197,94,.2);border-radius:10px;padding:16px 20px;margin-bottom:10px;display:grid;grid-template-columns:200px 100px 80px 1fr auto;gap:14px;align-items:center;}
.opp-card.bofu{border-color:rgba(239,68,68,.3);background:linear-gradient(135deg,rgba(239,68,68,.05),rgba(249,115,22,.03));}
.opp-card.mofu{border-color:rgba(245,158,11,.25);background:linear-gradient(135deg,rgba(245,158,11,.04),transparent);}
.opp-tool{font-size:15px;font-weight:800;color:#fff;}
.opp-comm{font-size:12px;color:var(--green);}
.opp-epc{font-size:13px;font-weight:700;color:var(--yellow);}
.opp-detail{font-size:11px;color:var(--txt3);line-height:1.5;}
.opp-btn{background:var(--blue-lt);border:1px solid var(--blue-bd);color:var(--blue);font-size:10px;font-weight:700;padding:5px 14px;border-radius:5px;text-decoration:none;white-space:nowrap;}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.card{background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:14px 16px;}
.card-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;}
.tool-row{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid rgba(31,41,55,.35);}
.tool-row:last-child{border-bottom:none;}
.dim{color:var(--txt3);}
.tw{overflow-x:auto;}
.legend{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:16px;}
.leg{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--txt3);}
footer{border-top:1px solid var(--border);margin-top:44px;padding-top:14px;font-size:11px;color:var(--txt3);}
@media(max-width:1000px){.opp-card{grid-template-columns:1fr 1fr;}.grid2{grid-template-columns:1fr;}body{padding:20px 16px;}}
</style>
</head>
<body>

<div class="hero">
  <div class="chip">Rapport Quotidien · Virdico · Arbitrage-First</div>
  <h1 style="font-size:26px;font-weight:900;color:#fff;margin-bottom:6px;">Niche Rentable</h1>
  <p style="color:rgba(255,255,255,.55);font-size:13px;max-width:620px;">
    Deux sources combinées : <strong style="color:#fff">Grands médias 1M+</strong> (forte demande) + <strong style="color:#fff">Blogueurs affiliés</strong> (même modèle).
    Résultat = outils à forte demande + monétisables → à traiter en priorité sur Virdico.
  </p>
  <div class="stats">
    <div><span class="stat-n">${okD}/${DEMAND_SITES.length}</span><span class="stat-l">Médias scrapés</span></div>
    <div><span class="stat-n">${okC}/${COMPETITORS.length}</span><span class="stat-l">Blogueurs scrapés</span></div>
    <div><span class="stat-n">${totalArt}</span><span class="stat-l">Articles analysés</span></div>
    <div><span class="stat-n">${topOpps.length}</span><span class="stat-l">Opportunités fortes</span></div>
    <div><span class="stat-n">${timeStr}</span><span class="stat-l">${dateStr}</span></div>
  </div>
</div>

<!-- SECTION 1 : OPPORTUNITÉS PRIORITAIRES -->
<section>
  <h2>🎯 Opportunités Prioritaires — À écrire sur Virdico <span class="tag tg">Signal FORT = 2 sources</span></h2>
  <p class="dim" style="margin-bottom:12px;font-size:12px;">
    Ces outils sont mentionnés à la fois par les <strong style="color:#fff">grands médias</strong> (forte demande)
    ET par les <strong style="color:#fff">blogueurs affiliés</strong> (modèle prouvé) → signal le plus solide.
    Vérifier SCOUT + ROI Gate avant de démarrer la rédaction.
  </p>
  <div class="legend">
    <div class="leg"><span class="tag tg">FORT ★★</span> Détecté dans les 2 listes → priorité max</div>
    <div class="leg"><span class="tag to">DEMANDE</span> Grands médias seulement → demande confirmée</div>
    <div class="leg"><span class="tag tt">CONCURRENT</span> Blogueurs seulement → à valider</div>
  </div>
  ${opportunities.filter(o => o.affiliate).slice(0, 20).map(o => `
  <div class="opp-card ${o.priority.toLowerCase()}">
    <div>
      <div class="opp-tool">${esc(o.tool)}</div>
      <div style="margin-top:4px;">${stag(o.priority)} ${sig(o.signal)}</div>
      <div style="font-size:10px;color:var(--txt3);margin-top:3px;">${o.affiliate?.category || ''}</div>
    </div>
    <div>
      <div class="opp-comm">${esc(o.affiliate?.commission || '—')}</div>
      <div style="font-size:10px;color:var(--txt3)">Commission</div>
    </div>
    <div>
      <div class="opp-epc">$${o.affiliate?.epc?.toFixed(2) || '—'}</div>
      <div style="font-size:10px;color:var(--txt3)">EPC estimé</div>
    </div>
    <div class="opp-detail">
      Cookie : ${o.affiliate?.cookie || '—'} · Réseau : ${o.affiliate?.network || '—'}<br>
      Demande : ${o.demandScore} pts · Concurrent : ${o.compScore} pts
    </div>
    <a href="${o.affiliate?.affUrl || '#'}" target="_blank" class="opp-btn">S'inscrire →</a>
  </div>`).join('')}
  ${opportunities.filter(o => o.affiliate).length === 0 ? '<p class="dim">Aucune opportunité détectée aujourd\'hui — relancer demain.</p>' : ''}
</section>

<!-- SECTION 2 : TOUS LES PROGRAMMES AFFILIÉS -->
<section>
  <h2>💰 Tous les Programmes Affiliés — Classés par EPC</h2>
  <p class="dim" style="margin-bottom:12px;font-size:12px;">
    Vérifier CGU trafic payant avant tout lancement ads. EPC = estimation marché, varie selon votre trafic.
  </p>
  <div class="tw"><table>
    <thead><tr><th>Outil</th><th>Stage</th><th>Commission</th><th>EPC</th><th>Cookie</th><th>Réseau</th><th>Catégorie</th><th>Inscription</th></tr></thead>
    <tbody>
    ${AFFILIATE_PROGRAMS.sort((a,b) => b.epc - a.epc).map(p => `
    <tr>
      <td><strong style="color:#fff">${esc(p.tool)}</strong></td>
      <td>${stag(p.stage)}</td>
      <td style="color:var(--green)">${esc(p.commission)}</td>
      <td style="color:var(--yellow);font-weight:700">$${p.epc.toFixed(2)}</td>
      <td>${p.cookie}</td>
      <td style="color:var(--txt3)">${p.network}</td>
      <td style="color:var(--txt3)">${p.category}</td>
      <td><a href="${p.affUrl}" target="_blank" style="color:var(--blue);font-size:11px">Rejoindre →</a></td>
    </tr>`).join('')}
    </tbody>
  </table></div>
</section>

<!-- SECTION 3 : GRANDS MÉDIAS -->
<section>
  <h2>📡 Liste A — Grands Médias (1M+ visites/mois) <span class="tag tb">Signal Demande</span></h2>
  <p class="dim" style="margin-bottom:14px;font-size:12px;">
    Ces sites ne font pas d'arbitrage mais ils reflètent la demande réelle du marché.
    Un outil mentionné ici = forte demande = bon candidat pour votre blog.
  </p>
  <div class="grid2">${siteCards(demandResults)}</div>
</section>

<!-- SECTION 4 : BLOGUEURS AFFILIÉS -->
<section>
  <h2>👥 Liste B — Blogueurs Affiliés (même modèle que Virdico) <span class="tag tg">Signal Modèle</span></h2>
  <p class="dim" style="margin-bottom:14px;font-size:12px;">
    Ces blogueurs font exactement ce que vous faites. Les outils qu'ils recommandent = outils qui convertissent.
  </p>
  <div class="grid2">${siteCards(compResults)}</div>
</section>

<footer>
  <p>Virdico Scraper · Rapport automatique · ${dateStr} · ${timeStr}</p>
  <p style="margin-top:4px;">
    Liste A : ${DEMAND_SITES.length} grands médias · Liste B : ${COMPETITORS.length} blogueurs affiliés · Aucune API payante
  </p>
</footer>
</body>
</html>`;
}

// ================================================================
// MAIN
// ================================================================
async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  VIRDICO — Scraper Niche Rentable V2');
  console.log(`  ${new Date().toLocaleString('fr-FR')}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const now = new Date();

  const [demandResults, compResults] = await Promise.all([
    scrapeList(DEMAND_SITES,  'LISTE A — Grands Médias'),
    scrapeList(COMPETITORS,   'LISTE B — Blogueurs Affiliés'),
  ]);

  console.log('\n[Calcul des opportunités...]');
  const opportunities = computeOpportunities(demandResults, compResults);

  console.log('[Génération du rapport HTML...]');
  const html = buildHTML(demandResults, compResults, opportunities, now);

  fs.writeFileSync(OUTPUT_FILE, html, 'utf8');

  const okD = demandResults.filter(r => r.status==='ok').length;
  const okC = compResults.filter(r => r.status==='ok').length;
  const topOpps = opportunities.filter(o => o.signal==='FORT' && o.affiliate).length;

  console.log(`\n✅ Rapport : ${OUTPUT_FILE}`);
  console.log(`   Médias : ${okD}/${DEMAND_SITES.length} · Blogueurs : ${okC}/${COMPETITORS.length}`);
  console.log(`   Opportunités fortes : ${topOpps}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch(err => {
  console.error('Erreur :', err.message);
  process.exit(1);
});
