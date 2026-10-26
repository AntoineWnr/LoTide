/*
# Lead capture tables for LoTide Surf Camps

Stores visitor-submitted data from the public website (no sign-in).

1. New Tables
- `trip_leads`: "Send me this trip" requests from the quiz result page
  - `id` (uuid, pk), `name` (text), `email` (text), `camp` (text: lombok|bali),
    `package_id` (text), `answers` (jsonb quiz answers), `created_at`
- `contact_messages`: messages from the contact form
  - `id` (uuid, pk), `name`, `email`, `camp` (lombok|bali|either), `message`, `created_at`

2. Security
- RLS enabled on both tables.
- Visitors (anon/authenticated) may only INSERT; no SELECT/UPDATE/DELETE grants or policies,
  so submitted data cannot be read or altered from the browser. The owner reads leads in the dashboard.
- Length and format checks in the INSERT policy and table constraints.

3. Notes
1. Insert-only by design: the website never reads these rows back.
*/

CREATE TABLE IF NOT EXISTS trip_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  camp text NOT NULL CHECK (camp IN ('lombok', 'bali')),
  package_id text NOT NULL CHECK (char_length(package_id) <= 60),
  answers jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (pg_column_size(answers) < 4000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  camp text NOT NULL CHECK (camp IN ('lombok', 'bali', 'either')),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 4000),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS trip_leads_created_at_idx ON trip_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages (created_at DESC);

ALTER TABLE trip_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

GRANT INSERT (name, email, camp, package_id, answers) ON trip_leads TO anon, authenticated;
GRANT INSERT (name, email, camp, message) ON contact_messages TO anon, authenticated;

DROP POLICY IF EXISTS "Visitors can submit trip leads" ON trip_leads;
CREATE POLICY "Visitors can submit trip leads" ON trip_leads FOR INSERT
TO anon, authenticated
WITH CHECK (char_length(name) BETWEEN 1 AND 120 AND camp IN ('lombok', 'bali'));

DROP POLICY IF EXISTS "Visitors can send contact messages" ON contact_messages;
CREATE POLICY "Visitors can send contact messages" ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (char_length(message) BETWEEN 1 AND 4000 AND camp IN ('lombok', 'bali', 'either'));
