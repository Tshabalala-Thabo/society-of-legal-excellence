import { motion } from "framer-motion"
import Image from "next/image"

export function PartnersBanner() {
  const partners = [
    { name: "Baker McKenzie", image: "/partners/baker.png", width: 200 },
    { name: "TOKISO", image: "/partners/tokiso.png", width: 180 },
    { name: "absa", image: "/partners/absa.png", width: 140 },
    { name: "member sense", image: "/partners/member-sense.png", width: 200 },
    { name: "Gawie", image: "/partners/gawie.png", width: 180 },
  ]


  // Calculate total width for seamless animation
  const totalWidth = partners.reduce((acc, p) => acc + p.width, 0) + (partners.length - 1) * 64 // 64px = gap-16

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
          <div className="relative flex-1 min-w-0 overflow-hidden">
            {/* Fade gradient overlay on the left */}
            <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            
            {/* Fade gradient overlay on the right */}
            <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Scrolling animation container */}
            <motion.div
              className="flex gap-12 lg:gap-16"
              animate={{
                x: [0, -totalWidth - 64],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {/* Render partners twice for seamless loop */}
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`partner-${index}`}
                  className="flex-shrink-0 flex items-center justify-center opacity-90 hover:opacity-100 transition-all duration-300"
                  style={{ width: `${partner.width}px` }}
                >
                  <Image 
                    src={partner.image} 
                    alt={partner.name}
                    height={80}
                    width={0}
                    style={{ height: '80px', width: 'auto' }}
                    className="object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="md:hidden space-y-8">
          {/* Scrolling logos - full width on mobile */}
          <div className="relative overflow-hidden">
            {/* Fade gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Scrolling animation container */}
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -(totalWidth * 0.8 + 32)],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {/* Render partners twice for seamless loop */}
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`partner-mobile-${index}`}
                  className="flex-shrink-0 flex items-center justify-center opacity-90 hover:opacity-100 transition-all duration-300"
                  style={{ width: `${partner.width * 0.8}px` }}
                >
                  <Image 
                    src={partner.image} 
                    alt={partner.name}
                    height={80}
                    width={0}
                    style={{ height: '50px', width: 'auto' }}
                    className="object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}