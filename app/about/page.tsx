"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FileCheck2, Landmark, Scale, UsersRound } from "lucide-react";

export default function About() {
  const commitments = [
    {
      title: "Access",
      description: "We create pathways into rooms, information, networks, and opportunities that too often remain informal.",
      icon: Landmark,
    },
    {
      title: "Continuity",
      description: "One event should become a support system: mentoring, membership, content, and ongoing connection.",
      icon: UsersRound,
    },
    {
      title: "Ethics",
      description: "Professional success must be rooted in integrity, social consciousness, and responsibility.",
      icon: Scale,
    },
    {
      title: "Accountability",
      description: "Public benefit work depends on governance, transparent records, and trust from students, donors, and partners.",
      icon: FileCheck2,
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
      <section className="container grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 mx-auto px-4 py-12 md:py-16">
        <div className="relative w-full aspect-[3/2] overflow-hidden order-2 lg:order-1">
          <Image
            src="/about-1.jpeg"
            alt="SLE community placeholder"
            fill
            className="object-cover w-full h-full object-top"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            Our philosophy
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            Access is not charity. It&apos;s infrastructure.
          </h2>
          <div className="space-y-6 text-foreground leading-relaxed">
            <p>
              The Society of Legal Excellence was founded on the belief that opportunity should not depend on who you know,
              where you study, or how much you have. We began as students who understood exclusion and turned that understanding
              into a commitment to build systems of access that last.
            </p>
            <p>
              We believe access is a shared responsibility. Those who have crossed one stage must extend a hand to those still
              finding their way: learners in schools, students in universities, and youth seeking a second chance.
            </p>
            <p className="text-lg font-semibold">
              True excellence is not achieved in isolation; it grows when pathways are open and support is continuous.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f3] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
              What we protect
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              SLE is built to make opportunity repeatable, not occasional.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {commitments.map((commitment) => (
              <div key={commitment.title} className="border border-[#e8e8e6] bg-background p-6">
                <commitment.icon className="h-7 w-7 text-primary mb-5" />
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {commitment.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {commitment.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F3]">
        <div className="container mx-auto px-4 pb-12 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 bg-background border border-[#e8e8e6] p-8 md:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                Governance & transparency
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2a2a2a] mb-5">
                Public benefit work needs visible stewardship.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Operating under the SLE Trust, we function as both a strategic driver of youth development and a public
                benefit entity, ensuring transparent governance, ethical leadership, and sustainable impact.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h4 className="text-xl font-bold mb-4">Legal Registration</h4>
              <div className="space-y-3 text-sm">
                <p><span className="font-semibold text-foreground">NPO Registration:</span> 317-788</p>
                <p><span className="font-semibold text-foreground">Status:</span> Registered Non-Profit Company and NPO</p>
                <p><span className="font-semibold text-foreground">Jurisdiction:</span> South Africa</p>
              </div>
              <div className="mt-8 border-t border-[#e8e8e6] pt-6">
                <h4 className="text-xl font-bold mb-3">Our Commitment to Accountability</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Every stakeholder, from donors to beneficiaries to partner organizations, deserves clear visibility into
                  how we operate and the results we work toward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
