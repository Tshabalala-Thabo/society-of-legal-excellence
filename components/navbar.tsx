"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-10 bg-transparent h-16 overflow-visible">
      <div className="container mx-auto px-4 h-16 overflow-visible">
        <div className="relative flex items-center justify-between h-full">
          <Link href="/" aria-label="Society of Legal Excellence Home" className="relative h-full overflow-visible flex items-center top-24">
            <Image
              src="/logo.png"
              alt="Society of Legal Excellence logo"
              width={240}
              height={80}
              className="h-64 w-auto object-contain"
              priority
            />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-primary transition-colors font-opensans">
              Home
            </Link>
            <Link href="/team" className="text-white hover:text-primary transition-colors font-opensans">
              Team
            </Link>
            <Link href="/blog" className="text-white hover:text-primary transition-colors font-opensans">
              Blog
            </Link>
            <Link href="/about" className="text-white hover:text-primary transition-colors font-opensans">
              About
            </Link>
          </div>
          
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-black bg-opacity-80 rounded p-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-white hover:text-primary transition-colors font-opensans"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/team" 
                className="text-white hover:text-primary transition-colors font-opensans"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </Link>
              <Link 
                href="/blog" 
                className="text-white hover:text-primary transition-colors font-opensans"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className="text-white hover:text-primary transition-colors font-opensans"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}