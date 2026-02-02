'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, Clock, CheckCircle, XCircle, Eye } from "lucide-react";

interface Application {
  id: string;
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  status: string;
  boosted: boolean;
  boostExpiry: string | null;
  createdAt: string;
}

export default function ApplicationsClient() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      const response = await fetch('/api/admin/applications');
      const data = await response.json();
      if (data.ok) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.error('Failed to load applications:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredApplications = filterStatus === "ALL" 
    ? applications 
    : applications.filter(app => app.status === filterStatus);

  const isBoostedActive = (app: Application) => {
    if (!app.boosted || !app.boostExpiry) return false;
    return new Date(app.boostExpiry) > new Date();
  };

  if (loading) {
    return <div className="p-8">Loading applications...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-navy">Applications</h1>
          <Link 
            href="/admin/jobs"
            className="bg-techBlue text-white px-4 py-2 rounded-lg hover:bg-techBlue-dark transition-colors"
          >
            Back to Jobs
          </Link>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <label className="font-medium text-navy mr-3">Filter by Status:</label>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="ALL">All Applications</option>
            <option value="PENDING">Pending</option>
            <option value="REVIEWING">Reviewing</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEWED">Interviewed</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <span className="ml-4 text-gray-600">
            Showing {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-navy">{applications.length}</div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-700 flex items-center gap-1">
              <Star className="w-5 h-5 fill-current" />
              {applications.filter(app => isBoostedActive(app)).length}
            </div>
            <div className="text-sm text-yellow-700 font-medium">Boosted (Active)</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-navy">
              {applications.filter(app => app.status === 'PENDING').length}
            </div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {applications.filter(app => app.status === 'ACCEPTED').length}
            </div>
            <div className="text-sm text-gray-600">Accepted</div>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-softGray">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-navy uppercase tracking-wider">
                Candidate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-navy uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-navy uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-navy uppercase tracking-wider">
                Boost
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-navy uppercase tracking-wider">
                Applied
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-navy uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplications.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No applications found
                </td>
              </tr>
            ) : (
              filteredApplications.map((app) => {
                const isBoostActive = isBoostedActive(app);
                return (
                  <tr key={app.id} className={isBoostActive ? "bg-yellow-50/50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {isBoostActive && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-2" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-navy">
                            {app.firstName} {app.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{app.email}</div>
                      {app.phone && (
                        <div className="text-sm text-gray-500">{app.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        app.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                        app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        app.status === 'SHORTLISTED' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'INTERVIEWED' ? 'bg-purple-100 text-purple-800' :
                        app.status === 'REVIEWING' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {app.boosted ? (
                        <div className="text-sm">
                          {isBoostActive ? (
                            <span className="text-yellow-600 font-semibold flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" /> Active
                            </span>
                          ) : (
                            <span className="text-gray-500 flex items-center gap-1">
                              <Clock className="w-4 h-4" /> Expired
                            </span>
                          )}
                          {app.boostExpiry && (
                            <div className="text-xs text-gray-500">
                              Until {new Date(app.boostExpiry).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="text-techBlue hover:text-techBlue-dark inline-flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" /> View
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Star className="w-5 h-5 text-yellow-500 fill-current mt-0.5" />
          <div>
            <p className="font-semibold text-navy">Boosted Applications</p>
            <p className="text-sm text-charcoal">
              Applications with a star icon have been boosted by the candidate (₦1,500-₦4,500 based on duration). 
              These appear at the top of your list and remain highlighted for their purchased duration to help you prioritize high-interest candidates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
