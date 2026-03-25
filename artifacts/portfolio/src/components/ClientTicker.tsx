import React from "react";

const CLIENTS = [
  {
    name: "Atlassian",
    logo: "https://logo.clearbit.com/atlassian.com",
    domain: "atlassian.com",
  },
  {
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    domain: "amazon.com",
  },
  {
    name: "Shell",
    logo: "https://logo.clearbit.com/shell.com",
    domain: "shell.com",
  },
  {
    name: "Petronas",
    logo: "https://logo.clearbit.com/petronas.com",
    domain: "petronas.com",
  },
  {
    name: "Suncor",
    logo: "https://logo.clearbit.com/suncor.com",
    domain: "suncor.com",
  },
  {
    name: "DP World",
    logo: "https://logo.clearbit.com/dpworld.com",
    domain: "dpworld.com",
  },
  {
    name: "Accenture",
    logo: "https://logo.clearbit.com/accenture.com",
    domain: "accenture.com",
  },
  {
    name: "Armed Forces",
    logo: null,
    domain: null,
  },
  {
    name: "Statoil Fuel & Retail",
    logo: "https://logo.clearbit.com/statoil.com",
    domain: "statoil.com",
  },
  {
    name: "Absa Bank",
    logo: "https://logo.clearbit.com/absa.co.za",
    domain: "absa.co.za",
  },
];

function ArmedForcesIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2L20 8H28L22 13L24 21L16 16L8 21L10 13L4 8H12L16 2Z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function ClientItem({ client }: { client: typeof CLIENTS[0] }) {
  const [imageLoaded, setImageLoaded] = React.useState(true);

  return (
    <div className="flex items-center justify-center shrink-0 px-5 group">
      {client.logo && imageLoaded ? (
        <img
          src={client.logo}
          alt={client.name}
          className="h-8 w-auto max-w-[120px] object-contain grayscale opacity-65 group-hover:opacity-100 transition-opacity duration-300"
          title={client.name}
          onError={() => setImageLoaded(false)}
        />
      ) : (
        <span className="text-sm font-medium text-foreground/65 group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
          {client.name}
        </span>
      )}
    </div>
  );
}

function Separator() {
  return (
    <span className="shrink-0 text-foreground/10 mx-5 text-lg select-none">•</span>
  );
}

export default function ClientTicker() {
  const items = CLIENTS;

  return (
    <section id="clients" className="py-24 md:py-32 px-6 md:px-12 bg-secondary/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="w-full md:w-1/3">
          <h2 className="text-3xl md:text-4xl font-wotfard font-bold text-foreground sticky top-32">
            I've designed for
          </h2>
        </div>

        <div className="w-full md:w-2/3">
          <div 
            className="overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            <div className="flex ticker-track">
              {[...items, ...items, ...items].map((client, i) => (
                <span key={i} className="flex items-center">
                  <ClientItem client={client} />
                  <Separator />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
