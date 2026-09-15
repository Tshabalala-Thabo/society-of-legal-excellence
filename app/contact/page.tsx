"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Building2, GraduationCap, HandCoins, Mail, Newspaper } from "lucide-react";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: "" });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({
                    type: "success",
                    message: data.message || "Your message has been sent successfully!",
                });
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                });
            } else {
                setSubmitStatus({
                    type: "error",
                    message: data.error || "Failed to send message. Please try again.",
                });
            }
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message: "An error occurred. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const inquiryRoutes = [
        {
            title: "Students",
            description: "Ask about membership, programmes, workshops, mentorship, or professional exposure.",
            icon: GraduationCap,
        },
        {
            title: "Donors",
            description: "Support access work, student development, and the operational continuity behind it.",
            icon: HandCoins,
        },
        {
            title: "Partners",
            description: "Collaborate on workshops, firm visits, scholarships, career readiness, or institutional access.",
            icon: Building2,
        },
        {
            title: "Article submissions",
            description: "Share legal insights, student perspectives, or public benefit work with the SLE community.",
            icon: Newspaper,
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
                            Get In
                            <br />
                            <span className="text-primary">Touch</span>
                        </h1>
                        <p className="text-sm sm:text-base mb-4">
                            Have questions or want to learn more? We&apos;d love to hear from you.
                        </p>
                    </div>
                </div>
            </div>

            <section className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-start">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                            Start in the right place
                        </p>
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-5">
                            Whether you need access, want to fund it, or can help build it, SLE should be easy to reach.
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Use the message form for direct enquiries. The SLE team can route student, donor, partner,
                            media, and programme requests from there.
                        </p>
                        <div className="mt-8 border border-[#e8e8e6] bg-[#f5f5f3] p-6">
                            <Mail className="h-7 w-7 text-primary mb-4" />
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                Prefer email?
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                office@societyoflegalexcellence.org.za
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {inquiryRoutes.map((route) => (
                            <div key={route.title} className="border border-[#e8e8e6] bg-background p-6">
                                <route.icon className="h-7 w-7 text-primary mb-5" />
                                <h3 className="text-xl font-bold text-foreground mb-3">
                                    {route.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {route.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="pb-12 md:pb-16">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1">
                        <div className="bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                                Send us a Message
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Tell us who you are, what you need, and how SLE can respond.
                            </p>

                            {submitStatus.type && (
                                <div
                                    className={`mb-6 p-4 ${submitStatus.type === "success"
                                            ? "bg-green-50 text-green-800 border border-green-200"
                                            : "bg-red-50 text-red-800 border border-red-200"
                                        }`}
                                >
                                    {submitStatus.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name *</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address *</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+27 XX XXX XXXX"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject *</Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="What is this about?"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message *</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us how we can help you..."
                                        rows={5}
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
