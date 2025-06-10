'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import { Map, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'


interface HotelCardProps {
  from?: string;
  id: number;
  name: string;
  location: { city: string; country?: string };
  // image:string;
  stars?: number;
  amenities?: string [];
}

const HotelCard: React.FC<HotelCardProps> = ({from, id, name, location, stars, amenities}) => {

  const router = useRouter();
  const onHotelClick=()=>{
    router.push(`/hotels/${id}`)
  }
  // Styles for the card
    const detailStyles = "flex gap-3 text-gray-700";
  return (
    <Card className={`w-[250px] ${from=='grid' && 'w-full'} border-0 pt-0 rounded-e-xl overflow-hidden font-poppins pb-4 hover:cursor-pointer`} onClick={onHotelClick}>
      <CardHeader className="p-0 mb-[-.5rem]">
        <div style={{ position: "relative", width: "100%", height: "200px" }}>
          <Image
            src="/hotel1.jpg"
            // src={image}
            alt="image"
            fill
            style={{ objectFit: "fill" }}
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-lg max-h-[1.5rem] truncate block">{name}</span>
        </div>
        <div>
          <div className={detailStyles}>
            <Map size={18} />
            <span className='truncate'>{location?.city}, {location?.country}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HotelCard

// bg-gradient-to-l from-white to-transparent