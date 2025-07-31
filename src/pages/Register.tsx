import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AuthModal from "@/components/AuthModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Register = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsAuthModalOpen(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignIn={() => setIsAuthModalOpen(true)} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Get Started with HostelHub</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students and travelers finding their perfect accommodation
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">🏠</div>
                <CardTitle>Find Hostels</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Search and compare thousands of hostels across India with real reviews and photos.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">📅</div>
                <CardTitle>Flexible Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Book by the hour, day, or month. Perfect for students, working professionals, and travelers.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">✨</div>
                <CardTitle>Quality Assured</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All hostels are verified with quality amenities like WiFi, AC, meals, and more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleClose}
        initialMode="register"
      />
    </div>
  );
};

export default Register;