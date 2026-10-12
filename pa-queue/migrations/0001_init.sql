-- Historique des temps d'attente : une ligne seulement quand la valeur change.
CREATE TABLE IF NOT EXISTS snapshots (
  ride_id TEXT NOT NULL,
  ts INTEGER NOT NULL,            -- secondes Unix
  wait INTEGER,                   -- minutes, NULL si inconnu
  status TEXT NOT NULL            -- OPERATING | DOWN | CLOSED | REFURBISHMENT
);
CREATE INDEX IF NOT EXISTS idx_snapshots_ride_ts ON snapshots (ride_id, ts);
CREATE INDEX IF NOT EXISTS idx_snapshots_ts ON snapshots (ts);

-- Dernier état connu par manège (pour détecter les changements).
CREATE TABLE IF NOT EXISTS ride_state (
  ride_id TEXT PRIMARY KEY,
  wait INTEGER,
  status TEXT NOT NULL,
  ts INTEGER NOT NULL
);

-- Profils agrégés (recalculés chaque nuit).
CREATE TABLE IF NOT EXISTS profiles (
  ride_id TEXT NOT NULL,
  day_type TEXT NOT NULL,         -- weekday | weekend | holiday
  hour INTEGER NOT NULL,          -- 0-23, heure locale Europe/Madrid
  avg_wait REAL NOT NULL,
  p75_wait REAL NOT NULL,
  samples INTEGER NOT NULL,
  PRIMARY KEY (ride_id, day_type, hour)
);
