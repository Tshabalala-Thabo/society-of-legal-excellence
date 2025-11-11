"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PartnersBanner } from "@/components/partners-banner";
import { Input } from "@/components/ui/input";
import Link from "next/link"
import Footer from "@/components/footer";
import { Car } from "lucide-react";

export default function About() {
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
          <p className="mb-6 text-lg font-semibold">Access is not charity. It&apos;s infrastructure.</p>
          <p className="mb-6">
            The Society of Legal Excellence was founded on the belief that opportunity should not depend on who you know,
            where you study, or how much you have. We began as students who understood exclusion and turned that understanding
            into a commitment to build systems of access that last.
          </p>
          <p className="mb-6">
            We believe that access is a shared responsibility. No one moves forward alone. Those who have crossed one stage must
            extend a hand to those still finding their way learners in schools, students in universities, and youth seeking a
            second chance. True excellence is not achieved in isolation; it grows when pathways are open and support is
            continuous.
          </p>
          <p className="mb-6">
            We do not exist to offer relief or favour. We exist to make access permanent to build the kind of infrastructure
            that allows every learner, every student, and every aspiring professional to stand where they once only hoped to
            reach.
          </p>
          <p className="text-lg font-medium">
            Access is not a privilege. It is the foundation for progress.
          </p>
        </div>
        <div className="relative w-full aspect-[3/2] overflow-hidden">
          <Image
            src="/about-1.jpeg"
            alt="Marble Building"
            fill
            className="object-cover w-full h-full object-top"
          />
          {/* Black 20% opacity overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </section>
      <section className="bg-[#F5F5F3]">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl lg:text-4xl  font-bold text-[#2a2a2a] mb-3 lg:mb-4">Governance & Transparency</h2>
          <p className="mb-6">Operating under the SLE Trust, we function as both a strategic driver of youth development and a public benefit entity, ensuring transparent governance, ethical leadership, and sustainable impact across all initiatives.
          </p>
          <div className="border border-[#D3D3D3] p-8">
            <h4 className="text-sm sm:text-base md:text-xl font-bold">Legal Registration
            </h4>
            <p><span>NPC Registration:</span> 2024/713124/08</p>
            <p><span>NPO Registration:</span> 317-788</p>
            <p><span>Status:</span> Registered Non-Profit Company and NPO</p>
            <p><span>Jurisdiction:</span> South Africa</p>
          </div>
          <h2 className="text-3xl lg:text-4xl  font-bold text-[#2a2a2a] mt-12 mb-3 lg:mb-4">Our Commitment to Accountability</h2>
          <p className="mb-6">As a public benefit organization, we maintain the highest standards of financial management, governance, and reporting. Our operations are guided by our board of trustees, and we publish annual reports detailing our activities, impact, and financial statements.
          </p>
          <p>We believe that transparency builds trust, and trust enables impact. Every stakeholder, from donors to beneficiaries to partner organizations, deserves clear visibility into how we operate and the results we achieve.</p>
          <div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
