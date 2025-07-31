import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Users, CreditCard, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import hostelRoom1 from "@/assets/hostel-room-1.jpg";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    duration: "1",
    durationType: "month",
    checkIn: "",
    guests: "1",
    roomType: "shared",
    specialRequests: ""
  });
  const { toast } = useToast();

  const hostel = {
    name: "Sunshine Hostel",
    rating: 4.5,
    reviews: 128,
    location: "Koramangala, Bangalore",
    price: 8000,
    image: hostelRoom1,
    category: "Students & Working Women"
  };

  const handleBooking = () => {
    toast({
      title: "Booking Confirmed!",
      description: `Your booking at ${hostel.name} has been confirmed.`,
    });
    setTimeout(() => navigate("/bookings"), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignIn={() => setIsAuthModalOpen(true)} />
      
      <main className="responsive-container py-6 sm:py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          ← Back
        </Button>
        
        <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Duration</Label>
                    <Input value="1" />
                  </div>
                  <div>
                    <Label>Guests</Label>
                    <Input value="1" />
                  </div>
                </div>
                <div>
                  <Label>Check-in Date</Label>
                  <Input type="date" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <p className="text-2xl font-bold">₹8,000</p>
                <p className="text-muted-foreground">per month</p>
              </div>
              <Button className="w-full gradient-button" onClick={handleBooking}>
                Confirm Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default BookingPage;