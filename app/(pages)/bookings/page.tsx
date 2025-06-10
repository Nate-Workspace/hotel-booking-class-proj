"use client";
import { useEffect, useMemo, useState } from "react";

import RoomCard from "@/app/components/cards/RoomCard";
import NavBar from "@/app/components/NavBar";
import React from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import BookingsCard from "./comps/BookingsCard";

const ITEMS_PER_PAGE = 8;

const BookingsPage = () => {
  const bookingsCollection = collection(db, "booking");
  const [bookings, setBookings] = useState<any[]>([]);
  const [userRooms, setUserRooms] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const router = useRouter();


  // Filter states
  const [priceFilter, setPriceFilter] = useState("");
  const [bedFilter, setBedFilter] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("");

 const fetchUserBookings = async (uid: string) => {
  console.log("Fetching bookings for user:", uid);
  if (!uid) {
  router.push("/login");
}
  try {
    const response = await getDocs(bookingsCollection);
    const filteredData = response.docs.map((doc) => ({
      ...(doc.data() as any),
      id: doc.id,
    }));

    console.log("Filtered bookings data:", filteredData);
    const userBookings = filteredData.filter(
      (booking) => booking.user_id === uid
    );

    console.log("User bookings:", userBookings);
    setBookings(userBookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const unsubscribe = getAuth().onAuthStateChanged((user) => {
    if (!user) {
      router.push("/login");
    } else {
      // Run your bookings fetch here
      fetchUserBookings(user.uid);
    }
  });

  return () => unsubscribe();
}, []);


  // Filtered and paginated rooms
  const filteredRooms = useMemo(() => {
    return bookings.filter((booking: any) => {
      const price = parseFloat(booking.price);
      const matchesPrice = priceFilter
        ? price <= parseFloat(priceFilter)
        : true;
      const matchesBeds = bedFilter
        ? booking.bed_count >= parseInt(bedFilter)
        : true;
      const matchesCapacity = capacityFilter
        ? booking.capacity >= parseInt(capacityFilter)
        : true;
      return matchesPrice && matchesBeds && matchesCapacity;
    });
  }, [bookings, priceFilter, bedFilter, capacityFilter]);

  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE);
  const paginatedRooms = filteredRooms.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  console.log("Paginated rooms: ", paginatedRooms);
  return (
    <div>
      <div className="w-4/6 mx-auto flex flex-col items-center justify-center">
        <NavBar />

        {/* Filters */}
        <div className="w-full mt-10 mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter Rooms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price" className="block mb-1 text-gray-700">
                Max Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                placeholder="e.g., 100"
              />
            </div>
            <div>
              <Label htmlFor="beds" className="block mb-1 text-gray-700">
                Min Beds
              </Label>
              <Input
                id="beds"
                type="number"
                value={bedFilter}
                onChange={(e) => setBedFilter(e.target.value)}
                placeholder="e.g., 2"
              />
            </div>
            <div>
              <Label htmlFor="capacity" className="block mb-1 text-gray-700">
                Min Guests
              </Label>
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
                <BookingsCard
                  id={stay.id}
                  from="grid"
                  key={stay.id}
                  room_id={stay.room_id}
                  hotel_id={stay.hotel_id}
                  check_in={stay.check_in}
                  price={stay.total_price}
                  check_out={stay.check_out}
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

export default BookingsPage;
