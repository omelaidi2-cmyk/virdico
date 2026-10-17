# Virdico — Design System du blog

Design system du blog **Virdico** (tests et comparatifs SaaS), construit à partir du template de référence
(page d'accueil HTML fournie). Style : **sombre, bleu électrique, titres très fins, capsules et lueurs**.
Stack : **Next.js (App Router) + Tailwind CSS v4**.

Aperçus : [`preview/index.html`](./preview/index.html) (accueil) et [`preview/article.html`](./preview/article.html) (test d'un outil).

---

## 1. Principes

| Principe | Concrètement |
|---|---|
| **Nuit + électrique** | Fond quasi noir `#04060D`, un seul accent bleu (`#2F5BFF` / `#8FB0FF`). Le bleu sert à la lumière (horizon, halos, barres), pas aux surfaces. |
| **Titres fins et géants** | Manrope **300** pour H1/H2, interlettrage très serré (`-0.045em`). La 2ᵉ moitié d'un H2 est atténuée : « Tested by hand. *Rated with numbers.* » |
| **Tout est capsule** | Boutons, navigation, champs, chips : `rounded-full`. Cartes : 22px. Blocs larges : 28–32px. |
| **Surfaces en verre** | Panneaux à 3,5 % de blanc, bordures à 9 %, flou derrière la navigation. Survol : la bordure devient bleue. |
| **Le blanc = l'action** | Le bouton principal est **blanc** avec une lueur au survol. Il est réservé à l'action n°1 de chaque bloc. |
| **Des chiffres partout** | Notes « 9.2 / 10 », barres de score, sous-notes : c'est la signature d'un site d'avis. |
| **Transparence** | Liens d'affiliation en `rel="sponsored nofollow"` et mention d'affiliation dans l'article et le pied de page. |

## 2. Architecture

```
styles/tokens.css    Primitives → Sémantique → Composants (variables CSS)
styles/effects.css   Effets signature en CSS pur : horizon, éclat, halo, marquee, reveal, prose
styles/theme.css     Mapping Tailwind v4 (@theme inline) + styles de base
components/          Composants React (ui/, site/, blog/)
preview/             Pages HTML statiques de démonstration
```

**Règle :** dans un composant, n'utiliser que les classes sémantiques (`text-foreground-muted`, `bg-panel`,
`border-border-accent`), jamais une primitive (`--ink-500`) ni un hex en dur.

### Couleurs

| Token / classe Tailwind | Valeur | Usage |
|---|---|---|
| `background` | `#04060D` | Fond de page |
| `background-alt` | `#070B18` | Bandeau défilant |
| `panel` | blanc 3,5 % | Cartes, tableaux |
| `foreground` | `#EEF2FF` | Titres, texte principal |
| `foreground-soft` | `#C3CBE6` | Paragraphes d'intro, corps d'article |
| `foreground-muted` | `#8D97B5` | Extraits, méta, 2ᵉ moitié des H2 |
| `foreground-faint` | `#6C7594` | Placeholders |
| `border` / `border-accent` | blanc 9 % / bleu 40 % | Bordure au repos / au survol |
| `primary` | `#2F5BFF` | Lueurs, pastille « NEW », barres |
| `accent` | `#8FB0FF` | Eyebrows, liens, notes, « Read the review → » |
| `cta` / `cta-foreground` | `#FFFFFF` / `#050814` | Bouton principal |
| `success` / `danger` | `#4ADE80` / `#F87171` | Pour / contre dans le verdict |

Dégradés : `--gradient-text` (mot mis en valeur), `--gradient-bar` (barres de score), `--gradient-horizon` (hero),
`--gradient-thumb` (vignette sans image), `--gradient-logo`.

### Typographie (Manrope)

| Rôle | Taille | Graisse | Classe |
|---|---|---|---|
| H1 hero | 44 → 92px | 300 | `text-h1 font-light` |
| H1 article | 40 → 68px | 300 | voir `ArticleHeader` |
| H2 de section | 32 → 54px | 300 | `text-h2 font-light` |
| Chiffre clé | 42px | 300 | `text-stat font-light` |
| Titre de carte | 30 / 22 / 17px | 500 | selon la variante de `PostCard` |
| Corps d'article | 18px / 1.8 | 400 | `.prose-vd` |
| Eyebrow | 12px, majuscules, +0.18em | 400 | `<Eyebrow>` |
| Méta, chips | 11–13px | 500 | `<Chip>` |

### Rayons et mouvement

`rounded-icon` 12px · `rounded-card` 22px · `rounded-table` 28px · `rounded-cta` 32px · `rounded-full` pour le reste.
Transitions de 200–300 ms ; apparition au scroll de 800 ms (montée de 24px, décalage de 70 ms entre cartes).
Toutes les animations s'arrêtent avec `prefers-reduced-motion`.

## 3. Composants

| Composant | Rôle |
|---|---|
| **ui/** | |
| `Button` | `primary` (blanc lumineux), `ghost` (verre bordé), `accent` (bleu), `link` ; tailles `sm`, `md`, `lg` |
| `Chip` | `outline` (catégorie), `solid` (« NEW »), `announce` (annonce du hero) |
| `PillForm` | Champ + bouton dans une capsule : recherche, newsletter |
| `Eyebrow`, `SectionHeading` | En-tête de section : eyebrow + H2 en 2 tons + action à droite |
| `Reveal` | Apparition au scroll (client) |
| `Logo` | Carré dégradé lumineux + nom |
| **site/** | |
| `SiteHeader` | Barre flottante : logo · navigation en capsule floutée · bouton blanc |
| `Hero` (+ `Flare`) | Plein écran : horizon bleu, grille, éclat animé, annonce, H1, recherche, chiffres clés |
| `TopicMarquee` | Bandeau défilant des thématiques |
| `SiteFooter` | 4 colonnes + mention légale et d'affiliation |
| **blog/** | |
| `PostCard` | `featured` (la une), `default` (grille), `compact` (ligne à vignette) ; note optionnelle |
| `CategoryCard` | Icône dans un carré bleuté, halo au survol, nombre d'avis |
| `ScoreBadge`, `ScoreBar` | « 9.2 / 10 » et barre de score accessible (`role="meter"`) |
| `ComparisonTable` | Tableau comparatif avec boutons d'affiliation (`rel="sponsored nofollow"`) |
| `NewsletterCta` | Grand bloc à lueur montante, états chargement / succès / erreur |
| `ArticleHeader` | Fil d'Ariane, chip, temps de lecture, note, H1, chapô, auteur, mention d'affiliation |
| `Verdict` | Encadré « Our verdict » : note géante, sous-notes, pour/contre, CTA d'affiliation |
| `TableOfContents` | Sommaire collant de l'article |
| `Author`, `Prose` | Signature de l'auteur ; typographie du contenu MDX |

`Verdict` et `ComparisonTable` portent la classe `not-prose` : placés dans `<Prose>`, ils gardent leur propre style.

## 4. Pages

**Accueil (`/`)**
```
SiteHeader
Hero               annonce · H1 « Turn software into momentum » · recherche · 3 chiffres
TopicMarquee
Catégories         SectionHeading + grille 4 colonnes de CategoryCard
Derniers tests     PostCard featured + 3 PostCard compact, puis 3 PostCard default
Comparatif rapide  SectionHeading + ComparisonTable
NewsletterCta
SiteFooter
```

**Article (`/reviews/[slug]`)**
```
SiteHeader
ArticleHeader      sur l'horizon bleu
Colonne gauche     TableOfContents (collant, masqué sous 960px)
Colonne droite     Verdict → Prose (MDX) avec ComparisonTable des alternatives
À lire aussi       3 PostCard
NewsletterCta
SiteFooter
```

## 5. Installation dans le projet Next.js

1. Dépendances :
   ```bash
   npm i clsx tailwind-merge class-variance-authority
   ```
2. `app/globals.css` :
   ```css
   @import "tailwindcss";
   @import "../design-system/styles/tokens.css";
   @import "../design-system/styles/effects.css";
   @import "../design-system/styles/theme.css";
   ```
3. Police dans `app/layout.tsx` (les tokens lisent `--font-manrope`) :
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
4. Exemple d'utilisation :
   ```tsx
   <Hero
     announcement={{ badge: "NEW", text: "2026 guide to the best CRM tools" }}
     title={<>Turn software<br />into <span className="vd-text-gradient">momentum</span></>}
     description="We test SaaS tools hands-on and compare them side by side…"
     action={<PillForm action="/search" input={{ name: "q", type: "search", placeholder: "Search a tool…", "aria-label": "Search" }} submitLabel="Search" />}
     stats={[{ value: "4.9", label: "Reader rating" }, { value: "320+", label: "Tools tested" }, { value: "15k", label: "Monthly readers" }]}
   />
   ```
5. `NewsletterCta.onSubscribe` doit être une **Server Action** quand le composant est rendu depuis un Server Component.

## 6. Checklist qualité

- [ ] Aucun hex en dur dans les composants : uniquement des tokens
- [ ] Un seul bouton blanc par bloc
- [ ] Tous les liens vers un outil testé : `rel="sponsored nofollow"` + mention d'affiliation visible
- [ ] Notes cohérentes entre la carte, l'en-tête d'article et le verdict
- [ ] Un seul `h1` par page ; titres dans l'ordre h2 → h3
- [ ] Images de couverture via `next/image` avec `sizes` ; `alt` renseigné
- [ ] Navigation clavier et focus visibles ; animations coupées avec `prefers-reduced-motion`
- [ ] Aucun défilement horizontal à 375px
