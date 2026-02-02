import Button from "@/components/Button";
import Card from "@/components/Card";
import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "IT Training Services",
  description: "Professional technology training programs designed to empower your team with practical skills.",
};

export default function ITTrainingPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-navy to-techBlue-dark text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-techBlue">
              <FontAwesomeIcon icon={faGraduationCap} className="w-6 h-6" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">IT Training</h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Professional technology training programs designed to empower your team with practical, industry-relevant skills.
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
                Technology evolves rapidly, and keeping your team's skills current is a constant challenge. Generic training often fails to address real-world scenarios, leaving employees with theoretical knowledge but limited practical application.
              </p>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                Organizations need training that translates directly into improved productivity and better outcomes.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 text-navy">Our Solution</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed mb-4">
                We deliver hands-on, practical training programs tailored to your team's needs and skill levels. Our instructors bring real-world experience, ensuring every lesson is relevant, actionable, and immediately applicable.
              </p>
              <p className="text-lg text-charcoal/80 leading-relaxed">
                From foundational concepts to advanced certifications, we equip your team with the skills they need to excel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-softGray">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Training Programs</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Corporate Training", desc: "Customized programs for your organization's specific needs" },
              { title: "Certification Preparation", desc: "Expert guidance for industry certifications" },
              { title: "Skills Development", desc: "From basics to advanced technical competencies" },
              { title: "Workshops & Bootcamps", desc: "Intensive, focused learning experiences" },
              { title: "Cloud Technologies", desc: "AWS, Azure, Google Cloud training" },
              { title: "Cybersecurity", desc: "Security awareness and technical security training" },
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Invest in Your Team</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to upskill your workforce? Let's design a training program that delivers results.
          </p>
          <Button href="/contact" size="lg">Explore Training Options</Button>
        </div>
      </section>
    </>
  );
}
