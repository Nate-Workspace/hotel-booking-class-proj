"use client";

import HotelCard from "@/app/components/cards/HotelCard";
import NavBar from "@/app/components/NavBar";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ITEMS_PER_PAGE = 8;

const HotelsPage = () => {
  const hotelsCollection = collection(db, "hotel");
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Filters
  const [nameFilter, setNameFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [starFilter, setStarFilter] = useState("");

  useEffect(() => {
    const getHotels = async () => {
      try {
        const response = await getDocs(hotelsCollection);
        const filteredData = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setHotels(filteredData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    getHotels();
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    const nameMatch = nameFilter
      ? hotel.name?.toLowerCase().includes(nameFilter.toLowerCase())
      : true;
    const locationMatch = locationFilter
      ? hotel.location.city
          ?.toLowerCase()
          .includes(locationFilter.toLowerCase())
      : true;
    const starMatch = starFilter
      ? hotel.stars?.toString() === starFilter
      : true;

    return nameMatch && locationMatch && starMatch;
  });

  const totalPages = Math.ceil(filteredHotels.length / ITEMS_PER_PAGE);
  const paginatedHotels = filteredHotels.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div>
      <div className="w-4/6 flex mx-auto flex-col items-center justify-center">
        <NavBar />

        {/* Filter Section */}
        <div className="w-full mb-6 mt-8">
          <div className="text-lg font-medium mb-2 text-gray-800">
            Filter by
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Hotel Name */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-sm text-gray-600">
                Hotel Name
              </Label>
              <Input
                id="name"
                type="text"
                value={nameFilter}
                onChange={(e) => {
                  setPage(1);
                  setNameFilter(e.target.value);
                }}
                placeholder="e.g. Grand Palace"
                className="text-sm"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location" className="text-sm text-gray-600">
                Location
              </Label>
              <Input
                id="location"
                type="text"
                value={locationFilter}
                onChange={(e) => {
                  setPage(1);
                  setLocationFilter(e.target.value);
                }}
                placeholder="e.g. Addis Ababa"
                className="text-sm"
              />
            </div>

            {/* Star Rating */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="stars" className="text-sm text-gray-600">
                Stars
              </Label>
              <Select
                onValueChange={(value: string) => {
                  setPage(1);
                  setStarFilter(value === "all" ? "" : value);
                }}
                value={starFilter === "" ? "all" : starFilter}
              >
                <SelectTrigger className="text-sm" id="stars">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="5">5 stars</SelectItem>
                  <SelectItem value="4">4 stars</SelectItem>
                  <SelectItem value="3">3 stars</SelectItem>
                  <SelectItem value="2">2 stars</SelectItem>
                  <SelectItem value="1">1 star</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Hotel Cards */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
          </div>
        ) : (
          <>
          {paginatedHotels.length < 1 ? (
            <div>No hotel found</div>
          ): (
            <div className="grid [grid-template-columns:repeat(auto-fit,_minmax(250px,_1fr))] gap-5 w-full overflow-x-hidden box-border items-stretch mb-6 mt-10">
              {paginatedHotels.map((hotel: any) => (
                <HotelCard
                  from="grid"
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  location={hotel.location}
                />
              ))}
            </div>
          )}

            {totalPages > 1 && (
              <div className="flex gap-4 justify-center items-center mt-6 mb-10">
                <Button
                  variant="outline"
                  className="border-primary text-primary px-6 hover:bg-primary hover:text-white hover:cursor-pointer"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="font-medium text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  className="border-primary text-primary px-6 hover:bg-primary hover:text-white hover:cursor-pointer"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HotelsPage;
