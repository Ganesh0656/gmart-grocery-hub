-- Insert sample categories with images
INSERT INTO public.categories (name, description, image_url) VALUES
('Fresh Produce', 'Fresh fruits and vegetables', '/src/assets/category-fresh-produce.jpg'),
('Dairy Products', 'Milk, cheese, yogurt and more', '/src/assets/category-dairy.jpg'),
('Meat & Poultry', 'Fresh meat and poultry', '/src/assets/category-meat.jpg'),
('Bakery', 'Fresh bread and baked goods', '/src/assets/category-bakery.jpg'),
('Beverages', 'Drinks, juices, and beverages', '/src/assets/category-beverages.jpg'),
('Frozen Foods', 'Frozen meals and ice cream', '/src/assets/category-frozen.jpg')
ON CONFLICT (name) DO UPDATE SET
description = EXCLUDED.description,
image_url = EXCLUDED.image_url;

-- Insert sample products for each category
-- Fresh Produce products
WITH fresh_produce_category AS (
  SELECT id FROM public.categories WHERE name = 'Fresh Produce' LIMIT 1
)
INSERT INTO public.products (name, description, price, stock, category_id, rating, review_count, image_url) 
SELECT * FROM (VALUES
  ('Organic Bananas', 'Fresh organic bananas, perfect for smoothies and snacking', 2.99, 150, (SELECT id FROM fresh_produce_category), 4.5, 87, 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400'),
  ('Red Apples', 'Crispy and sweet red apples, locally sourced', 3.49, 200, (SELECT id FROM fresh_produce_category), 4.3, 64, 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400'),
  ('Fresh Spinach', 'Organic baby spinach leaves, great for salads', 2.79, 80, (SELECT id FROM fresh_produce_category), 4.6, 45, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400'),
  ('Carrots Bundle', 'Fresh carrots, perfect for cooking and snacking', 1.99, 120, (SELECT id FROM fresh_produce_category), 4.4, 52, 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400'),
  ('Organic Tomatoes', 'Vine-ripened organic tomatoes, bursting with flavor', 4.29, 90, (SELECT id FROM fresh_produce_category), 4.7, 73, 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400')
) AS t(name, description, price, stock, category_id, rating, review_count, image_url)
WHERE NOT EXISTS (SELECT 1 FROM products WHERE products.name = t.name);

-- Dairy Products
WITH dairy_category AS (
  SELECT id FROM public.categories WHERE name = 'Dairy Products' LIMIT 1
)
INSERT INTO public.products (name, description, price, stock, category_id, rating, review_count, image_url) 
SELECT * FROM (VALUES
  ('Whole Milk', 'Fresh whole milk from local farms, 1 gallon', 4.49, 100, (SELECT id FROM dairy_category), 4.5, 92, 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400'),
  ('Greek Yogurt', 'Creamy Greek yogurt, high in protein', 5.99, 75, (SELECT id FROM dairy_category), 4.6, 68, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400'),
  ('Cheddar Cheese', 'Sharp cheddar cheese, aged to perfection', 7.99, 60, (SELECT id FROM dairy_category), 4.4, 41, 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400'),
  ('Butter', 'Premium unsalted butter, perfect for baking', 3.99, 85, (SELECT id FROM dairy_category), 4.3, 35, 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400'),
  ('Organic Eggs', 'Free-range organic eggs, dozen pack', 5.49, 110, (SELECT id FROM dairy_category), 4.8, 156, 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400')
) AS t(name, description, price, stock, category_id, rating, review_count, image_url)
WHERE NOT EXISTS (SELECT 1 FROM products WHERE products.name = t.name);

-- Meat & Poultry
WITH meat_category AS (
  SELECT id FROM public.categories WHERE name = 'Meat & Poultry' LIMIT 1
)
INSERT INTO public.products (name, description, price, stock, category_id, rating, review_count, image_url) 
SELECT * FROM (VALUES
  ('Chicken Breast', 'Boneless skinless chicken breast, 2 lbs', 12.99, 45, (SELECT id FROM meat_category), 4.5, 78, 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400'),
  ('Ground Beef', 'Fresh ground beef, 80/20 lean, 1 lb', 8.99, 50, (SELECT id FROM meat_category), 4.3, 62, 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400'),
  ('Salmon Fillet', 'Fresh Atlantic salmon fillet, 1.5 lbs', 18.99, 25, (SELECT id FROM meat_category), 4.7, 89, 'https://images.unsplash.com/photo-1574781330855-d0db2706b2d7?w=400'),
  ('Pork Tenderloin', 'Tender pork tenderloin, perfect for roasting', 14.49, 30, (SELECT id FROM meat_category), 4.4, 43, 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400'),
  ('Turkey Slices', 'Deli turkey slices, low sodium, 1 lb', 9.99, 40, (SELECT id FROM meat_category), 4.2, 37, 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400')
) AS t(name, description, price, stock, category_id, rating, review_count, image_url)
WHERE NOT EXISTS (SELECT 1 FROM products WHERE products.name = t.name);

-- Bakery
WITH bakery_category AS (
  SELECT id FROM public.categories WHERE name = 'Bakery' LIMIT 1
)
INSERT INTO public.products (name, description, price, stock, category_id, rating, review_count, image_url) 
SELECT * FROM (VALUES
  ('Sourdough Bread', 'Artisan sourdough bread, freshly baked', 4.99, 35, (SELECT id FROM bakery_category), 4.6, 124, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'),
  ('Croissants', 'Buttery French croissants, pack of 6', 6.99, 20, (SELECT id FROM bakery_category), 4.5, 67, 'https://images.unsplash.com/photo-1555507036-ab794f4aaab3?w=400'),
  ('Blueberry Muffins', 'Fresh blueberry muffins, pack of 4', 5.49, 25, (SELECT id FROM bakery_category), 4.4, 52, 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400'),
  ('Whole Wheat Bread', 'Healthy whole wheat bread loaf', 3.99, 40, (SELECT id FROM bakery_category), 4.3, 38, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'),
  ('Chocolate Cake', 'Decadent chocolate layer cake, serves 8', 24.99, 8, (SELECT id FROM bakery_category), 4.8, 195, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400')
) AS t(name, description, price, stock, category_id, rating, review_count, image_url)
WHERE NOT EXISTS (SELECT 1 FROM products WHERE products.name = t.name);

-- Beverages
WITH beverages_category AS (
  SELECT id FROM public.categories WHERE name = 'Beverages' LIMIT 1
)
INSERT INTO public.products (name, description, price, stock, category_id, rating, review_count, image_url) 
SELECT * FROM (VALUES
  ('Orange Juice', 'Fresh squeezed orange juice, 64 oz', 6.49, 55, (SELECT id FROM beverages_category), 4.4, 83, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400'),
  ('Coffee Beans', 'Premium arabica coffee beans, 2 lbs', 15.99, 70, (SELECT id FROM beverages_category), 4.7, 142, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'),
  ('Sparkling Water', 'Natural sparkling water, 12 pack', 8.99, 80, (SELECT id FROM beverages_category), 4.2, 46, 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400'),
  ('Green Tea', 'Organic green tea bags, pack of 20', 12.99, 45, (SELECT id FROM beverages_category), 4.5, 74, 'https://images.unsplash.com/photo-1556881286-fc54be662050?w=400'),
  ('Apple Cider', 'Fresh apple cider, locally made, 64 oz', 7.99, 30, (SELECT id FROM beverages_category), 4.6, 58, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400')
) AS t(name, description, price, stock, category_id, rating, review_count, image_url)
WHERE NOT EXISTS (SELECT 1 FROM products WHERE products.name = t.name);

-- Frozen Foods
WITH frozen_category AS (
  SELECT id FROM public.categories WHERE name = 'Frozen Foods' LIMIT 1
)
INSERT INTO public.products (name, description, price, stock, category_id, rating, review_count, image_url) 
SELECT * FROM (VALUES
  ('Vanilla Ice Cream', 'Premium vanilla ice cream, 1.5 quarts', 8.99, 60, (SELECT id FROM frozen_category), 4.5, 111, 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400'),
  ('Frozen Pizza', 'Margherita frozen pizza, wood-fired taste', 7.49, 40, (SELECT id FROM frozen_category), 4.2, 63, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400'),
  ('Frozen Berries', 'Mixed berry blend, perfect for smoothies', 9.99, 35, (SELECT id FROM frozen_category), 4.6, 87, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'),
  ('Chicken Nuggets', 'All-natural chicken nuggets, family size', 11.99, 50, (SELECT id FROM frozen_category), 4.1, 94, 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400'),
  ('Frozen Vegetables', 'Mixed vegetable medley, steam-in-bag', 4.99, 75, (SELECT id FROM frozen_category), 4.3, 52, 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400')
) AS t(name, description, price, stock, category_id, rating, review_count, image_url)
WHERE NOT EXISTS (SELECT 1 FROM products WHERE products.name = t.name);