import RoomCard from "@/app/components/cards/RoomCard";
import NavBar from "@/app/components/NavBar";
import { MapPin } from "lucide-react";
import Image from "next/image";
import CenterHeader from "../../home/CenterHeader";
import DetailsHero from "./comps/DetailsHero";
import FacilityCard from "./comps/FacilityCard";


interface HotelPageProps {
  params: { hotelId: string };
}

const HotelDetails = async ({params}: HotelPageProps) => {
  const {hotelId}= await params
  const response= await fetch(`https://hotelproject-ewqi.onrender.com/api/hotels/${hotelId}`, {
    next: {revalidate: 180},
  })

  if(!response.ok){
    console.log("Error fetching hotel details")
    // window.alert("Error fetching hotel details")
  }
  const hotelDetails= await response.json()
  console.log(hotelDetails)
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
          <DetailsHero name={hotelDetails.name} desc={hotelDetails.description} location={hotelDetails.location} stars={hotelDetails.stars}/>
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
              {hotelDetails.description}
            </span>
          </div>
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
              {hotelDetails.amenities.map((amenity:string)=>(
                <FacilityCard key={amenity} amenity={amenity}/>
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
              {hotelDetails.rooms.map((room:any)=>(
                <RoomCard key={room.uid} id={room.uid} name={room.name} capacity={room.capacity} price={room.price} hotel={room.hotel}/>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelDetails;
