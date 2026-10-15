/**
 * Curated Project Repository — Project Lab
 * Real-world engineering project blueprints categorized by Domain and Difficulty
 * (Beginner, Intermediate, Advanced) with concrete deliverables and architecture goals.
 */

export const CURATED_PROJECTS = [
  // --- Software Development ---
  {
    id: "proj-sw-1",
    title: "Client-Side Task & Habit Analytics Tracker",
    domain: "Software Development",
    domainId: "software-dev",
    difficulty: "Beginner",
    difficultyBadge: "badge-success",
    skills: ["HTML5", "CSS3 Flex/Grid", "JavaScript ES6+", "Local Storage API", "DOM"],
    deliverable: "A fully responsive task manager with zero third-party dependencies, featuring category filtering, persistence, and weekly completion trend charts.",
    prerequisites: "Basic JavaScript variables, event listeners, and CSS layout models.",
    estimatedHours: "15–20 Hours",
    highlights: "Demonstrates foundational JavaScript mechanics without framework reliance."
  },
  {
    id: "proj-sw-2",
    title: "Full-Stack Collaborative Issue Board (Kanban)",
    domain: "Software Development",
    domainId: "software-dev",
    difficulty: "Intermediate",
    difficultyBadge: "badge-warning",
    skills: ["React / TypeScript", "Node.js (Express)", "PostgreSQL", "JWT Auth", "REST APIs"],
    deliverable: "A multi-user issue tracking board with drag-and-drop state transitions, secure role-based authorization, and schema-validated PostgreSQL endpoints.",
    prerequisites: "React component lifecycles, relational database schema design, and asynchronous JS.",
    estimatedHours: "35–45 Hours",
    highlights: "Essential portfolio project showcasing full-stack CRUD, auth, and database transactions."
  },
  {
    id: "proj-sw-3",
    title: "High-Throughput Distributed URL Shortener & Analytics",
    domain: "Software Development",
    domainId: "software-dev",
    difficulty: "Advanced",
    difficultyBadge: "badge-purple",
    skills: ["Go / Python FastAPI", "Redis Caching", "PostgreSQL", "Docker", "Rate Limiting", "CI/CD"],
    deliverable: "A high-performance URL shortening service capable of handling 5,000+ RPS with sub-15ms p95 latency, Redis caching, Bloom filters, and automated metrics.",
    prerequisites: "Concurrent programming, in-memory caching patterns, and containerized deployment.",
    estimatedHours: "50–60 Hours",
    highlights: "Senior-level systems design demonstration with benchmarks and load-testing proof."
  },

  // --- Data and Analytics ---
  {
    id: "proj-da-1",
    title: "Ecommerce Customer Cohort & Churn Exploration",
    domain: "Data and Analytics",
    domainId: "data-analytics",
    difficulty: "Beginner",
    difficultyBadge: "badge-success",
    skills: ["Python", "Pandas", "Matplotlib / Seaborn", "Descriptive Statistics", "Data Cleaning"],
    deliverable: "An exploratory analysis notebook identifying customer purchasing frequencies, retention drop-offs, and visual cohort retention heatmaps.",
    prerequisites: "Basic Python data structures and Pandas dataframe indexing.",
    estimatedHours: "15–20 Hours",
    highlights: "Translates raw transactional records into actionable business insights."
  },
  {
    id: "proj-da-2",
    title: "Automated Executive Sales KPI Dashboard & Data Mart",
    domain: "Data and Analytics",
    domainId: "data-analytics",
    difficulty: "Intermediate",
    difficultyBadge: "badge-warning",
    skills: ["SQL (Window Functions)", "Power BI / Tableau", "dbt", "Snowflake", "Dimensional Modeling"],
    deliverable: "A star-schema dimensional model built with dbt, connected to an interactive Power BI dashboard tracking revenue variances and customer LTV.",
    prerequisites: "Complex SQL joins, CTEs, and business metrics definitions.",
    estimatedHours: "30–40 Hours",
    highlights: "Demonstrates modern analytics engineering workflows used in tech companies."
  },
  {
    id: "proj-da-3",
    title: "End-to-End Retail Demand Forecasting Pipeline",
    domain: "Data and Analytics",
    domainId: "data-analytics",
    difficulty: "Advanced",
    difficultyBadge: "badge-purple",
    skills: ["Python", "Prophet / LightGBM", "Apache Airflow", "Docker", "Feature Store", "Streamlit"],
    deliverable: "An automated batch pipeline orchestrating weekly retail demand forecasting with anomaly detection, model drift alerts, and a Streamlit dashboard.",
    prerequisites: "Time series fundamentals, workflow scheduling, and Docker containerization.",
    estimatedHours: "50–65 Hours",
    highlights: "Production-grade analytical engineering connecting scheduled orchestration to UI."
  },

  // --- AI and Machine Learning ---
  {
    id: "proj-ai-1",
    title: "Handwritten Digit Classifier with Visual Explanation",
    domain: "AI and Machine Learning",
    domainId: "ai-ml",
    difficulty: "Beginner",
    difficultyBadge: "badge-success",
    skills: ["Python", "PyTorch", "CNNs", "Model Evaluation", "Confusion Matrix"],
    deliverable: "A Convolutional Neural Network trained on MNIST with Grad-CAM heatmap visualization highlighting which pixels influenced model prediction.",
    prerequisites: "PyTorch tensor operations and basic neural network concepts.",
    estimatedHours: "20–25 Hours",
    highlights: "Demystifies black-box neural networks with visual explainability."
  },
  {
    id: "proj-ai-2",
    title: "Domain Technical Document Q&A with Vector RAG",
    domain: "AI and Machine Learning",
    domainId: "ai-ml",
    difficulty: "Intermediate",
    difficultyBadge: "badge-warning",
    skills: ["Python", "LangChain / LlamaIndex", "Sentence-Transformers", "Chroma DB", "FastAPI"],
    deliverable: "A retrieval-augmented generation service that chunks, embeds, and indexes engineering documentation into a vector store to answer domain queries.",
    prerequisites: "NLP embeddings, vector similarity search, and prompt engineering.",
    estimatedHours: "35–45 Hours",
    highlights: "Practical implementation of modern generative AI search architectures."
  },
  {
    id: "proj-ai-3",
    title: "Production Low-Latency Transformer Serving & MLOps",
    domain: "AI and Machine Learning",
    domainId: "ai-ml",
    difficulty: "Advanced",
    difficultyBadge: "badge-purple",
    skills: ["Hugging Face", "ONNX Runtime", "Triton Server", "Docker", "Prometheus", "MLflow"],
    deliverable: "A fine-tuned language model quantized with ONNX Runtime, served via FastAPI and Triton with GPU memory optimization and Prometheus latency metrics.",
    prerequisites: "Transformer architectures, model quantization, and container orchestration.",
    estimatedHours: "55–70 Hours",
    highlights: "Distinguishes model prototypers from production machine learning engineers."
  },

  // --- Cloud, DevOps and Infrastructure ---
  {
    id: "proj-cloud-1",
    title: "Automated Linux Server Hardening & Backup Daemon",
    domain: "Cloud, DevOps and Infrastructure",
    domainId: "cloud-devops",
    difficulty: "Beginner",
    difficultyBadge: "badge-success",
    skills: ["Linux (Ubuntu)", "Bash Scripting", "Cron Jobs", "SSH Keys", "Systemd"],
    deliverable: "A modular bash utility suite configuring SSH root login locks, automated firewall rules, system health audits, and encrypted offsite backups.",
    prerequisites: "Basic Linux terminal commands and text editors (Vim/Nano).",
    estimatedHours: "15–20 Hours",
    highlights: "Builds core systems administration and automation discipline."
  },
  {
    id: "proj-cloud-2",
    title: "Multi-Tier Cloud Infrastructure as Code with Terraform",
    domain: "Cloud, DevOps and Infrastructure",
    domainId: "cloud-devops",
    difficulty: "Intermediate",
    difficultyBadge: "badge-warning",
    skills: ["AWS (VPC, EC2, RDS, S3)", "Terraform HCL", "State Locking", "Security Groups"],
    deliverable: "A modular Terraform repository provisioning a private/public multi-AZ VPC, autoscaled compute clusters, and an encrypted RDS PostgreSQL database.",
    prerequisites: "AWS networking fundamentals and declarative infrastructure concepts.",
    estimatedHours: "30–40 Hours",
    highlights: "Enterprise-standard infrastructure provisioning with zero manual click-ops."
  },
  {
    id: "proj-cloud-3",
    title: "GitOps Kubernetes Cluster with Automated Canary Releases",
    domain: "Cloud, DevOps and Infrastructure",
    domainId: "cloud-devops",
    difficulty: "Advanced",
    difficultyBadge: "badge-purple",
    skills: ["Kubernetes", "Helm", "ArgoCD", "GitHub Actions", "Prometheus", "Istio"],
    deliverable: "A multi-node Kubernetes cluster configured with ArgoCD GitOps sync, automated image vulnerability gating, and canary traffic shifting using Istio.",
    prerequisites: "Container orchestration, ingress controllers, and continuous deployment workflows.",
    estimatedHours: "55–70 Hours",
    highlights: "Premier SRE portfolio piece implementing zero-downtime progressive delivery."
  },

  // --- Cybersecurity ---
  {
    id: "proj-sec-1",
    title: "Network Port Scanner & Vulnerability Inspector",
    domain: "Cybersecurity",
    domainId: "cybersecurity",
    difficulty: "Beginner",
    difficultyBadge: "badge-success",
    skills: ["Python Sockets", "TCP/IP Handshake", "Banner Grabbing", "Security Reporting"],
    deliverable: "A multi-threaded Python network scanner that audits target subnets for exposed ports, identifies running service banners, and flags insecure protocols.",
    prerequisites: "Basic Python programming and TCP port numbers knowledge.",
    estimatedHours: "15–20 Hours",
    highlights: "Reinforces network protocol fundamentals and offensive security basics."
  },
  {
    id: "proj-sec-2",
    title: "SIEM Threat Detection & Incident Triage Lab",
    domain: "Cybersecurity",
    domainId: "cybersecurity",
    difficulty: "Intermediate",
    difficultyBadge: "badge-warning",
    skills: ["Splunk / Elastic SIEM", "Syslog Analysis", "Brute Force Detection", "MITRE ATT&CK"],
    deliverable: "A configured SIEM pipeline ingesting authentication logs, with correlated alerts for credential stuffing, lateral movement, and privilege escalation.",
    prerequisites: "Operating system event logs and search query syntax.",
    estimatedHours: "30–40 Hours",
    highlights: "Directly mimics daily responsibilities of a tier-1 / tier-2 SOC Analyst."
  },
  {
    id: "proj-sec-3",
    title: "Automated DevSecOps Pipeline with SAST, DAST & Secrets Gating",
    domain: "Cybersecurity",
    domainId: "cybersecurity",
    difficulty: "Advanced",
    difficultyBadge: "badge-purple",
    skills: ["GitHub Actions", "Semgrep (SAST)", "OWASP ZAP (DAST)", "Trivy", "TruffleHog"],
    deliverable: "A comprehensive security pipeline that blocks pull requests containing hardcoded credentials, known vulnerable dependencies, or dynamic OWASP vulnerabilities.",
    prerequisites: "CI/CD pipelines, application security principles, and container scanning.",
    estimatedHours: "45–60 Hours",
    highlights: "Demonstrates practical shift-left security governance in software engineering."
  }
];

export function getProjectsByFilter(domainId = "all", difficulty = "all") {
  return CURATED_PROJECTS.filter((proj) => {
    const matchDomain = domainId === "all" || proj.domainId === domainId;
    const matchDiff = difficulty === "all" || proj.difficulty.toLowerCase() === difficulty.toLowerCase();
    return matchDomain && matchDiff;
  });
}

