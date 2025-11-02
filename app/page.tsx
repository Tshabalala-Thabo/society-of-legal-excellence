"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PartnersBanner } from "@/components/partners-banner";
import { Input } from "@/components/ui/input";
import Link from "next/link"
import Footer from "@/components/footer";

export default function Home() {
  const programs = [
    {
      title: "Mentorship Programs",
      imagePath: "/programs/mentorship.webp",
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
      imagePath: "/programs/education.webp",
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
      <div className="relative flex flex-col md:flex-row justify-center md:justify-end items-center overflow-hidden h-[500px] md:h-[650px] w-full">
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
          <div className="relative z-20 w-full sm:w-10/12 md:w-6/12 lg:w-5/12 flex flex-col h-full text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 font-roboto">
              Empowering Future
              <br />
              <span className="text-primary">Legal Professionals</span>
            </h1>
            <p className="text-sm sm:text-base mb-6 md:mb-4">
              Bridging academic knowledge with practical skills to nurture the next generation of legal excellence
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button className="text-sm sm:text-base w-full sm:w-auto">
                Join Us Today
              </Button>
              <Button variant="outline" className="text-sm sm:text-base w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <PartnersBanner />
      
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col justify-center items-center pb-8 md:pb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-2 lg:mb-4 text-center">
            Our Programs & Services
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed text-center px-4">
            Comprehensive support from high school through law degree completion
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pb-6 md:pb-10">
          {programs.map((program, index) => (
            <Card key={index} className="group relative w-full cursor-pointer transition-all mb-10 lg:mb-4 duration-500 hover:shadow-[var(--shadow-card-hover)] border-0" style={{ aspectRatio: '1 / 1' }}>
              <Image
                src={program.imagePath}
                alt={program.title}
                fill
                className="inset-0 object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute bg-black h-min bottom-0 left-4 right-4 transform translate-y-1/2 flex items-end p-4 md:p-8">
                <h4 className="text-sm sm:text-base md:text-xl font-bold text-center w-full text-background transform transition-transform duration-500">
                  {program.title}
                </h4>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Footer/>
    </main>
  );
}