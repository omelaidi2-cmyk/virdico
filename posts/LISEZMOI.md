# Visuels réseaux sociaux : marketing digital

Ce générateur crée des images prêtes à publier pour Instagram, TikTok/Reels et Facebook.

| Format | Taille | Fichiers |
|---|---|---|
| Post carré (Instagram / Facebook) | 1080 × 1080 | `astuce-*.png`, `citation-*.png` |
| Carrousel Instagram (4:5) | 1080 × 1350 | `carrousel-5-erreurs-01…07.png` |
| Story / couverture Reel / TikTok | 1080 × 1920 | `reel-*.png`, `story-*.png` |
| Publication Facebook | 1200 × 630 | `facebook-*.png` |

## Modifier les textes

1. Ouvre `posts/contenu.js` et change le nom de la marque, le pseudo et les textes.
2. Relance la génération :

```bash
npm install playwright   # une seule fois
npx playwright install chromium   # une seule fois
node posts/generer.js
```

Les images sont écrites dans `posts/sortie/`. Le dernier mot de chaque titre est automatiquement mis en couleur.
