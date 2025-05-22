import HotelCard from '@/app/components/cards/HotelCard'
import RoomCard from '@/app/components/cards/RoomCard'
import NavBar from '@/app/components/NavBar'
import React from 'react'

const HotelsPage = async () => {
  const response= await fetch("https://hotelproject-ewqi.onrender.com/api/hotels/",{
    next:{revalidate: 180}
  })

  if(!response.ok){
    console.log("Fetching hotels went wrong!")
  }

  const hotels= await response.json();
  console.log(hotels);
  return (
    <div>
      <div className='w-4/6 flex mx-auto flex-col items-center justify-center'>
      <NavBar/>
      <div className='grid [grid-template-columns:repeat(auto-fit,_minmax(250px,_1fr))] gap-5 w-full overflow-x-hidden box-border items-stretch mb-6 mt-10'>
        {hotels.map((hotel:any)=>(
          <HotelCard from='grid' key={hotel.uid} id={hotel.uid} name={hotel.name} location={hotel.location} image={hotel.image_url}/>
        ))}
            
      </div>
      </div>
    </div>
  )
}

export default HotelsPage