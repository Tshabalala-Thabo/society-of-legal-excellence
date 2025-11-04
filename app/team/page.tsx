"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Team() {
    const trustees = [
        {
            name: "Themba Mtunja",
            role: "Trustee • CEO",
            image: "/team/themba.jpg",
        },
        {
            name: "Tshepisoh Tshabalala",
            role: "Trustee • COO",
            image: "/team/tshepisoh.jpg",
        },
        {
            name: "Thandolwethu Mkhize",
            role: "Trustee",
            image: "/team/thandolwethu.jpg",
        },
    ];

    const vacantTrustees = [
        { title: "Vacant Trustee Position" },
        { title: "Vacant Trustee Position" },
        { title: "Vacant Trustee Position" },
        { title: "Vacant Trustee Position" },
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
            <section className="py-12">
                <div className="flex w-full flex-col justify-center items-center pb-8 md:pb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-2 lg:mb-4 text-center">
                        Trustees
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed text-center px-4">
                        Meet the dedicated professionals behind our success
                    </p>
                </div>

                <div className="container flex flex-wrap justify-center items-center gap-8 w-full">
                    {trustees.map((trustee, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center items-center w-8/12 sm:w-5/12 md:w-3/12"
                        >
                            <Image
                                src={trustee.image}
                                alt={trustee.name}
                                width={200}
                                height={200}
                                className="mb-4 w-full h-full object-cover rounded-lg shadow-md"
                            />
                            <h3 className="text-lg font-bold text-foreground text-center">
                                {trustee.name}
                            </h3>
                            <p className="text-muted-foreground text-sm text-center">
                                {trustee.role}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Vacant Trustees Section */}
            <section className="py-12 bg-muted/40">
                <div className="flex w-full flex-col justify-center items-center pb-8 md:pb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-2 lg:mb-4 text-center">
                        Vacant Trustee Positions
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed text-center px-4">
                        We’re looking for passionate individuals to join our mission of legal excellence
                    </p>
                </div>

                <div className="container flex flex-wrap justify-center items-center gap-8 w-full">
                    {vacantTrustees.map((vacant, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center items-center w-8/12 sm:w-5/12 md:w-3/12 p-6 border border-dashed border-gray-300 rounded-lg text-center"
                        >
                            <div className="flex justify-center items-center w-[200px] h-[200px] mb-4 bg-gray-100 rounded-lg text-gray-400">
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
