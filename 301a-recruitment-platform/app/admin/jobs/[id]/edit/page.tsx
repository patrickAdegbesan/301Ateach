import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import JobFormClient from "../../JobFormClient";

export default async function EditJobPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { id }
  });

  if (!job) {
    redirect("/admin/jobs");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Job</h1>
          <p className="text-sm text-gray-600 mt-1">Update job posting details</p>
        </div>
        <JobFormClient job={job} isEdit={true} />
      </div>
    </div>
  );
}
