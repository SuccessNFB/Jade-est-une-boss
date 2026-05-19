-- ──────────────────────────────────────────────
-- ICEKEY · Initial Schema
-- ──────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Products
CREATE TABLE products (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT UNIQUE NOT NULL,
  name             TEXT NOT NULL,
  description      TEXT NOT NULL DEFAULT '',
  category         TEXT NOT NULL CHECK (category IN ('ring','necklace','pendant','bracelet','earring','set')),
  subcategory      TEXT,
  price            DECIMAL(10,2) NOT NULL CHECK (price > 0),
  compare_at_price DECIMAL(10,2),
  price_tier       TEXT NOT NULL CHECK (price_tier IN ('entry','mid','premium','luxury','ultra')),
  images           JSONB NOT NULL DEFAULT '[]',
  stone_type       TEXT NOT NULL DEFAULT 'moissanite',
  stone_size       TEXT,
  stone_color      TEXT,
  metal            TEXT NOT NULL,
  stock            INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  is_customizable  BOOLEAN NOT NULL DEFAULT false,
  sku              TEXT UNIQUE NOT NULL,
  weight_grams     DECIMAL(6,2),
  certificate_type TEXT,
  tags             TEXT[] NOT NULL DEFAULT '{}',
  is_active        BOOLEAN NOT NULL DEFAULT true,
  is_featured      BOOLEAN NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX products_category_idx   ON products (category)  WHERE is_active = true;
CREATE INDEX products_tier_idx        ON products (price_tier) WHERE is_active = true;
CREATE INDEX products_featured_idx    ON products (is_featured) WHERE is_active = true;
CREATE INDEX products_price_idx       ON products (price);

-- Orders
CREATE TABLE orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  customer_email    TEXT NOT NULL,
  customer_name     TEXT NOT NULL DEFAULT '',
  items             JSONB NOT NULL DEFAULT '[]',
  total_amount      DECIMAL(10,2) NOT NULL,
  currency          TEXT NOT NULL DEFAULT 'eur',
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','paid','shipped','delivered','refunded','cancelled')),
  shipping_address  JSONB,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX orders_email_idx  ON orders (customer_email);
CREATE INDEX orders_status_idx ON orders (status);

-- Custom pendant requests
CREATE TABLE custom_requests (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id     UUID REFERENCES products (id) ON DELETE SET NULL,
  configuration  JSONB NOT NULL DEFAULT '{}',
  customer_email TEXT NOT NULL,
  customer_name  TEXT NOT NULL DEFAULT '',
  notes          TEXT,
  status         TEXT NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending','quoted','accepted','in_production','shipped','completed','cancelled')),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- Row Level Security
ALTER TABLE products       ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders         ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_requests ENABLE ROW LEVEL SECURITY;

-- Public read on active products
CREATE POLICY "Public can read active products"
  ON products FOR SELECT
  USING (is_active = true);

-- Authenticated admin has full access
CREATE POLICY "Admins full access products"
  ON products FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Admins full access orders"
  ON orders FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Admins full access custom_requests"
  ON custom_requests FOR ALL
  USING (auth.role() = 'service_role');
