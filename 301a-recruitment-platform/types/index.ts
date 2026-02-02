export type WorkType = "On-site" | "Hybrid" | "Remote";
export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship";

export interface Job {
  id: string;
  slug: string;
  title: string;
  location: string;
  workType: WorkType;
  employmentType: EmploymentType;
  department: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: {
    mustHave: string[];
    niceToHave: string[];
  };
  benefits: string[];
  salaryRange?: string;
  postedAt: string;
  featured?: boolean;
}

export interface Application {
  id?: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  cvFileName?: string;
  additionalInfo?: string;
  agreedToPrivacy: boolean;
  submittedAt: string;
  status?: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
}
