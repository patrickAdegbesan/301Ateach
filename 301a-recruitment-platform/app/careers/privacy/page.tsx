export default function PrivacyPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold mb-6">Recruitment Privacy Notice</h1>
          
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">1. Introduction</h2>
              <p>
                301A TECH LTD ("we", "us", or "our") is committed to protecting your personal information. 
                This privacy notice explains how we collect, use, and protect your data when you apply for a job with us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">2. Information We Collect</h2>
              <p className="mb-3">When you submit a job application, we collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal details (name, email, phone number, location)</li>
                <li>Professional information (CV/resume, LinkedIn profile, portfolio)</li>
                <li>Application-specific information (position applied for, additional information)</li>
                <li>Technical data (IP address, browser type, application timestamp)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">3. How We Use Your Information</h2>
              <p className="mb-3">We use your personal data to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your job application and assess your suitability for the role</li>
                <li>Contact you regarding your application and potential interviews</li>
                <li>Comply with legal obligations and maintain records</li>
                <li>Consider you for other suitable positions (with your consent)</li>
                <li>Improve our recruitment process</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">4. Legal Basis for Processing</h2>
              <p>
                We process your personal data based on your consent and our legitimate interests in 
                conducting recruitment activities. For successful candidates, processing is necessary 
                for entering into an employment contract.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">5. Data Sharing</h2>
              <p className="mb-3">We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Internal recruitment team and hiring managers</li>
                <li>HR and payroll systems (for successful candidates)</li>
                <li>Third-party service providers (email services, application tracking systems)</li>
                <li>Legal authorities if required by law</li>
              </ul>
              <p className="mt-3">
                We do not sell your personal data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">6. Data Retention</h2>
              <p>
                We retain your application data for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Successful candidates:</strong> Data becomes part of your employee record</li>
                <li><strong>Unsuccessful candidates:</strong> 12 months from application date, unless you consent to being considered for future roles</li>
                <li><strong>Withdrawn applications:</strong> 6 months from withdrawal</li>
              </ul>
              <p className="mt-3">
                After the retention period, your data is securely deleted.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">7. Your Rights</h2>
              <p className="mb-3">Under data protection law, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your data (subject to legal obligations)</li>
                <li><strong>Restriction:</strong> Limit how we use your data</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Withdraw consent:</strong> Withdraw consent at any time (where consent is the legal basis)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">8. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data 
                against unauthorized access, loss, destruction, or alteration. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Encrypted data transmission (HTTPS/TLS)</li>
                <li>Secure email systems</li>
                <li>Access controls and authentication</li>
                <li>Regular security assessments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">9. International Transfers</h2>
              <p>
                Your data is primarily processed within the UK/EU. If we transfer data internationally, 
                we ensure appropriate safeguards are in place (e.g., standard contractual clauses, 
                adequacy decisions).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">10. Automated Decision-Making</h2>
              <p>
                We do not use automated decision-making or profiling that produces legal effects or 
                significantly affects you. All recruitment decisions involve human review.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">11. Contact Us</h2>
              <p className="mb-3">
                For questions about this privacy notice or to exercise your rights, please contact:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>301A TECH LTD - Recruitment Team</strong></p>
                <p>Email: <a href="mailto:recruit@301atech.com" className="text-navy hover:underline">recruit@301atech.com</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">12. Complaints</h2>
              <p>
                If you believe your data protection rights have been violated, you have the right to 
                lodge a complaint with the Information Commissioner's Office (ICO) in the UK:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <p><strong>Information Commissioner's Office</strong></p>
                <p>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-navy hover:underline">ico.org.uk</a></p>
                <p>Helpline: 0303 123 1113</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">13. Changes to This Notice</h2>
              <p>
                We may update this privacy notice from time to time. When we make significant changes, 
                we will update the "Last updated" date at the top of this page. We encourage you to 
                review this notice periodically.
              </p>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-navy">
              <h2 className="text-2xl font-bold text-navy mb-4">Equal Opportunity Statement</h2>
              <p>
                301A TECH LTD is an equal opportunity employer. We celebrate diversity and are committed 
                to creating an inclusive environment for all employees. All qualified applicants will receive 
                consideration for employment without regard to race, color, religion, gender, gender identity 
                or expression, sexual orientation, national origin, genetics, disability, age, or veteran status.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <a 
              href="/careers" 
              className="text-navy font-semibold hover:underline"
            >
              ← Back to Careers Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
