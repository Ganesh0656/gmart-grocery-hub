import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  categories: {
    name: string;
  };
}

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          name
        )
      `)
      .eq('id', productId)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return;
    }

    setProduct(data);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product.id, quantity);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/categories">
            <Button className="bg-gmart-green hover:bg-gmart-green/90">
              Back to Categories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/categories" className="inline-flex items-center text-muted-foreground hover:text-gmart-green mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Categories
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.categories.name}
              </Badge>
              <h1 className="text-3xl font-bold text-gmart-green">{product.name}</h1>
              <p className="text-muted-foreground mt-2">{product.description}</p>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-gmart-green">
              ${product.price.toFixed(2)}
            </div>

            {/* Stock */}
            <div className="text-muted-foreground">
              {product.stock > 0 ? (
                <span className="text-gmart-green">✓ In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-destructive">✗ Out of Stock</span>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Label>Quantity:</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  className="w-full bg-gmart-green hover:bg-gmart-green/90"
                  onClick={handleAddToCart}
                  disabled={!user}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {user ? 'Add to Cart' : 'Login to Add to Cart'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}