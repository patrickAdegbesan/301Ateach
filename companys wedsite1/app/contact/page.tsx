'use client';

import ContactForm from "@/components/ContactForm";
import Card from "@/components/Card";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelopeOpenText, faClock, faComments, faEnvelope, faPhone, faBuilding,
  faMapMarkerAlt, faChevronRight, faHeadset
} from "@fortawesome/free-solid-svg-icons";
import FadeIn from "@/components/animations/FadeIn";
import StaggerContainer, { StaggerItem } from "@/components/animations/StaggerContainer";
import { motion } from "framer-motion";

const contactMethods = [
  {
    icon: faEnvelope,
    title: "General Inquiries",
    content: "info@301atech.com",
    link: "mailto:info@301atech.com",
    description: "General questions & information"
  },
  {
    icon: faEnvelope,
    title: "Sales & Projects",
    content: "sale@301atech.com",
    link: "mailto:sale@301atech.com",
    description: "New projects & partnerships"
  },
  {
    icon: faEnvelope,
    title: "Support & Help",
    content: "support@301atech.com",
    link: "mailto:support@301atech.com",
    description: "Technical support & assistance"
  },
  {
    icon: faPhone,
    title: "Call Us",
    content: "+234 905 444 8465",
    link: "tel:+2349054448465",
    description: "Mon-Fri, 9am-6pm"
  }
];

const processSteps = [
  {
    icon: faEnvelopeOpenText,
    title: "We Review Your Inquiry",
    description: "Our team carefully reviews your message, requirements, and project scope."
  },
  {
    icon: faClock,
    title: "Quick Response",
    description: "We respond within 24 hours with next steps, questions, or a proposal."
  },
  {
    icon: faComments,
    title: "Let's Talk",
    description: "We schedule a consultation to discuss your project in detail and plan the way forward."
  }
];

const faqs = [
  {
    question: "How quickly can you start on my project?",
    answer: "Depending on our current workload, we can typically begin new projects within 1-2 weeks of signing the agreement."
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes, we offer comprehensive maintenance and support packages tailored to your needs."
  },
  {
    question: "What industries do you serve?",
    answer: "We work with clients across various industries including finance, healthcare, retail, and technology."
  }
];

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
            alt="Contact us"
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
                Get In Touch
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                Let's Start a
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-techBlue to-techBlue-light">
                  Conversation
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Ready to transform your technology? Share your project details and we'll respond within 24 hours.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 md:py-16 bg-white border-b border-gray-100">
        <div className="container-custom">
          <StaggerContainer className="grid md:grid-cols-3 gap-4 md:gap-8" staggerDelay={0.1}>
            {contactMethods.map((method, index) => (
              <StaggerItem key={index}>
                <motion.a
                  href={method.link}
                  className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-softGray rounded-2xl group hover:bg-techBlue transition-colors duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-techBlue/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                    <FontAwesomeIcon icon={method.icon} className="w-5 h-5 md:w-6 md:h-6 text-techBlue group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-navy group-hover:text-white transition-colors">{method.title}</h3>
                    <p className="text-sm md:text-base text-techBlue group-hover:text-white/90 font-medium transition-colors">{method.content}</p>
                    <p className="text-xs md:text-sm text-charcoal/60 group-hover:text-white/70 transition-colors">{method.description}</p>
                  </div>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-softGray">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <FadeIn direction="left" className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
                <div className="mb-8">
                  <span className="inline-block px-4 py-1 bg-techBlue/10 text-techBlue text-sm font-semibold rounded-full mb-4">
                    Send a Message
                  </span>
                  <h2 className="text-3xl font-bold text-navy mb-2">Tell Us About Your Project</h2>
                  <p className="text-charcoal/70">Fill out the form below and we'll get back to you as soon as possible.</p>
                </div>
                <ContactForm />
              </div>
            </FadeIn>

            {/* Sidebar Info */}
            <FadeIn direction="right" className="lg:col-span-2">
              <div className="space-y-6">
                {/* Why Contact Us */}
                <div className="bg-navy text-white rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-techBlue/20 rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faHeadset} className="w-5 h-5 text-techBlue-light" />
                    </div>
                    <h3 className="text-xl font-bold">Why Contact Us?</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Free initial consultation",
                      "No-obligation project assessment",
                      "Expert advice on technology solutions",
                      "Transparent pricing and timelines"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-techBlue rounded-full flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2 text-white" />
                        </div>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Office Hours */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-navy mb-4">Office Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-charcoal/70">Monday - Friday</span>
                      <span className="font-semibold text-navy">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/70">Saturday</span>
                      <span className="font-semibold text-navy">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/70">Sunday</span>
                      <span className="font-semibold text-charcoal/50">Closed</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm text-charcoal/60">
                      <strong className="text-navy">Emergency Support:</strong> Available 24/7 for existing clients on support contracts.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-techBlue/10 text-techBlue text-sm font-semibold rounded-full mb-4">
                Our Process
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy">
                What Happens Next?
              </h2>
              <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
                After you reach out, here's what you can expect from our team.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto" staggerDelay={0.15}>
            {processSteps.map((step, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="text-center p-4 md:p-8 bg-softGray rounded-xl md:rounded-2xl"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-techBlue/10 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 relative">
                    <FontAwesomeIcon icon={step.icon} className="w-5 h-5 md:w-8 md:h-8 text-techBlue" />
                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-techBlue rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-sm md:text-xl font-bold text-navy mb-2 md:mb-3">{step.title}</h3>
                  <p className="hidden md:block text-charcoal/70">{step.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-softGray">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-techBlue/10 text-techBlue text-sm font-semibold rounded-full mb-4">
                FAQ
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy">
                Common Questions
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-navy mb-2">{faq.question}</h3>
                  <p className="text-charcoal/70">{faq.answer}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Alternative Contact CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Office space"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-techBlue-dark/90" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Prefer to Talk Directly?
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Give us a call or send an email—we're always happy to discuss your project and explore how we can help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:+2349054448465"
                  className="inline-flex items-center justify-center gap-2 bg-techBlue-light text-navy font-semibold hover:bg-techBlue hover:text-white shadow-lg px-8 py-4 rounded-xl transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FontAwesomeIcon icon={faPhone} className="w-5 h-5" /> 
                  Call Us Now
                </motion.a>
                <motion.a
                  href="mailto:sale@301atech.com"
                  className="inline-flex items-center justify-center gap-2 bg-techBlue-light text-navy font-semibold hover:bg-techBlue hover:text-white shadow-lg px-8 py-4 rounded-xl transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" /> 
                  Email Sales
                </motion.a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
