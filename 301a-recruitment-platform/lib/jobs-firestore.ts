import { Job } from '@/types';
import { getFirebaseAdmin } from './firebase-admin';

// Get all jobs from Firestore
export async function getJobs(): Promise<Job[]> {
  try {
    const { db } = getFirebaseAdmin();
    const snapshot = await db.collection('jobs')
      .orderBy('postedDate', 'desc')
      .get();
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Job[];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

// Get featured jobs only
export async function getFeaturedJobs(): Promise<Job[]> {
  try {
    const { db } = getFirebaseAdmin();
    const snapshot = await db.collection('jobs')
      .where('featured', '==', true)
      .orderBy('postedDate', 'desc')
      .get();
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Job[];
  } catch (error) {
    console.error('Error fetching featured jobs:', error);
    return [];
  }
}

// Get a job by slug
export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    const { db } = getFirebaseAdmin();
    const snapshot = await db.collection('jobs')
      .where('slug', '==', slug)
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      return null;
    }
    
    const jobDoc = snapshot.docs[0];
    return {
      id: jobDoc.id,
      ...jobDoc.data(),
    } as Job;
  } catch (error) {
    console.error('Error fetching job by slug:', error);
    return null;
  }
}

// Get all job slugs (for static generation)
export async function getAllJobSlugs(): Promise<string[]> {
  try {
    const { db } = getFirebaseAdmin();
    const snapshot = await db.collection('jobs').get();
    
    return snapshot.docs.map((doc) => doc.data().slug as string);
  } catch (error) {
    console.error('Error fetching job slugs:', error);
    return [];
  }
}
