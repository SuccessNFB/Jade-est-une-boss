-- Run in Supabase SQL Editor
-- Adds supplier reference fields to products

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS supplier_sku TEXT,
  ADD COLUMN IF NOT EXISTS supplier_url TEXT;

COMMENT ON COLUMN products.supplier_sku IS 'AliExpress product reference (shown in supplier order emails)';
COMMENT ON COLUMN products.supplier_url IS 'Direct AliExpress product URL for quick reordering';
