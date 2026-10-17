# Coach — Design System du blog

Design system **moderne et minimaliste** pour le blog du SaaS Coach.
Stack : **Next.js (App Router) + Tailwind CSS v4**, compatible shadcn/ui.

Aperçu visuel : ouvrir [`preview.html`](./preview.html) dans un navigateur (bouton clair/sombre en haut à droite).

---

## 1. Principes

| Principe | Concrètement |
|---|---|
| **Le contenu d'abord** | Colonne de lecture de 42rem (~70 caractères), corps de texte en 18px, interligne 1.75. |
| **Une seule couleur d'accent** | Iris (`#5B5BD6`) pour les liens, CTA et catégories. Tout le reste est en niveaux de gris. |
| **Hiérarchie par la typo, pas par la décoration** | Graisse 600 et `tracking-tight` pour les titres ; pas d'ombres lourdes ni de dégradés. |
| **Accessible par défaut** | Contrastes AA, focus visible, `prefers-reduced-motion` respecté, labels sur les formulaires. |
| **Clair et sombre** | Chaque couleur passe par un token sémantique redéfini sous `.dark`. |

## 2. Architecture des tokens

```
Primitive  (--gray-600, --iris-600, --fs-lg, --r-md …)      valeurs brutes
    ↓
Sémantique (--foreground-muted, --primary, --border …)      rôle, change avec le thème
    ↓
Composant  (--card-radius, --button-height-md, --prose-body …)
    ↓
Tailwind   (bg-primary, text-foreground-muted, rounded-xl …) via @theme inline
```

**Règle :** dans un composant, n'utiliser que des classes sémantiques (`text-foreground-muted`),
jamais de primitives (`text-gray-600`) ni de valeurs en dur (`#5B5BD6`).

### Couleurs sémantiques

| Token / classe | Clair | Sombre | Usage |
|---|---|---|---|
| `background` | `#FFFFFF` | `#0E0F11` | Fond de page |
| `surface` | `#FCFCFD` | `#131518` | Encarts, newsletter, cartes en sombre |
| `foreground` | `#17191C` | `#F8F9FA` | Titres, texte principal |
| `foreground-muted` | `#4A5056` | `#B4BAC1` | Extraits, descriptions |
| `foreground-subtle` | `#687076` | `#8A929B` | Métadonnées (date, temps de lecture) |
| `border` | `#E6E8EB` | `#24272B` | Séparateurs, bordures de cartes |
| `primary` | `#5B5BD6` | `#5B5BD6` | CTA, focus |
| `primary-soft` | `#F5F5FF` | iris 14 % | Badges de catégorie |
| `link` | `#4A4AC0` | `#BCBCF8` | Liens dans le texte |

### Typographie

| Rôle | Police | Taille | Classe |
|---|---|---|---|
| Titre d'article (H1) | Geist 600 | 36 → 48px | `text-4xl md:text-5xl font-semibold tracking-tight` |
| H2 d'article | Geist 600 | 24px | via `.prose-coach` |
| Titre de carte | Geist 600 | 18px | `text-lg font-semibold` |
| Chapô | Geist 400 | 18 → 20px | `text-lg md:text-xl text-foreground-muted` |
| Corps d'article | Geist 400 | 18px / 1.75 | via `.prose-coach` |
| Citation | Newsreader italique | 20px | `blockquote` dans `.prose-coach` |
| Métadonnées | Geist 400 | 12–14px | `text-xs text-foreground-subtle` |
| Code | Geist Mono | 14px | `code`, `pre` |

### Espacements, rayons, ombres

- Espacements : grille de 4px (échelle Tailwind par défaut). Sections de page : `py-16` / `md:py-24`.
- Rayons : `rounded-md` (8px) pour les boutons et champs, `rounded-xl` (16px) pour les cartes, `rounded-full` pour les badges.
- Ombres : `shadow-sm` au repos, `shadow-md` au survol des cartes ; jamais plus.

## 3. Composants

| Composant | Fichier | Rôle |
|---|---|---|
| `Button` | `components/ui/button.tsx` | Variantes `primary`, `secondary`, `outline`, `ghost`, `link` ; tailles `sm`, `md`, `lg`, `icon` |
| `Badge` | `components/ui/badge.tsx` | Catégories et tags : `default`, `neutral`, `outline`, `success`, `warning` |
| `Input` | `components/ui/input.tsx` | Champ texte avec anneau de focus |
| `PostCard` | `components/blog/post-card.tsx` | Carte d'article, variantes `default` (grille) et `featured` (article à la une) |
| `ArticleHeader` | `components/blog/article-header.tsx` | Fil d'Ariane, catégorie, H1, chapô, auteur, date, temps de lecture |
| `Author` | `components/blog/author.tsx` | Avatar (ou initiales) + nom + rôle |
| `Prose` | `components/blog/prose.tsx` | Typographie du contenu MDX (`.prose-coach`) |
| `NewsletterCta` | `components/blog/newsletter-cta.tsx` | Formulaire d'inscription avec états chargement, succès et erreur |

### États des composants

| | Repos | Survol | Focus | Désactivé |
|---|---|---|---|---|
| **Button primary** | `bg-primary` + `shadow-sm` | `bg-primary-hover` | anneau `ring` 2px | opacité 50 % |
| **PostCard** | `border-border` | `border-border-strong` + `shadow-md`, image zoom 3 % | anneau sur le lien | — |
| **Input** | `border-border-strong` | — | `border-primary` + halo 15 % | opacité 50 % |

## 4. Templates de pages

**Index du blog (`/blog`)**
```
Header (logo · nav · bouton "Essai gratuit")
H1 "Blog" + sous-titre                       max-w-content, py-16
Filtres de catégories (Badges)
PostCard variant="featured"                  article à la une
Grille de PostCard  grid gap-6 sm:grid-cols-2 lg:grid-cols-3
NewsletterCta
Footer
```

**Article (`/blog/[slug]`)**
```
ArticleHeader                                max-w-reading
Image de couverture                          max-w-content, rounded-xl, aspect-[2/1]
Prose (MDX)                                  max-w-reading
Author (bio) + partage
NewsletterCta
"À lire aussi" : 3 × PostCard
```

## 5. Installation dans le projet Next.js

1. Dépendances :
   ```bash
   npm i clsx tailwind-merge class-variance-authority geist
   ```
2. `app/globals.css` :
   ```css
   @import "tailwindcss";
   @import "../design-system/styles/tokens.css";
   @import "../design-system/styles/theme.css";
   ```
3. Polices dans `app/layout.tsx` (les tokens lisent `--font-geist-sans`, `--font-geist-mono` et `--font-newsreader`) :
   ```tsx
   import { GeistSans } from "geist/font/sans";
   import { GeistMono } from "geist/font/mono";
   import { Newsreader } from "next/font/google";

   const newsreader = Newsreader({ subsets: ["latin"], style: ["italic"], variable: "--font-newsreader" });

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable} ${newsreader.variable}`}>
         <body>{children}</body>
       </html>
     );
   }
   ```
4. Mode sombre : ajouter `next-themes` avec `attribute="class"` ; la classe `.dark` sur `<html>` bascule tous les tokens.
5. Newsletter : `onSubscribe` doit être une **Server Action** si `NewsletterCta` est rendu depuis un Server Component.

## 6. Checklist qualité

- [ ] Aucune couleur en dur dans les composants (`#…`, `text-gray-*`)
- [ ] Contraste texte ≥ 4.5:1 dans les deux thèmes
- [ ] Toutes les images ont un `alt` ; les couvertures utilisent `next/image` avec `sizes`
- [ ] Un seul `h1` par page ; les titres suivent l'ordre h2 → h3
- [ ] Navigation clavier complète, focus visible
- [ ] Lighthouse : performance et accessibilité ≥ 95
