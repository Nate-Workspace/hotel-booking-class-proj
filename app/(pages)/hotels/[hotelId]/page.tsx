"use client";

import RoomCard from "@/app/components/cards/RoomCard";
import NavBar from "@/app/components/NavBar";
import { MapPin } from "lucide-react";
import Image from "next/image";
import CenterHeader from "../../home/CenterHeader";
import DetailsHero from "./comps/DetailsHero";
import FacilityCard from "./comps/FacilityCard";
import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// interface HotelPageProps {
//   params: { hotelId: string };
// }

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotelDetails, setHotelDetails] = useState<any>({});
  const roomCollection = collection(db, "room");
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      const hotelRef = doc(db, "hotel", hotelId as string);
      const hotelSnap = await getDoc(hotelRef);
      if (hotelSnap.exists()) {
        console.log("Hotel data:", hotelSnap.data());
        await setHotelDetails({
          ...hotelSnap.data(),
        });
      } else {
        console.log("No such document!");
      }
    };
    const fetchRooms = async () => {
      try {
        const response = await getDocs(roomCollection);
        const filteredData = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("Filtered data", filteredData);
        const hotelRooms = filteredData.filter(
          (room: any) => room.hotel === hotelId
        );
        console.log("Hotel rooms", hotelRooms);
        await setRooms(hotelRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
    fetchRooms();
  }, [hotelId]);

  console.log(hotelDetails);
  console.log("Rooms:", rooms);
  return (
  <div>
    <section className="relative overflow-x-hidden max-h-170 h-140 w-full flex flex-col justify-center items-center">
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
            <div className="h-6 bg-gray-300 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        ) : (
          <DetailsHero
            name={hotelDetails?.name}
            desc={hotelDetails?.description}
            location={hotelDetails?.location}
            stars={hotelDetails?.stars}
          />
        )}
      </div>
    </section>

    {/* Location section */}
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
              <span>
                {hotelDetails?.location?.city},{" "}
                {hotelDetails?.location?.country}
              </span>
            </div>
            <span>{hotelDetails?.description}</span>
          </div>
        )}
      </div>
    </section>

    {/* Facilities section */}
    <section className="w-full mt-20">
      <div className="w-4/6 mx-auto">
        <CenterHeader
          decor="FACILITIES"
          title="Popular Facilities"
          description="Services and you will find in the hotel"
        />

        <div className="mt-8 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex gap-4 w-max scroll-smooth">
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

    {/* Rooms section */}
    <section>
      <div className="w-4/6 mx-auto pt-20">
        <CenterHeader
          decor="STAYS"
          title="Choose your room"
          description="Find comfort, service, and unforgettable experiences all in this hotel."
        />

        <div className="mt-8 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex gap-4 w-max scroll-smooth">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-64 h-70 bg-gray-200 rounded-lg animate-pulse"
                  />
                ))
              : rooms.map((room: any) => (
                  <RoomCard
                    key={room.id}
                    id={room.id}
                    name={room.name}
                    capacity={room.capacity}
                    price={room.price}
                    hotel={room.hotel}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);
};

export default HotelDetails;
