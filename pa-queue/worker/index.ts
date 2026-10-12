export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  VAPID_PUBLIC_KEY: string;
  VAPID_PRIVATE_KEY: string;
  VAPID_SUBJECT: string;
}

const json = (data: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json; charset=utf-8", ...init?.headers },
  });

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      const row = await env.DB.prepare("SELECT 1 AS ok").first<{ ok: number }>();
      return json({ ok: row?.ok === 1, time: new Date().toISOString() });
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ error: "not_found" }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },

  // Étape 3 : collecte + alertes (chaque minute), profils (chaque nuit).
  async scheduled(controller, _env, _ctx): Promise<void> {
    console.log("cron", controller.cron);
  },
} satisfies ExportedHandler<Env>;
