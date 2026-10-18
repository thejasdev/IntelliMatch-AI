import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ExternalLink, Download, X, CheckCircle, FileText, AlertCircle, Clock } from "lucide-react";

export default function PdfPreviewModal({
  show,
  isOpen,
  onHide,
  onClose,
  template,
  file,
  title,
  badge,
  isAvailable = true,
  description,
}) {
  const visible = show !== undefined ? show : isOpen;
  const handleClose = onHide || onClose;

  // Resolve target file path and title
  const resolvedFilename = template?.filename || (typeof file === "string" ? file.split("/").pop() : "document.pdf");
  const resolvedTitle = title || template?.title || template?.name || "Document Preview";
  const resolvedBadge = badge || (template?.layoutStyle ? "ATS Template" : "PDF Guide");

  let resolvedUrl = "";
  if (typeof file === "string") {
    resolvedUrl = file;
  } else if (template?.filename) {
    resolvedUrl = `/assets/resume-templates/${template.filename}`;
  } else if (template?.file) {
    resolvedUrl = template.file;
  }

  // Ensure absolute path from root
  if (resolvedUrl && !resolvedUrl.startsWith("http") && !resolvedUrl.startsWith("/")) {
    resolvedUrl = `/${resolvedUrl}`;
  }

  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      setHasError(false);
      setLoading(true);
    }
  }, [visible, resolvedUrl]);

  if (!visible) return null;

  return (
    <Modal
      show={visible}
      onHide={handleClose}
      centered
      dialogClassName="my-3 max-w-[min(92vw,1080px)]"
      contentClassName="border-0 rounded-2xl shadow-dropdown overflow-hidden bg-brand-card flex flex-col h-[88vh]"
    >
      {/* Fixed Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3.5 bg-brand-surface border-b border-brand-border/80">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-brand-violet/20 text-brand-periwinkle border border-brand-violet/30 flex items-center justify-center flex-shrink-0">
            <FileText size={20} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold font-heading text-brand-ink m-0 truncate">
                {resolvedTitle}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-violet/10 text-brand-violet border border-brand-violet/20">
                <CheckCircle size={11} /> {resolvedBadge}
              </span>
            </div>
            {description && (
              <p className="text-xs text-brand-muted m-0 truncate max-w-xl">{description}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-muted hover:text-brand-ink hover:bg-brand-card border border-transparent hover:border-brand-border transition-colors focus:outline-none flex-shrink-0"
          aria-label="Close PDF preview"
        >
          <X size={18} />
        </button>
      </div>

      {/* Main Full-Height Viewer Container */}
      <div className="flex-1 min-h-0 w-full relative bg-[#323639] flex flex-col">
        {!isAvailable ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-brand-card">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/15 text-amber-300 flex items-center justify-center mb-4 border border-amber-500/30">
              <Clock size={32} />
            </div>
            <h3 className="text-lg font-bold font-heading text-brand-ink m-0 mb-2">
              Official PDF Guide in Preparation
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted max-w-md leading-relaxed m-0 mb-6">
              The downloadable handbook PDF for <strong>{resolvedTitle}</strong> is currently being finalized.
              All interactive roadmap milestones and project blueprints remain fully accessible in the platform.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-brand-violet text-white hover:bg-brand-violetHover transition-colors shadow-xs"
            >
              Continue Exploring Web Guide
            </button>
          </div>
        ) : (
          <iframe
            src={`${resolvedUrl}#toolbar=1&navpanes=0`}
            title={`${resolvedTitle} PDF Preview`}
            className="w-full h-full border-0"
            style={{ width: "100%", height: "100%", display: "block" }}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setHasError(true);
            }}
          />
        )}
      </div>

      {/* Fixed Footer */}
      <div className="flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-3 bg-brand-surface border-t border-brand-border/80 text-xs">
        <div className="text-brand-muted truncate">
          <span className="font-semibold text-brand-slate">Document:</span> {resolvedFilename} &bull;{" "}
          <span>Single-page vector layout with selectable text</span>
        </div>

        {isAvailable && (
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <a
              href={resolvedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-border bg-brand-card text-brand-slate hover:text-brand-violet hover:border-brand-violet/40 text-xs font-medium transition-colors shadow-xs"
            >
              <ExternalLink size={13} />
              <span>Open in New Tab</span>
            </a>

            <a
              href={resolvedUrl}
              download={resolvedFilename}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-violet text-white hover:bg-brand-violetHover text-xs font-semibold shadow-xs transition-colors"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
}
