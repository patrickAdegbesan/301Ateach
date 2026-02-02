import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import JobFormClient from "../JobFormClient";

export default async function NewJobPage() {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Add New Job</h1>
          <p className="text-sm text-gray-600 mt-1">Create a new job posting</p>
        </div>
        <JobFormClient />
      </div>
    </div>
  );
}
