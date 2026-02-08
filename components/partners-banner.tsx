import Image from "next/image"
import Marquee from "react-fast-marquee"

export function PartnersBanner() {
    const partners = [
        { name: "Baker McKenzie", image: "/partners/baker.png", height: 80 },
        { name: "TOKISO", image: "/partners/tokiso.png", height: 80 },
        { name: "absa", image: "/partners/absa.png", height: 80 },
        { name: "member sense", image: "/partners/member-sense.png", height: 80 },
        { name: "Gawie", image: "/partners/gawie.png", height: 80 },
        { name: "Standard Bank", image: "/partners/standard-bank.png", height: 80 },
        { name: "Unisa", image: "/partners/unisa.png", height: 80 },
        { name: "Payfast", image: "/partners/payfast.png", height: 80 },
        { name: "Eversheds Sutherland", image: "/partners/eversheds-sutherland.png", height: 80 },
        { name: "Lawyers For Human Rights", image: "/partners/lhr.png", height: 80 },
    ]

    return (
        <section className="relative w-full overflow-hidden bg-background py-6 md:py-12">
            <div className="container mx-auto px-4 md:px-6">
                {/* Desktop and Tablet Layout */}
                <div className="hidden md:flex items-center gap-8 lg:gap-12">
                    {/* Left content - fixed */}
                    <div className="relative z-10 flex-shrink-0 w-full max-w-sm lg:max-w-md">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3 lg:mb-4">
                            Our Valued Partners
                        </h2>
                        <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                            Together with leading institutions, we're shaping the future of legal excellence.
                        </p>
                    </div>

                    {/* Scrolling logos container */}
                    <div className="relative flex-1 min-w-0">
                        <Marquee
                            gradient={true}
                            gradientColor="hsl(var(--background))"
                            gradientWidth={128}
                            speed={80}
                            pauseOnHover={true}
                        >
                            {partners.map((partner, index) => (
                                <div
                                    key={`partner-${index}`}
                                    className="flex-shrink-0 flex items-center justify-center opacity-90 hover:opacity-100 transition-all duration-300 mx-6 lg:mx-8"
                                >
                                    <Image
                                        src={partner.image}
                                        alt={partner.name}
                                        height={partner.height}
                                        width={0}
                                        style={{ height: `${partner.height}px`, width: 'auto' }}
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </Marquee>
                    </div>
                </div>

                {/* Mobile Layout - Stacked */}
                <div className="md:hidden space-y-8">
                    {/* Scrolling logos - full width on mobile */}
                    <div className="relative">
                        <Marquee
                            gradient={true}
                            gradientColor="hsl(var(--background))"
                            gradientWidth={64}
                            speed={60}
                            pauseOnHover={true}
                        >
                            {partners.map((partner, index) => (
                                <div
                                    key={`partner-mobile-${index}`}
                                    className="flex-shrink-0 flex items-center justify-center opacity-90 hover:opacity-100 transition-all duration-300 mx-4"
                                >
                                    <Image
                                        src={partner.image}
                                        alt={partner.name}
                                        height={50}
                                        width={0}
                                        style={{ height: '50px', width: 'auto' }}
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </Marquee>
                    </div>
                </div>
            </div>
        </section>
    )
}
// import Image from "next/image"
// import { Marquee } from "@/components/ui/marquee"
//
// export function PartnersBanner() {
//     const partners = [
//         { name: "Baker McKenzie", image: "/partners/baker.png", height: 80 },
//         { name: "TOKISO", image: "/partners/tokiso.png", height: 80 },
//         { name: "absa", image: "/partners/absa.png", height: 80 },
//         { name: "member sense", image: "/partners/member-sense.png", height: 80 },
//         { name: "Gawie", image: "/partners/gawie.png", height: 80 },
//         { name: "Standard Bank", image: "/partners/standard-bank.png", height: 80 },
//         { name: "Unisa", image: "/partners/unisa.png", height: 80 },
//         { name: "Payfast", image: "/partners/payfast.png", height: 80 },
//         { name: "Eversheds Sutherland", image: "/partners/eversheds-sutherland.png", height: 80 },
//         { name: "Lawyers For Human Rights", image: "/partners/lhr.png", height: 80 },
//     ]
//
//     return (
//         <section className="relative w-full overflow-hidden bg-background py-6 md:py-12">
//             <div className="container mx-auto px-4 md:px-6">
//                 {/* Desktop and Tablet Layout */}
//                 <div className="hidden md:flex items-center gap-8 lg:gap-12">
//                     {/* Left content - fixed */}
//                     <div className="relative z-10 flex-shrink-0 w-full max-w-sm lg:max-w-md">
//                         <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3 lg:mb-4">
//                             Our Valued Partners
//                         </h2>
//                         <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
//                             Together with leading institutions, we're shaping the future of legal excellence.
//                         </p>
//                     </div>
//
//                     {/* Scrolling logos container */}
//                     <div className="relative flex-1 min-w-0">
//                         {/* Fade gradient overlay on the left */}
//                         <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
//
//                         {/* Fade gradient overlay on the right */}
//                         <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
//
//                         {/* Marquee component */}
//                         <Marquee
//                             pauseOnHover
//                             className="[--duration:20s] [--gap:3rem] lg:[--gap:4rem]"
//                         >
//                             {partners.map((partner, index) => (
//                                 <div
//                                     key={index}
//                                     className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity duration-300"
//                                 >
//                                     <Image
//                                         src={partner.image}
//                                         alt={partner.name}
//                                         height={partner.height}
//                                         width={0}
//                                         style={{ height: `${partner.height}px`, width: 'auto' }}
//                                         className="object-contain"
//                                     />
//                                 </div>
//                             ))}
//                         </Marquee>
//                     </div>
//                 </div>
//
//                 {/* Mobile Layout */}
//                 <div className="md:hidden space-y-8">
//                     <div className="relative">
//                         {/* Fade gradient overlays */}
//                         <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
//                         <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
//
//                         {/* Marquee component */}
//                         <Marquee
//                             pauseOnHover
//                             className="[--duration:20s] [--gap:2rem]"
//                         >
//                             {partners.map((partner, index) => (
//                                 <div
//                                     key={index}
//                                     className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity duration-300"
//                                 >
//                                     <Image
//                                         src={partner.image}
//                                         alt={partner.name}
//                                         height={50}
//                                         width={0}
//                                         style={{ height: '50px', width: 'auto' }}
//                                         className="object-contain"
//                                     />
//                                 </div>
//                             ))}
//                         </Marquee>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }