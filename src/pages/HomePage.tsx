import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import freshProduceImg from '@/assets/category-fresh-produce.jpg';
import dairyImg from '@/assets/category-dairy.jpg';
import meatImg from '@/assets/category-meat.jpg';
import bakeryImg from '@/assets/category-bakery.jpg';
import beveragesImg from '@/assets/category-beverages.jpg';
import frozenImg from '@/assets/category-frozen.jpg';
import heroImg from '@/assets/hero-grocery-store.jpg';

interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  rating: number;
  review_count: number;
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
  }, []);

  // Category image mapping
  const categoryImages: Record<string, string> = {
    'Fresh Produce': freshProduceImg,
    'Dairy Products': dairyImg,
    'Meat & Poultry': meatImg,
    'Bakery': bakeryImg,
    'Beverages': beveragesImg,
    'Frozen Foods': frozenImg,
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .limit(6);
    setCategories(data || []);
  };

  const fetchFeaturedProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('id, name, price, image_url, rating, review_count')
      .gte('rating', 4.0)
      .limit(4);
    setFeaturedProducts(data || []);
  };

  const features = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your groceries delivered within 2 hours'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Your payments are safe and secure with us'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Customer support available round the clock'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[90vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-gmart-orange">Gmart</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Your one-stop destination for fresh groceries, quality products, and exceptional service delivered right to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/categories">
              <Button size="lg" className="bg-gmart-green hover:bg-gmart-green/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gmart-green px-8 py-4 text-lg font-semibold rounded-full">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Gmart?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-gmart-green/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gmart-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-gmart-green" />
                  </div>
                  <CardTitle className="text-gmart-green">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Discover fresh products across all our carefully curated categories</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} to={`/categories/${category.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 bg-white dark:bg-gray-900">
                  <div className="aspect-video relative">
                    <img
                      src={categoryImages[category.name] || category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-gray-200 text-sm">{category.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground">Top-rated products our customers love</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow border-gmart-green/20">
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold text-gmart-green">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-gmart-orange text-gmart-orange" />
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.review_count})
                      </span>
                    </div>
                  </div>
                  <Link to={`/products/${product.id}`}>
                    <Button className="w-full bg-gmart-green hover:bg-gmart-green/90">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gmart-green to-gmart-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Shopping?</h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Join thousands of satisfied customers who trust Gmart for their grocery needs. 
              Fresh products, competitive prices, and exceptional service await you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/categories">
                <Button size="lg" variant="secondary" className="bg-white text-gmart-green hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg">
                  Browse Categories <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}