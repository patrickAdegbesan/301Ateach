'use client';

import { Job } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  cv: FileList;
  additionalInfo?: string;
  wantBoost?: boolean;
  boostTier?: 'basic' | 'standard' | 'premium';
  agreedToPrivacy: boolean;
}

export default function JobDetailClient({ job }: { job: Job }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedBoostTier, setSelectedBoostTier] = useState<'basic' | 'standard' | 'premium'>('standard');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ApplicationFormData>();

  const wantBoost = watch("wantBoost");

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("jobId", job.id);
      formData.append("jobTitle", job.title);
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("location", data.location);
      if (data.linkedinUrl) formData.append("linkedinUrl", data.linkedinUrl);
      if (data.portfolioUrl) formData.append("portfolioUrl", data.portfolioUrl);
      if (data.additionalInfo) formData.append("additionalInfo", data.additionalInfo);
      formData.append("wantBoost", "false"); // Boost will be applied after payment
      formData.append("agreedToPrivacy", data.agreedToPrivacy.toString());

      if (data.cv && data.cv.length > 0) {
        formData.append("cv", data.cv[0]);
      }

      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        console.error("Application submission failed", json);
        setErrorMessage(json.error || "Failed to submit application. Please try again.");
        setSubmitStatus("error");
      } else {
        // Application submitted successfully
        const applicationId = json.applicationId;
        
        // If user wants to boost, redirect to Stripe checkout
        if (data.wantBoost && applicationId) {
          try {
            const checkoutRes = await fetch("/api/create-boost-checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                applicationId,
                email: data.email,
                fullName: data.fullName,
                jobTitle: job.title,
                boostTier: selectedBoostTier,
              }),
            });

            const checkoutJson = await checkoutRes.json();

            if (checkoutJson.ok && checkoutJson.url) {
              // Redirect to Stripe Checkout
              window.location.href = checkoutJson.url;
              return; // Don't show success message yet
            } else {
              // Payment setup failed, but application is submitted
              setErrorMessage("Application submitted but boost payment failed. Your application is still active!");
              setSubmitStatus("success");
            }
          } catch (error) {
            console.error("Boost checkout error:", error);
            setErrorMessage("Application submitted successfully, but boost setup failed.");
            setSubmitStatus("success");
          }
        } else {
          // No boost requested, show success message
          setSubmitStatus("success");
          reset();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } catch (error) {
      console.error("Application submission error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Back Button */}
        <Link 
          href="/careers/jobs"
          className="inline-flex items-center text-navy hover:underline mb-6"
        >
          ← Back to all jobs
        </Link>

        {/* Success Message */}
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8"
          >
            <h3 className="text-xl font-bold text-green-800 mb-2">Application Submitted!</h3>
            <p className="text-green-700">
              Thank you for applying for the {job.title} position. We've received your application and will review it shortly. 
              You should receive a confirmation email at the address you provided.
            </p>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {/* Job Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
                <div className="flex flex-wrap gap-3 text-sm mb-4">
                  <span className="flex items-center px-3 py-1 bg-navy text-white rounded-full">
                    {job.workType}
                  </span>
                  <span className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                    {job.employmentType}
                  </span>
                  <span className="flex items-center">
                    📍 {job.location}
                  </span>
                  <span className="flex items-center">
                    💼 {job.department}
                  </span>
                </div>
                {job.salaryRange && (
                  <p className="text-2xl font-bold text-navy">{job.salaryRange}</p>
                )}
              </div>

              {/* Overview */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{job.summary}</p>
              </section>

              {/* Responsibilities */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-navy mr-3 mt-1">✓</span>
                      <span className="text-gray-700">{resp}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Requirements */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                
                <h3 className="text-lg font-semibold mb-3 text-navy">Must Have</h3>
                <ul className="space-y-3 mb-6">
                  {job.mustHave.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-3 mt-1">●</span>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold mb-3 text-navy">Nice to Have</h3>
                <ul className="space-y-3">
                  {job.niceToHave.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">○</span>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Benefits */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Benefits & Perks</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gold mr-3 mt-1">★</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* About Company */}
              <section className="mb-8 bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">About 301A TECH LTD</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  301A TECH LTD is a leading technology solutions provider specializing in software development, 
                  smart homes, IT training, networking, security, and data analytics. We pride ourselves on 
                  delivering innovative solutions that drive business success.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our team of passionate professionals works on cutting-edge projects, continuously learning 
                  and growing together. We value collaboration, innovation, and excellence in everything we do.
                </p>
              </section>
            </div>
          </div>

          {/* Sidebar - Apply Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Apply for this Position</h2>

              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-700 text-sm">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="label">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    {...register("fullName", { required: "Full name is required" })}
                    className="input-field"
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="error-message">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="label">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="input-field"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="label">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone", { required: "Phone number is required" })}
                    className="input-field"
                    placeholder="+44 20 1234 5678"
                  />
                  {errors.phone && (
                    <p className="error-message">{errors.phone.message}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="label">
                    Current Location *
                  </label>
                  <input
                    id="location"
                    type="text"
                    {...register("location", { required: "Location is required" })}
                    className="input-field"
                    placeholder="London, UK"
                  />
                  {errors.location && (
                    <p className="error-message">{errors.location.message}</p>
                  )}
                </div>

                {/* LinkedIn */}
                <div>
                  <label htmlFor="linkedinUrl" className="label">
                    LinkedIn Profile
                  </label>
                  <input
                    id="linkedinUrl"
                    type="url"
                    {...register("linkedinUrl")}
                    className="input-field"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                {/* Portfolio */}
                <div>
                  <label htmlFor="portfolioUrl" className="label">
                    Portfolio / Website
                  </label>
                  <input
                    id="portfolioUrl"
                    type="url"
                    {...register("portfolioUrl")}
                    className="input-field"
                    placeholder="https://yourportfolio.com"
                  />
                </div>

                {/* CV Upload */}
                <div>
                  <label htmlFor="cv" className="label">
                    Upload CV/Resume * (PDF or DOCX, max 10MB)
                  </label>
                  <input
                    id="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    {...register("cv", {
                      required: "CV is required",
                      validate: {
                        fileSize: (files) => {
                          if (!files || files.length === 0) return true;
                          return files[0].size <= 10 * 1024 * 1024 || "File size must be less than 10MB";
                        },
                        fileType: (files) => {
                          if (!files || files.length === 0) return true;
                          const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
                          return allowedTypes.includes(files[0].type) || "Only PDF and DOCX files are allowed";
                        },
                      },
                    })}
                    className="w-full text-sm"
                  />
                  {errors.cv && (
                    <p className="error-message">{errors.cv.message}</p>
                  )}
                </div>

                {/* Additional Info */}
                <div>
                  <label htmlFor="additionalInfo" className="label">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    {...register("additionalInfo")}
                    className="input-field"
                    rows={4}
                    placeholder="Tell us why you'd be a great fit..."
                  />
                </div>

                {/* Boost Application Option */}
                <div className="bg-gradient-to-r from-techBlue/10 to-blue-50 border-2 border-techBlue/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <input
                      id="wantBoost"
                      type="checkbox"
                      {...register("wantBoost")}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor="wantBoost" className="font-semibold text-navy flex items-center gap-2">
                        <svg className="w-5 h-5 text-techBlue" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Boost My Application
                      </label>
                      <p className="text-sm text-charcoal mt-1">
                        Get your application seen first! Boosted applications appear at the top of the hiring manager's list, increasing your chances of getting noticed.
                      </p>
                    </div>
                  </div>

                  {/* Pricing Tiers - Only show if boost is checked */}
                  {wantBoost && (
                    <div className="ml-7 space-y-2 mb-3">
                      <p className="text-xs font-semibold text-navy mb-2">Choose your boost duration:</p>
                      
                      {/* Basic Tier */}
                      <label className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 cursor-pointer hover:border-techBlue transition-colors" style={{ borderColor: selectedBoostTier === 'basic' ? '#1E90FF' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="boostTier"
                          value="basic"
                          checked={selectedBoostTier === 'basic'}
                          onChange={(e) => setSelectedBoostTier('basic')}
                          className="w-4 h-4 text-techBlue"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-navy">Basic - 3 Days</span>
                            <span className="text-techBlue font-bold">₦1,500</span>
                          </div>
                          <p className="text-xs text-gray-600">Quick boost for urgent applications</p>
                        </div>
                      </label>

                      {/* Standard Tier */}
                      <label className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 cursor-pointer hover:border-techBlue transition-colors" style={{ borderColor: selectedBoostTier === 'standard' ? '#1E90FF' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="boostTier"
                          value="standard"
                          checked={selectedBoostTier === 'standard'}
                          onChange={(e) => setSelectedBoostTier('standard')}
                          className="w-4 h-4 text-techBlue"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-navy">Standard - 7 Days</span>
                            <span className="text-techBlue font-bold">₦3,000</span>
                          </div>
                          <p className="text-xs text-gray-600">Most popular • Best value per day</p>
                        </div>
                        <span className="bg-techBlue text-white text-xs px-2 py-1 rounded">Popular</span>
                      </label>

                      {/* Premium Tier */}
                      <label className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 cursor-pointer hover:border-techBlue transition-colors" style={{ borderColor: selectedBoostTier === 'premium' ? '#1E90FF' : '#e5e7eb' }}>
                        <input
                          type="radio"
                          name="boostTier"
                          value="premium"
                          checked={selectedBoostTier === 'premium'}
                          onChange={(e) => setSelectedBoostTier('premium')}
                          className="w-4 h-4 text-techBlue"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-navy">Premium - 14 Days</span>
                            <span className="text-techBlue font-bold">₦4,500</span>
                          </div>
                          <p className="text-xs text-gray-600">Maximum visibility for 2 weeks</p>
                        </div>
                      </label>
                    </div>
                  )}

                  <div className="ml-7">
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="bg-white px-2 py-1 rounded text-techBlue font-medium">✓ Priority placement</span>
                      <span className="bg-white px-2 py-1 rounded text-techBlue font-medium">✓ Stand out</span>
                      <span className="bg-white px-2 py-1 rounded text-techBlue font-medium">✓ Secure payment</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Secure payment powered by Stripe. You'll be redirected to complete payment after submitting. You can still apply for free without boosting.
                    </p>
                  </div>
                </div>

                {/* Privacy Consent */}
                <div className="flex items-start">
                  <input
                    id="agreedToPrivacy"
                    type="checkbox"
                    {...register("agreedToPrivacy", {
                      required: "You must agree to the privacy policy",
                    })}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="agreedToPrivacy" className="text-sm text-gray-700">
                    I agree to the{" "}
                    <Link href="/careers/privacy" className="text-navy hover:underline" target="_blank">
                      recruitment privacy policy
                    </Link>{" "}
                    and consent to my data being stored for recruitment purposes.
                  </label>
                </div>
                {errors.agreedToPrivacy && (
                  <p className="error-message">{errors.agreedToPrivacy.message}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By applying, you'll receive a confirmation email at the address provided above.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
