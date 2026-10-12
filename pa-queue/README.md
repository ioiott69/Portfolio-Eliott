# PA Queue 🎢

Application web (PWA) pour iPhone : temps d'attente en direct à PortAventura Park et Ferrari Land,
classement des manèges, parcours conseillé et notifications push. Tout tourne sur l'offre gratuite de Cloudflare.

## Lancer en local

```bash
cd pa-queue
npm install
npm run db:migrate:local   # crée la base locale
npm run dev                # http://localhost:5173
```

## Déployer sur Cloudflare (gratuit)

1. Crée un compte gratuit sur <https://dash.cloudflare.com/sign-up>.
2. `npx wrangler login` (ouvre le navigateur pour autoriser).
3. `npx wrangler d1 create pa-queue` puis copie le `database_id` affiché dans `wrangler.jsonc`.
4. `npm run db:migrate:remote`
5. `npm run vapid`, puis pour chaque ligne : `npx wrangler secret put VAPID_PUBLIC_KEY` (idem `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`).
6. `npm run deploy` — wrangler affiche l'adresse `https://pa-queue.<ton-compte>.workers.dev`.

> Les étapes d'installation sur iPhone et d'activation des notifications seront ajoutées avec l'étape PWA/Push.
