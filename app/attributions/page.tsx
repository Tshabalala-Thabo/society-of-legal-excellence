"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

interface Attribution {
    description: string;
    author: string;
    source: string;
    url: string;
}

export default function Attributions() {
    const attributions: Attribution[] = [
        {
            description: "Grey marble column details building",
            author: "fanjianhua",
            source: "Freepik",
            url: "https://www.freepik.com/free-photo/grey-marble-column-details-building_1175241.htm#fromView=search&page=1&position=30&uuid=432a7490-4c6c-45cf-9aae-8bc3a5bb85ad&query=law",
        },
        {
            description: "Grey marble column details building (variant 2)",
            author: "fanjianhua",
            source: "Freepik",
            url: "https://www.freepik.com/free-photo/grey-marble-column-details-building_1175242.htm#fromView=search&page=1&position=33&uuid=6e0ae94e-d0c0-4c20-b068-dc66312393fd&query=court+",
        },
        {
            description: "Grey marble column details building (variant 3)",
            author: "fanjianhua",
            source: "Freepik",
            url: "https://www.freepik.com/free-photo/grey-marble-column-details-building_1175243.htm#fromView=search&page=1&position=18&uuid=521df506-5f87-4c4a-bb5b-0f39a354bd36&query=court",
        },
        {
            description: "Two male colleagues talking to each other at meeting",
            author: "freepik",
            source: "Freepik",
            url: "https://www.freepik.com/free-photo/two-male-colleagues-talking-each-other-meeting_12065581.htm#fromView=search&page=1&position=15&uuid=5ef93166-86f6-4425-8d75-45c9ab7b82ea&query=mentorship",
        },
        {
            description: "Close up people learning together in office",
            author: "freepik",
            source: "Freepik",
            url: "https://www.freepik.com/free-photo/close-up-people-learning-together-office_23404597.htm#fromView=search&page=1&position=42&uuid=e17c5508-e143-4c33-9806-63a385587d2c&query=teach",
        },
        {
            description: "High angle shot of gavel and scale on wooden surface",
            author: "wirestock",
            source: "Freepik",
            url: "https://www.freepik.com/free-photo/high-angle-shot-gavel-scale-wooden-surface_13701660.htm#fromView=search&page=1&position=22&uuid=ba78eae6-1bff-49ca-a19a-8f0ac9b3283c&query=judge+hammer",
        },
        {
            description: "Dark businesswoman shaking hands with male colleague",
            author: "pch.vector",
            source: "Freepik",
            url: "https://www.freepik.com/free-photo/dark-businesswoman-shaking-hands-with-male-colleague_5890136.htm#fromView=search&page=1&position=2&uuid=f3c5985d-fa75-4b17-94fd-6f9fff218adc&query=handshake+formal",
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
                            Media
                            <br />
                            <span className="text-primary">Attributions</span>
                        </h1>
                        <p className="text-sm sm:text-base mb-4">
                            Acknowledging the talented creators whose work helps bring our vision to life.
                        </p>
                    </div>
                </div>
            </div>

            {/* Attributions Section */}
            <section className="py-12">
                <div className="flex w-full flex-col justify-center items-center pb-8 md:pb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-2 lg:mb-4 text-center">
                        Image Credits
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed text-center px-4 max-w-2xl">
                        We would like to thank the following creators for providing the images used on this website.
                    </p>
                </div>

                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {attributions.map((attribution, index) => (
                            <div
                                key={index}
                                className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2">
                                    {attribution.description}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    By <span className="font-medium">{attribution.author}</span> on {attribution.source}
                                </p>
                                <Button asChild variant="link" className="mt-auto flex justify-start p-0 h-auto">
                                    <Link
                                        href={attribution.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View original
                                        <svg
                                            className="w-4 h-4 ml-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Freepik Acknowledgment */}
            <section className="py-12 bg-muted/40">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-4">
                            Special Thanks to Freepik
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                            We are grateful for their platform that connects creators with high-quality visual content.
                        </p>
                        <Button asChild size="lg">
                            <Link
                                href="https://www.freepik.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit Freepik
                                <svg
                                    className="w-4 h-4 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
