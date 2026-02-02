-- Add indexes to improve query performance
-- Run this on Heroku PostgreSQL to speed up common queries

-- Index for active jobs lookup (most common query)
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(active);

-- Index for featured jobs lookup
CREATE INDEX IF NOT EXISTS idx_jobs_featured_active ON jobs(featured, active);

-- Composite index for slug lookup (unique constraint should already create this)
-- CREATE INDEX IF NOT EXISTS idx_jobs_slug ON jobs(slug);

-- Index for job creation date ordering
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs("createdAt" DESC);

-- Composite index for common query patterns
CREATE INDEX IF NOT EXISTS idx_jobs_active_created ON jobs(active, "createdAt" DESC);

-- Index for application job lookups
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications("jobId");

-- Index for application status filtering
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

-- Index for boosted applications (priority sorting)
CREATE INDEX IF NOT EXISTS idx_applications_boosted ON applications(boosted, "boostExpiry");

-- Composite index for admin dashboard query
CREATE INDEX IF NOT EXISTS idx_applications_boosted_created ON applications(boosted DESC, "createdAt" DESC);
