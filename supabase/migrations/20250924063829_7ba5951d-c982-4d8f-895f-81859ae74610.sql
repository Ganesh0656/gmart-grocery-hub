-- Update products with proper image URLs
UPDATE products SET image_url = '/src/assets/product-tomatoes.jpg' WHERE name = 'Organic Tomatoes';
UPDATE products SET image_url = '/src/assets/product-milk.jpg' WHERE name = 'Fresh Milk' OR name LIKE '%Milk%';
UPDATE products SET image_url = '/src/assets/product-steak.jpg' WHERE name = 'Premium Beef' OR name LIKE '%Beef%' OR name LIKE '%Steak%';
UPDATE products SET image_url = '/src/assets/product-bread.jpg' WHERE name = 'Artisan Bread' OR name LIKE '%Bread%';
UPDATE products SET image_url = '/src/assets/product-orange-juice.jpg' WHERE name = 'Orange Juice' OR name LIKE '%Juice%' OR name LIKE '%Orange%';
UPDATE products SET image_url = '/src/assets/product-frozen-pizza.jpg' WHERE name = 'Frozen Pizza' OR name LIKE '%Pizza%' OR name LIKE '%Frozen%';

-- Update any remaining products without images to use placeholder images
UPDATE products SET image_url = '/src/assets/product-tomatoes.jpg' WHERE image_url IS NULL AND category_id = (SELECT id FROM categories WHERE name = 'Fresh Produce' LIMIT 1);
UPDATE products SET image_url = '/src/assets/product-milk.jpg' WHERE image_url IS NULL AND category_id = (SELECT id FROM categories WHERE name = 'Dairy & Eggs' LIMIT 1);
UPDATE products SET image_url = '/src/assets/product-steak.jpg' WHERE image_url IS NULL AND category_id = (SELECT id FROM categories WHERE name = 'Meat & Seafood' LIMIT 1);
UPDATE products SET image_url = '/src/assets/product-bread.jpg' WHERE image_url IS NULL AND category_id = (SELECT id FROM categories WHERE name = 'Bakery' LIMIT 1);
UPDATE products SET image_url = '/src/assets/product-orange-juice.jpg' WHERE image_url IS NULL AND category_id = (SELECT id FROM categories WHERE name = 'Beverages' LIMIT 1);
UPDATE products SET image_url = '/src/assets/product-frozen-pizza.jpg' WHERE image_url IS NULL AND category_id = (SELECT id FROM categories WHERE name = 'Frozen Foods' LIMIT 1);