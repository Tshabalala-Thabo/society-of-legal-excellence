"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FileCheck2, Handshake, ShieldCheck } from "lucide-react";

export default function Team() {
    const [activeTrustee, setActiveTrustee] = useState<number | null>(null);
    const trustees = [
        {
            name: "Themba Mtunja",
            role: "Trustee • CEO",
            focus: "Strategic leadership and continuity",
            image: "/team/themba.jpg",
            linkedin: "https://www.linkedin.com/in/themba-mtunja-560a958a/",
        },
        {
            name: "Tshepisoh Tshabalala",
            role: "Trustee • COO",
            focus: "Operations, partnerships, and delivery",
            image: "/team/tshepisoh.jpg",
            linkedin: "https://www.linkedin.com/in/tshepiso-tshabalala-0972201a1/",
        },
        {
            name: "Thandolwethu Mkhize",
            role: "Trustee • CFO",
            focus: "Financial stewardship and accountability",
            image: "/team/thandolwethu.jpg",
            linkedin: "https://www.linkedin.com/in/thandolwethu-wamkelwa-mkhize-12115029b/",
        },
    ];

    const vacantTrustees = [
        { title: "Vacant Trustee Position" },
        { title: "Vacant Trustee Position" },
        { title: "Vacant Trustee Position" },
        { title: "Vacant Trustee Position" },
    ];

    const stewardship = [
        {
            title: "Guard the mission",
            description: "Keep SLE focused on access, public benefit, and the long-term development of future legal professionals.",
            icon: ShieldCheck,
        },
        {
            title: "Build trusted partnerships",
            description: "Work with firms, universities, institutions, and supporters who can open real pathways for students.",
            icon: Handshake,
        },
        {
            title: "Make impact accountable",
            description: "Oversee governance, financial discipline, and transparent reporting so trust can grow with the work.",
            icon: FileCheck2,
        },
    ];

    return (
        <main>
            <Navbar />

            {/* Hero Section */}
            <div className="relative flex flex-col md:flex-row justify-center md:justify-end items-center overflow-hidden h-[450px] w-full">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/marble-building-3.webp"
                        alt="Hero Background"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    <div
                        className="absolute inset-0 z-10"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.4))",
                        }}
                    ></div>
                </div>

                {/* Hero Content */}
                <div className="container flex justify-center md:justify-end items-center mx-auto px-4 sm:px-6 py-4">
                    <div className="relative z-20 w-full sm:w-8/12 md:w-6/12 lg:w-5/12 flex flex-col h-full text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-8 font-roboto">
                            The Faces Driving
                            <br />
                            <span className="text-primary">Legal Excellence</span>
                        </h1>
                        <p className="text-sm sm:text-base mb-4">
                            Guided by purpose, united by a vision for a more equitable and empowered legal profession.
                        </p>
                    </div>
                </div>
            </div>

            {/* Trustees Section */}
            <section className="py-12 md:py-16">
                <div className="flex w-full flex-col justify-center items-center pb-8 md:pb-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                        Governance in motion
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-2 lg:mb-4 text-center">
                        Trustees
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed text-center px-4 max-w-3xl">
                        SLE is led by trustees responsible for turning access into a durable public benefit institution.
                    </p>
                </div>

                <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {trustees.map((trustee, index) => {
                        const isActive = activeTrustee === index;
                        return (
                        <div
                            key={index}
                            className="group border border-[#e8e8e6] bg-background"
                        >
                            {/* Image with zoom + overlay */}
                            <div
                                className="relative w-full overflow-hidden aspect-[4/5]"
                                onTouchStart={(e) => {
                                    if (!isActive) {
                                        // Block the browser from synthesising a click,
                                        // so the first touch only reveals the overlay.
                                        e.preventDefault();
                                        setActiveTrustee(index);
                                    }
                                    // When already active, do nothing — the browser proceeds
                                    // and fires a click on the <a> inside the overlay.
                                }}
                            >
                                <Image
                                    src={trustee.image}
                                    alt={trustee.name}
                                    width={200}
                                    height={200}
                                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${isActive ? "scale-105" : ""}`}
                                />
                                {/* Overlay: CSS hover on desktop, state-driven on mobile */}
                                <div
                                    className={`absolute inset-0 transition-opacity duration-300
                                        ${isActive
                                            ? "opacity-100"
                                            : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                                        } bg-black/50`}
                                >
                                    <a
                                        href={trustee.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${trustee.name} on LinkedIn`}
                                        className="flex flex-col items-center justify-center gap-2 w-full h-full"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 24 24"
                                            fill="white"
                                        >
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        <span className="text-white text-sm font-medium">View Profile</span>
                                    </a>
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-foreground">
                                    {trustee.name}
                                </h3>
                                <p className="text-muted-foreground text-sm mt-1">
                                    {trustee.role}
                                </p>
                                <p className="text-sm text-foreground mt-4 border-t border-[#e8e8e6] pt-4">
                                    {trustee.focus}
                                </p>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </section>

            <section className="bg-[#f5f5f3] py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-start">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                                What trustees make possible
                            </p>
                            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-5">
                                The people behind the institution are also responsible for its credibility.
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Students need warmth and access. Donors and partners need confidence. SLE's leadership
                                has to hold both at the same time.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {stewardship.map((item) => (
                                <div key={item.title} className="border border-[#e8e8e6] bg-background p-6">
                                    <item.icon className="h-7 w-7 text-primary mb-5" />
                                    <h3 className="text-xl font-bold text-foreground mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Vacant Trustees Section */}
            <section className="py-12 md:py-16 bg-background">
                <div className="flex w-full flex-col justify-center items-center pb-8 md:pb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-2 lg:mb-4 text-center">
                        Vacant Trustee Positions
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed text-center px-4 max-w-3xl">
                        We&apos;re looking for principled builders who can strengthen SLE&apos;s mission, governance, and public trust.
                    </p>
                </div>

                <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {vacantTrustees.map((vacant, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center items-center p-6 border border-dashed border-gray-300 text-center min-h-[260px]"
                        >
                            <div className="flex justify-center items-center w-20 h-20 mb-6 bg-gray-100 text-gray-400">
                                <span className="text-5xl font-light">+</span>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground">
                                {vacant.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mt-2">
                                Join us to make a lasting impact
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
