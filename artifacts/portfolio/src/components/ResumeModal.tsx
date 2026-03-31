import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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
            className="relative z-10 w-full max-w-4xl h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "#FAF8F5" }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5] flex-shrink-0">
              <span
                className="text-sm font-semibold text-[#1a1a1a]"
                style={{ fontFamily: "'Wotfard', sans-serif" }}
              >
                Adil Hussain — Resume
              </span>
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

            {/* PDF iframe */}
            <iframe
              src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
              className="flex-1 w-full"
              title="Resume"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
