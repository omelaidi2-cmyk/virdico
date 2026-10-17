# Virdico — site complet

Blog de tests, comparatifs et bons plans SaaS. **Next.js 15 (App Router) + Tailwind CSS v4 + MDX.**
Design : `design-system/` (style Virdico audité + système de bannières BLASSA).

## Lancer le site en local (http://localhost:3000)

```bash
git clone <ce dépôt> && cd coach
git checkout claude/eloquent-archimedes-hd3d4y
npm install
npm run dev          # → http://localhost:3000
```

Version de production en local :

```bash
npm run build && npm start   # → http://localhost:3000
```

Node.js 18.18 minimum (20 ou 22 recommandé). Si un autre projet occupe déjà le port 3000, arrêtez-le d'abord.

## Pages

| URL | Contenu | Bannières |
|---|---|---|
| `/` | Accueil : hero, catégories, derniers tests, comparatif, méthode, offres, newsletter | wide · sky · flow · mobile-mid · sticky |
| `/reviews/` | Tous les articles | wide · flow · mobile-mid · sticky |
| `/comparisons/` | Comparatifs et classements | wide · flow · mobile-mid · sticky |
| `/crm/`, `/vpn/`… | Pages catégorie (8) | wide · flow · mobile-mid · sticky |
| `/toolname-review/`… | Articles (10) : test complet, guide « best of », comparatif | box · inline · sticky |
| `/categories/`, `/deals/`, `/search/?q=` | Catégories, offres, recherche | sticky |
| `/about/`, `/how-we-test/`, `/advertise/`, `/contact/`, `/affiliate-disclosure/`, `/privacy-policy/`, `/terms/` | Pages éditoriales et légales | sticky |
| `/play/[slug]/` | Redirection des clics sur les bannières (non indexée) | — |
| `/sitemap.xml`, `/robots.txt` | SEO | — |

## Où modifier quoi

```
content/
  site.ts          Nom, URL, navigation, pied de page, réseaux sociaux
  home.ts          Chiffres du hero, liens populaires, tableau comparatif, étapes « How we test »
  categories.ts    Les 8 catégories
  deals.ts         Offres et codes promo
  authors.ts       Auteur(s) : nom, rôle, bio, photo
  banners.ts       Campagnes publicitaires et affectation aux emplacements
  posts/*.mdx      Articles (un fichier par article)
  pages/*.mdx      Pages éditoriales
app/actions.ts     Inscription newsletter (à brancher sur votre outil d'emailing)
```

Tous les textes à remplacer sont marqués **EDIT**.

### Ajouter un article

1. Copier `content/posts/toolname-review.mdx` (test) ou `content/posts/best-crm-software.mdx` (guide) sous un nouveau nom.
2. Modifier le bloc `export const meta = { … }` en tête : `slug` (= nom du fichier), titre, catégorie, dates, note…
3. Écrire le contenu en Markdown. Les titres `##` doivent correspondre à la liste `toc` (sommaire).
4. Ajouter l'import dans `content/posts.ts`.

Composants utilisables dans un article : `<Screenshot>`, `<ScoreBreakdown>`, `<Callout>`, `<CheckColumns>`,
`<PricingPlans>`, `<FeatureComparison>`, `<ComparisonTable>`, `<MethodNote>`, `<FinalVerdict>`, `<Faq>`,
`<AffiliateLink>` et `<InlinePromo />` (bannière inline).

### Bannières (système BLASSA)

Les 10 emplacements sont vides par défaut : ils affichent le placeholder hachuré `// SPONSORED`.

1. Déposer le visuel dans `public/banners/` (GIF animé → convertir en `.webm` + `.mp4`).
2. Déclarer la campagne dans `campaigns` (`content/banners.ts`), avec l'URL de l'annonceur.
3. L'affecter à un emplacement dans `assign` (ex. `homeSky: "house-deals-sky"`).

Trois bannières maison prêtes à l'emploi (`house-deals-wide`, `house-deals-sky`, `house-deals-sticky`) renvoient vers `/deals/`.

| Format | Taille | Règles responsive |
|---|---|---|
| `wide` (leaderboard) | 728 × 146 | 100 % de large sous 900px |
| `sky` (skyscraper) | 160 × 600, collant à 80px | masqué sous 900px |
| `box` | 100 % × 260 min | masqué sous 768px |
| `flow` / `inline` | 100 % × 130 min | — |
| `mobile-mid` | 320 × 100 | visible seulement sous 900px |
| sticky (`.sticky-cta`) | 728 × 90 / 320 × 50 | apparaît après 400px de scroll, fermable |

### Variables d'environnement

| Variable | Rôle | Défaut |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique (canonical, sitemap, JSON-LD) | `https://virdico.com` |

## Avant la mise en ligne

- [ ] Remplacer tous les **EDIT** (liens d'affiliation, chiffres, offres, auteur, textes des articles)
- [ ] Brancher `app/actions.ts` sur l'outil d'emailing
- [ ] Charger les analytics seulement après consentement (`onConsent` de `CookieBanner`)
- [ ] Faire relire les pages légales
- [ ] Ajouter les images Open Graph (1200 × 630)
- [ ] Déployer (Vercel, ou tout hébergeur Node.js) avec `NEXT_PUBLIC_SITE_URL` défini
