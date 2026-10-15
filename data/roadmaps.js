/**
 * Centralized Learning Roadmaps Curriculum — IntelliMatch AI
 * Structured, non-linear milestone roadmaps for engineering students and freshers
 * spanning Year 1 (Foundations) to Year 4 (Career & Production Ready).
 */

export const ROADMAP_YEARS = [
  { id: "year-1", label: "Year 1: Foundations", stage: "Foundations", badge: "Stage 1" },
  { id: "year-2", label: "Year 2: Core Competencies", stage: "Core Skills", badge: "Stage 2" },
  { id: "year-3", label: "Year 3: Applied Projects", stage: "Applied Systems", badge: "Stage 3" },
  { id: "year-4", label: "Year 4: Career Ready", stage: "Production & Career", badge: "Stage 4" },
];

export const ROADMAP_DOMAINS = [
  {
    id: "software-dev",
    name: "Software Engineering & Full Stack",
    icon: "code",
    overview: "Build reliable, scalable full-stack applications from data structures up to production microservices.",
    years: {
      "year-1": [
        {
          id: "sw-y1-1",
          title: "Programming Fundamentals & Data Structures",
          description: "Master a core language (Python, Java, or C++) and fundamental data structures: arrays, linked lists, trees, hash tables, and sorting algorithms.",
          skills: ["Python / Java", "Time Complexity (Big-O)", "Data Structures", "Recursion"],
          task: "Implement basic search, tree traversals, and dynamic programming algorithms on LeetCode/HackerRank.",
          timeframe: "Semester 1 • 6–8 Weeks"
        },
        {
          id: "sw-y1-2",
          title: "Version Control & Command Line Mastery",
          description: "Understand Linux terminal fundamentals, Git workflows, branches, merge conflict resolution, and collaborative GitHub repositories.",
          skills: ["Git & GitHub", "Bash / Shell", "CLI Tooling", "SSH & Markdown"],
          task: "Create a GitHub profile with automated README updates and contribute to a public open-source repository.",
          timeframe: "Semester 2 • 3–4 Weeks"
        },
        {
          id: "sw-y1-3",
          title: "Web Basics & Introductory Mini-Project",
          description: "Understand the fundamentals of how the web works: HTTP requests, semantic HTML5, CSS responsive layout, and vanilla JavaScript DOM manipulation.",
          skills: ["HTML5", "CSS3 Flex/Grid", "JavaScript ES6+", "DOM API"],
          task: "Build an interactive client-side application (e.g. Task Manager, Calculator, or Portfolio site) without external libraries.",
          timeframe: "Semester 2 • 4–5 Weeks"
        }
      ],
      "year-2": [
        {
          id: "sw-y2-1",
          title: "Modern Frontend Frameworks & State Management",
          description: "Transition to component-driven architectures using React or Next.js, managing client state, client-side routing, and responsive design systems.",
          skills: ["React / Next.js", "TypeScript", "Tailwind / CSS Modules", "State Management"],
          task: "Build a responsive SaaS dashboard with asynchronous data fetching, search filters, and persistent local storage.",
          timeframe: "Semester 3 • 6–8 Weeks"
        },
        {
          id: "sw-y2-2",
          title: "Backend API Design & Relational Databases",
          description: "Architect RESTful and GraphQL APIs with Node.js/Express or Python/FastAPI. Model schemas, transactions, and indexing in PostgreSQL.",
          skills: ["Node.js / FastAPI", "RESTful Architecture", "PostgreSQL", "ORM / Query Optimization"],
          task: "Design an end-to-end user authentication and CRUD service with JWT tokens, password hashing, and input validation.",
          timeframe: "Semester 4 • 6–8 Weeks"
        }
      ],
      "year-3": [
        {
          id: "sw-y3-1",
          title: "Microservices, Caching & Message Queues",
          description: "Decouple monolithic backends into asynchronous microservices. Implement in-memory caching with Redis and message brokering with Kafka or RabbitMQ.",
          skills: ["Redis Caching", "Docker", "Event-Driven Queues", "Microservices Design"],
          task: "Architect an asynchronous notification pipeline that queues and delivers emails/webhooks with retry logic.",
          timeframe: "Semester 5 • 8 Weeks"
        },
        {
          id: "sw-y3-2",
          title: "Automated Testing & CI/CD Pipelines",
          description: "Establish rigorous unit, integration, and end-to-end test suites. Configure automated GitHub Actions pipelines with linting and coverage checks.",
          skills: ["Jest / Pytest", "Playwright", "GitHub Actions CI/CD", "Docker Compose"],
          task: "Achieve 85%+ automated test coverage on a full-stack project with automated continuous deployment to a cloud host.",
          timeframe: "Semester 6 • 6 Weeks"
        }
      ],
      "year-4": [
        {
          id: "sw-y4-1",
          title: "High-Level System Design & Cloud Scalability",
          description: "Prepare for senior technical interviews by mastering distributed caching, database sharding, rate limiting, load balancing, and CAP theorem trade-offs.",
          skills: ["System Design", "Load Balancing", "Database Sharding", "AWS / Cloud Deployment"],
          task: "Produce an architectural blueprint for a distributed URL shortener or live messaging system with 10k RPS capacity.",
          timeframe: "Semester 7 • 8 Weeks"
        },
        {
          id: "sw-y4-2",
          title: "Capstone Engineering Project & Career Preparation",
          description: "Deliver a polished, production-deployed engineering application with comprehensive documentation, metrics monitoring, and an ATS-optimized resume.",
          skills: ["Production Deployment", "Monitoring & Logs", "Technical Documentation", "Resume Benchmarking"],
          task: "Deploy a live production capstone, create a video walkthrough, and benchmark the resume against real job postings in IntelliMatch AI.",
          timeframe: "Semester 8 • 6–8 Weeks"
        }
      ]
    }
  },
  {
    id: "data-analytics",
    name: "Data Analytics & Data Science",
    icon: "database",
    overview: "Extract business insights from raw datasets using advanced SQL, statistical modeling, and interactive dashboards.",
    years: {
      "year-1": [
        {
          id: "da-y1-1",
          title: "Mathematical Foundations & Advanced Excel",
          description: "Master descriptive statistics, probability distributions, linear algebra, and advanced spreadsheet modeling (Pivot tables, VLOOKUP, Power Query).",
          skills: ["Statistics & Probability", "Excel Modeling", "Data Cleaning", "Data Storytelling"],
          task: "Conduct an exploratory analysis on a public ecommerce dataset and present key variance findings in a summary deck.",
          timeframe: "Semester 1 • 6 Weeks"
        },
        {
          id: "da-y1-2",
          title: "Python for Data Analysis & SQL Foundations",
          description: "Learn Python data manipulation libraries (NumPy, Pandas) and write relational SQL queries with GROUP BY, JOINs, and subqueries.",
          skills: ["Python", "NumPy & Pandas", "SQL Queries", "Jupyter Notebooks"],
          task: "Clean an unformatted multi-table customer churn dataset and export structured relational summary tables.",
          timeframe: "Semester 2 • 6 Weeks"
        }
      ],
      "year-2": [
        {
          id: "da-y2-1",
          title: "Advanced SQL & Modern Data Warehousing",
          description: "Master Common Table Expressions (CTEs), window functions, indexing, and dimensional modeling for cloud data warehouses like Snowflake and BigQuery.",
          skills: ["Window Functions", "Snowflake / BigQuery", "dbt Fundamentals", "Dimensional Modeling"],
          task: "Write complex analytical SQL queries calculating rolling 30-day active user retention and customer lifetime value (LTV).",
          timeframe: "Semester 3 • 6–8 Weeks"
        },
        {
          id: "da-y2-2",
          title: "Business Intelligence & Executive Dashboards",
          description: "Design automated reporting dashboards in Power BI or Tableau with dynamic filters, DAX calculations, and clean visual storytelling.",
          skills: ["Power BI", "Tableau", "DAX Formulas", "Visual Hierarchy"],
          task: "Publish an interactive executive sales dashboard connecting live data to track regional revenue and KPI deviations.",
          timeframe: "Semester 4 • 6 Weeks"
        }
      ],
      "year-3": [
        {
          id: "da-y3-1",
          title: "Predictive Analytics & Machine Learning Basics",
          description: "Train classification, regression, and clustering algorithms using Scikit-Learn. Evaluate models with precision, recall, ROC-AUC, and cross-validation.",
          skills: ["Scikit-Learn", "Regression & Classification", "Feature Engineering", "A/B Testing"],
          task: "Build a customer churn prediction model in Python achieving >82% out-of-sample precision with feature importance plots.",
          timeframe: "Semester 5 • 8 Weeks"
        },
        {
          id: "da-y3-2",
          title: "ETL Pipelines & Automated Workflow Orchestration",
          description: "Automate batch data ingestion and transformation pipelines using Python, SQL, and Apache Airflow DAGs.",
          skills: ["Apache Airflow", "Python ETL", "Data Validation", "Docker"],
          task: "Orchestrate a daily scheduled ETL pipeline that extracts financial API data, cleans anomalies, and loads into PostgreSQL.",
          timeframe: "Semester 6 • 6 Weeks"
        }
      ],
      "year-4": [
        {
          id: "da-y4-1",
          title: "Experimentation, Causality & Product Analytics",
          description: "Design hypothesis-driven A/B test experiments, determine statistical power and sample sizes, and evaluate product metric rollouts.",
          skills: ["A/B Testing", "Hypothesis Testing", "Cohort Analysis", "Funnel Conversion"],
          task: "Write an end-to-end product experimentation report calculating p-values and minimum detectable effects for an onboarding change.",
          timeframe: "Semester 7 • 6 Weeks"
        },
        {
          id: "da-y4-2",
          title: "End-to-End Data Science Portfolio Capstone",
          description: "Publish a GitHub repository and technical article documenting a complete data science workflow from problem framing to deployed web dashboard.",
          skills: ["Streamlit / Dash", "Model Monitoring", "Portfolio Packaging", "Resume Matching"],
          task: "Deploy an interactive Streamlit app predicting housing prices or fraud risk, and evaluate compatibility against Data Analyst postings.",
          timeframe: "Semester 8 • 6–8 Weeks"
        }
      ]
    }
  },
  {
    id: "ai-ml",
    name: "Artificial Intelligence & Machine Learning",
    icon: "cpu",
    overview: "Develop deep learning architectures, Transformer embeddings, computer vision models, and production generative AI solutions.",
    years: {
      "year-1": [
        {
          id: "ai-y1-1",
          title: "Calculus, Linear Algebra & Python Stack",
          description: "Ground yourself in multivariable calculus, matrix decompositions, eigenvalues, probability, and Python scientific libraries.",
          skills: ["Linear Algebra", "Calculus & Gradients", "NumPy & SciPy", "Matplotlib / Seaborn"],
          task: "Implement gradient descent from scratch in pure Python without machine learning frameworks.",
          timeframe: "Semester 1 • 6 Weeks"
        },
        {
          id: "ai-y1-2",
          title: "Classic Machine Learning & Scikit-Learn",
          description: "Understand supervised vs unsupervised learning: linear regression, decision trees, random forests, SVMs, and k-means clustering.",
          skills: ["Scikit-Learn", "Model Evaluation (F1/AUC)", "Hyperparameter Tuning", "Cross-Validation"],
          task: "Compete in an entry-level Kaggle classification competition with detailed exploratory analysis and baseline models.",
          timeframe: "Semester 2 • 6 Weeks"
        }
      ],
      "year-2": [
        {
          id: "ai-y2-1",
          title: "Deep Learning Foundations with PyTorch",
          description: "Learn artificial neural networks, backpropagation, activation functions, convolutional neural networks (CNNs), and GPU acceleration with CUDA.",
          skills: ["PyTorch", "Neural Networks", "CNNs", "Loss Functions", "CUDA Basics"],
          task: "Train a convolutional neural network on CIFAR-10 image classification achieving >85% accuracy with data augmentation.",
          timeframe: "Semester 3 • 8 Weeks"
        },
        {
          id: "ai-y2-2",
          title: "Natural Language Processing & Word Embeddings",
          description: "Explore text tokenization, TF-IDF, Word2Vec, GloVe, recurrent neural networks (RNNs/LSTMs), and attention mechanisms.",
          skills: ["NLP Preprocessing", "Spacy / NLTK", "Word Embeddings", "Sequence Models"],
          task: "Build a bidirectional LSTM sentiment classification model on movie reviews with custom embedding layers.",
          timeframe: "Semester 4 • 6 Weeks"
        }
      ],
      "year-3": [
        {
          id: "ai-y3-1",
          title: "Transformers, BERT & Hugging Face",
          description: "Deep dive into self-attention, Transformer encoders/decoders, BERT, RoBERTa, and fine-tuning language models with the Hugging Face library.",
          skills: ["Hugging Face", "BERT Fine-Tuning", "Tokenizers", "Transfer Learning"],
          task: "Fine-tune a pretrained BERT model for multi-class technical document classification with evaluation metrics.",
          timeframe: "Semester 5 • 8 Weeks"
        },
        {
          id: "ai-y3-2",
          title: "Generative AI, RAG & Vector Databases",
          description: "Implement Retrieval-Augmented Generation (RAG) using LangChain or LlamaIndex, OpenAI/Ollama APIs, and vector databases (Pinecone, Qdrant, Chroma).",
          skills: ["RAG Systems", "Vector Search (Cosine Similarity)", "LangChain / LlamaIndex", "Prompt Engineering"],
          task: "Build a document Q&A assistant that indexes course textbooks into vector embeddings and returns verified contextual answers.",
          timeframe: "Semester 6 • 8 Weeks"
        }
      ],
      "year-4": [
        {
          id: "ai-y4-1",
          title: "MLOps, Model Serving & Triton Inference",
          description: "Package models into Docker containers, deploy low-latency inference REST/gRPC endpoints using FastAPI, and monitor model latency/drift with MLflow.",
          skills: ["MLflow", "FastAPI Serving", "Docker Containerization", "Model Quantization"],
          task: "Deploy an optimized quantized Transformer model to a cloud endpoint with health metrics and response latency under 60ms.",
          timeframe: "Semester 7 • 8 Weeks"
        },
        {
          id: "ai-y4-2",
          title: "AI Research Paper Reproduction & Capstone",
          description: "Select an ArXiv machine learning research paper, reimplement the proposed architecture in PyTorch, and document benchmarking results.",
          skills: ["Paper Implementation", "Benchmark Replication", "Technical Writing", "Resume ATS Alignment"],
          task: "Publish code and documentation for the replicated paper on GitHub, and verify skills against AI Engineer job postings.",
          timeframe: "Semester 8 • 8 Weeks"
        }
      ]
    }
  },
  {
    id: "cloud-devops",
    name: "Cloud, DevOps & SRE",
    icon: "cloud",
    overview: "Automate continuous software delivery, manage multi-region cloud infrastructure, and maintain 99.99% service reliability.",
    years: {
      "year-1": [
        {
          id: "cd-y1-1",
          title: "Linux Administration & Bash Scripting",
          description: "Master Linux shell navigation, user permissions, process management, SSH keys, cron jobs, and automated bash scripting.",
          skills: ["Linux (Ubuntu/RHEL)", "Bash Scripting", "Systemd Services", "File Permissions"],
          task: "Write a bash automation script that backups database files, compresses logs, and uploads them to remote storage.",
          timeframe: "Semester 1 • 6 Weeks"
        },
        {
          id: "cd-y1-2",
          title: "Computer Networking Fundamentals",
          description: "Understand TCP/IP, OSI layers, DNS resolution, subnetting, CIDR blocks, HTTP/HTTPS, TLS certificates, and firewalls.",
          skills: ["TCP/IP & UDP", "DNS & DHCP", "Wireshark Basics", "SSL/TLS"],
          task: "Configure a custom local network topology with packet capture and inspect HTTP vs HTTPS traffic in Wireshark.",
          timeframe: "Semester 2 • 5 Weeks"
        }
      ],
      "year-2": [
        {
          id: "cd-y2-1",
          title: "Containerization with Docker",
          description: "Containerize multi-tier web applications, optimize multi-stage Dockerfiles, manage volumes, and configure multi-container Docker Compose.",
          skills: ["Dockerfiles", "Docker Compose", "Image Optimization", "Container Networking"],
          task: "Containerize a React + FastAPI + PostgreSQL application with multi-stage builds reducing image size by 70%.",
          timeframe: "Semester 3 • 6 Weeks"
        },
        {
          id: "cd-y2-2",
          title: "Cloud Fundamentals (AWS / Azure / GCP)",
          description: "Learn core cloud primitives: compute (EC2/VMs), object storage (S3/Blob), relational databases (RDS), virtual networks (VPC), and IAM security.",
          skills: ["AWS / Azure Basics", "IAM Least Privilege", "VPC Networking", "Security Groups"],
          task: "Deploy a high-availability web service behind an Application Load Balancer with auto-scaling instances in a custom VPC.",
          timeframe: "Semester 4 • 8 Weeks"
        }
      ],
      "year-3": [
        {
          id: "cd-y3-1",
          title: "Infrastructure as Code with Terraform",
          description: "Provision reproducible multi-cloud infrastructure declaratively using Terraform, state locking with S3/DynamoDB, and reusable modules.",
          skills: ["Terraform", "HCL Modules", "State Management", "GitOps Review"],
          task: "Write modular Terraform code to provision an entire multi-tier cloud environment from scratch with automated validation.",
          timeframe: "Semester 5 • 8 Weeks"
        },
        {
          id: "cd-y3-2",
          title: "Kubernetes Orchestration & Helm",
          description: "Deploy and manage containerized services using Kubernetes Pods, Deployments, Services, ConfigMaps, Secrets, Ingress, and Helm charts.",
          skills: ["Kubernetes", "Helm Charts", "Ingress Controllers", "Rolling Updates"],
          task: "Deploy a microservice application to a Kubernetes cluster with zero-downtime rolling upgrades and persistent volume claims.",
          timeframe: "Semester 6 • 8 Weeks"
        }
      ],
      "year-4": [
        {
          id: "cd-y4-1",
          title: "CI/CD GitOps Automation (ArgoCD & GitHub Actions)",
          description: "Build automated delivery pipelines that run tests, scan images for CVEs, and trigger GitOps deployments to Kubernetes using ArgoCD.",
          skills: ["GitHub Actions", "ArgoCD", "Security Scanning (Trivy)", "Canary Releases"],
          task: "Implement a full GitOps pipeline where pushing a release commit automatically triggers image builds, scans, and ArgoCD sync.",
          timeframe: "Semester 7 • 8 Weeks"
        },
        {
          id: "cd-y4-2",
          title: "SRE Observability, SLIs/SLOs & Disaster Recovery",
          description: "Configure Prometheus metrics collection, Grafana visualization dashboards, Alertmanager, distributed tracing, and disaster recovery.",
          skills: ["Prometheus & Grafana", "SLIs / SLOs", "Distributed Tracing", "Chaos Engineering"],
          task: "Build an observability dashboard showing p99 latency, error budgets, and simulated failover scenarios.",
          timeframe: "Semester 8 • 6 Weeks"
        }
      ]
    }
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & Information Security",
    icon: "shield",
    overview: "Protect enterprise networks, investigate threat vectors, conduct penetration testing, and ensure security compliance.",
    years: {
      "year-1": [
        {
          id: "sec-y1-1",
          title: "Security Principles, OS Internals & Cryptography",
          description: "Learn CIA triad, symmetric vs asymmetric encryption, hashing, digital signatures, OS access controls, and security hygiene.",
          skills: ["Cryptography (RSA/AES)", "Hashing (SHA-256)", "Windows/Linux Security", "CIA Triad"],
          task: "Implement symmetric key encryption and message authentication code verification using Python cryptography libraries.",
          timeframe: "Semester 1 • 6 Weeks"
        },
        {
          id: "sec-y1-2",
          title: "Network Security & Packet Inspection",
          description: "Analyze network traffic in Wireshark, understand firewall rule design, detect ARP spoofing, port scans, and configure VPN tunnels.",
          skills: ["Wireshark", "Nmap Port Scanning", "Firewall Rules", "Network Defense"],
          task: "Perform a simulated security audit on a local virtual network to identify exposed services and unencrypted protocol traffic.",
          timeframe: "Semester 2 • 6 Weeks"
        }
      ],
      "year-2": [
        {
          id: "sec-y2-1",
          title: "Web Application Security & OWASP Top 10",
          description: "Understand common web vulnerabilities: SQL injection, Cross-Site Scripting (XSS), CSRF, Broken Access Control, and SSRF using Burp Suite.",
          skills: ["OWASP Top 10", "Burp Suite", "SQL Injection Testing", "XSS Mitigation"],
          task: "Complete 15 challenges on WebGoat or PortSwigger Web Security Academy and write formal vulnerability remediation memos.",
          timeframe: "Semester 3 • 8 Weeks"
        },
        {
          id: "sec-y2-2",
          title: "SIEM & SOC Operations Foundations",
          description: "Collect and ingest event logs into Splunk or ELK Stack, write search queries (SPL), correlate alerts, and follow incident triage procedures.",
          skills: ["Splunk / ELK", "Log Analysis", "Incident Response", "MITRE ATT&CK"],
          task: "Construct Splunk dashboard detecting brute-force SSH logins and privilege escalation attempts from simulated server logs.",
          timeframe: "Semester 4 • 6 Weeks"
        }
      ],
      "year-3": [
        {
          id: "sec-y3-1",
          title: "Penetration Testing & Ethical Hacking",
          description: "Conduct systematic penetration testing methodologies: reconnaissance, vulnerability scanning (Nessus), exploitation, and post-exploitation.",
          skills: ["Metasploit", "Nessus", "Privilege Escalation", "Technical Reporting"],
          task: "Compete in TryHackMe or HackTheBox intermediate lab machines and write full penetration testing assessment reports.",
          timeframe: "Semester 5 • 8 Weeks"
        },
        {
          id: "sec-y3-2",
          title: "Cloud Security & DevSecOps",
          description: "Audit AWS/Azure security configurations using Cloud Security Posture Management (CSPM), enforce IAM least privilege, and scan container images.",
          skills: ["AWS Security Hub", "IAM Policies", "Container Security", "SAST/DAST Tooling"],
          task: "Integrate automated static security code analysis (SAST) and container vulnerability scanning into a GitHub Actions CI pipeline.",
          timeframe: "Semester 6 • 8 Weeks"
        }
      ],
      "year-4": [
        {
          id: "sec-y4-1",
          title: "Digital Forensics, Threat Hunting & Malware Analysis",
          description: "Perform memory forensics with Volatility, analyze malicious binaries in sandboxes, trace attack chains, and write threat intel briefs.",
          skills: ["Volatility", "Memory Forensics", "Threat Hunting", "YARA Rules"],
          task: "Analyze a memory dump from a compromised machine to identify injected malicious processes and extraction artifacts.",
          timeframe: "Semester 7 • 8 Weeks"
        },
        {
          id: "sec-y4-2",
          title: "Security Capstone, Certifications & Career Launch",
          description: "Prepare for entry-level industry certifications (CompTIA Security+, CEH, or CySA+), publish security research, and optimize resume keywords.",
          skills: ["Security+ Prep", "Vulnerability Remediation", "Professional Reporting", "Resume Alignment"],
          task: "Benchmark your resume against real Cybersecurity Analyst job postings using the IntelliMatch AI Resume Analyzer.",
          timeframe: "Semester 8 • 6 Weeks"
        }
      ]
    }
  }
];

export function getRoadmapForDomainAndYear(domainId, yearId) {
  const domain = ROADMAP_DOMAINS.find((d) => d.id === domainId) || ROADMAP_DOMAINS[0];
  const milestones = (domain.years && domain.years[yearId]) ? domain.years[yearId] : (domain.years["year-1"] || []);
  return {
    domain,
    milestones,
    yearMeta: ROADMAP_YEARS.find((y) => y.id === yearId) || ROADMAP_YEARS[0]
  };
}

