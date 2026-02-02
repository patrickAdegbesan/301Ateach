'use client';

import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export default function BoostCancelledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gray-100 rounded-full">
              <XCircle className="w-16 h-16 text-gray-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-navy mb-4">
            Payment Cancelled
          </h1>

          <p className="text-lg text-charcoal mb-6">
            Your boost payment was cancelled. Don't worry - your application has still been submitted and is being reviewed by our team.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-charcoal">
              <strong>Your application is active!</strong> It will be reviewed in the order it was received. You can boost it later if you'd like to increase visibility.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/careers/jobs"
              className="bg-techBlue hover:bg-techBlue-dark text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Jobs
            </Link>
            <Link
              href="/careers"
              className="bg-white hover:bg-softGray text-navy border-2 border-navy px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 font-semibold"
            >
              Careers Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
