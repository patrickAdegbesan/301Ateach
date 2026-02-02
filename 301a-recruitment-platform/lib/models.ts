import mongoose, { Schema, model, models } from 'mongoose';

const JobSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  workType: { type: String, required: true, enum: ['On-site', 'Hybrid', 'Remote'] },
  employmentType: { type: String, required: true, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
  department: { type: String, required: true },
  summary: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: [{ type: String }],
  requirements: {
    mustHave: [{ type: String }],
    niceToHave: [{ type: String }]
  },
  benefits: [{ type: String }],
  salaryRange: { type: String },
  postedDate: { type: String, required: true },
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

const ApplicationSchema = new Schema({
  jobId: { type: String, required: true },
  jobTitle: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  linkedinUrl: { type: String },
  portfolioUrl: { type: String },
  cvFileName: { type: String },
  cvData: { type: Buffer }, // Store CV file in GridFS or as base64
  cvMimeType: { type: String },
  additionalInfo: { type: String },
  agreedToPrivacy: { type: Boolean, required: true },
  submittedAt: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export const Job = models.Job || model('Job', JobSchema);
export const Application = models.Application || model('Application', ApplicationSchema);
