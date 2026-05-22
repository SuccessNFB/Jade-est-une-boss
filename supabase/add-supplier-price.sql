-- Run in Supabase SQL Editor
-- Adds supplier cost price to products for auto PayPal payment calculation

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS supplier_price_usd NUMERIC(10,2);

COMMENT ON COLUMN products.supplier_price_usd IS 'Supplier cost in USD — used to calculate PayPal payment amount to Benny';
