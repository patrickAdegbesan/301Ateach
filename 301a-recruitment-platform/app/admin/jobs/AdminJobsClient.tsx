"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Job {
  id: string;
  slug: string;
  title: string;
  location: string;
  workType: string;
  employmentType: string;
  department: string;
  featured: boolean;
  active: boolean;
  postedDate: string;
}

export default function AdminJobsClient() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/admin/jobs");
      const data = await response.json();

      if (data.ok) {
        setJobs(data.jobs);
      } else {
        setError(data.error || "Failed to fetch jobs");
      }
    } catch (err) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/jobs/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (data.ok) {
        setJobs(jobs.filter(job => job.id !== id));
      } else {
        alert(data.error || "Failed to delete job");
      }
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const response = await fetch(`/api/admin/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentFeatured })
      });

      const data = await response.json();

      if (data.ok) {
        setJobs(jobs.map(job => 
          job.id === id ? { ...job, featured: !currentFeatured } : job
        ));
      } else {
        alert(data.error || "Failed to update job");
      }
    } catch (err) {
      alert("Failed to update job");
    }
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !currentActive })
      });

      const data = await response.json();

      if (data.ok) {
        setJobs(jobs.map(job => 
          job.id === id ? { ...job, active: !currentActive } : job
        ));
      } else {
        alert(data.error || "Failed to update job");
      }
    } catch (err) {
      alert("Failed to update job");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
              <p className="text-sm text-gray-600 mt-1">301a Tech Recruitment Platform</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/linkedin"
                className="bg-[#0077b5] text-white px-4 py-2 rounded-md hover:bg-[#006097] transition-colors flex items-center gap-2"
                title="LinkedIn Auto-Poster"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn Bot
              </Link>
              <Link
                href="/admin/applications"
                className="bg-techBlue text-white px-4 py-2 rounded-md hover:bg-techBlue-dark transition-colors"
              >
                View Applications
              </Link>
              <Link
                href="/admin/jobs/new"
                className="bg-navy text-white px-4 py-2 rounded-md hover:bg-navy-dark transition-colors"
              >
                + Add New Job
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Jobs Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No jobs found. Create your first job!
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="text-xs text-gray-500">{job.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{job.workType}</div>
                      <div className="text-xs text-gray-500">{job.employmentType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleFeatured(job.id, job.featured)}
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          job.featured
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {job.featured ? "⭐ Featured" : "Not Featured"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleActive(job.id, job.active)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          job.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {job.active ? "✓ Active" : "✗ Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.postedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link
                        href={`/careers/jobs/${job.slug}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/jobs/${job.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(job.id, job.title)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {jobs.length > 0 && (
          <div className="mt-4 text-sm text-gray-600 text-center">
            Total: {jobs.length} job{jobs.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
