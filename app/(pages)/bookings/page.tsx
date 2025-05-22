import RoomCard from '@/app/components/cards/RoomCard'
import NavBar from '@/app/components/NavBar'
import React from 'react'

const BookingsPage = () => {
  return (
    <div>
      <div className='w-4/6 flex mx-auto flex-col items-center justify-start min-h-screen'>
      <NavBar/>
      <div className='flex w-full justify-center items-center h-full pt-20'>
        <span>Nothing to show here.</span>
      </div>
      {/* <div className='grid [grid-template-columns:repeat(auto-fit,_minmax(250px,_1fr))] gap-5 w-full overflow-x-hidden box-border items-stretch mb-6 mt-10'>
        <RoomCard from='grid'/>
        <RoomCard from='grid'/>
        <RoomCard from='grid'/>
        <RoomCard from='grid'/>
        <RoomCard from='grid'/>
        <RoomCard from='grid'/>
      </div> */}
      </div>
    </div>
  )
}

export default BookingsPage