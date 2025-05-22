"use client";

import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import CountUp from "react-countup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const HomeHero = () => {
  const router = useRouter();

  const [tab, setTab] = useState("hotels");
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/${tab}?search=${encodeURIComponent(query.trim())}`);
  };

  const flexColCenter = "flex flex-col items-start";
  const flexCenter = "flex items-center justify-between";
  const counterFont = "font-semibold lg:text-4xl md:text-3xl text-1xl";

  return (
    <div className="flex justify-start lg:pl-20 mt-20">
      <div className="lg:w-3/5 w-4/5 flex flex-col gap-8">
        <div className="w-full flex flex-col gap-6">
          <div className="font-bold lg:text-6xl md:text-5xl text-3xl">
            Stay in a Place Worth Waking Up In
          </div>
          <div className="w-full lg:w-4/5 font-medium text-gray-800 lg:text-lg md:text-base text-sm">
            From coastal hideaways to mountain retreats, find your next
            adventure-ready stay. Your journey begins with the right room.
          </div>
        </div>

        <div className={flexCenter}>
          <div className={`${flexColCenter} w-full`}>
            <span className="text-primary">
              <CountUp start={8800} end={9000} duration={4} className={counterFont} />
              <span>+</span>
            </span>
            <span>Notable Hotels</span>
          </div>
          <div className={`${flexColCenter} w-full`}>
            <span className="text-primary">
              <CountUp start={1900} end={2000} duration={4} className={counterFont} />
              <span>+</span>
            </span>
            <span>Happy customers</span>
          </div>
          <div className={`${flexColCenter} w-full`}>
            <span className="text-primary">
              <CountUp end={28} className={counterFont} />
              <span>+</span>
            </span>
            <span>Memorable Stays</span>
          </div>
        </div>

        <div className="bg-white flex flex-row justify-start rounded-md font-poppins w-5/6 px-8 py-6 border-0 shadow-[0_0_5px_rgba(0,0,0,0.1)]">
          <Tabs defaultValue="hotels" onValueChange={setTab} className="w-full">
            <TabsList className="ml-[-.3rem] mt-[-.5rem]">
              <TabsTrigger value="hotels" className="hover:cursor-pointer">Hotels</TabsTrigger>
              <TabsTrigger value="stays" className="hover:cursor-pointer">Stays</TabsTrigger>
            </TabsList>

            <TabsContent value="hotels" className="py-0">
              <form onSubmit={handleSubmit} className="mt-1 flex gap-3">
                <input
                  id="hotel-search"
                  type="text"
                  placeholder="Enter a hotel name..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border rounded-md px-4 py-2 w-full"
                />
                <Button type="submit" className="hover:cursor-pointer">
                  Search
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="stays">
              <form onSubmit={handleSubmit} className="mt-1 flex gap-3">
                <input
                  id="stay-search"
                  type="text"
                  placeholder="Enter a stay location..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border rounded-md px-4 py-2 w-full"
                />
                <Button type="submit" className="hover:cursor-pointer">
                  Search
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
