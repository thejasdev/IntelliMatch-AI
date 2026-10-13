/**
 * Centralized Engineering Domain and Job Role Catalogue — IntelliMatch AI
 * Extensible multi-domain career catalogue supporting 10 engineering domains,
 * representative roles, core skill sets, and sample job descriptions.
 */

export const ENGINEERING_DOMAINS = [
  {
    id: "software-dev",
    name: "Software Development",
    description: "Full-stack, backend, frontend, mobile, and systems programming.",
    icon: "code",
    roles: [
      {
        id: "sw-eng",
        title: "Software Engineer",
        skills: ["Data Structures", "Algorithms", "System Design", "Git", "REST APIs", "Unit Testing"],
        sampleJob: `Software Engineer
Responsibilities:
- Design, build, and maintain scalable software applications and services.
- Write clean, maintainable, and well-tested code following best engineering practices.
- Participate in code reviews, architectural discussions, and agile sprint planning.
Requirements:
- Strong proficiency in one or more languages: Python, Java, C++, TypeScript, or Go.
- Solid grounding in computer science fundamentals, data structures, and algorithms.
- Experience with relational databases, RESTful APIs, and CI/CD pipelines.`
      },
      {
        id: "sw-dev",
        title: "Software Developer",
        skills: ["Clean Code", "OOP", "Debugging", "Version Control", "SQL", "Web Services"],
        sampleJob: `Software Developer
Responsibilities:
- Implement client features and bug fixes across core software products.
- Collaborate with QA engineers and product managers to deliver user stories.
Requirements:
- Bachelor's degree in Computer Science or equivalent practical experience.
- Experience building web or desktop applications with modern frameworks.`
      },
      {
        id: "sw-backend",
        title: "Backend Developer",
        skills: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "Microservices", "Docker"],
        sampleJob: `Backend Developer
Responsibilities:
- Build and optimize high-throughput REST and gRPC API endpoints.
- Manage database schemas, query optimization, caching layers, and message brokers.
Requirements:
- 3+ years backend experience with Node.js, Python (FastAPI/Django), or Go.
- Strong knowledge of relational (PostgreSQL) and NoSQL (MongoDB, Redis) databases.`
      },
      {
        id: "sw-frontend",
        title: "Frontend Developer",
        skills: ["JavaScript", "TypeScript", "HTML5", "CSS3", "React/Vue", "Web Performance", "Accessibility"],
        sampleJob: `Frontend Developer
Responsibilities:
- Develop responsive, accessible web applications and UI component libraries.
- Optimize frontend page load times and maintain client-side state.
Requirements:
- Deep expertise in JavaScript (ES6+), TypeScript, semantic HTML5, and modern CSS.
- Familiarity with design systems, WCAG 2.1 accessibility, and REST API integration.`
      },
      {
        id: "sw-fullstack",
        title: "Full Stack Developer",
        skills: ["JavaScript", "Python/Node.js", "React", "PostgreSQL", "Docker", "REST APIs"],
        sampleJob: `Full Stack Developer
Responsibilities:
- Deliver end-to-end features spanning responsive web UIs down to database models.
Requirements:
- Proficiency with modern frontend technologies and backend frameworks.`
      },
      { id: "sw-java", title: "Java Developer", skills: ["Java", "Spring Boot", "Hibernate", "Microservices", "Maven", "JUnit"] },
      { id: "sw-python", title: "Python Developer", skills: ["Python", "FastAPI", "Django", "PostgreSQL", "Celery", "Pytest"] },
      { id: "sw-cpp", title: "C/C++ Developer", skills: ["C++", "Memory Management", "Multithreading", "STL", "Linux", "CMake"] },
      { id: "sw-dotnet", title: ".NET Developer", skills: ["C#", ".NET Core", "ASP.NET", "Entity Framework", "SQL Server", "Azure"] },
      { id: "sw-android", title: "Android Developer", skills: ["Kotlin", "Java", "Android SDK", "Jetpack Compose", "Coroutines", "Retrofit"] },
      { id: "sw-ios", title: "iOS Developer", skills: ["Swift", "SwiftUI", "UIKit", "Xcode", "Combine", "CoreData"] },
      { id: "sw-mobile", title: "Mobile App Developer", skills: ["Flutter/React Native", "Mobile UI", "Offline Storage", "REST APIs"] },
      { id: "sw-api", title: "API Developer", skills: ["OpenAPI/Swagger", "gRPC", "OAuth2", "Rate Limiting", "GraphQL", "Postman"] }
    ]
  },
  {
    id: "data-analytics",
    name: "Data and Analytics",
    description: "Data pipelines, warehousing, business intelligence, and analytical modeling.",
    icon: "database",
    roles: [
      {
        id: "da-analyst",
        title: "Data Analyst",
        skills: ["SQL", "Excel", "Tableau/Power BI", "Python", "Data Cleaning", "Statistical Analysis"],
        sampleJob: `Data Analyst
Responsibilities:
- Query enterprise databases and build automated executive reporting dashboards.
- Analyze customer retention, product KPIs, and deliver actionable data stories.
Requirements:
- Advanced SQL proficiency (joins, CTEs, window functions).
- Strong experience in Power BI, Tableau, or Metabase.`
      },
      {
        id: "da-bi",
        title: "Business Intelligence Analyst",
        skills: ["Power BI", "DAX", "SQL Data Warehousing", "ETL", "Dashboard Design", "KPI Tracking"]
      },
      {
        id: "da-tech-ba",
        title: "Technical Business Analyst",
        skills: ["Requirements Gathering", "UML", "SQL", "Agile User Stories", "Process Flow Diagrams"]
      },
      {
        id: "da-scientist",
        title: "Data Scientist",
        skills: ["Python", "Pandas", "Scikit-Learn", "Machine Learning", "A/B Testing", "SQL", "Feature Engineering"],
        sampleJob: `Data Scientist
Responsibilities:
- Formulate hypothesis-driven experiments and build predictive ML models.
- Extract insights from multi-terabyte transactional and behavioral logs.
Requirements:
- Strong background in statistics, linear algebra, and Python data stack.`
      },
      {
        id: "da-engineer",
        title: "Data Engineer",
        skills: ["Apache Spark", "Airflow", "Kafka", "SQL", "Python", "Snowflake/BigQuery", "Data Lakes"],
        sampleJob: `Data Engineer
Responsibilities:
- Build reliable, distributed batch and real-time streaming ETL pipelines.
- Manage data lakehouse architectures and ensure data quality/governance.
Requirements:
- 3+ years experience with Airflow, Spark, Kafka, and cloud data warehouses.`
      },
      { id: "da-analytics-eng", title: "Analytics Engineer", skills: ["dbt", "Snowflake", "SQL", "Data Modeling", "Looker", "Git"] },
      { id: "da-db-dev", title: "Database Developer", skills: ["PostgreSQL", "T-SQL", "Stored Procedures", "Query Optimization", "Indexing"] },
      { id: "da-dba", title: "Database Administrator", skills: ["High Availability", "Replication", "Disaster Recovery", "PostgreSQL/Oracle", "Backup"] },
      { id: "da-etl", title: "ETL Developer", skills: ["Informatica", "SSIS", "Talend", "Data Warehousing", "Python ETL"] },
      { id: "da-bigdata", title: "Big Data Engineer", skills: ["Hadoop", "Spark", "Scala", "Hive", "Distributed Computing"] },
      { id: "da-reporting", title: "Reporting Analyst", skills: ["SQL", "SSRS", "Excel Macros", "Data Presentation", "KPIs"] }
    ]
  },
  {
    id: "ai-ml",
    name: "AI and Machine Learning",
    description: "Deep learning, LLMs, computer vision, NLP, and model deployment.",
    icon: "cpu",
    roles: [
      {
        id: "ai-mle",
        title: "Machine Learning Engineer",
        skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "Python", "Model Serving", "Docker", "Feature Stores"],
        sampleJob: `Machine Learning Engineer
Responsibilities:
- Train, evaluate, and deploy machine learning models into production environments.
- Optimize inference latency, monitor model drift, and scale pipeline throughput.
Requirements:
- Proficiency with PyTorch or TensorFlow, Python 3.10+, and Docker containerization.`
      },
      {
        id: "ai-engineer",
        title: "AI Engineer",
        skills: ["LLMs", "RAG Architecture", "LangChain/LlamaIndex", "Vector DBs", "OpenAI API", "Python"],
        sampleJob: `AI Engineer
Responsibilities:
- Build generative AI solutions, semantic retrieval systems, and contextual assistants.
- Integrate vector databases (Milvus, Pinecone, Qdrant) and optimize prompt pipelines.
Requirements:
- Demonstrated hands-on experience with LLM orchestration and embedding search.`
      },
      {
        id: "ai-genai",
        title: "Generative AI Engineer",
        skills: ["Fine-tuning", "LoRA", "Embeddings", "Hugging Face", "Vector Search", "Python", "GPU Optimization"]
      },
      {
        id: "ai-nlp",
        title: "NLP Engineer",
        skills: ["Transformers", "BERT", "Text Classification", "Tokenization", "Spacy", "NER", "PyTorch"]
      },
      {
        id: "ai-cv",
        title: "Computer Vision Engineer",
        skills: ["OpenCV", "YOLO", "Image Segmentation", "PyTorch", "CUDA", "Object Detection"]
      },
      {
        id: "ai-mlops",
        title: "MLOps Engineer",
        skills: ["MLflow", "Kubeflow", "Docker", "CI/CD for ML", "Model Monitoring", "Triton Server", "AWS SageMaker"]
      },
      { id: "ai-applied", title: "Applied AI Engineer", skills: ["Python", "API Integration", "Model Inference", "FastAPI", "Embeddings"] },
      { id: "ai-research", title: "AI Research Engineer", skills: ["Literature Review", "Algorithm Prototyping", "PyTorch", "Mathematical Modeling", "ArXiv"] }
    ]
  },
  {
    id: "cloud-devops",
    name: "Cloud, DevOps and Infrastructure",
    description: "Cloud platforms, container orchestration, SRE, and infrastructure as code.",
    icon: "cloud",
    roles: [
      {
        id: "cloud-eng",
        title: "Cloud Engineer",
        skills: ["AWS", "Azure", "Terraform", "Linux", "IAM", "VPC Networking", "Docker"],
        sampleJob: `Cloud Engineer
Responsibilities:
- Provision, monitor, and optimize scalable multi-region cloud infrastructure.
- Implement security best practices, cost governance, and automated backups.
Requirements:
- Hands-on experience with AWS or Azure cloud services.
- Experience with Infrastructure as Code (Terraform) and Linux administration.`
      },
      { id: "cloud-arch", title: "Cloud Architect", skills: ["Enterprise Architecture", "Multi-Cloud Strategy", "Well-Architected Framework", "Cost Optimization"] },
      { id: "cloud-support", title: "Cloud Support Engineer", skills: ["Incident Response", "AWS CloudWatch", "Troubleshooting", "Networking", "Linux"] },
      { id: "cloud-aws", title: "AWS Cloud Engineer", skills: ["EC2", "S3", "EKS", "Lambda", "CloudFormation", "IAM", "DynamoDB"] },
      { id: "cloud-azure", title: "Azure Engineer", skills: ["Azure DevOps", "Azure Kubernetes", "ARM Templates", "Entra ID", "Virtual Networks"] },
      { id: "cloud-gcp", title: "Google Cloud Engineer", skills: ["GKE", "BigQuery", "Cloud Run", "Compute Engine", "IAM", "Terraform"] },
      {
        id: "cloud-devops-role",
        title: "DevOps Engineer",
        skills: ["Docker", "Kubernetes", "CI/CD (GitHub Actions/GitLab)", "Terraform", "Prometheus", "Bash"],
        sampleJob: `DevOps Engineer
Responsibilities:
- Build and maintain continuous integration and deployment pipelines.
- Automate cluster provisioning and maintain zero-downtime release workflows.
Requirements:
- Deep familiarity with containerization (Docker) and orchestration (Kubernetes).`
      },
      { id: "cloud-sre", title: "Site Reliability Engineer", skills: ["SLIs/SLOs", "Error Budgets", "Incident Response", "Distributed Tracing", "Go/Python"] },
      { id: "cloud-platform", title: "Platform Engineer", skills: ["Internal Developer Platform", "Kubernetes", "Helm", "Crossplane", "ArgoCD"] },
      { id: "cloud-infra", title: "Infrastructure Engineer", skills: ["Bare Metal", "Virtualization", "Linux Internals", "Storage Area Networks", "Ansible"] },
      { id: "cloud-systems", title: "Systems Engineer", skills: ["System Architecture", "OS Tuning", "Bash Scripting", "Monitoring", "Security Patches"] },
      { id: "cloud-linux", title: "Linux Administrator", skills: ["Red Hat/Debian", "Shell Scripting", "Systemd", "SELinux", "NFS/DNS"] },
      { id: "cloud-network", title: "Network Engineer", skills: ["Cisco Routing", "BGP/OSPF", "Firewalls", "VPNs", "Wireshark", "Subnetting"] }
    ]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description: "Threat detection, penetration testing, security operations, and compliance.",
    icon: "shield",
    roles: [
      {
        id: "sec-analyst",
        title: "Cybersecurity Analyst",
        skills: ["SIEM (Splunk/Sentinel)", "Threat Analysis", "Incident Response", "Network Security", "Vulnerability Assessment"],
        sampleJob: `Cybersecurity Analyst
Responsibilities:
- Monitor SIEM alerts, investigate suspicious activity, and triage security incidents.
- Conduct regular vulnerability scans and coordinate patching with engineering teams.
Requirements:
- Understanding of TCP/IP, operating system security logs, and OWASP Top 10.
- Familiarity with tools like Splunk, Wireshark, Nessus, and Burp Suite.`
      },
      {
        id: "sec-engineer",
        title: "Security Engineer",
        skills: ["Firewalls", "Identity & Access Management", "Cryptography", "Python/Bash", "Zero Trust Architecture"],
        sampleJob: `Security Engineer
Responsibilities:
- Implement security controls, automated security scanning, and hard defenses across corporate assets.`
      },
      { id: "sec-soc", title: "SOC Analyst", skills: ["Log Analysis", "EDR Tools", "Phishing Triage", "Playbooks", "SIEM Alerting"] },
      {
        id: "sec-pen-tester",
        title: "Penetration Tester",
        skills: ["Burp Suite", "Metasploit", "Ethical Hacking", "OWASP Top 10", "Network Pivoting", "Report Writing"]
      },
      { id: "sec-ethical-hacker", title: "Ethical Hacker", skills: ["Vulnerability Research", "Exploit Development", "Web App Pen Testing", "Kali Linux"] },
      { id: "sec-appsec", title: "Application Security Engineer", skills: ["SAST/DAST", "Code Review", "Secure SDLC", "Threat Modeling", "DevSecOps"] },
      { id: "sec-cloudsec", title: "Cloud Security Engineer", skills: ["CSPM", "AWS Security Hub", "IAM Least Privilege", "Kube-bench", "Terraform Compliance"] },
      { id: "sec-netsec", title: "Network Security Engineer", skills: ["Next-Gen Firewalls", "IDS/IPS", "SSL Decryption", "Zero Trust", "VPN"] },
      { id: "sec-infosec", title: "Information Security Analyst", skills: ["ISO 27001", "SOC 2 Compliance", "Risk Assessment", "Security Policy"] },
      { id: "sec-secops", title: "Security Operations Engineer", skills: ["SOAR Automation", "Python Scripting", "EDR Deployments", "API Security"] },
      { id: "sec-vuln-mgr", title: "Vulnerability Management Analyst", skills: ["Qualys", "Tenable Nessus", "CVSS Scoring", "Remediation Tracking"] },
      { id: "sec-forensics", title: "Digital Forensics Analyst", skills: ["EnCase", "Volatility Memory Analysis", "Chain of Custody", "Malware Analysis"] }
    ]
  },
  {
    id: "networking-it",
    name: "Networking and IT Support",
    description: "Enterprise IT infrastructure, systems administration, NOC, and user support.",
    icon: "network",
    roles: [
      { id: "it-support", title: "IT Support Engineer", skills: ["Hardware Diagnostics", "Windows/macOS Admin", "Active Directory", "Ticketing (Jira/ServiceNow)", "Office 365"] },
      { id: "it-tech-support", title: "Technical Support Engineer", skills: ["Customer Troubleshooting", "API Debugging", "Log Analysis", "SLA Management"] },
      { id: "it-net-admin", title: "Network Administrator", skills: ["LAN/WAN", "Switching & Routing", "DHCP/DNS", "Wireless APs", "Network Monitoring"] },
      { id: "it-net-ops", title: "Network Operations Engineer", skills: ["Network Monitoring", "Routing Protocols", "Troubleshooting", "Hardware Maintenance"] },
      { id: "it-noc", title: "NOC Engineer", skills: ["24/7 Monitoring", "Alert Escalation", "Nagios/Zabbix", "Runbooks", "Circuit Testing"] },
      { id: "it-sys-admin", title: "System Administrator", skills: ["Windows Server", "Active Directory", "Group Policy", "PowerShell", "VMware"] },
      { id: "it-infra-eng", title: "IT Infrastructure Engineer", skills: ["Server Hardware", "Data Center Operations", "Virtualization", "Disaster Recovery"] },
      { id: "it-ops-eng", title: "IT Operations Engineer", skills: ["ITIL Processes", "Change Management", "Service Delivery", "Automation Scripts"] },
      { id: "it-consultant", title: "Technical Consultant", skills: ["Client Requirements", "System Integration", "Solution Architecture", "Vendor Management"] }
    ]
  },
  {
    id: "qa-testing",
    name: "Testing and Quality Assurance",
    description: "Automated test suites, manual validation, SDET, and performance testing.",
    icon: "check-circle",
    roles: [
      {
        id: "qa-eng",
        title: "QA Engineer",
        skills: ["Test Case Design", "Regression Testing", "Jira", "API Testing (Postman)", "Bug Tracking"],
        sampleJob: `QA Engineer
Responsibilities:
- Formulate comprehensive test plans, test cases, and acceptance test suites.
- Perform exploratory, functional, and regression testing across releases.`
      },
      { id: "qa-sw-test", title: "Software Test Engineer", skills: ["Manual & Automation Testing", "Test Matrix", "Defect Life Cycle", "Cross-Browser Testing"] },
      {
        id: "qa-automation",
        title: "Automation Test Engineer",
        skills: ["Selenium", "Playwright", "Cypress", "Python/Java", "CI/CD Test Pipelines", "Page Object Model"]
      },
      { id: "qa-manual", title: "Manual Test Engineer", skills: ["Functional Testing", "Usability Testing", "Test Case Documentation", "UAT Coordination"] },
      {
        id: "qa-sdet",
        title: "SDET",
        skills: ["Test Automation Frameworks", "Java/Python/TypeScript", "CI/CD", "Load Testing", "API Automation", "Docker"],
        sampleJob: `Software Development Engineer in Test (SDET)
Responsibilities:
- Architect scalable test automation frameworks for end-to-end and API testing.
- Integrate automated tests into continuous delivery pipelines.`
      },
      { id: "qa-perf", title: "Performance Test Engineer", skills: ["JMeter", "k6", "Locust", "Load & Stress Testing", "Bottleneck Analysis"] },
      { id: "qa-quality-eng", title: "Quality Engineer", skills: ["Quality Metrics", "Process Auditing", "Root Cause Analysis", "Standards Compliance"] },
      { id: "qa-test-dev", title: "Test Automation Developer", skills: ["BDD/Cucumber", "Python Automation", "REST Assured", "Reporting Dashboards"] }
    ]
  },
  {
    id: "embedded-systems",
    name: "Embedded Systems and Electronics",
    description: "Microcontrollers, firmware, IoT, FPGA, and hardware validation.",
    icon: "microchip",
    roles: [
      {
        id: "emb-sw-eng",
        title: "Embedded Software Engineer",
        skills: ["Embedded C/C++", "RTOS (FreeRTOS)", "Microcontrollers (STM32/ESP32)", "I2C/SPI/UART", "Oscilloscopes"],
        sampleJob: `Embedded Software Engineer
Responsibilities:
- Develop low-level firmware and device drivers for ARM Cortex-M microcontrollers.
- Interface with hardware peripherals using standard communication protocols.`
      },
      { id: "emb-firmware", title: "Firmware Engineer", skills: ["C/C++", "Bootloaders", "Hardware Debugging (JTAG)", "Power Optimization", "Memory Constraints"] },
      { id: "emb-iot", title: "IoT Engineer", skills: ["MQTT", "CoAP", "Embedded Linux", "BLE/WiFi", "Sensor Interfacing", "AWS IoT Core"] },
      { id: "emb-robotics", title: "Robotics Software Engineer", skills: ["ROS/ROS2", "C++", "Kinematics", "LIDAR/Sensors", "Path Planning"] },
      { id: "emb-hw-val", title: "Hardware Validation Engineer", skills: ["Signal Integrity", "Board Bring-up", "LabVIEW", "Schematic Review", "Test Benches"] },
      { id: "emb-vlsi", title: "VLSI Design Engineer", skills: ["Verilog/VHDL", "RTL Design", "Synthesis", "Static Timing Analysis", "ASIC Flow"] },
      { id: "emb-fpga", title: "FPGA Engineer", skills: ["Xilinx Vivado", "VHDL/Verilog", "High-Speed Interfaces", "DSP Blocks", "Simulation"] },
      { id: "emb-electronics", title: "Electronics Design Engineer", skills: ["PCB Layout (Altium/KiCad)", "Circuit Simulation (SPICE)", "Analog & Digital Design", "Component Selection"] },
      { id: "emb-sys-val", title: "Systems Validation Engineer", skills: ["Hardware-in-the-Loop (HIL)", "Automated Test Benches", "Python Instrument Control", "Compliance"] }
    ]
  },
  {
    id: "enterprise-tech",
    name: "Enterprise and Business Technology",
    description: "ERP, CRM, enterprise integrations, automation, and solutions engineering.",
    icon: "briefcase",
    roles: [
      { id: "ent-sap", title: "SAP Technical Consultant", skills: ["SAP ABAP", "SAP S/4HANA", "Fiori", "BAPI", "IDocs", "Integration"] },
      { id: "ent-salesforce", title: "Salesforce Developer", skills: ["Apex", "Lightning Web Components (LWC)", "SOQL", "Triggers", "Salesforce Flow"] },
      { id: "ent-erp", title: "ERP Technical Consultant", skills: ["ERP Customization", "Data Migration", "Business Process Mapping", "SQL"] },
      { id: "ent-rpa", title: "RPA Developer", skills: ["UiPath", "Automation Anywhere", "Process Automation", "VBA", "Power Automate"] },
      { id: "ent-integration", title: "Integration Engineer", skills: ["MuleSoft", "Boomi", "REST/SOAP", "API Gateways", "Enterprise Service Bus"] },
      { id: "ent-solutions", title: "Solutions Engineer", skills: ["Technical Pre-Sales", "System Architecture", "Client Demos", "POC Development"] },
      { id: "ent-implementation", title: "Implementation Engineer", skills: ["Software Deployment", "Client Configuration", "Data Onboarding", "User Training"] },
      { id: "ent-tech-ba", title: "Technical Business Analyst", skills: ["Business Requirements", "Functional Specs", "Gap Analysis", "Stakeholder Management"] }
    ]
  },
  {
    id: "emerging-tech",
    name: "Emerging and Specialist Roles",
    description: "Blockchain, AR/VR, gaming, GIS, product engineering, and R&D.",
    icon: "sparkles",
    roles: [
      { id: "emg-blockchain", title: "Blockchain Developer", skills: ["Solidity", "Smart Contracts", "Web3.js/Ethers.js", "Ethereum", "Cryptography", "DeFi"] },
      { id: "emg-ar-vr", title: "AR/VR Developer", skills: ["Unity/Unreal Engine", "C#", "3D Math", "Spatial Audio", "OpenXR", "Shader Programming"] },
      { id: "emg-game", title: "Game Developer", skills: ["C++", "Unity/Unreal", "Game Physics", "Rendering Pipelines", "Gameplay Mechanics"] },
      { id: "emg-gis", title: "GIS Developer", skills: ["ArcGIS", "QGIS", "GeoServer", "PostGIS", "Leaflet/Mapbox", "Spatial Analysis"] },
      { id: "emg-rd", title: "Research and Development Engineer", skills: ["Prototyping", "Technical Feasibility", "Patents", "Applied Science", "Experimental Design"] },
      { id: "emg-product-eng", title: "Product Engineer", skills: ["Full-Lifecycle Delivery", "Customer Discovery", "Technical Scoping", "Fast Iteration"] },
      { id: "emg-tech-pa", title: "Technical Product Analyst", skills: ["Product Metrics", "SQL Analysis", "Feature Prioritization", "A/B Testing"] }
    ]
  }
];

/**
 * Other / Custom Role option definition
 */
export const CUSTOM_ROLE_OPTION = {
  id: "custom",
  title: "Other / Custom Role",
  isCustom: true
};

/**
 * Returns all engineering domains
 */
export function getDomains() {
  return ENGINEERING_DOMAINS;
}

/**
 * Returns a domain by its ID
 */
export function getDomainById(domainId) {
  return ENGINEERING_DOMAINS.find((d) => d.id === domainId) || null;
}

/**
 * Returns all roles for a given domain, appending the Custom Role option
 */
export function getRolesForDomain(domainId, includeCustom = true) {
  const domain = getDomainById(domainId);
  if (!domain) {
    return includeCustom ? [CUSTOM_ROLE_OPTION] : [];
  }
  const roles = [...domain.roles];
  if (includeCustom) {
    roles.push(CUSTOM_ROLE_OPTION);
  }
  return roles;
}

/**
 * Returns all roles across all domains (flattened)
 */
export function getAllRoles(includeCustom = false) {
  const all = [];
  ENGINEERING_DOMAINS.forEach((domain) => {
    domain.roles.forEach((r) => {
      all.push({ ...r, domainId: domain.id, domainName: domain.name });
    });
  });
  if (includeCustom) {
    all.push(CUSTOM_ROLE_OPTION);
  }
  return all;
}

/**
 * Finds a specific role by its ID
 */
export function findRoleById(roleId) {
  if (roleId === "custom") return CUSTOM_ROLE_OPTION;
  for (const domain of ENGINEERING_DOMAINS) {
    const found = domain.roles.find((r) => r.id === roleId);
    if (found) {
      return { ...found, domainId: domain.id, domainName: domain.name };
    }
  }
  return null;
}

