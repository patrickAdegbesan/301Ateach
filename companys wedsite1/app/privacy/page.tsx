import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "301A TECH LTD Privacy Policy - How we handle and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="py-20 bg-white">
      <div className="container-custom max-w-4xl">
        <h1 className="text-5xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-charcoal/80">
          <p className="text-sm text-charcoal/60">Last updated: December 16, 2025</p>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Introduction</h2>
            <p>
              301A TECH LTD ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our services.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact information (email, phone number)</li>
              <li>Company or organization details</li>
              <li>Project requirements and inquiries</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your inquiries and provide requested services</li>
              <li>Communicate about projects and service offerings</li>
              <li>Improve our services and customer experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Data Protection</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share information with service providers who assist in our operations, under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact us at:
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
