  'use client'


  import { Card } from '@/components/ui/card'
  import React from 'react'
  import { Sun } from 'lucide-react'
  import Link from 'next/link'
  import { usePathname, useRouter } from 'next/navigation'
  import { auth } from "@/config/firebase";
  import { signOut } from 'firebase/auth'

  const NavBar = () => {
    const router = useRouter();
    const user= auth.currentUser;
    const location= usePathname();
    console.log(location)

    const onLogout = async () => {
  const confirmLogout = window.confirm("Are you sure you want to log out?");
  if (!confirmLogout) return;

  try {
    await signOut(auth);
    console.log("User signed out successfully");
    router.push("/");
    window.alert("You have been logged out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
    return (
      <div className='w-full mt-4 z-[3]'>
      <Card className="flex flex-row justify-between rounded-md font-poppins py-3 px-8 border-0 shadow-[0_0_5px_rgba(0,0,0,0.1)]">
        <div className='font-semibold hover:cursor-pointer'><Link href="/">LOGO</Link></div>
        <div className='flex lg:gap-16 md:gap-8 gap-4'>
          <div className={` hover:cursor-pointer ${location==="/"? 'text-primary font-semibold': ''}`}><Link href="/">HOME</Link></div>
          <div className={` hover:cursor-pointer ${location==="/hotels"? 'text-primary font-semibold': ''}`}><Link href="/hotels">HOTELS</Link></div>
          <div className={` hover:cursor-pointer ${location==="/stays"? 'text-primary font-semibold': ''}`}><Link href="/stays">STAYS</Link></div>
          <div className={` hover:cursor-pointer ${location==="/bookings"? 'text-primary font-semibold': ''}`}><Link href="/bookings">BOOKINGS</Link></div>
        </div>
        <div className='flex lg:gap-8 md:gap-6 gap-8 items-center'>
          <Sun size={20} color="#FBBF24" />
          <div className='flex flex-row items-center'>
            {user ? (
              <>
              <div className={`pl-4 border-2 border-primary pr-3 rounded-2xl hover:cursor-pointer`} onClick={onLogout}>LOGOUT</div>
              </>
            ): (
              <>
              <div className={`pl-4 border-2 border-primary pr-3 border-r-[1px] rounded-tl-2xl rounded-bl-2xl hover:cursor-pointer ${location==="/login"? 'bg-primary font-semibold text-white': ''}`}><Link href="/login">LOGIN</Link></div>
              <div className={`border-2 border-primary pr-4 pl-3 border-l-[1px] rounded-tr-2xl rounded-br-2xl hover:cursor-pointer ${location==="/register"? 'bg-primary font-semibold text-white': ''}`}><Link href="/register">SIGNUP</Link></div>
              </>
            )}
          </div>
        </div>
      </Card>
      </div>
    )
  }

  export default NavBar