import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup functionality
    console.log("Newsletter signup");
  };

  const handleSocialClick = (platform: string) => {
    console.log(`${platform} clicked`);
  };

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Newsletter Section - Top */}
        <div className="text-center mb-8 sm:mb-12">
          <h4 className="text-lg sm:text-xl font-semibold mb-2">Stay Updated</h4>
          <p className="text-muted-foreground text-sm sm:text-base mb-4 max-w-md mx-auto">
            Get the latest offers and updates delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto space-y-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full text-sm sm:text-base"
            />
            <Button type="submit" className="w-full gradient-button text-sm sm:text-base py-2 sm:py-3">
              Subscribe
            </Button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Brand */}
          <div className="space-y-6 text-center md:text-left">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold font-poppins bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Hoomora
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Your trusted partner for comfortable and affordable hostel stays across India.
              </p>
              <div className="flex justify-center md:justify-start space-x-3 sm:space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick('Facebook')}
                  className="hover:text-primary transition-colors p-2 sm:p-3"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick('Twitter')}
                  className="hover:text-primary transition-colors p-2 sm:p-3"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialClick('Instagram')}
                  className="hover:text-primary transition-colors p-2 sm:p-3"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.148-1.189C4.613 15.101 4.062 13.95 4.062 12.653c0-1.297.55-2.448 1.239-3.148.688-.7 1.85-1.189 3.148-1.189 1.297 0 2.448.49 3.148 1.189.7.7 1.189 1.85 1.189 3.148 0 1.297-.49 2.448-1.189 3.148-.7.699-1.85 1.188-3.148 1.188zm7.009-9.404h-.878V5.623h.878v1.961zm1.878.699c-.7-.7-1.85-1.189-3.148-1.189-1.297 0-2.448.49-3.148 1.189-.7.7-1.189 1.85-1.189 3.148 0 1.297.49 2.448 1.189 3.148.7.7 1.85 1.189 3.148 1.189 1.297 0 2.448-.49 3.148-1.189.7-.7 1.189-1.85 1.189-3.148 0-1.297-.49-2.448-1.189-3.148z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Links & Support */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Quick Links */}
            <div className="space-y-4 text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary text-sm sm:text-base">Find Hostels</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary text-sm sm:text-base">My Bookings</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary text-sm sm:text-base">Manage Listings</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary text-sm sm:text-base">Dashboard</Button></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4 text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-semibold">Support</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary text-sm sm:text-base">Help Center</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary text-sm sm:text-base">Contact Us</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary text-sm sm:text-base">Privacy Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary text-sm sm:text-base">Terms of Service</Button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-muted-foreground text-xs sm:text-sm text-center sm:text-left">
            © 2024 Hoomora. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
            <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary text-xs sm:text-sm">
              Privacy
            </Button>
            <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary text-xs sm:text-sm">
              Terms
            </Button>
            <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary text-xs sm:text-sm">
              Cookies
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;