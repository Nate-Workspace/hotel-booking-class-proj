"use client";

import NavBar from "@/app/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CenterHeader from "../../../home/CenterHeader";
import FacilityCard from "../../../hotels/[hotelId]/comps/FacilityCard";
import RoomDetailsHero from "../comps/RoomDetailsHero";
import SpecificsCard from "../comps/SpecificsCard";
import RoomCard from "@/app/components/cards/RoomCard";
import { DateRangePicker } from "../comps/DateRangePicker";
import { DateRange } from "react-day-picker";
import { differenceInDays, format } from "date-fns";
import {auth} from "@/config/firebase";
import { addDoc, getDocs } from "firebase/firestore";
import {collection} from "firebase/firestore";
import { db } from "@/config/firebase";
import { useRouter } from "next/navigation";

interface StayClientProps {
  stayDetails: any;
  hotelDetails: any;
  loading: boolean;
}

const StayClient: React.FC<StayClientProps> = ({ stayDetails, hotelDetails, loading }) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const router= useRouter();
  //FIrebase 
  const user= auth.currentUser;
  const bookingsCollection = collection(db, "booking");
  console.log("User: ", user?.uid);


  const [totalPrice, setTotalPrice]= useState<number>(0);
  const [nights, setNights]= useState<number>(0);

  const hotelId = "f8e00a13-3cf3-4399-80d7-0e069f4f9443"
  const roomId = "d82522a0-0dc9-4736-872d-9c6c4bc9b3bb"

  const pricePerNight = stayDetails.price;

  const [bookings, setBookings] = useState<any[]>([]);
  useEffect(()=>{
    const getBookings = async () => {
          try {
            const response = await getDocs(bookingsCollection);
            const filteredData = response.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setBookings(filteredData);
          } catch (error) {
            console.error("Error fetching hotels:", error);
          }
        };
    
        getBookings();
  },[])

  useEffect(()=>{
    if (date?.from && date?.to) {
    const calculatedNights = Math.max(differenceInDays(date.to, date.from) + 1, 1);
    setNights(calculatedNights);
    setTotalPrice(calculatedNights * pricePerNight);
  } else {
    setNights(0);
    setTotalPrice(0);
  }
  },[date?.to, date?.from, pricePerNight])
  

  const handleBookNow = async () => {
    if(!user){
      router.push("/login")
      window.alert("login to book a stay");
    }
    if (!date?.from || !date?.to) return alert("Please select a valid date range.");

    const nights =
      Math.ceil(
        (date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)
      ) || 1;

    const payload = {
      user_id: user?.uid,
      hotel_id: hotelId,
      room_id: roomId,
      check_in: format(date.from, "yyyy-MM-dd"),
      check_out: format(date.to, "yyyy-MM-dd"),
      total_price: (pricePerNight * nights).toFixed(2),
    };

    console.log("Sending to API:", payload);

    try {
      await addDoc(bookingsCollection, payload)
      console.log("Booking successful:", payload);
      window.alert("Booking successful! Check your bookings page.");
    } catch (error) {
      console.error("Error booking room:", error);
    }

  };

  return (
    <div className="mb-[55px]">
      {/* Hero Section */}
      <section className="relative overflow-x-hidden max-h-170 h-150 w-full flex flex-col justify-center items-center">
        <Image
          src="/hotel1.jpg"
          alt="image"
          fill
          className="w-full h-full object-cover object-center absolute z-[1]"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-[#ffffff] z-[2]" />
        <div className="absolute top-0 w-4/6 z-[3]">
          <NavBar />
          {loading ? (
          <div className="animate-pulse space-y-2 mt-8">
            <div className="h-8 bg-gray-300 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        ) : (
          <RoomDetailsHero
            name={stayDetails.name}
            desc={stayDetails.description}
            price={stayDetails.price}
            capacity={stayDetails.capacity}
          />
        )}
        </div>
      </section>

      {/* Location */}
      <section className="w-full mt-20">
        <div className="w-4/6 mx-auto flex flex-col gap-6">
          <CenterHeader
            decor="LOCATION"
            title="Location and Surrounding"
            description="Some random description about what you'll find in this section"
          />
          {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        ) : (
          <div>
            <div className="flex gap-4 items-center">
              <MapPin size={18} />
              <span>{hotelDetails.location?.city}, {hotelDetails.location?.country}</span>
            </div>
            <span>
              From coastal hideaways to mountain retreats, find your next
              adventure-ready stay. Your journey begins with the right room.
            </span>
          </div>
        )}
        </div>
      </section>

      {/* Room Specifics */}
      <section className="w-full mt-20">
        <div className="w-4/6 mx-auto flex flex-col gap-6">
          <CenterHeader
            decor="SPECIFICS"
            title="Room Specifics"
            description="Detailed description of what you will find"
          />

          <div className="grid grid-cols-4 gap-4 w-full">
            <SpecificsCard
              title="Bed Count"
              desc={`There ${stayDetails.bed_count === 1 ? "is" : "are"} ${stayDetails.bed_count} bed${stayDetails.bed_count === 1 ? "" : "s"} available`}
            />
            <SpecificsCard
              title="Guest Count"
              desc={`Only ${stayDetails.capacity} guest${stayDetails.capacity === 1 ? "" : "s"} ${stayDetails.capacity === 1 ? "is" : "are"} allowed in this room`}
            />
            <SpecificsCard
              title="Bathroom Count"
              desc={`There ${stayDetails.bathroom_count === 1 ? "is" : "are"} ${stayDetails.bathroom_count} bathroom${stayDetails.bathroom_count === 1 ? "" : "s"} available`}
            />
            <SpecificsCard title="Bed type" desc={`${stayDetails.bed_type} bed`} />
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="w-full mt-20">
        <div className="w-4/6 mx-auto">
          <CenterHeader
            decor="FACILITIES"
            title="Popular Facilities"
            description="Services and you will find in the hotel"
          />
          <div className="mt-8 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex gap-4 w-max">
              {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-28 h-20 bg-gray-200 rounded animate-pulse"
                  />
                ))
                : hotelDetails.amenities?.map((amenity: string) => (
                <FacilityCard key={amenity} amenity={amenity} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* More stays from this hotel */}
      {hotelDetails.rooms?.length > 1 && (
        <section>
          <div className="w-4/6 mx-auto pt-20">
            <CenterHeader
              decor="STAYS"
              title={`More Stays from ${hotelDetails.name || "this hotel"}`}
              description="Find comfort, service, and unforgettable experiences all in this hotel."
            />
            <div className="mt-8 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex gap-4 w-max">
                {
                loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-64 h-70 bg-gray-200 rounded-lg animate-pulse"
                  />
                ))
                : hotelDetails.rooms?.map(
                  (room: any) =>
                    room.uid !== stayDetails.uid && (
                      <RoomCard
                        key={room.uid}
                        id={room.uid}
                        name={room.name}
                        capacity={room.capacity}
                        price={room.price}
                        hotel={room.hotel}
                      />
                    )
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Booking Section */}
      <section>
        <div className="w-4/6 mx-auto pt-20 flex flex-col gap-6">
          <CenterHeader
            decor="BOOK"
            title="Book Now"
            description="Secure your stay now!"
          />
          <Card className="w-fit px-6 py-4 gap-6 flex flex-col items-start">
            <div className="flex items-center gap-8">
              <DateRangePicker date={date} setDate={setDate} />
              <div>
                <span>Do you want to be served breakfast each day?</span>
                <div className="flex items-center space-x-2">
                  <Checkbox id="breakfast" className="hover:cursor-pointer" />
                  <label htmlFor="breakfast" className="leading-none">
                    Include breakfast
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span>
                <span>Total Price:</span> ${totalPrice} for {nights} {`${nights ===1? 'night': 'nights'}`}
              </span>
              <Button className="w-fit px-6 py-2 whitespace-nowrap hover:cursor-pointer" onClick={handleBookNow}>
                Book now
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default StayClient;
