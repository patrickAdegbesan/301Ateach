import { getJobBySlug } from '@/lib/jobs-postgres';
import { Metadata } from "next";
import JobDetailClient from "./JobDetailClient";

// Force dynamic rendering to avoid connection pool exhaustion during build
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  const jobUrl = `https://careers.301atech.com/careers/jobs/${job.slug}`;

  return {
    title: `${job.title} - ${job.location}`,
    description: job.summary,
    keywords: [
      job.title,
      job.department,
      job.location,
      job.workType,
      job.employmentType,
      "301A TECH",
      "careers",
      "jobs"
    ],
    openGraph: {
      title: `${job.title} at 301A TECH LTD`,
      description: job.summary,
      url: jobUrl,
      siteName: "301A TECH Careers",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} at 301A TECH LTD`,
      description: job.summary,
    },
    alternates: {
      canonical: jobUrl,
    },
  };
}

export default async function JobDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  
  if (!job) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
          <p className="text-gray-700 mb-8">The position you're looking for doesn't exist or has been filled.</p>
          <a href="/careers/jobs" className="btn-primary inline-block">View All Jobs</a>
        </div>
      </div>
    );
  }
  
  return <JobDetailClient job={job} />;
}
