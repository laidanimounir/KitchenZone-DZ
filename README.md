# KitchenZone-DZ — Online Shop für ibro-kitchen

> E-Commerce platform built for a real client — ibro-kitchen, a household appliances store in Algeria.

---

## Über das Projekt / About the Project

**DE:** Dieses Projekt ist ein vollständiger Online-Shop, den ich für meinen Kunden **ibro-kitchen** entwickelt habe. ibro-kitchen ist ein Geschäft in Algerien, das Haushaltsgeräte und Küchenartikel verkauft — sowohl elektrische als auch traditionelle Produkte.

Als Basis habe ich das Open-Source-Projekt von **Hugo Lam** verwendet (MIT-Lizenz). Ich habe es lokal eingerichtet, mehrere technische Probleme selbstständig gelöst und beginne nun, es für die spezifischen Anforderungen des Kunden weiterzuentwickeln.

**EN:** This is a full e-commerce platform I set up for my client **ibro-kitchen**, a household appliances store in Algeria. I used an open-source project by Hugo Lam as a starting point (MIT license), resolved several technical issues independently, and am now building on top of it to match the client's needs.

- Original project: [github.com/clonglam/HiyoRi-Ecommerce-Nextjs-Supabase](https://github.com/clonglam/HiyoRi-Ecommerce-Nextjs-Supabase)
- Original author: Hugo Lam
- Setup and development: Mounir Laidani
- Started: May 2026

---

## Technologien / Tech Stack

| Technologie | Zweck / Purpose |
|-------------|-----------------|
| Next.js 14 | React framework with SSR |
| Supabase | Database & authentication |
| GraphQL (pg_graphql) | Efficient data fetching |
| Drizzle ORM | Database schema management |
| urql | GraphQL client |
| ShadcnUI + TailwindCSS | UI components & styling |
| Stripe | Payment gateway (in progress) |
| Supabase Storage | Image uploads (replacing AWS S3) |

---

## Was ich gemacht habe / What I did

### 1. Lokale Einrichtung / Local Setup

Das Projekt hatte keine vollständige Dokumentation für die lokale Einrichtung. Ich habe es Schritt für Schritt konfiguriert:

- Projekt geklont und Abhängigkeiten installiert
- `.env.local` mit allen erforderlichen Umgebungsvariablen erstellt
- Supabase-Projekt erstellt und das Datenbankschema mit `drizzle-kit` hochgeladen

### 2. IPv4-Verbindungsproblem gelöst / Fixed IPv4 Connection Issue

**Problem:** Das algerische Internet unterstützt nur IPv4. Die direkte Supabase-Verbindung benötigt IPv6 — die Verbindung hat nicht funktioniert.

**Lösung:** Ich habe von der Direct Connection auf den Session Pooler umgestellt:
```
# Vorher / Before:
db.xxxx.supabase.co

# Nachher / After:
aws-1-eu-central-1.pooler.supabase.com
```

### 3. GraphQL-Fehler behoben / Fixed GraphQL Issues

**Problem:** Die GraphQL-Abfragen haben keine Daten zurückgegeben, obwohl die Extension aktiviert war.

**Ursache:** Drei separate Probleme:
- Der Header war `apiKey` statt `apikey` (Groß-/Kleinschreibung)
- Der Server-Client hat keinen `Authorization: Bearer` Header gesendet
- Die GraphQL-Schema-Berechtigungen fehlten für `anon`

**Lösung:**
```sql
GRANT USAGE ON SCHEMA graphql TO anon;
GRANT USAGE ON SCHEMA graphql TO authenticated;
```

### 4. Umgebungsvariablen / Environment Variables

`drizzle-kit` liest standardmäßig nur `.env`, nicht `.env.local`. Ich habe `drizzle.config.ts` angepasst:

```typescript
dotenv.config({ path: ".env.local" });
```

Außerdem habe ich fehlende Variablen identifiziert und hinzugefügt, die in der Original-Dokumentation nicht erwähnt wurden.

---

## Aktueller Stand / Current Status

| Feature | Status |
|---------|--------|
| Datenbank | ✅ Funktioniert |
| GraphQL | ✅ Funktioniert |
| Produktanzeige | ✅ Funktioniert |
| Authentifizierung | 🔄 In Arbeit |
| Stripe Testzahlungen | 🔄 In Arbeit |
| Bildupload (Supabase Storage) | ✅ Funktioniert |
| Row Level Security | 🔄 In Arbeit |

---

## Lokale Installation / Local Setup

**Voraussetzungen / Requirements:**
- Node.js v18+
- Supabase account
- PowerShell or Terminal

```bash
# 1. Repository klonen / Clone the repo
git clone https://github.com/laidanimounir/KitchenZone-DZ.git
cd KitchenZone-DZ

# 2. Abhängigkeiten installieren / Install dependencies
npm install

# 3. Umgebungsvariablen erstellen / Create env file
# Erstelle .env.local mit den Werten aus .env.example

# 4. Datenbankschema hochladen / Push database schema
npx drizzle-kit push:pg

# 5. Entwicklungsserver starten / Start dev server
npm run dev
```

Die App läuft dann auf `http://localhost:3000`

---

## Projektstruktur / Project Structure

```
src/
├── app/
│   ├── (store)/        # Customer-facing pages
│   └── (dashboard)/    # Admin CMS
├── features/
│   ├── products/
│   ├── collections/
│   ├── carts/
│   └── users/
├── lib/
│   ├── supabase/       # Schema & config
│   └── urql.ts         # GraphQL client
└── providers/
```

---

## Lizenz / License

Basierend auf dem Open-Source-Projekt von Hugo Lam — lizenziert unter **MIT**.
Meine Erweiterungen und Anpassungen sind ebenfalls unter MIT veröffentlicht.