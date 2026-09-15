"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, BriefcaseBusiness, GraduationCap, Handshake, PenLine, UsersRound, Linkedin, Facebook } from 'lucide-react';
import DonationDialog from "@/components/donation-dialog";

import { PartnersBanner } from "@/components/partners-banner";
import SubmitArticleModal from "@/components/submit-article-modal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs?published=true");
        if (res.ok) {
          const data = await res.json();
          // Get only the first 3 blogs
          setBlogs(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoadingBlogs(false);
      }
    }
    fetchBlogs();
  }, []);


  const pathways = [
    {
      title: "Get Exposed",
      eyebrow: "Professional rooms",
      imagePath: "/programs/mentorship.webp",
      icon: BriefcaseBusiness,
      description: "Students step into law firms, tribunals, and professional spaces where the path into practice becomes visible."
    },
    {
      title: "Get Guided",
      eyebrow: "Mentorship",
      imagePath: "/programs/education.webp",
      icon: UsersRound,
      description: "Learners and law students receive direction from people who understand the transition from study to profession."
    },
    {
      title: "Get Equipped",
      eyebrow: "Career readiness",
      imagePath: "/programs/leadership.jpg",
      icon: GraduationCap,
      description: "Workshops translate hidden professional expectations into practical skills, confidence, and application insight."
    },
    {
      title: "Get Connected",
      eyebrow: "Access networks",
      imagePath: "/programs/partnership.jpg",
      icon: Handshake,
      description: "Partnerships with firms, universities, public bodies, and funders create durable bridges into opportunity."
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

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
              Access infrastructure
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5 leading-tight">
              SLE makes the legal profession feel reachable before it feels distant.
            </h2>
          </div>
          <div className="border-l-4 border-primary pl-6">
            <p className="text-lg md:text-xl leading-relaxed text-foreground">
              The work is simple to describe and difficult to build: put students in the rooms,
              translate the hidden rules, and keep a support system around them long after the event ends.
            </p>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              Built for learners, law students, donors, and partners who believe opportunity should not depend
              on who already has access.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12">
          {pathways.map((pathway) => (
            <div
              key={pathway.title}
              className="group border border-[#e8e8e6] bg-background transition-colors hover:bg-[#f5f5f3]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f5f3]">
                <Image
                  src={pathway.imagePath}
                  alt={`${pathway.title} pathway`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute left-4 top-4 bg-background text-foreground p-3">
                  <pathway.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                  {pathway.eyebrow}
                </p>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {pathway.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {pathway.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
          <div className="border border-[#e8e8e6] bg-[#f5f5f3] p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
              Student voice
            </p>
            <blockquote className="text-2xl md:text-3xl font-bold leading-tight text-foreground">
              "Experiences like these continue to shape my journey in law."
            </blockquote>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              This section is designed for approved future testimonials from students, alumni, partners,
              and programme attendees.
            </p>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-5">
              A serious institution can still feel human.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              SLE's credibility comes from governance and partners. Its momentum comes from the people who
              leave a workshop knowing the profession is no longer abstract.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Students", "Donors", "Partners", "Mentors"].map((audience) => (
                <div key={audience} className="border border-[#e8e8e6] p-5">
                  <p className="text-lg font-bold text-foreground">{audience}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A clear place in the SLE access ecosystem.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-10 lg:gap-16 items-start">
          {/* Left Column */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#2a2a2a] mb-5 font-roboto">
              Read our expertly written blog or follow us on social media
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Explore our thoughts, updates, and stories from the world of legal excellence.
            </p>
            <Button
              onClick={() => window.location.href = '/blog'}
              className="bg-[#f6ce54] text-[#2a2a2a] hover:bg-[#f6ce54]/90 font-semibold rounded-none px-6 py-3 h-auto mb-8"
            >
              See All Blogs
            </Button>
            <div className="flex gap-8 items-center mt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 text-[#2a2a2a] hover:opacity-85 transition-opacity"
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-xs font-semibold text-[#757575] mt-1">Linked in</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 text-[#2a2a2a] hover:opacity-85 transition-opacity"
              >
                <Facebook className="h-5 w-5" />
                <span className="text-xs font-semibold text-[#757575] mt-1">Facebook</span>
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 w-full">
            {loadingBlogs ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex gap-4 animate-pulse">
                    <div className="w-14 h-14 bg-muted" />
                    <div className="flex-grow h-14 bg-muted" />
                  </div>
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <p className="text-muted-foreground italic">No published articles yet.</p>
            ) : (
              blogs.map((blog) => {
                const date = new Date(blog.publishedAt || blog.createdAt);
                const day = format(date, "dd");
                const month = format(date, "MMM");

                return (
                  <Link
                    href={`/blog/${blog.slug}`}
                    key={blog._id}
                    className="flex gap-4 items-center group cursor-pointer"
                  >
                    {/* Content Card */}
                    <div className="relative bg-[#F5F5F3] group-hover:bg-[#ebebeb] transition-colors border border-transparent flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 md:p-4">
                      {/* Date Box: overlapping card edge on sm+ */}
                      <div className="hidden sm:flex absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-col w-14 text-center font-bold shadow-md">
                        <div className="bg-[#2a2a2a] text-white py-2 text-lg leading-none">
                          {day}
                        </div>
                        <div className="bg-[#f6ce54] text-[#2a2a2a] py-1 text-xs uppercase tracking-wider leading-none">
                          {month}
                        </div>
                      </div>
                      <div className="relative w-full sm:flex-shrink-0 sm:w-28 md:w-32 sm:ml-6 aspect-[3/2] bg-[#e8e8e6] overflow-hidden">
                        <Image
                          src={blog.coverImage || "/default-blog-cover.webp"}
                          alt={blog.title}
                          fill
                          sizes="(max-width: 640px) 90vw, 128px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Date Box: bottom-left corner of image on mobile */}
                        <div className="sm:hidden absolute left-2 bottom-2 z-10 flex flex-col w-12 text-center font-bold shadow-md">
                          <div className="bg-[#2a2a2a] text-white py-1.5 text-base leading-none">
                            {day}
                          </div>
                          <div className="bg-[#f6ce54] text-[#2a2a2a] py-1 text-[10px] uppercase tracking-wider leading-none">
                            {month}
                          </div>
                        </div>
                      </div>
                      <div className="min-w-0 sm:pr-2">
                        <h3 className="text-sm md:text-base font-bold text-[#2a2a2a] group-hover:text-primary transition-colors leading-tight mb-1 line-clamp-2 sm:line-clamp-1">
                          {blog.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {blog.content?.replace(/<[^>]*>/g, '').substring(0, 120)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="bg-foreground text-background p-8 md:p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            Publish with purpose
          </p>
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">
            Have legal insights to share?
          </h3>
          <p className="text-background/80 max-w-2xl mx-auto mb-6">
            Contribute to a growing body of student, practitioner, and partner perspectives
            on access, ethics, legal education, and professional development.
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
                  Help keep the rooms open, the workshops running, and the access work moving.
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
