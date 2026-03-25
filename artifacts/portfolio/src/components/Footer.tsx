import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-foreground text-background py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 mb-24">
          
          <div>
            <h2 className="text-5xl md:text-8xl font-serif tracking-tight mb-8">
              Let's build <br />
              <span className="italic text-background/80">together.</span>
            </h2>
            <p className="text-background/60 font-sans max-w-sm text-lg font-light">
              Available for leadership roles, advisory, and select freelance opportunities.
            </p>
          </div>

          <div className="flex flex-col md:items-end justify-end space-y-8 text-lg font-sans">
            <div>
              <p className="text-background/50 text-sm mb-1 uppercase tracking-wider">Email</p>
              <a 
                href="mailto:adilhussain0801@gmail.com" 
                className="hover:italic transition-all group flex items-center gap-2"
              >
                adilhussain0801@gmail.com
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
            <div>
              <p className="text-background/50 text-sm mb-1 uppercase tracking-wider">Phone</p>
              <a 
                href="tel:+919619793585" 
                className="hover:italic transition-all"
              >
                +91 9619 79 3585
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-sm font-sans text-background/50">
          <p>© {currentYear} Adil Hussain. All rights reserved.</p>
          
          <div className="flex gap-8">
            <a 
              href="https://linkedin.com/in/adil0801" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-background transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://dribbble.com/adil0801" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-background transition-colors"
            >
              Dribbble
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
