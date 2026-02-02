"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface JobFormData {
  slug: string;
  title: string;
  location: string;
  workType: string;
  employmentType: string;
  department: string;
  salary?: string;
  summary: string;
  description?: string;
  mustHave: string[];
  niceToHave: string[];
  benefits: string[];
  featured: boolean;
  active: boolean;
  postedDate: string;
}

interface JobFormClientProps {
  job?: JobFormData & { id: string };
  isEdit?: boolean;
}

export default function JobFormClient({ job, isEdit = false }: JobFormClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<JobFormData>({
    slug: job?.slug || "",
    title: job?.title || "",
    location: job?.location || "",
    workType: job?.workType || "Remote",
    employmentType: job?.employmentType || "Full-time",
    department: job?.department || "",
    salary: job?.salary || "",
    summary: job?.summary || "",
    description: job?.description || "",
    mustHave: job?.mustHave || [""],
    niceToHave: job?.niceToHave || [""],
    benefits: job?.benefits || [""],
    featured: job?.featured || false,
    active: job?.active !== undefined ? job.active : true,
    postedDate: job?.postedDate || new Date().toISOString().split("T")[0]
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleArrayChange = (field: keyof JobFormData, index: number, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = [...currentArray];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: keyof JobFormData) => {
    const currentArray = formData[field] as string[];
    setFormData({ ...formData, [field]: [...currentArray, ""] });
  };

  const removeArrayItem = (field: keyof JobFormData, index: number) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setFormData({ ...formData, slug });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Filter out empty items from arrays
    const cleanedData = {
      ...formData,
      mustHave: formData.mustHave.filter(item => item.trim() !== ""),
      niceToHave: formData.niceToHave.filter(item => item.trim() !== ""),
      benefits: formData.benefits.filter(item => item.trim() !== "")
    };

    try {
      const url = isEdit ? `/api/admin/jobs/${job?.id}` : "/api/admin/jobs";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData)
      });

      const data = await response.json();

      if (data.ok) {
        router.push("/admin/jobs");
        router.refresh();
      } else {
        setError(data.error || `Failed to ${isEdit ? "update" : "create"} job`);
      }
    } catch (err) {
      setError(`Failed to ${isEdit ? "update" : "create"} job`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                onBlur={!isEdit && !formData.slug ? generateSlug : undefined}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                URL Slug *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="senior-software-engineer"
                />
                {!isEdit && (
                  <button
                    type="button"
                    onClick={generateSlug}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                  >
                    Generate
                  </button>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Remote, New York, London"
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <input
                type="text"
                id="department"
                name="department"
                required
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Engineering, Sales, Marketing"
              />
            </div>

            <div>
              <label htmlFor="workType" className="block text-sm font-medium text-gray-700 mb-1">
                Work Type *
              </label>
              <select
                id="workType"
                name="workType"
                required
                value={formData.workType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
                Employment Type *
              </label>
              <select
                id="employmentType"
                name="employmentType"
                required
                value={formData.employmentType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                Salary (Optional)
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., $80,000 - $120,000"
              />
            </div>

            <div>
              <label htmlFor="postedDate" className="block text-sm font-medium text-gray-700 mb-1">
                Posted Date *
              </label>
              <input
                type="date"
                id="postedDate"
                name="postedDate"
                required
                value={formData.postedDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
              Mark as featured job
            </label>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
              Job is active (visible to applicants)
            </label>
          </div>
          </div>
        </div>

        {/* Summary */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
            Summary *
          </label>
          <textarea
            id="summary"
            name="summary"
            required
            rows={3}
            value={formData.summary}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brief overview of the position (2-3 sentences)"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Full Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={8}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Detailed job description..."
          />
        </div>

        {/* Must Have Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Must Have Requirements *
          </label>
          {formData.mustHave.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange("mustHave", index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 5+ years of experience in..."
              />
              {formData.mustHave.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("mustHave", index)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("mustHave")}
            className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
          >
            + Add Requirement
          </button>
        </div>

        {/* Nice to Have */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nice to Have
          </label>
          {formData.niceToHave.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange("niceToHave", index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Experience with cloud platforms"
              />
              {formData.niceToHave.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("niceToHave", index)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("niceToHave")}
            className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
          >
            + Add Nice to Have
          </button>
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Benefits
          </label>
          {formData.benefits.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange("benefits", index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Health insurance, 401k matching"
              />
              {formData.benefits.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("benefits", index)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("benefits")}
            className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
          >
            + Add Benefit
          </button>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : isEdit ? "Update Job" : "Create Job"}
          </button>
          <Link
            href="/admin/jobs"
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
