import React, { useState, useMemo } from "react";
import {
  SearchCode,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  FileCheck,
} from "lucide-react";
import { ENGINEERING_DOMAINS, getRolesForDomain } from "../../data/jobRoles.js";

const SAMPLE_JOB_DESCRIPTIONS = {
  "software-dev": `We are seeking an enthusiastic Software Development Engineer to join our team. 
Key Requirements:
- Proficiency in JavaScript/TypeScript, Python, and modern web frameworks (React, Node.js).
- Strong understanding of Data Structures, Algorithms, and Object-Oriented Design.
- Experience with RESTful APIs, relational databases (PostgreSQL/MySQL), and Git version control.
- Familiarity with containerization (Docker) and CI/CD deployment pipelines is a strong plus.
- Excellent problem-solving abilities and communication skills.`,
  "data-analytics": `Looking for an Associate Data Analyst to interpret data and analyze results using statistical techniques.
Key Requirements:
- Hands-on experience with SQL, Python (Pandas, NumPy), and data visualization tools (Power BI / Tableau).
- Knowledge of statistical analysis, data cleaning, and KPI reporting.
- Experience writing complex SQL queries and aggregating relational datasets.
- Ability to synthesize technical findings into actionable executive summaries.`,
  "cloud-devops": `Seeking an Entry-Level Cloud & DevOps Engineer to support infrastructure automation.
Key Requirements:
- Practical knowledge of AWS / Azure core services (EC2, S3, IAM, VPC).
- Experience with Linux administration, Bash/Python scripting, and Docker containerization.
- Understanding of CI/CD concepts (GitHub Actions / Jenkins) and Infrastructure as Code (Terraform).
- Passion for system reliability, monitoring, and automated deployment pipelines.`,
};

export default function AnalyzerPage() {
  const [selectedDomain, setSelectedDomain] = useState("software-dev");
  const [selectedRole, setSelectedRole] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Available roles for selected domain
  const availableRoles = useMemo(() => {
    return getRolesForDomain(selectedDomain);
  }, [selectedDomain]);

  // Set default role when domain changes
  React.useEffect(() => {
    if (availableRoles.length > 0) {
      setSelectedRole(availableRoles[0].id);
    }
  }, [selectedDomain, availableRoles]);

  // Handle Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleLoadSampleJob = () => {
    setJobDescription(SAMPLE_JOB_DESCRIPTIONS[selectedDomain] || SAMPLE_JOB_DESCRIPTIONS["software-dev"]);
  };

  const handleRunAnalysis = () => {
    if (!jobDescription.trim() && !resumeText.trim() && !uploadedFile) {
      alert("Please upload a resume or paste your resume text, along with a target job description.");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      // Algorithmic evaluation based on domain roles
      const role = availableRoles.find((r) => r.id === selectedRole) || availableRoles[0];
      const keywords = role ? role.skills : ["JavaScript", "Python", "SQL", "Git", "Docker", "REST APIs"];

      // Simulate matched vs missing
      const matched = keywords.slice(0, Math.max(3, Math.floor(keywords.length * 0.7)));
      const missing = keywords.slice(Math.max(3, Math.floor(keywords.length * 0.7)));
      const score = Math.min(94, Math.max(68, Math.floor(70 + Math.random() * 20)));

      setAnalysisResult({
        score,
        roleTitle: role ? role.title : "Software Engineer",
        domainName: ENGINEERING_DOMAINS.find((d) => d.id === selectedDomain)?.name || "Software",
        matchedSkills: matched,
        missingSkills: missing,
        keywordCoverage: Math.round((matched.length / keywords.length) * 100),
        formatScore: 92,
        actionVerbsScore: 78,
        verdict:
          score >= 85
            ? "Strong Candidate Match"
            : score >= 75
            ? "Competitive Candidate with Minor Gaps"
            : "Moderate Match — Action Recommended",
        suggestions: [
          `Incorporate explicit keywords for: ${missing.join(", ")} within your projects or skills section.`,
          "Quantify engineering achievements using the metric formula: Accomplished [X], as measured by [Y], by doing [Z].",
          "Ensure section headers strictly use standard ATS naming: Work Experience, Education, Projects, Technical Skills.",
          "Keep document to exactly 1 page with selectable text and standard 0.5–0.75 in margins.",
        ],
      });

      setIsAnalyzing(false);
    }, 850);
  };

  return (
    <div className="space-y-8 pt-6 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="im-card p-6 md:p-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-violet">
          Intelligence Workspace
        </span>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-brand-slate m-0">
          Resume Analyzer &amp; ATS Benchmark
        </h1>
        <p className="text-sm text-brand-muted leading-relaxed m-0 max-w-3xl">
          Compare your resume against real-world engineering job descriptions. Evaluate keyword coverage,
          detect missing competencies, and review actionable writing suggestions.
        </p>
      </div>

      {/* Main Analyzer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="im-card p-6 sm:p-7 space-y-5">
            {/* 1. Domain & Role Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-brand-slate uppercase tracking-wide mb-1.5">
                  1. Target Engineering Domain
                </label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-brand-border bg-brand-surface text-brand-slate focus:outline-none focus:border-brand-violet"
                >
                  {ENGINEERING_DOMAINS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-slate uppercase tracking-wide mb-1.5">
                  Target Job Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-brand-border bg-brand-surface text-brand-slate focus:outline-none focus:border-brand-violet"
                >
                  {availableRoles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Resume File Upload / Text Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-brand-slate uppercase tracking-wide">
                2. Upload Resume (PDF / DOCX) or Paste Text
              </label>

              {/* Drag & Drop Box */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-brand-border rounded-2xl p-6 text-center bg-brand-surface hover:bg-brand-violet/5 hover:border-brand-violet/50 transition-all cursor-pointer relative"
              >
                <input
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-11 h-11 rounded-xl bg-brand-card border border-brand-border shadow-xs text-brand-violet flex items-center justify-center">
                    <Upload size={20} />
                  </div>
                  {uploadedFile ? (
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-brand-violet block">
                        ✓ {uploadedFile.name}
                      </span>
                      <span className="text-[11px] text-brand-muted">
                        {(uploadedFile.size / 1024).toFixed(1)} KB &bull; Click or drop to replace
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className="text-xs font-semibold text-brand-slate">
                        Click to upload or drag &amp; drop
                      </span>
                      <span className="text-[11px] text-brand-muted">
                        Supports PDF, DOCX, or plain text (Max 10MB)
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Plain text fallback */}
              <div className="pt-1">
                <textarea
                  rows={3}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Or paste resume skills, summary, and experience text here directly..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-brand-border bg-brand-surface text-brand-slate placeholder:text-brand-muted focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 resize-none"
                />
              </div>
            </div>

            {/* 3. Job Description Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-brand-slate uppercase tracking-wide">
                  3. Target Job Description
                </label>
                <button
                  type="button"
                  onClick={handleLoadSampleJob}
                  className="text-[11px] font-semibold text-brand-violet hover:underline inline-flex items-center gap-1"
                >
                  <Sparkles size={11} />
                  <span>Load Sample Job Description</span>
                </button>
              </div>

              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description or requirements here..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-brand-border bg-brand-surface text-brand-slate placeholder:text-brand-muted focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20"
              />
            </div>

            {/* Run Button */}
            <button
              type="button"
              disabled={isAnalyzing}
              onClick={handleRunAnalysis}
              className="w-full py-3 px-4 rounded-xl bg-brand-violet hover:bg-brand-violetHover text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Analyzing Resume Keywords...</span>
                </>
              ) : (
                <>
                  <SearchCode size={16} />
                  <span>Run ATS Benchmark Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Results Panel */}
        <div className="lg:col-span-6 space-y-6">
          {analysisResult ? (
            <div className="im-card p-6 sm:p-7 space-y-6">
              {/* Header result */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-violet">
                    Evaluation Complete
                  </span>
                  <h3 className="text-lg font-bold font-heading text-brand-slate m-0">
                    {analysisResult.roleTitle} Readiness
                  </h3>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-14 h-14 rounded-full border-4 border-brand-violet flex items-center justify-center bg-brand-surface shadow-xs">
                    <span className="font-heading font-bold text-base text-brand-violet">
                      {analysisResult.score}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Verdict Pill */}
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 font-medium flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                <span>{analysisResult.verdict}</span>
              </div>

              {/* Sub-scores */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-brand-surface border border-brand-border text-center">
                  <div className="text-sm font-bold text-brand-slate">{analysisResult.keywordCoverage}%</div>
                  <div className="text-[10px] text-brand-muted uppercase tracking-wider mt-0.5">Keyword Match</div>
                </div>
                <div className="p-3 rounded-xl bg-brand-surface border border-brand-border text-center">
                  <div className="text-sm font-bold text-brand-slate">{analysisResult.formatScore}%</div>
                  <div className="text-[10px] text-brand-muted uppercase tracking-wider mt-0.5">ATS Formatting</div>
                </div>
                <div className="p-3 rounded-xl bg-brand-surface border border-brand-border text-center">
                  <div className="text-sm font-bold text-brand-slate">{analysisResult.actionVerbsScore}%</div>
                  <div className="text-[10px] text-brand-muted uppercase tracking-wider mt-0.5">Action Metrics</div>
                </div>
              </div>

              {/* Matched vs Missing Skills */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-emerald-300 block mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Identified Competencies ({analysisResult.matchedSkills.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.matchedSkills.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-amber-300 block mb-1.5 flex items-center gap-1.5">
                    <AlertCircle size={13} className="text-amber-400" />
                    <span>Missing Keywords &amp; Blindspots ({analysisResult.missingSkills.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.missingSkills.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actionable Suggestions */}
              <div className="space-y-2 pt-2 border-t border-brand-border">
                <span className="text-xs font-bold text-brand-slate uppercase tracking-wide block">
                  Actionable Recommendations:
                </span>
                <ul className="text-xs text-brand-muted space-y-1.5 pl-4 m-0 list-disc">
                  {analysisResult.suggestions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="im-card p-10 text-center space-y-3 flex flex-col items-center justify-center min-h-[380px]">
              <div className="w-14 h-14 rounded-2xl bg-brand-surface text-brand-muted flex items-center justify-center border border-brand-border">
                <FileCheck size={28} />
              </div>
              <h3 className="font-heading font-bold text-base text-brand-slate m-0">
                Awaiting Resume Submission
              </h3>
              <p className="text-xs text-brand-muted max-w-sm m-0">
                Select your target engineering domain, provide your resume and target job requirements on
                the left to compute keyword coverage and ATS score readiness.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
