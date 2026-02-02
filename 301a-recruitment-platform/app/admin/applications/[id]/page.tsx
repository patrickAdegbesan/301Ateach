"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Mail, Phone, Calendar, Briefcase, Star } from "lucide-react";

interface Application {
  id: string;
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  coverLetter: string | null;
  hasCv: boolean;
  cvMimeType: string;
  status: string;
  boosted: boolean;
  boostExpiry: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadApplication();
  }, [id]);

  async function loadApplication() {
    try {
      console.log("Fetching application:", id);
      const response = await fetch(`/api/admin/applications/${id}`);
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Response data:", data);
      
      if (data.ok) {
        setApplication(data.application);
      } else {
        alert("Application not found: " + (data.error || "Unknown error"));
        router.push("/admin/applications");
      }
    } catch (error) {
      console.error("Failed to load application:", error);
      alert("Failed to load application: " + error);
      router.push("/admin/applications");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(newStatus: string) {
    if (!application) return;
    
    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.ok) {
        setApplication({ ...application, status: newStatus });
        alert("Status updated successfully!");
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  }

  function downloadCV() {
    if (!application?.hasCv) return;

    // Simple download link - browser handles the download
    window.open(`/api/admin/applications/${id}/download`, '_blank');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading application...</div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Application not found</div>
      </div>
    );
  }

  const isBoostedActive = application.boosted && application.boostExpiry && new Date(application.boostExpiry) > new Date();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/admin/applications"
            className="flex items-center gap-2 text-techBlue hover:underline"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Applications
          </Link>
          {isBoostedActive && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-50 to-yellow-100 px-3 py-1 rounded-full border border-yellow-300">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-medium text-yellow-700">Boosted</span>
            </div>
          )}
        </div>

        {/* Application Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-navy mb-6">
            {application.firstName} {application.lastName}
          </h1>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-4 mb-6 pb-6 border-b">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-techBlue" />
              <div>
                <div className="text-sm text-gray-600">Email</div>
                <a href={`mailto:${application.email}`} className="text-navy hover:underline">
                  {application.email}
                </a>
              </div>
            </div>
            {application.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-techBlue" />
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <a href={`tel:${application.phone}`} className="text-navy hover:underline">
                    {application.phone}
                  </a>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-techBlue" />
              <div>
                <div className="text-sm text-gray-600">Applied</div>
                <div className="text-navy">{new Date(application.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-techBlue" />
              <div>
                <div className="text-sm text-gray-600">Job ID</div>
                <div className="text-navy font-mono text-sm">{application.jobId}</div>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="mb-6 pb-6 border-b">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Status
            </label>
            <select
              value={application.status}
              onChange={(e) => updateStatus(e.target.value)}
              disabled={updating}
              className="w-full md:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-techBlue focus:border-transparent"
            >
              <option value="PENDING">Pending</option>
              <option value="REVIEWING">Reviewing</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="INTERVIEWED">Interviewed</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
            </select>
            {updating && <span className="ml-3 text-sm text-gray-600">Updating...</span>}
          </div>

          {/* Cover Letter */}
          {application.coverLetter && (
            <div className="mb-6 pb-6 border-b">
              <h2 className="text-xl font-semibold text-navy mb-3">Cover Letter</h2>
              <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-gray-700">
                {application.coverLetter}
              </div>
            </div>
          )}

          {/* CV Download */}
          <div>
            <h2 className="text-xl font-semibold text-navy mb-3">Resume/CV</h2>
            <button
              onClick={downloadCV}
              disabled={!application.hasCv}
              className="flex items-center gap-2 bg-techBlue text-white px-6 py-3 rounded-lg hover:bg-techBlue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              Download CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
