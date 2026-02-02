import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "301A TECH LTD Terms of Service - Terms and conditions for using our services.",
};

export default function TermsPage() {
  return (
    <div className="py-20 bg-white">
      <div className="container-custom max-w-4xl">
        <h1 className="text-5xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-charcoal/80">
          <p className="text-sm text-charcoal/60">Last updated: December 16, 2025</p>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Agreement to Terms</h2>
            <p>
              By accessing or using the services provided by 301A TECH LTD, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Services</h2>
            <p>
              301A TECH LTD provides technology solutions including software development, IT consulting, hardware installation, training, and related services. Specific terms for individual projects are outlined in separate service agreements.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Intellectual Property</h2>
            <p>
              Unless otherwise specified in a service agreement, all intellectual property rights for work created by 301A TECH LTD remain our property until full payment is received. Upon payment, rights transfer as outlined in the project agreement.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Client Responsibilities</h2>
            <p>Clients are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing accurate information and requirements</li>
              <li>Timely feedback and approvals</li>
              <li>Payment according to agreed terms</li>
              <li>Proper use of delivered solutions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Warranties and Limitations</h2>
            <p>
              We warrant that our services will be performed in a professional manner consistent with industry standards. However, we make no guarantees about specific outcomes or results unless explicitly stated in a service agreement.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Limitation of Liability</h2>
            <p>
              301A TECH LTD shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services, except where prohibited by law.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Termination</h2>
            <p>
              Either party may terminate a service agreement according to the terms specified in that agreement. Upon termination, payment for work completed up to the termination date is due.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact:
            </p>
            <p className="mt-4">
              <strong>301A TECH LTD</strong><br />
              Email: info@301atech.com<br />
              Phone: +234 905 444 8465
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
