import Button from "@/components/Button";
import Card from "@/components/Card";
import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Software Development Services",
  description: "Custom software solutions built to solve real business problems with scalable, secure architecture.",
};

const benefits = [
  "Scalable architecture that grows with your business",
  "Security built into every layer",
  "Modern, maintainable codebase",
  "Comprehensive testing and quality assurance",
  "Ongoing support and maintenance",
  "Clear documentation and training",
];

const technologies = [
  "Web Applications",
  "Mobile Apps",
  "Cloud Solutions",
  "API Development",
  "System Integration",
  "Database Design",
];

export default function SoftwareDevelopmentPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-techBlue-dark text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-techBlue">
              <FontAwesomeIcon icon={faLaptopCode} className="w-6 h-6" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Software Development
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Custom software solutions built to solve real business problems with scalable, secure architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-navy">The Challenge</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed mb-4">
                Off-the-shelf software often fails to address unique business requirements, forcing companies to adapt their processes to fit generic tools. This leads to inefficiency, workarounds, and missed opportunities.
              </p>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                Many businesses struggle with legacy systems that can't scale, security vulnerabilities, or software that simply doesn't deliver on its promises.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 text-navy">Our Solution</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed mb-4">
                We build custom software that fits your business—not the other way around. Our solutions are designed from the ground up to address your specific challenges, integrate with your existing systems, and scale as you grow.
              </p>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                Every line of code is written with security, performance, and maintainability in mind, ensuring your investment delivers value for years to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-softGray">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What We Build</h2>
            <p className="text-xl text-charcoal/80 max-w-3xl mx-auto">
              From web applications to enterprise systems, we deliver solutions across the full technology spectrum.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {technologies.map((tech) => (
              <Card key={tech}>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-techBlue rounded-full"></div>
                  <h3 className="text-lg font-semibold">{tech}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Key Benefits</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-techBlue rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                  ✓
                </div>
                <p className="text-lg text-charcoal/80">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-softGray">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Development Process</h2>
          
          <div className="space-y-6">
            <Card>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-techBlue rounded-lg flex items-center justify-center text-white text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Discovery & Planning</h3>
                  <p className="text-charcoal/80">
                    We start by understanding your business, challenges, and goals. This ensures every solution we build delivers real value.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-techBlue rounded-lg flex items-center justify-center text-white text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Architecture & Design</h3>
                  <p className="text-charcoal/80">
                    We design scalable, secure architecture that aligns with your technical requirements and business objectives.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-techBlue rounded-lg flex items-center justify-center text-white text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Development & Testing</h3>
                  <p className="text-charcoal/80">
                    Our team builds your solution using modern best practices, with comprehensive testing at every stage.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-techBlue rounded-lg flex items-center justify-center text-white text-xl font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Deployment & Support</h3>
                  <p className="text-charcoal/80">
                    We handle deployment, provide training, and offer ongoing support to ensure long-term success.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-20">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Build Your Solution
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to transform your business with custom software? Let's discuss your project.
          </p>
          <Button href="/contact" size="lg">
            Get Started
          </Button>
        </div>
      </section>
    </>
  );
}
