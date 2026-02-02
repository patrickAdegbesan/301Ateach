import { prisma } from './prisma';
import { Job } from '@prisma/client';

export async function getJobs(): Promise<Job[]> {
  return prisma.job.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
    take: 100, // Reduced from 1000 for faster loading
  });
}

export async function getFeaturedJobs(): Promise<Job[]> {
  return prisma.job.findMany({
    where: { 
      featured: true,
      active: true 
    },
    orderBy: { createdAt: 'desc' },
    take: 50, // Limit featured jobs for faster loading
  });
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  return prisma.job.findUnique({
    where: { slug }
  });
}

export async function getAllJobSlugs(): Promise<{ slug: string }[]> {
  return prisma.job.findMany({
    select: { slug: true }
  });
}