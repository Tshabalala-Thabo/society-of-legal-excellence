"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PartnersBanner } from "@/components/partners-banner";
import { Input } from "@/components/ui/input";
import Link from "next/link"

export default function Home() {
  const programs = [
    {
      title: "Mentorship Programs",
      imagePath: "/programs/mentorship.jpg",
      description: "Connect with experienced legal professionals who provide guidance, support, and insights throughout your educational journey. Our mentors are committed to your success and offer personalized advice to help you navigate the path to becoming a legal professional.",
      details: [
        "One-on-one mentoring with practicing attorneys and judges",
        "Career guidance and professional development workshops",
        "Networking opportunities with legal community leaders",
        "Resume reviews and interview preparation",
        "Access to exclusive mentorship events and seminars"
      ]
    },
    {
      title: "Educational Initiatives",
      imagePath: "/programs/education.jpg",
      description: "Comprehensive academic support programs designed to enhance your learning experience and ensure success at every educational milestone. From high school preparation to law school excellence, we're with you every step of the way.",
      details: [
        "LSAT preparation courses and study groups",
        "College application assistance and essay workshops",
        "Scholarship identification and application support",
        "Academic tutoring in pre-law coursework",
        "Law school admission consulting and guidance"
      ]
    },
    {
      title: "Leadership Development",
      imagePath: "/programs/leadership.jpg",
      description: "Build essential leadership skills through hands-on experiences, workshops, and community engagement opportunities. We cultivate the next generation of legal leaders who will make a positive impact in their communities and the profession.",
      details: [
        "Leadership training and public speaking workshops",
        "Moot court competitions and debate programs",
        "Community service and pro bono project coordination",
        "Student organization leadership opportunities",
        "Professional ethics and responsibility seminars"
      ]
    },
    {
      title: "Strategic Partnerships",
      imagePath: "/programs/partnership.jpg",
      description: "Collaborate with leading law firms, educational institutions, and community organizations that share our mission. Our partnerships create pathways to success and open doors to exciting opportunities in the legal profession.",
      details: [
        "Internship placements at top law firms and legal organizations",
        "Summer associate program connections",
        "Bar association partnerships and networking events",
        "Alumni network access and career placement assistance",
        "Continuing legal education and professional development resources"
      ]
    }
  ];

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <div className="relative flex flex-col md:flex-row justify-center md:justify-end items-center overflow-hidden h-[450px] w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/marble-building-3.webp"
            alt="Hero Background"
            fill
            className="object-cover object-top"
            priority
          />

          {/* Gradient Overlay - 20% opacity left to 40% opacity right */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.4))'
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="container flex justify-center md:justify-end items-center mx-auto px-4 sm:px-6 py-4">
          <div className="relative z-20 w-full sm:w-8/12 md:w-6/12 lg:w-5/12 flex flex-col h-full text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 font-roboto">
              About the
              <br />
              <span className="text-primary">Society of Legal Excellence</span>
            </h1>
            <p className="text-sm sm:text-base mb-4">
              Empowering the next generation of legal professionals through mentorship, education, and strategic partnerships
            </p>
          </div>
        </div>
      </div>
      <section className="container grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto px-4 py-12">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3 lg:mb-4">Our Philosophy</h2>
          <p className="mb-6">We don't offer handouts. We build pathways. Access to legal education and professional development should not depend on privilege or chance encounters. It requires intentional, sustainable infrastructure.</p>
          <p className="mb-6">Traditional charity models provide temporary relief but fail to address systemic barriers. SLE creates permanent structures: mentorship networks, educational programs, leadership development frameworks, and strategic partnerships that transform potential into professional excellence.</p>
          <p>When we say access is infrastructure, we mean it operates like roads, bridges, and systems that enable movement and progress. Our programs are designed to be scalable, sustainable, and self-reinforcing, creating lasting pathways for generations of legal professionals.</p>
        </div>
        <div className="relative w-full aspect-[3/2] overflow-hidden">
          <Image
            src="/about-1.jpeg"
            alt="Marble Building"
            fill
            className="object-cover w-full h-full object-top"
          />
          {/* Black 20% opacity overlay */}
          <div className="absolute inset-0 bg-black/10"/>
        </div>
      </section>

      <section className="flex w-full bg-gray-100">
        <div className="relative w-1/2">
          <Image
            src="/marble-building-2.webp"
            alt="Marble Building"
            width={800}
            height={600}
            className="object-cover w-full h-auto"
          />
          <div className="absolute bg-black/30 w-full h-full top-0" />
        </div>
        <div className="w-1/2 pl-12 py-12 pr-24">
          <h2 className="text-3xl font-bold mb-6">
            Contact info
          </h2>
          <h4 className="text-lg font-bold mb-4">
            Call Now : (+27) 67 647 4308
          </h4>
          <p className="mb-4 font-roboto">info@societyoflegalexcellence.co.za</p>
          <p className="text-muted-foreground ">Want to know what we’re up to? Sign up for our newsletter and stay updated with our latest news, insights and announcements.</p>
          <div className="mt-4 w-full max-w-md flex items-center rounded-md border border-gray-300 overflow-hidden focus-within:border-black focus-within:ring-2 focus-within:ring-black transition-all">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              variant="outline"
              className="border-0 rounded-none text-black px-4 py-2 hover:bg-black hover:text-white"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      <footer className="bg-[#2A2A2A] text-background">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Society of Legal Excellence Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Society of Legal Excellence</h3>
              <p className="text-footer-muted text-sm leading-relaxed">
                Registered non-profit organization (NPO) committed to the empowerment and advancement of aspiring legal professionals
              </p>
            </div>

            {/* Programs & Services Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Programs & Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted hover:text-footer-foreground transition-colors text-sm">
                    Mentorship programs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted hover:text-footer-foreground transition-colors text-sm">
                    Educational initiatives
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted hover:text-footer-foreground transition-colors text-sm">
                    Leadership development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-footer-muted hover:text-footer-foreground transition-colors text-sm">
                    Strategic Partnership
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/home" className="text-footer-muted hover:text-muted transition-colors text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-footer-muted hover:text-footer-foreground transition-colors text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-footer-muted hover:text-footer-foreground transition-colors text-sm">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-footer-muted hover:text-footer-foreground transition-colors text-sm">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Compliance Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Legal & Compliance</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted hover:text-footer-foreground transition-colors text-sm">
                    Media Attributes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted hover:text-footer-foreground transition-colors text-sm">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-muted/20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#F5F5F3]/70 text-sm">
                © 2025 Society of Legal Excellence, All Rights Reserved
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[#F5F5F3]/70 text-sm">Powered by</span>
                <Link href="https://aventar.co.za" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="/aventar_logo.png"
                    alt="Aventar Logo"
                    width={40}
                    height={40}
                    className="object-contain h-10 w-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
