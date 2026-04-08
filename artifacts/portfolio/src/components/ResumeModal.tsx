import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [width, setWidth] = useState(700);

  const measureWidth = useCallback(() => {
    const w = Math.min(window.innerWidth - 80, 860);
    setWidth(w);
  }, []);

  useEffect(() => {
    measureWidth();
    window.addEventListener("resize", measureWidth);
    return () => window.removeEventListener("resize", measureWidth);
  }, [measureWidth]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setPage((p) => Math.min(p + 1, numPages));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(p - 1, 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, numPages]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (open) setPage(1);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-4xl flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "#F7F7F5", maxHeight: "92vh" }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5] flex-shrink-0">
              <span
                className="text-sm font-semibold text-[#1a1a1a]"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >Adil Hussain - Resume</span>
              <div className="flex items-center gap-3">
                <a
                  href="/resume.pdf"
                  download="Adil_Hussain_Resume.pdf"
                  className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-[#1a1a1a] text-white hover:bg-[#333] transition-colors"
                >
                  <Download size={14} />
                  Download
                </a>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#666] hover:text-[#1a1a1a] hover:bg-[#eee] transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* PDF viewer */}
            <div className="flex-1 overflow-y-auto flex flex-col items-center py-6 px-4 gap-4">
              <Document
                file="/resume.pdf"
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading={
                  <div className="flex items-center justify-center h-64 text-[#999] text-sm">
                    Loading…
                  </div>
                }
              >
                <Page
                  pageNumber={page}
                  width={width}
                  renderAnnotationLayer
                  renderTextLayer
                />
              </Document>
            </div>

            {/* Footer pagination */}
            {numPages > 1 && (
              <div className="flex items-center justify-center gap-4 py-4 border-t border-[#e5e5e5] flex-shrink-0">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#666] hover:text-[#1a1a1a] hover:bg-[#eee] transition-colors disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-[#666]">
                  {page} / {numPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, numPages))}
                  disabled={page === numPages}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#666] hover:text-[#1a1a1a] hover:bg-[#eee] transition-colors disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
