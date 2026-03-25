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
    <div className="flex items-center justify-center shrink-0 px-4 group">
      {client.logo && imageLoaded ? (
        <img
          src={client.logo}
          alt={client.name}
          className="h-8 w-auto max-w-[120px] object-contain grayscale opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          title={client.name}
          onError={() => setImageLoaded(false)}
        />
      ) : (
        <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
          {client.name}
        </span>
      )}
    </div>
  );
}

function Separator() {
  return (
    <span className="shrink-0 text-foreground/15 mx-6 text-lg select-none">•</span>
  );
}

export default function ClientTicker() {
  const items = CLIENTS;

  return (
    <div className="w-full border-t border-b border-border py-8 overflow-hidden relative bg-background">
      <p className="absolute top-0 left-6 md:left-12 -translate-y-1/2 text-xs uppercase tracking-widest text-muted-foreground bg-background px-2 font-medium">
        I've designed for
      </p>

      <div className="flex ticker-track">
        {[...items, ...items, ...items].map((client, i) => (
          <span key={i} className="flex items-center">
            <ClientItem client={client} />
            <Separator />
          </span>
        ))}
      </div>
    </div>
  );
}
