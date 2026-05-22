-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS support_tickets (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID        REFERENCES auth.users (id) ON DELETE SET NULL,
  customer_email TEXT        NOT NULL,
  customer_name  TEXT        NOT NULL DEFAULT '',
  category       TEXT        NOT NULL CHECK (category IN ('livraison','retour','produit','garantie','paiement','autre')),
  order_id       TEXT,
  message        TEXT        NOT NULL,
  admin_reply    TEXT,
  status         TEXT        NOT NULL DEFAULT 'open'
                 CHECK (status IN ('open','in_progress','resolved','closed')),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS support_tickets_email_idx  ON support_tickets (customer_email);
CREATE INDEX IF NOT EXISTS support_tickets_status_idx ON support_tickets (status);
CREATE INDEX IF NOT EXISTS support_tickets_user_idx   ON support_tickets (user_id) WHERE user_id IS NOT NULL;

-- RLS : seul le service role peut tout lire/écrire (API routes server-side uniquement)
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
