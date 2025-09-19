import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

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
      <section className="bg-gradient-to-r from-gmart-green to-gmart-green/80 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-gmart-orange">Gmart</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Your one-stop shop for fresh groceries and daily essentials
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/categories">
              <Button size="lg" variant="secondary" className="bg-white text-gmart-green hover:bg-white/90">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gmart-green">
                Contact Us
              </Button>
            </Link>
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
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Browse our wide range of fresh groceries</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/categories/${category.id}`}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-gmart-green/20">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gmart-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </div>
                    <h3 className="font-semibold text-gmart-green">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/categories">
              <Button variant="outline" className="border-gmart-green text-gmart-green hover:bg-gmart-green hover:text-white">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
      <section className="py-16 bg-gmart-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of happy customers who trust Gmart for their grocery needs
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="bg-white text-gmart-green hover:bg-white/90">
              Sign Up Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}