"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { PartnersBanner } from "@/components/partners-banner";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <div className="relative flex flex-col md:flex-row justify-center md:justify-end items-center overflow-hidden h-[650px] w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.webp"
            alt="Hero Background"
            fill
            className="object-cover object-top"
            priority
          />

          {/* Gradient Overlay - 20% opacity left to 40% opacity right */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.4))'
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="container flex justify-center md:justify-end items-center mx-auto px-4 sm:px-6 py-4">
          <div className="relative z-20 w-full sm:w-8/12 md:w-6/12 lg:w-5/12 flex flex-col h-full text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 font-roboto">
              Empowering Future
              <br />
              <span className="text-primary">Legal Professionals</span>
            </h1>
            <p className="text-sm sm:text-base mb-4">
              Bridging academic knowledge with practical skills to nurture the next generation of legal excellence
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Button className="text-sm sm:text-base">
                Join Us Today
              </Button>
              <Button variant="outline" className="text-sm sm:text-base">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
      <PartnersBanner />
    </main>
  );
}
