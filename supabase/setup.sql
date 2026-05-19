-- ═══════════════════════════════════════════════════════════
-- ICEKEY · Full Database Setup (run once in SQL Editor)
-- ═══════════════════════════════════════════════════════════

-- ── 1. EXTENSIONS ────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── 2. TABLES ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS products (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT        UNIQUE NOT NULL,
  name             TEXT        NOT NULL,
  description      TEXT        NOT NULL DEFAULT '',
  category         TEXT        NOT NULL CHECK (category IN ('chain','pendant','ring','watch','bracelet','earring','buff','set')),
  subcategory      TEXT,
  price            DECIMAL(10,2) NOT NULL CHECK (price > 0),
  compare_at_price DECIMAL(10,2),
  price_tier       TEXT        NOT NULL CHECK (price_tier IN ('entry','mid','premium','luxury','ultra')),
  images           JSONB       NOT NULL DEFAULT '[]',
  stone_type       TEXT        NOT NULL DEFAULT 'moissanite',
  stone_size       TEXT,
  stone_color      TEXT,
  metal            TEXT        NOT NULL,
  stock            INTEGER     NOT NULL DEFAULT 0 CHECK (stock >= 0),
  is_customizable  BOOLEAN     NOT NULL DEFAULT false,
  sku              TEXT        UNIQUE NOT NULL,
  weight_grams     DECIMAL(6,2),
  certificate_type TEXT,
  chain_width_mm   DECIMAL(5,2),
  chain_length_in  INTEGER,
  tags             TEXT[]      NOT NULL DEFAULT '{}',
  is_active        BOOLEAN     NOT NULL DEFAULT true,
  is_featured      BOOLEAN     NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT        UNIQUE NOT NULL,
  customer_email    TEXT        NOT NULL,
  customer_name     TEXT        NOT NULL DEFAULT '',
  customer_phone    TEXT,
  items             JSONB       NOT NULL DEFAULT '[]',
  total_amount      DECIMAL(10,2) NOT NULL,
  currency          TEXT        NOT NULL DEFAULT 'eur',
  status            TEXT        NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','paid','shipped','delivered','refunded','cancelled')),
  shipping_address  JSONB,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS custom_requests (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id     UUID        REFERENCES products (id) ON DELETE SET NULL,
  configuration  JSONB       NOT NULL DEFAULT '{}',
  customer_email TEXT        NOT NULL,
  customer_name  TEXT        NOT NULL DEFAULT '',
  notes          TEXT,
  status         TEXT        NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending','quoted','accepted','in_production','shipped','completed','cancelled')),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT        UNIQUE NOT NULL,
  source        TEXT        NOT NULL DEFAULT 'website',
  discount_sent BOOLEAN     NOT NULL DEFAULT false,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 3. INDEXES ───────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS products_category_idx  ON products (category)   WHERE is_active = true;
CREATE INDEX IF NOT EXISTS products_tier_idx       ON products (price_tier) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS products_featured_idx   ON products (is_featured) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS products_price_idx      ON products (price);
CREATE INDEX IF NOT EXISTS orders_email_idx        ON orders (customer_email);
CREATE INDEX IF NOT EXISTS orders_status_idx       ON orders (status);
CREATE INDEX IF NOT EXISTS newsletter_email_idx    ON newsletter_subscribers (email);

-- ── 4. AUTO-UPDATE updated_at ────────────────────────────────

CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_updated_at ON products;
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

DROP TRIGGER IF EXISTS orders_updated_at ON orders;
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- ── 5. ROW LEVEL SECURITY ────────────────────────────────────

ALTER TABLE products              ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders                ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_requests       ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active products"  ON products;
DROP POLICY IF EXISTS "Admins full access products"      ON products;
DROP POLICY IF EXISTS "Admins full access orders"        ON orders;
DROP POLICY IF EXISTS "Admins full access custom_requests" ON custom_requests;
DROP POLICY IF EXISTS "Public can subscribe"             ON newsletter_subscribers;
DROP POLICY IF EXISTS "Admins full access newsletter"    ON newsletter_subscribers;

CREATE POLICY "Public can read active products"
  ON products FOR SELECT USING (is_active = true);

CREATE POLICY "Admins full access products"
  ON products FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admins full access orders"
  ON orders FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admins full access custom_requests"
  ON custom_requests FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Public can subscribe"
  ON newsletter_subscribers FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins full access newsletter"
  ON newsletter_subscribers FOR ALL USING (auth.role() = 'service_role');

-- ── 6. SEED DATA (18 SKUs de démonstration) ──────────────────

INSERT INTO products (slug, name, description, category, price, price_tier, images, stone_type, stone_size, stone_color, metal, stock, sku, is_featured, tags)
VALUES
  -- RINGS
  ('bague-solitaire-argent-3mm',      'Solitaire Moissanite Argent 3mm',   'Bague solitaire en argent 925 avec moissanite ronde 3mm. Taille D, clarté VVS.',  'ring', 79,   'entry',   '[{"url":"/images/products/ring-001.jpg","alt":"Solitaire 3mm","position":0}]',        'moissanite','3mm',   'D','silver-925', 20,'ICK-R-001', true,  ARRAY['solitaire','argent']),
  ('bague-solitaire-argent-5mm',      'Solitaire Moissanite Argent 5mm',   'Bague solitaire argent 925, moissanite 5mm (0.5ct). Certifiée GRA.',               'ring', 139,  'mid',     '[{"url":"/images/products/ring-002.jpg","alt":"Solitaire 5mm","position":0}]',        'moissanite','5mm',   'D','silver-925', 15,'ICK-R-002', true,  ARRAY['solitaire','argent']),
  ('bague-halo-or-14k',               'Halo Moissanite Or 14k',            'Bague halo or 14k, moissanite 6.5mm entourée de pavé.',                            'ring', 349,  'premium', '[{"url":"/images/products/ring-003.jpg","alt":"Halo or 14k","position":0}]',          'moissanite','6.5mm', 'D','gold-14k',   10,'ICK-R-003', true,  ARRAY['halo','or']),
  ('bague-eternity-or-18k',           'Eternity Band Or 18k',              'Alliance eternity or 18k, moissanites 3mm tout le tour.',                          'ring', 589,  'luxury',  '[{"url":"/images/products/ring-004.jpg","alt":"Eternity or 18k","position":0}]',       'moissanite','3mm',   'D','gold-18k',   5, 'ICK-R-004', false, ARRAY['eternity','or']),
  ('bague-collector-platine-3ct',     'Solitaire Collector Platine 3ct',   'Bague solitaire platine, moissanite ronde 9mm (3ct). Certificat GRA Premium.',     'ring', 1290, 'ultra',   '[{"url":"/images/products/ring-005.jpg","alt":"Collector platine","position":0}]',     'moissanite','9mm',   'D','platinum',   2, 'ICK-R-005', true,  ARRAY['collector','platine','ultra']),

  -- PENDANTS
  ('pendentif-ronde-argent',          'Pendentif Ronde Argent 6.5mm',      'Pendentif argent 925, moissanite ronde 6.5mm (1ct). Chaîne incluse.',              'pendant', 99,  'entry',   '[{"url":"/images/products/pend-001.jpg","alt":"Pendentif ronde","position":0}]',      'moissanite','6.5mm', 'D','silver-925', 25,'ICK-P-001', true,  ARRAY['pendentif','argent']),
  ('pendentif-croix-argent',          'Croix Moissanite Argent',           'Pendentif croix argent 925, pavé moissanite 2mm. Design moderne.',                 'pendant', 129, 'mid',     '[{"url":"/images/products/pend-002.jpg","alt":"Croix argent","position":0}]',         'moissanite','2mm',   'D','silver-925', 20,'ICK-P-002', false, ARRAY['croix','pavé']),
  ('pendentif-coeur-or-14k',          'Cœur Moissanite Or 14k',            'Pendentif cœur or 14k, moissanite 6mm. Idéal cadeau.',                             'pendant', 249, 'premium', '[{"url":"/images/products/pend-003.jpg","alt":"Cœur or 14k","position":0}]',          'moissanite','6mm',   'D','gold-14k',   10,'ICK-P-003', true,  ARRAY['coeur','or']),
  ('pendentif-sur-mesure',            'Pendentif Sur Mesure',              'Créez votre pendentif unique. Pierre, métal, gravure au choix.',                   'pendant', 149, 'mid',     '[{"url":"/images/products/pend-custom.jpg","alt":"Sur mesure","position":0}]',        'moissanite', NULL,  'D','silver-925', 99,'ICK-P-CUSTOM', true, ARRAY['sur-mesure','personnalisé']),

  -- BRACELETS
  ('bracelet-tennis-argent',          'Tennis Moissanite Argent 18cm',     'Bracelet tennis argent 925, moissanites 4mm. Longueur ajustable 17–19cm.',         'bracelet', 179, 'mid',     '[{"url":"/images/products/brac-001.jpg","alt":"Tennis argent","position":0}]',       'moissanite','4mm',   'D','silver-925', 14,'ICK-B-001', true,  ARRAY['tennis','argent']),
  ('bracelet-jonc-or-14k',            'Jonc Moissanite Or 14k',            'Bracelet jonc or 14k, 5 moissanites 5mm. Ouverture réglable.',                     'bracelet', 449, 'luxury',  '[{"url":"/images/products/brac-002.jpg","alt":"Jonc or 14k","position":0}]',          'moissanite','5mm',   'D','gold-14k',    6,'ICK-B-002', false, ARRAY['jonc','or']),

  -- EARRINGS
  ('boucles-clous-argent-5mm',        'Clous Moissanite Argent 5mm',       'Clous argent 925, moissanites rondes 5mm (0.5ct/pierre).',                         'earring', 89,  'entry',   '[{"url":"/images/products/ear-001.jpg","alt":"Clous argent","position":0}]',          'moissanite','5mm',   'D','silver-925', 22,'ICK-E-001', true,  ARRAY['clous','argent']),
  ('boucles-pendantes-or-14k',        'Pendantes Goutte Or 14k',           'Boucles pendantes or 14k, moissanite poire 8x5mm.',                                'earring', 319, 'premium', '[{"url":"/images/products/ear-002.jpg","alt":"Pendantes or","position":0}]',          'moissanite','8x5mm', 'D','gold-14k',    8,'ICK-E-002', false, ARRAY['pendantes','or']),
  ('boucles-halo-or-18k',             'Halo Moissanite Or 18k',            'Boucles halo or 18k, moissanite 6mm + pavé. Éclat maximal.',                       'earring', 599, 'luxury',  '[{"url":"/images/products/ear-003.jpg","alt":"Halo or 18k","position":0}]',           'moissanite','6mm',   'D','gold-18k',    4,'ICK-E-003', true,  ARRAY['halo','or','luxe']),

  -- CHAINS
  ('chaine-cubaine-argent-50cm',      'Cuban Link Argent 50cm',            'Chaîne cubaine argent 925, largeur 8mm, longueur 50cm. Fermoir mousqueton.',        'chain', 159, 'mid',     '[{"url":"/images/products/chain-001.jpg","alt":"Cuban link argent","position":0}]',   'moissanite', NULL,  NULL,'silver-925', 30,'ICK-C-001', true,  ARRAY['cubaine','argent','chain']),
  ('chaine-franco-or-14k-55cm',       'Franco Chain Or 14k 55cm',          'Chaîne franco or 14k, 4mm, 55cm. Finition premium, fermoir sécurisé.',             'chain', 389, 'premium', '[{"url":"/images/products/chain-002.jpg","alt":"Franco chain or","position":0}]',    'moissanite', NULL,  NULL,'gold-14k',   12,'ICK-C-002', true,  ARRAY['franco','or','chain']),

  -- RINGS EXTRA
  ('bague-poire-or-14k',              'Poire Solitaire Or 14k',            'Bague solitaire taille poire 8x5mm, or 14k. Élégance pure.',                       'ring', 279, 'premium', '[{"url":"/images/products/ring-006.jpg","alt":"Poire or 14k","position":0}]',          'moissanite','8x5mm', 'D','gold-14k',    8,'ICK-R-006', true,  ARRAY['poire','or'])

ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════
-- ✅ Setup terminé — 4 tables créées, 17 SKUs insérés
-- ═══════════════════════════════════════════════════════════
