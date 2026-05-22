-- ═══════════════════════════════════════════════════════════
-- NUOYA Chain supplier prices — update after reading catalog
-- CHA021 = 15mm iced-out moissanite cuban
-- CHA025 = 18mm iced-out moissanite cuban
-- Confirm with Benny: "Is CHA021 your 15mm VVS moissanite cuban? CHA025 for 18mm?"
-- ═══════════════════════════════════════════════════════════

-- 15mm Cuban Links → CHA021
UPDATE products SET supplier_sku = 'CHA021', supplier_price_usd = 54.59
  WHERE sku = 'ICK-C-15S-18';
UPDATE products SET supplier_sku = 'CHA021', supplier_price_usd = 54.59
  WHERE sku = 'ICK-C-15G-18';
UPDATE products SET supplier_sku = 'CHA021', supplier_price_usd = 63.59
  WHERE sku = 'ICK-C-15S-22';
UPDATE products SET supplier_sku = 'CHA021', supplier_price_usd = 63.59
  WHERE sku = 'ICK-C-15G-22';

-- 18mm Cuban Links → CHA025
UPDATE products SET supplier_sku = 'CHA025', supplier_price_usd = 66.67
  WHERE sku = 'ICK-C-18S-18';
UPDATE products SET supplier_sku = 'CHA025', supplier_price_usd = 66.67
  WHERE sku = 'ICK-C-18G-18';
UPDATE products SET supplier_sku = 'CHA025', supplier_price_usd = 75.56
  WHERE sku = 'ICK-C-18S-22';
UPDATE products SET supplier_sku = 'CHA025', supplier_price_usd = 75.56
  WHERE sku = 'ICK-C-18G-22';
