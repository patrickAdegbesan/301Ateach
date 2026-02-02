import 'dotenv/config';
import pg from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';

const DATABASE_URL = process.env.DATABASE_URL || 
  readFileSync(join(process.cwd(), '.env.local'), 'utf-8')
    .split('\n')
    .find(line => line.startsWith('DATABASE_URL='))
    ?.split('=')[1]
    .replace(/["']/g, '')
    .trim();

const client = new pg.Client({ 
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const jobs = [
  {
    slug: "senior-software-developer",
    title: "Senior Software Developer",
    location: "London, UK",
    workType: "Hybrid",
    employmentType: "Full_time",
    department: "Engineering",
    summary: "We're seeking an experienced software developer to join our growing engineering team.",
    responsibilities: JSON.stringify([
      "Design, develop, and maintain scalable web applications",
      "Lead technical discussions and architectural decisions"
    ]),
    mustHave: JSON.stringify([
      "5+ years of professional software development experience",
      "Strong proficiency in TypeScript, React, and Node.js"
    ]),
    niceToHave: JSON.stringify([
      "Experience with microservices architecture",
      "Knowledge of containerization (Docker, Kubernetes)"
    ]),
    benefits: JSON.stringify([
      "Competitive salary with performance bonuses",
      "Flexible hybrid working (2-3 days in office)"
    ]),
    salaryRange: "£55,000 - £75,000",
    postedDate: "2025-01-15",
    featured: true
  }
];

async function seedDirectly() {
  try {
    await client.connect();
    console.log('Connected to database');
    
    // Check if table exists
    const checkTable = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'jobs'
      );
    `);
    
    console.log('Table exists:', checkTable.rows[0].exists);
    
    // Try simple select
    const result = await client.query('SELECT * FROM jobs LIMIT 1');
    console.log('Query successful, rows:', result.rowCount);
    
    await client.end();
  } catch (err) {
    console.error('Error:', err);
    await client.end();
    process.exit(1);
  }
}

seedDirectly();
