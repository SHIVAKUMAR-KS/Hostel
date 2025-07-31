import { useState, useEffect } from "react";
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
import heroBackground from "@/assets/hero-background.jpg";
import Typewriter from "@/components/Typewriter";


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
    status: "available" as const
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
    status: "few-rooms" as const
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
    status: "full" as const
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
    status: "available" as const
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
    status: "available" as const
  }
];

const Home = () => {
  const [hostels, setHostels] = useState(sampleHostels);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(sampleHostels);
  const [typedText, setTypedText] = useState('');
  const fullText = "Hostel Living";
  const navigate = useNavigate();
  useEffect(() => {
    let i = 0;
    let isDeleting = false;

    const type = () => {
      setTypedText(fullText.slice(0, i));

      if (!isDeleting) {
        if (i < fullText.length) {
          i++;
          setTimeout(type, 100);
        } else {
          isDeleting = true;
          setTimeout(type, 1000); // pause before deleting
        }
      } else {
        if (i > 0) {
          i--;
          setTimeout(type, 50);
        } else {
          isDeleting = false;
          setTimeout(type, 500); // pause before typing again
        }
      }
    };

    type();

    return () => { }; // no cleanup needed since timeout is recursive
  }, []);



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

  const handleExploreHostels = () => {
    document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleListProperty = () => {
    navigate('/manage-listings');
  };

  const handleLearnMore = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSignIn={handleSignIn} />

      {/* Hero Section with Background */}
      <div
        className="relative min-h-screen flex items-center justify-center hero-background"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Typewriter />


          <p className=" text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Discover comfortable, affordable hostels across India. From hourly stays to monthly bookings,
            experience the future of accommodation with verified listings and instant booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-fade-in">
            <Button
              onClick={handleExploreHostels}
              className="gradient-button text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 mobile-friendly-button w-full sm:w-auto"
            >
              Start Your Journey
            </Button>
            <Button
              onClick={handleListProperty}
              variant="outline"
              size="lg"
              className="bg-gradient-to-r from-[#A000D8] via-[#FF1493] to-[#FF0000] bg-clip-text text-transparent
 font-bold"
            >
              List Your Property
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLearnMore}
            className="text-white/70 hover:text-white mobile-friendly-button"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Button>
        </div>
      </div>

      <main className="responsive-container py-8 sm:py-16">
        {/* Why Choose Us Section */}
        <div
          id="features-section"
          className="relative mb-12 sm:mb-20 py-16 px-4 sm:px-0 overflow-hidden"
        >
          {/* Background Gradient Shape */}
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-primary/30 via-accent/20 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none z-0"></div>

          <div className="text-center mb-8 sm:mb-16 relative z-10">
            <h2 className="responsive-heading mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-poppins drop-shadow-lg">
              Why Choose Hoomora?
            </h2>
            <p className="responsive-text text-muted-foreground max-w-3xl mx-auto">
              We revolutionize hostel booking with cutting-edge technology and unmatched service quality.
            </p>
          </div>

          <div className="responsive-grid relative z-10 gap-8">
            {/* Feature Card 1 */}
            <div className="feature-card glass-card text-center group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                {/* Location Icon */}
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-poppins mb-4 text-primary">Prime Locations</h3>
              <p className="text-muted-foreground text-lg">Strategic locations in the heart of major cities across India, ensuring easy access to transport and amenities.</p>
            </div>

            {/* Feature Card 2 */}
            <div className="feature-card glass-card text-center group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-fade-in [animation-delay:.1s]">
              <div className="w-20 h-20 bg-gradient-to-tr from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                {/* Star Icon */}
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-poppins mb-4 text-accent">Premium Quality</h3>
              <p className="text-muted-foreground text-lg">Rigorously verified properties with high standards for cleanliness, safety, and comfort.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="feature-card glass-card text-center group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-fade-in [animation-delay:.2s]">
              <div className="w-20 h-20 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                {/* Check Icon */}
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-poppins mb-4 text-primary">Smart Booking</h3>
              <p className="text-muted-foreground text-lg">Advanced booking system with flexible hourly, daily, and monthly rates tailored to your needs.</p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div id="services-section" className="relative mb-20 py-16 px-4 sm:px-0 overflow-hidden">
          {/* Background Gradient Shape */}
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-accent/30 via-primary/20 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none z-0"></div>

          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl font-bold font-poppins mb-6 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent drop-shadow-lg">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solutions for all your accommodation needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            <Card className="glass-card group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-fade-in">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Hourly Stays</h3>
                <p className="text-muted-foreground text-base">Perfect for short breaks and transit stays</p>
              </CardContent>
            </Card>
            <Card className="glass-card group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-fade-in [animation-delay:.1s]">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-accent">Daily Booking</h3>
                <p className="text-muted-foreground text-base">Flexible daily rates for extended stays</p>
              </CardContent>
            </Card>
            <Card className="glass-card group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-fade-in [animation-delay:.2s]">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7h-3V2h-2v2H8V2H6v2H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H3V9h18v11z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Monthly Plans</h3>
                <p className="text-muted-foreground text-base">Long-term stays with special discounts</p>
              </CardContent>
            </Card>
            <Card className="glass-card group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-fade-in [animation-delay:.3s]">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-accent">Premium Support</h3>
                <p className="text-muted-foreground text-base">24/7 customer service and assistance</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search Section */}
        <div id="search-section" className="relative mb-24 py-16 px-4 sm:px-0 flex flex-col items-center justify-center overflow-hidden">
          {/* Background Gradient Shape */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-primary/20 via-accent/20 to-transparent rounded-3xl blur-2xl opacity-60 pointer-events-none z-0"></div>
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-4xl font-bold font-poppins mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg">Find Your Perfect Stay</h2>
            <p className="text-xl text-muted-foreground">
              Search and filter through thousands of verified hostels
            </p>
          </div>
          <div className=" ">
            <div className="glass-card p-10 shadow-2xl">
              <SearchFilters onSearch={handleSearch} />
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="bg-gradient-to-br from-muted/50 to-muted rounded-2xl p-16 mb-20 text-center shadow-inner">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6 animate-pulse">
            <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold font-poppins mb-4">Interactive Location Map</h3>
          <p className="text-muted-foreground text-lg mb-6">
            Explore hostels near you with our interactive map feature
          </p>
          <Button className="gradient-button">
            View Map
          </Button>
        </div>

        {/* Featured Hostels */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold font-poppins mb-2">Featured Hostels</h2>
              <p className="text-muted-foreground">Handpicked properties for the best experience</p>
            </div>
            <Button
              onClick={() => navigate('/search')}
              variant="outline"
              className="hidden md:flex hover:bg-primary/5"
            >
              View All Hostels →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {searchResults.slice(0, 6).map((hostel) => (
              <div key={hostel.id} className="transform hover:scale-105 transition-all duration-300">
                <HostelCard
                  {...hostel}
                  onViewDetails={handleViewDetails}
                  onBookNow={handleBookNow}
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate('/search')}
              className="gradient-button text-lg px-12 py-4"
            >
              Explore All Hostels →
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-12 mb-20 text-center">
          <h2 className="text-4xl font-bold font-poppins mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect accommodation with Hoomora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleExploreHostels}
              className="gradient-button text-lg px-10 py-4"
            >
              Book Your Stay Now
            </Button>
            <Button
              onClick={handleSignIn}
              variant="outline"
              size="lg"
              className="text-lg px-10 py-4 hover:bg-primary/5"
            >
              Get Started
            </Button>
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

export default Home;