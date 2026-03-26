export interface Metric {
  label: string;
  value: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface SolutionFeature {
  title: string;
  description: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  category: string;
  company: string;
  year: string;
  role: string;
  platform: string;
  timeline: string;
  heroColor: string;
  image: string;
  imageAlt: string;
  overview: string;
  metrics: Metric[];
  challenge: {
    text: string;
    bullets: string[];
  };
  process: ProcessStep[];
  solution: {
    title: string;
    description: string;
    features: SolutionFeature[];
  };
  impact: Array<Metric & { description: string }>;
  nextProjectId: number;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    title: "Project Carrara",
    category: "Amazon Post-Purchase",
    company: "Amazon",
    year: "2021",
    role: "User Experience Designer",
    platform: "Web · Mobile Web",
    timeline: "Feb 2019 – Jul 2021",
    heroColor: "#D4C5F9",
    image: "/project-amazon-orders.png",
    imageAlt: "Amazon post-purchase experience redesign",
    overview:
      "Led a cross-functional redesign of Amazon India's post-purchase support experience — from order tracking to seller communication — reducing contact rates and dramatically improving resolution speed.",
    metrics: [{ label: "SUCCESS RATE", value: "65.2%" }],
    challenge: {
      text:
        "Amazon India's post-purchase support was fragmented across disconnected touchpoints. Customers navigating order issues, returns, or seller disputes had to jump between Help, Your Orders, Contact Us, and Message Center — often without resolution. The support volume was growing and satisfaction scores were declining.",
      bullets: [
        "High support ticket volumes driven by customers unable to self-serve",
        "Fragmented UX across Contact Us, Your Orders, and Message Center",
        "No proactive issue surfacing — customers discovered problems only after contact",
        "India-specific nuances (COD orders, regional language needs) were unaddressed",
      ],
    },
    process: [
      {
        number: "01",
        title: "Deep User Research",
        description:
          "Conducted contextual research across 8 Indian cities, uncovering unique pain points in order tracking, seller communication, and COD return flows that differed significantly from global patterns.",
      },
      {
        number: "02",
        title: "Journey Mapping",
        description:
          "Mapped 14 end-to-end support journeys across order types and issue categories. Identified three critical failure points where customers abandoned self-serve and escalated to agents.",
      },
      {
        number: "03",
        title: "Self-Serve Redesign",
        description:
          "Prototyped intelligent self-serve flows with dynamic FAQ systems, proactive issue surfacing, and resolution-focused order status pages. Iterated through three rounds of usability testing.",
      },
      {
        number: "04",
        title: "A/B Testing at Scale",
        description:
          "Validated designs through A/B experiments with 2M+ users, measuring contact rate, resolution time, and CSAT. Iterated based on data before global rollout.",
      },
    ],
    solution: {
      title: "A unified, proactive support experience",
      description:
        "Redesigned the full post-purchase stack — Order status pages now surface issues before customers encounter them. Contact Us intelligently routes based on order type and issue context. Message Center provides threaded, real-time seller communication.",
      features: [
        {
          title: "Proactive issue detection",
          description:
            "Partnered with data science to embed predictive models into order status pages — surfacing delays, fraud flags, and return eligibility before customers need to ask.",
        },
        {
          title: "Smart routing in Contact Us",
          description:
            "Dynamic issue flows replaced static FAQ trees, reducing average time-to-resolution by 42% by routing customers directly to the right resolution path.",
        },
        {
          title: "Unified Message Center",
          description:
            "Redesigned seller communication into a threaded inbox with read receipts, structured dispute flows, and automated status updates — eliminating duplicate contacts.",
        },
      ],
    },
    impact: [
      {
        value: "65.2%",
        label: "Self-serve success",
        description: "Customers resolving issues without agent contact",
      },
      {
        value: "42%",
        label: "Faster resolution",
        description: "Reduction in mean time to resolution",
      },
      {
        value: "32%",
        label: "Fewer tickets",
        description: "Reduction in total support volume",
      },
    ],
    nextProjectId: 2,
  },
  {
    id: 2,
    title: "Foresight",
    category: "Native iOS/Android",
    company: "Amazon",
    year: "2021",
    role: "User Experience Designer",
    platform: "iOS · Android",
    timeline: "Feb 2019 – Jul 2021",
    heroColor: "#B8D8C8",
    image: "/project-iot-platform.png",
    imageAlt: "Foresight mobile app design",
    overview:
      "Designed an AI-powered mobile support automation system for Amazon India — enabling customers to predict, prevent, and resolve delivery and order issues before they escalate.",
    metrics: [
      { label: "ADOPTION", value: "89%" },
      { label: "MONTHLY ACTIONS", value: "1.5M" },
    ],
    challenge: {
      text:
        "Amazon's mobile app was reactive — customers discovered problems only after they occurred. Support interactions required agent involvement for issues that could be resolved autonomously. The mobile channel was underutilised for proactive engagement, despite being the primary touchpoint for Indian customers.",
      bullets: [
        "No predictive capability to flag delivery risks or order anomalies",
        "High agent dependency for issues solvable through self-serve automation",
        "Mobile experience felt like a scaled-down web page, not a native-first product",
        "Customer satisfaction dropped sharply for orders with multiple touchpoints",
      ],
    },
    process: [
      {
        number: "01",
        title: "Behavioural Analysis",
        description:
          "Analysed 6 months of support ticket data alongside in-app behaviour logs to identify issue patterns by order type, pin code, and delivery partner — revealing predictable failure windows.",
      },
      {
        number: "02",
        title: "AI Integration Design",
        description:
          "Worked with the data science team to design UX patterns for surfacing model outputs — including confidence thresholds, explainability, and graceful fallback when predictions were uncertain.",
      },
      {
        number: "03",
        title: "Native Mobile Prototyping",
        description:
          "Designed high-fidelity iOS and Android prototypes with gesture-driven interactions, inline resolution flows, and push notification strategies tested across device sizes and network conditions.",
      },
      {
        number: "04",
        title: "Phased Rollout & Iteration",
        description:
          "Launched to 5% of users, monitored adoption and resolution rates, then iterated on copy, notification timing, and action sequencing before scaling to full traffic.",
      },
    ],
    solution: {
      title: "AI automation that feels like intuition",
      description:
        "Foresight is a proactive intelligence layer embedded in the Amazon mobile app — surfacing likely issues, offering one-tap resolutions, and closing the loop without agent involvement.",
      features: [
        {
          title: "Predictive issue cards",
          description:
            "Smart cards surface predicted delays, availability risks, or return windows before customers notice — giving them agency to act early with a single tap.",
        },
        {
          title: "One-tap resolution flows",
          description:
            "Common resolutions (reschedule delivery, initiate return, contact seller) are distilled into single-action flows with auto-filled context — no form filling, no navigation.",
        },
        {
          title: "Notification intelligence",
          description:
            "Push notifications are timed and personalised using order state and historical behaviour, driving high-intent open rates and reducing notification fatigue.",
        },
      ],
    },
    impact: [
      {
        value: "89%",
        label: "Feature adoption",
        description: "Users engaging with predictive recommendations",
      },
      {
        value: "1.5M",
        label: "Monthly actions",
        description: "Self-serve resolutions per month at peak",
      },
      {
        value: "18%",
        label: "First-contact resolution",
        description: "Increase in first-contact resolution rate",
      },
    ],
    nextProjectId: 3,
  },
  {
    id: 3,
    title: "Improve Trust in Marketplace Apps",
    category: "Growth & Optimization",
    company: "Atlassian",
    year: "2023",
    role: "Senior Product Designer",
    platform: "Web App · Marketplace",
    timeline: "Aug 2021 – Present",
    heroColor: "#F9C5C5",
    image: "/project-design-system.png",
    imageAlt: "Atlassian Marketplace trust and transparency features",
    overview:
      "Designed transparency and trust features for the Atlassian Marketplace that surfaced security certifications, privacy details, and compliance status — converting hesitant enterprise buyers into confident installers.",
    metrics: [
      { label: "FEWER TICKETS", value: "67%" },
      { label: "FEWER DETRACTORS", value: "16%" },
    ],
    challenge: {
      text:
        "Enterprise security teams were blocking Atlassian Marketplace app installs due to insufficient visibility into third-party apps' security posture. Security-conscious buyers had no clear way to evaluate compliance, data handling, or vendor credibility — causing significant drop-off at the install step and increasing support burden for both Atlassian and partners.",
      bullets: [
        "No standardised security or compliance information on app listings",
        "Enterprise buyers lacked tools to evaluate apps against internal security policies",
        "High volume of pre-install support tickets driven by trust uncertainty",
        "Partner satisfaction declining as deals stalled on security review",
      ],
    },
    process: [
      {
        number: "01",
        title: "Trust Audit",
        description:
          "Reviewed 200+ enterprise support tickets and interviewed 12 security administrators to map the exact questions buyers needed answered before approving an install. Identified four trust dimensions: security, compliance, privacy, and vendor credibility.",
      },
      {
        number: "02",
        title: "Partner Research",
        description:
          "Worked with 8 top marketplace partners to understand what certification data they could provide, how it was structured, and what was technically feasible to surface in real-time vs. static badges.",
      },
      {
        number: "03",
        title: "Transparency Design System",
        description:
          "Designed a modular trust framework — badge components, certification detail drawers, privacy summary cards, and a compliance checklist UI — that worked across listing pages and in-product install flows.",
      },
      {
        number: "04",
        title: "Validation with Security Teams",
        description:
          "Ran usability sessions with enterprise security admins at 5 customer organisations, refining the information hierarchy and language until buyers could make confident install decisions in under 2 minutes.",
      },
    ],
    solution: {
      title: "Trust signals that convert",
      description:
        "A cohesive trust layer built into the Marketplace listing experience — from certification badges and security summaries to expandable compliance detail drawers — giving buyers everything they need to say yes.",
      features: [
        {
          title: "Security certification badges",
          description:
            "Clear, scannable badges for SOC 2, ISO 27001, GDPR compliance, and Atlassian's own security review program — surfaced at the top of every listing page.",
        },
        {
          title: "Privacy & data summary cards",
          description:
            "Standardised data-handling cards that answer the five questions every security team asks: what data is accessed, how it's stored, where it's processed, who can access it, and how long it's retained.",
        },
        {
          title: "Compliance checklist drawer",
          description:
            "An expandable in-context panel linking certifications to their underlying evidence — reports, audit dates, and remediation history — for teams that need full due diligence.",
        },
      ],
    },
    impact: [
      {
        value: "67%",
        label: "Fewer trust tickets",
        description: "Reduction in pre-install security support tickets",
      },
      {
        value: "16%",
        label: "Fewer detractors",
        description: "Reduction in NPS detractors among enterprise buyers",
      },
      {
        value: "23%",
        label: "Partner satisfaction",
        description: "Increase in partner satisfaction score",
      },
    ],
    nextProjectId: 4,
  },
  {
    id: 4,
    title: "Rovo Service",
    category: "Atlassian AI Assistant",
    company: "Atlassian",
    year: "2024",
    role: "Senior Product Designer",
    platform: "Web App · Enterprise",
    timeline: "Aug 2021 – Present",
    heroColor: "#C5D9F9",
    image: "/project-jira-ai.png",
    imageAlt: "Rovo AI assistant service layer design",
    overview:
      "Designed the service layer experience for Rovo, Atlassian's enterprise AI assistant — enabling AI agents to take autonomous action across Jira, Confluence, and third-party tools while maintaining user trust and control.",
    metrics: [
      { label: "EFFICIENCY GAIN", value: "38%" },
      { label: "ACTIVE TEAMS", value: "2.1K" },
    ],
    challenge: {
      text:
        "As Atlassian's AI strategy evolved from conversational assistance to autonomous action, a new design challenge emerged: how do you let an AI agent act on your behalf across enterprise tools without eroding trust or creating dangerous ambiguity about what the agent did, why, and what happens next? Enterprise customers needed confidence, not just capability.",
      bullets: [
        "No established design patterns for agentic AI in enterprise contexts",
        "Users needed clear visibility into what actions AI had taken or was about to take",
        "Enterprise security teams required audit trails and rollback mechanisms",
        "The line between AI-assisted and AI-autonomous was unclear and anxiety-inducing",
      ],
    },
    process: [
      {
        number: "01",
        title: "Agentic UX Discovery",
        description:
          "Researched emerging agentic AI patterns across enterprise tools, conducted 15 interviews with enterprise team leads, and ran diary studies with beta users to map trust thresholds for different action types.",
      },
      {
        number: "02",
        title: "Action Taxonomy Design",
        description:
          "Classified all Rovo actions into a risk framework — read, suggest, act, and delegate — and designed distinct interaction patterns for each tier that matched user expectations and enterprise policy requirements.",
      },
      {
        number: "03",
        title: "Confirmation & Transparency Flows",
        description:
          "Prototyped pre-action confirmation interfaces, real-time action status views, and post-action summaries. Tested seven variants with enterprise users to find the right balance between friction and oversight.",
      },
      {
        number: "04",
        title: "Pilot & Refinement",
        description:
          "Deployed to 50 enterprise teams in a closed pilot, gathering quantitative engagement data and qualitative trust signals. Made 23 design iterations before GA based on pilot findings.",
      },
    ],
    solution: {
      title: "Agentic AI with human oversight built in",
      description:
        "Rovo Service gives teams a transparent, controllable layer of AI automation — from single-step actions to multi-agent workflows — with visibility and override capability at every step.",
      features: [
        {
          title: "Action confirmation flows",
          description:
            "Before high-impact actions, Rovo presents a plain-language summary of what it's about to do, what data it'll touch, and a one-click override — building confidence through transparency.",
        },
        {
          title: "Live action status panel",
          description:
            "A real-time status view shows what Rovo is doing across connected tools — with step-by-step progress, source references, and the ability to pause or cancel at any point.",
        },
        {
          title: "Audit trail & rollback",
          description:
            "Every Rovo action is logged in a human-readable audit trail with timestamps, user context, and one-click rollback for reversible actions — built for enterprise compliance requirements.",
        },
      ],
    },
    impact: [
      {
        value: "38%",
        label: "Efficiency gain",
        description: "Reduction in manual workflow steps for pilot teams",
      },
      {
        value: "2.1K",
        label: "Active teams",
        description: "Enterprise teams using Rovo Service at launch",
      },
      {
        value: "80–90%",
        label: "MTTR reduction",
        description: "Reduction in mean time to resolution in JSM",
      },
    ],
    nextProjectId: 1,
  },
];

export function getCaseStudy(id: number): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.id === id);
}

export function getNextCaseStudy(currentId: number): CaseStudy | undefined {
  const current = getCaseStudy(currentId);
  if (!current) return undefined;
  return getCaseStudy(current.nextProjectId);
}
