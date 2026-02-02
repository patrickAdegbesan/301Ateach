// Migration script to copy existing jobs to Firestore
import { db } from '../lib/firebase-admin';
import { collection, addDoc, doc, setDoc } from 'firebase-admin/firestore';

// Original jobs data
const jobs = [
  {
    slug: "senior-software-developer",
    title: "Senior Software Developer",
    location: "London, UK",
    workType: "Hybrid",
    employmentType: "Full-time",
    department: "Engineering",
    summary: "We're seeking an experienced software developer to join our growing engineering team. You'll work on cutting-edge projects, mentor junior developers, and help shape our technical direction.",
    responsibilities: [
      "Design, develop, and maintain scalable web applications",
      "Lead technical discussions and architectural decisions",
      "Mentor junior developers and conduct code reviews",
      "Collaborate with product managers and designers",
      "Contribute to technical documentation and best practices",
      "Participate in agile ceremonies and sprint planning"
    ],
    requirements: {
      mustHave: [
        "5+ years of professional software development experience",
        "Strong proficiency in TypeScript, React, and Node.js",
        "Experience with modern web frameworks (Next.js, Express)",
        "Solid understanding of database design (PostgreSQL, MongoDB)",
        "Experience with Git, CI/CD, and cloud platforms (AWS/Azure)",
        "Excellent problem-solving and communication skills"
      ],
      niceToHave: [
        "Experience with microservices architecture",
        "Knowledge of containerization (Docker, Kubernetes)",
        "Contributions to open-source projects",
        "Experience leading technical projects",
        "Background in startup or fast-paced environments"
      ]
    },
    benefits: [
      "Competitive salary with performance bonuses",
      "Flexible hybrid working (2-3 days in office)",
      "25 days annual leave + bank holidays",
      "Professional development budget (£2,000/year)",
      "Health insurance and pension scheme",
      "Modern tech stack and tools",
      "Regular team events and learning sessions"
    ],
    salaryRange: "£55,000 - £75,000",
    postedDate: "2025-01-15",
    featured: true
  },
  {
    slug: "it-support-specialist",
    title: "IT Support Specialist",
    location: "Manchester, UK",
    workType: "On-site",
    employmentType: "Full-time",
    department: "IT Operations",
    summary: "Join our IT support team to provide technical assistance and support to our staff. You will troubleshoot hardware and software issues, maintain IT infrastructure, and ensure smooth operations.",
    responsibilities: [
      "Provide first and second-line technical support to employees",
      "Troubleshoot hardware, software, and network issues",
      "Install, configure, and maintain computer systems and equipment",
      "Maintain IT documentation and asset inventory",
      "Assist with IT security and backup procedures"
    ],
    requirements: {
      mustHave: [
        "2+ years of IT support experience",
        "Strong knowledge of Windows and macOS operating systems",
        "Understanding of networking fundamentals",
        "Excellent customer service and communication skills",
        "Ability to work under pressure and prioritize tasks"
      ],
      niceToHave: [
        "CompTIA A+ or similar certification",
        "Experience with Active Directory and Office 365",
        "Knowledge of ITIL framework",
        "Basic scripting skills (PowerShell, Bash)"
      ]
    },
    benefits: [
      "Competitive salary",
      "On-site gym and wellness programs",
      "Employee discount schemes",
      "23 days holiday plus bank holidays",
      "Training and certification opportunities"
    ],
    salaryRange: "£28,000 - £38,000",
    postedDate: "2025-01-18",
    featured: false
  },
  {
    slug: "junior-network-engineer",
    title: "Junior Network Engineer",
    location: "Birmingham, UK",
    workType: "On-site",
    employmentType: "Full-time",
    department: "Network Infrastructure",
    summary: "An exciting opportunity for a junior network engineer to gain hands-on experience with enterprise networking technologies. You will work alongside senior engineers to design, implement, and maintain network infrastructure.",
    responsibilities: [
      "Assist in configuring and maintaining network equipment",
      "Monitor network performance and troubleshoot connectivity issues",
      "Support network security initiatives",
      "Document network configurations and procedures",
      "Participate in network upgrade projects"
    ],
    requirements: {
      mustHave: [
        "Basic understanding of networking concepts (TCP/IP, DNS, DHCP)",
        "Knowledge of routing and switching fundamentals",
        "Strong analytical and problem-solving skills",
        "Willingness to learn and develop technical skills",
        "Good communication and teamwork abilities"
      ],
      niceToHave: [
        "CCNA certification or working towards it",
        "Experience with Cisco or similar network equipment",
        "Understanding of network security principles",
        "Exposure to virtualization technologies"
      ]
    },
    benefits: [
      "Competitive starting salary with regular reviews",
      "Structured training and mentorship program",
      "Certification sponsorship (CCNA, CCNP)",
      "22 days holiday plus bank holidays",
      "Career progression opportunities"
    ],
    salaryRange: "£24,000 - £32,000",
    postedDate: "2025-01-20",
    featured: false
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    location: "Remote (UK)",
    workType: "Remote",
    employmentType: "Full-time",
    department: "Analytics",
    summary: "We are seeking a skilled Data Analyst to transform data into actionable insights. You will work with stakeholders across the business to analyze trends, create reports, and support data-driven decision making.",
    responsibilities: [
      "Analyze complex datasets to identify trends and patterns",
      "Create dashboards and visualizations for business stakeholders",
      "Develop and maintain automated reporting solutions",
      "Collaborate with teams to define data requirements",
      "Present findings and recommendations to senior management"
    ],
    requirements: {
      mustHave: [
        "3+ years of data analysis experience",
        "Proficiency in SQL and data querying",
        "Experience with data visualization tools (Tableau, Power BI)",
        "Strong statistical analysis skills",
        "Excellent communication and presentation abilities"
      ],
      niceToHave: [
        "Programming skills in Python or R",
        "Experience with big data technologies",
        "Knowledge of machine learning concepts",
        "Background in statistics or related field"
      ]
    },
    benefits: [
      "Fully remote working arrangement",
      "Competitive salary with performance bonuses",
      "Home office setup allowance",
      "25 days holiday plus bank holidays",
      "Professional development opportunities",
      "Modern tools and technologies"
    ],
    salaryRange: "£38,000 - £52,000",
    postedDate: "2025-01-22",
    featured: true
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    location: "London, UK",
    workType: "Hybrid",
    employmentType: "Full-time",
    department: "Creative",
    summary: "Join our creative team as a Graphic Designer to produce stunning visual content across digital and print media. You will work on diverse projects from branding to marketing campaigns.",
    responsibilities: [
      "Design engaging graphics for digital and print media",
      "Create brand assets and maintain visual consistency",
      "Collaborate with marketing team on campaign materials",
      "Develop concepts and present design solutions",
      "Manage multiple projects and meet deadlines"
    ],
    requirements: {
      mustHave: [
        "3+ years of professional graphic design experience",
        "Expert proficiency in Adobe Creative Suite",
        "Strong portfolio demonstrating creative work",
        "Understanding of design principles and typography",
        "Ability to work independently and in team settings"
      ],
      niceToHave: [
        "Experience with motion graphics and video editing",
        "Web design skills (Figma, Sketch)",
        "Knowledge of UX/UI design principles",
        "Photography or illustration skills"
      ]
    },
    benefits: [
      "Competitive salary",
      "Hybrid working (3 days in office)",
      "Creative studio environment",
      "Latest design software and equipment",
      "24 days holiday plus bank holidays",
      "Professional development and courses"
    ],
    salaryRange: "£32,000 - £45,000",
    postedDate: "2025-01-25",
    featured: true
  }
];

async function migrateJobs() {
  console.log('Starting job migration to Firestore...');
  
  try {
    const jobsCollection = collection(db, 'jobs');
    
    for (const job of jobs) {
      await addDoc(jobsCollection, job);
      console.log(`✓ Migrated: ${job.title}`);
    }
    
    console.log('\n✅ Migration complete! All jobs have been added to Firestore.');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

// Run migration
migrateJobs();
