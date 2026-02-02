import Button from "@/components/Button";
import Card from "@/components/Card";
import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Graphics & Design Services",
  description: "Professional visual design services that communicate your brand with clarity and impact.",
};

export default function GraphicsDesignPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-navy to-techBlue-dark text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-techBlue">
              <FontAwesomeIcon icon={faPalette} className="w-6 h-6" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Graphics & Design</h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Professional visual design services that communicate your brand with clarity, consistency, and impact.
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
                In a crowded marketplace, visual identity is critical. Poor design undermines credibility, confuses customers, and wastes marketing investments. Many businesses struggle with inconsistent branding, amateur visuals, or designs that fail to communicate their value.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 text-navy">Our Solution</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed mb-4">
                We create professional visual assets that strengthen your brand and communicate clearly with your audience. From logos to complete brand systems, every design is purpose-driven, polished, and aligned with your business objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-softGray">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Design Services</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Brand Identity", desc: "Logos, color systems, and brand guidelines" },
              { title: "UI/UX Design", desc: "User interfaces that are beautiful and functional" },
              { title: "Marketing Materials", desc: "Brochures, presentations, and promotional content" },
              { title: "Digital Assets", desc: "Social media graphics, web banners, and ads" },
              { title: "Print Design", desc: "Business cards, signage, and printed collateral" },
              { title: "Infographics", desc: "Visual storytelling for complex information" },
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Elevate Your Brand</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to make a lasting impression? Let's create visuals that work.
          </p>
          <Button href="/contact" size="lg">Start Your Project</Button>
        </div>
      </section>
    </>
  );
}
