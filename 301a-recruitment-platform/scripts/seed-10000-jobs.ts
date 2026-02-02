import { PrismaClient, WorkType, EmploymentType } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const { Pool } = pg;

// Company services departments
const DEPARTMENTS = [
  'Software Development',
  'Data Analytics', 
  'Graphics Design',
  'Hardware Installation',
  'IT Training',
  'Networking & Security',
  'Smart Homes'
];

// Job titles by department
const JOB_TITLES: Record<string, string[]> = {
  'Software Development': [
    'Senior Software Engineer',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Mobile App Developer',
    'DevOps Engineer',
    'Software Architect',
    'UI/UX Developer',
    'QA Engineer',
    'Junior Software Developer'
  ],
  'Data Analytics': [
    'Data Analyst',
    'Senior Data Scientist',
    'Business Intelligence Analyst',
    'Data Engineer',
    'Analytics Manager',
    'Machine Learning Engineer',
    'Data Visualization Specialist',
    'Statistical Analyst',
    'Big Data Engineer',
    'Junior Data Analyst'
  ],
  'Graphics Design': [
    'Senior Graphic Designer',
    'UI/UX Designer',
    'Motion Graphics Designer',
    'Brand Identity Designer',
    'Creative Director',
    'Web Designer',
    '3D Artist',
    'Illustrator',
    'Video Editor',
    'Junior Graphic Designer'
  ],
  'Hardware Installation': [
    'Hardware Installation Technician',
    'Senior IT Technician',
    'Computer Hardware Engineer',
    'Field Service Technician',
    'Installation Team Lead',
    'Systems Integration Specialist',
    'Desktop Support Engineer',
    'Hardware Maintenance Specialist',
    'Technical Installation Manager',
    'Junior Hardware Technician'
  ],
  'IT Training': [
    'IT Training Specialist',
    'Technical Trainer',
    'Corporate Training Manager',
    'Curriculum Developer',
    'Training Coordinator',
    'E-Learning Specialist',
    'Certification Instructor',
    'Training Content Creator',
    'Technical Education Manager',
    'Junior Training Associate'
  ],
  'Networking & Security': [
    'Network Security Engineer',
    'Cybersecurity Analyst',
    'Network Administrator',
    'Security Operations Manager',
    'Penetration Tester',
    'Security Architect',
    'Network Engineer',
    'Information Security Specialist',
    'Cloud Security Engineer',
    'Junior Security Analyst'
  ],
  'Smart Homes': [
    'Smart Home Installation Specialist',
    'IoT Solutions Engineer',
    'Home Automation Technician',
    'Smart Systems Designer',
    'Home Technology Consultant',
    'Smart Home Project Manager',
    'IoT Security Specialist',
    'Home Network Specialist',
    'Automation Systems Engineer',
    'Junior Smart Home Technician'
  ]
};

const LOCATIONS = [
  'Lagos, Nigeria',
  'Abuja, Nigeria',
  'Port Harcourt, Nigeria',
  'Ibadan, Nigeria',
  'Kano, Nigeria',
  'Benin City, Nigeria',
  'Enugu, Nigeria',
  'Kaduna, Nigeria',
  'Jos, Nigeria',
  'Calabar, Nigeria',
  'Warri, Nigeria',
  'Owerri, Nigeria',
  'Abeokuta, Nigeria',
  'Ilorin, Nigeria',
  'Akure, Nigeria',
  'Uyo, Nigeria',
  'Remote (Nigeria)',
  'Hybrid - Lagos',
  'Hybrid - Abuja',
  'Hybrid - Port Harcourt'
];

const WORK_TYPES: WorkType[] = [WorkType.Remote, WorkType.On_site, WorkType.Hybrid];
const EMPLOYMENT_TYPES: EmploymentType[] = [
  EmploymentType.Full_time,
  EmploymentType.Part_time,
  EmploymentType.Contract,
  EmploymentType.Internship
];

// Dynamic salary assignment based on role seniority and specialization
function getSalaryRange(title: string): string {
  const titleLower = title.toLowerCase();
  
  // Junior roles: ₦50,000 - ₦100,000
  if (titleLower.includes('junior')) {
    const ranges = [
      '₦50,000 - ₦70,000',
      '₦60,000 - ₦80,000',
      '₦70,000 - ₦90,000',
      '₦80,000 - ₦100,000'
    ];
    return random(ranges);
  }
  
  // Entry-level/Associate roles: ₦100,000 - ₦300,000
  if (titleLower.includes('associate') || titleLower.includes('coordinator') || 
      titleLower.includes('assistant') || titleLower.includes('technician')) {
    const ranges = [
      '₦100,000 - ₦150,000',
      '₦120,000 - ₦180,000',
      '₦150,000 - ₦200,000',
      '₦180,000 - ₦250,000',
      '₦200,000 - ₦300,000'
    ];
    return random(ranges);
  }
  
  // High-level specialist roles: ₦800,000 - ₦2,000,000+ (only for architects, directors, managers, leads)
  if (titleLower.includes('architect') || titleLower.includes('director') || 
      titleLower.includes('lead') || titleLower.includes('head') ||
      (titleLower.includes('manager') && !titleLower.includes('assistant'))) {
    const ranges = [
      '₦800,000 - ₦1,200,000',
      '₦1,000,000 - ₦1,500,000',
      '₦1,200,000 - ₦1,800,000',
      '₦1,500,000 - ₦2,000,000'
    ];
    return random(ranges);
  }
  
  // Senior specialist roles: ₦400,000 - ₦800,000
  if (titleLower.includes('senior') || titleLower.includes('principal')) {
    const ranges = [
      '₦400,000 - ₦600,000',
      '₦450,000 - ₦650,000',
      '₦500,000 - ₦700,000',
      '₦550,000 - ₦750,000',
      '₦600,000 - ₦800,000'
    ];
    return random(ranges);
  }
  
  // Mid-level roles (default): ₦200,000 - ₦500,000
  const ranges = [
    '₦200,000 - ₦300,000',
    '₦250,000 - ₦350,000',
    '₦300,000 - ₦400,000',
    '₦350,000 - ₦450,000',
    '₦400,000 - ₦500,000',
    'Negotiable Based on Experience'
  ];
  return random(ranges);
}

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSlug(title: string, index: number): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${baseSlug}-${index}`;
}

function generateJobDescription(department: string, title: string): string {
  const descriptions = [
    `We are seeking a talented ${title} to join our ${department} team at 301A TECH. As Nigeria's leading technology solutions provider, we deliver cutting-edge services that transform businesses across multiple sectors.

In this role, you will collaborate with our experienced team to deliver innovative solutions for our diverse client base. You'll work on challenging projects, leverage modern technologies, and contribute to meaningful work that impacts businesses throughout Nigeria and beyond.`,

    `301A TECH is looking for an exceptional ${title} to strengthen our ${department} division. Join us in shaping the future of technology services in Nigeria.

This position offers you the opportunity to work with cutting-edge tools and technologies while solving real-world business challenges. You'll be part of a dynamic team committed to excellence, innovation, and continuous learning.`,

    `Are you a skilled ${title} passionate about ${department}? 301A TECH wants you! We're expanding our team and looking for talented professionals who share our commitment to delivering world-class technology solutions.

As part of our ${department} team, you'll tackle diverse challenges, work with the latest technologies, and help our clients achieve their business objectives through innovative IT solutions.`,

    `Join 301A TECH as a ${title} and be part of Nigeria's most innovative technology services company. Our ${department} team is growing, and we're looking for talented individuals who can deliver exceptional results.

In this role, you'll work on exciting projects across various industries, collaborate with skilled professionals, and have access to continuous learning and development opportunities.`,

    `301A TECH is hiring! We need a motivated ${title} to join our ${department} team. As one of Nigeria's premier technology solution providers, we offer challenging work, excellent career growth, and the chance to make a real impact.

You'll be working with modern technologies, collaborating with experienced professionals, and contributing to projects that help businesses transform and succeed in the digital age.`
  ];
  
  return random(descriptions);
}

function generateMustHave(department: string): string[] {
  const baseRequirements = [
    'Bachelor\'s degree in relevant field or equivalent experience',
    `${randomInt(2, 8)}+ years of professional experience in ${department}`,
    'Strong problem-solving and analytical skills',
    'Excellent communication and teamwork abilities',
    'Proven track record of successful project delivery',
    'Self-motivated with strong attention to detail',
    'Ability to work independently and in team environments',
    'Strong work ethic and professional integrity',
    'Experience working in fast-paced environments',
    'Commitment to continuous learning and improvement'
  ];
  
  const technicalSkills = {
    'Software Development': [
      'Proficiency in modern programming languages',
      'Experience with version control systems (Git)',
      'Understanding of software design patterns',
      'Knowledge of Agile/Scrum methodologies',
      'Experience with testing and debugging',
      'Familiarity with CI/CD practices'
    ],
    'Data Analytics': [
      'Strong statistical analysis skills',
      'Proficiency in data visualization tools',
      'Experience with SQL and databases',
      'Knowledge of Python or R for data analysis',
      'Understanding of business intelligence concepts',
      'Ability to translate data into actionable insights'
    ],
    'Graphics Design': [
      'Expertise in Adobe Creative Suite',
      'Strong portfolio of design work',
      'Understanding of design principles and typography',
      'Experience with both print and digital design',
      'Ability to work within brand guidelines',
      'Strong attention to visual details'
    ],
    'Hardware Installation': [
      'Hands-on experience with computer hardware',
      'Knowledge of networking equipment and cabling',
      'Troubleshooting and diagnostic skills',
      'Understanding of safety protocols',
      'Ability to read technical documentation',
      'Physical ability to lift and install equipment'
    ],
    'IT Training': [
      'Strong presentation and teaching skills',
      'Ability to explain technical concepts clearly',
      'Experience developing training materials',
      'Patience and adaptability to different learning styles',
      'Knowledge of adult learning principles',
      'Assessment and evaluation skills'
    ],
    'Networking & Security': [
      'Deep understanding of network protocols and security',
      'Experience with firewalls and security systems',
      'Knowledge of cybersecurity best practices',
      'Familiarity with network monitoring tools',
      'Understanding of risk assessment and mitigation',
      'Experience with incident response'
    ],
    'Smart Homes': [
      'Knowledge of IoT devices and protocols',
      'Experience with home automation systems',
      'Understanding of networking and wireless technologies',
      'Ability to configure and troubleshoot smart devices',
      'Knowledge of security considerations for smart homes',
      'Customer service and consultation skills'
    ]
  };
  
  const deptSkills = technicalSkills[department as keyof typeof technicalSkills] || [];
  const allRequirements = [...baseRequirements, ...deptSkills];
  
  // Return 5-7 random requirements
  const count = randomInt(5, 7);
  return allRequirements.sort(() => Math.random() - 0.5).slice(0, count);
}

function generateNiceToHave(): string[] {
  const nice = [
    'Master\'s degree in related field',
    'Relevant industry certifications',
    'Experience with Agile/Scrum methodologies',
    'Previous consulting or client-facing experience',
    'Open source contributions',
    'Speaking or teaching experience',
    'Multilingual abilities',
    'Experience working in Nigerian market',
    'International project experience',
    'Leadership or mentoring experience',
    'Published articles or technical blog',
    'Active participation in tech communities',
    'Experience with remote collaboration tools',
    'Cross-functional team experience'
  ];
  
  const count = randomInt(3, 5);
  return nice.sort(() => Math.random() - 0.5).slice(0, count);
}

function generateBenefits(): string[] {
  const allBenefits = [
    'Competitive salary with performance bonuses',
    'Comprehensive health insurance (HMO)',
    'Pension contribution above statutory minimum',
    'Flexible work arrangements and remote options',
    'Professional development and training budget',
    'Annual leave and paid holidays',
    'Modern equipment and tools provided',
    'Collaborative and supportive team environment',
    'Clear career growth and advancement opportunities',
    'Annual performance reviews with salary adjustments',
    'Transportation allowance',
    'Internet and communication allowance',
    'Relocation assistance (where applicable)',
    'Team building activities and events',
    'Access to industry conferences and workshops',
    'Mentorship programs'
  ];
  
  // Return 6-9 random benefits
  const count = randomInt(6, 9);
  return allBenefits.sort(() => Math.random() - 0.5).slice(0, count);
}

function generatePostedDate(): string {
  const daysAgo = randomInt(0, 180);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

async function seedJobs() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL not found');
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    console.log('Starting to seed 10,000 jobs...');
    console.log('This may take several minutes...\n');

    // Delete existing jobs first
    console.log('Clearing existing jobs...');
    await prisma.job.deleteMany({});
    console.log('✓ Existing jobs cleared\n');

    const BATCH_SIZE = 500;
    let totalCreated = 0;

    for (let batch = 0; batch < 20; batch++) {
      const jobs = [];
      
      for (let i = 0; i < BATCH_SIZE; i++) {
        const jobIndex = batch * BATCH_SIZE + i;
        const department = random(DEPARTMENTS); // Random department instead of cycling
        const titles = JOB_TITLES[department];
        const title = random(titles);
        
        // 70% active, 30% inactive
        const active = Math.random() < 0.7;
        
        // 10% featured
        const featured = Math.random() < 0.1;
        
        // Generate varied responsibilities
        const responsibilitiesPool = [
          'Lead and contribute to project planning and execution',
          'Collaborate with cross-functional teams to deliver solutions',
          'Maintain high code quality and best practices',
          'Mentor junior team members and share knowledge',
          'Stay current with industry trends and emerging technologies',
          'Participate in technical discussions and decision-making',
          'Document processes, solutions, and technical specifications',
          'Provide technical support and troubleshooting',
          'Conduct code reviews and ensure quality standards',
          'Implement security best practices and protocols',
          'Optimize performance and efficiency of solutions',
          'Communicate effectively with clients and stakeholders',
          'Contribute to continuous improvement initiatives',
          'Manage project timelines and deliverables',
          'Research and evaluate new tools and technologies'
        ];
        
        const responsibilities = responsibilitiesPool
          .sort(() => Math.random() - 0.5)
          .slice(0, randomInt(4, 6));

        jobs.push({
          slug: generateSlug(title, jobIndex + 1),
          title: title,
          location: random(LOCATIONS),
          workType: random(WORK_TYPES),
          employmentType: random(EMPLOYMENT_TYPES),
          department: department,
          summary: `Join our ${department} team as a ${title}. We're looking for talented professionals to help deliver exceptional technology solutions to businesses across Nigeria and beyond.`,
          description: generateJobDescription(department, title),
          responsibilities: responsibilities,
          mustHave: generateMustHave(department),
          niceToHave: generateNiceToHave(),
          benefits: generateBenefits(),
          salaryRange: getSalaryRange(title),
          postedDate: generatePostedDate(),
          featured: featured,
          active: active
        });
      }

      // Insert batch
      await prisma.job.createMany({
        data: jobs,
        skipDuplicates: true
      });

      totalCreated += jobs.length;
      const progress = ((totalCreated / 10000) * 100).toFixed(1);
      console.log(`✓ Created ${totalCreated}/10,000 jobs (${progress}%)`);
    }

    // Get statistics
    const stats = await prisma.$queryRaw<Array<{ 
      department: string; 
      active_count: bigint;
      inactive_count: bigint;
      featured_count: bigint;
    }>>`
      SELECT 
        department,
        COUNT(*) FILTER (WHERE active = true) as active_count,
        COUNT(*) FILTER (WHERE active = false) as inactive_count,
        COUNT(*) FILTER (WHERE featured = true) as featured_count
      FROM jobs
      GROUP BY department
      ORDER BY department
    `;

    console.log('\n✅ Successfully seeded 10,000 jobs!\n');
    console.log('📊 Statistics by Department:');
    console.log('═'.repeat(80));
    
    let totalActive = 0;
    let totalInactive = 0;
    let totalFeatured = 0;
    
    stats.forEach((stat) => {
      const active = Number(stat.active_count);
      const inactive = Number(stat.inactive_count);
      const featured = Number(stat.featured_count);
      
      totalActive += active;
      totalInactive += inactive;
      totalFeatured += featured;
      
      console.log(`${stat.department.padEnd(30)} | Active: ${String(active).padStart(5)} | Inactive: ${String(inactive).padStart(5)} | Featured: ${String(featured).padStart(4)}`);
    });
    
    console.log('═'.repeat(80));
    console.log(`${'TOTAL'.padEnd(30)} | Active: ${String(totalActive).padStart(5)} | Inactive: ${String(totalInactive).padStart(5)} | Featured: ${String(totalFeatured).padStart(4)}`);
    console.log('\n');

  } catch (error) {
    console.error('Error seeding jobs:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

seedJobs()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
