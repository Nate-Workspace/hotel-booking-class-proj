'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React, { use, useEffect, useState } from 'react'
import Image from 'next/image'
import { Bed } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'

interface BookingsCardProps {
    id: string;
    from?: string;
    room_id?: string;
    hotel_id?: string;
    check_in?: string;
    check_out?: string;
    price?: string;
}


const BookingsCard = ({id, from,room_id, hotel_id, check_in, check_out,price }: BookingsCardProps) => {
    const router = useRouter()
    const [roomDetails, setRoomDetails] = useState<any>({});
    const onRoomClick= ()=>{
        router.push(`/stays/${room_id}`)
    }
    useEffect(() => {
  console.log("Room ID: ", room_id)
  const fetchRoom = async () => {
    try {
      const roomRef = doc(db, "room", room_id as string);
      const roomSnap = await getDoc(roomRef);

      console.log("ROom snap: ", roomSnap.data())
      if (roomSnap.exists()) {
        const roomData = roomSnap.data();
        console.log("Room data:", roomData);
        setRoomDetails({
          ...roomSnap.data(),
        });
      }
    } catch (error) {
      console.error("Error fetching room or hotel:", error);
    }
  };
  fetchRoom();
}, [room_id]);

    const detailStyles = "flex gap-3 text-gray-700";
    useEffect(() => {console.log("room details: ", roomDetails)},[])
  return (
    <Card className={`w-[350px] border-0 pt-0 rounded-e-xl overflow-hidden font-poppins pb-4 ${from==='grid'? 'w-full h-full min-w-0': ''} hover:cursor-pointer`} onClick={onRoomClick}>
      <CardHeader className="p-0 mb-[-.5rem]">
        <div style={{ position: "relative", width: "100%", height: "200px" }}>
          <Image
            src="/hotel1.jpg"
            alt="image"
            fill
            style={{ objectFit: "fill" }}
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-lg">{roomDetails.name}</span>
          <span>
            {roomDetails.desc}
          </span>
        </div>
        <div>
          <div className={detailStyles}>
            <Bed size={20} />
            <span>Check in: {check_in}</span>
          </div>
          <div className={detailStyles}>
            <Bed size={20} />
            <span>Check out: {check_out}</span>
          </div>
          <div className={detailStyles}>
            <Bed size={20} />
            <span>Price: {price}</span>
          </div>
          <div className={detailStyles}>
            <Bed size={20} />
            <span>${price} per night</span>
          </div>
        </div>
        <hr className="border-gray-300 mt-1" />
      </CardContent>

      <CardFooter className="px-4 mt-[-.5rem]">
        <Button className="w-full hover:cursor-pointer" onClick={onRoomClick}>View your booking</Button>
      </CardFooter>
    </Card>
  )
}

export default BookingsCard