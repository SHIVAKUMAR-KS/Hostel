import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Wifi, Snowflake, Dumbbell, Utensils, Car, Shield, Zap, Users, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import hostelRoom1 from "@/assets/hostel-room-1.jpg";
import hostelExterior from "@/assets/hostel-exterior.jpg";
import hostelCommon from "@/assets/hostel-common.jpg";

const HostelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { toast } = useToast();

  // Mock hostel data - in real app, fetch based on id
  const hostel = {
    id: "1",
    name: "Sunshine Hostel",
    rating: 4.5,
    reviews: 128,
    location: "Koramangala, Bangalore",
    price: 8000,
    priceType: "month",
    vacantBeds: 12,
    images: [hostelRoom1, hostelExterior, hostelCommon],
    amenities: ["WiFi", "AC", "Laundry", "Meals", "Gym", "Parking"],
    status: "available",
    category: "Students & Working Women",
    description: "A modern, well-maintained hostel perfect for students and working professionals. Located in the heart of Koramangala with easy access to IT companies and educational institutions.",
    facilities: [
      "24/7 Security",
      "Power Backup",
      "Hot Water",
      "Cleaning Service",
      "Common Kitchen",
      "Recreation Room"
    ],
    rules: [
      "No smoking inside premises",
      "Visitors allowed till 9 PM",
      "Maintain silence after 10 PM",
      "Keep common areas clean"
    ],
    nearbyPlaces: [
      "Forum Mall - 2 km",
      "Koramangala Metro - 1.5 km",
      "Hospitals - 1 km",
      "Restaurants - 0.5 km"
    ]
  };

  const handleBookNow = () => {
    navigate(`/book/${id}`);
  };

  const handleCallHostel = () => {
    toast({
      title: "Calling Hostel",
      description: "Redirecting to phone dialer...",
    });
  };

  const handleShareHostel = () => {
    navigator.share?.({
      title: hostel.name,
      text: `Check out ${hostel.name} - ${hostel.description}`,
      url: window.location.href
    }) || toast({
      title: "Link Copied",
      description: "Hostel link copied to clipboard!",
    });
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi": return <Wifi className="h-4 w-4" />;
      case "ac": return <Snowflake className="h-4 w-4" />;
      case "gym": return <Dumbbell className="h-4 w-4" />;
      case "meals": return <Utensils className="h-4 w-4" />;
      case "parking": return <Car className="h-4 w-4" />;
      case "laundry": return <span className="text-sm">🧺</span>;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignIn={() => setIsAuthModalOpen(true)} />
      
      <main className="responsive-container py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            ← Back to Search
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{hostel.name}</h1>
                <Badge variant="secondary">{hostel.category}</Badge>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-medium">{hostel.rating}</span>
                  <span>({hostel.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{hostel.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCallHostel}>
                📞 Call
              </Button>
              <Button variant="outline" onClick={handleShareHostel}>
                🔗 Share
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
                  <img 
                    src={hostel.images[0]} 
                    alt="Main" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {hostel.images.slice(1).map((img, idx) => (
                      <img 
                        key={idx}
                        src={img} 
                        alt={`View ${idx + 2}`} 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Hostel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{hostel.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities & Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hostel.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {hostel.facilities.map((facility, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rules */}
            <Card>
              <CardHeader>
                <CardTitle>House Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {hostel.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Book Your Stay</span>
                  <Badge className="bg-success text-white">Available</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">₹{hostel.price.toLocaleString()}</p>
                  <p className="text-muted-foreground">per month</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Vacant Beds
                    </span>
                    <span className="font-medium">{hostel.vacantBeds} available</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Check-in
                    </span>
                    <span className="font-medium">Flexible</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Duration
                    </span>
                    <span className="font-medium">Min 1 month</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full gradient-button" 
                  size="lg"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Free cancellation within 24 hours
                </p>
              </CardContent>
            </Card>

            {/* Nearby Places */}
            <Card>
              <CardHeader>
                <CardTitle>Nearby Places</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {hostel.nearbyPlaces.map((place, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">{place}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default HostelDetails;