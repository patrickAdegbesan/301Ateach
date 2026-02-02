'use client';

import Button from "@/components/Button";
import Card from "@/components/Card";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLaptopCode, faHome, faGraduationCap, faCog, faPalette, faShieldAlt, faChartLine, 
  faBullseye, faTrophy, faHandshake, faCheck, faChevronRight, faHeadset, faRocket
} from "@fortawesome/free-solid-svg-icons";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";
import HoverCard from "@/components/animations/HoverCard";
import { motion } from "framer-motion";

const services = [
  {
    title: "Software Development",
    description: "Custom software solutions built to solve real business problems with scalable, secure architecture.",
    icon: faLaptopCode,
    href: "/services/software-development",
    features: ["Custom Applications", "API Development", "System Integration", "Legacy Modernization"],
    color: "from-blue-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80"
  },
  {
    title: "Smart Homes",
    description: "Intelligent home automation systems that bring comfort, security, and efficiency to your living space.",
    icon: faHome,
    href: "/services/smart-homes",
    features: ["Home Automation", "Security Systems", "Energy Management", "Voice Control"],
    color: "from-emerald-500 to-emerald-600",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
  },
  {
    title: "IT Training",
    description: "Professional technology training programs designed to empower your team with practical skills.",
    icon: faGraduationCap,
    href: "/services/it-training",
    features: ["Corporate Training", "Certification Prep", "Skills Development", "Workshops"],
    color: "from-purple-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80"
  },
  {
    title: "Hardware Installation",
    description: "Expert hardware setup and installation services ensuring optimal performance and reliability.",
    icon: faCog,
    href: "/services/hardware-installation",
    features: ["Server Setup", "Network Equipment", "Workstation Config", "Maintenance"],
    color: "from-orange-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80"
  },
  {
    title: "Graphics & Design",
    description: "Professional visual design services that communicate your brand with clarity and impact.",
    icon: faPalette,
    href: "/services/graphics-design",
    features: ["Brand Identity", "UI/UX Design", "Marketing Materials", "Digital Assets"],
    color: "from-pink-500 to-pink-600",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80"
  },
  {
    title: "Networking & Security",
    description: "Enterprise-grade network infrastructure and cybersecurity solutions to protect your business.",
    icon: faShieldAlt,
    href: "/services/networking-security",
    features: ["Network Design", "Security Audits", "Firewall Config", "Threat Protection"],
    color: "from-red-500 to-red-600",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80"
  },
  {
    title: "Data Analytics",
    description: "Transform raw data into actionable insights that drive informed business decisions.",
    icon: faChartLine,
    href: "/services/data-analytics",
    features: ["Business Intelligence", "Data Visualization", "Predictive Analytics", "Reporting"],
    color: "from-cyan-500 to-cyan-600",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
  },
];

const benefits = [
  {
    icon: faBullseye,
    title: "Problem-Focused Approach",
    description: "We start by understanding your challenges, then deliver solutions that create measurable value."
  },
  {
    icon: faTrophy,
    title: "Proven Expertise",
    description: "Years of experience across multiple industries and technologies, delivering consistent results."
  },
  {
    icon: faHandshake,
    title: "Long-Term Partnership",
    description: "We build relationships, not just projects. Your success is our success."
  },
  {
    icon: faHeadset,
    title: "24/7 Support",
    description: "Round-the-clock support to ensure your systems run smoothly without interruption."
  }
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80"
            alt="Technology solutions"
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
                Our Services
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                Technology Solutions
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-techBlue to-techBlue-light">
                  That Deliver Results
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Comprehensive technology services designed to solve real business problems 
                and drive measurable outcomes.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-techBlue/10 text-techBlue text-sm font-semibold rounded-full mb-4">
                What We Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy">
                Full-Service Technology Solutions
              </h2>
              <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
                From custom software to cybersecurity, we provide end-to-end technology services 
                tailored to your unique business needs.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8" staggerDelay={0.1}>
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <Link href={service.href}>
                  <motion.div 
                    className="h-full bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-gray-100 group"
                    whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image Header */}
                    <div className="relative h-24 md:h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                      <div className={`absolute bottom-2 left-2 md:bottom-4 md:left-4 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                        <FontAwesomeIcon icon={service.icon} className="w-3 h-3 md:w-5 md:h-5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 md:p-6">
                      <h2 className="text-xs md:text-xl font-bold mb-2 md:mb-3 text-navy group-hover:text-techBlue transition-colors">
                        {service.title}
                      </h2>
                      <p className="hidden md:block text-charcoal/70 mb-4 text-sm leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="mb-4 hidden md:block">
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-center text-xs text-charcoal/60">
                              <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-techBlue mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <span className="text-techBlue font-semibold inline-flex items-center text-xs md:text-sm group">
                        <span className="hidden md:inline">Learn More</span>
                        <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 md:ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-softGray">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                  alt="Team working"
                  width={600}
                  height={450}
                  className="rounded-2xl shadow-2xl"
                />
                <motion.div 
                  className="absolute -bottom-6 -right-6 bg-techBlue text-white p-6 rounded-xl shadow-xl hidden md:block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faRocket} className="w-8 h-8" />
                    <div>
                      <div className="text-2xl font-bold">200+</div>
                      <div className="text-techBlue-light text-sm">Projects Delivered</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div>
                <span className="inline-block px-4 py-1 bg-techBlue/10 text-techBlue text-sm font-semibold rounded-full mb-4">
                  Why Choose Us
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy">
                  Technology Partners You Can Trust
                </h2>
                <p className="text-lg text-charcoal/80 mb-8 leading-relaxed">
                  We combine deep technical expertise with a genuine commitment to your success. 
                  When you work with us, you get more than a vendor—you get a dedicated partner invested in your growth.
                </p>

                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <motion.div 
                      key={index}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-techBlue/10 rounded-xl flex items-center justify-center">
                        <FontAwesomeIcon icon={benefit.icon} className="w-5 h-5 text-techBlue" />
                      </div>
                      <div>
                        <h3 className="font-bold text-navy mb-1">{benefit.title}</h3>
                        <p className="text-charcoal/70 text-sm">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Process Overview */}
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
                Our Process
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                How We Deliver Excellence
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A proven methodology that ensures successful outcomes on every project.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { num: "01", title: "Consult", desc: "We listen to understand your unique challenges and goals." },
              { num: "02", title: "Plan", desc: "We design a tailored strategy and technology roadmap." },
              { num: "03", title: "Build", desc: "We implement solutions using best practices and agile methods." },
              { num: "04", title: "Support", desc: "We provide ongoing maintenance and optimization." }
            ].map((step, index) => (
              <FadeIn key={index} delay={index * 0.15}>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-techBlue/20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 text-lg md:text-2xl font-bold text-techBlue-light">
                    {step.num}
                  </div>
                  <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">{step.title}</h3>
                  <p className="hidden md:block text-gray-400">{step.desc}</p>
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
            src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1920&q=80"
            alt="Get started"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-techBlue-dark/90" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Let's discuss how our services can help you achieve your business goals. 
                Get in touch for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg" className="bg-techBlue-light text-navy font-semibold hover:bg-techBlue hover:text-white shadow-lg">
                  Contact Us Today
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
