# Virdico — Design System du blog

Design system du blog **Virdico** (tests, comparatifs et bons plans SaaS), construit à partir des
**templates audités** (`preview/index.html` et `preview/article.html`).
Style : sombre, bleu électrique, titres très fins, capsules et lueurs.
Stack : **Next.js (App Router) + Tailwind CSS v4**.

| Dossier | Contenu |
|---|---|
| `preview/` | Templates HTML audités (référence visuelle, ouvrables tels quels dans un navigateur) |
| `styles/` | `tokens.css` (variables), `effects.css` (effets signature), `banners.css` (bannières BLASSA), `theme.css` (Tailwind v4) |
| `components/` | Composants React : `ui/`, `site/`, `home/`, `article/`, `banners/` |
| `lib/` | `cn.ts` (fusion de classes), `seo.ts` (données structurées schema.org) |

Le site complet qui utilise ce design system est à la racine du dépôt (voir `../README.md`).

---

## 1. Principes

| Principe | Concrètement |
|---|---|
| **Nuit + électrique** | Fond `#04060D`, un seul accent bleu (`#2F5BFF` / `#8FB0FF`). Le bleu sert à la lumière (horizon, halos, barres). |
| **Titres fins et géants** | Manrope **300**, interlettrage serré. La 2ᵉ moitié d'un H2 est atténuée : « Tested by hand. *Rated with numbers.* » |
| **Tout est capsule** | Boutons, navigation, champs, chips, coupons : `rounded-full`. Cartes : 20–22px. Grands blocs : 26–32px. |
| **3 boutons, 3 rôles** | **Blanc** = action n°1 du site (recherche, newsletter, navigation). **Bleu dégradé** = lien d'affiliation. **Verre** = secondaire. |
| **Des chiffres partout** | Notes « 9.2 / 10 », anneau de score, barres animées, sous-notes, prix. |
| **Confiance (E-E-A-T)** | Badges « Tested for 30 days », méthode de test, bio d'auteur, dates de publication et de mise à jour. |
| **Transparence** | Liens d'affiliation `rel="sponsored nofollow noopener"`, mention en tête d'article et en pied de page, bandeau cookies. |

## 2. Tokens

### Couleurs

| Token / classe | Valeur | Usage |
|---|---|---|
| `background` | `#04060D` | Fond de page |
| `background-alt` | `#070B18` | Bandeau défilant |
| `panel` / `panel-hover` | blanc 3,5 % / 6 % | Cartes, encarts |
| `foreground` | `#EEF2FF` | Titres |
| `foreground-soft` | `#C3CBE6` | Chapôs, paragraphes mis en avant |
| `foreground-muted` | `#8D97B5` | Extraits, méta, 2ᵉ moitié des H2 |
| `border` / `border-strong` / `border-accent` | blanc 9 % / 18 % / bleu 40 % | Repos / survol bouton / survol carte |
| `primary` | `#2F5BFF` | Lueurs, pastilles, barres |
| `accent` | `#8FB0FF` | Eyebrows, liens, notes |
| `cta` | `#FFFFFF` | Bouton blanc |
| `success` | `#5FE0A6` | ✓, « Yes », pour, code copié |
| `danger` | `#FF7B8A` | ✕, contre |
| `highlight` | `#FFD27A` | Étoiles, « ★ Top pick », date d'expiration |

### Points de rupture (en px, alignés sur le template)

`sm` 561 · `md` 861 (article sur 2 colonnes, barre CTA mobile masquée) · `lg` 961 (navigation complète, grilles) ·
`xl` 1025 (4 étapes « How we test ») · `2xl` 1101 (sommaire latéral).

### Typographie (Manrope)

| Rôle | Taille | Graisse |
|---|---|---|
| H1 accueil | 44 → 92px | 300 |
| H1 article | 36 → 70px | 300 |
| H2 de section | 32 → 54px | 300 |
| H2 dans l'article | 32px (27px mobile) | 400 |
| Chiffres clés, prix | 36–44px | 300 |
| Corps d'article | 17px (16px mobile), interligne 1.7 | 400 |
| Eyebrow | 12px, majuscules, +0.18em | 600 |

## 3. Composants

**ui/** — `Button` (`primary` blanc, `blue`, `ghost`, `link`), `AffiliateLink` (lien sponsorisé), `iconButtonClass`,
`Chip`, `PillForm`, `CopyButton`, `SectionHeading` / `Eyebrow`, `Reveal`, `Logo`,
`ScoreBadge` / `ScoreBar` / `ScoreRing` / `Stars`, icônes (`ui/icons.tsx`).

**site/** — `SiteHeader` (fond flouté au scroll, menu mobile plein écran, Échap pour fermer), `Hero` (+ `Flare`, `CountUp`),
`TopicMarquee`, `SiteFooter` (réseaux, colonnes, liens légaux, « Cookie settings »), `CookieBanner`,
`SkipLink`, `BackToTop`, `ReadingProgress`, `StickyCta`, `JsonLd`.

**home/** — `CategoryCard`, `PostCard` (`featured`, `default`, `compact` ; badge, note), `ComparisonTable`,
`HowWeTest`, `DealCard` / `Coupon`, `NewsletterCta` / `NewsletterInline`.

**article/** — `ArticleHero`, `VerdictCard`, `ArticleLayout`, `Prose`, `TableOfContents` / `MobileToc`,
`Disclosure`, `KeyTakeaways`, `Screenshot`, `ScoreBreakdown`, `CheckColumns` (Great for / Not for, Pros / Cons),
`Callout`, `PricingPlans` (mensuel / annuel), `FeatureComparison`, `MethodNote`, `FinalVerdict`, `Faq`,
`ShareBar`, `ArticleDates`, `AuthorBio`, `ArticleSidebar` (`QuickFacts`, `DealBox`, `AlternativesBox`).

Les blocs d'article portent `not-prose` : placés dans `<Prose>`, ils gardent leur propre style.

## 4. Structure des pages

**Accueil** — voir `app/page.tsx`
```
SkipLink · SiteHeader
Hero               annonce · H1 · recherche + liens populaires · chiffres clés · indicateur de scroll
TopicMarquee
Catégories         8 CategoryCard
Derniers tests     PostCard featured + 3 compact, puis 3 default
Comparatif rapide  ComparisonTable
How we test        4 étapes
Deals              3 DealCard
NewsletterCta
SiteFooter · CookieBanner · BackToTop
```

**Page de test** — voir `components/templates/article.tsx`
```
SkipLink · ReadingProgress · SiteHeader (CTA = lien d'affiliation)
ArticleHero        fil d'Ariane · H1 · chapô · auteur · badges de confiance
VerdictCard
ArticleLayout      TableOfContents | Prose (MDX) | ArticleSidebar
  Prose            MobileToc · Disclosure · KeyTakeaways · Overview · Screenshot · ScoreBreakdown
                   Features · Callout · Who it's for · Pros & cons · PricingPlans
                   FeatureComparison · MethodNote · FinalVerdict · Faq
                   ShareBar · ArticleDates · AuthorBio · NewsletterInline
Keep reading       3 PostCard
StickyCta (mobile) · SiteFooter · CookieBanner · BackToTop
```

## 5. SEO intégré

- `metadata` Next.js : title, description, canonical, robots, Open Graph, Twitter (voir les exemples).
- `lib/seo.ts` : `organization`, `website` (avec SearchAction), `breadcrumbs`, `review` (note, pour/contre), `faq`.
- Le JSON-LD doit décrire **ce qui est visible** : même note, mêmes questions et réponses que la FAQ affichée.
- `FAQPage` n'affiche plus de résultat enrichi dans Google pour la plupart des sites (depuis 2023) : on le garde, sans en attendre d'étoiles.
- Impression : les éléments `vd-no-print` (navigation, colonne latérale, CTA…) sont masqués.

## 6. Installation dans le projet Next.js

1. Dépendances : `npm i clsx tailwind-merge class-variance-authority`
2. `app/globals.css` :
   ```css
   @import "tailwindcss";
   @import "../design-system/styles/tokens.css";
   @import "../design-system/styles/effects.css" layer(components);
   @import "../design-system/styles/banners.css" layer(components);
   @import "../design-system/styles/theme.css";
   @source "../design-system";
   ```
3. Police auto-hébergée (plus rapide que Google Fonts en `<link>`), dans `app/layout.tsx` :
   ```tsx
   import { Manrope } from "next/font/google";

   const manrope = Manrope({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-manrope" });

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en" className={manrope.variable}>
         <body>{children}</body>
       </html>
     );
   }
   ```
4. Newsletter : `app/actions.ts` est une Server Action à brancher sur le fournisseur d'emailing.
5. Cookies : passer `onConsent` à `CookieBanner` et ne charger analytics et pixels d'affiliation que si `consent === "all"`.

## 7. Système de bannières (BLASSA)

Les bannières ont leur propre design system, déclaré **en portée locale** sur `.blassa` et `.sticky-cta`
(`styles/banners.css`) pour ne jamais modifier les couleurs du site :

| Token | Valeur | Usage |
|---|---|---|
| `--bg` | `#07080B` | Fond |
| `--volt` | `#C6FF33` | Accent (vert néon) |
| `--t1` / `--t2` | `#F2F4F8` / `#A9B1C2` | Textes |
| `--surf1` | `#0E1116` | Surfaces, hachures |
| `--brd` | `#232A38` | Bordures |
| `--fd` / `--fs` / `--fm` | Chakra Petch / Inter / JetBrains Mono | Titres / texte / libellés |

Composants : `<Banner size="wide | sky | box | flow | inline | mobile-mid" creative={…} />` et `<StickyBanner creative={…} />`.

- **Vide** : fond hachuré + `// SPONSORED`, dimensions, lien « Advertise with us ».
- **Rempli** : image ou vidéo (`.webm` + `.mp4`) pixel-perfect, 0 padding, lien `/play/[slug]/` en `rel="sponsored nofollow"`,
  avec une petite mention « Sponsored » au-dessus (obligation légale de signaler la publicité).
- **Sticky** : fermable (mémorisé pour la session) ; il publie sa hauteur dans `--sticky-banner-h` pour que la barre CTA mobile,
  le bouton « retour en haut » et le bandeau cookies se décalent au-dessus de lui.

## 8. Corrections apportées aux templates audités

- Sans JavaScript, les barres de score (accueil et article) et l'anneau du verdict restaient vides : ils s'affichent maintenant remplis.
- Le bouton « Auto » de l'offre sans code ne faisait rien au clic : il est remplacé par le texte « Applied automatically ».

## 9. Avant la mise en ligne

- [ ] Remplacer tous les `EDIT` : liens d'affiliation, vrais chiffres, vraies offres, nom et photo de l'auteur, images Open Graph (1200×630)
- [ ] Réponses de la FAQ identiques dans la page et dans le JSON-LD
- [ ] Pages légales en place : `/privacy-policy/`, `/terms/`, `/affiliate-disclosure/`, `/how-we-test/`, `/about/`
- [ ] Analytics chargés seulement après consentement
- [ ] Images en WebP/AVIF via `next/image`, avec `alt` et dimensions
- [ ] Tester le résultat enrichi « Review » avec l'outil de test des résultats enrichis de Google
- [ ] Lighthouse ≥ 95 (performance, accessibilité, SEO) sur mobile
