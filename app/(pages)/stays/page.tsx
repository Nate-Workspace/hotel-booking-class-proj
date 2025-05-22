import RoomCard from '@/app/components/cards/RoomCard'
import NavBar from '@/app/components/NavBar'
import React from 'react'

const StaysPage = async () => {
  const response= await fetch("https://hotelproject-ewqi.onrender.com/api/stays/",{
    next:{revalidate: 180}
  })

  if(!response.ok){
    console.log("Fetching hotels went wrong!")
  }

  const stays= await response.json();
  console.log(stays);
  return (
    <div>
      <div className='w-4/6 flex mx-auto flex-col items-center justify-center'>
      <NavBar/>
      <div className='grid [grid-template-columns:repeat(auto-fit,_minmax(250px,_1fr))] gap-5 w-full overflow-x-hidden box-border items-stretch mb-6 mt-10'>
        {stays.map((stay:any)=>(
          <RoomCard from='grid' key={stay.uid} id={stay.uid} name={stay.name} hotel={stay.hotel} price={stay.price} bed_count={stay.bed_count} bathroom={stay.bathroom_count} capacity={stay.capacity}/>
        ))}
        
      </div>
      </div>
    </div>
  )
}

export default StaysPage