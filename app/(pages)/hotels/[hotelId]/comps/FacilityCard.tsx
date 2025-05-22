import { Card } from '@/components/ui/card'
import {Map, Hotel } from 'lucide-react'
import React from 'react'


interface FacilityProps{
  amenity:string;
}

const FacilityCard: React.FC<FacilityProps> = ({amenity}) => {
  console.log(amenity)
  return (
    <Card className='px-4 py-4 gap-2 flex flex-col items-center justify-center'>
        <Map size={40}/>
        <span>{amenity}</span>
    </Card>
  )
}

export default FacilityCard