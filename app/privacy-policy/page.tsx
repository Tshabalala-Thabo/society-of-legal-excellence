"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
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
                            Privacy
                            <br />
                            <span className="text-primary">Policy</span>
                        </h1>
                        <p className="text-sm sm:text-base mb-4">
                            Understanding how we protect and handle your personal information.
                        </p>
                    </div>
                </div>
            </div>

            {/* Privacy Policy Content */}
            <section className="py-12">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <p className="text-muted-foreground text-sm mb-8">
                        Last Updated: 9 December 2025
                    </p>

                    <p className="text-foreground mb-8 leading-relaxed">
                        Society of Legal Excellence is committed to protecting your personal information and ensuring transparency about how we handle your data. This Privacy Policy explains what information we collect, how we use it, and the choices you have regarding your data when visiting our website or subscribing to our newsletter.
                    </p>

                    {/* Section 1 */}
                    <div className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                            1. Information We Collect
                        </h2>

                        <h3 className="text-lg font-semibold text-foreground mb-3">
                            1.1 Newsletter Subscription
                        </h3>
                        <p className="text-foreground mb-3 leading-relaxed">
                            When you subscribe to our newsletter, we collect:
                        </p>
                        <ul className="list-disc list-inside text-foreground mb-4 space-y-1 ml-4">
                            <li>Email address</li>
                            <li>Name (optional)</li>
                        </ul>
                        <p className="text-foreground mb-6 leading-relaxed">
                            This information is provided directly by you when submitting the newsletter form.
                        </p>

                        <h3 className="text-lg font-semibold text-foreground mb-3">
                            1.2 Automatically Collected Data
                        </h3>
                        <p className="text-foreground mb-3 leading-relaxed">
                            When you browse our website, certain non-personal information may be collected automatically, such as:
                        </p>
                        <ul className="list-disc list-inside text-foreground mb-4 space-y-1 ml-4">
                            <li>Browser type and version</li>
                            <li>Device information</li>
                            <li>Pages visited and time spent</li>
                            <li>General usage analytics</li>
                        </ul>
                        <p className="text-foreground leading-relaxed">
                            This data helps us improve website performance and user experience. It cannot be used to personally identify you.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                            2. How We Use Your Information
                        </h2>
                        <p className="text-foreground mb-3 leading-relaxed">
                            We use your personal information for the following purposes:
                        </p>
                        <ul className="list-disc list-inside text-foreground mb-4 space-y-1 ml-4">
                            <li>To send newsletters and updates related to Society of Legal Excellence</li>
                            <li>To respond to enquiries if you contact us</li>
                            <li>To improve our website, content, and user experience</li>
                            <li>To analyse site performance and traffic patterns</li>
                        </ul>
                        <p className="text-foreground font-medium leading-relaxed">
                            We do not sell or rent your personal information to any third parties.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                            3. Legal Basis for Processing (POPIA Alignment)
                        </h2>
                        <p className="text-foreground mb-3 leading-relaxed">
                            We process your personal information based on:
                        </p>
                        <ul className="list-disc list-inside text-foreground mb-4 space-y-1 ml-4">
                            <li>Your consent, provided when you voluntarily submit your email</li>
                            <li>Legitimate interest, such as ensuring website functionality and analytics</li>
                        </ul>
                        <p className="text-foreground leading-relaxed">
                            You may withdraw your consent at any time.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                            4. Newsletter Unsubscribe / Opt-Out
                        </h2>
                        <p className="text-foreground mb-3 leading-relaxed">
                            You may unsubscribe from our newsletter at any time by:
                        </p>
                        <ul className="list-disc list-inside text-foreground mb-4 space-y-1 ml-4">
                            <li>Clicking the &quot;Unsubscribe&quot; link included in every email, or</li>
                            <li>Contacting us directly (contact details will be added once available)</li>
                        </ul>
                        <p className="text-foreground leading-relaxed">
                            Once you unsubscribe, you will no longer receive newsletter emails.
                        </p>
                    </div>

                    {/* Section 5 */}
                    <div className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                            5. Storage, Security & Retention
                        </h2>
                        <ul className="list-disc list-inside text-foreground space-y-2 ml-4">
                            <li>Your data is stored securely using reasonable technical and administrative safeguards.</li>
                            <li>Access is restricted to authorised personnel only.</li>
                            <li>We retain your email address until you unsubscribe or until it is no longer required for the purpose collected.</li>
                        </ul>
                    </div>

                    {/* Section 6 */}
                    <div className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                            6. Third-Party Service Providers
                        </h2>
                        <p className="text-foreground mb-3 leading-relaxed">
                            We use Resend as our email delivery and newsletter service provider.
                        </p>
                        <p className="text-foreground mb-3 leading-relaxed">
                            Resend may process your email address only for the purpose of sending communications on our behalf.
                        </p>
                        <p className="text-foreground mb-3 leading-relaxed">
                            You can view their privacy policy here:{" "}
                            <Link
                                href="https://resend.com/legal/privacy-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                            >
                                https://resend.com/legal/privacy-policy
                            </Link>
                        </p>
                        <p className="text-foreground leading-relaxed">
                            We do not authorize Resend to use your information for their own marketing or unrelated activities.
                        </p>
                    </div>

                    {/* Section 7 */}
                    <div className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                            7. Your Rights Under POPIA
                        </h2>
                        <p className="text-foreground mb-3 leading-relaxed">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside text-foreground mb-4 space-y-1 ml-4">
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction or deletion of your information</li>
                            <li>Withdraw consent at any time</li>
                            <li>Request that we stop processing your information</li>
                        </ul>
                        <p className="text-foreground leading-relaxed">
                            We will comply with all valid requests subject to legal requirements.
                        </p>
                    </div>

                    {/* Section 8 */}
                    <div className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                            8. Changes to This Privacy Policy
                        </h2>
                        <p className="text-foreground leading-relaxed">
                            We may update this policy occasionally to reflect changes in our operations or legal requirements. Updates will be posted on this page with a new &quot;Last Updated&quot; date.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
