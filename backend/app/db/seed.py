import logging
from sqlalchemy.orm import Session
from ..db.session import engine, SessionLocal, Base
from ..models.career import (
    Domain,
    Role,
    DomainRole,
    Skill,
    RoleSkill,
    Roadmap,
    RoadmapStage,
    Milestone,
    MilestoneSkill,
    Project,
    MilestoneProject,
)

logger = logging.getLogger("seed")
logging.basicConfig(level=logging.INFO)


def seed_database(db: Session = None):
    close_at_end = False
    if db is None:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        close_at_end = True

    try:
        # Check if domains already seeded
        existing_domain = db.query(Domain).filter(Domain.slug == "software-engineering").first()
        if existing_domain:
            logger.info("Database already seeded. Skipping initial seed.")
            return

        logger.info("Starting database seeding for 5 Core Software IT Domains...")

        # -------------------------------------------------------------
        # 1. CORE DOMAINS
        # -------------------------------------------------------------
        domains_data = [
            {
                "slug": "software-engineering",
                "name": "Software Engineering & Full Stack",
                "title": "Software Engineering & Full Stack",
                "description": "Full-stack web architecture, distributed systems, clean RESTful APIs, and scalable software design.",
                "overview": "Software Engineering is the foundation of modern digital products. It bridges human intent and computational hardware, turning business requirements into scalable, fault-tolerant web and mobile systems.",
                "why_it_matters": "Every modern enterprise relies on mission-critical software. Mastering core software engineering gives freshers the highest hiring mobility, strong fundamentals in algorithms, and direct architectural impact.",
                "applications": [
                    {"title": "High-Throughput Web Platforms", "description": "Microservice web applications handling millions of concurrent requests."},
                    {"title": "REST & GraphQL APIs", "description": "Low-latency data interchange layers powering mobile and web frontends."},
                    {"title": "Cloud Distributed Systems", "description": "Fault-tolerant clusters with distributed caching, queueing, and state management."},
                    {"title": "Enterprise Full-Stack Portals", "description": "Interactive data-rich dashboard frontends linked to transactional SQL databases."}
                ],
                "professional_work": [
                    {"title": "Designing Scalable Architecture", "description": "Drafting technical design documents, selecting database schemas, and defining REST API contracts."},
                    {"title": "Writing Production Code", "description": "Implementing business logic in TypeScript, Python, or Java with unit and integration tests."},
                    {"title": "Optimizing Performance", "description": "Diagnosing database query bottlenecks, profiling API response times, and implementing Redis caching."},
                    {"title": "Code Reviews & CI/CD", "description": "Reviewing pull requests, maintaining test coverage, and automating zero-downtime deployment pipelines."}
                ],
                "technologies": [
                    {"name": "TypeScript / JavaScript", "description": "Type-safe language powering universal frontend and backend development.", "why_it_matters": "De facto standard for client interfaces and high-throughput Node.js services."},
                    {"name": "React & Next.js", "description": "Component-based declarative UI framework with server-side rendering.", "why_it_matters": "Most widely requested frontend framework in industry tech job descriptions."},
                    {"name": "FastAPI & Node.js", "description": "High-performance asynchronous backend application frameworks.", "why_it_matters": "Delivers sub-20ms API response times and rapid feature implementation."},
                    {"name": "PostgreSQL", "description": "Advanced relational database with ACID guarantees and JSON capabilities.", "why_it_matters": "Primary persistent data layer for high-integrity production software."},
                    {"name": "Docker & Git", "description": "Containerization and distributed version control.", "why_it_matters": "Essential for reproducible dev environments and automated CI/CD deployment."}
                ],
                "milestone_count": 9,
            },
            {
                "slug": "data-science",
                "name": "Data Analytics & Data Science",
                "title": "Data Analytics & Data Science",
                "description": "Statistical modeling, exploratory data analysis, business intelligence, and big-data engineering pipelines.",
                "overview": "Data Science and Analytics empower organizations to turn raw, messy transactional logs into strategic business insights, predictive intelligence, and automated decision-making engines.",
                "why_it_matters": "Companies generate petabytes of data daily. Converting this data into actionable metrics, predictive customer models, and reliable reporting is essential for enterprise revenue and competitive strategy.",
                "applications": [
                    {"title": "Executive Business Intelligence", "description": "Interactive KPI dashboards that visualize revenue, churn, and operational metrics in real-time."},
                    {"title": "Predictive Customer Modeling", "description": "Machine learning classifiers predicting customer churn, lifetime value, and lead scoring."},
                    {"title": "A/B Testing & Product Experimentation", "description": "Rigorous hypothesis testing to evaluate product changes against statistical significance."},
                    {"title": "Automated ETL/ELT Lakehouses", "description": "Scalable pipelines that ingest, clean, and model terabytes of transactional data into Star Schemas."}
                ],
                "professional_work": [
                    {"title": "Diagnostic & Descriptive Analysis", "description": "Writing complex multi-table SQL queries to isolate why metrics spiked or dropped."},
                    {"title": "Predictive Feature Engineering", "description": "Transforming raw event timestamps and text logs into numerical features for machine learning."},
                    {"title": "Dashboard Design & Stakeholder Storytelling", "description": "Building intuitive Power BI / Tableau dashboards and presenting insights to executive leadership."},
                    {"title": "Pipeline Construction & Data Quality", "description": "Writing automated Python and dbt pipelines with assertions to prevent corrupted metrics."}
                ],
                "technologies": [
                    {"name": "Advanced SQL", "description": "Window functions, common table expressions (CTEs), and query plan optimization.", "why_it_matters": "The universal language of data manipulation across every enterprise database and warehouse."},
                    {"name": "Python (Pandas & NumPy)", "description": "Vectorized dataframe manipulation and numerical data processing library.", "why_it_matters": "The core tool for cleaning, transforming, and analyzing tabular datasets."},
                    {"name": "Power BI & DAX", "description": "Enterprise reporting and business intelligence visualization suite.", "why_it_matters": "Most widely deployed corporate dashboarding platform for non-technical leadership."},
                    {"name": "Scikit-Learn & Statsmodels", "description": "Statistical modeling and machine learning algorithms.", "why_it_matters": "Standard toolkit for hypothesis testing, linear regression, and classification."},
                    {"name": "Apache Airflow & dbt", "description": "Workflow DAG orchestrator and SQL transformation tool.", "why_it_matters": "Enables automated, version-controlled, and test-driven data warehouse pipelines."}
                ],
                "milestone_count": 8,
            },
            {
                "slug": "ai-ml",
                "name": "Artificial Intelligence & Machine Learning",
                "title": "Artificial Intelligence & Machine Learning",
                "description": "Deep learning architectures, neural network training, transformer embeddings, and production MLOps.",
                "overview": "Artificial Intelligence & Machine Learning focuses on building computational models that learn from historical experience, perceive multimodal signals, and generate human-grade reasoning and solutions.",
                "why_it_matters": "AI is redefining enterprise productivity. From semantic retrieval to autonomous agents and computer vision, specialized AI engineers build systems that operate beyond deterministic rules.",
                "applications": [
                    {"title": "Retrieval-Augmented Generation (RAG)", "description": "Semantic search pipelines combining vector embeddings with LLM generation for enterprise knowledge."},
                    {"title": "Computer Vision & Edge Detection", "description": "Real-time object classification, image segmentation, and video stream telemetry."},
                    {"title": "Low-Latency Model Serving", "description": "Inference microservices serving deep learning models under strict millisecond latency budgets."},
                    {"title": "Autonomous Agent Systems", "description": "Multi-agent workflows utilizing tool calling, structured planning, and API integrations."}
                ],
                "professional_work": [
                    {"title": "Model Architecture & Training", "description": "Selecting neural network architectures, designing loss functions, and executing training loops in PyTorch."},
                    {"title": "Vector Embeddings & Search", "description": "Indexing unstructured text/images into high-dimensional vector spaces using FAISS and vector databases."},
                    {"title": "MLOps & Drift Telemetry", "description": "Deploying models in Docker, tracking experiments in MLflow, and monitoring distribution drift in production."},
                    {"title": "Latency & Model Quantization", "description": "Optimizing weights using ONNX, TensorRT, and 4-bit/8-bit quantization for rapid CPU/GPU inference."}
                ],
                "technologies": [
                    {"name": "PyTorch", "description": "Dynamic tensor computation and deep learning framework.", "why_it_matters": "Dominant framework used by leading AI research labs and production generative AI teams."},
                    {"name": "Hugging Face Transformers", "description": "State-of-the-art pretrained transformer model repository and fine-tuning library.", "why_it_matters": "De facto standard for utilizing pretrained NLP, vision, and multimodal models."},
                    {"name": "FAISS & Vector DBs", "description": "High-speed vector similarity search library.", "why_it_matters": "Enables sub-10ms semantic document retrieval over millions of embeddings."},
                    {"name": "FastAPI & Docker", "description": "Asynchronous microservice framework containerized for GPU environments.", "why_it_matters": "Standard runtime stack for serving AI predictions reliably to web applications."},
                    {"name": "MLflow & Weights & Biases", "description": "Experiment tracking, model registry, and lifecycle management.", "why_it_matters": "Guarantees reproducibility, hyperparameter audit trails, and seamless model deployment."}
                ],
                "milestone_count": 8,
            },
            {
                "slug": "cloud-devops",
                "name": "Cloud, DevOps & SRE",
                "title": "Cloud, DevOps & SRE",
                "description": "Infrastructure as Code, automated CI/CD pipelines, container orchestration, and high-availability systems reliability.",
                "overview": "Cloud, DevOps & Site Reliability Engineering (SRE) bridges software development with cloud infrastructure. It guarantees that applications deploy continuously, scale elastically, and maintain five-nines uptime.",
                "why_it_matters": "Software that cannot deploy reliably or crashes under load provides zero business value. DevOps engineers ensure automated delivery pipelines, cost-effective cloud scaling, and instantaneous disaster recovery.",
                "applications": [
                    {"title": "Kubernetes Container Orchestration", "description": "Automated scheduling, auto-scaling, and self-healing for containerized microservice fleets."},
                    {"title": "Infrastructure as Code (IaC)", "description": "Declarative multi-cloud provisioning using Terraform to eliminate manual configuration drift."},
                    {"title": "Automated Zero-Downtime CI/CD", "description": "Deployment pipelines executing unit tests, security scans, and blue/green production rollouts."},
                    {"title": "Observability & Alerting Stacks", "description": "Real-time metrics, distributed tracing, and automated alerting using Prometheus and Grafana."}
                ],
                "professional_work": [
                    {"title": "Automating Build & Release Pipelines", "description": "Authoring GitHub Actions and GitLab CI workflows that test and package Docker images automatically."},
                    {"title": "Provisioning Cloud Infrastructure", "description": "Writing reusable Terraform modules for VPC networks, Kubernetes clusters, and managed databases."},
                    {"title": "Managing Kubernetes Clusters", "description": "Configuring Ingress controllers, resource limits, secrets, and Horizontal Pod Autoscalers (HPA)."},
                    {"title": "Incident Management & Postmortems", "description": "Responding to high-priority alerts, tracing latency spikes, and publishing preventative postmortems."}
                ],
                "technologies": [
                    {"name": "Docker & Containers", "description": "Standardized application packaging with isolated dependencies.", "why_it_matters": "Eliminates 'it works on my machine' defects and ensures identical staging/production parity."},
                    {"name": "Kubernetes (K8s)", "description": "Industrial container orchestration and cluster management platform.", "why_it_matters": "The universal operating system of modern cloud computing."},
                    {"name": "Terraform", "description": "Declarative Infrastructure as Code (IaC) tool.", "why_it_matters": "Enables reproducible, version-controlled cloud infrastructure across AWS, GCP, and Azure."},
                    {"name": "Linux & Bash", "description": "UNIX internals, networking, process management, and shell automation.", "why_it_matters": "The foundational environment for all cloud workloads and servers."},
                    {"name": "Prometheus & Grafana", "description": "Time-series metrics collection and visualization dashboarding.", "why_it_matters": "Provides immediate real-time visibility into CPU, memory, error rates, and latency."}
                ],
                "milestone_count": 8,
            },
            {
                "slug": "cybersecurity",
                "name": "Cybersecurity & Information Security",
                "title": "Cybersecurity & Information Security",
                "description": "Network telemetry, vulnerability management, defensive SOC analysis, and zero-trust security architecture.",
                "overview": "Cybersecurity protects critical infrastructure, software codebases, and sensitive customer data against malicious exploitation, data breaches, and sophisticated persistent threat actors.",
                "why_it_matters": "Cyber attacks cost the global economy trillions annually. Organizations prioritize proactive defense, secure code audits, and rapid incident response to defend user trust and regulatory compliance.",
                "applications": [
                    {"title": "Security Operations Center (SOC)", "description": "Continuous telemetry monitoring, alert triage, and log analysis to detect intrusion attempts."},
                    {"title": "Application Security (AppSec)", "description": "Automated SAST/DAST code scanning, OWASP vulnerability patching, and secure API design."},
                    {"title": "Network Defense & Packet Forensics", "description": "Packet inspection, firewall ACL enforcement, and intrusion detection systems (Snort/Zeek)."},
                    {"title": "Zero-Trust Identity Governance", "description": "Multi-factor authentication (MFA), role-based access control (RBAC), and least-privilege enforcement."}
                ],
                "professional_work": [
                    {"title": "Security Telemetry & SIEM Triage", "description": "Analyzing security event logs in Splunk/Wazuh to isolate indicators of compromise (IOCs)."},
                    {"title": "Vulnerability Assessment", "description": "Running vulnerability scans, evaluating CVE severity, and recommending technical remediation."},
                    {"title": "Penetration Testing & Secure Code Review", "description": "Auditing application source code against SQL injection, XSS, and broken object level authorization."},
                    {"title": "Incident Containment & Response", "description": "Isolating infected endpoints, performing memory/disk forensics, and restoring secure baselines."}
                ],
                "technologies": [
                    {"name": "Wireshark & Packet Analysis", "description": "Network protocol analyzer for dissecting TCP/IP streams and encrypted handshakes.", "why_it_matters": "Essential for detecting port scans, malicious beacons, and data exfiltration."},
                    {"name": "SIEM (Splunk / Wazuh)", "description": "Security Information and Event Management platform for aggregating enterprise logs.", "why_it_matters": "Central cockpit for detecting real-time anomalies and coordinated attacks."},
                    {"name": "Linux Security & Hardening", "description": "Kernel hardening, iptables, SSH bastion keys, and file permission auditing.", "why_it_matters": "Ensures server infrastructure is locked down against privilege escalation exploits."},
                    {"name": "OWASP Top 10 Tooling", "description": "Burp Suite, OWASP ZAP, and dependency vulnerability scanners.", "why_it_matters": "Critical for discovering and remediating high-risk flaws before production deployment."},
                    {"name": "Cryptography & TLS", "description": "Public key infrastructure (PKI), AES encryption, and certificate management.", "why_it_matters": "Protects data-in-transit and data-at-rest against tampering and eavesdropping."}
                ],
                "milestone_count": 8,
            },
        ]

        domain_objs = {}
        for d_info in domains_data:
            d = Domain(**d_info)
            db.add(d)
            db.flush()
            domain_objs[d.slug] = d

        logger.info("5 Core Domains created successfully.")

        # -------------------------------------------------------------
        # 2. SEED THE 4 DISTINCT ROLES UNDER DATA SCIENCE (VERTICAL SLICE)
        # -------------------------------------------------------------
        data_science_domain = domain_objs["data-science"]

        roles_data = [
            {
                "slug": "data-analyst",
                "title": "Data Analyst / BI Analyst",
                "domain_slug": "data-science",
                "is_primary": True,
                "focus": "Descriptive & Diagnostic Analytics, Data Warehousing, KPI Dashboards",
                "description": "Transforms raw transactional records into actionable executive intelligence, interactive Power BI/Tableau reports, and automated KPI metrics.",
                "responsibilities": "Write complex SQL with window functions, clean messy datasets in Python, design intuitive executive dashboards, and present data-backed recommendations to management.",
                "tasks": [
                    "Query multi-table relational databases to extract sales, churn, and operational metrics",
                    "Design interactive executive KPI dashboards with automated data refresh schedules",
                    "Conduct exploratory data analysis in Python (Pandas) to uncover metric variance drivers",
                    "Present findings in weekly business review meetings and translate metrics into business actions"
                ],
                "tools": ["SQL (PostgreSQL)", "Power BI & DAX", "Python (Pandas, Seaborn)", "Excel Power Query", "Tableau", "Git"],
                "deliverables": [
                    "Automated Executive Sales KPI Dashboard & Data Mart",
                    "Star-Schema Dimensional Data Model",
                    "Customer Retention & Churn Diagnostic Report",
                    "Automated Data Quality & Ingestion Pipeline"
                ],
                "prerequisites": ["Basic relational algebra & SQL queries", "Spreadsheet formulas & pivot tables", "Curiosity about business KPIs and metric storytelling"],
                "stages": [
                    {
                        "number": 1,
                        "name": "Stage 1 — Foundations",
                        "subtitle": "Year 1 • Core Foundations & Database Literacy",
                        "duration": "Year 1 (Semesters 1 & 2)",
                        "milestones": [
                            {
                                "number": 1,
                                "title": "SQL Fundamentals & Relational Schema Exploration",
                                "duration": "4–6 Weeks",
                                "description": "Master SQL query composition (SELECT, WHERE, JOIN, GROUP BY, HAVING) and understand relational entity relationships.",
                                "why_it_matters": "90% of business data lives in relational databases. Fluent query writing is the primary test in data interview rounds.",
                                "concepts": ["Relational schemas & primary/foreign keys", "Multi-table INNER and LEFT JOIN logic", "Aggregation functions & GROUP BY grouping sets", "Data filtering & NULL handling"],
                                "tools": ["PostgreSQL", "pgAdmin", "DBeaver", "SQL"],
                                "exercises": ["Write 25 SQL queries analyzing an e-commerce database with customers, orders, and products.", "Diagnose orphaned records using LEFT JOIN checks."],
                                "completion_criteria": ["All 25 queries execute without errors and produce accurate analytical result sets.", "Clean Git repository committed with documented SQL scripts."],
                                "skills": ["SQL Basics", "Relational Database Exploration", "Data Filtering & Aggregations"],
                                "project_slug": "relational-sql-audit-suite"
                            },
                            {
                                "number": 2,
                                "title": "Spreadsheet Modeling & Business KPI Foundations",
                                "duration": "4–6 Weeks",
                                "description": "Build dynamic financial and operational models using advanced spreadsheet formulas, pivot tables, and Power Query.",
                                "why_it_matters": "Spreadsheets remain the universal communication bridge between technical analysts and executive decision makers.",
                                "concepts": ["XLOOKUP, INDEX/MATCH, and dynamic arrays", "Pivot tables and multi-dimensional slicers", "Power Query automated data transformation", "Calculating CAC, LTV, MRR, and churn rates"],
                                "tools": ["Microsoft Excel", "Google Sheets", "Power Query"],
                                "exercises": ["Consolidate 12 monthly CSV sales files using Power Query into a single normalized table.", "Build a dynamic customer retention cohort spreadsheet."],
                                "completion_criteria": ["Power Query refresh button automatically updates all linked charts with zero manual edits.", "Fully validated financial workbook with zero formula errors."],
                                "skills": ["Spreadsheet Modeling", "Power Query", "Business KPI Calculations"],
                                "project_slug": "automated-executive-sales-dashboard"
                            }
                        ]
                    },
                    {
                        "number": 2,
                        "name": "Stage 2 — Core Skills",
                        "subtitle": "Year 2 • Advanced SQL & Vectorized Data Wrangling",
                        "duration": "Year 2 (Semesters 3 & 4)",
                        "milestones": [
                            {
                                "number": 3,
                                "title": "Advanced SQL: Window Functions & Analytical CTEs",
                                "duration": "5–6 Weeks",
                                "description": "Write enterprise-grade SQL using window functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD) and recursive Common Table Expressions.",
                                "why_it_matters": "Window functions are tested in 100% of junior data analyst coding assessments to evaluate complex logic capability.",
                                "concepts": ["OVER(PARTITION BY ... ORDER BY ...)", "Running totals and moving averages", "Period-over-period growth rates with LAG/LEAD", "Recursive CTEs for hierarchical data"],
                                "tools": ["PostgreSQL", "BigQuery / Snowflake", "SQL"],
                                "exercises": ["Calculate monthly active user (MAU) retention and month-over-month revenue growth using LAG.", "Rank top 3 performing products per sales territory."],
                                "completion_criteria": ["Write 15 advanced analytical queries passing all reference benchmark unit tests.", "Document explain plans showing query performance optimization."],
                                "skills": ["Advanced SQL (Window Functions)", "Analytical CTEs", "Period-over-Period Calculations"],
                                "project_slug": "relational-sql-audit-suite"
                            },
                            {
                                "number": 4,
                                "title": "Vectorized Data Wrangling with Python & Pandas",
                                "duration": "5–6 Weeks",
                                "description": "Use Python and Pandas to clean dirty real-world datasets, impute missing values, parse timestamps, and export clean analytical tables.",
                                "why_it_matters": "Real-world data is messy. Pandas is the standard Python tool for exploratory data analysis and programmatic data transformation.",
                                "concepts": ["Pandas Series & DataFrames indexing", "Handling NaN, duplicates, and type casting", "Datetime extraction and timezone parsing", "GroupBy aggregations and custom apply transforms"],
                                "tools": ["Python", "Pandas", "NumPy", "Jupyter Notebooks"],
                                "exercises": ["Clean a raw 50,000-row customer telemetry CSV file with missing dates and corrupted numbers.", "Export clean tidy datasets to PostgreSQL."],
                                "completion_criteria": ["Clean automated Python script that executes idempotently on raw inputs.", "Comprehensive exploratory Jupyter notebook with inline summary statistics."],
                                "skills": ["Python for Data", "Pandas & NumPy", "Data Cleaning & Type Casting"],
                                "project_slug": "customer-cohort-churn-suite"
                            }
                        ]
                    },
                    {
                        "number": 3,
                        "name": "Stage 3 — Specialization",
                        "subtitle": "Year 3 • Dimensional Modeling & Enterprise BI Dashboards",
                        "duration": "Year 3 (Semesters 5 & 6)",
                        "milestones": [
                            {
                                "number": 5,
                                "title": "Dimensional Modeling & Star Schema Data Warehousing",
                                "duration": "5–6 Weeks",
                                "description": "Design Kimball star schemas with fact tables and dimension tables (conformed dimensions, surrogate keys, slowly changing dimensions).",
                                "why_it_matters": "Clean star schemas are the backbone of fast BI queries and reliable data warehouse reporting.",
                                "concepts": ["Fact tables vs Dimension tables", "Grain definition and surrogate key generation", "Slowly Changing Dimensions (SCD Type 1 & Type 2)", "Denormalization for fast BI performance"],
                                "tools": ["PostgreSQL", "dbt Basics", "DBDiagram.io"],
                                "exercises": ["Design a complete star schema for a retail SaaS business.", "Write SQL transformations staging raw records into Fact and Dim tables."],
                                "completion_criteria": ["Entity Relationship diagram with 1 Fact table and 4 Dimension tables.", "Staged dimensional tables loaded into database with automated integrity checks."],
                                "skills": ["Dimensional Modeling", "Star Schema Design", "Data Warehousing Basics"],
                                "project_slug": "automated-executive-sales-dashboard"
                            },
                            {
                                "number": 6,
                                "title": "Interactive Dashboarding in Power BI with DAX",
                                "duration": "5–6 Weeks",
                                "description": "Build executive-grade Power BI dashboards using custom DAX measures, time intelligence, dynamic visual filters, and row-level security.",
                                "why_it_matters": "Dashboards are the final deliverable seen by C-level executives. Visual clarity and interactive DAX measures drive business adoption.",
                                "concepts": ["DAX CALCULATE, FILTER, and ALL functions", "Time-intelligence DAX (YTD, QTD, YoY)", "Star schema relationships & cross-filtering directions", "Designing intuitive user navigation and tooltips"],
                                "tools": ["Power BI Desktop", "DAX", "Tableau Public"],
                                "exercises": ["Build a 3-page interactive Power BI dashboard tracking Revenue, Churn, and Sales Rep Quotas.", "Author 10 custom DAX measures calculating Year-over-Year revenue growth."],
                                "completion_criteria": ["Published Power BI (.pbix) file with interactive cross-filtering.", "Executive video walkthrough showcasing insights and drill-downs."],
                                "skills": ["Power BI & DAX", "Executive Dashboard Design", "Data Storytelling"],
                                "project_slug": "automated-executive-sales-dashboard"
                            }
                        ]
                    },
                    {
                        "number": 4,
                        "name": "Stage 4 — Career Readiness",
                        "subtitle": "Year 4 • Diagnostic Analytics & Fresher Hiring Capstone",
                        "duration": "Year 4 (Semesters 7 & 8)",
                        "milestones": [
                            {
                                "number": 7,
                                "title": "Diagnostic Analytics: Customer Cohort & Churn Exploration",
                                "duration": "6 Weeks",
                                "description": "Execute an end-to-end diagnostic investigation into customer churn using cohort heatmaps, funnel drops, and statistical variance.",
                                "why_it_matters": "Proves you can do more than summarize data—you can uncover root causes and recommend actionable strategic interventions.",
                                "concepts": ["Cohort retention matrix calculation", "Conversion funnel drop-off analysis", "Statistical variance & correlation matrices", "Structuring executive recommendation memos"],
                                "tools": ["Python", "Seaborn / Matplotlib", "SQL", "Streamlit"],
                                "exercises": ["Build a retention cohort heatmap in Python showing 12-month customer drop-offs.", "Write an executive memo detailing top 3 drivers of customer attrition."],
                                "completion_criteria": ["Interactive Streamlit diagnostic dashboard showcasing cohort analysis.", "Executive PDF memo with clear business recommendations."],
                                "skills": ["Cohort Analysis", "Diagnostic Analytics", "Executive Presentation"],
                                "project_slug": "customer-cohort-churn-suite"
                            },
                            {
                                "number": 8,
                                "title": "End-to-End Enterprise BI Capstone & Portfolio Polish",
                                "duration": "6 Weeks",
                                "description": "Deploy a complete public portfolio demonstrating data pipeline extraction, warehouse modeling, and interactive BI reporting.",
                                "why_it_matters": "Hiring managers look for verified proof of work. A clean GitHub repository and live BI demo separate top freshers from average applicants.",
                                "concepts": ["Production README writing with architecture diagrams", "Documenting data dictionaries and metric definitions", "Technical interview presentation preparation", "Packaging code, SQL scripts, and dashboard links"],
                                "tools": ["GitHub", "Power BI Service / Tableau Public", "Markdown"],
                                "exercises": ["Publish a complete data analyst portfolio project with clean code and high-resolution dashboard screenshots.", "Record a 5-minute technical presentation answering typical interviewer questions."],
                                "completion_criteria": ["Live public GitHub repo with documentation, data schema, and interactive demo link.", "Passed mock technical interview evaluation with 90%+ readiness."],
                                "skills": ["Portfolio Engineering", "Technical Communication", "Fresher Hiring Readiness"],
                                "project_slug": "automated-executive-sales-dashboard"
                            }
                        ]
                    }
                ]
            },
            {
                "slug": "data-scientist",
                "title": "Data Scientist",
                "domain_slug": "data-science",
                "is_primary": False,
                "focus": "Predictive Analytics, Statistical Inference, Hypothesis Testing, Machine Learning",
                "description": "Formulates hypothesis-driven statistical experiments, engineers predictive features from behavioral logs, and validates machine learning models with A/B tests.",
                "responsibilities": "Formulate business hypotheses, design randomized experiments, build predictive models in scikit-learn, and explain model decisions using SHAP values.",
                "tasks": [
                    "Formulate business questions into statistical hypothesis tests and probabilistic experiments",
                    "Clean and transform multi-dimensional datasets into predictive feature stores",
                    "Train, evaluate, and tune supervised machine learning algorithms (Random Forests, XGBoost, Logistic Regression)",
                    "Run A/B test power analyses and interpret experimental conversion uplift"
                ],
                "tools": ["Python", "Scikit-Learn", "Statsmodels", "XGBoost", "Jupyter", "SQL", "Streamlit"],
                "deliverables": [
                    "Customer Lifetime Value (LTV) Predictive Regressor",
                    "A/B Testing Statistical Decision Engine & Power Calculator",
                    "Behavioral Churn Classifier with Feature Importance Explanation (SHAP)",
                    "Interactive Streamlit Machine Learning Prototype"
                ],
                "prerequisites": ["Applied probability & statistics", "Proficiency in Python programming", "Basic linear algebra & calculus"],
                "stages": [
                    {
                        "number": 1,
                        "name": "Stage 1 — Foundations",
                        "subtitle": "Year 1 • Probability, Linear Algebra & Scientific Python",
                        "duration": "Year 1 (Semesters 1 & 2)",
                        "milestones": [
                            {
                                "number": 1,
                                "title": "Scientific Python, Linear Algebra & Matrix Math",
                                "duration": "4–6 Weeks",
                                "description": "Master NumPy array operations, matrix multiplication, vector norms, and basic calculus for data science.",
                                "why_it_matters": "All machine learning models are fundamentally linear algebra and optimization equations.",
                                "concepts": ["Vector dot products and matrix operations in NumPy", "Eigenvalues, eigenvectors, and dimensionality reduction intuition", "Derivatives, gradients, and loss functions", "Vectorized calculations without Python loops"],
                                "tools": ["Python", "NumPy", "SciPy", "Jupyter"],
                                "exercises": ["Implement linear regression from scratch using NumPy matrix equations.", "Implement gradient descent optimization on a synthetic quadratic function."],
                                "completion_criteria": ["From-scratch implementation matches scikit-learn outputs to 4 decimal places.", "Clean documented Jupyter notebook."],
                                "skills": ["NumPy & Linear Algebra", "Optimization Fundamentals", "Scientific Python"],
                                "project_slug": "statistical-hypothesis-engine"
                            },
                            {
                                "number": 2,
                                "title": "Applied Probability & Exploratory Data Distribution",
                                "duration": "4–6 Weeks",
                                "description": "Analyze data distributions (Gaussian, Binomial, Poisson), calculate central tendencies, skewness, and detect outliers.",
                                "why_it_matters": "Understanding distributions prevents invalid modeling assumptions and misleading interpretations.",
                                "concepts": ["Probability density functions and cumulative distributions", "Central Limit Theorem in practice", "Z-scores, IQR, and robust outlier detection", "Bivariate correlation and confounding variables"],
                                "tools": ["Python", "SciPy Stats", "Seaborn", "Matplotlib"],
                                "exercises": ["Verify Central Limit Theorem empirically using Monte Carlo sampling in Python.", "Identify and handle extreme outliers in a real-world housing dataset."],
                                "completion_criteria": ["Sampling simulations plot convergent normal curves across 10,000 iterations.", "Documented outlier remediation strategy."],
                                "skills": ["Applied Probability", "Distribution Analysis", "Exploratory Data Analysis"],
                                "project_slug": "statistical-hypothesis-engine"
                            }
                        ]
                    },
                    {
                        "number": 2,
                        "name": "Stage 2 — Core Skills",
                        "subtitle": "Year 2 • Statistical Inference & Supervised Machine Learning",
                        "duration": "Year 2 (Semesters 3 & 4)",
                        "milestones": [
                            {
                                "number": 3,
                                "title": "Hypothesis Testing & A/B Experimentation Engine",
                                "duration": "5–6 Weeks",
                                "description": "Design and analyze randomized controlled trials (A/B tests), calculate p-values, confidence intervals, and statistical power.",
                                "why_it_matters": "A/B testing is how technology giants (Meta, Netflix, Amazon) decide which product features deploy to production.",
                                "concepts": ["Null vs Alternative hypotheses", "Two-sample t-test, Chi-square test, and Mann-Whitney U test", "Type I and Type II errors and statistical power calculations", "Sample size estimation before experiment launch"],
                                "tools": ["Python", "Statsmodels", "SciPy", "Streamlit"],
                                "exercises": ["Build an A/B test sample size and power calculator tool.", "Analyze real click-through rate experimental data to declare a statistically significant winner."],
                                "completion_criteria": ["Interactive Streamlit tool calculating minimum detectable effect (MDE).", "Statistical analysis memo providing p-value and confidence interval."],
                                "skills": ["A/B Testing", "Hypothesis Testing", "Statistical Inference"],
                                "project_slug": "statistical-hypothesis-engine"
                            },
                            {
                                "number": 4,
                                "title": "Supervised Learning: Regression & Classification with Scikit-Learn",
                                "duration": "5–6 Weeks",
                                "description": "Train linear/logistic regression, decision trees, and evaluate models using ROC-AUC, precision, recall, and cross-validation.",
                                "why_it_matters": "Core machine learning foundation for predicting continuous values and categorical probabilities.",
                                "concepts": ["Train/test splitting and K-fold cross-validation", "Bias-variance tradeoff and regularization (Ridge, Lasso)", "Confusion matrix, Precision, Recall, F1-Score, and ROC-AUC", "Scikit-Learn Pipelines to prevent data leakage"],
                                "tools": ["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
                                "exercises": ["Build a customer churn classifier with Scikit-Learn Pipelines.", "Compare Logistic Regression against Random Forests with cross-validated ROC curves."],
                                "completion_criteria": ["Model achieves >0.82 ROC-AUC on unseen test dataset with zero data leakage.", "Comprehensive evaluation report with confusion matrix analysis."],
                                "skills": ["Scikit-Learn", "Classification & Regression", "Model Evaluation Metrics"],
                                "project_slug": "predictive-lead-scoring-engine"
                            }
                        ]
                    },
                    {
                        "number": 3,
                        "name": "Stage 3 — Specialization",
                        "subtitle": "Year 3 • Gradient Boosting, Feature Engineering & Interpretability",
                        "duration": "Year 3 (Semesters 5 & 6)",
                        "milestones": [
                            {
                                "number": 5,
                                "title": "Gradient Boosting (XGBoost/LightGBM) & Advanced Feature Engineering",
                                "duration": "5–6 Weeks",
                                "description": "Master gradient boosted decision trees, categorical encodings, interaction terms, and Bayesian hyperparameter tuning with Optuna.",
                                "why_it_matters": "XGBoost and LightGBM dominate tabular Kaggle competitions and production industry machine learning systems.",
                                "concepts": ["Boosting mechanics: building trees on residual errors", "Target encoding, one-hot encoding, and numerical binning", "Hyperparameter optimization with Optuna", "Handling class imbalance using SMOTE and class weights"],
                                "tools": ["XGBoost", "LightGBM", "Optuna", "Scikit-Learn"],
                                "exercises": ["Train an XGBoost model predicting customer lifetime value (LTV).", "Tune 7 hyperparameters with Optuna over 100 trials."],
                                "completion_criteria": ["Model reduces RMSE by 18% compared to baseline regression.", "Optuna optimization convergence plots documented in Jupyter."],
                                "skills": ["XGBoost & LightGBM", "Feature Engineering", "Hyperparameter Optimization"],
                                "project_slug": "predictive-lead-scoring-engine"
                            },
                            {
                                "number": 6,
                                "title": "Model Interpretability & Explainable AI (SHAP & LIME)",
                                "duration": "5–6 Weeks",
                                "description": "Explain black-box model predictions using Shapley additive explanations (SHAP) and LIME to generate trusted business insights.",
                                "why_it_matters": "Regulated industries (finance, healthcare) demand explainability before any machine learning model is approved for production.",
                                "concepts": ["Game theoretic foundations of Shapley values", "Global feature importance vs local prediction explanations", "SHAP summary plots, waterfall charts, and force plots", "Auditing models for demographic bias and fairness"],
                                "tools": ["SHAP", "LIME", "Python", "Matplotlib"],
                                "exercises": ["Generate waterfall explanation plots for high-risk churn customers.", "Create an executive summary showing top 5 drivers of customer conversion."],
                                "completion_criteria": ["Interactive SHAP plots generated for individual customer predictions.", "Model governance audit report evaluating fairness metrics."],
                                "skills": ["Explainable AI (SHAP)", "Model Governance", "Diagnostic Communication"],
                                "project_slug": "predictive-lead-scoring-engine"
                            }
                        ]
                    },
                    {
                        "number": 4,
                        "name": "Stage 4 — Career Readiness",
                        "subtitle": "Year 4 • Interactive Web Prototypes & Data Science Capstone",
                        "duration": "Year 4 (Semesters 7 & 8)",
                        "milestones": [
                            {
                                "number": 7,
                                "title": "Interactive Machine Learning Prototype with Streamlit",
                                "duration": "6 Weeks",
                                "description": "Package trained scikit-learn/XGBoost models into an interactive web application that allows users to input data and receive real-time predictions.",
                                "why_it_matters": "Proves you can deliver self-contained, user-facing applications that allow non-technical stakeholders to test your models.",
                                "concepts": ["Streamlit reactive UI components and state management", "Model serialization with Joblib/Pickle", "Input validation and error handling", "Hosting prototypes on Streamlit Community Cloud"],
                                "tools": ["Streamlit", "Joblib", "Python", "GitHub"],
                                "exercises": ["Build a Streamlit web app allowing sales managers to input customer parameters and get real-time churn predictions with SHAP waterfall explanations."],
                                "completion_criteria": ["Publicly accessible Streamlit web application URL.", "Instant prediction response times under 100ms."],
                                "skills": ["Streamlit Deployment", "Model Serialization", "Interactive Web Prototypes"],
                                "project_slug": "predictive-lead-scoring-engine"
                            },
                            {
                                "number": 8,
                                "title": "End-to-End Predictive Science Capstone & Interview Defense",
                                "duration": "6 Weeks",
                                "description": "Polish and defend a complete end-to-end data science project spanning data exploration, hypothesis validation, model training, and business impact.",
                                "why_it_matters": "Technical interviews for Data Scientists test your ability to explain methodology trade-offs and business impact clearly.",
                                "concepts": ["Structuring data science case study presentations", "Defending statistical assumptions during live technical questions", "Measuring business ROI ($ saved by churn model)", "Clean reproducible GitHub repository with virtual environments"],
                                "tools": ["GitHub", "Markdown", "Streamlit", "LaTeX"],
                                "exercises": ["Author a complete case study README with interactive links, methodology diagrams, and confusion matrix tables.", "Record a 5-minute technical walkthrough."],
                                "completion_criteria": ["Public GitHub repository with 100% reproducible requirements and clean code.", "Passed mock technical interview defense with senior data scientist review."],
                                "skills": ["Case Study Documentation", "Technical Interview Defense", "Data Science Career Readiness"],
                                "project_slug": "predictive-lead-scoring-engine"
                            }
                        ]
                    }
                ]
            },
            {
                "slug": "machine-learning-engineer",
                "title": "Machine Learning Engineer",
                "domain_slug": "data-science",
                "is_primary": False,
                "focus": "Deep Learning, Transformer Architectures, Low-Latency Model Serving, MLOps",
                "description": "Trains and fine-tunes deep neural networks, optimizes GPU inference latency, containerizes inference services with Docker, and tracks model drift in production.",
                "responsibilities": "Train PyTorch models, build low-latency FastAPI model-serving endpoints, containerize with Docker, implement vector search with FAISS, and monitor production drift.",
                "tasks": [
                    "Train and evaluate deep neural networks and transformer embeddings in PyTorch",
                    "Build asynchronous, low-latency model-serving REST and gRPC endpoints in FastAPI",
                    "Implement vector search and retrieval-augmented generation (RAG) using FAISS/Qdrant",
                    "Configure Docker containers and automated model tracking with MLflow"
                ],
                "tools": ["PyTorch", "FastAPI", "Docker", "Hugging Face Transformers", "FAISS", "MLflow", "Linux"],
                "deliverables": [
                    "Containerized Semantic Document Search & RAG Microservice",
                    "Low-Latency Transformer Inference API (<25ms p99)",
                    "Automated Model Training & Evaluation Pipeline with MLflow",
                    "Real-Time Drift Detection & Auto-Retraining Monitor"
                ],
                "prerequisites": ["Python object-oriented programming", "Data structures & algorithms", "Linear algebra & gradient descent intuition"],
                "stages": [
                    {
                        "number": 1,
                        "name": "Stage 1 — Foundations",
                        "subtitle": "Year 1 • Neural Network Fundamentals & PyTorch",
                        "duration": "Year 1 (Semesters 1 & 2)",
                        "milestones": [
                            {
                                "number": 1,
                                "title": "Neural Networks from Scratch & PyTorch Tensors",
                                "duration": "4–6 Weeks",
                                "description": "Understand feedforward perceptrons, backpropagation, computational graphs, and PyTorch autograd engine.",
                                "why_it_matters": "Understanding autograd and loss gradients is vital for debugging neural network training instabilities.",
                                "concepts": ["Computational graphs and forward/backward passes", "PyTorch Tensor operations and GPU acceleration (CUDA)", "Loss functions (CrossEntropy, MSE) and optimizers (SGD, Adam)", "Writing standard PyTorch training and validation loops"],
                                "tools": ["PyTorch", "Python", "CUDA Basics", "Jupyter"],
                                "exercises": ["Implement a 3-layer neural network from scratch with backprop.", "Train a PyTorch Multi-Layer Perceptron on tabular classification data."],
                                "completion_criteria": ["Model achieves >95% training convergence with Adam optimizer.", "Training loss curves plotted and logged."],
                                "skills": ["PyTorch Fundamentals", "Neural Network Mechanics", "Autograd & Backpropagation"],
                                "project_slug": "semantic-document-rag-service"
                            },
                            {
                                "number": 2,
                                "title": "Linux Systems, Shell Scripting & Git Workflow for AI",
                                "duration": "4–6 Weeks",
                                "description": "Master command-line productivity, bash automation, remote server SSH sessions, and environment management.",
                                "why_it_matters": "All cloud GPU training clusters run on Linux headless instances without GUIs.",
                                "concepts": ["Linux file permissions, process monitoring (htop, nvidia-smi)", "Bash scripting for automated data downloading and preprocessing", "SSH key authentication and remote port forwarding", "Python virtual environments and dependency management (Poetry/uv)"],
                                "tools": ["Linux (Ubuntu)", "Bash", "Git", "SSH", "Poetry"],
                                "exercises": ["Write an automated bash script that downloads a dataset, prepares virtual environment, and runs PyTorch training.", "Monitor GPU utilization with nvidia-smi."],
                                "completion_criteria": ["Autonomous bash script executes end-to-end without manual intervention.", "Git repository with clean commit history and .gitignore."],
                                "skills": ["Linux & Bash Automation", "GPU Monitoring", "Reproducible Environments"],
                                "project_slug": "semantic-document-rag-service"
                            }
                        ]
                    },
                    {
                        "number": 2,
                        "name": "Stage 2 — Core Skills",
                        "subtitle": "Year 2 • Deep Learning Architectures & Microservice Serving",
                        "duration": "Year 2 (Semesters 3 & 4)",
                        "milestones": [
                            {
                                "number": 3,
                                "title": "Transfer Learning & Fine-Tuning with Hugging Face",
                                "duration": "5–6 Weeks",
                                "description": "Fine-tune pretrained transformers and vision backbones using Hugging Face Transformers and PyTorch Lightning.",
                                "why_it_matters": "Modern enterprise AI rarely trains from scratch; fine-tuning pretrained foundations delivers superior results in hours.",
                                "concepts": ["Pretrained transformer architecture (Self-Attention, BERT, RoBERTa)", "Tokenization, attention masks, and positional encodings", "Freezing layers and parameter-efficient fine-tuning (LoRA)", "Evaluating text classification and embedding quality"],
                                "tools": ["Hugging Face Transformers", "PyTorch", "Datasets", "Accelerate"],
                                "exercises": ["Fine-tune a pretrained RoBERTa model for sentiment and intent classification.", "Measure inference accuracy before and after domain adaptation."],
                                "completion_criteria": ["Model achieves >89% classification accuracy on domain evaluation dataset.", "Fine-tuned model checkpoint saved and versioned."],
                                "skills": ["Hugging Face Transformers", "Fine-Tuning & LoRA", "Embeddings Quality"],
                                "project_slug": "semantic-document-rag-service"
                            },
                            {
                                "number": 4,
                                "title": "Asynchronous High-Performance Model Serving with FastAPI",
                                "duration": "5–6 Weeks",
                                "description": "Wrap PyTorch and Hugging Face models into production asynchronous REST APIs with Pydantic validation and batching.",
                                "why_it_matters": "Exposing models through low-latency APIs is required for integration into real web and mobile systems.",
                                "concepts": ["Asynchronous request handling with async/await in FastAPI", "Pydantic request/response schema validation", "Dynamic request batching to maximize GPU throughput", "Health check probes and graceful shutdown handling"],
                                "tools": ["FastAPI", "Uvicorn", "Pydantic", "PyTorch"],
                                "exercises": ["Build a FastAPI model-serving endpoint with /predict and /health routes.", "Benchmark API latency under concurrent load with Locust."],
                                "completion_criteria": ["API handles 100 concurrent requests with p99 latency <35ms.", "Zero server crashes under high-load stress testing."],
                                "skills": ["FastAPI Model Serving", "Asynchronous Systems", "Inference Optimization"],
                                "project_slug": "low-latency-transformer-api"
                            }
                        ]
                    },
                    {
                        "number": 3,
                        "name": "Stage 3 — Specialization",
                        "subtitle": "Year 3 • Vector Search (FAISS/RAG) & Docker Containerization",
                        "duration": "Year 3 (Semesters 5 & 6)",
                        "milestones": [
                            {
                                "number": 5,
                                "title": "Vector Databases & Retrieval-Augmented Generation (RAG)",
                                "duration": "5–6 Weeks",
                                "description": "Construct scalable semantic document search pipelines using dense vector embeddings and FAISS index algorithms.",
                                "why_it_matters": "RAG is the primary commercial pattern for connecting private enterprise documentation to LLMs without hallucination.",
                                "concepts": ["Cosine similarity, dot product, and Euclidean vector distance", "FAISS index types: IndexFlatIP, IndexIVFFlat, and HNSW", "Text chunking strategies with overlap and metadata filtering", "RAG evaluation with RAGAS metrics (Faithfulness, Answer Relevance)"],
                                "tools": ["FAISS", "Sentence-Transformers", "FastAPI", "Qdrant / Chroma"],
                                "exercises": ["Index 10,000 technical PDF documentation pages into a FAISS HNSW vector store.", "Build a semantic retrieval API that returns top-3 relevant passages in <15ms."],
                                "completion_criteria": ["Sub-15ms vector retrieval query latency over 10,000 document chunks.", "Interactive API endpoint demonstrating semantic search."],
                                "skills": ["Vector Search (FAISS)", "RAG Architecture", "Semantic Retrieval"],
                                "project_slug": "semantic-document-rag-service"
                            },
                            {
                                "number": 6,
                                "title": "Containerization with Docker & Multi-Stage Production Builds",
                                "duration": "5–6 Weeks",
                                "description": "Package model inference code, dependencies, and runtime binaries into lightweight, secure Docker containers.",
                                "why_it_matters": "Containers guarantee reliable deployment on cloud Kubernetes nodes without host dependency conflicts.",
                                "concepts": ["Multi-stage Dockerfile design for minimal image sizes", "Non-root container user security best practices", "Mounting model weights as external volumes", "Docker Compose for multi-container local microservices"],
                                "tools": ["Docker", "Docker Compose", "Linux"],
                                "exercises": ["Write a multi-stage Dockerfile containerizing the FastAPI PyTorch service.", "Reduce final image footprint from 4GB to under 1.1GB."],
                                "completion_criteria": ["Container builds cleanly and boots in under 4 seconds.", "All test requests pass inside isolated Docker container runtime."],
                                "skills": ["Docker Containerization", "Image Optimization", "Production Runtime Packaging"],
                                "project_slug": "low-latency-transformer-api"
                            }
                        ]
                    },
                    {
                        "number": 4,
                        "name": "Stage 4 — Career Readiness",
                        "subtitle": "Year 4 • Production MLOps, Drift Telemetry & Capstone",
                        "duration": "Year 4 (Semesters 7 & 8)",
                        "milestones": [
                            {
                                "number": 7,
                                "title": "MLOps Lifecycle: MLflow Tracking & Production Drift Monitoring",
                                "duration": "6 Weeks",
                                "description": "Track model hyperparameter experiments in MLflow, register candidate versions, and monitor statistical data drift in production.",
                                "why_it_matters": "Models decay over time as real-world distributions shift. MLOps ensures automated retraining and model quality governance.",
                                "concepts": ["MLflow tracking server, parameter logging, and artifact storage", "Model Registry: Staging, Production, and Archived transitions", "Data drift and concept drift detection algorithms (Evidently AI)", "Automated trigger pipelines for model retraining"],
                                "tools": ["MLflow", "Evidently AI", "Prometheus", "FastAPI"],
                                "exercises": ["Set up an automated training run that logs loss metrics and registers the top model in MLflow.", "Simulate real-world data drift and trigger an alert."],
                                "completion_criteria": ["MLflow UI showing reproducible experiment runs and registered model artifacts.", "Automated alert generated when test distribution diverges by >15%."],
                                "skills": ["MLOps & MLflow", "Data Drift Monitoring", "Model Governance"],
                                "project_slug": "low-latency-transformer-api"
                            },
                            {
                                "number": 8,
                                "title": "Production AI Microservice Capstone & Architecture Defense",
                                "duration": "6 Weeks",
                                "description": "Deploy a complete containerized AI microservice with vector search, automated CI/CD testing, and benchmarking documentation.",
                                "why_it_matters": "Demonstrates you possess both machine learning acumen and rigorous software engineering discipline.",
                                "concepts": ["Load testing and p99 latency profiling with Locust", "Writing production architecture documentation with C4 diagrams", "Defending latency-accuracy tradeoffs in technical interviews", "Packaging clean public GitHub codebase with CI automation"],
                                "tools": ["GitHub Actions", "Docker", "Locust", "FastAPI"],
                                "exercises": ["Deploy the semantic search service to cloud staging.", "Record a 5-minute technical walkthrough showing Locust load tests and p99 benchmarks."],
                                "completion_criteria": ["Public GitHub repository with automated GitHub Actions CI testing.", "Passed mock MLE systems architecture interview."],
                                "skills": ["End-to-End MLOps", "Systems Benchmarking", "MLE Career Readiness"],
                                "project_slug": "low-latency-transformer-api"
                            }
                        ]
                    }
                ]
            },
            {
                "slug": "data-engineer",
                "title": "Data Engineer",
                "domain_slug": "data-science",
                "is_primary": False,
                "focus": "Distributed Systems, Batch & Streaming ETL Orchestration, Lakehouse Architecture",
                "description": "Builds fault-tolerant batch and streaming ETL pipelines, automates workflow orchestration with Apache Airflow DAGs, and guarantees enterprise data warehouse reliability.",
                "responsibilities": "Design automated Airflow pipelines, process multi-gigabyte datasets with Apache Spark (PySpark), maintain dbt transformations, and enforce data quality testing.",
                "tasks": [
                    "Design and orchestrate fault-tolerant DAGs using Apache Airflow and dbt",
                    "Process multi-gigabyte datasets using distributed Apache Spark (PySpark) clusters",
                    "Model scalable analytical schemas (Kimball Star Schema / Snowflake / PostgreSQL)",
                    "Implement schema validation and automated data quality checks (Great Expectations)"
                ],
                "tools": ["Apache Airflow", "Apache Spark (PySpark)", "PostgreSQL", "dbt", "Docker", "Kafka", "SQL"],
                "deliverables": [
                    "Automated Multi-Stage Retail Data Lakehouse & ETL DAG",
                    "Streaming Event Ingestion Pipeline with Kafka and PySpark",
                    "Production dbt Transformation Warehouse with Automated Tests",
                    "Data Reliability & Quality Dashboard with Automated Alerts"
                ],
                "prerequisites": ["Proficiency in Python and advanced SQL", "Relational database internals (indexes, transactions)", "Basic Linux commands & Docker"],
                "stages": [
                    {
                        "number": 1,
                        "name": "Stage 1 — Foundations",
                        "subtitle": "Year 1 • Relational Internals & Ingestion Pipelines",
                        "duration": "Year 1 (Semesters 1 & 2)",
                        "milestones": [
                            {
                                "number": 1,
                                "title": "Database Internals: Indexing, Transactions & Storage Engines",
                                "duration": "4–6 Weeks",
                                "description": "Master B-Tree indexes, query execution plans (EXPLAIN ANALYZE), ACID transaction isolation levels, and write-ahead logs (WAL).",
                                "why_it_matters": "Data engineers must know how databases store data on disk to design efficient batch loads and prevent table locks.",
                                "concepts": ["B-Tree, GIN, and Hash indexes in PostgreSQL", "EXPLAIN ANALYZE: Sequential Scans vs Index Scans", "ACID transactions, table locks, and concurrency", "Bulk insert optimization (COPY command vs multi-row INSERT)"],
                                "tools": ["PostgreSQL", "pg_stat_statements", "DBeaver", "SQL"],
                                "exercises": ["Optimize a slow analytical query from 4.2 seconds to under 80ms using compound indexes.", "Benchmarking bulk data loading speeds using PostgreSQL COPY."],
                                "completion_criteria": ["Query execution plan confirms Index Scan with >95% reduction in buffer hits.", "Documented benchmark report comparing ingestion methods."],
                                "skills": ["Database Internals", "Query Optimization", "Bulk Data Ingestion"],
                                "project_slug": "distributed-etl-pipeline-spark"
                            },
                            {
                                "number": 2,
                                "title": "Programmatic ETL & API Extraction in Python",
                                "duration": "4–6 Weeks",
                                "description": "Build robust, idempotent Python extract-transform-load scripts handling API pagination, rate limits, schema validation, and retry backoff.",
                                "why_it_matters": "Real pipelines ingest data from external SaaS APIs that fail, timeout, or return malformed JSON records.",
                                "concepts": ["REST API pagination (offset, cursor-based)", "Exponential backoff and retry decorators with Tenacity", "Pydantic schema validation for incoming JSON records", "Idempotent database upserts (ON CONFLICT DO UPDATE)"],
                                "tools": ["Python", "Requests / Httpx", "Pydantic", "PostgreSQL"],
                                "exercises": ["Build an automated Python script extracting 10,000 records from a paginated REST API.", "Load validated records into PostgreSQL with zero duplicate records on re-run."],
                                "completion_criteria": ["Script executes idempotently and handles network disconnects gracefully.", "Zero corrupted records inserted into destination database."],
                                "skills": ["Python ETL", "API Data Ingestion", "Idempotent Pipeline Design"],
                                "project_slug": "distributed-etl-pipeline-spark"
                            }
                        ]
                    },
                    {
                        "number": 2,
                        "name": "Stage 2 — Core Skills",
                        "subtitle": "Year 2 • Workflow Orchestration (Airflow) & dbt Transformations",
                        "duration": "Year 2 (Semesters 3 & 4)",
                        "milestones": [
                            {
                                "number": 3,
                                "title": "Workflow Orchestration with Apache Airflow DAGs",
                                "duration": "5–6 Weeks",
                                "description": "Author production DAGs in Apache Airflow with task dependencies, branching, automated retries, and Slack alerts.",
                                "why_it_matters": "Airflow is the undisputed industry standard for orchestrating scheduled enterprise data workflows.",
                                "concepts": ["Airflow Operators, Sensors, and TaskFlow API (@task)", "DAG scheduling with cron expressions and data intervals", "XComs, task dependencies (>>), and backfilling historical data", "Catchup handling and SLA failure alerting"],
                                "tools": ["Apache Airflow", "Docker Compose", "Python", "PostgreSQL"],
                                "exercises": ["Build a 5-step Airflow DAG that extracts data, transforms staging tables, loads dimensional schema, and checks data quality.", "Test historical backfilling over 30 days."],
                                "completion_criteria": ["Airflow web UI shows all DAG tasks executing green on schedule.", "Automated notification fires when simulated task failure occurs."],
                                "skills": ["Apache Airflow DAGs", "Workflow Orchestration", "Pipeline Monitoring & Alerting"],
                                "project_slug": "distributed-etl-pipeline-spark"
                            },
                            {
                                "number": 4,
                                "title": "Modular Data Warehouse Transformations with dbt",
                                "duration": "5–6 Weeks",
                                "description": "Transform raw staging tables into tested analytics data models using dbt (data build tool), Jinja templating, and documentation.",
                                "why_it_matters": "dbt brings software engineering best practices (version control, modularity, automated testing) to SQL analytics.",
                                "concepts": ["dbt models: Staging (stg_), Intermediate (int_), and Marts (fct_, dim_)", "Materializations: Views, Tables, and Incremental models", "dbt generic tests (unique, not_null, accepted_values, relationships)", "Automated lineage DAG generation and documentation"],
                                "tools": ["dbt-core", "PostgreSQL", "SQL", "Git"],
                                "exercises": ["Build a complete dbt project with 8 models transforming e-commerce transactions into a star schema.", "Write 12 automated schema tests."],
                                "completion_criteria": ["All dbt run and dbt test commands execute with zero failures.", "Generated dbt documentation website showing full lineage DAG."],
                                "skills": ["dbt (Data Build Tool)", "Modular SQL Modeling", "Automated Data Testing"],
                                "project_slug": "distributed-etl-pipeline-spark"
                            }
                        ]
                    },
                    {
                        "number": 3,
                        "name": "Stage 3 — Specialization",
                        "subtitle": "Year 3 • Distributed Processing (Spark) & Lakehouse Architecture",
                        "duration": "Year 3 (Semesters 5 & 6)",
                        "milestones": [
                            {
                                "number": 5,
                                "title": "Distributed Big-Data Processing with Apache Spark (PySpark)",
                                "duration": "5–6 Weeks",
                                "description": "Process multi-gigabyte datasets using PySpark DataFrames, distributed aggregations, windowing, and partitioning.",
                                "why_it_matters": "When datasets exceed single-node memory limits, distributed engines like Apache Spark are mandatory.",
                                "concepts": ["Spark driver, executors, partitions, and cluster architecture", "PySpark DataFrame transformations and lazy evaluation", "Wide vs Narrow transformations (shuffles, repartitioning)", "Optimizing Spark joins using broadcast hash joins"],
                                "tools": ["Apache Spark", "PySpark", "Parquet", "Docker"],
                                "exercises": ["Process a 5GB dataset of event logs using PySpark.", "Optimize a heavy skew join using broadcast joins to reduce execution time by 60%."],
                                "completion_criteria": ["PySpark job completes successfully without Out-Of-Memory (OOM) errors.", "Output written in partitioned Snappy-compressed Parquet format."],
                                "skills": ["Apache Spark (PySpark)", "Distributed Computing", "Parquet Optimization"],
                                "project_slug": "distributed-etl-pipeline-spark"
                            },
                            {
                                "number": 6,
                                "title": "Lakehouse Architecture & Columnar Storage (Parquet / Delta)",
                                "duration": "5–6 Weeks",
                                "description": "Implement Medallion Lakehouse architecture (Bronze raw, Silver cleaned, Gold aggregated) using columnar Parquet storage.",
                                "why_it_matters": "The Lakehouse architecture combines the cheap storage of data lakes with the ACID reliability of data warehouses.",
                                "concepts": ["Medallion architecture: Bronze -> Silver -> Gold layers", "Columnar storage benefits (compression, column pruning)", "Schema enforcement and schema evolution", "Time travel and ACID transactions on object storage"],
                                "tools": ["Delta Lake / DuckDB", "Parquet", "PySpark", "MinIO (S3 mock)"],
                                "exercises": ["Build a 3-layer Medallion pipeline ingesting raw JSON (Bronze), parsing clean parquet (Silver), and computing business marts (Gold)."],
                                "completion_criteria": ["Lakehouse pipeline runs idempotently across all 3 layers.", "Gold tables queryable in sub-second time using DuckDB."],
                                "skills": ["Lakehouse Architecture", "Medallion Data Design", "Columnar Storage"],
                                "project_slug": "distributed-etl-pipeline-spark"
                            }
                        ]
                    },
                    {
                        "number": 4,
                        "name": "Stage 4 — Career Readiness",
                        "subtitle": "Year 4 • Streaming Ingestion & Enterprise Data Platform Capstone",
                        "duration": "Year 4 (Semesters 7 & 8)",
                        "milestones": [
                            {
                                "number": 7,
                                "title": "Real-Time Event Streaming with Apache Kafka",
                                "duration": "6 Weeks",
                                "description": "Set up a real-time event streaming pipeline using Apache Kafka producers, topic partitioning, consumer groups, and stream processing.",
                                "why_it_matters": "Real-time fraud detection, live telemetry, and financial pricing rely on real-time event streaming architectures.",
                                "concepts": ["Kafka topics, partitions, offsets, and consumer groups", "Producer serialization and consumer backpressure", "At-least-once vs exactly-once delivery guarantees", "Spark Structured Streaming ingesting Kafka topics into storage"],
                                "tools": ["Apache Kafka", "Docker", "PySpark Streaming", "Python"],
                                "exercises": ["Build a synthetic telemetry generator publishing events to a Kafka topic at 200 msgs/sec.", "Consume and aggregate events in real-time."],
                                "completion_criteria": ["Kafka cluster runs reliably in Docker with zero message loss.", "Real-time streaming pipeline aggregates metrics into destination table."],
                                "skills": ["Apache Kafka", "Real-Time Streaming", "Event-Driven Pipelines"],
                                "project_slug": "distributed-etl-pipeline-spark"
                            },
                            {
                                "number": 8,
                                "title": "Enterprise Cloud Data Platform Capstone & Systems Defense",
                                "duration": "6 Weeks",
                                "description": "Build, document, and defend an end-to-end automated data platform featuring Airflow orchestration, dbt modeling, and automated quality testing.",
                                "why_it_matters": "Proves to hiring managers that you can design and maintain robust, production-grade enterprise data infrastructure.",
                                "concepts": ["End-to-end data platform architecture diagrams", "CI/CD testing for dbt and Airflow DAGs via GitHub Actions", "Defending partition keys and cluster sizing in technical interviews", "Writing complete runbooks and disaster recovery procedures"],
                                "tools": ["GitHub Actions", "Docker", "Airflow", "dbt", "PostgreSQL"],
                                "exercises": ["Deploy complete data platform running in Docker Compose.", "Record a 5-minute technical walkthrough demonstrating the pipeline."],
                                "completion_criteria": ["Fully reproducible public repository with single-command `docker compose up` launch.", "Passed mock technical interview evaluation with data architect review."],
                                "skills": ["Data Platform Architecture", "CI/CD for Data", "Data Engineer Career Readiness"],
                                "project_slug": "distributed-etl-pipeline-spark"
                            }
                        ]
                    }
                ]
            }
        ]

        # -------------------------------------------------------------
        # 3. SEED PROJECTS
        # -------------------------------------------------------------
        projects_seed = [
            {
                "slug": "automated-executive-sales-dashboard",
                "title": "Automated Executive Sales KPI Dashboard & Data Mart",
                "description": "Enterprise sales intelligence platform with automated multi-source ingestion, star-schema dimensional modeling in PostgreSQL, and interactive Power BI executive reporting.",
                "difficulty": "Intermediate",
                "estimated_hours": 30,
                "tech_stack": ["PostgreSQL", "Power BI", "DAX", "Python", "SQL"],
                "deliverables": [
                    "PostgreSQL Star-Schema Analytical Data Mart",
                    "Automated Python Staging & ETL Ingestion Scripts",
                    "Interactive 3-Page Power BI Executive Dashboard (.pbix)",
                    "Data Dictionary & Metric Validation Documentation"
                ],
                "domain_slug": "data-science",
                "role_slug": "data-analyst",
            },
            {
                "slug": "customer-cohort-churn-suite",
                "title": "Ecommerce Customer Cohort & Churn Exploration Suite",
                "description": "Diagnostic analytics suite computing monthly customer retention cohorts, revenue churn heatmaps, and identifying early indicators of customer attrition.",
                "difficulty": "Intermediate",
                "estimated_hours": 25,
                "tech_stack": ["Python", "Pandas", "Seaborn", "SQL", "Streamlit"],
                "deliverables": [
                    "Cohort Retention Heatmap Generation Engine",
                    "Interactive Streamlit Diagnostic Dashboard",
                    "Statistical Churn Variance Report",
                    "Executive Retention Recommendation Memo"
                ],
                "domain_slug": "data-science",
                "role_slug": "data-analyst",
            },
            {
                "slug": "statistical-hypothesis-engine",
                "title": "A/B Testing Statistical Decision Engine & Power Calculator",
                "description": "Scientific experimentation framework calculating minimum detectable effect, statistical sample size, two-sample hypothesis tests, and confidence intervals.",
                "difficulty": "Intermediate",
                "estimated_hours": 28,
                "tech_stack": ["Python", "SciPy", "Statsmodels", "Streamlit", "Matplotlib"],
                "deliverables": [
                    "Interactive A/B Experiment Sample Size Calculator",
                    "Automated Statistical Hypothesis Test Pipeline",
                    "Visual Decision Dashboard with P-Value Curves",
                    "Experimentation Protocol & Best Practices Guide"
                ],
                "domain_slug": "data-science",
                "role_slug": "data-scientist",
            },
            {
                "slug": "predictive-lead-scoring-engine",
                "title": "Predictive Lead Scoring & Conversion Classifier",
                "description": "Production machine learning classifier predicting enterprise lead conversion probabilities using XGBoost, Optuna tuning, and SHAP explainability.",
                "difficulty": "Advanced",
                "estimated_hours": 35,
                "tech_stack": ["Python", "XGBoost", "Scikit-Learn", "SHAP", "Optuna", "Streamlit"],
                "deliverables": [
                    "Trained XGBoost Lead Conversion Model (>0.86 ROC-AUC)",
                    "Optuna Hyperparameter Optimization Pipeline",
                    "SHAP Waterfall Visual Explanation Engine",
                    "Streamlit Lead Scoring Web Application"
                ],
                "domain_slug": "data-science",
                "role_slug": "data-scientist",
            },
            {
                "slug": "semantic-document-rag-service",
                "title": "Semantic Document Search & Enterprise RAG Microservice",
                "description": "High-throughput retrieval-augmented generation engine indexing enterprise documentation using PyTorch embeddings and sub-15ms FAISS vector search.",
                "difficulty": "Advanced",
                "estimated_hours": 40,
                "tech_stack": ["PyTorch", "Hugging Face", "FAISS", "FastAPI", "Docker"],
                "deliverables": [
                    "FAISS HNSW High-Speed Vector Index",
                    "FastAPI Asynchronous Semantic Search REST API",
                    "RAG Answer Generation Integration",
                    "Multi-Stage Dockerfile Container"
                ],
                "domain_slug": "data-science",
                "role_slug": "machine-learning-engineer",
            },
            {
                "slug": "low-latency-transformer-api",
                "title": "Low-Latency Transformer Inference & MLOps Pipeline",
                "description": "Production transformer inference microservice optimized for sub-25ms p99 latency with dynamic batching, MLflow experiment tracking, and drift detection.",
                "difficulty": "Advanced",
                "estimated_hours": 45,
                "tech_stack": ["FastAPI", "PyTorch", "Docker", "MLflow", "Locust", "Evidently AI"],
                "deliverables": [
                    "FastAPI Asynchronous Transformer Serving Microservice",
                    "MLflow Model Registry & Lifecycle Pipeline",
                    "Locust Load Testing Benchmarking Suite",
                    "Production Drift Detection & Retraining Monitor"
                ],
                "domain_slug": "data-science",
                "role_slug": "machine-learning-engineer",
            },
            {
                "slug": "distributed-etl-pipeline-spark",
                "title": "Distributed Multi-Stage Retail Data Lakehouse & Airflow Pipeline",
                "description": "Production lakehouse platform ingesting multi-gigabyte transactional event logs, running distributed PySpark aggregations, and orchestrating dbt warehouse models via Airflow.",
                "difficulty": "Advanced",
                "estimated_hours": 50,
                "tech_stack": ["Apache Airflow", "Apache Spark", "dbt", "PostgreSQL", "Docker", "Parquet"],
                "deliverables": [
                    "Automated 5-Step Apache Airflow DAG",
                    "Distributed PySpark Transformation Job with Parquet Outputs",
                    "Complete dbt Dimensional Warehouse Project with Schema Tests",
                    "End-to-End Docker Compose Infrastructure Deployment"
                ],
                "domain_slug": "data-science",
                "role_slug": "data-engineer",
            },
            {
                "slug": "full-stack-task-platform",
                "title": "Scalable Collaborative Task & Team Management Platform",
                "description": "Production full-stack web application with React frontend, FastAPI backend, PostgreSQL database, and Docker containerization.",
                "difficulty": "Intermediate",
                "estimated_hours": 35,
                "tech_stack": ["React", "FastAPI", "PostgreSQL", "Tailwind CSS", "Docker"],
                "deliverables": [
                    "Interactive React & Tailwind Frontend Application",
                    "FastAPI RESTful API with JWT Authentication",
                    "PostgreSQL Relational Schema with Alembic Migrations",
                    "Docker Compose Deployment Configuration"
                ],
                "domain_slug": "software-engineering",
                "role_slug": "software-engineer",
            }
        ]

        project_objs = {}
        for p_info in projects_seed:
            p = Project(**p_info)
            db.add(p)
            db.flush()
            project_objs[p.slug] = p

        logger.info(f"{len(project_objs)} Projects created successfully.")

        # -------------------------------------------------------------
        # 4. INSERT ROLES, SKILLS, ROADMAPS, AND MILESTONES FOR DATA SCIENCE
        # -------------------------------------------------------------
        skill_cache = {}

        for r_info in roles_data:
            role = Role(
                slug=r_info["slug"],
                title=r_info["title"],
                focus=r_info["focus"],
                description=r_info["description"],
                responsibilities=r_info["responsibilities"],
                tasks=r_info["tasks"],
                tools=r_info["tools"],
                deliverables=r_info["deliverables"],
                prerequisites=r_info["prerequisites"],
            )
            db.add(role)
            db.flush()

            # Link Role to Domain
            domain_role = DomainRole(
                domain_id=data_science_domain.id,
                role_id=role.id,
                is_primary=r_info["is_primary"],
            )
            db.add(domain_role)

            # Create Roadmap for Role
            roadmap = Roadmap(
                role_id=role.id,
                domain_id=data_science_domain.id,
                title=f"{role.title} — 4-Year Structured Career Progression",
                description=f"Industry-aligned 4-stage technical roadmap from foundational competence to production job-readiness for {role.title}.",
                total_duration="4 Academic Years (8 Semesters)",
            )
            db.add(roadmap)
            db.flush()

            # Create Stages and Milestones
            for stage_info in r_info["stages"]:
                stage = RoadmapStage(
                    roadmap_id=roadmap.id,
                    stage_number=stage_info["number"],
                    stage_name=stage_info["name"],
                    stage_subtitle=stage_info["subtitle"],
                    duration=stage_info["duration"],
                )
                db.add(stage)
                db.flush()

                for ms_info in stage_info["milestones"]:
                    milestone = Milestone(
                        stage_id=stage.id,
                        milestone_number=ms_info["number"],
                        title=ms_info["title"],
                        duration=ms_info["duration"],
                        description=ms_info["description"],
                        why_it_matters=ms_info.get("why_it_matters"),
                        concepts=ms_info.get("concepts", []),
                        tools=ms_info.get("tools", []),
                        exercises=ms_info.get("exercises", []),
                        completion_criteria=ms_info.get("completion_criteria", []),
                    )
                    db.add(milestone)
                    db.flush()

                    # Skills
                    for sk_name in ms_info.get("skills", []):
                        if sk_name not in skill_cache:
                            sk_slug = sk_name.lower().replace(" ", "-").replace("(", "").replace(")", "").replace("&", "and")
                            sk = db.query(Skill).filter(Skill.name == sk_name).first()
                            if not sk:
                                sk = Skill(
                                    name=sk_name,
                                    slug=sk_slug,
                                    category="Technical Skill",
                                    description=f"Core technical competency in {sk_name} required for {role.title}.",
                                    why_it_matters=f"Evaluated by hiring engineering teams for {role.title}.",
                                    recommended_tools=ms_info.get("tools", [])[:3],
                                )
                                db.add(sk)
                                db.flush()
                            skill_cache[sk_name] = sk
                        sk_obj = skill_cache[sk_name]

                        # MilestoneSkill link
                        ms_skill = MilestoneSkill(milestone_id=milestone.id, skill_id=sk_obj.id)
                        db.add(ms_skill)

                        # RoleSkill link
                        existing_rs = db.query(RoleSkill).filter(RoleSkill.role_id == role.id, RoleSkill.skill_id == sk_obj.id).first()
                        if not existing_rs:
                            rs = RoleSkill(
                                role_id=role.id,
                                skill_id=sk_obj.id,
                                stage_number=stage.stage_number,
                                importance="core",
                            )
                            db.add(rs)

                    # Link project if exists
                    p_slug = ms_info.get("project_slug")
                    if p_slug and p_slug in project_objs:
                        mp = MilestoneProject(milestone_id=milestone.id, project_id=project_objs[p_slug].id)
                        db.add(mp)

        logger.info("Data Analytics & Data Science vertical slice seeded (4 roles, 32 milestones).")

        # -------------------------------------------------------------
        # 5. SEED PRIMARY ROLES AND ROADMAPS FOR REMAINING 4 DOMAINS
        # -------------------------------------------------------------
        other_domains_roles = [
            {
                "domain_slug": "software-engineering",
                "role_slug": "software-engineer",
                "title": "Software Engineer",
                "focus": "Full-Stack Development, Data Structures, Scalable Web Systems",
                "description": "Designs, implements, and maintains scalable web applications, REST APIs, and production microservice backends.",
                "responsibilities": "Write clean, modular code in TypeScript and Python, manage relational database schemas, implement REST APIs, and optimize web application performance.",
                "tasks": [
                    "Implement frontend user interfaces in React and state management",
                    "Design scalable backend API endpoints and middleware in FastAPI or Node.js",
                    "Write unit, integration, and end-to-end tests for critical business flows",
                    "Review code in pull requests and participate in sprint planning"
                ],
                "tools": ["TypeScript / JavaScript", "React", "Node.js / FastAPI", "PostgreSQL", "Docker", "Git"],
                "deliverables": [
                    "Full-Stack Web Application with Authentication",
                    "RESTful API Service with Comprehensive Test Suite",
                    "Relational Database Schema & Migration Scripts",
                    "Dockerized Microservice Deployment"
                ],
                "prerequisites": ["Computer science fundamentals", "Basic programming proficiency in any language", "Understanding of how the web works (HTTP, browsers)"],
                "stages": [
                    {
                        "number": 1,
                        "name": "Stage 1 — Foundations",
                        "subtitle": "Year 1 • Programming Fundamentals & Data Structures",
                        "duration": "Year 1 (Semesters 1 & 2)",
                        "milestones": [
                            {"number": 1, "title": "Programming Fundamentals & Version Control", "duration": "4–6 Weeks", "description": "Master structured programming, control flow, functions, and Git collaboration workflows.", "why_it_matters": "Fundamental requirement for writing clean, version-controlled code.", "skills": ["Programming Basics", "Git & GitHub", "Clean Code"], "tools": ["Python / JavaScript", "Git", "VS Code"]},
                            {"number": 2, "title": "Data Structures & Algorithmic Problem Solving", "duration": "5–6 Weeks", "description": "Arrays, Linked Lists, Hash Tables, Trees, Graphs, and asymptotic complexity (Big-O).", "why_it_matters": "Primary test in technical screening rounds across tech companies.", "skills": ["Data Structures", "Algorithms", "Big-O Analysis"], "tools": ["LeetCode", "Python", "Java"]},
                            {"number": 3, "title": "Web Basics & Semantic Markup", "duration": "4 Weeks", "description": "HTML5, CSS3, modern Flexbox/Grid layouts, and responsive design fundamentals.", "why_it_matters": "Essential for building accessible, responsive user interfaces.", "skills": ["HTML5 & CSS3", "Responsive Design", "DOM Manipulation"], "tools": ["HTML5", "CSS3", "Chrome DevTools"]}
                        ]
                    },
                    {
                        "number": 2,
                        "name": "Stage 2 — Core Skills",
                        "subtitle": "Year 2 • Modern Frontend & Backend Systems",
                        "duration": "Year 2 (Semesters 3 & 4)",
                        "milestones": [
                            {"number": 4, "title": "Component-Driven Frontend with React", "duration": "5–6 Weeks", "description": "React component hierarchy, hooks (useState, useEffect, useMemo), and state management.", "why_it_matters": "Most widely requested frontend framework in industry tech jobs.", "skills": ["React.js", "Component Architecture", "State Management"], "tools": ["React", "Vite", "Tailwind CSS"]},
                            {"number": 5, "title": "Backend Engineering & RESTful API Architecture", "duration": "5–6 Weeks", "description": "Asynchronous backend development, routing, middleware, authentication (JWT), and relational schemas.", "why_it_matters": "Enables persistent, secure business logic powering web and mobile apps.", "skills": ["Node.js / FastAPI", "RESTful APIs", "JWT Auth"], "tools": ["FastAPI / Express", "PostgreSQL", "Postman"]}
                        ]
                    },
                    {
                        "number": 3,
                        "name": "Stage 3 — Specialization",
                        "subtitle": "Year 3 • Database Optimization & Containerized Deployment",
                        "duration": "Year 3 (Semesters 5 & 6)",
                        "milestones": [
                            {"number": 6, "title": "Database Schema Design & Query Optimization", "duration": "5–6 Weeks", "description": "Relational schema normalization, indexing, connection pooling, and caching with Redis.", "why_it_matters": "Guarantees sub-second API performance under high concurrent user traffic.", "skills": ["Database Normalization", "Indexing & Optimization", "Redis Caching"], "tools": ["PostgreSQL", "Redis", "Prisma / SQLAlchemy"]},
                            {"number": 7, "title": "Docker Containerization & CI/CD Pipelines", "duration": "5–6 Weeks", "description": "Containerizing frontend and backend microservices, writing GitHub Actions workflows for automated testing.", "why_it_matters": "Essential for reproducible dev environments and zero-downtime deployment.", "skills": ["Docker", "CI/CD (GitHub Actions)", "Automated Testing"], "tools": ["Docker", "GitHub Actions", "Jest / Pytest"]}
                        ]
                    },
                    {
                        "number": 4,
                        "name": "Stage 4 — Career Readiness",
                        "subtitle": "Year 4 • Production Capstone & Fresher Hiring Bar",
                        "duration": "Year 4 (Semesters 7 & 8)",
                        "milestones": [
                            {"number": 8, "title": "System Design & Distributed Scalability", "duration": "6 Weeks", "description": "Architecting load balancers, rate limiters, message queues, and high-availability patterns.", "why_it_matters": "Evaluated in senior interviews and shows architectural maturity.", "skills": ["System Design", "Microservices", "Scalability Architecture"], "tools": ["Draw.io", "AWS Basics", "Nginx"]},
                            {"number": 9, "title": "Full-Stack Portfolio Capstone & Technical Interview Polish", "duration": "6 Weeks", "description": "Polishing a production-grade full-stack capstone with live deployment, documentation, and mock interview prep.", "why_it_matters": "Verified proof of work that guarantees interview callbacks for freshers.", "skills": ["Full-Stack Engineering", "Technical Communication", "Fresher Hiring Readiness"], "tools": ["GitHub", "Vercel / Render", "Markdown"]}
                        ]
                    }
                ]
            },
            {
                "domain_slug": "ai-ml",
                "role_slug": "ai-engineer",
                "title": "AI / GenAI Engineer",
                "focus": "Deep Learning, LLM Fine-Tuning, Retrieval-Augmented Generation, Model Serving",
                "description": "Builds, fine-tunes, and deploys intelligent models, transformer pipelines, and generative AI systems into production.",
                "responsibilities": "Train and adapt foundation models, implement semantic search and RAG pipelines, optimize GPU inference, and evaluate generation quality.",
                "tasks": [
                    "Build semantic vector search and RAG knowledge systems using FAISS",
                    "Fine-tune open-source models using LoRA and parameter-efficient techniques",
                    "Deploy low-latency inference microservices in FastAPI and Docker",
                    "Implement guardrails and automated evaluation rubrics for generative models"
                ],
                "tools": ["PyTorch", "Hugging Face", "FastAPI", "FAISS", "Docker", "Python"],
                "deliverables": [
                    "Production RAG Microservice with Vector Search",
                    "Fine-Tuned Domain LLM Checkpoint",
                    "Low-Latency Model API with Docker",
                    "Generative AI Evaluation & Safety Suite"
                ],
                "prerequisites": ["Python fluency", "Linear algebra and calculus foundations", "Basic machine learning concepts"],
                "stages": [
                    {
                        "number": 1,
                        "name": "Stage 1 — Foundations",
                        "subtitle": "Year 1 • Mathematics for AI & Neural Foundations",
                        "duration": "Year 1 (Semesters 1 & 2)",
                        "milestones": [
                            {"number": 1, "title": "Linear Algebra, Vector Calculus & NumPy", "duration": "4–6 Weeks", "description": "Matrix transformations, vector spaces, gradient descent, and scientific computing.", "why_it_matters": "The mathematical foundation of every deep learning algorithm.", "skills": ["Linear Algebra", "Vector Calculus", "NumPy"], "tools": ["Python", "NumPy", "Jupyter"]},
                            {"number": 2, "title": "Neural Networks & PyTorch Fundamentals", "duration": "5–6 Weeks", "description": "Computational graphs, autograd, forward/backward passes, and training MLPs in PyTorch.", "why_it_matters": "PyTorch is the industry-standard deep learning research and production framework.", "skills": ["PyTorch", "Neural Networks", "Autograd"], "tools": ["PyTorch", "CUDA", "VS Code"]}
                        ]
                    },
                    {
                        "number": 2,
                        "name": "Stage 2 — Core Skills",
                        "subtitle": "Year 2 • Deep Learning Architectures & NLP",
                        "duration": "Year 2 (Semesters 3 & 4)",
                        "milestones": [
                            {"number": 3, "title": "CNNs & Computer Vision Fundamentals", "duration": "5–6 Weeks", "description": "Convolutional layers, pooling, transfer learning with ResNet/Vision Transformers.", "why_it_matters": "Enables visual understanding and multimodal AI processing.", "skills": ["Computer Vision", "Convolutional Networks", "Transfer Learning"], "tools": ["Torchvision", "PyTorch", "OpenCV"]},
                            {"number": 4, "title": "Transformers & Natural Language Processing", "duration": "5–6 Weeks", "description": "Self-attention mechanisms, encoder-decoder architectures, tokenization, and BERT/GPT models.", "why_it_matters": "Transformers power 95% of modern breakthroughs in AI and LLMs.", "skills": ["Transformers", "Attention Mechanisms", "Hugging Face"], "tools": ["Hugging Face", "PyTorch", "Datasets"]}
                        ]
                    },
                    {
                        "number": 3,
                        "name": "Stage 3 — Specialization",
                        "subtitle": "Year 3 • RAG, Embeddings & GenAI Systems",
                        "duration": "Year 3 (Semesters 5 & 6)",
                        "milestones": [
                            {"number": 5, "title": "Vector Embeddings & Retrieval-Augmented Generation (RAG)", "duration": "5–6 Weeks", "description": "Building semantic document retrieval pipelines using dense vector search and FAISS.", "why_it_matters": "The primary commercial pattern for private enterprise AI adoption.", "skills": ["Vector Search", "RAG Architecture", "FAISS"], "tools": ["FAISS", "Sentence-Transformers", "FastAPI"]},
                            {"number": 6, "title": "Parameter-Efficient Fine-Tuning (LoRA & PEFT)", "duration": "5–6 Weeks", "description": "Adapting open-source foundation models (Llama, Mistral) on custom enterprise datasets using LoRA.", "why_it_matters": "Allows specialized domain performance on accessible hardware.", "skills": ["Fine-Tuning", "LoRA & PEFT", "Model Adaptation"], "tools": ["PEFT", "Transformers", "TRL"]}
                        ]
                    },
                    {
                        "number": 4,
                        "name": "Stage 4 — Career Readiness",
                        "subtitle": "Year 4 • Production AI Serving & Capstone",
                        "duration": "Year 4 (Semesters 7 & 8)",
                        "milestones": [
                            {"number": 7, "title": "Low-Latency Model Serving & Containerization", "duration": "6 Weeks", "description": "FastAPI async endpoints, Docker container packaging, and quantization with ONNX/TensorRT.", "why_it_matters": "Critical for serving predictions under production web latency constraints.", "skills": ["Model Serving", "Docker", "Quantization"], "tools": ["FastAPI", "Docker", "ONNX"]},
                            {"number": 8, "title": "Production AI Capstone & Technical Defense", "duration": "6 Weeks", "description": "End-to-end deployed AI microservice with benchmarking documentation and interview preparation.", "why_it_matters": "Verified proof of capability for high-paying AI engineering roles.", "skills": ["AI Systems Engineering", "Technical Communication", "Fresher Hiring Readiness"], "tools": ["GitHub", "Docker", "FastAPI"]}
                        ]
                    }
                ]
            },
            {
                "domain_slug": "cloud-devops",
                "role_slug": "devops-engineer",
                "title": "DevOps & Cloud Engineer",
                "focus": "Infrastructure as Code, CI/CD Automation, Kubernetes Orchestration, Observability",
                "description": "Automates software delivery pipelines, provisions scalable multi-cloud infrastructure with Terraform, and manages Kubernetes clusters.",
                "responsibilities": "Author CI/CD workflows, manage containerized microservice fleets on Kubernetes, write declarative Terraform configurations, and monitor system metrics.",
                "tasks": [
                    "Design and maintain automated GitHub Actions CI/CD pipelines",
                    "Provision reproducible cloud infrastructure using Terraform",
                    "Manage and scale Kubernetes container clusters",
                    "Configure real-time monitoring and alerting using Prometheus and Grafana"
                ],
                "tools": ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "Linux", "Prometheus & Grafana"],
                "deliverables": [
                    "Automated Zero-Downtime CI/CD Pipeline",
                    "Multi-Tier Terraform Infrastructure Modules",
                    "Production Kubernetes Deployment Manifests",
                    "Full-Stack Observability & Alerting Dashboard"
                ],
                "prerequisites": ["Linux CLI fundamentals", "Basic networking concepts (TCP/IP, DNS)", "Understanding of software build lifecycles"],
                "stages": [
                    {
                        "number": 1,
                        "name": "Stage 1 — Foundations",
                        "subtitle": "Year 1 • Linux Internals & Shell Automation",
                        "duration": "Year 1 (Semesters 1 & 2)",
                        "milestones": [
                            {"number": 1, "title": "Linux Systems Administration & Bash Automation", "duration": "4–6 Weeks", "description": "File systems, processes, permissions, systemd services, and automated shell scripting.", "why_it_matters": "Linux is the foundation of 99% of cloud workloads and servers.", "skills": ["Linux Administration", "Bash Scripting", "Systemd & Permissions"], "tools": ["Ubuntu Linux", "Bash", "SSH"]},
                            {"number": 2, "title": "Networking Protocols & Cloud Fundamentals", "duration": "5–6 Weeks", "description": "TCP/IP, DNS, HTTP/HTTPS, SSL/TLS certificates, reverse proxies, and cloud VPC basics.", "why_it_matters": "Essential for debugging distributed connectivity and security boundaries.", "skills": ["Networking Protocols", "DNS & TLS", "Reverse Proxies (Nginx)"], "tools": ["Nginx", "Wireshark", "OpenSSL"]}
                        ]
                    },
                    {
                        "number": 2,
                        "name": "Stage 2 — Core Skills",
                        "subtitle": "Year 2 • Containers & CI/CD Pipelines",
                        "duration": "Year 2 (Semesters 3 & 4)",
                        "milestones": [
                            {"number": 3, "title": "Containerization with Docker", "duration": "5–6 Weeks", "description": "Multi-stage Dockerfiles, image optimization, volume mounts, and Docker Compose networking.", "why_it_matters": "Standard application packaging format across all modern tech companies.", "skills": ["Docker", "Multi-Stage Builds", "Docker Compose"], "tools": ["Docker", "Docker Compose", "Docker Hub"]},
                            {"number": 4, "title": "Automated CI/CD with GitHub Actions", "duration": "5–6 Weeks", "description": "Automated linting, testing, security scanning, container image building, and cloud deployment.", "why_it_matters": "Enables teams to ship code multiple times daily with high confidence.", "skills": ["CI/CD Pipelines", "GitHub Actions", "Automated Testing Automation"], "tools": ["GitHub Actions", "Git", "Trivy"]}
                        ]
                    },
                    {
                        "number": 3,
                        "name": "Stage 3 — Specialization",
                        "subtitle": "Year 3 • Infrastructure as Code & Kubernetes",
                        "duration": "Year 3 (Semesters 5 & 6)",
                        "milestones": [
                            {"number": 5, "title": "Infrastructure as Code (IaC) with Terraform", "duration": "5–6 Weeks", "description": "Declarative cloud provisioning, state management, reusable modules, and multi-cloud setup.", "why_it_matters": "Eliminates manual cloud configuration errors and enables version-controlled infra.", "skills": ["Terraform", "Infrastructure as Code", "Cloud Architecture"], "tools": ["Terraform", "AWS / GCP", "LocalStack"]},
                            {"number": 6, "title": "Container Orchestration with Kubernetes", "duration": "5–6 Weeks", "description": "Pods, Deployments, Services, Ingress, ConfigMaps, Secrets, and Horizontal Pod Autoscaling.", "why_it_matters": "Universal orchestrator for scalable enterprise microservices.", "skills": ["Kubernetes (K8s)", "Cluster Management", "Auto-Scaling"], "tools": ["Kubernetes", "Minikube", "kubectl", "Helm"]}
                        ]
                    },
                    {
                        "number": 4,
                        "name": "Stage 4 — Career Readiness",
                        "subtitle": "Year 4 • Observability, Reliability & Capstone",
                        "duration": "Year 4 (Semesters 7 & 8)",
                        "milestones": [
                            {"number": 7, "title": "Observability: Prometheus, Grafana & Distributed Logging", "duration": "6 Weeks", "description": "Metrics scraping, PromQL queries, Grafana visual dashboards, and centralized log aggregation.", "why_it_matters": "Provides immediate visibility into system health, performance, and incidents.", "skills": ["Prometheus & Grafana", "Observability", "Alerting & Logging"], "tools": ["Prometheus", "Grafana", "Loki"]},
                            {"number": 8, "title": "Production Cloud & DevOps Platform Capstone", "duration": "6 Weeks", "description": "End-to-end automated platform featuring Terraform provisioning, K8s deployment, CI/CD, and monitoring.", "why_it_matters": "Validates ability to design and maintain enterprise cloud systems.", "skills": ["DevOps Architecture", "Site Reliability Engineering", "Fresher Hiring Readiness"], "tools": ["GitHub Actions", "Kubernetes", "Terraform", "Grafana"]}
                        ]
                    }
                ]
            },
            {
                "domain_slug": "cybersecurity",
                "role_slug": "security-analyst",
                "title": "Cybersecurity & SOC Analyst",
                "focus": "Threat Detection, Incident Response, Network Telemetry, Vulnerability Management",
                "description": "Defends organizational infrastructure against intrusion, analyzes security telemetry, audits vulnerabilities, and enforces zero-trust controls.",
                "responsibilities": "Monitor SIEM telemetry, investigate suspicious alerts, conduct vulnerability scans, patch software security flaws, and participate in incident response.",
                "tasks": [
                    "Triage security alerts and investigate potential intrusion attempts in a SIEM",
                    "Conduct automated and manual network vulnerability assessments",
                    "Analyze packet captures in Wireshark to isolate indicators of compromise",
                    "Enforce zero-trust access policies, multi-factor auth, and endpoint hardening"
                ],
                "tools": ["Wireshark", "SIEM (Wazuh / Splunk)", "Linux", "Nmap", "Metasploit Basics", "OWASP ZAP"],
                "deliverables": [
                    "Security Operations Center (SOC) Alert Triage Playbook",
                    "Comprehensive Network Vulnerability Assessment Report",
                    "Packet Forensics Incident Investigation Memo",
                    "Hardened Linux Infrastructure Baseline Configuration"
                ],
                "prerequisites": ["Networking fundamentals (OSI model, TCP/IP)", "Operating system internals (Linux/Windows)", "Basic command-line navigation"],
                "stages": [
                    {
                        "number": 1,
                        "name": "Stage 1 — Foundations",
                        "subtitle": "Year 1 • Networking Protocols & Linux Hardening",
                        "duration": "Year 1 (Semesters 1 & 2)",
                        "milestones": [
                            {"number": 1, "title": "Network Architecture, Protocols & Packet Inspection", "duration": "4–6 Weeks", "description": "Deep-dive into TCP/IP, UDP, ICMP, DNS, ARP, packet headers, and Wireshark stream analysis.", "why_it_matters": "Network packets reveal every attempt at lateral movement or data exfiltration.", "skills": ["Network Protocols", "Packet Analysis", "Wireshark"], "tools": ["Wireshark", "TCPDump", "Nmap"]},
                            {"number": 2, "title": "Linux Security & System Hardening", "duration": "5–6 Weeks", "description": "User privilege management, SSH key enforcement, firewall rules (UFW/iptables), and audit logs.", "why_it_matters": "Securing the operating system layer blocks unauthorized lateral attacker pivots.", "skills": ["Linux Hardening", "Firewall Configuration", "Access Controls"], "tools": ["Linux (Ubuntu)", "iptables", "fail2ban"]}
                        ]
                    },
                    {
                        "number": 2,
                        "name": "Stage 2 — Core Skills",
                        "subtitle": "Year 2 • Vulnerability Assessment & Web Security",
                        "duration": "Year 2 (Semesters 3 & 4)",
                        "milestones": [
                            {"number": 3, "title": "Vulnerability Scanning & Asset Discovery", "duration": "5–6 Weeks", "description": "Scanning network perimeters with Nmap, OpenVAS, assessing CVE severity and remediation.", "why_it_matters": "Identifies exposed ports and outdated software versions before attackers find them.", "skills": ["Vulnerability Assessment", "Nmap Port Scanning", "CVE Evaluation"], "tools": ["Nmap", "OpenVAS / Nessus", "CVE Databases"]},
                            {"number": 4, "title": "Web Application Security & OWASP Top 10", "duration": "5–6 Weeks", "description": "Testing web apps against SQL injection, Cross-Site Scripting (XSS), CSRF, and broken access control.", "why_it_matters": "Web applications are the primary target for external cyber attacks and data breaches.", "skills": ["OWASP Top 10", "Web Security Testing", "Vulnerability Patching"], "tools": ["Burp Suite", "OWASP ZAP", "Chrome DevTools"]}
                        ]
                    },
                    {
                        "number": 3,
                        "name": "Stage 3 — Specialization",
                        "subtitle": "Year 3 • SIEM Telemetry & Threat Detection",
                        "duration": "Year 3 (Semesters 5 & 6)",
                        "milestones": [
                            {"number": 5, "title": "SIEM Deployment & Telemetry Log Analysis", "duration": "5–6 Weeks", "description": "Aggregating system logs into Wazuh/Splunk, authoring alert detection rules, and isolating IOCs.", "why_it_matters": "The central nerve center of enterprise defensive operations.", "skills": ["SIEM Operations", "Log Analysis", "Threat Detection Rules"], "tools": ["Wazuh / Splunk", "Syslog", "Elasticsearch"]},
                            {"number": 6, "title": "Incident Response & Digital Forensics", "duration": "5–6 Weeks", "description": "Incident containment, evidence preservation, memory analysis, and root-cause reconstruction.", "why_it_matters": "Limits financial and operational fallout during an active breach.", "skills": ["Incident Response", "Digital Forensics", "Root-Cause Analysis"], "tools": ["Volatility", "Autopsy", "Memory Dumps"]}
                        ]
                    },
                    {
                        "number": 4,
                        "name": "Stage 4 — Career Readiness",
                        "subtitle": "Year 4 • SOC Defense Capstone & Certifications",
                        "duration": "Year 4 (Semesters 7 & 8)",
                        "milestones": [
                            {"number": 7, "title": "Zero-Trust Architecture & Identity Governance", "duration": "6 Weeks", "description": "Implementing least-privilege RBAC, multi-factor authentication, and secure boundary enforcement.", "why_it_matters": "Modern enterprise security operates on the premise that perimeters are already breached.", "skills": ["Zero-Trust Architecture", "Identity & Access Management", "Security Governance"], "tools": ["IAM Policies", "OAuth / SAML", "Keycloak"]},
                            {"number": 8, "title": "Defensive SOC Capstone & Certification Preparation", "duration": "6 Weeks", "description": "Documented incident response scenario defense, portfolio report, and CompTIA Security+ readiness.", "why_it_matters": "Validates hands-on readiness for SOC Tier 1 analyst roles.", "skills": ["SOC Analyst Operations", "Technical Investigation Defense", "Cybersecurity Career Readiness"], "tools": ["Wazuh", "Wireshark", "Markdown"]}
                        ]
                    }
                ]
            }
        ]

        for od in other_domains_roles:
            dom = domain_objs[od["domain_slug"]]
            role = Role(
                slug=od["role_slug"],
                title=od["title"],
                focus=od["focus"],
                description=od["description"],
                responsibilities=od["responsibilities"],
                tasks=od["tasks"],
                tools=od["tools"],
                deliverables=od["deliverables"],
                prerequisites=od["prerequisites"],
            )
            db.add(role)
            db.flush()

            # Link Domain Role
            dr = DomainRole(domain_id=dom.id, role_id=role.id, is_primary=True)
            db.add(dr)

            # Roadmap
            rm = Roadmap(
                role_id=role.id,
                domain_id=dom.id,
                title=f"{role.title} — 4-Year Structured Career Progression",
                description=f"Industry-aligned technical roadmap for {role.title}.",
                total_duration=f"4 Academic Years ({dom.milestone_count} Milestones)",
            )
            db.add(rm)
            db.flush()

            for st_info in od["stages"]:
                stage = RoadmapStage(
                    roadmap_id=rm.id,
                    stage_number=st_info["number"],
                    stage_name=st_info["name"],
                    stage_subtitle=st_info["subtitle"],
                    duration=st_info["duration"],
                )
                db.add(stage)
                db.flush()

                for ms_info in st_info["milestones"]:
                    ms = Milestone(
                        stage_id=stage.id,
                        milestone_number=ms_info["number"],
                        title=ms_info["title"],
                        duration=ms_info["duration"],
                        description=ms_info["description"],
                        why_it_matters=ms_info.get("why_it_matters"),
                        concepts=ms_info.get("skills", []),
                        tools=ms_info.get("tools", []),
                        exercises=[f"Complete hands-on implementation for {ms_info['title']}."],
                        completion_criteria=[f"Pass technical checklist for {ms_info['title']}."],
                    )
                    db.add(ms)
                    db.flush()

                    for sk_name in ms_info.get("skills", []):
                        if sk_name not in skill_cache:
                            sk_slug = sk_name.lower().replace(" ", "-").replace("(", "").replace(")", "").replace("&", "and")
                            sk = db.query(Skill).filter(Skill.name == sk_name).first()
                            if not sk:
                                sk = Skill(
                                    name=sk_name,
                                    slug=sk_slug,
                                    category="Technical Skill",
                                    description=f"Competency in {sk_name} for {role.title}.",
                                    why_it_matters=f"Tested by hiring engineering teams for {role.title}.",
                                    recommended_tools=ms_info.get("tools", [])[:3],
                                )
                                db.add(sk)
                                db.flush()
                            skill_cache[sk_name] = sk
                        sk_obj = skill_cache[sk_name]

                        ms_skill = MilestoneSkill(milestone_id=ms.id, skill_id=sk_obj.id)
                        db.add(ms_skill)

                        existing_rs = db.query(RoleSkill).filter(RoleSkill.role_id == role.id, RoleSkill.skill_id == sk_obj.id).first()
                        if not existing_rs:
                            rs = RoleSkill(role_id=role.id, skill_id=sk_obj.id, stage_number=stage.stage_number, importance="core")
                            db.add(rs)

        db.commit()
        logger.info("Successfully completed database seeding for all 5 domains and primary roles!")

    except Exception as e:
        db.rollback()
        logger.error(f"Error during database seed: {e}")
        raise
    finally:
        if close_at_end:
            db.close()


if __name__ == "__main__":
    seed_database()
