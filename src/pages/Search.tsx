import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SearchFilters, { SearchFilters as SearchFiltersType } from "@/components/SearchFilters";
import HostelCard from "@/components/HostelCard";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import hostelRoom1 from "@/assets/hostel-room-1.jpg";
import hostelExterior from "@/assets/hostel-exterior.jpg";
import hostelCommon from "@/assets/hostel-common.jpg";

// Sample hostel data
const sampleHostels = [
  {
    id: "1",
    name: "Sunshine Hostel",
    rating: 4.5,
    reviews: 128,
    location: "Koramangala, Bangalore",
    price: 8000,
    priceType: "month" as const,
    vacantBeds: 12,
    image: hostelRoom1,
    amenities: ["WiFi", "AC", "Laundry", "Meals"],
    status: "available" as const,
    category: "Students & Working Women"
  },
  {
    id: "2",
    name: "Green Valley PG",
    rating: 4.2,
    reviews: 95,
    location: "HSR Layout, Bangalore",
    price: 7500,
    priceType: "month" as const,
    vacantBeds: 5,
    image: hostelExterior,
    amenities: ["WiFi", "AC", "Gym", "Meals"],
    status: "few-rooms" as const,
    category: "Working Women Only"
  },
  {
    id: "3",
    name: "City Living Hostel",
    rating: 4.8,
    reviews: 156,
    location: "Indiranagar, Bangalore",
    price: 9000,
    priceType: "month" as const,
    vacantBeds: 0,
    image: hostelCommon,
    amenities: ["WiFi", "AC", "Pool", "Meals"],
    status: "full" as const,
    category: "Students Only"
  },
  {
    id: "4",
    name: "Budget Stay",
    rating: 4.0,
    reviews: 67,
    location: "Whitefield, Bangalore",
    price: 300,
    priceType: "day" as const,
    vacantBeds: 8,
    image: hostelRoom1,
    amenities: ["WiFi", "Laundry"],
    status: "available" as const,
    category: "Working Women Only"
  },
  {
    id: "5",
    name: "Hourly Rest",
    rating: 3.8,
    reviews: 42,
    location: "Electronic City, Bangalore",
    price: 150,
    priceType: "hour" as const,
    vacantBeds: 15,
    image: hostelExterior,
    amenities: ["WiFi", "AC"],
    status: "available" as const,
    category: "Students & Working Women"
  },
  {
    id: "6",
    name: "Executive Stay",
    rating: 4.6,
    reviews: 89,
    location: "Marathahalli, Bangalore",
    price: 10000,
    priceType: "month" as const,
    vacantBeds: 7,
    image: hostelCommon,
    amenities: ["WiFi", "AC", "Gym", "Pool", "Meals"],
    status: "available" as const,
    category: "Working Women Only"
  },
  {
    id: "7",
    name: "Student Hub",
    rating: 4.1,
    reviews: 134,
    location: "BTM Layout, Bangalore",
    price: 6500,
    priceType: "month" as const,
    vacantBeds: 20,
    image: hostelRoom1,
    amenities: ["WiFi", "AC", "Study Area", "Meals"],
    status: "available" as const,
    category: "Students Only"
  },
  {
    id: "8",
    name: "Corporate Residency",
    rating: 4.7,
    reviews: 78,
    location: "Bellandur, Bangalore",
    price: 11500,
    priceType: "month" as const,
    vacantBeds: 3,
    image: hostelExterior,
    amenities: ["WiFi", "AC", "Gym", "Pool", "Conference Room"],
    status: "few-rooms" as const,
    category: "Working Women Only"
  }
];

const Search = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(sampleHostels);
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (filters: SearchFiltersType) => {
    let filtered = [...sampleHostels];

    if (filters.location) {
      filtered = filtered.filter(hostel => 
        hostel.name.toLowerCase().includes(filters.location.toLowerCase()) ||
        hostel.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.priceRange && filters.priceRange !== "any") {
      const [min, max] = filters.priceRange.split("-").map(p => parseInt(p));
      filtered = filtered.filter(hostel => {
        const monthlyPrice = hostel.priceType === "month" ? hostel.price : 
                            hostel.priceType === "day" ? hostel.price * 30 :
                            hostel.price * 24 * 30;
        return max ? monthlyPrice >= min && monthlyPrice <= max : monthlyPrice >= min;
      });
    }

    setSearchResults(filtered);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/hostel/${id}`);
  };

  const handleBookNow = (id: string) => {
    navigate(`/book/${id}`);
  };

  const handleSignIn = () => {
    setIsAuthModalOpen(true);
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignIn={handleSignIn} />
      
      <main className="responsive-container py-6 sm:py-8">
        {/* Page Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="responsive-heading mb-2 sm:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-poppins">
            Find Your Perfect Hostel
          </h1>
          <p className="responsive-text text-muted-foreground max-w-2xl mx-auto">
            Search through thousands of verified hostels across India
          </p>
        </div>

        {/* Search Filters */}
        <div className="mb-6 sm:mb-8">
          <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <SearchFilters onSearch={handleSearch} />
            </CardContent>
          </Card>
        </div>

        {/* Map Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Search Results</h2>
            <p className="text-muted-foreground">{searchResults.length} hostels found</p>
          </div>
          <Button 
            onClick={toggleMap}
            variant="outline" 
            className="hidden md:flex"
          >
            {showMap ? "Hide Map" : "Show Map"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hostel Cards */}
          <div className={`${showMap ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-4 sm:space-y-6`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {searchResults.map((hostel) => (
                <div key={hostel.id} className="transform hover:scale-105 transition-all duration-300">
                  <HostelCard
                    {...hostel}
                    onViewDetails={handleViewDetails}
                    onBookNow={handleBookNow}
                  />
                </div>
              ))}
            </div>

            {/* No Results */}
            {searchResults.length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <div className="text-4xl sm:text-6xl mb-4">🏠</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">No hostels found</h3>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Try adjusting your search filters to find more options.
                </p>
                <Button 
                  onClick={() => setSearchResults(sampleHostels)}
                  className="mobile-friendly-button"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {searchResults.length > 0 && (
              <div className="text-center pt-6 sm:pt-8">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="gradient-button mobile-friendly-button w-full sm:w-auto"
                >
                  Load More Results
                </Button>
              </div>
            )}
          </div>

          {/* Map Section */}
          {showMap && (
            <div className="lg:col-span-1">
              <Card className="sticky top-8 h-[600px]">
                <CardContent className="p-6 h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground text-center text-sm mb-6">
                    View hostel locations on an interactive map
                  </p>
                  <div className="w-full h-32 bg-muted/50 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Map Loading...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Mobile Map Button */}
        <div className="md:hidden mt-6 sm:mt-8">
          <Button 
            onClick={toggleMap}
            className="w-full gradient-button mobile-friendly-button"
          >
            {showMap ? "Hide Map" : "View on Map"}
          </Button>
          
          {showMap && (
            <Card className="mt-4 h-64 sm:h-80">
              <CardContent className="p-4 sm:p-6 h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mb-3 sm:mb-4 animate-pulse">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Mobile Map View</h3>
                <p className="text-muted-foreground text-center text-sm">
                  Interactive map for mobile devices
                </p>
              </CardContent>
            </Card>
          )}
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

export default Search;