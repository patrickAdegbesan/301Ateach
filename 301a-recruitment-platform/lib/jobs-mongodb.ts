import { Job } from '@/types';
import { connectDB } from './mongodb';
import { Job as JobModel } from './models';

// Get all jobs from MongoDB
export async function getJobs(): Promise<Job[]> {
  try {
    await connectDB();
    const jobs = await JobModel.find().sort({ postedDate: -1 }).lean();
    return jobs.map(job => ({
      ...job,
      id: job._id.toString(),
      _id: undefined
    })) as Job[];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

// Get featured jobs only
export async function getFeaturedJobs(): Promise<Job[]> {
  try {
    await connectDB();
    const jobs = await JobModel.find({ featured: true }).sort({ postedDate: -1 }).lean();
    return jobs.map(job => ({
      ...job,
      id: job._id.toString(),
      _id: undefined
    })) as Job[];
  } catch (error) {
    console.error('Error fetching featured jobs:', error);
    return [];
  }
}

// Get a job by slug
export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    await connectDB();
    const job = await JobModel.findOne({ slug }).lean();
    
    if (!job) {
      return null;
    }
    
    return {
      ...job,
      id: job._id.toString(),
      _id: undefined
    } as Job;
  } catch (error) {
    console.error('Error fetching job by slug:', error);
    return null;
  }
}

// Get all job slugs (for static generation)
export async function getAllJobSlugs(): Promise<string[]> {
  try {
    await connectDB();
    const jobs = await JobModel.find({}, 'slug').lean();
    return jobs.map(job => job.slug);
  } catch (error) {
    console.error('Error fetching job slugs:', error);
    return [];
  }
}
