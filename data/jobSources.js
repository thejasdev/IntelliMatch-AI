/**
 * Job Sources & Future Backend Connector Architecture — IntelliMatch AI
 * Centralized registry of supported job sources, honest status labels,
 * external search URL builders, and sample multi-domain job listings.
 */

export const JOB_SOURCES = [
  {
    id: "linkedin",
    name: "LinkedIn Jobs",
    status: "Open Search",
    statusType: "open-search",
    description: "Launches verified external search queries on LinkedIn with URL-encoded role and location parameters.",
    buildSearchUrl: (query, location) => {
      const q = encodeURIComponent(query || "Software Engineer");
      const loc = encodeURIComponent(location || "Remote");
      return `https://www.linkedin.com/jobs/search/?keywords=${q}&location=${loc}`;
    }
  },
  {
    id: "naukri",
    name: "Naukri",
    status: "Open Search",
    statusType: "open-search",
    description: "Direct external queries across Indian and regional technology hubs with keyword filtering.",
    buildSearchUrl: (query, location) => {
      const q = encodeURIComponent(query || "Engineering");
      const loc = encodeURIComponent(location || "India");
      return `https://www.naukri.com/jobs-in-india?keywords=${q}&location=${loc}`;
    }
  },
  {
    id: "internshala",
    name: "Internshala",
    status: "Open Search",
    statusType: "open-search",
    description: "External discovery for student internships, junior developer trainee roles, and graduate programs.",
    buildSearchUrl: (query, location) => {
      const cleanQ = (query || "computer-science").toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return `https://internshala.com/jobs/keywords-${encodeURIComponent(cleanQ)}/`;
    }
  },
  {
    id: "company-careers",
    name: "Company Career Portals (Workday / Greenhouse)",
    status: "Setup Required",
    statusType: "setup",
    description: "Requires direct ATS partner API keys, webhook feeds, or enterprise Greenhouse/Lever authorization on FastAPI backend.",
    buildSearchUrl: (query, location) => {
      const q = encodeURIComponent(`${query || "Software Engineer"} careers ${location || ""}`);
      return `https://www.google.com/search?q=${q}`;
    }
  },
  {
    id: "curated-benchmarks",
    name: "Curated Multi-Domain Benchmarks",
    status: "Demo",
    statusType: "demo",
    description: "Locally curated engineering descriptions designed to benchmark resume compatibility without API credentials.",
    buildSearchUrl: null
  }
];

export const SAMPLE_MULTI_DOMAIN_JOBS = [
  {
    id: "job-sw-1",
    title: "Senior Full-Stack Software Engineer",
    company: "Apex Digital Systems",
    domainId: "software-dev",
    roleId: "sw-fullstack",
    location: "San Francisco, CA (Remote)",
    arrangement: "Remote",
    experienceLevel: "Senior",
    jobType: "Full-Time",
    sourcePlatform: "Curated Benchmark (Demo)",
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "REST APIs"],
    snippet: "Design and implement high-availability microservices and responsive web applications for enterprise clients.",
    fullDescription: `Senior Full-Stack Software Engineer at Apex Digital Systems
Location: San Francisco, CA (Remote) • Full-Time • Senior Level
Domain: Software Development

Key Responsibilities:
- Architect, implement, and maintain responsive React/TypeScript frontends and Node.js microservices.
- Optimize relational database schemas, indexing, and connection pools in PostgreSQL.
- Lead sprint planning and mentor junior engineers through code reviews and architecture sessions.

Required Qualifications:
- 5+ years of full-stack engineering experience with modern JavaScript / TypeScript.
- Strong knowledge of microservice design patterns, Docker containerization, and RESTful APIs.
- Experience writing comprehensive unit and integration test suites.`
  },
  {
    id: "job-ai-1",
    title: "Machine Learning & AI Engineer",
    company: "Neural Horizons AI Labs",
    domainId: "ai-ml",
    roleId: "ai-mle",
    location: "Boston, MA (Hybrid)",
    arrangement: "Hybrid",
    experienceLevel: "Mid-Level",
    jobType: "Full-Time",
    sourcePlatform: "Curated Benchmark (Demo)",
    skills: ["Python", "PyTorch", "Transformers", "LLMs", "Vector DBs", "FastAPI"],
    snippet: "Build production generative AI models, contextual retrieval systems, and semantic embedding pipelines.",
    fullDescription: `Machine Learning & AI Engineer at Neural Horizons AI Labs
Location: Boston, MA (Hybrid) • Full-Time • Mid-Level
Domain: AI and Machine Learning

Key Responsibilities:
- Develop and deploy retrieval-augmented generation (RAG) pipelines and vector similarity indexes.
- Fine-tune Transformer models for domain-specific classification and summarization tasks.
- Build low-latency model inference endpoints with FastAPI and Triton Inference Server.

Required Qualifications:
- 3+ years experience with Python, PyTorch, Hugging Face Transformers, and vector databases.
- Familiarity with MLOps best practices, Docker, and GPU model optimization.`
  },
  {
    id: "job-cloud-1",
    title: "Cloud Infrastructure & DevOps Engineer",
    company: "Stratus Cloud Networks",
    domainId: "cloud-devops",
    roleId: "cloud-devops-role",
    location: "Austin, TX (Remote)",
    arrangement: "Remote",
    experienceLevel: "Mid-Level",
    jobType: "Full-Time",
    sourcePlatform: "Curated Benchmark (Demo)",
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Linux", "Prometheus"],
    snippet: "Manage multi-region Kubernetes clusters, automated GitOps delivery pipelines, and cloud observability.",
    fullDescription: `Cloud Infrastructure & DevOps Engineer at Stratus Cloud Networks
Location: Austin, TX (Remote) • Full-Time • Mid-Level
Domain: Cloud, DevOps and Infrastructure

Key Responsibilities:
- Maintain AWS multi-region EKS clusters, VPC networking, and IAM security boundaries.
- Automate zero-downtime application deployments with GitHub Actions and ArgoCD.
- Monitor system health, configure Prometheus/Grafana metrics, and participate in on-call rotation.

Required Qualifications:
- 3+ years DevOps or SRE experience managing AWS and Kubernetes environments.
- Strong proficiency with Terraform (Infrastructure as Code) and Linux administration.`
  },
  {
    id: "job-sec-1",
    title: "Cybersecurity & SOC Operations Analyst",
    company: "Vanguard Defense Corp",
    domainId: "cybersecurity",
    roleId: "sec-analyst",
    location: "Washington, DC (On-Site)",
    arrangement: "On-Site",
    experienceLevel: "Entry-Level",
    jobType: "Full-Time",
    sourcePlatform: "Curated Benchmark (Demo)",
    skills: ["SIEM (Splunk)", "Threat Analysis", "Incident Response", "Network Security", "Wireshark"],
    snippet: "Investigate security alerts, evaluate threat indicators, and coordinate incident remediation.",
    fullDescription: `Cybersecurity & SOC Operations Analyst at Vanguard Defense Corp
Location: Washington, DC (On-Site) • Full-Time • Entry to Mid Level
Domain: Cybersecurity

Key Responsibilities:
- Triage real-time alerts within Splunk SIEM, investigate potential intrusions, and isolate affected assets.
- Conduct regular vulnerability scans and coordinate patching schedules with engineering teams.
- Document incident reports, audit logs, and maintain playbooks for SOC tier-1 and tier-2 escalation.

Required Qualifications:
- Degree in Cybersecurity, Computer Science, or equivalent certification (Security+, CEH, CySA+).
- Familiarity with network protocols, Windows/Linux event logs, and the MITRE ATT&CK framework.`
  },
  {
    id: "job-da-1",
    title: "Data Analyst & Business Intelligence Specialist",
    company: "Metric Stream Analytics",
    domainId: "data-analytics",
    roleId: "da-analyst",
    location: "Chicago, IL (Hybrid)",
    arrangement: "Hybrid",
    experienceLevel: "Mid-Level",
    jobType: "Full-Time",
    sourcePlatform: "Curated Benchmark (Demo)",
    skills: ["SQL", "Power BI", "Tableau", "Python", "Data Modeling", "Excel"],
    snippet: "Create automated operational dashboards and translate transactional datasets into executive insights.",
    fullDescription: `Data Analyst & Business Intelligence Specialist at Metric Stream Analytics
Location: Chicago, IL (Hybrid) • Full-Time • Mid-Level
Domain: Data and Analytics

Key Responsibilities:
- Query multi-terabyte data warehouses using complex SQL joins, CTEs, and window functions.
- Design interactive, automated executive dashboards in Power BI and Tableau.
- Perform statistical analysis and A/B test evaluation to inform growth decisions.

Required Qualifications:
- 2+ years of professional data analytics experience.
- Advanced SQL proficiency and hands-on expertise with Power BI or Tableau.`
  },
  {
    id: "job-emb-1",
    title: "Embedded Firmware & IoT Engineer",
    company: "SensorTech Innovations",
    domainId: "embedded-systems",
    roleId: "emb-firmware",
    location: "San Jose, CA (On-Site)",
    arrangement: "On-Site",
    experienceLevel: "Mid-Level",
    jobType: "Full-Time",
    sourcePlatform: "Curated Benchmark (Demo)",
    skills: ["Embedded C/C++", "FreeRTOS", "ARM Cortex", "SPI/I2C", "MQTT", "Hardware Debugging"],
    snippet: "Develop firmware for battery-powered IoT smart sensors and interface with hardware communication buses.",
    fullDescription: `Embedded Firmware & IoT Engineer at SensorTech Innovations
Location: San Jose, CA (On-Site) • Full-Time • Mid-Level
Domain: Embedded Systems and Electronics

Key Responsibilities:
- Develop production firmware in C and C++ for ARM Cortex-M microcontrollers using FreeRTOS.
- Interface with external sensors and wireless transceivers using I2C, SPI, UART, and BLE.
- Debug hardware prototypes using logic analyzers, oscilloscopes, and JTAG emulators.

Required Qualifications:
- B.S. in Electrical Engineering, Computer Engineering, or related discipline.
- 3+ years experience developing bare-metal or RTOS embedded firmware.`
  },
  {
    id: "job-qa-1",
    title: "Software Test Engineer (SDET)",
    company: "Reliability Lab Works",
    domainId: "qa-testing",
    roleId: "qa-sdet",
    location: "Seattle, WA (Remote)",
    arrangement: "Remote",
    experienceLevel: "Graduate / Entry-Level",
    jobType: "Full-Time",
    sourcePlatform: "Curated Benchmark (Demo)",
    skills: ["Playwright", "Selenium", "Python", "API Testing", "CI/CD", "Docker"],
    snippet: "Build automated test suites for end-to-end regression testing and integrate with continuous delivery.",
    fullDescription: `Software Test Engineer (SDET) at Reliability Lab Works
Location: Seattle, WA (Remote) • Full-Time • Entry to Mid Level
Domain: Testing and Quality Assurance

Key Responsibilities:
- Design and execute automated test scripts using Python, Playwright, and Postman.
- Integrate automated regression runs into continuous integration pipelines.
- Collaborate with developers to reproduce defects and define acceptance criteria.

Required Qualifications:
- B.S. in Computer Science or demonstrated test automation portfolio.
- Proficiency in Python or JavaScript and experience testing REST APIs.`
  },
  {
    id: "job-intern-1",
    title: "Software Engineering Intern (Summer 2027)",
    company: "FutureTech Campus Labs",
    domainId: "software-dev",
    roleId: "sw-dev",
    location: "New York, NY (Hybrid)",
    arrangement: "Hybrid",
    experienceLevel: "Internship",
    jobType: "Internship",
    sourcePlatform: "Curated Benchmark (Demo)",
    skills: ["Java", "Python", "Data Structures", "Algorithms", "Git"],
    snippet: "Join our core engineering squad for a hands-on summer internship building customer-facing features.",
    fullDescription: `Software Engineering Intern at FutureTech Campus Labs
Location: New York, NY (Hybrid) • Internship • Summer 2027
Domain: Software Development

Key Responsibilities:
- Pair with senior engineers to implement client feature tickets and bug fixes.
- Participate in agile standups, code reviews, and technical workshops.
- Present a final engineering project to engineering leadership.

Required Qualifications:
- Currently enrolled in a B.S. or M.S. in Computer Science, Software Engineering, or related field.
- Solid understanding of data structures, algorithms, and version control (Git).`
  }
];

/**
 * Backend Connector Architecture Blueprint (Python/FastAPI Reference)
 *
 * Potential Provider Interface for Phase 2:
 *
 * class BaseJobProvider(ABC):
 *     @abstractmethod
 *     async def search_jobs(self, query: str, location: str, filters: dict) -> list[dict]:
 *         pass
 *
 *     @abstractmethod
 *     def normalize_job(self, source_record: dict) -> NormalizedJob:
 *         pass
 *
 *     @abstractmethod
 *     def get_application_url(self, normalized_job: NormalizedJob) -> str:
 *         pass
 */

