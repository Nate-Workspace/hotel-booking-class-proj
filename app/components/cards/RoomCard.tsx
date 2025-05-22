'use client'

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { Bed, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface RoomCardProps {
  from?: string;
  id: number;
  name: string;
  capacity?: number;
  bed_count?: number;
  bathroom?:number;
  desc?: string;
  hotel: string;
  price: string;
}
const RoomCard: React.FC<RoomCardProps> = ({from, id, name, capacity, bathroom, bed_count, desc, hotel, price}) => {
  const router= useRouter()
  const onRoomClick=()=>{
    router.push(`/stays/${id}`)
  }
  // Common css
  const detailStyles = "flex gap-3 text-gray-700";
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
          <span className="font-semibold text-lg">{name}</span>
          <span>
            {desc}
          </span>
        </div>
        <div>
          <div className={detailStyles}>
            <Bed size={20} />
            <span>{bed_count} Bed{bed_count===1? '': 's'} per room</span>
          </div>
          <div className={detailStyles}>
            <Bed size={20} />
            <span>Maximum of {capacity} Guest{capacity===1? '':'s'} per room</span>
          </div>
          <div className={detailStyles}>
            <Bed size={20} />
            <span>{bathroom} Bathroom{bathroom===1? '':'s'}</span>
          </div>
          <div className={detailStyles}>
            <Bed size={20} />
            <span>${price} per night</span>
          </div>
        </div>
        {/* <div className={detailStyles}>
          <span>Rating: </span>
          <div className="flex items-center justify-center gap-1 bg-[#F3F7FA] rounded-2xl px-4 py-0.5">
            <Star size={18} color="#FFD700" />
            <span>4.5</span>
          </div>
        </div> */}
        <hr className="border-gray-300 mt-1" />
      </CardContent>

      <CardFooter className="px-4 mt-[-.5rem]">
        <Button className="w-full hover:cursor-pointer" onClick={onRoomClick}>View Deal</Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
