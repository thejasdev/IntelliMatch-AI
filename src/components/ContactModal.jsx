import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { X, Send, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";

export default function ContactModal({ show, isOpen, onHide, onClose }) {
  const visible = show !== undefined ? show : isOpen;
  const handleClose = onHide || onClose;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "roadmaps",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", topic: "roadmaps", message: "" });
      handleClose?.();
    }, 2200);
  };

  return (
    <Modal
      show={visible}
      onHide={handleClose}
      centered
      dialogClassName="max-w-lg"
      contentClassName="border-0 rounded-2xl shadow-dropdown overflow-hidden bg-brand-card text-brand-slate"
    >
      <div className="flex items-center justify-between px-6 py-4 bg-brand-surface border-b border-brand-border">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-violet">
            Admissions &amp; Support
          </span>
          <h2 className="text-lg font-bold font-heading text-brand-slate m-0">
            Contact IntelliMatch
          </h2>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-muted hover:text-brand-slate hover:bg-brand-card transition-colors focus:outline-none"
          aria-label="Close contact dialog"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-6">
        {/* Quick contact details pill strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 mb-5 rounded-xl bg-brand-surface border border-brand-border text-xs text-brand-slate">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-brand-violet flex-shrink-0" />
            <a href="tel:+9108028394567" className="hover:text-brand-violet font-medium text-brand-slate">
              +91 (080) 2839-4567
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-brand-cyan flex-shrink-0" />
            <a href="mailto:contact@intellimatch.ai" className="hover:text-brand-violet font-medium text-brand-slate">
              contact@intellimatch.ai
            </a>
          </div>
        </div>

        {submitted ? (
          <div className="p-6 text-center flex flex-col items-center justify-center bg-emerald-500/15 rounded-xl border border-emerald-500/30">
            <CheckCircle2 size={36} className="text-emerald-400 mb-2 animate-bounce" />
            <h3 className="font-heading font-bold text-base text-emerald-200 m-0">
              Message Received
            </h3>
            <p className="text-xs text-emerald-300 mt-1 m-0">
              Thank you, {formData.name}! Our team in Bengaluru will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Morgan"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-brand-border bg-brand-surface text-brand-slate placeholder:text-brand-muted focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. alex.morgan@college.edu"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-brand-border bg-brand-surface text-brand-slate placeholder:text-brand-muted focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1.5">
                Inquiry Topic
              </label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-brand-border bg-brand-surface text-brand-slate focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 transition-all"
              >
                <option value="roadmaps">Engineering Curriculum &amp; Roadmaps</option>
                <option value="analyzer">Resume Analyzer &amp; ATS Scoring</option>
                <option value="projects">Projects Hub &amp; Blueprints</option>
                <option value="templates">Resume PDF Templates</option>
                <option value="internships">Internship &amp; Job Search</option>
                <option value="general">General Inquiries</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1.5">
                Message / Question
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we assist your engineering readiness journey?"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-brand-border bg-brand-surface text-brand-slate placeholder:text-brand-muted focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-brand-violet hover:bg-brand-violetHover text-white text-sm font-semibold shadow-xs flex items-center justify-center gap-2 transition-all duration-150"
            >
              <Send size={15} />
              <span>Send Inquiry</span>
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
