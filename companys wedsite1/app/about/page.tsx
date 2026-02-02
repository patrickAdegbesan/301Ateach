'use client';

import Button from "@/components/Button";
import Card from "@/components/Card";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBullseye, faLock, faLightbulb, faArrowTrendUp, faUsers, faAward, 
  faHandshake, faCheck, faChevronRight, faQuoteLeft
} from "@fortawesome/free-solid-svg-icons";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";
import CountUp from "@/components/animations/CountUp";
import { motion } from "framer-motion";

const values = [
  {
    title: "Technology Solves Real Problems",
    description: "We don't build technology for its own sake. Every solution we create addresses genuine business challenges with measurable outcomes.",
    icon: faBullseye,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Security is Built-In, Not Optional",
    description: "From day one, security and compliance are integrated into every layer of our solutions, protecting your data and reputation.",
    icon: faLock,
    color: "from-red-500 to-red-600"
  },
  {
    title: "Clarity Over Complexity",
    description: "Technology should simplify, not complicate. We deliver solutions that are powerful yet intuitive, clear yet comprehensive.",
    icon: faLightbulb,
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "Scalability Over Shortcuts",
    description: "We build for the long term. Our architecture is designed to grow with your business, ensuring sustainable value.",
    icon: faArrowTrendUp,
    color: "from-green-500 to-emerald-600"
  },
];

const approaches = [
  {
    title: "Discovery & Analysis",
    description: "We begin by deeply understanding your business, goals, and challenges to create a tailored technology roadmap.",
    icon: faLightbulb,
    step: "01"
  },
  {
    title: "Strategic Planning",
    description: "Our experts design comprehensive solutions that align with your objectives and budget constraints.",
    icon: faBullseye,
    step: "02"
  },
  {
    title: "Expert Implementation",
    description: "We execute with precision, keeping you informed at every milestone while ensuring quality delivery.",
    icon: faAward,
    step: "03"
  },
  {
    title: "Ongoing Partnership",
    description: "Our relationship doesn't end at delivery. We provide continuous support and optimization.",
    icon: faHandshake,
    step: "04"
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
            alt="Team collaboration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-navy/80" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="inline-block px-4 py-1 bg-techBlue/20 text-techBlue-light text-sm font-semibold rounded-full mb-6">
                About Us
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                Building Technology
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-techBlue to-techBlue-light">
                  That Matters
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                A trusted technology partner committed to excellence, innovation, and long-term success for every client we serve.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 10, suffix: "+", label: "Years Experience" },
              { value: 200, suffix: "+", label: "Projects Completed" },
              { value: 150, suffix: "+", label: "Happy Clients" },
              { value: 25, suffix: "+", label: "Team Members" },
            ].map((stat, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-techBlue mb-2">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-charcoal/70 font-medium">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-softGray">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div>
                <span className="inline-block px-4 py-1 bg-techBlue/10 text-techBlue text-sm font-semibold rounded-full mb-4">
                  Our Purpose
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy">
                  Empowering Businesses Through Technology
                </h2>
                <p className="text-lg text-charcoal/80 leading-relaxed mb-6">
                  At <strong>301A TECH LTD</strong>, we believe technology should work for you—not the other way around. 
                  Our mission is to deliver professional technology solutions that empower businesses and individuals 
                  to achieve their goals efficiently and securely.
                </p>
                <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
                  We envision a future where every business, regardless of size, has access to world-class 
                  technology solutions that drive growth, enhance security, and create lasting value.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                    <FontAwesomeIcon icon={faAward} className="w-5 h-5 text-techBlue" />
                    <span className="font-semibold text-navy">Award Winning</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                    <FontAwesomeIcon icon={faHandshake} className="w-5 h-5 text-techBlue" />
                    <span className="font-semibold text-navy">Trusted Partner</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
                  alt="Team meeting"
                  width={600}
                  height={450}
                  className="rounded-2xl shadow-2xl"
                />
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-techBlue text-white p-6 rounded-xl shadow-xl hidden md:block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-3xl font-bold mb-1">10+</div>
                  <div className="text-white/80">Years of Excellence</div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-techBlue/10 text-techBlue text-sm font-semibold rounded-full mb-4">
                Our Values
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy">
                What We Stand For
              </h2>
              <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
                These principles guide every decision we make and every solution we build.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto" staggerDelay={0.15}>
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card hover className="h-full">
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-3 md:mb-6`}>
                    <FontAwesomeIcon icon={value.icon} className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="text-base md:text-2xl font-bold mb-2 md:mb-3 text-navy">{value.title}</h3>
                  <p className="hidden md:block text-charcoal/70 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container-custom relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-techBlue/20 text-techBlue-light text-sm font-semibold rounded-full mb-4">
                Industries
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Trusted Across Sectors
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We bring specialized expertise to diverse industries, understanding the unique challenges each sector faces.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
            {[
              { name: "Healthcare", desc: "Secure patient management systems, telemedicine solutions, and HIPAA-compliant infrastructure." },
              { name: "Finance & Banking", desc: "Robust security solutions, transaction systems, and regulatory compliance tools." },
              { name: "Education", desc: "E-learning platforms, student management systems, and smart classroom technology." },
              { name: "Retail & E-commerce", desc: "Inventory management, POS systems, and seamless online shopping experiences." },
              { name: "Manufacturing", desc: "Process automation, supply chain optimization, and IoT integration." },
              { name: "Real Estate", desc: "Property management software, virtual tours, and smart building solutions." },
            ].map((industry, index) => (
              <FadeIn key={industry.name} delay={index * 0.1}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/10 transition-colors">
                  <h3 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-3">{industry.name}</h3>
                  <p className="hidden md:block text-gray-400 text-sm">{industry.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-softGray">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-techBlue/10 text-techBlue text-sm font-semibold rounded-full mb-4">
                How We Work
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy">
                Our Approach to Excellence
              </h2>
              <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
                A proven methodology that ensures successful outcomes for every project.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8" staggerDelay={0.1}>
            {approaches.map((approach) => (
              <StaggerItem key={approach.title}>
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm hover:shadow-lg transition-shadow h-full">
                  <div className="text-3xl md:text-5xl font-bold text-techBlue/20 mb-2 md:mb-4">{approach.step}</div>
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-techBlue to-techBlue-dark flex items-center justify-center mb-3 md:mb-6">
                    <FontAwesomeIcon icon={approach.icon} className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="text-sm md:text-xl font-bold text-navy mb-2 md:mb-3">{approach.title}</h3>
                  <p className="hidden md:block text-charcoal/70">{approach.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Clients Choose Us */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-techBlue/10 text-techBlue text-sm font-semibold rounded-full mb-4">
                Our Commitment
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy">
                Why Clients Choose Us
              </h2>
              <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
                We're committed to delivering exceptional value at every stage of our partnership.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
            {[
              { title: "On-Time Delivery", value: "98%", desc: "Projects delivered on or before deadline" },
              { title: "Client Retention", value: "95%", desc: "Clients continue working with us long-term" },
              { title: "Support Response", value: "<2hrs", desc: "Average response time for support requests" },
            ].map((stat, index) => (
              <FadeIn key={stat.title} delay={index * 0.15}>
                <div className="text-center p-4 md:p-8 bg-softGray rounded-xl md:rounded-2xl">
                  <div className="text-3xl md:text-5xl font-bold text-techBlue mb-2 md:mb-4">{stat.value}</div>
                  <h3 className="text-sm md:text-xl font-bold text-navy mb-1 md:mb-2">{stat.title}</h3>
                  <p className="hidden md:block text-charcoal/70">{stat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80"
            alt="Office"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-techBlue-dark/90" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Build Something Great Together
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Ready to work with a technology partner you can trust? Let's discuss your project 
                and explore how we can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg" className="bg-techBlue-light text-navy font-semibold hover:bg-techBlue hover:text-white shadow-lg">
                  Get in Touch
                  <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-2" />
                </Button>
                <Button href="/projects" size="lg" variant="outline" className="border-white/70 text-white hover:bg-white/10 backdrop-blur-sm">
                  View Our Work
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
