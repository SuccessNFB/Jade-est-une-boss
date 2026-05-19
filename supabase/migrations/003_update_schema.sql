-- ──────────────────────────────────────────────
-- ICEKEY · Schema v3 — Category alignment + chain columns + newsletter
-- ──────────────────────────────────────────────

-- 1. Fix category constraint (align with types/index.ts)
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
UPDATE products SET category = 'pendant' WHERE category = 'necklace';
ALTER TABLE products ADD CONSTRAINT products_category_check
  CHECK (category IN ('chain','pendant','ring','watch','bracelet','earring','buff','set'));

-- 2. Chain-specific columns
ALTER TABLE products ADD COLUMN IF NOT EXISTS chain_width_mm  DECIMAL(5,2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS chain_length_in INTEGER;

-- 3. Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT        UNIQUE NOT NULL,
  source        TEXT        NOT NULL DEFAULT 'website',
  discount_sent BOOLEAN     NOT NULL DEFAULT false,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS newsletter_email_idx ON newsletter_subscribers (email);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can subscribe"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins full access newsletter"
  ON newsletter_subscribers FOR ALL
  USING (auth.role() = 'service_role');

-- 4. Add customer_phone to orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_phone TEXT;
