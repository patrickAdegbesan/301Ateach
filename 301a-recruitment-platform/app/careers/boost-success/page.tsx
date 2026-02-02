'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Suspense } from "react";

function BoostSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-20">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-navy mb-4">
            Application Boosted Successfully! 🎉
          </h1>

          <p className="text-lg text-charcoal mb-6">
            Your application has been boosted and will appear at the top of the hiring manager's list for the next 7 days.
          </p>

          <div className="bg-techBlue/10 border-2 border-techBlue/30 rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-navy mb-3">What happens next?</h2>
            <ul className="text-left space-y-2 text-charcoal">
              <li className="flex items-start gap-2">
                <span className="text-techBlue mt-1">✓</span>
                <span>Your application is now featured at the top of the list</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-techBlue mt-1">✓</span>
                <span>Boost remains active for 7 days from today</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-techBlue mt-1">✓</span>
                <span>You'll receive a confirmation email shortly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-techBlue mt-1">✓</span>
                <span>Our hiring team will review your application soon</span>
              </li>
            </ul>
          </div>

          {sessionId && (
            <p className="text-sm text-gray-500 mb-6">
              Payment ID: {sessionId.substring(0, 20)}...
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/careers/jobs"
              className="bg-techBlue hover:bg-techBlue-dark text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 font-semibold"
            >
              Browse More Jobs <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/careers"
              className="bg-white hover:bg-softGray text-navy border-2 border-navy px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 font-semibold"
            >
              Back to Careers Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BoostSuccessPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <BoostSuccessContent />
    </Suspense>
  );
}
