'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Job } from "@/types";
import { Rocket, BookOpen, TrendingUp, Scale, Users, Monitor, Building2 } from "lucide-react";

const hiringProcess = [
  {
    step: "01",
    title: "Apply",
    description: "Submit your application with your CV and details"
  },
  {
    step: "02",
    title: "Review",
    description: "Our team reviews your application (typically 3-5 business days)"
  },
  {
    step: "03",
    title: "Interview",
    description: "Meet the team through video or in-person interviews"
  },
  {
    step: "04",
    title: "Offer",
    description: "Receive your offer and join the 301A TECH family"
  }
];

const whyWorkHere = [
  {
    title: "Growth & Learning",
    description: "Continuous learning opportunities with training budgets and certifications",
    icon: BookOpen
  },
  {
    title: "Cutting-Edge Projects",
    description: "Work on innovative solutions using the latest technologies",
    icon: Rocket
  },
  {
    title: "Work-Life Balance",
    description: "Flexible working arrangements and generous time off",
    icon: Scale
  },
  {
    title: "Collaborative Culture",
    description: "Supportive team environment where everyone's voice matters",
    icon: Users
  },
  {
    title: "Career Progression",
    description: "Clear paths for advancement and skill development",
    icon: TrendingUp
  },
  {
    title: "Modern Tools",
    description: "Access to the best tools and technologies in the industry",
    icon: Monitor
  }
];

export default function CareersHome() {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/jobs?featured=true');
        const data = await response.json();
        
        if (data.ok) {
          setFeaturedJobs(data.jobs.slice(0, 6)); // Show max 6 featured
        }
      } catch (error) {
        console.error('Failed to load jobs:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy via-navy to-blue-900 text-white py-24 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-6"
            >
              <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 inline-flex">
                <Rocket className="w-4 h-4" /> Join Our Growing Team
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Build Your Career at <span className="text-techBlue">301A TECH</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed">
              Join a team of passionate professionals creating innovative technology solutions that make a difference
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/careers/jobs" 
                className="bg-techBlue hover:bg-techBlue-dark text-white inline-flex items-center justify-center gap-2 text-center text-lg px-8 py-4 rounded-lg transition-all transform hover:scale-105 font-semibold"
              >
                <Rocket className="w-5 h-5" /> Explore Open Positions
              </Link>
              <a 
                href="https://301atech.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white inline-flex items-center justify-center gap-2 text-center text-lg px-8 py-4 rounded-lg backdrop-blur-sm transition-all font-semibold"
              >
                <Building2 className="w-5 h-5" /> Learn About Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-center mb-4 text-navy">Why 301A TECH?</h2>
            <p className="text-xl text-charcoal text-center mb-12 max-w-2xl mx-auto">
              We believe in empowering our people to do their best work
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {whyWorkHere.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl md:rounded-2xl p-3 md:p-8 shadow-sm border border-gray-100 hover:border-techBlue transition-all hover:shadow-md"
                  >
                    <div className="text-center">
                      <div className="flex justify-center mb-2 md:mb-4">
                        <div className="w-10 h-10 md:w-14 md:h-14 p-2 md:p-3 bg-techBlue/10 rounded-lg md:rounded-xl flex items-center justify-center">
                          <IconComponent className="w-5 h-5 md:w-8 md:h-8 text-techBlue" />
                        </div>
                      </div>
                      <h3 className="text-xs md:text-xl font-bold mb-1 md:mb-2 text-navy">{item.title}</h3>
                      <p className="hidden md:block text-charcoal/70 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Jobs */}
      {featuredJobs.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-center mb-4 text-navy">Featured Opportunities</h2>
              <p className="text-xl text-charcoal text-center mb-12">
                Check out our current open positions
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/careers/jobs/${job.slug}`} className="card block hover:border-techBlue hover:shadow-lg group h-full transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-xs font-semibold px-3 py-1 bg-techBlue text-white rounded-full">
                          {job.workType}
                        </span>
                        <span className="text-xs text-charcoal">{job.employmentType}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-techBlue transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-charcoal text-sm mb-4">{job.location}</p>
                      <p className="text-charcoal text-sm line-clamp-3">{job.summary}</p>
                      {job.salaryRange && (
                        <p className="text-techBlue font-semibold mt-4">{job.salaryRange}</p>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Link href="/careers/jobs" className="bg-techBlue hover:bg-techBlue-dark text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2 font-semibold">
                  View All Open Positions
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team
          </p>
          <Link href="/careers/jobs" className="bg-techBlue hover:bg-techBlue-dark text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2 font-semibold">
            Explore Opportunities
          </Link>
        </div>
      </section>
    </div>
  );
}
