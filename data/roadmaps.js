/**
 * Centralized Learning Roadmaps Curriculum — IntelliMatch AI
 * Structured, non-linear milestone roadmaps for engineering students and freshers
 * spanning Year 1 (Foundations) to Year 4 (Career & Production Ready).
 */

export const ROADMAP_YEARS = [
  { id: "year-1", label: "Year 1: Engineering Foundations", stage: "1st Year", badge: "Stage 1" },
  { id: "year-2", label: "Year 2: Core Domain Competencies", stage: "2nd Year", badge: "Stage 2" },
  { id: "year-3", label: "Year 3: Applied Systems & Modern Tooling", stage: "3rd Year", badge: "Stage 3" },
  { id: "year-4", label: "Year 4: Production & Fresher Hiring Readiness", stage: "4th Year", badge: "Stage 4" },
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
  },
  {
    id: "networking-it",
    name: "Networking & Systems Infrastructure",
    icon: "network",
    overview: "Architect enterprise network topologies, configure routing/switching protocols, manage system administration, and automate infrastructure.",
    years: {
      "year-1": [
        {
          id: "net-y1-1",
          title: "Network Fundamentals & TCP/IP Model",
          description: "Master OSI 7 layers, TCP/IP stack, IPv4/IPv6 subnetting, CIDR notation, and network hardware components.",
          skills: ["IPv4 / IPv6 Subnetting", "TCP/IP & UDP", "DNS & DHCP", "Wireshark Packet Analysis"],
          task: "Design an IP addressing scheme for a 4-department corporate office and verify packet routing in Cisco Packet Tracer.",
          timeframe: "Semester 1 • 6 Weeks"
        },
        {
          id: "net-y1-2",
          title: "Linux & Windows Server Administration",
          description: "Configure user authentication, file permissions, systemd services, SSH hardening, and Active Directory domain services.",
          skills: ["Linux Server Admin", "Active Directory / LDAP", "SSH & Firewall (UFW)", "Bash Scripting"],
          task: "Deploy an Ubuntu Server with hardened SSH, centralized user group permissions, and an automated backup cron job.",
          timeframe: "Semester 2 • 6 Weeks"
        }
      ],
      "year-2": [
        {
          id: "net-y2-1",
          title: "Enterprise Switching, Routing & VLANs",
          description: "Configure Cisco Catalyst switches, static/dynamic routing (OSPF, BGP basics), Spanning Tree Protocol (STP), and 802.1Q trunking.",
          skills: ["VLANs & Trunking (802.1Q)", "OSPF Dynamic Routing", "STP / RSTP", "Access Control Lists (ACLs)"],
          task: "Build a multi-switch corporate campus topology with inter-VLAN routing, OSPF convergence, and security ACLs in GNS3.",
          timeframe: "Semester 3 • 8 Weeks"
        },
        {
          id: "net-y2-2",
          title: "Network Automation with Python & Ansible",
          description: "Automate configuration provisioning across multi-vendor network devices using Python (Netmiko, Scrapli) and Ansible playbooks.",
          skills: ["Python for Network Engineers", "Netmiko / Paramiko", "Ansible Network Modules", "RESTCONF / NETCONF"],
          task: "Write an Ansible playbook to audit and enforce standard NTP, syslog, and banner configurations across 10 simulated routers.",
          timeframe: "Semester 4 • 6 Weeks"
        }
      ],
      "year-3": [
        {
          id: "net-y3-1",
          title: "Cloud VPCs, Hybrid Networking & VPNs",
          description: "Design AWS VPC / Azure Virtual Networks, configure Site-to-Site IPsec VPN tunnels, Direct Connect / ExpressRoute, and transit gateways.",
          skills: ["AWS VPC / Transit Gateway", "IPsec & WireGuard VPN", "BGP Peering", "Software-Defined WAN (SD-WAN)"],
          task: "Establish an encrypted Site-to-Site WireGuard VPN bridge connecting an on-premises Linux laboratory to an AWS Cloud VPC.",
          timeframe: "Semester 5 • 8 Weeks"
        },
        {
          id: "net-y3-2",
          title: "Network Observability, Telemetry & Security",
          description: "Implement SNMP monitoring, Prometheus network exporters, centralized syslog collection, and Zero Trust network segmentation.",
          skills: ["SNMP / NetFlow", "Prometheus & Grafana", "Zero Trust Architecture", "SIEM Syslog Ingestion"],
          task: "Build a real-time Grafana dashboard tracking network bandwidth saturation, interface packet drops, and latency anomalies.",
          timeframe: "Semester 6 • 8 Weeks"
        }
      ],
      "year-4": [
        {
          id: "net-y4-1",
          title: "High-Availability Infrastructure & Disaster Recovery",
          description: "Deploy redundant gateway protocols (HSRP/VRRP), DNS failover with Anycast, multi-homed BGP routing, and automated disaster recovery plans.",
          skills: ["HSRP / VRRP Redundancy", "Anycast Routing", "Disaster Recovery Runbooks", "Network Capacity Planning"],
          task: "Simulate core link failure and measure automated gateway failover convergence times under simulated high throughput traffic.",
          timeframe: "Semester 7 • 8 Weeks"
        },
        {
          id: "net-y4-2",
          title: "Network Engineering Capstone & CCNA / Network+ Readiness",
          description: "Architect a full enterprise network specification, simulate campus-to-cloud infrastructure, and validate CCNA/Network+ fresher certification readiness.",
          skills: ["Enterprise Network Design", "CCNA Certification Prep", "Technical RFC Documentation", "ATS Resume Alignment"],
          task: "Publish a complete enterprise network engineering design specification and benchmark your profile against Network Engineer job postings.",
          timeframe: "Semester 8 • 6 Weeks"
        }
      ]
    }
  },
  {
    id: "qa-testing",
    name: "Quality Assurance & Test Automation",
    icon: "check-circle",
    overview: "Engineer automated end-to-end test suites, conduct performance benchmarking, build CI/CD test gates, and guarantee high software reliability.",
    years: {
      "year-1": [
        {
          id: "qa-y1-1",
          title: "Software Testing Principles & Test Design",
          description: "Understand SDLC/STLC phases, black-box vs white-box testing, boundary value analysis, equivalence partitioning, and Jira bug tracking.",
          skills: ["STLC & Test Design", "Boundary Value Analysis", "Defect Life Cycle", "Jira & TestRail"],
          task: "Write a comprehensive 25-point test plan and test cases with pre-conditions, steps, and expected results for an authentication service.",
          timeframe: "Semester 1 • 6 Weeks"
        },
        {
          id: "qa-y1-2",
          title: "Python/JavaScript Basics & Unit Testing",
          description: "Write clean automated unit tests using PyTest or Jest, implement test fixtures, mocking, and calculate statement/branch code coverage.",
          skills: ["PyTest / Jest", "Test Mocking & Fixtures", "Code Coverage (Coverage.py)", "Git Version Control"],
          task: "Build an automated test suite achieving >90% code coverage on a Python REST utility module with parameterized edge-case assertions.",
          timeframe: "Semester 2 • 6 Weeks"
        }
      ],
      "year-2": [
        {
          id: "qa-y2-1",
          title: "Web UI Test Automation with Playwright / Selenium",
          description: "Implement the Page Object Model (POM), handle dynamic DOM elements, async waits, headless browser execution, and automated screenshots.",
          skills: ["Playwright / Selenium", "Page Object Model (POM)", "Cross-Browser Testing", "TypeScript / Python"],
          task: "Develop a robust automated test suite using Playwright POM covering login, checkout, and search workflows on an ecommerce portal.",
          timeframe: "Semester 3 • 8 Weeks"
        },
        {
          id: "qa-y2-2",
          title: "API Automation & Contract Testing",
          description: "Automate REST API test verification using Postman Newman and Python Requests/REST Assured, validating status codes, JSON schemas, and response SLAs.",
          skills: ["REST API Testing", "Postman / Newman", "JSON Schema Validation", "REST Assured"],
          task: "Build an automated API regression test suite validating CRUD endpoints, authentication tokens, and payload schema contracts.",
          timeframe: "Semester 4 • 6 Weeks"
        }
      ],
      "year-3": [
        {
          id: "qa-y3-1",
          title: "Performance, Load & Stress Testing with k6",
          description: "Simulate high concurrent user traffic with k6 or Apache JMeter, measure p95/p99 latency distributions, and identify backend memory bottlenecks.",
          skills: ["k6 Load Testing", "Apache JMeter", "p95/p99 Latency Analysis", "Bottleneck Profiling"],
          task: "Execute a 1,000 virtual user stress test against target API endpoints, generating automated HTML performance metric reports.",
          timeframe: "Semester 5 • 8 Weeks"
        },
        {
          id: "qa-y3-2",
          title: "CI/CD Test Gates & Mobile Automation with Appium",
          description: "Integrate automated test runs into GitHub Actions pipelines with Slack notifications, and automate mobile Android/iOS flows using Appium.",
          skills: ["GitHub Actions Test Gates", "Appium Mobile Testing", "Dockerized Test Runners", "Allure Reporting"],
          task: "Configure a CI pipeline that launches headless Playwright tests in Docker containers on every pull request and blocks merges on test failures.",
          timeframe: "Semester 6 • 8 Weeks"
        }
      ],
      "year-4": [
        {
          id: "qa-y4-1",
          title: "Security & Chaos Testing in Production",
          description: "Perform automated DAST security scanning using OWASP ZAP, chaos fault-injection (Chaos Mesh), and API fuzzing testing.",
          skills: ["OWASP ZAP Integration", "Chaos Engineering", "API Fuzzing", "Reliability Verification"],
          task: "Inject network delay and process failure into a microservice mesh and verify automated system recovery without data loss.",
          timeframe: "Semester 7 • 8 Weeks"
        },
        {
          id: "qa-y4-2",
          title: "SDET Capstone Framework & Career Placement",
          description: "Build an enterprise-grade modular test automation framework with parallel execution, reporting dashboards, and interview readiness.",
          skills: ["SDET Framework Architecture", "Allure Dashboard", "Technical Interview Prep", "ATS Resume Alignment"],
          task: "Publish a full-stack SDET framework on GitHub and benchmark your profile against Software Development Engineer in Test (SDET) postings.",
          timeframe: "Semester 8 • 6 Weeks"
        }
      ]
    }
  },
  {
    id: "embedded-systems",
    name: "Embedded Systems & IoT",
    icon: "cpu",
    overview: "Program low-level microcontrollers, implement real-time operating systems (RTOS), interface hardware sensors, and architect connected IoT devices.",
    years: {
      "year-1": [
        {
          id: "emb-y1-1",
          title: "C Programming & Computer Architecture Fundamentals",
          description: "Master pointers, memory addressing, bitwise bitmasks, volatile keyword, structs, and computer architecture ALU/register basics.",
          skills: ["Embedded C", "Bitwise Manipulation", "Pointers & Memory Layout", "Digital Logic Basics"],
          task: "Implement a ring buffer and bit-manipulation library in ANSI C to manage real-time serial packet ingestion without dynamic allocation.",
          timeframe: "Semester 1 • 6 Weeks"
        },
        {
          id: "emb-y1-2",
          title: "Microcontroller Foundations (ESP32 / Arduino)",
          description: "Interface GPIOs, configure PWM for motor speed, handle hardware interrupts (ISR), and read analog sensors via ADC/DAC.",
          skills: ["ESP32 / Arduino C++", "Interrupt Service Routines (ISR)", "Timers & PWM", "Sensor Interfacing"],
          task: "Build an interrupt-driven temperature and humidity data logger with an OLED display and deep-sleep power management.",
          timeframe: "Semester 2 • 6 Weeks"
        }
      ],
      "year-2": [
        {
          id: "emb-y2-1",
          title: "Hardware Protocols: I2C, SPI, UART & CAN Bus",
          description: "Understand timing diagrams, baud rates, master-slave addressing, arbitration, differential signaling, and packet framing across bus protocols.",
          skills: ["I2C / SPI Bus", "UART Framing", "CAN Bus Basics", "Logic Analyzer Debugging"],
          task: "Decode and analyze real SPI and I2C signal packets using a USB Logic Analyzer and PulseView to debug communication glitches.",
          timeframe: "Semester 3 • 8 Weeks"
        },
        {
          id: "emb-y2-2",
          title: "ARM Cortex-M Architecture & Bare-Metal Programming",
          description: "Write bare-metal register-level drivers for STM32 microcontrollers using CMSIS without vendor HAL libraries, configuring clock trees and DMA.",
          skills: ["STM32 (ARM Cortex-M)", "Direct Memory Access (DMA)", "Register-Level Programming", "CMSIS Standard"],
          task: "Program an STM32 timer and DMA controller from scratch using direct memory-mapped register manipulation in C.",
          timeframe: "Semester 4 • 6 Weeks"
        }
      ],
      "year-3": [
        {
          id: "emb-y3-1",
          title: "Real-Time Operating Systems (FreeRTOS)",
          description: "Design multi-task firmware using FreeRTOS, managing task priorities, mutexes, binary/counting semaphores, message queues, and event groups.",
          skills: ["FreeRTOS", "Task Scheduling & Context Switch", "Mutexes & Semaphores", "Priority Inversion"],
          task: "Construct a multi-threaded FreeRTOS firmware application with thread-safe sensor acquisition, watchdog timer, and display tasks.",
          timeframe: "Semester 5 • 8 Weeks"
        },
        {
          id: "emb-y3-2",
          title: "Connected IoT Devices & Cloud Telemetry",
          description: "Connect microcontrollers to Wi-Fi / BLE, publish lightweight telemetry over MQTT with TLS encryption, and interface with AWS IoT Core.",
          skills: ["MQTT / CoAP Protocols", "TLS Encryption for IoT", "AWS IoT Core", "Bluetooth Low Energy (BLE)"],
          task: "Build an industrial environmental monitor transmitting encrypted telemetry to an AWS IoT Core MQTT broker with shadow device syncing.",
          timeframe: "Semester 6 • 8 Weeks"
        }
      ],
      "year-4": [
        {
          id: "emb-y4-1",
          title: "Embedded Linux & Device Driver Basics",
          description: "Compile custom Linux kernels using Buildroot/Yocto for Raspberry Pi / BeagleBone, understand character device drivers, and device tree overlays.",
          skills: ["Embedded Linux (Yocto)", "Device Tree Overlays", "Character Drivers", "Kernel Debugging"],
          task: "Compile a minimal bootable embedded Linux image with a custom kernel module controlling GPIO hardware on single-board computers.",
          timeframe: "Semester 7 • 8 Weeks"
        },
        {
          id: "emb-y4-2",
          title: "Production Firmware Capstone & Hardware Placement",
          description: "Deliver a low-power, commercial-grade embedded IoT capstone with OTA firmware updating, hardware schematics (KiCad), and interview readiness.",
          skills: ["OTA Firmware Updates", "KiCad Schematic Design", "Embedded Interview Prep", "ATS Resume Alignment"],
          task: "Publish complete firmware code, KiCad schematic files, and video hardware demo, benchmarking your resume for Embedded/Firmware Engineer roles.",
          timeframe: "Semester 8 • 6 Weeks"
        }
      ]
    }
  },
  {
    id: "enterprise-tech",
    name: "Enterprise Technology & Systems",
    icon: "briefcase",
    overview: "Configure corporate ERP/CRM platforms (SAP, Salesforce), architect enterprise application integrations, and build business workflow automations.",
    years: {
      "year-1": [
        {
          id: "ent-y1-1",
          title: "Enterprise Architecture & Relational Data Modeling",
          description: "Understand 3-tier enterprise architecture, ACID database transactions, complex relational schemas, and business requirement documentation (BRD).",
          skills: ["Enterprise Architecture", "Relational Schemas & SQL", "BRD Documentation", "Business Process Modeling (BPMN)"],
          task: "Model an enterprise supply chain database schema with order fulfillment, inventory tracking, and invoice validation constraints in PostgreSQL.",
          timeframe: "Semester 1 • 6 Weeks"
        },
        {
          id: "ent-y1-2",
          title: "Business Process Automation & Scripting",
          description: "Automate administrative workflows, CSV/Excel data transformation, and scheduled system integrations using Python and PowerShell.",
          skills: ["Python Automation", "PowerShell Scripting", "Data Transformation (ETL)", "Cron & Scheduled Tasks"],
          task: "Write an automated script that ingests multi-branch accounting spreadsheets, validates fiscal reconciliation, and emails summary reports.",
          timeframe: "Semester 2 • 6 Weeks"
        }
      ],
      "year-2": [
        {
          id: "ent-y2-1",
          title: "Salesforce Platform & Apex / LWC Development",
          description: "Configure Salesforce CRM, write Apex triggers, SOQL/SOSL queries, and build custom reactive Lightning Web Components (LWC).",
          skills: ["Salesforce CRM", "Apex Programming", "Lightning Web Components", "SOQL / SOSL"],
          task: "Develop a custom lead scoring module in Salesforce with automated email routing triggers and interactive LWC dashboard cards.",
          timeframe: "Semester 3 • 8 Weeks"
        },
        {
          id: "ent-y2-2",
          title: "SAP S/4HANA & ERP Business Modules",
          description: "Understand core SAP ERP modules (MM, SD, FICO), master data management, business partner models, and SAP Fiori user experience.",
          skills: ["SAP S/4HANA Basics", "Procure-to-Pay (MM)", "Order-to-Cash (SD)", "SAP Fiori UI"],
          task: "Map an end-to-end procure-to-pay workflow in an enterprise ERP simulation, tracking purchase requisitions, PO creation, and goods receipts.",
          timeframe: "Semester 4 • 6 Weeks"
        }
      ],
      "year-3": [
        {
          id: "ent-y3-1",
          title: "Enterprise Application Integration (MuleSoft / REST)",
          description: "Build API-led connectivity across disparate corporate systems using MuleSoft Anypoint, OpenAPI specs, message queues, and webhook transformations.",
          skills: ["MuleSoft / Boomi", "API-Led Connectivity", "Enterprise Service Bus", "SOAP & REST Gateways"],
          task: "Design an integration flow synchronizing customer profile changes from an external e-commerce database to Salesforce CRM in real time.",
          timeframe: "Semester 5 • 8 Weeks"
        },
        {
          id: "ent-y3-2",
          title: "Robotic Process Automation (RPA) with UiPath",
          description: "Automate repetitive business tasks using UiPath Studio, orchestrating attended and unattended bots with optical character recognition (OCR).",
          skills: ["UiPath RPA", "Orchestrator Deployment", "Document Understanding (OCR)", "Exception Handling"],
          task: "Deploy an unattended UiPath bot that extracts invoice line items from PDF attachments and automatically reconciles entries into an ERP test sandbox.",
          timeframe: "Semester 6 • 8 Weeks"
        }
      ],
      "year-4": [
        {
          id: "ent-y4-1",
          title: "Enterprise Solutions Architecture & Data Governance",
          description: "Design multi-tier integration architectures, master data management (MDM) governance, SOC2/GDPR compliance, and cloud migration frameworks.",
          skills: ["Solutions Architecture", "Master Data Management", "Enterprise Governance", "Cloud ERP Migration"],
          task: "Draft a formal Solution Design Document (SDD) for migrating an on-premises billing system to a cloud-based multi-tenant ERP platform.",
          timeframe: "Semester 7 • 8 Weeks"
        },
        {
          id: "ent-y4-2",
          title: "Enterprise Tech Capstone & Consulting Placement",
          description: "Deliver a production enterprise integration prototype, prepare case studies, and benchmark resume keywords for ERP/CRM Consultant roles.",
          skills: ["Technical Case Studies", "Client Prototyping", "Consulting Interview Prep", "ATS Resume Alignment"],
          task: "Publish a full enterprise architecture case study on GitHub and benchmark your profile for Technical Consultant and Solutions Engineer roles.",
          timeframe: "Semester 8 • 6 Weeks"
        }
      ]
    }
  },
  {
    id: "emerging-tech",
    name: "Emerging Technologies & Creative Computing",
    icon: "sparkles",
    overview: "Develop decentralized Web3 smart contracts, build spatial AR/VR interactive experiences, and engineer high-performance graphics engines.",
    years: {
      "year-1": [
        {
          id: "emg-y1-1",
          title: "Math for Graphics, Cryptography & Modern Languages",
          description: "Master 3D vectors, matrix transformations, quaternions, SHA-256 hashing, and modern language foundations (C# or Rust).",
          skills: ["3D Vector Math", "Linear Algebra", "Modern C# / Rust", "Applied Cryptography"],
          task: "Build a 3D procedural mesh generator or cryptographic signature verification CLI in C# / Rust without external graphics engines.",
          timeframe: "Semester 1 • 6 Weeks"
        },
        {
          id: "emg-y1-2",
          title: "Interactive 3D Foundations (Unity / Three.js)",
          description: "Understand scene graphs, materials, lighting, physics colliders, camera controllers, and rendering pipelines in Unity or Three.js.",
          skills: ["Unity Engine / Three.js", "Shader Basics", "Physics Colliders", "Asset Optimization"],
          task: "Develop an interactive 3D web showcase with real-time orbit controls, PBR materials, and custom camera transitions in Three.js.",
          timeframe: "Semester 2 • 6 Weeks"
        }
      ],
      "year-2": [
        {
          id: "emg-y2-1",
          title: "Smart Contract Engineering with Solidity & EVM",
          description: "Write secure Ethereum smart contracts in Solidity, manage EVM storage slots, ERC-20/ERC-721 token standards, and Hardhat test suites.",
          skills: ["Solidity", "Ethereum Virtual Machine (EVM)", "ERC-20 / ERC-721", "Hardhat & ethers.js"],
          task: "Deploy an audited ERC-721 digital asset collection smart contract on the Sepolia testnet with automated unit tests for all access controls.",
          timeframe: "Semester 3 • 8 Weeks"
        },
        {
          id: "emg-y2-2",
          title: "AR/VR Spatial Computing with OpenXR",
          description: "Build immersive virtual reality environments using OpenXR and Unity XR Interaction Toolkit, handling 6DoF head/hand tracking and teleportation.",
          skills: ["OpenXR", "Unity XR Toolkit", "6DoF Spatial Tracking", "Spatial UI Design"],
          task: "Create an interactive VR training simulation with grab physics, interactive dials, and spatial audio feedback for VR headsets.",
          timeframe: "Semester 4 • 6 Weeks"
        }
      ],
      "year-3": [
        {
          id: "emg-y3-1",
          title: "Decentralized Protocols, IPFS & Web3 Full-Stack",
          description: "Build decentralized full-stack applications (dApps) connecting React frontends with smart contracts via Wagmi/Viem, with decentralized IPFS storage.",
          skills: ["dApp Architecture", "Wagmi / Viem", "IPFS / Arweave", "WalletConnect"],
          task: "Construct an end-to-end decentralized portfolio verification portal with wallet authentication and tamper-evident IPFS metadata pinning.",
          timeframe: "Semester 5 • 8 Weeks"
        },
        {
          id: "emg-y3-2",
          title: "Shader Programming & Real-Time Graphics Pipelines",
          description: "Write custom vertex and fragment shaders in HLSL/GLSL, implementing procedural noise, post-processing bloom, and compute shader optimizations.",
          skills: ["GLSL / HLSL", "Vertex & Fragment Shaders", "Post-Processing Pipelines", "Compute Shaders"],
          task: "Develop a real-time volumetric atmospheric lighting shader and procedural water simulation running at 60+ FPS on mobile hardware.",
          timeframe: "Semester 6 • 8 Weeks"
        }
      ],
      "year-4": [
        {
          id: "emg-y4-1",
          title: "Smart Contract Security, Auditing & Gas Optimization",
          description: "Audit smart contracts for reentrancy, integer overflow, front-running, and flash loan attacks using Slither, Echidna, and Foundry fuzzing.",
          skills: ["Foundry Fuzz Testing", "Slither Static Analysis", "Gas Optimization", "Reentrancy Defense"],
          task: "Audit a vulnerable DeFi staking protocol, write proof-of-concept exploit scripts in Foundry, and implement gas-optimized remediations.",
          timeframe: "Semester 7 • 8 Weeks"
        },
        {
          id: "emg-y4-2",
          title: "Emerging Tech Capstone & Web3/XR Career Launch",
          description: "Deliver a polished Web3 or Spatial Computing capstone product, publish technical documentation, and benchmark for Blockchain/XR Engineer roles.",
          skills: ["Web3 / XR Capstone", "Decentralized Hosting", "Technical Interview Prep", "ATS Resume Alignment"],
          task: "Deploy a live production decentralized application or interactive spatial demo with public source code and benchmark your ATS resume score.",
          timeframe: "Semester 8 • 6 Weeks"
        }
      ]
    }
  }
];

export function getRoadmapForDomainAndYear(domainId, yearId) {
  const domain = ROADMAP_DOMAINS.find((d) => d.id === domainId) || ROADMAP_DOMAINS[0];
  const yearMeta = ROADMAP_YEARS.find((y) => y.id === yearId) || ROADMAP_YEARS[0];
  const rawMilestones = (domain && domain.years && domain.years[yearId])
    ? domain.years[yearId]
    : (domain?.years?.["year-1"] || []);

  const milestones = rawMilestones.map((m) => ({
    ...m,
    topics: Array.isArray(m.topics) ? m.topics : (Array.isArray(m.skills) ? m.skills : []),
    skills: Array.isArray(m.skills) ? m.skills : (Array.isArray(m.topics) ? m.topics : []),
    duration: m.duration || m.timeframe || "",
    timeframe: m.timeframe || m.duration || "",
  }));

  return {
    domain,
    milestones,
    yearMeta,
    yearLabel: yearMeta ? yearMeta.label : "",
    stageLabel: yearMeta ? yearMeta.stage : "",
    overview: domain ? (domain.overview || "") : "",
  };
}

