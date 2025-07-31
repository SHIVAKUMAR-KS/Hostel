import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Home, Search, BarChart3, Calendar, User, Menu, X } from "lucide-react";

import Nav_Logo from "../assets/Nav_Logo.png";

interface NavigationProps {
  onSignIn: () => void;
}

const Navigation = ({ onSignIn }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/search", label: "Find Hostels", icon: Search },
    { path: "/dashboard", label: "My Dashboard", icon: BarChart3 },
    { path: "/bookings", label: "My Bookings", icon: Calendar },
  ];

  const NavLink = ({ path, label, icon: Icon, mobile = false }: { path: string; label: string; icon: any; mobile?: boolean }) => (
    <Link
      to={path}
      onClick={() => mobile && setIsOpen(false)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive(path) 
          ? "bg-primary text-primary-foreground shadow-lg" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      } ${mobile ? 'w-full justify-start' : ''}`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-0 flex-shrink-0">
            <img 
              src={Nav_Logo}
              alt="Logo"
              className="w-12 h-14"
            />

            <span className="text-2xl font-bold font-poppins bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Hoomora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink key={item.path} {...item} />
            ))}
          </div>

          {/* Desktop Auth Button */}
          <div className="hidden lg:flex items-center">
            <Button 
              className="gradient-button shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader className="pb-6">
                <SheetTitle className="text-left">
                      <div className="flex items-center space-x-0">
                        <img
                          src={Nav_Logo}
                          alt="Logo"
                          className="w-8 h-10"
                        />
                        <span className="ml-2 text-2xl font-bold font-poppins bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          Hoomora
                        </span>
                      </div>
                    </SheetTitle>

                </SheetHeader>
                
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <NavLink key={item.path} {...item} mobile />
                  ))}
                  
                  <div className="pt-6 border-t">
                    <Button 
                      className="w-full gradient-button" 
                      onClick={() => {
                        navigate("/register");
                        setIsOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Tablet Navigation (Hidden on Mobile and Desktop) */}
      <div className="hidden md:flex lg:hidden border-t bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center space-x-8 py-3">
            {navItems.slice(0, 4).map((item) => (
              <NavLink key={item.path} {...item} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;