import { useState } from "preact/hooks";

const TABS = [
  { id: "live", label: "En direct", icon: "⏱" },
  { id: "plan", label: "Parcours", icon: "🧭" },
  { id: "rank", label: "Classement", icon: "🏆" },
  { id: "group", label: "Groupe", icon: "👥" },
  { id: "settings", label: "Réglages", icon: "⚙️" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function App() {
  const [tab, setTab] = useState<TabId>("live");
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <div class="app">
      <main class="screen">
        <h1>{current.label}</h1>
        <p class="muted">Écran à construire dans une prochaine étape.</p>
      </main>
      <footer class="credit">Données : ThemeParks.wiki</footer>
      <nav class="tabbar" aria-label="Navigation principale">
        {TABS.map((t) => (
          <button
            key={t.id}
            class={t.id === tab ? "tab active" : "tab"}
            aria-label={t.label}
            aria-current={t.id === tab ? "page" : undefined}
            onClick={() => setTab(t.id)}
          >
            <span aria-hidden="true" class="tab-icon">{t.icon}</span>
            <span class="tab-label">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
