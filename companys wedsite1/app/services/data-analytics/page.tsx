import Button from "@/components/Button";
import Card from "@/components/Card";
import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Data Analytics Services",
  description: "Transform raw data into actionable insights that drive informed business decisions.",
};

export default function DataAnalyticsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-navy to-techBlue-dark text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-techBlue">
              <FontAwesomeIcon icon={faChartLine} className="w-6 h-6" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Data Analytics</h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Transform raw data into actionable insights that drive informed business decisions and competitive advantage.
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
                Organizations collect massive amounts of data but struggle to extract meaningful insights. Data sits in silos, reports are manual and outdated, and decision-makers lack the visibility they need to act quickly and confidently.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 text-navy">Our Solution</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed mb-4">
                We build comprehensive analytics solutions that turn data into your competitive advantage. From data integration to interactive dashboards, we help you understand your business, identify opportunities, and make decisions backed by evidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-softGray">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Analytics Services</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Business Intelligence", desc: "Comprehensive dashboards and reporting systems" },
              { title: "Data Visualization", desc: "Clear, compelling visual representations of complex data" },
              { title: "Predictive Analytics", desc: "Forecasting and trend analysis for strategic planning" },
              { title: "Custom Reporting", desc: "Automated reports tailored to your KPIs" },
              { title: "Data Integration", desc: "Consolidate data from multiple sources" },
              { title: "Performance Metrics", desc: "Track and optimize key business metrics" },
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Turn Data Into Decisions</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to unlock the value in your data? Let's build your analytics solution.
          </p>
          <Button href="/contact" size="lg">Get Started</Button>
        </div>
      </section>
    </>
  );
}
