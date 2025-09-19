import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gmart-green rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <h3 className="text-xl font-bold text-gmart-green">Gmart</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted online grocery store. Fresh products, fast delivery, 
              and secure payments - everything you need for your daily shopping.
            </p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <span>📦 Fast Delivery</span>
              <span>🔒 Secure Payment</span>
              <span>📞 24/7 Support</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-gmart-green transition-colors">
                Home
              </Link>
              <Link to="/categories" className="block text-muted-foreground hover:text-gmart-green transition-colors">
                Categories
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-gmart-green transition-colors">
                Contact
              </Link>
              <Link to="/auth" className="block text-muted-foreground hover:text-gmart-green transition-colors">
                Sign In
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>📍 New Bus Stand, Puduvayal, Karaikudi</p>
              <p>📞 9047804855</p>
              <p>📮 Pin code: 630108</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Gmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}