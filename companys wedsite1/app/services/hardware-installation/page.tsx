import Button from "@/components/Button";
import Card from "@/components/Card";
import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Hardware Installation Services",
  description: "Expert hardware setup and installation services ensuring optimal performance and reliability.",
};

export default function HardwareInstallationPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-navy to-techBlue-dark text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-techBlue">
              <FontAwesomeIcon icon={faCog} className="w-6 h-6" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Hardware Installation</h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Expert hardware setup and installation services ensuring optimal performance, reliability, and longevity.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-navy">The Challenge</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed mb-4">
                Hardware installation seems straightforward until something goes wrong. Improper setup leads to performance issues, security vulnerabilities, and costly downtime. Many businesses lack the expertise to properly configure and optimize their hardware infrastructure.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 text-navy">Our Solution</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed mb-4">
                We handle the complete hardware lifecycle—from planning and procurement to installation, configuration, and ongoing maintenance. Our certified technicians ensure every component is properly installed, optimized, and integrated with your existing infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-softGray">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Installation Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Server Setup", desc: "Enterprise server installation and configuration" },
              { title: "Network Equipment", desc: "Routers, switches, and access points" },
              { title: "Workstation Configuration", desc: "Desktop and laptop setup for your team" },
              { title: "Storage Solutions", desc: "NAS, SAN, and backup systems" },
              { title: "Security Hardware", desc: "Cameras, access control, and monitoring" },
              { title: "Preventive Maintenance", desc: "Regular checks to ensure optimal performance" },
            ].map((item) => (
              <Card key={item.title} hover>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-charcoal/80">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-white py-20">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Professional Installation</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get your hardware installed right the first time. Contact us today.
          </p>
          <Button href="/contact" size="lg">Request Service</Button>
        </div>
      </section>
    </>
  );
}
