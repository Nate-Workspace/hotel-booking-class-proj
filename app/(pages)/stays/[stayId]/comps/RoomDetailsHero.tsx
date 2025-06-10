import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LocateIcon, MapPin, LucideStar } from "lucide-react";
import React from "react";


interface RoomHeroProps{
  name: string;
  price: string;
  capacity: number;
  desc:string;
}

const DetailsHero: React.FC<RoomHeroProps> = ({name, price, capacity, desc}) => {
  return (
    <div className="flex justify-start lg:pl-20 mt-16">
      <div className="lg:w-3/5 w-4/5 flex flex-col gap-8">
        {/* Title and desc */}
        <div className="text-primary font-semibold text-sm mb-[-20px]">LUXURY</div>
        <div className="w-full flex flex-col gap-6">
          <div className="font-bold lg:text-6xl md:text-5xl text-3xl">
            {name}
          </div>
          <div className="w-full lg:w-4/5 md:text-3xl text-2xl lg:text-4xl">
            {desc}
          </div>
        </div>

        {/* Rating and location */}
        <div className="flex flex-col gap-2">
          {/* <div className="flex gap-4">
            <div className="flex justify-start items-center gap-1">
              <LucideStar size={18} color="#FFD700" fill="#FFD700" />
              <LucideStar size={18} />
              <LucideStar size={18} />
              <LucideStar size={18} />
              <LucideStar size={18} />
            </div>
            <span>5 star rating</span>
          </div>
          <div className="flex gap-4 items-center">
            <MapPin size={18} />
            <span>Addis Ababa, Region name, Ethiopia</span>
          </div> */}
          <div className="flex flex-col gap-2">
            <span className="md:text-1xl text-xl lg:text-2xl"><span className="text-primary font-semibold ">${price}</span> Per night</span>
            <span className="md:text-1xl text-xl lg:text-2xl"><span className="text-primary font-semibold">{capacity}</span> People per room</span>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full">
          <Button className="hover:cursor-pointer">BOOK A STAY</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailsHero;
