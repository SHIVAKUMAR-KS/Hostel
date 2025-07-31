import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  location: string;
  priceRange: string;
  roomType: string;
  amenities: string;
  gender: string;
  checkIn?: Date;
}

const SearchFilters = ({ onSearch }: SearchFiltersProps) => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [roomType, setRoomType] = useState("");
  const [amenities, setAmenities] = useState("");
  const [gender, setGender] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();

  const handleSearch = () => {
    onSearch({
      location,
      priceRange,
      roomType,
      amenities,
      gender,
      checkIn
    });
  };

  return (
    <div className="bg-card p-6 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-6">
        {/* Location Input with Icon */}
        <div className="lg:col-span-2 flex items-center bg-white/70 rounded-lg px-3 shadow-sm glass-card">
          <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <Input
            placeholder="Enter location or hostel name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 placeholder:text-gray-500"
          />
        </div>

        {/* Check-in Date */}
        <div className="glass-card">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-transparent"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {checkIn ? format(checkIn, "MMM dd, yyyy") : "Check-in date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Price Range */}
        <div className="glass-card">
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="bg-transparent">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Price</SelectItem>
              <SelectItem value="0-5000">₹0 - ₹5,000</SelectItem>
              <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
              <SelectItem value="10000-15000">₹10,000 - ₹15,000</SelectItem>
              <SelectItem value="15000+">₹15,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Room Type */}
        <div className="glass-card">
          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger className="bg-transparent">
              <SelectValue placeholder="Room Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="shared">Shared Room</SelectItem>
              <SelectItem value="private">Private Room</SelectItem>
              <SelectItem value="dormitory">Dormitory</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div>
          <Button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Hostels
          </Button>
        </div>
      </div>

      {/* Additional Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Amenities */}
        <div className="glass-card">
          <Select value={amenities} onValueChange={setAmenities}>
            <SelectTrigger className="bg-transparent">
              <SelectValue placeholder="All Amenities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Amenities</SelectItem>
              <SelectItem value="wifi">WiFi</SelectItem>
              <SelectItem value="ac">AC</SelectItem>
              <SelectItem value="gym">Gym</SelectItem>
              <SelectItem value="meals">Meals</SelectItem>
              <SelectItem value="laundry">Laundry</SelectItem>
              <SelectItem value="pool">Pool</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gender */}
        <div className="glass-card">
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="bg-transparent">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="co-ed">Co-ed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;