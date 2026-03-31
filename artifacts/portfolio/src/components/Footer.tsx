import { useState } from "react";
import { Linkedin, Instagram, FileText } from "lucide-react";
import ResumeModal from "./ResumeModal";

export default function Footer() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      <footer id="contact" className="border-t border-border py-20 md:py-28 px-6 md:px-24 mt-8 border-t-[#d4d4d4] border-r-[#d4d4d4] border-b-[#d4d4d4] border-l-[#d4d4d4]" style={{ background: "#FAF8F5" }}>
        <div>

          {/* Main footer content */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 mb-16">

            {/* Left: Reach out */}
            <div>
              <h2
                style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
                className="text-3xl md:text-4xl leading-tight text-foreground mb-1"
              >
                Reach out to connect<br />or collaborate
              </h2>
              <a
                href="mailto:adilhussain0801@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors text-xl md:text-[36px] font-black break-all"
              >
                adilhussain0801@gmail.com
              </a>
            </div>

            {/* Right: Social links */}
            <div className="flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/in/adil0801/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base font-bold text-foreground hover:text-muted-foreground transition-colors"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/adil0801/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base font-bold text-foreground hover:text-muted-foreground transition-colors"
              >
                <Instagram size={16} />
                Instagram
              </a>

              {/* Separator before Resume */}
              <div className="border-t border-border my-8" />

              <button
                onClick={() => setResumeOpen(true)}
                className="flex items-center gap-2 text-base font-bold text-foreground hover:text-muted-foreground transition-colors"
              >
                <FileText size={16} />
                Resume
              </button>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
