// Génère les visuels PNG dans posts/sortie/ à partir de posts/contenu.js
// Usage : node posts/generer.js

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const contenu = require('./contenu');

const SORTIE = path.join(__dirname, 'sortie');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Style commun : fond bleu nuit, dégradé violet → orange, typographie Inter très grasse
const css = (w, h) => `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: ${w}px; height: ${h}px; overflow: hidden; font-family: 'Inter', 'Liberation Sans', sans-serif; }
  .cadre {
    position: relative; width: 100%; height: 100%; padding: ${Math.round(w * 0.08)}px;
    background: #0f0b29; color: #fff; display: flex; flex-direction: column; overflow: hidden;
  }
  .cadre::before, .cadre::after { content: ''; position: absolute; border-radius: 50%; filter: blur(${Math.round(w * 0.08)}px); opacity: .55; }
  .cadre::before { width: ${w * 0.7}px; height: ${w * 0.7}px; background: #7c3aed; top: -${w * 0.25}px; right: -${w * 0.25}px; }
  .cadre::after  { width: ${w * 0.6}px; height: ${w * 0.6}px; background: #f97316; bottom: -${w * 0.3}px; left: -${w * 0.25}px; opacity: .4; }
  .cadre > * { position: relative; z-index: 1; }
  .haut { display: flex; justify-content: space-between; align-items: center; }
  .tag {
    display: inline-block; padding: .45em 1.1em; border-radius: 999px; font-weight: 700;
    background: linear-gradient(90deg, #8b5cf6, #f97316); font-size: ${Math.round(w * 0.026)}px; letter-spacing: .02em;
  }
  .logo { font-weight: 800; font-size: ${Math.round(w * 0.024)}px; opacity: .85; }
  .centre { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: ${Math.round(w * 0.035)}px; }
  h1 { font-family: 'Inter Display', 'Inter', sans-serif; font-weight: 900; line-height: 1.02; letter-spacing: -.03em; }
  h1 .acc { background: linear-gradient(90deg, #a78bfa, #fb923c); -webkit-background-clip: text; background-clip: text; color: transparent; }
  p { font-weight: 500; line-height: 1.35; color: #d8d4f0; }
  .barre { width: ${Math.round(w * 0.12)}px; height: ${Math.round(w * 0.012)}px; border-radius: 99px; background: linear-gradient(90deg, #8b5cf6, #f97316); }
  .bas { display: flex; justify-content: space-between; align-items: center; font-size: ${Math.round(w * 0.024)}px; font-weight: 600; color: #b9b3dd; }
  .numero { font-family: 'Inter Display', 'Inter', sans-serif; font-weight: 900; line-height: .9; color: transparent; -webkit-text-stroke: 3px #a78bfa; }
`;

// Met en couleur dégradée le dernier mot du titre (en ignorant la ponctuation finale, ex. « »)
const titreAccentue = (t) => {
  const mots = esc(t).split(' ');
  const fin = /[\p{L}\p{N}]/u.test(mots[mots.length - 1]) ? '' : ' ' + mots.pop();
  const dernier = mots.pop();
  return `${mots.join(' ')} <span class="acc">${dernier}</span>${fin}`;
};

const page = (w, h, corps) => `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<style>${css(w, h)}</style></head><body><div class="cadre">${corps}</div></body></html>`;

const haut = (tag) => `<div class="haut">${tag ? `<span class="tag">${esc(tag)}</span>` : '<span></span>'}<span class="logo">${esc(contenu.marque.nom)}</span></div>`;
const bas = (droite = '') => `<div class="bas"><span>${esc(contenu.marque.pseudo)}</span><span>${droite}</span></div>`;

function visuelSimple(w, h, { tag, titre, texte, cta = 'Enregistre ce post 💾' }, taillesTitre, tailleTexte) {
  const taille = titre.length > 60 ? taillesTitre[1] : taillesTitre[0];
  return page(w, h, `
    ${haut(tag)}
    <div class="centre">
      <div class="barre"></div>
      <h1 style="font-size:${taille}px">${titreAccentue(titre)}</h1>
      ${texte ? `<p style="font-size:${tailleTexte}px">${esc(texte)}</p>` : ''}
    </div>
    ${bas(esc(cta))}`);
}

function slideCarrousel(slide, i, total) {
  const w = 1080, h = 1350;
  const pagination = `${i + 1} / ${total}`;
  if (slide.type === 'couverture' || slide.type === 'fin') {
    return page(w, h, `
      ${haut(slide.type === 'fin' ? 'À toi de jouer' : 'Carrousel')}
      <div class="centre">
        <div class="barre"></div>
        <h1 style="font-size:118px">${titreAccentue(slide.titre)}</h1>
        <p style="font-size:42px">${esc(slide.texte)}</p>
      </div>
      ${bas(pagination)}`);
  }
  return page(w, h, `
    ${haut('Erreur ' + slide.numero)}
    <div class="centre">
      <div class="numero" style="font-size:260px">${esc(slide.numero)}</div>
      <h1 style="font-size:96px">${titreAccentue(slide.titre)}</h1>
      <p style="font-size:44px">${esc(slide.texte)}</p>
    </div>
    ${bas(pagination + ' →')}`);
}

async function main() {
  fs.mkdirSync(SORTIE, { recursive: true });
  const navigateur = await chromium.launch();
  const onglet = await navigateur.newPage();

  const rendre = async (html, w, h, nom) => {
    await onglet.setViewportSize({ width: w, height: h });
    await onglet.setContent(html, { waitUntil: 'load' });
    await onglet.screenshot({ path: path.join(SORTIE, nom + '.png') });
    console.log('✓', nom + '.png');
  };

  for (const v of contenu.carres) {
    await rendre(visuelSimple(1080, 1080, v, [112, 80], 44), 1080, 1080, v.fichier);
  }

  const { slides, fichier } = contenu.carrousel;
  for (let i = 0; i < slides.length; i++) {
    await rendre(slideCarrousel(slides[i], i, slides.length), 1080, 1350, `${fichier}-${String(i + 1).padStart(2, '0')}`);
  }

  for (const v of contenu.verticaux) {
    await rendre(visuelSimple(1080, 1920, v, [136, 120], 52), 1080, 1920, v.fichier);
  }

  for (const v of contenu.facebook) {
    await rendre(visuelSimple(1200, 630, v, [72, 60], 30), 1200, 630, v.fichier);
  }

  await navigateur.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
