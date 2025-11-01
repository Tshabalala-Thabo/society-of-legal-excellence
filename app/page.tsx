"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <div className="relative flex justify-end items-center overflow-hidden h-[650px] w-full">
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
        <div className="container flex justify-end items-center mx-auto px-4 py-4">
          <div className="relative z-20 w-5/12 flex flex-col  h-full text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-roboto">
              Empowering Future
              <br />
              <span className="text-primary">Legal Professionals</span>
            </h1>
            <p className="mb-8">
              Bridging academic knowledge with practical skills to nurture the next generation of legal excellence
            </p>
            <div className="flex space-x-4">
              <Button>
                Join Us Today
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
