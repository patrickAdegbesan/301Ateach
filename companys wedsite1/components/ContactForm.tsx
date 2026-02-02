"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import Card from "@/components/Card";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        console.error('Send failed', json);
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-techBlue focus:border-transparent transition-all"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-techBlue focus:border-transparent transition-all"
            placeholder="john@company.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-techBlue focus:border-transparent transition-all"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-navy mb-2">
            Company/Organization
          </label>
          <input
            id="company"
            type="text"
            {...register("company")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-techBlue focus:border-transparent transition-all"
            placeholder="Your Company Name"
          />
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-navy mb-2">
            Service Interested In *
          </label>
          <select
            id="service"
            {...register("service", { required: "Please select a service" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-techBlue focus:border-transparent transition-all"
          >
            <option value="">Select a service...</option>
            <option value="software-development">Software Development</option>
            <option value="smart-homes">Smart Homes</option>
            <option value="it-training">IT Training</option>
            <option value="hardware-installation">Hardware Installation</option>
            <option value="graphics-design">Graphics & Design</option>
            <option value="networking-security">Networking & Security</option>
            <option value="data-analytics">Data Analytics</option>
            <option value="other">Other</option>
          </select>
          {errors.service && (
            <p className="text-red-600 text-sm mt-1">{errors.service.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">
            Message *
          </label>
          <textarea
            id="message"
            {...register("message", {
              required: "Message is required",
              minLength: { value: 10, message: "Message must be at least 10 characters" },
            })}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-techBlue focus:border-transparent transition-all resize-none"
            placeholder="Tell us about your project or inquiry..."
          />
          {errors.message && (
            <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">Thank you for your inquiry!</p>
            <p className="text-sm">We'll respond within 24 hours.</p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-semibold">Something went wrong.</p>
            <p className="text-sm">Please try again or contact us directly.</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          onClick={undefined}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>

        <p className="text-sm text-charcoal/60 text-center">
          * Required fields. We respect your privacy and will never share your information.
        </p>
      </form>
    </Card>
  );
}
