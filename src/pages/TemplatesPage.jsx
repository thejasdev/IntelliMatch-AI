import React, { useState } from "react";
import {
  FileText,
  Eye,
  Download,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Layout,
  ExternalLink,
} from "lucide-react";
import PdfPreviewModal from "../components/PdfPreviewModal";

export const RESUME_TEMPLATES_DATA = [
  {
    id: "clean-professional",
    filename: "clean-professional.pdf",
    title: "Clean Professional Layout",
    layoutStyle: "Single-Column Modern Typography & Strict Linear Spacing",
    bestFor: "Engineering Freshers & SDE Candidates",
    description:
      "A distraction-free, minimalist single-column document engineered for high ATS parse rates. Highlights core technical skills, clean chronological sections, and bullet points with quantifiable impact metrics.",
    features: [
      "Optimal single-column vertical flow",
      "Standard system typography and clear section dividers",
      "Prominent contact details and repository links",
      "Tested with 100% text selectability",
    ],
  },
  {
    id: "experience-focused",
    filename: "experience-focused.pdf",
    title: "Experience-Focused Format",
    layoutStyle: "Work History & Internship Timeline Architecture",
    bestFor: "Students with Prior Internships & Transitioning Engineers",
    description:
      "Emphasizes professional responsibilities, internship deliverables, and company contributions before academic credentials. Designed to surface real-world engineering contributions immediately.",
    features: [
      "Expanded chronological work experience section",
      "Subtle secondary column for technical skills & tooling",
      "Clean metadata headers for dates, company, and location",
      "Standard ATS header/footer compliance",
    ],
  },
  {
    id: "fresher-project-focused",
    filename: "fresher-project-focused.pdf",
    title: "Fresher & Project-Focused Blueprint",
    layoutStyle: "Project Showcase & Technical Deliverables Hierarchy",
    bestFor: "Final-Year Students, Hackathon Builders & Self-Taught Developers",
    description:
      "Prioritizes capstone projects, open-source pull requests, and software deliverables over formal employment. Ideal for college candidates demonstrating hands-on technical competence.",
    features: [
      "Extensive project blueprint cards with tech stack chips",
      "Direct GitHub / Live Demo repository link placement",
      "Compact coursework & university credentials block",
      "Parsed seamlessly across recruiter ATS platforms",
    ],
  },
  {
    id: "technical-projects",
    filename: "technical-projects.pdf",
    title: "Technical Projects & Systems Layout",
    layoutStyle: "Dense Technical Competency & Tooling Breakdown",
    bestFor: "Full-Stack, Cloud, DevOps & Systems Engineering Applicants",
    description:
      "Engineered for deep technical density. Organizes languages, frameworks, developer tools, database systems, and deployment workflows into accessible, scannable clusters.",
    features: [
      "Structured skill matrix categorized by domain",
      "Technical project highlights with performance metrics",
      "Single-page high information density",
      "Optimized for automated recruiter keyword scrapers",
    ],
  },
  {
    id: "traditional-academic",
    filename: "traditional-academic.pdf",
    title: "Traditional Academic & Research Layout",
    layoutStyle: "Classic Serif Hierarchy & Scholarly Structure",
    bestFor: "Graduate Trainees, Researchers & Institutional Applications",
    description:
      "A formal, authoritative layout rooted in classical academic structure. Perfect for campus placement drives, research assistantships, publications, and enterprise software roles.",
    features: [
      "Classic serif display typography with elegant lines",
      "Dedicated sections for publications, honors, and coursework",
      "Conservative margins and traditional heading weights",
      "Universally recognized across campus placement boards",
    ],
  },
];

export default function TemplatesPage({ onPreviewPdf }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenPreview = (template) => {
    if (onPreviewPdf) {
      onPreviewPdf(template);
    } else {
      setSelectedTemplate(template);
      setModalOpen(true);
    }
  };

  return (
    <div className="space-y-8 pt-6 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Unified Page Header — Styled after the master Home hero */}
      <section
        className="relative overflow-hidden rounded-3xl text-white border border-white/15 px-6 sm:px-10 lg:px-12 py-8 sm:py-10 lg:py-12 shadow-2xl backdrop-blur-md"
        style={{
          background:
            "linear-gradient(145deg, rgba(20, 24, 48, 0.55) 0%, rgba(14, 18, 36, 0.7) 100%)",
        }}
      >
        {/* Subtle atmospheric depth glow accents matching hero */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-12 -left-12 w-96 h-96 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Top 2-Column Grid matching Home hero */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Left Column: Pill badge + Two-tone display title */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium text-[#38BDF8] bg-[#1E293B]/70 border border-white/20">
              <Sparkles size={12} className="text-[#38BDF8]" />
              <span className="uppercase tracking-wider">Career Documents Library</span>
            </div>

            <h1 className="font-hero font-extrabold text-white text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.08] tracking-[-0.03em] m-0">
              <span className="block text-white">ATS Resume </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6E56CF] via-[#818CF8] to-[#38BDF8]">
                Templates
              </span>
            </h1>
          </div>

          {/* Right Column: OVERVIEW label + description */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-2 text-left lg:border-l lg:border-white/10 lg:pl-8 lg:py-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-[#38BDF8] block mb-2">
              OVERVIEW
            </span>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed m-0 font-normal">
              Access 5 verified, single-page PDF resume templates. Designed around document typography,
              scannability, and ATS compliance rather than restrictive engineering silos.
            </p>
          </div>
        </div>

        {/* Assurance Bar inside the same frame */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-[13px]">
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-emerald-400 flex-shrink-0" />
              <span className="text-brand-slate font-medium">100% Real, Downloadable PDF Documents</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={18} className="text-brand-violet flex-shrink-0" />
              <span className="text-brand-slate font-medium">Tested for Keyword Extraction &amp; Selectable Text</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Layout size={18} className="text-brand-cyan flex-shrink-0" />
              <span className="text-brand-slate font-medium">Single-Page Recruiter Scannable Architecture</span>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid (All 5 PDFs) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {RESUME_TEMPLATES_DATA.map((template, idx) => {
          const pdfPath = `/assets/resume-templates/${template.filename}`;
          return (
            <div
              key={template.id}
              className="im-card im-card-lift p-6 sm:p-7 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-surface text-brand-cyan flex items-center justify-center font-bold font-heading border border-brand-border">
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-brand-slate m-0 group-hover:text-brand-cyan transition-colors">
                        {template.title}
                      </h3>
                      <span className="text-xs sm:text-[13px] text-brand-cyan font-semibold">
                        {template.layoutStyle}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                    ATS-Tested
                  </span>
                </div>

                <p className="text-xs sm:text-[13px] text-brand-muted leading-relaxed m-0">{template.description}</p>

                <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border">
                  <div className="text-[11px] sm:text-xs font-bold text-brand-slate uppercase tracking-wide mb-1">
                    Ideal Candidate Profile:
                  </div>
                  <div className="text-xs sm:text-[13px] text-brand-slate font-medium">{template.bestFor}</div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] sm:text-xs font-bold text-brand-slate block">
                    Layout Highlights:
                  </span>
                  <ul className="text-xs sm:text-[13px] text-brand-muted space-y-1 pl-4 m-0 list-disc">
                    {template.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons: Preview PDF, Open in New Tab, Download */}
              <div className="pt-5 mt-6 border-t border-brand-border/70 flex flex-wrap items-center justify-between gap-3">
                <div className="text-[11px] sm:text-xs text-brand-muted font-mono">{template.filename}</div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleOpenPreview(template)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-surface hover:bg-brand-violet hover:text-white text-brand-cyan text-xs sm:text-[13px] font-semibold border border-brand-border transition-all shadow-xs"
                  >
                    <Eye size={14} />
                    <span>Preview</span>
                  </button>

                  <a
                    href={pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-surface hover:bg-brand-violet hover:text-white text-brand-cyan text-xs sm:text-[13px] font-semibold border border-brand-border transition-all shadow-xs"
                  >
                    <ExternalLink size={14} />
                    <span>Open in Tab</span>
                  </a>

                  <a
                    href={pdfPath}
                    download={template.filename}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-violet hover:bg-brand-violetHover text-white text-xs sm:text-[13px] font-semibold shadow-xs transition-all"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fallback internal PDF Preview Modal Integration if onPreviewPdf not passed */}
      {!onPreviewPdf && (
        <PdfPreviewModal
          show={modalOpen}
          onHide={() => setModalOpen(false)}
          template={selectedTemplate}
        />
      )}
    </div>
  );
}
