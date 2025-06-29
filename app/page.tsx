"use client"

import { motion } from "framer-motion"
import { Scale, BookOpen, Users, Heart, Mail, Phone, MapPin, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const teamMembers = [
  {
    name: "Lethabo Aphane",
    title: "Co-Founder/Chief Executive Officer",
    quote: "Every challenge is an opportunity to learn and grow",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Rhulani Moyana",
    title: "Chief Development Officer",
    quote: "What would you do if you were not afraid?",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Tshepiso Tshabalala",
    title: "Co-Founder/Chief Operations Officer",
    quote: "Be the change you wish to see in the world",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Themba Mtunja",
    title: "Co-Founder/Chief Financial Officer",
    quote: "Continue in patience until perfection",
    image: "/placeholder.svg?height=300&width=300",
  },
]

const services = [
  {
    icon: Users,
    title: "Mentorship Programs",
    description:
      "Connect with experienced legal professionals who guide your journey from high school through law degree completion.",
  },
  {
    icon: BookOpen,
    title: "Educational Initiatives",
    description:
      "Access comprehensive resources, workshops, and training programs designed to bridge academic knowledge with practical skills.",
  },
  {
    icon: Scale,
    title: "Leadership Development",
    description:
      "Develop essential leadership skills through structured programs that prepare you for impactful roles in the legal profession.",
  },
  {
    icon: Heart,
    title: "Strategic Partnerships",
    description:
      "Benefit from our network of legal institutions, firms, and organizations committed to nurturing future legal excellence.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-xl font-serif font-bold text-secondary">SLE</span>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["About", "Team", "Programs", "Get Involved", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-secondary hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
            <Button className="bg-primary hover:bg-primary/90">Join Us</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full animate-float"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-secondary/10 rounded-full animate-float"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="max-w-4xl mx-auto">
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-serif font-bold text-secondary mb-6 leading-tight"
            >
              Empowering Future
              <span className="text-primary block">Legal Professionals</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Bridging academic knowledge with practical skills to nurture the next generation of legal excellence
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Join Us Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-8">
              About the Society of Legal Excellence
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              The Society of Legal Excellence (SLE) is a registered non-profit organization (NPO) committed to the
              empowerment and advancement of aspiring legal professionals. SLE was established with a clear and focused
              mission: to serve as a platform for innovation, collaboration, and the pursuit of excellence in the legal
              field.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              At its core, SLE seeks to nurture and guide young legal minds from the earliest stages of their journey,
              starting as early as high school and continuing through to the completion of their law degrees. By
              providing resources, mentorship, and transformative opportunities, SLE aims to bridge the gap between
              academic knowledge and the practical skills needed to thrive in the legal profession.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              As an independent NPO, SLE distinguishes itself from student organizations by offering long-term,
              impactful support to young professionals who are driven to make meaningful contributions to society. SLE
              is dedicated to fostering a legal community that upholds the principles of integrity, equity, and justice,
              ensuring that future generations of lawyers are equipped to lead with purpose and conviction.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Through strategic partnerships, educational initiatives, and leadership development programs, SLE strives
              to empower individuals while contributing to the broader goal of creating a more inclusive and dynamic
              legal landscape. By prioritizing excellence as the standard, the Society of Legal Excellence positions
              itself as a guiding force for those who aspire to redefine the future of the legal profession.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-secondary-light">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-8">Meet Our Leadership Team</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated leaders committed to empowering the next generation of legal professionals
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-6">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={200}
                        height={200}
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20"
                      />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-secondary mb-2">{member.name}</h3>
                    <p className="text-primary font-semibold mb-4">{member.title}</p>
                    <blockquote className="text-gray-600 italic">"{member.quote}"</blockquote>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-8">Our Programs & Services</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support from high school through law degree completion
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:border-primary/20">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-secondary mb-4">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-8">Get Involved</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our mission to empower the next generation of legal professionals
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: "Become a Member",
                description: "Join our community of aspiring legal professionals",
                action: "Join Now",
              },
              {
                title: "Volunteer",
                description: "Share your expertise and mentor future lawyers",
                action: "Volunteer",
              },
              { title: "Partner With Us", description: "Collaborate to create impactful programs", action: "Partner" },
              {
                title: "Support Our Mission",
                description: "Make a donation to support our programs",
                action: "Donate",
              },
            ].map((item, index) => (
              <motion.div key={item.title} variants={fadeInUp} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-serif font-bold text-secondary mb-4">{item.title}</h3>
                    <p className="text-gray-600 mb-6">{item.description}</p>
                    <Button className="bg-primary hover:bg-primary/90 w-full transition-all duration-300 hover:scale-105">
                      {item.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact & Donations Section */}
      <section id="contact" className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Contact & Support</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get in touch with us or support our mission through donations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <span>info@societyoflegalexcellence.org</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <span>+27 (0) 11 123 4567</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span>Johannesburg, South Africa</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-bold mb-6">Banking Details</h3>
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Banknote className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">Account Name:</p>
                        <p>Society of Legal Excellence</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold">Account:</p>
                        <p>10248183247</p>
                      </div>
                      <div>
                        <p className="font-semibold">Branch Code:</p>
                        <p>000205</p>
                      </div>
                      <div>
                        <p className="font-semibold">Electronic Payments:</p>
                        <p>051001</p>
                      </div>
                      <div>
                        <p className="font-semibold">Swift Address:</p>
                        <p>SBZA ZA JJ</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">Bank:</p>
                      <p>Standard Bank</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-light py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-xl font-serif font-bold text-secondary">Society of Legal Excellence</span>
            </div>
            <p className="text-gray-600 text-center md:text-right">
              © {new Date().getFullYear()} Society of Legal Excellence. All rights reserved.
              <br />
              Empowering future legal professionals with excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
