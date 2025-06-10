'use client'

import NavBar from "@/app/components/NavBar";
import Image from "next/image";
import React, { useEffect, useState, useTransition } from "react";
import HomeHero from "./HomeHero";
import CenterHeader from "./CenterHeader";
import RoomCard from "@/app/components/cards/RoomCard";
import { Button } from "@/components/ui/button";
import Services from "./Services";
import HotelCard from "@/app/components/cards/HotelCard";
import Link from "next/link";
import {db} from "@/config/firebase";
import { getDocs, collection } from "firebase/firestore";

const HomePage = () => {
  const [hotels, setHotels]= useState<any[]>([])
  const [rooms, setRooms]= useState<any[]>([])
  const [hotelTransition, setHotelTransition] = useTransition();
  const [roomTransition, setRoomTransition] = useTransition();


  const hotelsCollection = collection(db, "hotel")
  const roomCollection = collection(db, "room")
  useEffect(()=>{
    const getHotels= async ()=>{
      setHotelTransition(async ()=>{
        const response= await getDocs(hotelsCollection);
        const filteredData= response.docs.map((doc)=> ({
          ...doc.data(),
          id:doc.id,
        }))
        console.log(filteredData)
        if(filteredData.length === 0){
          console.log("No hotels found");
        }
        setHotels(filteredData)
      })
    }
    const getRooms= async ()=>{
      setRoomTransition(async ()=>{
        const response= await getDocs(roomCollection);
        const filteredData= response.docs.map((doc)=> ({
          ...doc.data(),
          id:doc.id,
        }))
        console.log(filteredData)
        if(filteredData.length === 0){
          console.log("No hotels found");
        }
        setRooms(filteredData)
      })
    }
    
    getRooms()
    getHotels()
  },[])

  
  console.log("Hotels: ", hotels);
  console.log("Rooms: ",rooms);

  //Css design for the grid
  const gridContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(4, 250px)",
    gap: "1rem",
    gridTemplateAreas: `
    "box-1 box-1 box-2 box-2"
    "box-3 box-4 box-4 box-5"
    "box-6 box-6 box-7 box-8"
    "box-9 box-10 box-10 box-8"
  `,
  };

  return (
    <div className="w-full flex flex-col items-center gap-16 *:w-full mb-20">
      <section className="relative overflow-x-hidden h-170 flex flex-col justify-center items-center">
        <Image
          src="/hotel1.jpg"
          alt="image"
          fill
          className="w-full h-full object-cover object-center absolute z-[1]"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-[#ffffff] z-[2]" />
        <div className="absolute top-0 w-4/6 z-[3]">
          <NavBar />
          <HomeHero />
        </div>
        {/* <RoomCard /> */}
      </section>

      {/* Top rooms section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-[-2]">
          <Image
            src="/grid-lines.svg"
            alt=""
            fill
            className="object-cover object-bottom [mask-image:linear-gradient(to_top,black,transparent)]"
          />
        </div>
        <div className="w-4/6 mx-auto ">
          <CenterHeader
            decor="ROOMS"
            title="Top rated stays"
            description="Comfort, service, and unforgettable experiences all in one place."
          />
          <div className="grid [grid-template-columns:repeat(auto-fit,_minmax(300px,_1fr))] gap-6 w-full overflow-x-hidden box-border items-stretch mb-6 mt-10">
            {rooms.slice(0,6).map((room:any)=>(
                <RoomCard key={room.id} from="grid" id={room.id} name={room.name} capacity={room.capacity} bathroom={room.bathroom_count} bed_count={room.bed_count} desc={room.desc} price={room.price} hotel={room.hotel}/>
              ))}
          </div>
          <div>
            <Button
              variant="outline"
              className="border-primary text-primary px-8 hover:bg-primary hover:text-white hover:cursor-pointer"
            >
              <Link href="/stays">Show More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full  bg-white py-15">
        <Services />
      </section>

      {/* Hotels section */}
      <section>
        <div className="w-4/6 mx-auto">
          <div className="flex items-end justify-between">
            <CenterHeader
              decor="HOTELS"
              title="Highly ranked hotels"
              description="Top-tier comfort, premium service, and glowing reviews"
            />
            <Button
              variant="outline"
              className="border-primary text-primary px-4 hover:bg-primary hover:text-white hover:cursor-pointer"
            >
              <Link href="/hotels">More...</Link>
            </Button>
          </div>

          <div className="mt-8 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex gap-4 w-max px-2">
              {hotels.map((hotel: any) => (
                <HotelCard
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  location={hotel.location}
                  // image={hotel.image}
                  stars={hotel.stars}
                  amenities={hotel.amenities}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Bentogrid */}
      <section>
        <div className="w-4/6 mx-auto">
          <CenterHeader
            decor="CITIES"
            title="Popular Cities"
            description="Find comfort, service, and unforgettable experiences all in some of the most popular cities."
          />
          <div
            className="w-full pt-10 *:rounded-2xl *:hover:cursor-pointer"
            style={gridContainer}
          >
            <div
              className="box relative overflow-hidden"
              style={{ gridArea: "box-1" }}
            >
              <Image
                src="/hotel1.jpg"
                alt="image"
                fill
                className="w-full h-full object-cover object-center absolute z-[1]"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-[#ffffff] z-[2]" />
              <div className="absolute bottom-0 mb-[5%] ml-[5%] w-full z-[3]">
                <h1 className="text-xl font-bold text-gray-800">New York</h1>
                <p className="text-sm text-gray-600">
                  The city that never sleeps
                </p>
              </div>
            </div>
            <div
              className="box"
              style={{ gridArea: "box-2", background: "gray" }}
            ></div>
            <div
              className="box"
              style={{ gridArea: "box-3", background: "gray" }}
            ></div>
            <div
              className="box"
              style={{ gridArea: "box-4", background: "gray" }}
            ></div>
            <div
              className="box"
              style={{ gridArea: "box-5", background: "gray" }}
            ></div>
            <div
              className="box"
              style={{ gridArea: "box-6", background: "gray" }}
            ></div>
            <div
              className="box"
              style={{ gridArea: "box-7", background: "gray" }}
            ></div>
            <div
              className="box"
              style={{ gridArea: "box-8", background: "gray" }}
            ></div>
            <div
              className="box"
              style={{ gridArea: "box-9", background: "gray" }}
            ></div>
            <div
              className="box"
              style={{ gridArea: "box-10", background: "gray" }}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

// display: 'grid',
//   gridTemplateColumns: '200px 200px 200px 200px 200',
//   gridTemplateRows: '200px 200px 200px 200px',
//   gap: '1rem',
//   gridTemplateAreas: `
//     "box-1 box-2 box-3 box-4"
//     "box-1 box-5 box-5 box-4"
//     "box-6 box-7 box-8 box-9"
//     "box-6 box-10 box-10 box-9"`,
