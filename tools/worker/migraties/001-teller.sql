-- PLAN 19, B-4: dagteller voor de AI-verzoeken van de Worker.
-- Uitvoeren in D1 (database solidari-feedback, binding DB), één keer, vóór het deployen van de
-- Worker: dashboard → D1 → solidari-feedback → Console, of
--   wrangler d1 execute solidari-feedback --remote --file tools/worker/migraties/001-teller.sql
-- sleutel is 'totaal' of de eerste 16 hex van SHA-256(IP + dag + EXPORT_SECRET); er staat geen
-- IP-adres in de tabel. De cron van de Worker verwijdert rijen ouder dan 2 dagen.
CREATE TABLE IF NOT EXISTS teller (dag TEXT NOT NULL, sleutel TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (dag, sleutel));
