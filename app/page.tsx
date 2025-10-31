"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="mx-auto w-48 h-48 relative mb-6">
          <Image 
            src="/logo.jpeg" 
            alt="Society of Legal Excellence Logo" 
            width={200} 
            height={200}
            priority
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Society of Legal Excellence
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-secondary font-medium">
          Coming Soon
        </h2>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our website is currently under development. We are working hard to bring you a platform dedicated to empowering future legal professionals. Please check back soon!
        </p>
        
        <div className="pt-12 text-gray-500">
          <p>© {new Date().getFullYear()} Society of Legal Excellence. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
