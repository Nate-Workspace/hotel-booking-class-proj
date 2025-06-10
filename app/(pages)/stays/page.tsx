"use client";

import RoomCard from "@/app/components/cards/RoomCard";
import NavBar from "@/app/components/NavBar";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ITEMS_PER_PAGE = 8;

const StaysPage = () => {
  const roomCollection = collection(db, "room");
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Filter states
  const [priceFilter, setPriceFilter] = useState("");
  const [bedFilter, setBedFilter] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("");

  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await getDocs(roomCollection);
        const filteredData = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRooms(filteredData);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    getRooms();
  }, []);

  // Filtered and paginated rooms
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const price = parseFloat(room.price);
      const matchesPrice = priceFilter ? price <= parseFloat(priceFilter) : true;
      const matchesBeds = bedFilter ? room.bed_count >= parseInt(bedFilter) : true;
      const matchesCapacity = capacityFilter ? room.capacity >= parseInt(capacityFilter) : true;
      return matchesPrice && matchesBeds && matchesCapacity;
    });
  }, [rooms, priceFilter, bedFilter, capacityFilter]);

  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE);
  const paginatedRooms = filteredRooms.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div>
      <div className="w-4/6 mx-auto flex flex-col items-center justify-center">
        <NavBar />

        {/* Filters */}
        <div className="w-full mt-10 mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter Rooms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price" className="block mb-1 text-gray-700">Max Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                placeholder="e.g., 100"
              />
            </div>
            <div>
              <Label htmlFor="beds" className="block mb-1 text-gray-700">Min Beds</Label>
              <Input
                id="beds"
                type="number"
                value={bedFilter}
                onChange={(e) => setBedFilter(e.target.value)}
                placeholder="e.g., 2"
              />
            </div>
            <div>
              <Label htmlFor="capacity" className="block mb-1 text-gray-700">Min Guests</Label>
              <Input
                id="capacity"
                type="number"
                value={capacityFilter}
                onChange={(e) => setCapacityFilter(e.target.value)}
                placeholder="e.g., 4"
              />
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center h-40 w-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
          </div>
        ) : (
          <>
            {/* Room Grid */}
            <div className="grid [grid-template-columns:repeat(auto-fit,_minmax(250px,_1fr))] gap-5 w-full overflow-x-hidden box-border items-stretch mb-6">
              {paginatedRooms.map((stay: any) => (
                <RoomCard
                  from="grid"
                  key={stay.id}
                  id={stay.id}
                  name={stay.name}
                  hotel={stay.hotel}
                  price={stay.price}
                  bed_count={stay.bed_count}
                  bathroom={stay.bathroom_count}
                  capacity={stay.capacity}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex gap-4 justify-center items-center mt-6 mb-10">
                <Button
                  variant="outline"
                  className="border-primary text-primary px-6 hover:bg-primary hover:text-white"
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
                  className="border-primary text-primary px-6 hover:bg-primary hover:text-white"
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

export default StaysPage;
