import { useState } from "react";
import Navigation from "@/components/Navigation";
import AuthModal from "@/components/AuthModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Eye, MapPin, Star, Bed } from "lucide-react";
import hostelRoom1 from "@/assets/hostel-room-1.jpg";
import hostelExterior from "@/assets/hostel-exterior.jpg";
import hostelCommon from "@/assets/hostel-common.jpg";

// Sample listings data
const sampleListings = [
  {
    id: "L001",
    name: "Sunshine Hostel",
    location: "Koramangala, Bangalore",
    rating: 4.5,
    reviews: 128,
    image: hostelRoom1,
    totalBeds: 20,
    occupiedBeds: 8,
    monthlyRevenue: 64000,
    status: "active",
    amenities: ["WiFi", "AC", "Laundry", "Meals"],
    pricing: { hour: 150, day: 300, month: 8000 }
  },
  {
    id: "L002",
    name: "Green Valley PG",
    location: "HSR Layout, Bangalore",
    rating: 4.2,
    reviews: 95,
    image: hostelExterior,
    totalBeds: 15,
    occupiedBeds: 10,
    monthlyRevenue: 75000,
    status: "active",
    amenities: ["WiFi", "AC", "Gym", "Meals"],
    pricing: { hour: 120, day: 250, month: 7500 }
  },
  {
    id: "L003",
    name: "City Living Hostel",
    location: "Indiranagar, Bangalore",
    rating: 4.8,
    reviews: 156,
    image: hostelCommon,
    totalBeds: 25,
    occupiedBeds: 25,
    monthlyRevenue: 225000,
    status: "full",
    amenities: ["WiFi", "AC", "Pool", "Meals"],
    pricing: { hour: 200, day: 400, month: 9000 }
  }
];

const ManageListings = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [listings, setListings] = useState(sampleListings);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredListings = listings.filter(listing =>
    listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success text-white">Active</Badge>;
      case "full":
        return <Badge className="bg-warning text-white">Fully Booked</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getOccupancyRate = (occupied: number, total: number) => {
    return Math.round((occupied / total) * 100);
  };

  const handleDeleteListing = (id: string) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignIn={() => setIsAuthModalOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Listings</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Listing
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Listings</p>
                  <p className="text-2xl font-bold">{listings.length}</p>
                </div>
                <div className="text-primary">🏠</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Beds</p>
                  <p className="text-2xl font-bold">
                    {listings.reduce((sum, listing) => sum + listing.totalBeds, 0)}
                  </p>
                </div>
                <Bed className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                  <p className="text-2xl font-bold">
                    {Math.round(
                      (listings.reduce((sum, listing) => sum + listing.occupiedBeds, 0) /
                      listings.reduce((sum, listing) => sum + listing.totalBeds, 0)) * 100
                    )}%
                  </p>
                </div>
                <div className="text-primary">📊</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold">
                    ₹{(listings.reduce((sum, listing) => sum + listing.monthlyRevenue, 0) / 100000).toFixed(1)}L
                  </p>
                </div>
                <div className="text-primary">💰</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search listings by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Listings */}
        {filteredListings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-lg font-medium mb-2">No listings found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? "No listings match your search criteria." : "You haven't created any listings yet."}
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Listing
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                    {/* Listing Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={listing.image}
                        alt={listing.name}
                        className="w-full lg:w-32 h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Listing Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{listing.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-warning text-warning" />
                              <span className="text-sm font-medium">{listing.rating}</span>
                              <span className="text-sm text-muted-foreground">({listing.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{listing.location}</span>
                            </div>
                          </div>
                        </div>
                        {getStatusBadge(listing.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Occupancy</p>
                          <p className="text-muted-foreground">
                            {listing.occupiedBeds}/{listing.totalBeds} beds ({getOccupancyRate(listing.occupiedBeds, listing.totalBeds)}%)
                          </p>
                        </div>
                        
                        <div>
                          <p className="font-medium">Monthly Revenue</p>
                          <p className="text-muted-foreground">
                            ₹{listing.monthlyRevenue.toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <p className="font-medium">Pricing</p>
                          <p className="text-muted-foreground">
                            ₹{listing.pricing.hour}/hr • ₹{listing.pricing.day}/day • ₹{listing.pricing.month.toLocaleString()}/mo
                          </p>
                        </div>

                        <div>
                          <p className="font-medium">Amenities</p>
                          <p className="text-muted-foreground">
                            {listing.amenities.slice(0, 2).join(", ")}
                            {listing.amenities.length > 2 && ` +${listing.amenities.length - 2} more`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="text-sm text-muted-foreground">
                          Listing ID: <span className="font-mono">{listing.id}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteListing(listing.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
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

export default ManageListings;