import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <>
            <section className="flex flex-col lg:flex-row w-full bg-gray-100">
                <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto">
                    <Image
                        src="/marble-building-2.webp"
                        alt="Marble Building"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute bg-black/30 w-full h-full top-0" />
                </div>
                <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:pl-12 py-8 sm:py-10 lg:py-12 lg:pr-24">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6">
                        Contact info
                    </h2>
                    <h4 className="text-base sm:text-lg font-bold mb-3 md:mb-4">
                        Call Now : (+27) 81 648 1089

                    </h4>
                    <p className="mb-3 md:mb-4 font-roboto text-sm sm:text-base">
                        info@societyoflegalexcellence.org.za
                    </p>
                    <p className="text-muted-foreground text-sm sm:text-base mb-4">
                        Want to know what we're up to? Sign up for our newsletter and stay
                        updated with our latest news, insights and announcements.
                    </p>
                    <div className="mt-4 w-full max-w-md flex items-center rounded-md border border-gray-300 overflow-hidden focus-within:border-black focus-within:ring-2 focus-within:ring-black transition-all">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
                        />
                        <Button
                            variant="outline"
                            className="border-0 rounded-none text-black px-3 sm:px-4 py-2 hover:bg-black hover:text-white text-sm sm:text-base whitespace-nowrap"
                        >
                            Subscribe
                        </Button>
                    </div>
                </div>
            </section>
            <footer className="bg-[#2A2A2A] text-background">
                <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {/* Society of Legal Excellence Section */}
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4">
                                Society of Legal Excellence
                            </h3>
                            <p className="text-footer-muted text-sm leading-relaxed">
                                Registered non-profit organization (NPO) committed to the
                                empowerment and advancement of aspiring legal professionals
                            </p>
                        </div>

                        {/* Programs & Services Section */}
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4">
                                Programs & Services
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted hover:text-footer-foreground transition-colors text-sm"
                                    >
                                        Mentorship programs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted hover:text-footer-foreground transition-colors text-sm"
                                    >
                                        Educational initiatives
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted hover:text-footer-foreground transition-colors text-sm"
                                    >
                                        Leadership development
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-footer-muted hover:text-footer-foreground transition-colors text-sm"
                                    >
                                        Strategic Partnership
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Quick Links Section */}
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4">
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/home"
                                        className="text-footer-muted hover:text-muted transition-colors text-sm"
                                    >
                                        Home
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link
                                        href="#"
                                        className="text-footer-muted hover:text-footer-foreground transition-colors text-sm"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-footer-muted hover:text-footer-foreground transition-colors text-sm"
                                    >
                                        Team
                                    </Link>
                                </li> */}
                                <li>
                                    <Link
                                        href="#"
                                        className="text-footer-muted hover:text-footer-foreground transition-colors text-sm"
                                    >
                                        About
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal & Compliance Section */}
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4">
                                Legal & Compliance
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted hover:text-footer-foreground transition-colors text-sm"
                                    >
                                        Media Attributes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted hover:text-footer-foreground transition-colors text-sm"
                                    >
                                        Terms & Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-muted/20">
                    <div className="container mx-auto px-4 sm:px-6 py-4">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                            <p className="text-[#F5F5F3]/70 text-xs sm:text-sm text-center md:text-left">
                                © 2025 Society of Legal Excellence, All Rights Reserved
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-[#F5F5F3]/70 text-xs sm:text-sm">
                                    Powered by
                                </span>
                                <Link
                                    href="https://aventar.co.za"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-opacity"
                                >
                                    <Image
                                        src="/aventar_logo.png"
                                        alt="Aventar Logo"
                                        width={40}
                                        height={40}
                                        className="object-contain h-8 sm:h-10 w-auto"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}