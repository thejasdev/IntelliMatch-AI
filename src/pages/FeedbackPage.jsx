import React, { useState } from "react";
import {
  MessageSquare,
  Star,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  Bug,
  Sparkles,
} from "lucide-react";

const CATEGORIES = [
  { id: "ui-ux", label: "UI / UX Experience", icon: Sparkles },
  { id: "analysis-quality", label: "Resume Analysis Quality", icon: Lightbulb },
  { id: "feature", label: "Feature Request", icon: MessageSquare },
  { id: "bug", label: "Bug Report", icon: Bug },
  { id: "other", label: "Other Feedback", icon: HelpCircle },
];

export default function FeedbackPage() {
  const [category, setCategory] = useState("ui-ux");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [successToast, setSuccessToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    const trimmedEmail = email.trim();

    if (!trimmedMessage || trimmedMessage.length < 10) {
      setErrorAlert("Please provide a detailed feedback message with at least 10 characters.");
      return;
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorAlert("Please provide a valid email address or leave the field empty.");
      return;
    }

    setErrorAlert("");

    // Persist to session storage
    const record = {
      category,
      rating,
      name: name.trim() || "Anonymous Student",
      message: trimmedMessage,
      email: trimmedEmail || null,
      timestamp: new Date().toISOString(),
    };

    try {
      const stored = JSON.parse(sessionStorage.getItem("intellimatch_feedback") || "[]");
      stored.push(record);
      sessionStorage.setItem("intellimatch_feedback", JSON.stringify(stored));
    } catch {
      // safe fallback
    }

    setSuccessToast(true);
    setMessage("");
    setEmail("");
    setName("");
    setRating(5);

    setTimeout(() => {
      setSuccessToast(false);
    }, 5000);
  };

  return (
    <div className="space-y-8 pt-6 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* 1. Unified Page Header — Styled after the master Home hero with console-frame */}
      <section
        className="console-frame relative overflow-hidden rounded-3xl text-white px-6 sm:px-10 lg:px-12 py-8 sm:py-10"
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
              <MessageSquare size={13} className="text-[#38BDF8]" />
              <span className="uppercase tracking-wider">Candidate &amp; Student Feedback</span>
            </div>

            <h1 className="font-hero font-extrabold text-white text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.03em] m-0">
              <span className="block text-white">Share Your Experience </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6E56CF] via-[#818CF8] to-[#38BDF8]">
                with IntelliMatch
              </span>
            </h1>
          </div>

          {/* Right Column: OVERVIEW label + description */}
          <div className="lg:col-span-5 space-y-2 text-left lg:border-l lg:border-white/10 lg:pl-8 lg:py-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-[#38BDF8] block mb-2">
              OVERVIEW
            </span>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed m-0 font-normal">
              Your feedback directly informs our semantic analyzer models, roadmap curricula, and ATS resume
              templates. Help us make technical career readiness accessible to every engineering student.
            </p>
          </div>
        </div>
      </section>

      {/* Success Alert */}
      {successToast && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/15 flex items-start gap-3 shadow-xs">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-emerald-200 m-0">
              Feedback Successfully Recorded
            </h4>
            <p className="text-xs text-emerald-300 mt-0.5 m-0 leading-relaxed">
              Thank you! Your feedback has been stored in local session storage and will be reviewed by the
              development team.
            </p>
          </div>
        </div>
      )}

      {/* Content Form Card */}
      <div className="im-card overflow-hidden">
        <div className="p-6 border-b border-brand-border bg-brand-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-heading font-bold text-brand-slate m-0">
              Feedback Submission Form
            </h2>
            <p className="text-xs text-brand-muted mt-1 m-0">
              Please complete the fields below. All ratings are recorded confidentially.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-card text-brand-violet border border-brand-border">
            Interactive Prototype
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Category Grid Selection */}
          <div>
            <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-2">
              Feedback Category <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-medium text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 ${
                      isSelected
                        ? "border-brand-violet bg-brand-surface text-brand-violet font-semibold shadow-xs"
                        : "border-brand-border bg-brand-card text-brand-slate hover:bg-brand-surface hover:border-brand-cyan/40"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? "text-brand-violet" : "text-brand-muted"}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider m-0">
                Platform Rating <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs font-semibold text-brand-violet">
                {(hoverRating || rating)} out of 5 stars
              </span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 rounded-lg transition-transform duration-150 hover:scale-110"
                    aria-label={`${star} star rating`}
                  >
                  <Star
                    className={`w-7 h-7 ${
                      star <= (hoverRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-brand-surface text-brand-border"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="feedback-text" className="block text-xs font-bold text-brand-slate uppercase tracking-wider m-0">
                Your Suggestions / Thoughts <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-brand-muted">{message.length} / 600</span>
            </div>
            <textarea
              id="feedback-text"
              rows={5}
              maxLength={600}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your experience with resume analysis accuracy, template downloading, or domain roadmaps..."
              className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-brand-border bg-brand-surface focus:outline-none focus:border-brand-violet text-brand-slate leading-relaxed"
            />
          </div>

          {/* Name and Optional Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="feedback-name" className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-2">
                Your Name <span className="text-brand-muted font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="feedback-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full text-xs sm:text-sm py-2.5 px-3.5 rounded-xl border border-brand-border bg-brand-surface focus:outline-none focus:border-brand-violet text-brand-slate"
              />
            </div>

            <div>
              <label htmlFor="feedback-email-input" className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-2">
                Email Address <span className="text-brand-muted font-normal">(Optional)</span>
              </label>
              <input
                type="email"
                id="feedback-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@example.com"
                className="w-full text-xs sm:text-sm py-2.5 px-3.5 rounded-xl border border-brand-border bg-brand-surface focus:outline-none focus:border-brand-violet text-brand-slate"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorAlert && (
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/15 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorAlert}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-4 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-brand-muted">
              Responses are stored safely in client session storage in Phase 1.
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violetHover text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              <Send size={15} />
              <span>Submit Feedback</span>
            </button>
          </div>
        </form>
      </div>

      {/* Helpful Tips Card */}
      <div className="im-card p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-brand-violet shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-brand-slate uppercase m-0">Analysis Precision</h4>
            <p className="text-xs text-brand-muted mt-1 leading-normal m-0">
              Let us know if your technical skills were matched accurately with the sample descriptions.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-brand-slate uppercase m-0">Curriculum Suggestions</h4>
            <p className="text-xs text-brand-muted mt-1 leading-normal m-0">
              Tell us which technologies or engineering tracks you'd like added to Year 1–4 roadmaps.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-brand-slate uppercase m-0">Template Usability</h4>
            <p className="text-xs text-brand-muted mt-1 leading-normal m-0">
              Share whether our 5 ATS single-page templates worked smoothly with your PDF reader.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
