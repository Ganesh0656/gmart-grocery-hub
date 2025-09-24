import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  categories: {
    name: string;
  };
}

export default function CategoriesPage() {
  const { categoryId } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
    if (categoryId) {
      fetchProductsByCategory(categoryId);
      fetchCategoryDetails(categoryId);
    } else {
      fetchAllProducts();
    }
  }, [categoryId]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, sortBy]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    setCategories(data || []);
  };

  const fetchCategoryDetails = async (id: string) => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();
    setSelectedCategory(data);
  };

  const fetchProductsByCategory = async (id: string) => {
    const { data } = await supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        image_url,
        categories (
          name
        )
      `)
      .eq('category_id', id);
    setProducts(data || []);
  };

  const fetchAllProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        image_url,
        categories (
          name
        )
      `);
    setProducts(data || []);
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return 0; // Remove rating sort
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  if (!categoryId) {
    // Show all categories
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gmart-green">Shop by Category</h1>
            <p className="text-muted-foreground">Browse our wide range of fresh groceries and daily essentials</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/categories/${category.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-gmart-green/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-gmart-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-gmart-green">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show products for selected category
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm text-muted-foreground mb-4">
            <Link to="/categories" className="hover:text-gmart-green">Categories</Link>
            {selectedCategory && (
              <>
                <span className="mx-2">/</span>
                <span className="text-foreground">{selectedCategory.name}</span>
              </>
            )}
          </nav>
          
          {selectedCategory && (
            <>
              <h1 className="text-4xl font-bold mb-2 text-gmart-green">{selectedCategory.name}</h1>
              <p className="text-muted-foreground">{selectedCategory.description}</p>
            </>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gmart-green">
                    ${product.price.toFixed(2)}
                  </span>
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}