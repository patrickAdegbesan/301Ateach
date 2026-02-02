import Button from "@/components/Button";
import Card from "@/components/Card";
import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Smart Home Solutions",
  description: "Intelligent home automation systems that bring comfort, security, and efficiency to your living space.",
};

export default function SmartHomesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-navy to-techBlue-dark text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-techBlue">
              <FontAwesomeIcon icon={faHome} className="w-6 h-6" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Smart Home Solutions</h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Intelligent home automation systems that bring comfort, security, and efficiency to your living space.
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
                Modern homes have countless disconnected devices—lighting, security, climate, entertainment—each requiring separate controls and management. This fragmentation leads to complexity, inefficiency, and missed opportunities for automation.
              </p>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                Many homeowners want the benefits of smart technology but struggle with complicated setup, poor integration, and security concerns.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 text-navy">Our Solution</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed mb-4">
                We design and implement integrated smart home systems that work seamlessly together. From lighting and climate to security and entertainment, everything is unified under intelligent control that adapts to your lifestyle.
              </p>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                Our solutions are secure, reliable, and designed for simplicity—giving you the comfort and convenience of automation without the complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-softGray">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Lighting Automation", desc: "Smart lighting that adapts to your schedule and preferences" },
              { title: "Climate Control", desc: "Intelligent HVAC management for optimal comfort and efficiency" },
              { title: "Security Systems", desc: "Advanced monitoring, cameras, and access control" },
              { title: "Entertainment Integration", desc: "Seamless control of audio, video, and streaming" },
              { title: "Energy Management", desc: "Monitor and optimize energy usage throughout your home" },
              { title: "Voice Control", desc: "Natural language control via Alexa, Google, or Siri" },
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Transform Your Home</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to experience the comfort and convenience of a truly smart home?
          </p>
          <Button href="/contact" size="lg">Schedule a Consultation</Button>
        </div>
      </section>
    </>
  );
}
