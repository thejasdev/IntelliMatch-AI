import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Layout Components
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ContactModal from "./components/ContactModal.jsx";
import PdfPreviewModal from "./components/PdfPreviewModal.jsx";
import AmbientWaveBackground from "./components/AmbientWaveBackground.jsx";

// Page Views
import HomePage from "./pages/HomePage.jsx";
import RoadmapsPage from "./pages/RoadmapsPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import TemplatesPage from "./pages/TemplatesPage.jsx";
import AnalyzerPage from "./pages/AnalyzerPage.jsx";
import InternshipsPage from "./pages/InternshipsPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

// Helper component to scroll to top on route change without breaking anchors
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If navigating to an anchor on the page (e.g. #domains), let native anchor link scroll to element
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    // On standard page route navigation, reset window scroll position immediately
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  // Global Modals states
  const [contactOpen, setContactOpen] = useState(false);
  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    file: null,
    title: "",
    badge: "",
    isAvailable: true,
    description: "",
  });

  const handleOpenContact = () => {
    setContactOpen(true);
  };

  const handleCloseContact = () => {
    setContactOpen(false);
  };

  const handleOpenPdfPreview = (item) => {
    if (!item) return;
    setPreviewModal({
      isOpen: true,
      file: item.file || (item.filename ? `/assets/resume-templates/${item.filename}` : null),
      title: item.title || item.name || "Document Preview",
      badge: item.badge || (item.layoutStyle ? "ATS Template" : "PDF Guide"),
      isAvailable: item.isAvailable !== undefined ? item.isAvailable : !!(item.file || item.filename),
      description: item.description || "",
    });
  };

  const handleClosePdfPreview = () => {
    setPreviewModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen text-white bg-transparent font-sans antialiased selection:bg-brand-cyan/20 selection:text-brand-cyan relative">
      {/* 1. Global Persistent Midnight Navy Motion-Graphics Video Layer */}
      <AmbientWaveBackground />

      {/* 2. Scroll-to-top Manager */}
      <ScrollToTop />

      {/* 3. Main Full-Viewport Layout (Desktop Sidebar Removed, Top Navbar Replaced) */}
      <div className="min-h-screen flex flex-col min-w-0 w-full bg-transparent">
        {/* Full-Width Institutional Top Navigation Bar */}
        <Header onOpenContact={handleOpenContact} />

        {/* Dynamic Route Outlet */}
        <main className="flex-1 w-full bg-transparent relative z-10">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onOpenContact={handleOpenContact}
                  onPreviewPdf={handleOpenPdfPreview}
                />
              }
            />
            <Route
              path="/roadmaps"
              element={<RoadmapsPage onPreviewPdf={handleOpenPdfPreview} />}
            />
            <Route
              path="/projects"
              element={<ProjectsPage onPreviewPdf={handleOpenPdfPreview} />}
            />
            <Route
              path="/templates"
              element={<TemplatesPage onPreviewPdf={handleOpenPdfPreview} />}
            />
            <Route path="/analyzer" element={<AnalyzerPage />} />
            <Route path="/internships" element={<InternshipsPage />} />
            <Route
              path="/dashboard"
              element={<DashboardPage onOpenContact={handleOpenContact} />}
            />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route
              path="/about"
              element={<AboutPage onOpenContact={handleOpenContact} />}
            />
            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Master Declaration Footer */}
        <Footer onOpenContact={handleOpenContact} />
      </div>

      {/* Global Quick Contact Dialog */}
      <ContactModal isOpen={contactOpen} onClose={handleCloseContact} />

      {/* Global Responsive PDF Preview Modal */}
      <PdfPreviewModal
        isOpen={previewModal.isOpen}
        onClose={handleClosePdfPreview}
        file={previewModal.file}
        title={previewModal.title}
        badge={previewModal.badge}
        isAvailable={previewModal.isAvailable}
        description={previewModal.description}
      />
    </div>
  );
}
