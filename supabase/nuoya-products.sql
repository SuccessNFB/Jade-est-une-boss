-- ═══════════════════════════════════════════════════════════
-- NUOYA x ICEKEY — Product catalog seed
-- Run in Supabase SQL Editor AFTER setup.sql
-- Images: replace /images/products/XXX.jpg with real photos
-- ═══════════════════════════════════════════════════════════

-- Clear existing seed products (keeps orders / users intact)
DELETE FROM products WHERE sku LIKE 'ICK-%';

INSERT INTO products (
  slug, name, description, category, price, compare_at_price,
  price_tier, images, stone_type, stone_size, stone_color,
  metal, stock, sku, supplier_sku, is_featured, is_active, tags,
  chain_width_mm, chain_length_in, weight_grams, certificate_type
) VALUES

-- ─────────────────────────────────────────────
-- CHAINS — Cuban Link 15mm
-- ─────────────────────────────────────────────
(
  'cuban-link-15mm-18-argent',
  'Cuban Link 15mm 18" — Argent 925',
  'Chaîne cubaine iced-out 15mm en argent 925 serti moissanite VVS. Longueur 18 pouces (45cm). Certifiée GRA.',
  'chain', 179, 229, 'mid',
  '[{"url":"/images/products/cuban-15mm-silver.jpg","alt":"Cuban Link 15mm Argent","position":0}]',
  'moissanite', 'VVS', 'D', 'silver-925', 50,
  'ICK-C-15S-18', 'NUOYA-CHAIN-15MM', true, true,
  ARRAY['cuban','chaîne','iced-out','argent','15mm'], 15, 18, 85, 'GRA'
),
(
  'cuban-link-15mm-18-or',
  'Cuban Link 15mm 18" — Or Gold',
  'Chaîne cubaine iced-out 15mm plaqué or serti moissanite VVS. Longueur 18 pouces (45cm). Certifiée GRA.',
  'chain', 179, 229, 'mid',
  '[{"url":"/images/products/cuban-15mm-gold.jpg","alt":"Cuban Link 15mm Or","position":0}]',
  'moissanite', 'VVS', 'D', 'gold-plated', 50,
  'ICK-C-15G-18', 'NUOYA-CHAIN-15MM', true, true,
  ARRAY['cuban','chaîne','iced-out','or','gold','15mm'], 15, 18, 85, 'GRA'
),
(
  'cuban-link-15mm-22-argent',
  'Cuban Link 15mm 22" — Argent 925',
  'Chaîne cubaine iced-out 15mm en argent 925 serti moissanite VVS. Longueur 22 pouces (55cm). Certifiée GRA.',
  'chain', 199, 249, 'mid',
  '[{"url":"/images/products/cuban-15mm-silver.jpg","alt":"Cuban Link 15mm Argent 22","position":0}]',
  'moissanite', 'VVS', 'D', 'silver-925', 30,
  'ICK-C-15S-22', 'NUOYA-CHAIN-15MM', false, true,
  ARRAY['cuban','chaîne','iced-out','argent','15mm'], 15, 22, 100, 'GRA'
),
(
  'cuban-link-15mm-22-or',
  'Cuban Link 15mm 22" — Or Gold',
  'Chaîne cubaine iced-out 15mm plaqué or serti moissanite VVS. Longueur 22 pouces (55cm). Certifiée GRA.',
  'chain', 199, 249, 'mid',
  '[{"url":"/images/products/cuban-15mm-gold.jpg","alt":"Cuban Link 15mm Or 22","position":0}]',
  'moissanite', 'VVS', 'D', 'gold-plated', 30,
  'ICK-C-15G-22', 'NUOYA-CHAIN-15MM', false, true,
  ARRAY['cuban','chaîne','iced-out','or','gold','15mm'], 15, 22, 100, 'GRA'
),

-- ─────────────────────────────────────────────
-- CHAINS — Cuban Link 18mm
-- ─────────────────────────────────────────────
(
  'cuban-link-18mm-18-argent',
  'Cuban Link 18mm 18" — Argent 925',
  'Chaîne cubaine statement 18mm en argent 925 serti moissanite VVS. Longueur 18 pouces (45cm). Certifiée GRA.',
  'chain', 229, 299, 'premium',
  '[{"url":"/images/products/cuban-18mm-silver.jpg","alt":"Cuban Link 18mm Argent","position":0}]',
  'moissanite', 'VVS', 'D', 'silver-925', 40,
  'ICK-C-18S-18', 'NUOYA-CHAIN-18MM', true, true,
  ARRAY['cuban','chaîne','iced-out','argent','18mm','statement'], 18, 18, 110, 'GRA'
),
(
  'cuban-link-18mm-18-or',
  'Cuban Link 18mm 18" — Or Gold',
  'Chaîne cubaine statement 18mm plaqué or serti moissanite VVS. Longueur 18 pouces (45cm). Certifiée GRA.',
  'chain', 229, 299, 'premium',
  '[{"url":"/images/products/cuban-18mm-gold.jpg","alt":"Cuban Link 18mm Or","position":0}]',
  'moissanite', 'VVS', 'D', 'gold-plated', 40,
  'ICK-C-18G-18', 'NUOYA-CHAIN-18MM', true, true,
  ARRAY['cuban','chaîne','iced-out','or','gold','18mm','statement'], 18, 18, 110, 'GRA'
),
(
  'cuban-link-18mm-22-argent',
  'Cuban Link 18mm 22" — Argent 925',
  'Chaîne cubaine statement 18mm en argent 925 serti moissanite VVS. Longueur 22 pouces (55cm). Certifiée GRA.',
  'chain', 249, 329, 'premium',
  '[{"url":"/images/products/cuban-18mm-silver.jpg","alt":"Cuban Link 18mm Argent 22","position":0}]',
  'moissanite', 'VVS', 'D', 'silver-925', 25,
  'ICK-C-18S-22', 'NUOYA-CHAIN-18MM', false, true,
  ARRAY['cuban','chaîne','iced-out','argent','18mm'], 18, 22, 130, 'GRA'
),
(
  'cuban-link-18mm-22-or',
  'Cuban Link 18mm 22" — Or Gold',
  'Chaîne cubaine statement 18mm plaqué or serti moissanite VVS. Longueur 22 pouces (55cm). Certifiée GRA.',
  'chain', 249, 329, 'premium',
  '[{"url":"/images/products/cuban-18mm-gold.jpg","alt":"Cuban Link 18mm Or 22","position":0}]',
  'moissanite', 'VVS', 'D', 'gold-plated', 25,
  'ICK-C-18G-22', 'NUOYA-CHAIN-18MM', false, true,
  ARRAY['cuban','chaîne','iced-out','or','gold','18mm'], 18, 22, 130, 'GRA'
),

-- ─────────────────────────────────────────────
-- PENDANTS
-- ─────────────────────────────────────────────
(
  'pendentif-croix-moissanite-argent',
  'Pendentif Croix VVS — Argent 925',
  'Croix iced-out en argent 925 serti moissanite VVS. Dimensions 17×23mm. 1.1ct total. Certifiée GRA.',
  'pendant', 109, 149, 'mid',
  '[{"url":"/images/products/cross-small-silver.jpg","alt":"Croix moissanite argent","position":0}]',
  'moissanite', '1.1ct', 'D', 'silver-925', 60,
  'ICK-P-CRS-S', 'NUOYA-CROSS-SMALL', true, true,
  ARRAY['croix','pendentif','iced-out','argent','religieux'], null, null, 8, 'GRA'
),
(
  'pendentif-grosse-croix-moissanite',
  'Grosse Croix VVS Premium — Argent 925',
  'Croix premium full iced-out en argent 925 serti moissanite VVS. Pièce statement. Certifiée GRA.',
  'pendant', 399, 499, 'premium',
  '[{"url":"/images/products/cross-large-silver.jpg","alt":"Grande croix moissanite","position":0}]',
  'moissanite', 'VVS full', 'D', 'silver-925', 20,
  'ICK-P-CRL-S', 'NUOYA-CROSS-LARGE', true, true,
  ARRAY['croix','pendentif','premium','iced-out','argent','religieux'], null, null, 28, 'GRA'
),
(
  'pendentif-jesus-piece-laiton-moissanite',
  'Jesus Piece VVS — Gold (Laiton)',
  'Jesus piece iconique full iced-out en laiton plaqué or, serti moissanite VVS. Avec chaîne rope 24". Certifiée GRA.',
  'pendant', 649, 799, 'luxury',
  '[{"url":"/images/products/jesus-piece-gold.jpg","alt":"Jesus piece moissanite gold","position":0}]',
  'moissanite', 'VVS full', 'D', 'gold-plated', 15,
  'ICK-P-JP-G', 'NUOYA-JP-BRASS', true, true,
  ARRAY['jesus','pendentif','luxury','iced-out','gold','hip-hop'], null, 24, 65, 'GRA'
),
(
  'pendentif-jesus-piece-argent-moissanite',
  'Jesus Piece VVS Ultra — Argent 925',
  'Jesus piece en argent 925 massif serti moissanite VVS. La pièce ultime. Avec chaîne rope 24". Certifiée GRA.',
  'pendant', 899, 1099, 'ultra',
  '[{"url":"/images/products/jesus-piece-silver.jpg","alt":"Jesus piece moissanite argent","position":0}]',
  'moissanite', 'VVS full', 'D', 'silver-925', 10,
  'ICK-P-JP-S', 'NUOYA-JP-925', true, true,
  ARRAY['jesus','pendentif','ultra','iced-out','argent','hip-hop','925'], null, 24, 75, 'GRA'
),

-- ─────────────────────────────────────────────
-- EARRINGS
-- ─────────────────────────────────────────────
(
  'boucles-moissanite-6mm-argent',
  'Boucles d''Oreilles Moissanite 6mm',
  'Puces moissanite VVS 6mm (0.8ct×2) en argent 925. Passent le diamond test. Certifiées GRA.',
  'earring', 59, 79, 'entry',
  '[{"url":"/images/products/earrings-6mm.jpg","alt":"Boucles moissanite 6mm","position":0}]',
  'moissanite', '6mm', 'D', 'silver-925', 80,
  'ICK-E-6MM', 'NUOYA-EARRING-6MM', true, true,
  ARRAY['boucles','earrings','puces','moissanite','6mm'], null, null, 3, 'GRA'
),
(
  'boucles-moissanite-8mm-argent',
  'Boucles d''Oreilles Moissanite 8mm',
  'Puces moissanite VVS 8mm (2ct×2) en argent 925. Statement size. Passent le diamond test. Certifiées GRA.',
  'earring', 99, 129, 'mid',
  '[{"url":"/images/products/earrings-8mm.jpg","alt":"Boucles moissanite 8mm","position":0}]',
  'moissanite', '8mm', 'D', 'silver-925', 60,
  'ICK-E-8MM', 'NUOYA-EARRING-8MM', true, true,
  ARRAY['boucles','earrings','puces','moissanite','8mm','statement'], null, null, 4, 'GRA'
),
(
  'boucles-moissanite-9mm-argent',
  'Boucles d''Oreilles Moissanite 9mm',
  'Puces moissanite VVS 9mm (3ct×2) en argent 925. Taille premium. Passent le diamond test. Certifiées GRA.',
  'earring', 119, 159, 'mid',
  '[{"url":"/images/products/earrings-9mm.jpg","alt":"Boucles moissanite 9mm","position":0}]',
  'moissanite', '9mm', 'D', 'silver-925', 40,
  'ICK-E-9MM', 'NUOYA-EARRING-9MM', false, true,
  ARRAY['boucles','earrings','puces','moissanite','9mm'], null, null, 5, 'GRA'
),
(
  'boucles-moissanite-10mm-argent',
  'Boucles d''Oreilles Moissanite 10mm',
  'Puces moissanite VVS 10mm (4ct×2) en argent 925. Ultra statement. Passent le diamond test. Certifiées GRA.',
  'earring', 149, 199, 'mid',
  '[{"url":"/images/products/earrings-10mm.jpg","alt":"Boucles moissanite 10mm","position":0}]',
  'moissanite', '10mm', 'D', 'silver-925', 30,
  'ICK-E-10MM', 'NUOYA-EARRING-10MM', false, true,
  ARRAY['boucles','earrings','puces','moissanite','10mm','ultra'], null, null, 6, 'GRA'
),

-- ─────────────────────────────────────────────
-- RINGS
-- ─────────────────────────────────────────────
(
  'bague-solitaire-moissanite-argent',
  'Bague Solitaire Moissanite VVS',
  'Bague solitaire en argent 925 serti moissanite VVS. Diamond test validé. Certifiée GRA. Disponible en tailles 7 à 10.',
  'ring', 79, 99, 'entry',
  '[{"url":"/images/products/ring-solitaire.jpg","alt":"Bague solitaire moissanite","position":0}]',
  'moissanite', 'VVS', 'D', 'silver-925', 50,
  'ICK-R-SOL', 'NUOYA-RING-SOL', true, true,
  ARRAY['bague','ring','solitaire','moissanite','argent'], null, null, 5, 'GRA'
),
(
  'bague-lettre-moissanite-argent',
  'Bague Lettre Personnalisée Moissanite',
  'Bague lettre sur mesure en argent 925 serti moissanite VVS. 1 à 6 lettres. Certifiée GRA. Tailles 7 à 10.',
  'ring', 89, 119, 'entry',
  '[{"url":"/images/products/ring-letter.jpg","alt":"Bague lettre moissanite","position":0}]',
  'moissanite', 'VVS', 'D', 'silver-925', 40,
  'ICK-R-LET', 'NUOYA-RING-LETTER', false, true,
  ARRAY['bague','ring','lettre','personnalisé','moissanite'], null, null, 6, 'GRA'
);
