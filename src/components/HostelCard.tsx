import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Wifi, Snowflake, Dumbbell, Utensils, Bed } from "lucide-react";

interface HostelCardProps {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  price: number;
  priceType: "hour" | "day" | "month";
  vacantBeds: number;
  image: string;
  amenities: string[];
  status: "available" | "few-rooms" | "full";
  category?: string;
  onViewDetails: (id: string) => void;
  onBookNow: (id: string) => void;
}

const HostelCard = ({
  id,
  name,
  rating,
  reviews,
  location,
  price,
  priceType,
  vacantBeds,
  image,
  amenities,
  status,
  category,
  onViewDetails,
  onBookNow
}: HostelCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "available":
        return <Badge className="bg-success text-white">Available</Badge>;
      case "few-rooms":
        return <Badge className="bg-warning text-white">Few Rooms Left</Badge>;
      case "full":
        return <Badge variant="destructive">Fully Booked</Badge>;
      default:
        return null;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-3 w-3" />;
      case "ac":
        return <Snowflake className="h-3 w-3" />;
      case "gym":
        return <Dumbbell className="h-3 w-3" />;
      case "meals":
        return <Utensils className="h-3 w-3" />;
      case "laundry":
        return <span className="text-xs">🧺</span>;
      case "pool":
        return <span className="text-xs">🏊</span>;
      default:
        return null;
    }
  };

  const getPriceText = () => {
    switch (priceType) {
      case "hour":
        return `₹${price}/hour`;
      case "day":
        return `₹${price}/day`;
      case "month":
        return `₹${price.toLocaleString()}/month`;
      default:
        return `₹${price.toLocaleString()}`;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          {getStatusBadge()}
        </div>
        {category && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-foreground">{name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
          </div>
        </div>

        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-lg font-bold text-primary">{getPriceText()}</p>
          </div>
          {status !== "full" && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Vacant Beds</p>
              <div className="flex items-center text-sm font-medium">
                <Bed className="h-4 w-4 mr-1" />
                {vacantBeds} beds
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-1 text-xs text-muted-foreground">
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(id)}
          >
            View Details →
          </Button>
          {status === "full" ? (
            <Button variant="secondary" size="sm" className="flex-1">
              Join Waitlist →
            </Button>
          ) : (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onBookNow(id)}
            >
              Book Now →
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HostelCard;