-- Update product image URLs to use public folder paths
UPDATE products SET image_url = '/images/product-tomatoes.jpg' WHERE name = 'Organic Tomatoes';
UPDATE products SET image_url = '/images/product-milk.jpg' WHERE name = 'Fresh Milk' OR name LIKE '%Milk%';
UPDATE products SET image_url = '/images/product-steak.jpg' WHERE name = 'Premium Beef' OR name LIKE '%Beef%' OR name LIKE '%Steak%';
UPDATE products SET image_url = '/images/product-bread.jpg' WHERE name = 'Artisan Bread' OR name LIKE '%Bread%';
UPDATE products SET image_url = '/images/product-orange-juice.jpg' WHERE name = 'Orange Juice' OR name LIKE '%Juice%' OR name LIKE '%Orange%';
UPDATE products SET image_url = '/images/product-frozen-pizza.jpg' WHERE name = 'Frozen Pizza' OR name LIKE '%Pizza%' OR name LIKE '%Frozen%';

-- Update category-based fallbacks for any remaining products
UPDATE products SET image_url = '/images/product-tomatoes.jpg' WHERE image_url LIKE '/src/assets/%' AND category_id = (SELECT id FROM categories WHERE name = 'Fresh Produce' LIMIT 1);
UPDATE products SET image_url = '/images/product-milk.jpg' WHERE image_url LIKE '/src/assets/%' AND category_id = (SELECT id FROM categories WHERE name = 'Dairy & Eggs' LIMIT 1);
UPDATE products SET image_url = '/images/product-steak.jpg' WHERE image_url LIKE '/src/assets/%' AND category_id = (SELECT id FROM categories WHERE name = 'Meat & Seafood' LIMIT 1);
UPDATE products SET image_url = '/images/product-bread.jpg' WHERE image_url LIKE '/src/assets/%' AND category_id = (SELECT id FROM categories WHERE name = 'Bakery' LIMIT 1);
UPDATE products SET image_url = '/images/product-orange-juice.jpg' WHERE image_url LIKE '/src/assets/%' AND category_id = (SELECT id FROM categories WHERE name = 'Beverages' LIMIT 1);
UPDATE products SET image_url = '/images/product-frozen-pizza.jpg' WHERE image_url LIKE '/src/assets/%' AND category_id = (SELECT id FROM categories WHERE name = 'Frozen Foods' LIMIT 1);

-- Update category image URLs to use public folder paths
UPDATE categories SET image_url = '/images/category-fresh-produce.jpg' WHERE name = 'Fresh Produce';
UPDATE categories SET image_url = '/images/category-dairy.jpg' WHERE name = 'Dairy & Eggs';
UPDATE categories SET image_url = '/images/category-meat.jpg' WHERE name = 'Meat & Seafood';
UPDATE categories SET image_url = '/images/category-bakery.jpg' WHERE name = 'Bakery';
UPDATE categories SET image_url = '/images/category-beverages.jpg' WHERE name = 'Beverages';
UPDATE categories SET image_url = '/images/category-frozen.jpg' WHERE name = 'Frozen Foods';