'use client';

import Button from "@/components/Button";
import Card from "@/components/Card";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLaptopCode, faBuilding, faGraduationCap, faCog, faPalette, faShieldAlt, faChartLine,
  faChevronRight, faStar, faQuoteLeft, faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";
import CountUp from "@/components/animations/CountUp";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Enterprise Software Platform",
    category: "Software Development",
    description: "Built a custom ERP system that streamlined operations and reduced processing time by 60% for a mid-sized manufacturing company.",
    highlights: ["Custom ERP", "60% Efficiency Gain", "Cloud Migration", "API Integration"],
    icon: faLaptopCode,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Smart Office Transformation",
    category: "Smart Homes",
    description: "Implemented intelligent automation for a corporate office, reducing energy costs by 40% while improving employee comfort.",
    highlights: ["Energy Savings", "Automated HVAC", "Smart Lighting", "Security Integration"],
    icon: faBuilding,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    title: "Cybersecurity Training Program",
    category: "IT Training",
    description: "Developed and delivered comprehensive security training for 200+ employees, significantly reducing phishing susceptibility.",
    highlights: ["200+ Trained", "Security Awareness", "Certification Prep", "Ongoing Support"],
    icon: faGraduationCap,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Data Center Infrastructure",
    category: "Hardware Installation",
    description: "Designed and deployed complete data center infrastructure with 99.9% uptime SLA for financial services client.",
    highlights: ["99.9% Uptime", "Redundant Systems", "24/7 Monitoring", "Disaster Recovery"],
    icon: faCog,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "Brand Identity Redesign",
    category: "Graphics & Design",
    description: "Complete brand overhaul for tech startup, resulting in 3x increase in brand recognition and customer engagement.",
    highlights: ["3x Recognition", "Visual System", "Marketing Materials", "Digital Assets"],
    icon: faPalette,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    color: "from-pink-500 to-pink-600"
  },
  {
    title: "Enterprise Network Overhaul",
    category: "Networking & Security",
    description: "Redesigned network architecture for 500+ user organization, improving security posture and performance.",
    highlights: ["Zero-Trust Security", "500+ Users", "Performance Boost", "Threat Detection"],
    icon: faShieldAlt,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
    color: "from-red-500 to-red-600"
  },
  {
    title: "Business Intelligence Dashboard",
    category: "Data Analytics",
    description: "Created real-time analytics platform that consolidates data from 15+ sources, enabling data-driven decision making.",
    highlights: ["Real-Time Data", "15+ Sources", "Custom Dashboards", "Predictive Analytics"],
    icon: faChartLine,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    color: "from-cyan-500 to-cyan-600"
  },
  {
    title: "Healthcare Portal Development",
    category: "Software Development",
    description: "Built HIPAA-compliant patient portal with telemedicine capabilities, serving 10,000+ patients.",
    highlights: ["HIPAA Compliant", "10K+ Patients", "Telemedicine", "Secure Messaging"],
    icon: faLaptopCode,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    color: "from-blue-500 to-blue-600"
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80"
            alt="Our projects"
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
                Our Portfolio
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                Real Solutions for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-techBlue to-techBlue-light">
                  Real Businesses
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Explore how we've helped organizations across industries achieve their technology goals 
                and drive measurable results.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 200, suffix: "+", label: "Projects Completed" },
              { value: 15, suffix: "+", label: "Industries Served" },
              { value: 98, suffix: "%", label: "Client Satisfaction" },
              { value: 10, suffix: "+", label: "Years of Excellence" },
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

      {/* Featured Project Showcase */}
      <section className="py-24 bg-softGray">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-techBlue/10 text-techBlue text-sm font-semibold rounded-full mb-4">
                Case Studies
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy">
                Featured Projects
              </h2>
              <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
                Each project represents our commitment to delivering solutions that solve real problems 
                and create measurable value.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8" staggerDelay={0.1}>
            {projects.map((project, index) => (
              <StaggerItem key={project.title}>
                <motion.div 
                  className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm group h-full"
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <div className="relative h-32 md:h-56 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                    <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 flex items-end justify-between">
                      <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                        <FontAwesomeIcon icon={project.icon} className="w-3 h-3 md:w-5 md:h-5 text-white" />
                      </div>
                      <span className="hidden md:inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-6">
                    <h3 className="text-sm md:text-xl font-bold text-navy mb-2 md:mb-3 group-hover:text-techBlue transition-colors">
                      {project.title}
                    </h3>
                    <p className="hidden md:block text-charcoal/70 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="hidden md:block pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        {project.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="px-3 py-1 bg-softGray text-charcoal/70 text-xs font-medium rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
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
                Industries We Serve
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We bring expertise across diverse sectors, understanding the unique challenges and requirements of each industry.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              "Healthcare", "Finance", "Manufacturing", "Retail",
              "Education", "Technology", "Real Estate", "Logistics"
            ].map((industry, index) => (
              <FadeIn key={industry} delay={index * 0.05}>
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-techBlue/30 transition-colors cursor-default"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-semibold">{industry}</span>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
            alt="Start your project"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-techBlue-dark/90" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Let's discuss how we can help you achieve similar results for your business. 
                Get in touch for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg" className="bg-techBlue-light text-navy font-semibold hover:bg-techBlue hover:text-white shadow-lg">
                  Get Started Today
                  <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-2" />
                </Button>
                <Button href="/services" size="lg" variant="outline" className="border-white/70 text-white hover:bg-white/10 backdrop-blur-sm">
                  Explore Our Services
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
