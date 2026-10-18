# Miel, coffee & brunch

Site vitrine fictif d'un coffee shop à Mons (projet de portfolio).

- Next.js (App Router) + Tailwind CSS
- Bilingue FR / EN (routes `/fr` et `/en`, textes dans `src/app/[lang]/dictionaries`)
- Carte dans `src/data/menu.ts`

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## À remplacer

- Les blocs `PhotoSlot` par les vraies photos (dans `public/images`).
- La police Caveat Brush par Felt Tip Senior (fichier dans `src/fonts`, chemin à changer dans `src/app/[lang]/layout.tsx`).
