-- Add boost fields to applications table
-- Run this manually on your Heroku PostgreSQL database

ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS boosted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS "boostExpiry" TIMESTAMP;

-- Update Prisma migrations table (if you're using migrations)
-- This tells Prisma the schema is up to date
-- You can skip this if not using migrations
