'use client'

import React, { useEffect, useState } from "react";
import StayClient from "./comps/StayClient";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";


interface StayProps{
  params:{
    stayId:string
  }
}

const HotelDetails: React.FC<StayProps> = () => {

  const { stayId } = useParams();
    const [roomDetails, setRoomDetails] = useState<any>({});
    const [hotelDetails, setHotelDetails] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
  const fetchRoomAndHotel = async () => {
    try {
      const roomRef = doc(db, "room", stayId as string);
      const roomSnap = await getDoc(roomRef);

      if (roomSnap.exists()) {
        const roomData = roomSnap.data();
        console.log("Room data:", roomData);
        await setRoomDetails({
          ...roomSnap.data(),
        });

        const hotelId = roomData.hotel;
        if (hotelId) {
          const hotelRef = doc(db, "hotel", hotelId);
          const hotelSnap = await getDoc(hotelRef);

          if (hotelSnap.exists()) {
            console.log("Hotel data:", hotelSnap.data());
            setHotelDetails(hotelSnap.data());
          } else {
            console.log("No such Hotel!");
          }
        } else {
          console.log("No hotel ID in room data");
        }
      } else {
        console.log("No such Room!");
      }
    } catch (error) {
      console.error("Error fetching room or hotel:", error);
    } finally {
      setLoading(false);
    }
  };

  if (stayId) {
    fetchRoomAndHotel();
  }
}, [stayId]);

  
    console.log("Hotel ID:", stayId);
    console.log("Room details: ", roomDetails);
    console.log("Hotel details: ",hotelDetails);


  return (
    <StayClient
      stayDetails={roomDetails}
      hotelDetails={hotelDetails}
      loading={loading}
    />
  );
};

export default HotelDetails;
