'use client';

import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLaptopCode, faHome, faGraduationCap, faCog, faPalette, faShieldAlt, faChartLine, 
  faQuoteLeft, faCheck, faRocket,
  faUsers, faHandshake, faAward, faLightbulb, faChevronRight, faStar
} from "@fortawesome/free-solid-svg-icons";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";
import CountUp from "@/components/animations/CountUp";
import HoverCard from "@/components/animations/HoverCard";
import { motion } from "framer-motion";

const services = [
  {
    title: "Software Development",
    description: "Custom software solutions built to solve real business problems with scalable, secure architecture.",
    icon: faLaptopCode,
    href: "/services/software-development",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Smart Homes",
    description: "Intelligent home automation systems that bring comfort, security, and efficiency to your living space.",
    icon: faHome,
    href: "/services/smart-homes",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    title: "IT Training",
    description: "Professional technology training programs designed to empower your team with practical skills.",
    icon: faGraduationCap,
    href: "/services/it-training",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Hardware Installation",
    description: "Expert hardware setup and installation services ensuring optimal performance and reliability.",
    icon: faCog,
    href: "/services/hardware-installation",
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "Graphics & Design",
    description: "Professional visual design services that communicate your brand with clarity and impact.",
    icon: faPalette,
    href: "/services/graphics-design",
    color: "from-pink-500 to-pink-600"
  },
  {
    title: "Networking & Security",
    description: "Enterprise-grade network infrastructure and cybersecurity solutions to protect your business.",
    icon: faShieldAlt,
    href: "/services/networking-security",
    color: "from-red-500 to-red-600"
  },
  {
    title: "Data Analytics",
    description: "Transform raw data into actionable insights that drive informed business decisions.",
    icon: faChartLine,
    href: "/services/data-analytics",
    color: "from-cyan-500 to-cyan-600"
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "We start by understanding your business, challenges, and goals through in-depth consultation."
  },
  {
    step: "02",
    title: "Strategy",
    description: "Our experts design a tailored technology roadmap aligned with your objectives."
  },
  {
    step: "03",
    title: "Implementation",
    description: "We build and deploy solutions using industry best practices and cutting-edge technology."
  },
  {
    step: "04",
    title: "Support",
    description: "Ongoing maintenance, optimization, and support to ensure lasting success."
  }
];

export default function Home() {
  return (
    <>
      {/* Hero Section with Video/Image Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
            alt="Technology background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/90 to-techBlue-dark/80" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-techBlue/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-techBlue/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container-custom relative z-10 pt-20">
          <div className="max-w-5xl mx-auto text-center text-white">
            <FadeIn delay={0.2}>
              <span className="inline-block px-4 py-2 bg-techBlue/20 border border-techBlue/30 rounded-full text-techBlue-light text-sm font-medium mb-6">
                Leading Technology Solutions Provider
              </span>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white/95 leading-tight">
                Technology That
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-techBlue to-techBlue-light">
                  Works for You
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Full-service technology solutions provider delivering excellence in software development, 
                networking, security, and digital transformation for businesses ready to grow.
              </p>
            </FadeIn>

            <FadeIn delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button href="mailto:sale@301atech.com" size="lg" className="group">
                  <span>Email Sales</span>
                  <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button href="/contact" size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-navy backdrop-blur-sm">
                  Contact Us
                </Button>
                <Button href="/services" variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-navy backdrop-blur-sm">
                  Explore Services
                </Button>
              </div>
            </FadeIn>

            {/* Quick Stats in Hero */}
            <FadeIn delay={1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-techBlue-light mb-1">
                    <CountUp end={10} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-techBlue-light mb-1">
                    <CountUp end={200} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-400">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-techBlue-light mb-1">
                    <CountUp end={150} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-400">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-techBlue-light mb-1">
                    <CountUp end={99} suffix="%" />
                  </div>
                  <div className="text-sm text-gray-400">Client Satisfaction</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section - Who We Are */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team collaboration"
                  width={600}
                  height={450}
                  className="rounded-2xl shadow-2xl"
                />
                {/* Floating Stats Card */}
                <motion.div 
                  className="absolute -bottom-8 -right-8 bg-white rounded-xl shadow-xl p-6 hidden md:block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-techBlue/10 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faAward} className="w-6 h-6 text-techBlue" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-navy">Award Winning</div>
                      <div className="text-gray-500">Technology Partner</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div>
                <span className="inline-block px-4 py-1 bg-techBlue/10 text-techBlue text-sm font-semibold rounded-full mb-4">
                  About Us
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy">
                  We're More Than Just a Tech Company
                </h2>
                <p className="text-lg text-charcoal/80 mb-6 leading-relaxed">
                  At <strong>301A TECH LTD</strong>, we believe technology should empower, not complicate. 
                  Founded with a mission to bridge the gap between complex technology and practical business solutions, 
                  we've grown into a trusted partner for businesses across industries.
                </p>
                <p className="text-lg text-charcoal/80 mb-8 leading-relaxed">
                  Our team of passionate engineers, designers, and strategists work together to deliver 
                  solutions that don't just work—they transform how you do business.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[
                    "Certified Technology Experts",
                    "24/7 Dedicated Support",
                    "Customized Solutions",
                    "Proven Track Record"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-techBlue rounded-full flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-charcoal font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <Button href="/about" variant="primary">
                  Learn More About Us
                  <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-softGray">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-techBlue/10 text-techBlue text-sm font-semibold rounded-full mb-4">
                Our Services
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy">
                Comprehensive Technology Solutions
              </h2>
              <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
                From software development to data analytics, we offer a full spectrum of technology 
                services designed to help modern businesses thrive.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8" staggerDelay={0.1}>
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <Link href={service.href}>
                  <HoverCard className="h-full bg-white rounded-xl md:rounded-2xl p-3 md:p-8 shadow-sm border border-gray-100">
                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-2 md:mb-6`}>
                      <FontAwesomeIcon icon={service.icon} className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3 className="text-xs md:text-2xl font-bold mb-2 md:mb-3 text-navy">{service.title}</h3>
                    <p className="hidden md:block text-charcoal/70 mb-4 leading-relaxed">{service.description}</p>
                    <span className="text-techBlue font-semibold inline-flex items-center group text-xs md:text-base">
                      <span className="hidden md:inline">Learn More</span>
                      <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 md:ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </HoverCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.4}>
            <div className="text-center mt-12">
              <Button href="/services" variant="outline" size="lg">
                View All Services
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        {/* Background Pattern */}
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
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                What Sets Us Apart
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We combine technical expertise with a client-first approach to deliver 
                solutions that truly make a difference.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8" staggerDelay={0.15}>
            {[
              { icon: faLightbulb, title: "Innovative Solutions", desc: "Cutting-edge technology tailored to your unique challenges." },
              { icon: faUsers, title: "Expert Team", desc: "Certified professionals with years of industry experience." },
              { icon: faHandshake, title: "Client Partnership", desc: "We work alongside you, not just for you." },
              { icon: faRocket, title: "Fast Delivery", desc: "Efficient processes that get you results quickly." }
            ].map((item, index) => (
              <StaggerItem key={index}>
                <div className="text-center p-3 md:p-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-techBlue/20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6">
                    <FontAwesomeIcon icon={item.icon} className="w-5 h-5 md:w-7 md:h-7 text-techBlue-light" />
                  </div>
                  <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-3">{item.title}</h3>
                  <p className="hidden md:block text-gray-400">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-techBlue/10 text-techBlue text-sm font-semibold rounded-full mb-4">
                Our Process
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy">
                How We Work
              </h2>
              <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
                A proven methodology that ensures successful project delivery every time.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <FadeIn key={index} delay={index * 0.15}>
                <div className="relative">
                  {/* Connector Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200" />
                  )}
                  <div className="relative bg-white">
                    <div className="w-16 h-16 bg-gradient-to-br from-techBlue to-techBlue-dark rounded-2xl flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl relative z-10">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-navy text-center">{step.title}</h3>
                    <p className="text-charcoal/70 text-center">{step.description}</p>
                  </div>
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
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80"
            alt="Team working"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-techBlue-dark/90" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Let's discuss how 301A TECH LTD can help you leverage technology to achieve 
                your business goals. Get in touch for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg" className="bg-techBlue-light text-navy font-semibold hover:bg-techBlue hover:text-white shadow-lg">
                  Get Started Today
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
