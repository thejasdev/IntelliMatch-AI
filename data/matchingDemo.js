/**
 * Interactive Job Matching Scenarios — "See How Job Matching Works"
 * Curated demonstration scenarios illustrating how lexical keyword coverage,
 * contextual evidence, and semantic proximity are evaluated.
 */

export const MATCHING_DEMO_SCENARIOS = [
  {
    id: "scenario-sw",
    roleTitle: "Senior Full-Stack Software Engineer",
    domain: "Software Development",
    company: "Apex Digital Systems",
    candidateProfile: "Alex Morgan (B.S. Computer Science • 4 Yrs Exp)",
    resumeSummary: "Full-stack engineer with hands-on experience in TypeScript, React, Node.js, and relational schema optimization.",
    overallScore: 88,
    keywordCoverage: 92,
    semanticFit: 84,
    matchedSkills: [
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "RESTful APIs",
      "System Design",
      "Unit Testing"
    ],
    missingSkills: [
      "Docker CI/CD Pipeline Setup",
      "Event-Driven Microservices (Kafka)"
    ],
    explanation: "High alignment in core application architecture and relational database design. Candidate's resume demonstrates solid backend foundations with high keyword density in API development. Minor gap identified in production container orchestration and asynchronous message brokering.",
    sampleBulletOptimization: {
      original: "Built REST APIs for user registration and login.",
      optimized: "Architected high-throughput Node.js authentication endpoints with JWT and bcrypt, reducing login latency by 32% across 45k+ monthly users."
    }
  },
  {
    id: "scenario-ai",
    roleTitle: "Machine Learning & AI Engineer",
    domain: "AI and Machine Learning",
    company: "Neural Horizons AI Labs",
    candidateProfile: "Priya Nair (M.S. Data Science • 3 Yrs Exp)",
    resumeSummary: "Applied ML practitioner experienced in Python, PyTorch, Hugging Face transformers, and vector search embeddings.",
    overallScore: 85,
    keywordCoverage: 89,
    semanticFit: 82,
    matchedSkills: [
      "Python 3.11",
      "PyTorch",
      "Hugging Face Transformers",
      "Vector Similarity (Cosine)",
      "Model Evaluation (F1/AUC)",
      "Pandas & SQL"
    ],
    missingSkills: [
      "Triton Inference Server Deployment",
      "Distributed Multi-GPU Training (DeepSpeed)"
    ],
    explanation: "Deep quantitative foundation with strong experimental evidence in fine-tuning Transformer models. Demonstrates verified statistical rigor. Suggested improvement: quantify production serving latency and cluster orchestration.",
    sampleBulletOptimization: {
      original: "Trained BERT model for customer text classification.",
      optimized: "Fine-tuned domain-specific BERT classifier on 120k records, boosting macro F1-score from 0.74 to 0.89 and containerizing inference via FastAPI."
    }
  },
  {
    id: "scenario-cloud",
    roleTitle: "Cloud Infrastructure & DevOps Engineer",
    domain: "Cloud, DevOps and Infrastructure",
    company: "Stratus Cloud Networks",
    candidateProfile: "Marcus Thorne (B.S. Computer Engineering • 4 Yrs Exp)",
    resumeSummary: "Infrastructure specialist focused on AWS multi-region networking, Terraform IaC, and Kubernetes GitOps.",
    overallScore: 83,
    keywordCoverage: 87,
    semanticFit: 79,
    matchedSkills: [
      "AWS (EKS, VPC, IAM, RDS)",
      "Terraform Modules",
      "Kubernetes & Helm",
      "Docker Multi-Stage",
      "Linux Kernel Tuning",
      "GitHub Actions"
    ],
    missingSkills: [
      "Multi-Region Active-Active Failover",
      "Istio Service Mesh mTLS"
    ],
    explanation: "Substantial competency in cloud provisioning and automated continuous integration. Project evidence reflects real-world declarative configuration. Recommends adding observability SLI/SLO metrics to project bullet points.",
    sampleBulletOptimization: {
      original: "Maintained Kubernetes clusters and Docker containers.",
      optimized: "Provisioned modular Terraform configurations for 3 AWS EKS clusters hosting 40+ microservices, slashing release cycle time from 40 mins to 4 mins."
    }
  },
  {
    id: "scenario-sec",
    roleTitle: "Cybersecurity & SOC Operations Analyst",
    domain: "Cybersecurity",
    company: "Vanguard Defense Corp",
    candidateProfile: "Elena Rostova (B.S. Cybersecurity • CompTIA Security+)",
    resumeSummary: "Information security analyst specializing in SIEM event correlation, vulnerability remediation, and network packet analysis.",
    overallScore: 86,
    keywordCoverage: 91,
    semanticFit: 83,
    matchedSkills: [
      "Splunk SIEM (SPL)",
      "Wireshark Packet Analysis",
      "Incident Response Playbooks",
      "OWASP Top 10 Mitigation",
      "Firewall Access Controls",
      "Vulnerability Scans (Nessus)"
    ],
    missingSkills: [
      "SOAR Automation Scripting (Python)",
      "Cloud Security Posture Management (CSPM)"
    ],
    explanation: "Excellent baseline alignment for SOC tier-1 and tier-2 operations. Strong evidence of protocol inspection and structured triage. Recommends showcasing security automation scripts to demonstrate proactive remediation skills.",
    sampleBulletOptimization: {
      original: "Monitored security alerts in Splunk SIEM.",
      optimized: "Triaged 250+ daily SIEM alerts in Splunk, identifying and isolating credential-stuffing attack within 18 minutes to prevent account takeover."
    }
  }
];

export function getScenarioById(scenarioId) {
  return MATCHING_DEMO_SCENARIOS.find((s) => s.id === scenarioId) || MATCHING_DEMO_SCENARIOS[0];
}

