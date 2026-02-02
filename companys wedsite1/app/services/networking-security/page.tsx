import Button from "@/components/Button";
import Card from "@/components/Card";
import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Networking & Security Services",
  description: "Enterprise-grade network infrastructure and cybersecurity solutions to protect your business.",
};

export default function NetworkingSecurityPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-navy to-techBlue-dark text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-techBlue">
              <FontAwesomeIcon icon={faShieldAlt} className="w-6 h-6" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Networking & Security</h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Enterprise-grade network infrastructure and cybersecurity solutions that protect your business and enable growth.
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
                Cyber threats are evolving, and network vulnerabilities can lead to devastating breaches, downtime, and reputational damage. Many businesses operate with outdated infrastructure, weak security postures, and no clear incident response plan.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 text-navy">Our Solution</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed mb-4">
                We design, implement, and manage secure network infrastructure that protects your assets while enabling productivity. From firewall configuration to threat monitoring, we build defense-in-depth security that adapts to emerging threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-softGray">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Security Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Network Design", desc: "Scalable, resilient network architecture" },
              { title: "Security Audits", desc: "Comprehensive vulnerability assessments" },
              { title: "Firewall Configuration", desc: "Next-gen firewall setup and management" },
              { title: "Threat Protection", desc: "Real-time monitoring and threat response" },
              { title: "VPN Solutions", desc: "Secure remote access for your team" },
              { title: "Compliance", desc: "Meet regulatory requirements and standards" },
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Secure Your Business</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't wait for a breach. Strengthen your security posture today.
          </p>
          <Button href="/contact" size="lg">Request Security Assessment</Button>
        </div>
      </section>
    </>
  );
}
