// Contenu des visuels. Le champ « cta » (optionnel) change le texte en bas à droite.
// Modifie les textes ici, puis relance : node posts/generer.js

module.exports = {
  marque: {
    nom: 'Coach Marketing Digital',
    pseudo: '@coach.marketing.digital',
  },

  // Posts carrés Instagram / Facebook (1080 x 1080)
  carres: [
    {
      fichier: 'astuce-01-regle-80-20',
      tag: 'Astuce #1',
      titre: 'La règle du 80/20',
      texte: '80 % de contenu utile pour ton audience, 20 % de promotion. Donne avant de vendre.',
    },
    {
      fichier: 'astuce-02-hook-3-secondes',
      tag: 'Astuce #2',
      titre: 'Tu as 3 secondes',
      texte: 'La première phrase décide si on lit la suite. Commence par un problème, un chiffre ou une question.',
    },
    {
      fichier: 'astuce-03-regularite',
      tag: 'Astuce #3',
      titre: 'La régularité bat la perfection',
      texte: '3 posts par semaine pendant 3 mois valent mieux que 10 posts parfaits puis plus rien.',
    },
    {
      fichier: 'citation-01',
      tag: 'Motivation',
      titre: '« Ton audience ne veut pas un produit. Elle veut une transformation. »',
      texte: '',
    },
  ],

  // Carrousel Instagram (1080 x 1350, format 4:5)
  carrousel: {
    fichier: 'carrousel-5-erreurs',
    slides: [
      { type: 'couverture', titre: '5 erreurs qui tuent ta visibilité', texte: 'Glisse pour savoir si tu les fais →' },
      { numero: '01', titre: 'Publier sans stratégie', texte: 'Définis 3 piliers de contenu et tiens-toi à eux.' },
      { numero: '02', titre: 'Ignorer les commentaires', texte: "Réponds dans la première heure : l'algorithme adore l'engagement." },
      { numero: '03', titre: 'Pas d’appel à l’action', texte: 'Dis clairement quoi faire : commenter, enregistrer, partager.' },
      { numero: '04', titre: 'Copier les autres', texte: 'Inspire-toi, mais garde ta voix. On suit une personne, pas un modèle.' },
      { numero: '05', titre: 'Ne jamais analyser', texte: 'Regarde tes statistiques chaque semaine et refais ce qui marche.' },
      { type: 'fin', titre: 'Tu en fais combien ?', texte: 'Dis-le en commentaire et enregistre ce post 💾' },
    ],
  },

  // Stories et couvertures de Reels / TikTok (1080 x 1920)
  verticaux: [
    {
      fichier: 'reel-couverture-algorithme',
      tag: 'Reel',
      titre: "Comment l'algorithme choisit tes vidéos",
      texte: '3 signaux à connaître en 2026',
      cta: 'Regarde jusqu\u2019à la fin 👀',
    },
    {
      fichier: 'story-question',
      tag: 'Story',
      titre: 'Quel est ton plus gros blocage sur les réseaux ?',
      texte: 'Réponds-moi en message privé 👇',
      cta: 'Écris-moi en DM',
    },
  ],

  // Publication / bannière Facebook (1200 x 630)
  facebook: [
    {
      fichier: 'facebook-atelier-gratuit',
      tag: 'Atelier gratuit',
      titre: 'Attire tes premiers clients grâce aux réseaux sociaux',
      texte: 'En ligne · 60 minutes · Places limitées',
      cta: 'Inscription en commentaire',
    },
  ],
};
