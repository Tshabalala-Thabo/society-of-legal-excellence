"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Facebook, PenLine } from 'lucide-react';
import DonationDialog from "@/components/donation-dialog";

import { PartnersBanner } from "@/components/partners-banner";
import SubmitArticleModal from "@/components/submit-article-modal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


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
              <Button
                onClick={() => window.open('https://membersense.co.za/register', '_blank')}
                className="text-sm sm:text-base w-full sm:w-auto"
              >
                Join Us Today
              </Button>
              <Button
                variant="outline"
                className="text-sm sm:text-base w-full sm:w-auto"
                onClick={() => window.location.href = '/about'}
              >
                Learn More
              </Button>
              <Button
                variant="outline"
                className="text-sm sm:text-base w-full sm:w-auto"
                onClick={() => window.location.href = '/constitution'}
              >
                Constitution
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
      {/* <section className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col justify-start">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Read our expertly written blog or follow us on social media
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed max-w-lg">
              Explore our thoughts, updates, and stories from the world of legal excellence.
            </p>

            <Button
              className="w-fit bg-[#f6ce54] text-[#2a2a2a] hover:bg-[#eebd3d] hover:text-[#1a1a1a] font-semibold text-base px-8 py-6 rounded-none mb-10 transition-colors"
            >
              See All Blogs
            </Button>

            <div className="flex gap-8 items-center">
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="p-0 text-foreground group-hover:text-[#0077b5] transition-colors">
                  <Linkedin size={32} strokeWidth={1.5} fill="currentColor" className="stroke-none" />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">Linked in</span>
              </div>

              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="p-0 text-foreground group-hover:text-[#1877F2] transition-colors">
                  <Facebook size={32} strokeWidth={1.5} fill="currentColor" className="stroke-none" />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">Facebook</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {[
              {
                date: "29",
                month: "Oct",
                title: "The Importance of Ethics in Modern Legal Practice",
                description: "Upholding integrity and accountability in every aspect of legal work."
              },
              {
                date: "13",
                month: "Aug",
                title: "Building Stronger Legal Communities Through Collaboration",
                description: "Partnering with institutions to advance legal education and practice."
              },
              {
                date: "29",
                month: "Oct",
                title: "The Importance of Ethics in Modern Legal Practice",
                description: "Upholding integrity and accountability in every aspect of legal work."
              }
            ].map((blog, index) => (
              <div key={index} className="relative flex items-start p-5 bg-[#F5F5F3] transition-colors group ml-8">
                <div className="absolute left-0 top-5 -translate-x-1/2 flex flex-col min-w-[60px]">
                  <div className="bg-[#2a2a2a] text-white text-center py-2 px-3 text-lg font-bold">
                    {blog.date}
                  </div>
                  <div className="bg-[#f6ce54] text-[#2a2a2a] text-center py-1 px-3 text-sm font-semibold uppercase">
                    {blog.month}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pl-10">
                  <h3 className="text-lg md:text-xl font-bold text-[#2a2a2a] group-hover:text-primary transition-colors leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <section>
        <div className="mt-16 p-8 md:p-10 bg-foreground text-background rounded-sm text-center">
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">
            Have legal insights to share?
          </h3>
          <p className="text-background/80 max-w-2xl mx-auto mb-6">
            Join our network of legal thought leaders. Submit your article today and
            contribute to the advancement of legal knowledge in South Africa.
          </p>
          <Button
            variant="default"
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="group"
          >
            <PenLine className="h-5 w-5 transition-transform group-hover:rotate-12" />
            Start Writing Today
          </Button>
        </div>

      </section>
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-[#f5f5f3] p-8 md:px-12 border border-[#e8e8e6] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="text-center md:text-left">
                <h4 className="text-[22px] font-semibold text-[#2a2a2a] leading-tight mb-1">
                  Buy Us a Coffee
                </h4>
                <p className="text-sm text-[#757575] leading-relaxed m-0">
                  Support our work with a donation
                </p>
              </div>
            </div>

            <Button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#f6ce54] text-[#2a2a2a] text-sm font-semibold rounded-none border-none hover:bg-[#f6ce54] hover:opacity-90 transition-opacity whitespace-nowrap h-auto"
            >
              Donate
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
      <Footer />
      <DonationDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <SubmitArticleModal open={isModalOpen} onOpenChange={setIsModalOpen} />

    </main>
  );
}
