import React from "react";
import { Link } from "react-router-dom";
import LogoMark from "./LogoMark";

export default function Footer({ onOpenContact }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-[#141528]/80 backdrop-blur-md border-t border-white/10 mt-auto pt-12 pb-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 4-Column Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <LogoMark className="w-8 h-8 flex-shrink-0" glow />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white leading-tight">
                  IntelliMatch
                </span>
                <span className="text-xs font-semibold text-brand-cyan">
                  Career Discovery &amp; Readiness
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#CBD5E1] m-0 max-w-sm font-sans">
              An integrated career exploration, learning roadmap, and resume intelligence platform for
              engineering students and freshers. Translate coursework into verifiable technical proficiencies.
            </p>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white mb-3">
              Platform Modules
            </h3>
            <ul className="space-y-2 list-none p-0 m-0 text-xs">
              <li>
                <Link to="/roadmaps" className="text-[#94A3B8] hover:text-brand-cyan transition-colors">
                  Domains &amp; Roadmaps
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-[#94A3B8] hover:text-brand-cyan transition-colors">
                  Projects Hub &amp; Blueprints
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-[#94A3B8] hover:text-brand-cyan transition-colors">
                  ATS Resume Templates
                </Link>
              </li>
              <li>
                <Link to="/analyzer" className="text-[#94A3B8] hover:text-brand-cyan transition-colors">
                  Resume Analyzer
                </Link>
              </li>
              <li>
                <Link to="/internships" className="text-[#94A3B8] hover:text-brand-cyan transition-colors">
                  Jobs &amp; Internships
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support and Information */}
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white mb-3">
              Support &amp; Insights
            </h3>
            <ul className="space-y-2 list-none p-0 m-0 text-xs">
              <li>
                <Link to="/dashboard" className="text-[#94A3B8] hover:text-brand-cyan transition-colors">
                  Candidate Dashboard
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-[#94A3B8] hover:text-brand-cyan transition-colors">
                  Platform Feedback
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#94A3B8] hover:text-brand-cyan transition-colors">
                  About IntelliMatch
                </Link>
              </li>
              {onOpenContact && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenContact}
                    className="text-[#94A3B8] hover:text-brand-cyan transition-colors text-left p-0 border-0 bg-transparent text-xs"
                  >
                    Contact &amp; Inquiries
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Project Declaration */}
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white mb-3">
              Project Declaration
            </h3>
            <p className="text-xs leading-relaxed text-[#CBD5E1] m-0 font-sans">
              IntelliMatch is an independently conceptualized, student-focused career discovery and readiness
              platform under active development. Some modules are interactive prototypes, while additional APIs
              and backend services are planned. Matching estimates do not guarantee ATS passage, interviews or employment.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Mandatory Developer Attribution */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8]">
          <div>
            &copy; {currentYear} Thejas K S. All rights reserved.
          </div>
          <div className="font-medium text-white">
            Developed by{" "}
            <span className="font-bold text-brand-cyan tracking-tight">Thejas K S</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
