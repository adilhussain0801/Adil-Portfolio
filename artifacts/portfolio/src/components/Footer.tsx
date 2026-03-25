import { Linkedin, Instagram, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-background border-t border-border py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Main footer content */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 mb-16">

          {/* Left: Reach out */}
          <div>
            <h2
              style={{ fontFamily: "'Wotfard', sans-serif", fontWeight: 700 }}
              className="text-3xl md:text-4xl leading-tight text-foreground mb-3"
            >
              Reach out to connect<br />or collaborate
            </h2>
            <a
              href="mailto:adilhussain0801@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors text-base"
            >
              adilhussain0801@gmail.com
            </a>
          </div>

          {/* Right: Social links */}
          <div className="flex flex-col gap-3">
            <a
              href="https://linkedin.com/in/adil0801"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base font-bold text-foreground hover:text-muted-foreground transition-colors"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href="https://instagram.com/adil0801"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base font-bold text-foreground hover:text-muted-foreground transition-colors"
            >
              <Instagram size={16} />
              Instagram
            </a>

            {/* Separator before Resume */}
            <div className="border-t border-border my-1" />

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base font-bold text-foreground hover:text-muted-foreground transition-colors"
            >
              <FileText size={16} />
              Resume
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
