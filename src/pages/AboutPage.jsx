import React from "react";
import { Link } from "react-router-dom";
import {
  Info,
  Compass,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Code2,
  Server,
  Cpu,
} from "lucide-react";
import { ENGINEERING_DOMAINS } from "../../data/jobRoles.js";
import LogoMark from "../components/LogoMark.jsx";

export default function AboutPage({ onOpenContact }) {
  return (
    <div className="space-y-8 sm:space-y-10 pt-6 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* 1. Unified Page Header — Styled after the master Home hero */}
      <section
        className="relative overflow-hidden rounded-3xl text-white border border-white/15 px-6 sm:px-10 lg:px-12 py-8 sm:py-10 shadow-2xl backdrop-blur-md"
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

        {/* 2-Column Grid matching Home hero */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-center">
          {/* Left Column: Pill badge + Two-tone display title */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium text-[#38BDF8] bg-[#1E293B]/70 border border-white/20">
              <Info size={13} className="text-[#38BDF8]" />
              <span className="uppercase tracking-wider">Platform Overview &amp; Mission</span>
            </div>

            <h1 className="font-hero font-extrabold text-white text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.08] tracking-[-0.03em] m-0">
              <span className="block text-white">About </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6E56CF] via-[#818CF8] to-[#38BDF8]">
                IntelliMatch
              </span>
            </h1>
          </div>

          {/* Right Column: OVERVIEW label + description */}
          <div className="lg:col-span-5 space-y-2 text-left lg:border-l lg:border-white/10 lg:pl-8 lg:py-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-[#38BDF8] block mb-2">
              OVERVIEW
            </span>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed m-0 font-normal">
              AI-Powered Career Discovery &amp; Readiness Platform &mdash; empowering engineering students, freshers,
              and tech professionals with multi-domain curricula, ATS resume intelligence, and downloadable PDF templates.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Target Audience */}
      <div className="im-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-brand-surface text-brand-violet flex items-center justify-center border border-brand-border flex-shrink-0">
            <Compass size={22} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-brand-slate m-0">
              Mission, Purpose &amp; Impact
            </h2>
            <span className="text-xs text-brand-muted">Bridging academic study and industry talent acquisition</span>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-brand-muted font-sans leading-relaxed">
          <p className="m-0">
            Modern hiring processes rely heavily on automated Applicant Tracking Systems (ATS) and algorithmic keyword matching.
            For thousands of ambitious engineering students and freshers, the recruitment barrier is rarely a lack of talent or passion—it is the challenge of accurately structuring their accomplishments into industry-recognized technical vocabularies.
          </p>
          <p className="m-0">
            <strong className="text-brand-slate">IntelliMatch</strong> was engineered to solve this information asymmetry. By directly comparing candidate resumes against live job descriptions, analyzing skill gaps across 10 specialized technology domains, and providing structured Year 1–4 roadmaps, IntelliMatch turns career readiness into a verifiable, step-by-step engineering discipline.
          </p>
        </div>

        <div className="pt-6 border-t border-brand-border grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
            <h4 className="text-xs font-bold text-brand-slate uppercase tracking-wider mb-1.5 flex items-center gap-2 m-0">
              <CheckCircle2 size={16} className="text-brand-violet" />
              Engineering Students
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed m-0 mt-1">
              Translate coursework, academic projects, and open-source contributions into ATS-optimized bullet points that hiring algorithms understand.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
            <h4 className="text-xs font-bold text-brand-slate uppercase tracking-wider mb-1.5 flex items-center gap-2 m-0">
              <CheckCircle2 size={16} className="text-brand-cyan" />
              Transitioning Engineers
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed m-0 mt-1">
              Identify transferable proficiencies and close missing credential gaps when pivoting into Cloud, DevOps, AI/ML, or Cybersecurity tracks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
            <h4 className="text-xs font-bold text-brand-slate uppercase tracking-wider mb-1.5 flex items-center gap-2 m-0">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Early-Career Freshers
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed m-0 mt-1">
              Access 5 genuine, downloadable single-page resume PDFs and direct internship application pipelines to land their first high-impact job.
            </p>
          </div>
        </div>
      </div>

      {/* 10 Supported Domains Catalogue */}
      <div className="im-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-brand-slate m-0">
              10 Supported Technology Domains
            </h2>
            <p className="text-xs text-brand-muted mt-1 m-0">
              A centralized ontology mapping 40+ specialized career trajectories
            </p>
          </div>
          <Link
            to="/roadmaps"
            className="text-xs font-semibold text-brand-violet hover:underline flex items-center gap-1"
          >
            <span>Explore All Roadmaps</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {ENGINEERING_DOMAINS.map((domain, idx) => (
            <div
              key={domain.id}
              className="p-3.5 rounded-xl border border-brand-border bg-brand-surface hover:border-brand-cyan/40 im-card-lift transition-all"
            >
              <span className="text-[10px] font-bold text-brand-violet uppercase tracking-wider block">
                Track {idx + 1}
              </span>
              <span className="text-xs font-bold text-brand-slate block mt-1 line-clamp-1">
                {domain.name}
              </span>
              <span className="text-[11px] text-brand-muted mt-1 block">
                {domain.roles.length} Specialized Roles
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3-Phase Architecture Roadmap */}
      <div className="im-card p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-brand-slate m-0">
            Technical Architecture &amp; Phased Roadmap
          </h2>
          <p className="text-xs text-brand-muted mt-1 m-0">
            A decoupled, modern architecture balancing client performance and ML inference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl border border-brand-border bg-brand-surface space-y-2 im-card-lift transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Phase 1: Live Frontend
              </span>
              <Code2 size={18} className="text-brand-violet" />
            </div>
            <h4 className="text-sm font-bold text-brand-slate m-0">React + Vite + Tailwind SPA</h4>
            <p className="text-xs text-brand-muted leading-relaxed m-0">
              Modern client-side application built with React 19, Tailwind CSS design tokens, and interactive ATS simulation engines running at 60 FPS in browser memory.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-brand-border bg-brand-surface space-y-2 im-card-lift transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/15 text-blue-300 border border-blue-500/30">
                Phase 2: Microservice
              </span>
              <Server size={18} className="text-brand-cyan" />
            </div>
            <h4 className="text-sm font-bold text-brand-slate m-0">FastAPI &amp; Text Extraction</h4>
            <p className="text-xs text-brand-muted leading-relaxed m-0">
              Python FastAPI microservice utilizing PyMuPDF and python-docx for deep document parsing, lexical entity recognition, and real-time integration with job portal API feeds.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-brand-border bg-brand-surface space-y-2 im-card-lift transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/15 text-purple-300 border border-purple-500/30">
                Phase 3: Deep NLP
              </span>
              <Cpu size={18} className="text-brand-violet" />
            </div>
            <h4 className="text-sm font-bold text-brand-slate m-0">Transformer Embeddings</h4>
            <p className="text-xs text-brand-muted leading-relaxed m-0">
              Fine-tuned Sentence-Transformers computing high-dimensional cosine similarity to evaluate semantic context, project depth, and implicit engineering competence beyond exact keyword hits.
            </p>
          </div>
        </div>
      </div>

      {/* Developer Attribution & Verification Card */}
      <div className="im-card p-6 sm:p-8 border-2 border-brand-violet/30 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-violet text-white flex items-center justify-center shadow-lg shadow-brand-violet/30 flex-shrink-0">
              <LogoMark size={40} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-violet">
                Principal Engineering &amp; UI Architecture
              </span>
              <h3 className="text-2xl font-heading font-bold text-brand-slate mt-0.5 m-0">
                Thejas K S
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-brand-muted mt-1">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin size={13} className="text-brand-violet" />
                  Bengaluru, Karnataka, India
                </span>
                <span>&bull;</span>
                <span>Full-Stack &amp; AI Product Engineering</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenContact}
              className="px-5 py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violetHover text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              Get in Touch
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-brand-border text-xs text-brand-muted leading-relaxed m-0">
          <p className="m-0">
            IntelliMatch was designed and implemented by <strong className="text-brand-slate">Thejas K S</strong> as a comprehensive career discovery and readiness platform. All branding vectors, typography hierarchies, multi-domain curricula, and interactive scoring algorithms have been crafted to the highest portfolio and production standards.
          </p>
        </div>
      </div>

      {/* Honest Limitations & Disclaimers */}
      <div className="im-card p-6 border-l-4 border-l-amber-500 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-400" />
          <h3 className="text-base font-heading font-bold text-brand-slate m-0">
            Current Prototype Scope &amp; Educational Disclaimers
          </h3>
        </div>
        <ul className="space-y-2 text-xs text-brand-muted list-disc pl-5 leading-relaxed m-0">
          <li>
            <strong className="text-brand-slate">Educational Guidance:</strong> Match percentages, keyword detections, and suggested edits are guidance tools designed to improve preparation and do not guarantee an interview or offer from any specific employer.
          </li>
          <li>
            <strong className="text-brand-slate">Client-Side Evaluation:</strong> In Phase 1, document processing, text parsing, and scoring simulations run within the client's local browser sandbox.
          </li>
          <li>
            <strong className="text-brand-slate">External Portals:</strong> Internship listings redirect users to verified external career boards (LinkedIn, Internshala, Naukri) to ensure direct, safe application pathways.
          </li>
        </ul>
      </div>
    </div>
  );
}
