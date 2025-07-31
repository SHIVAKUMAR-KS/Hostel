import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AuthModal from "@/components/AuthModal";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Star } from "lucide-react";
import { format, addDays, addHours, subDays } from "date-fns";
import hostelRoom1 from "@/assets/hostel-room-1.jpg";
import hostelExterior from "@/assets/hostel-exterior.jpg";
import hostelCommon from "@/assets/hostel-common.jpg";

// Sample booking data
const sampleBookings = [
  {
    id: "B001",
    hostelName: "Sunshine Hostel",
    location: "Koramangala, Bangalore",
    rating: 4.5,
    image: hostelRoom1,
    bookingType: "month",
    duration: 3,
    checkIn: subDays(new Date(), 15),
    checkOut: addDays(new Date(), 75),
    guests: 1,
    roomType: "Private Room",
    totalAmount: 24000,
    status: "active",
    amenities: ["WiFi", "AC", "Laundry", "Meals"]
  },
  {
    id: "B002",
    hostelName: "Green Valley PG",
    location: "HSR Layout, Bangalore",
    rating: 4.2,
    image: hostelExterior,
    bookingType: "day",
    duration: 7,
    checkIn: addDays(new Date(), 5),
    checkOut: addDays(new Date(), 12),
    guests: 2,
    roomType: "Shared Room",
    totalAmount: 2100,
    status: "upcoming",
    amenities: ["WiFi", "AC", "Gym", "Meals"]
  },
  {
    id: "B003",
    hostelName: "City Living Hostel",
    location: "Indiranagar, Bangalore",
    rating: 4.8,
    image: hostelCommon,
    bookingType: "hour",
    duration: 8,
    checkIn: subDays(new Date(), 2),
    checkOut: addHours(subDays(new Date(), 2), 8),
    guests: 1,
    roomType: "Dormitory",
    totalAmount: 1200,
    status: "completed",
    amenities: ["WiFi", "AC", "Pool", "Meals"]
  },
  {
    id: "B004",
    hostelName: "Budget Stay",
    location: "Whitefield, Bangalore",
    rating: 4.0,
    image: hostelRoom1,
    bookingType: "day",
    duration: 2,
    checkIn: addDays(new Date(), 10),
    checkOut: addDays(new Date(), 12),
    guests: 1,
    roomType: "Private Room",
    totalAmount: 600,
    status: "upcoming",
    amenities: ["WiFi", "Laundry"]
  }
];

const Bookings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "upcoming" | "completed">("all");

  const filteredBookings = filter === "all" 
    ? sampleBookings 
    : sampleBookings.filter(booking => booking.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success text-white">Active</Badge>;
      case "upcoming":
        return <Badge className="bg-info text-white">Upcoming</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDurationText = (bookingType: string, duration: number) => {
    switch (bookingType) {
      case "hour":
        return `${duration} hour${duration > 1 ? "s" : ""}`;
      case "day":
        return `${duration} day${duration > 1 ? "s" : ""}`;
      case "month":
        return `${duration} month${duration > 1 ? "s" : ""}`;
      default:
        return `${duration}`;
    }
  };

  const handleExtendStay = (bookingId: string) => {
    toast({
      title: "Extend Stay",
      description: "Redirecting to extend your booking...",
    });
  };

  const handleCancelBooking = (bookingId: string) => {
    toast({
      title: "Cancel Booking",
      description: "Your booking has been cancelled successfully.",
    });
  };

  const handleModifyBooking = (bookingId: string) => {
    toast({
      title: "Modify Booking",
      description: "Redirecting to modify your booking...",
    });
  };

  const handleReviewBooking = (bookingId: string) => {
    toast({
      title: "Write Review",
      description: "Opening review form...",
    });
  };

  const handleBookAgain = (bookingId: string) => {
    navigate("/search");
    toast({
      title: "Book Again",
      description: "Find similar hostels to book again.",
    });
  };

  const getActionButton = (booking: any) => {
    switch (booking.status) {
      case "active":
        return (
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleExtendStay(booking.id)}>
              Extend Stay
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleCancelBooking(booking.id)}>
              Cancel
            </Button>
          </div>
        );
      case "upcoming":
        return (
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleModifyBooking(booking.id)}>
              Modify
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleCancelBooking(booking.id)}>
              Cancel
            </Button>
          </div>
        );
      case "completed":
        return (
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleReviewBooking(booking.id)}>
              Review
            </Button>
            <Button size="sm" onClick={() => handleBookAgain(booking.id)}>
              Book Again
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignIn={() => setIsAuthModalOpen(true)} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {[
            { key: "all", label: "All Bookings" },
            { key: "active", label: "Active" },
            { key: "upcoming", label: "Upcoming" },
            { key: "completed", label: "Completed" }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={filter === tab.key ? "default" : "outline"}
              onClick={() => setFilter(tab.key as any)}
              className="whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No bookings found</h3>
              <p className="text-muted-foreground mb-6">
                {filter === "all" ? "You haven't made any bookings yet." : `No ${filter} bookings found.`}
              </p>
              <Button onClick={() => window.location.href = "/"}>
                Find Hostels
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                    {/* Hostel Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={booking.image}
                        alt={booking.hostelName}
                        className="w-full lg:w-32 h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{booking.hostelName}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-warning text-warning" />
                              <span className="text-sm font-medium">{booking.rating}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{booking.location}</span>
                            </div>
                          </div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Check-in</p>
                            <p className="text-muted-foreground">
                              {format(booking.checkIn, "MMM dd, yyyy")}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Duration</p>
                            <p className="text-muted-foreground">
                              {getDurationText(booking.bookingType, booking.duration)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Guests & Room</p>
                            <p className="text-muted-foreground">
                              {booking.guests} guest{booking.guests > 1 ? "s" : ""} • {booking.roomType}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Amount</p>
                          <p className="text-lg font-bold text-primary">
                            ₹{booking.totalAmount.toLocaleString()}
                          </p>
                        </div>
                        {getActionButton(booking)}
                      </div>
                    </div>
                  </div>

                  {/* Booking ID */}
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Booking ID: <span className="font-mono">{booking.id}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default Bookings;