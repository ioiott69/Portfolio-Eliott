# PA Queue — mémoire projet

Web-app PWA (iPhone) pour 4 amis à PortAventura Park + Ferrari Land (avril 2027) : temps d'attente en direct,
classement, parcours conseillé, push, mode groupe. **Interface en français.** Offres gratuites Cloudflare uniquement.

> Le dépôt `Portfolio-Eliott` contient aussi un ancien portfolio à la racine. **Tout le projet PA Queue vit dans `pa-queue/`.**

## Architecture
- `src/` : front Vite + Preact + TypeScript (CSS maison, variables, mode sombre auto, < 100 Ko JS).
- `worker/` : un seul Cloudflare Worker (API `/api/*`, cron, push) qui sert aussi `dist/client` (Static Assets).
- `migrations/` : SQL D1 (`snapshots`, `ride_state`, `profiles`, puis alertes/groupes/abonnements).
- `wrangler.jsonc` : config Worker, D1 (binding `DB`), crons (`* * * * *` collecte, `15 3 * * *` profils).
- Source de données : API ThemeParks.wiki, appelée **uniquement par le Worker** (cache 60 s).
- `@cloudflare/vite-plugin` : `npm run dev` lance front + Worker + D1 local dans un seul process.

## Commandes
- `npm run db:migrate:local` puis `npm run dev` — dev local (http://localhost:5173)
- `npm run typecheck` / `npm test` / `npm run build`
- `npm run vapid` — génère les clés VAPID (à mettre dans `.dev.vars` et `wrangler secret put`)
- `npm run db:migrate:remote` puis `npm run deploy`

## Conventions
- TypeScript strict. Aucune donnée inventée : incertain => `null` + `// TODO vérifier`.
- Logique pure (planificateur, alertes, scoring, parsing) dans des modules sans I/O, testés avec Vitest.
- Fuseau du parc : `Europe/Madrid`. Pas de logos/photos/plans officiels PortAventura.
- Secrets VAPID via `wrangler secret put`, jamais dans le dépôt (`.dev.vars.example` fourni).
- Un commit par étape.

## Décisions
- Projet dans le sous-dossier `pa-queue/` (la racine du dépôt est déjà prise par le portfolio).
- Dev local via `@cloudflare/vite-plugin` plutôt que deux process séparés.
- `database_id` dans `wrangler.jsonc` est un placeholder à remplacer après `wrangler d1 create pa-queue`.
- ⚠️ L'environnement de dev cloud bloque `api.themeparks.wiki` (politique réseau) : le format réel de l'API
  n'a **pas** pu être vérifié depuis la session de dev. À valider dès que l'hôte est autorisé.

## Avancement (ordre de construction)
1. [x] Squelette Vite + Preact + Worker + D1 + wrangler + CLAUDE.md
2. [ ] Proxy `/api/live` + écran « En direct » (bloqué : vérifier le format de l'API)
3. [ ] Cron + collecte d'historique
4. [ ] PWA (manifest, service worker, tuto iOS)
5. [ ] Push (VAPID, abonnement, alertes seuil/réouverture)
6. [ ] Catalogue + Classement + fiches
7. [ ] Planificateur + Parcours
8. [ ] Mode groupe
9. [ ] Bonus
