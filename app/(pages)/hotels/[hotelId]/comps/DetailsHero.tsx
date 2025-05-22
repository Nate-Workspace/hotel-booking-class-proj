import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LocateIcon, MapPin, LucideStar } from "lucide-react";
import React from "react";

interface DetailsHeroProps {
  name: string;
  desc: string;
  location: string;
  stars: number;
}

const DetailsHero: React.FC<DetailsHeroProps> = ({
  name,
  desc,
  location,
  stars,
}) => {
  return (
    <div className="flex justify-start lg:pl-20 mt-16">
      <div className="lg:w-3/5 w-4/5 flex flex-col gap-8">
        {/* Title and desc */}
        {stars>3? (<div className="text-primary font-semibold text-sm mb-[-20px]">LUXURY</div>): (<div className="text-primary font-semibold text-sm mb-[-20px]">COMMUNITY</div>)}
        <div className="w-full flex flex-col gap-6">
          <div className="font-bold lg:text-6xl md:text-5xl text-3xl">
            {name}
          </div>
          <div className="w-full lg:w-4/5">{desc}</div>
        </div>

        {/* Rating and location */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="flex justify-start items-center gap-1">
              {Array.from({ length: stars }).map((_, i) => (
                <LucideStar key={i} size={18} color="#FFD700" fill="#FFD700" />
              ))}
              {Array.from({ length: 5-stars }).map((_, i) => (
                <LucideStar key={i} size={18} color="#A9A9A9" fill="#979797" />
              ))}
            </div>
            <span>{stars} starred hotel</span>
          </div>
          <div className="flex gap-4 items-center">
            <MapPin size={18} />
            <span>{location}</span>
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
