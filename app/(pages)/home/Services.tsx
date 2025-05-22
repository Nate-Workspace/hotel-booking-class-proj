import { CalendarCheck, PiggyBank, Search } from "lucide-react";
import Image from "next/image";
import React from "react";

const Services = () => {
  const flexColCenter = "flex flex-col items-center justify-center gap-3";
  const textStyle = "flex flex-col items-center justify-center gap-1";
  return (
    <div className="w-4/6 lg:flex lg:justify-between mx-auto px-12">
      <div className={flexColCenter}>
        <div className="relative w-full h-32">
          <Image
            src="/Search_simply.jpg"
            alt="image"
            width={500}
            height={32}
            className="h-full w-auto object-cover object-center mx-auto"
          />
        </div>
        <div className={textStyle}>
          <span className="font-bold lg:text-xl md:text-lg">Search Simply</span>
          <span className="w-2/3 text-center">
            Easily search through hundreds of hotels in seconds
          </span>
        </div>
      </div>
      <div className={flexColCenter}>
        <div className="relative w-full h-32">
          <Image
            src="/save_big.jpg"
            alt="image"
            width={500}
            height={32}
            className="h-full w-auto object-cover object-center mx-auto"
          />
        </div>
        <div className={textStyle}>
          <span className="font-bold lg:text-xl md:text-lg">Save Big</span>
          <span className="w-2/3 text-center">
            Compare hotel Prices from 100s of sites at once
          </span>
        </div>
      </div>
      <div className={flexColCenter}>
        <div className="relative w-full h-32 ">
          <Image
            src="/book_with_ease.jpg"
            alt="image"
            width={500}
            height={32}
            className="h-full w-auto object-cover object-center mx-auto"
          />
        </div>
        <div className={textStyle}>
          <span className="font-bold lg:text-xl md:text-lg">
            Book with ease
          </span>
          <span className="w-2/3 text-center">
            Discover a great deal to book on our partner sites
          </span>
        </div>
      </div>
    </div>
  );
};

export default Services;
