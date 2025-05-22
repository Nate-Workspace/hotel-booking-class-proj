import NavBar from "@/app/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import CenterHeader from "../../home/CenterHeader";
import FacilityCard from "../../hotels/[hotelId]/comps/FacilityCard";
import RoomDetailsHero from "./comps/RoomDetailsHero";
import SpecificsCard from "./comps/SpecificsCard";
import RoomCard from "@/app/components/cards/RoomCard";


interface StayProps{
  params:{
    stayId:string
  }
}

const HotelDetails: React.FC<StayProps> = async ({params}) => {

  const {stayId}= params;
  console.log(stayId)

  const response= await fetch(`https://hotelproject-ewqi.onrender.com/api/stays/${stayId}`,{
    next:{ revalidate: 180}
  }) 

  if(!response.ok){
    console.log("error fetching room details")
    // window.alert("error fetching room details")
  }

  const stayDetails= await response.json();
  console.log(stayDetails)

  const res= await fetch(`https://hotelproject-ewqi.onrender.com/api/hotels/${stayDetails.hotel}`,{
    next:{ revalidate: 180}
  })
  if(!res.ok){
    console.log("Error fetching hotel details")
    // window.alert("Error fetching hotel details")
  }
  const hotelDetails= await res.json()
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
          <RoomDetailsHero name={stayDetails.name} desc={stayDetails.description} price={stayDetails.price} capacity={stayDetails.capacity}/>
        </div>
        {/* <RoomCard /> */}
      </section>

      {/* Location section */}
      <section className="w-full mt-20">
        <div className="w-4/6 mx-auto flex flex-col gap-6">
          <CenterHeader
            decor="LOCATION"
            title="Location and Surrounding"
            description="Some random description about what you'll find in this section"
          />

          <div>
            <div className="flex gap-4 items-center">
              <MapPin size={18} />
              <span>{hotelDetails.location}</span>
            </div>
            <span>
              From coastal hideaways to mountain retreats, find your next
              adventure-ready stay. Your journey begins with the right room.
            </span>
          </div>
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
              desc={`There ${stayDetails.bed_count===1? 'is':'are'} ${stayDetails.bed_count} bed${stayDetails.bed_count===1? '':'s'} available`}
            />
            <SpecificsCard
              title="Guest Count"
              desc={`Only ${stayDetails.capacity} guest${stayDetails.capacity===1? '':'s'} ${stayDetails.capacity===1? 'is':'are'} allowed in this room`}
            />
            <SpecificsCard
              title="Bathroom Count"
              desc={`There ${stayDetails.bathroom_count===1? 'is':'are'} ${stayDetails.bathroom_count} bathroom${stayDetails.bathroom_count===1? '':'s'} available`}
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
            <div className="flex gap-4 w-max scroll-smooth">
              {hotelDetails.amenities.map((amenity:string)=>(
                <FacilityCard key={amenity} amenity={amenity}/>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Bentogrid */}
      <section>
        {hotelDetails.rooms.length!=1 && 
        <div className="w-4/6 mx-auto pt-20">
          <CenterHeader
            decor="STAYS"
            title="More Stays from Skylight hotel"
            description="Find comfort, service, and unforgettable experiences all in this hotel."
          />

          <div className="mt-8 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex gap-4 w-max scroll-smooth">
              {hotelDetails.rooms.map((room:any)=>( room.uid!=stayDetails.uid &&
                <RoomCard key={room.uid} id={room.uid} name={room.name} capacity={room.capacity} price={room.price} hotel={room.hotel}/>
              ))}
            </div>
          </div>
        </div>
        }
      </section>

      {/* Book section */}
      <section>
        <div className="w-4/6 mx-auto pt-20 flex flex-col gap-6">
          <CenterHeader
            decor="BOOK"
            title="Book Now"
            description="Secure your stay now!"
          />

          <Card className="w-fit px-6 py-4 gap-6 flex flex-col items-start">
            <div className="flex items-center gap-8">
              <div>
                <span>Select days that you will stay in this room</span>
                <Input />
              </div>
              <div>
                <span>Do you want to be served breakfast each day?</span>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" className="hover:cursor-pointer"/>
                  <label
                    htmlFor="terms"
                    className="leading-none"
                  >
                    Include breakfast
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span>
                <span>Total Price:</span> $18 for 2 days
              </span>
              <Button className="w-fit px-6 py-2 whitespace-nowrap hover:cursor-pointer">
                Book now
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HotelDetails;
