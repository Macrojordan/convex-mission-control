"use client";

import { useState } from "react";
import {
  Bot, Zap, Shield, Brain, Network, ChevronDown, ChevronUp,
  Star, ArrowLeft, Sparkles, Users, Target, Layers, Crown,
  Cpu, Globe, Briefcase, TrendingUp, Eye
} from "lucide-react";

/* ─── DATA ─── */

const logos = [
  {
    name: "The Neural Crown",
    icon: Crown,
    tagline: "Authority meets intelligence",
    desc: "A stylized crown where each point is a neural network node, connected by glowing lines. The letter 'A' sits at center, doubling as both Agent and the crown's jewel. Clean geometric lines convey precision; the crown symbolizes mastery and leadership over AI agents.",
    why: "Directly communicates the 'Boss' concept — you're the ruler of your AI fleet. The neural nodes show tech sophistication without being cold. Works at any size, from favicon to billboard.",
    palette: ["#6C3AED", "#8B5CF6", "#C4B5FD", "#1E1B4B", "#F8FAFC"],
    paletteNames: ["Royal Violet", "Light Violet", "Lavender", "Deep Navy", "Ice White"],
    typography: "Satoshi (headings) + Inter (body) — geometric sans-serif pair. Modern, clean, authoritative.",
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="nc1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6C3AED" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <polygon points="100,30 140,80 170,50 160,120 40,120 30,50 60,80" fill="url(#nc1)" opacity="0.9" />
        <circle cx="100" cy="30" r="6" fill="#C4B5FD" />
        <circle cx="30" cy="50" r="5" fill="#C4B5FD" />
        <circle cx="170" cy="50" r="5" fill="#C4B5FD" />
        <circle cx="60" cy="80" r="4" fill="#C4B5FD" />
        <circle cx="140" cy="80" r="4" fill="#C4B5FD" />
        <line x1="100" y1="30" x2="60" y2="80" stroke="#C4B5FD" strokeWidth="1.5" opacity="0.6" />
        <line x1="100" y1="30" x2="140" y2="80" stroke="#C4B5FD" strokeWidth="1.5" opacity="0.6" />
        <line x1="30" y1="50" x2="60" y2="80" stroke="#C4B5FD" strokeWidth="1.5" opacity="0.6" />
        <line x1="170" y1="50" x2="140" y2="80" stroke="#C4B5FD" strokeWidth="1.5" opacity="0.6" />
        <text x="100" y="115" textAnchor="middle" fill="#F8FAFC" fontSize="22" fontWeight="700" fontFamily="sans-serif">AGENT BOSS</text>
        <text x="100" y="145" textAnchor="middle" fill="#C4B5FD" fontSize="10" letterSpacing="4" fontFamily="sans-serif">AI CONSULTING</text>
      </svg>
    ),
  },
  {
    name: "The Command Grid",
    icon: Network,
    tagline: "Orchestration visualized",
    desc: "A central node (the 'boss') radiates connections outward to 5-6 smaller satellite nodes — representing the fleet of AI agents. The grid pattern forms a subtle 'AB' monogram when viewed closely. Minimalist, tech-forward, scalable.",
    why: "Perfectly illustrates the core value prop: one human commanding multiple AI agents. The hub-and-spoke pattern is instantly recognizable in tech. Clean enough for enterprise clients, dynamic enough for startups.",
    palette: ["#0EA5E9", "#38BDF8", "#7DD3FC", "#0C4A6E", "#F0F9FF"],
    paletteNames: ["Electric Blue", "Sky Blue", "Light Cyan", "Deep Ocean", "Ice Blue"],
    typography: "Space Grotesk (headings) + DM Sans (body) — techy but readable. Great for dashboards and decks.",
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="cg1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </radialGradient>
        </defs>
        {[[100,55],[55,80],[145,80],[65,130],[135,130],[100,155]].map(([x,y],i)=>(
          <line key={i} x1={100} y1={100} x2={x} y2={y} stroke="#7DD3FC" strokeWidth="2" opacity="0.5" />
        ))}
        {[[100,55],[55,80],[145,80],[65,130],[135,130],[100,155]].map(([x,y],i)=>(
          <circle key={`s${i}`} cx={x} cy={y} r="10" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="2" />
        ))}
        <circle cx={100} cy={100} r="18" fill="url(#cg1)" />
        <text x="100" y="106" textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="800" fontFamily="sans-serif">AB</text>
        <text x="100" y="185" textAnchor="middle" fill="#F0F9FF" fontSize="11" letterSpacing="3" fontFamily="sans-serif">AGENT BOSS</text>
      </svg>
    ),
  },
  {
    name: "The Apex Arrow",
    icon: TrendingUp,
    tagline: "Growth through intelligence",
    desc: "An upward-pointing arrow/chevron with integrated circuit traces running through it. The arrow tip splits into three paths — representing multiple AI agents executing simultaneously. Bold, dynamic, forward-moving energy.",
    why: "Conveys momentum and results. SMBs care about growth — this logo says 'we take you higher.' The circuit traces add tech credibility without being generic. Works beautifully as an app icon.",
    palette: ["#10B981", "#34D399", "#A7F3D0", "#064E3B", "#ECFDF5"],
    paletteNames: ["Emerald", "Mint", "Seafoam", "Forest", "Light Mint"],
    typography: "Outfit (headings) + Plus Jakarta Sans (body) — warm geometric feel. Approachable yet professional.",
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="aa1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
        <path d="M100 30 L60 90 L80 90 L80 70 L90 90 L100 60 L110 90 L120 70 L120 90 L140 90 Z" fill="url(#aa1)" />
        <path d="M75 100 L75 140 L85 140" stroke="#34D399" strokeWidth="2" fill="none" />
        <path d="M100 100 L100 150" stroke="#34D399" strokeWidth="2" fill="none" />
        <path d="M125 100 L125 140 L115 140" stroke="#34D399" strokeWidth="2" fill="none" />
        <circle cx="85" cy="140" r="4" fill="#A7F3D0" />
        <circle cx="100" cy="150" r="4" fill="#A7F3D0" />
        <circle cx="115" cy="140" r="4" fill="#A7F3D0" />
        <text x="100" y="178" textAnchor="middle" fill="#ECFDF5" fontSize="16" fontWeight="700" fontFamily="sans-serif">AGENT BOSS</text>
      </svg>
    ),
  },
  {
    name: "The Nexus Cube",
    icon: Layers,
    tagline: "Structured intelligence",
    desc: "An isometric cube with transparent faces showing interconnected layers inside — data layer, AI layer, business layer. Each face has a subtle gradient. The cube sits confidently, suggesting stability and depth. 'AB' monogram etched on the front face.",
    why: "Communicates structure and reliability — crucial for enterprise clients. The layered cube shows depth of service (consulting + implementation + training). The isometric style is trendy in tech but timeless in execution.",
    palette: ["#F59E0B", "#FBBF24", "#FDE68A", "#78350F", "#FFFBEB"],
    paletteNames: ["Amber", "Gold", "Light Gold", "Deep Bronze", "Cream"],
    typography: "Sora (headings) + Nunito Sans (body) — balanced, warm, structured. Good for B2B trust.",
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="nx1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="nx2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>
        <polygon points="100,40 160,75 100,110 40,75" fill="url(#nx1)" opacity="0.9" />
        <polygon points="100,110 160,75 160,135 100,170" fill="url(#nx2)" opacity="0.8" />
        <polygon points="100,110 40,75 40,135 100,170" fill="#78350F" opacity="0.7" />
        <polygon points="100,65 140,85 100,105 60,85" fill="none" stroke="#FDE68A" strokeWidth="1" opacity="0.5" />
        <polygon points="100,80 130,95 100,110 70,95" fill="none" stroke="#FDE68A" strokeWidth="1" opacity="0.3" />
        <text x="100" y="108" textAnchor="middle" fill="#FFFBEB" fontSize="16" fontWeight="700" fontFamily="sans-serif">AB</text>
        <text x="100" y="192" textAnchor="middle" fill="#FFFBEB" fontSize="11" letterSpacing="3" fontFamily="sans-serif">AGENT BOSS</text>
      </svg>
    ),
  },
  {
    name: "The Signal Pulse",
    icon: Zap,
    tagline: "Alive with intelligence",
    desc: "A heartbeat/pulse line that morphs into the letters 'AB' at its peak — life meets technology. Emanating signal rings radiate outward from the peak, suggesting broadcast, reach, and always-on intelligence. Energetic, alive, memorable.",
    why: "Unique and ownable — nobody in AI consulting has anything like it. The pulse metaphor = 'we bring AI to life in your business.' Signal rings = reach and scale. Works as an animated logo too (pulse animation on website).",
    palette: ["#EF4444", "#F87171", "#FECACA", "#7F1D1D", "#FEF2F2"],
    paletteNames: ["Signal Red", "Coral", "Blush", "Deep Red", "Rose White"],
    typography: "Clash Display (headings) + General Sans (body) — bold, contemporary, attention-grabbing.",
    svg: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="sp1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#F87171" />
          </linearGradient>
        </defs>
        <path d="M20,110 L60,110 L75,140 L90,60 L110,60 L125,140 L140,110 L180,110" fill="none" stroke="url(#sp1)" strokeWidth="3" strokeLinecap="round" />
        {[30,45,60].map((r,i) => (
          <circle key={i} cx="100" cy="60" r={r} fill="none" stroke="#F87171" strokeWidth="1" opacity={0.4 - i*0.1} />
        ))}
        <text x="100" y="68" textAnchor="middle" fill="#FEF2F2" fontSize="14" fontWeight="800" fontFamily="sans-serif">AB</text>
        <text x="100" y="178" textAnchor="middle" fill="#FEF2F2" fontSize="16" fontWeight="700" fontFamily="sans-serif">AGENT BOSS</text>
      </svg>
    ),
  },
];

const websites = [
  {
    name: "Executive Dark Mode",
    icon: Eye,
    style: "Premium dark with accent glows",
    desc: "Deep charcoal (#0f0f0f) background with subtle gradient cards. Floating glass-morphism panels. Accent color glows on hover. Large hero with animated particle network background. Sections slide in on scroll. Enterprise-grade feel with startup energy.",
    sections: "Hero (animated network + CTA) → What We Do (3 service cards) → How It Works (timeline) → Case Studies (carousel) → Team → Contact",
    why: "Dark mode signals 'cutting-edge tech.' Glass-morphism is premium. The particle network subtly reinforces the AI agent fleet concept. This is where trust meets innovation.",
    mobile: "Bottom navigation bar. Cards stack vertically. Particle animation reduces to static gradient on mobile for performance. Hamburger menu with slide-in panel.",
    colors: ["#0F0F0F", "#6C3AED", "#C4B5FD", "#1A1A2E"],
  },
  {
    name: "Neo-Gradient Flow",
    icon: Sparkles,
    style: "Vibrant gradients on light backgrounds",
    desc: "Clean white/light gray base with bold gradient accents (purple→blue→teal). Rounded cards with generous padding. Illustrations using gradient blobs. Feels like Linear/Vercel's design language — modern SaaS at its finest.",
    sections: "Hero (gradient text + product mockup) → Trusted By (logos) → Services (icon grid) → ROI Calculator (interactive) → Testimonials → Blog preview → CTA",
    why: "This style screams 'modern SaaS' and positions Agent Boss alongside world-class tech companies. The light base is friendlier for Brazilian SMBs who might find dark mode intimidating. The ROI calculator adds interactive value.",
    mobile: "Swipeable service cards. Sticky CTA button at bottom. Gradient hero adapts to portrait beautifully. Fast loading — minimal JS.",
    colors: ["#FAFAFA", "#6C3AED", "#0EA5E9", "#10B981"],
  },
  {
    name: "Command Center",
    icon: Cpu,
    style: "Dashboard-inspired, data-rich",
    desc: "The website itself looks like a command dashboard — with widgets, status indicators, and real-time counters. Dark background with neon accent borders. Grid-based layout. Live stats ('agents deployed: 1,247'). Makes visitors feel like they're already inside the product.",
    sections: "Live Dashboard Hero (animated counters) → Agent Types (grid cards with status dots) → Deploy Flow (step wizard) → Metrics (charts/graphs) → Integration logos → Deploy CTA",
    why: "Perfectly embodies the 'Agent Boss' metaphor — you're already commanding agents just by visiting the site. Highly differentiated from every other consulting website. Memorable and shareable.",
    mobile: "Widget cards stack in 2-column grid. Counters animate on scroll-into-view. Swipe between dashboard panels. Feels like a mobile app, not a website.",
    colors: ["#0A0A0F", "#00FF88", "#0EA5E9", "#FF6B6B"],
  },
  {
    name: "Warm Professional",
    icon: Briefcase,
    style: "Friendly, approachable, trustworthy",
    desc: "Warm neutrals (cream, sand, terracotta) with navy accents. Rounded UI, friendly illustrations of humans working with AI robots. Large readable typography. Feels like a premium consultancy you'd trust with your business. Think McKinsey meets Notion.",
    sections: "Hero (human + AI illustration + value prop) → Our Approach (3 pillars) → Success Stories (before/after) → Our Team (photos + personality) → FAQ accordion → Booking CTA",
    why: "Brazilian SMBs need trust first, tech second. This design says 'we're approachable, we're human, we understand your business.' The warm palette stands out in a sea of cold tech blues. The before/after format directly shows ROI.",
    mobile: "Large touch targets. Comfortable reading experience. FAQ accordion is native-feeling. One-tap WhatsApp CTA (crucial for Brazil). Fast paint — no heavy animations.",
    colors: ["#FAF7F2", "#1E3A5F", "#D97706", "#E8DDD3"],
  },
  {
    name: "Cyberpunk Minimal",
    icon: Zap,
    style: "Bold, edgy, memorable",
    desc: "Black background, neon accents (electric green, hot pink). Monospace typography for headings. Glitch effects on hover. ASCII art elements. Code snippets as decorative elements. The rebel in the AI consulting space.",
    sections: "Hero (glitch text animation + terminal prompt CTA) → What We Hack (services as 'modules') → The Stack (tech logos with neon borders) → Proof (metrics in terminal style) → Join the Network → Terminal-style contact form",
    why: "Maximum differentiation. Nobody in Brazilian AI consulting looks like this. Appeals to technical founders who want a partner that 'gets it.' The irreverence aligns with Ruben's South Park humor sensibility. Highly Instagram/Twitter-shareable.",
    mobile: "Terminal-style scrolling. Neon glow effects (CSS only, no JS). Tap-to-reveal content blocks. Monospace text is actually very readable on mobile. Dark mode only — saves battery too.",
    colors: ["#000000", "#00FF41", "#FF0080", "#00D4FF"],
  },
];

/* ─── COMPONENTS ─── */

function PaletteStrip({ colors, names }: { colors: string[]; names?: string[] }) {
  return (
    <div className="flex gap-1.5 mt-3">
      {colors.map((c, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-lg border border-white/10" style={{ background: c }} />
          <span className="text-[9px] text-gray-500">{names?.[i] || c}</span>
        </div>
      ))}
    </div>
  );
}

function LogoCard({ logo, index, expanded, onToggle }: any) {
  const Icon = logo.icon;
  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden">
      <div className="aspect-square bg-[#111] p-6 flex items-center justify-center">
        {logo.svg}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded-full">#{index + 1}</span>
          <Icon className="w-4 h-4 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold mt-1">{logo.name}</h3>
        <p className="text-sm text-gray-400 italic">{logo.tagline}</p>
        <button onClick={onToggle} className="flex items-center gap-1 text-xs text-violet-400 mt-3">
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? "Less" : "Details"}
        </button>
        {expanded && (
          <div className="mt-3 space-y-3 text-sm text-gray-300">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Description</p>
              <p>{logo.desc}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Why It Works</p>
              <p>{logo.why}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Typography</p>
              <p>{logo.typography}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Color Palette</p>
              <PaletteStrip colors={logo.palette} names={logo.paletteNames} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WebCard({ web, index, expanded, onToggle }: any) {
  const Icon = web.icon;
  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden">
      <div className="h-32 relative flex items-center justify-center gap-2 overflow-hidden" style={{ background: `linear-gradient(135deg, ${web.colors[0]}, ${web.colors[1]}40)` }}>
        {web.colors.map((c: string, i: number) => (
          <div key={i} className="w-8 h-8 rounded-full border-2 border-white/20" style={{ background: c }} />
        ))}
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] text-white/70">
          {web.style}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded-full">#{index + 1}</span>
          <Icon className="w-4 h-4 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold mt-1">{web.name}</h3>
        <button onClick={onToggle} className="flex items-center gap-1 text-xs text-sky-400 mt-3">
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? "Less" : "Details"}
        </button>
        {expanded && (
          <div className="mt-3 space-y-3 text-sm text-gray-300">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Visual Direction</p>
              <p>{web.desc}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sections</p>
              <p>{web.sections}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Why It Fits</p>
              <p>{web.why}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">📱 Mobile Experience</p>
              <p>{web.mobile}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */

export default function BrandConcepts() {
  const [expandedLogo, setExpandedLogo] = useState<number | null>(null);
  const [expandedWeb, setExpandedWeb] = useState<number | null>(null);
  const [tab, setTab] = useState<"logos" | "websites" | "rec">("logos");

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-[#333]">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <a href="/" className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <div>
            <h1 className="text-base font-bold">Agent Boss — Brand Concepts</h1>
            <p className="text-xs text-gray-500">5 Logos · 5 Website Directions · 1 Recommendation</p>
          </div>
        </div>
      </header>

      {/* Tab Nav */}
      <nav className="sticky top-[57px] z-40 bg-[#0f0f0f]/90 backdrop-blur-xl border-b border-[#222]">
        <div className="max-w-lg mx-auto px-4 flex">
          {([
            ["logos", "🎨 Logos", logos.length],
            ["websites", "🌐 Websites", websites.length],
            ["rec", "⭐ Pick", null],
          ] as const).map(([key, label, count]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === key ? "border-violet-500 text-white" : "border-transparent text-gray-500"
              }`}
            >
              {label} {count && <span className="text-xs opacity-50">({count})</span>}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {tab === "logos" && (
          <>
            <p className="text-sm text-gray-400">
              Tap any card to see full details — colors, typography, and rationale.
            </p>
            {logos.map((logo, i) => (
              <LogoCard
                key={i}
                logo={logo}
                index={i}
                expanded={expandedLogo === i}
                onToggle={() => setExpandedLogo(expandedLogo === i ? null : i)}
              />
            ))}
          </>
        )}

        {tab === "websites" && (
          <>
            <p className="text-sm text-gray-400">
              5 distinct website directions — from enterprise dark mode to cyberpunk rebel.
            </p>
            {websites.map((web, i) => (
              <WebCard
                key={i}
                web={web}
                index={i}
                expanded={expandedWeb === i}
                onToggle={() => setExpandedWeb(expandedWeb === i ? null : i)}
              />
            ))}
          </>
        )}

        {tab === "rec" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-violet-500/10 to-sky-500/10 border border-violet-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <h2 className="text-xl font-bold">My Top Pick</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className="text-sm text-violet-400 uppercase tracking-wider mb-1">Logo</h3>
                  <p className="text-lg font-bold">The Command Grid (#2)</p>
                  <p className="text-sm text-gray-300 mt-1">
                    The hub-and-spoke pattern is the literal visual metaphor for Agent Boss — one human commanding a fleet of AI agents. It's clean enough for enterprise pitch decks, memorable enough for social media, and scales from favicon to t-shirt. The Electric Blue palette signals innovation without the "we're trying too hard" vibe of neon colors.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <h3 className="text-sm text-sky-400 uppercase tracking-wider mb-1">Website</h3>
                  <p className="text-lg font-bold">Command Center (#3) + Warm Professional (#4) Hybrid</p>
                  <p className="text-sm text-gray-300 mt-1">
                    For the Brazilian SMB market, pure cyberpunk is too alienating and pure enterprise is too cold. I recommend the <strong>Command Center</strong> concept for the hero section and interactive elements (the dashboard metaphor is <em>chef's kiss</em> for Agent Boss), combined with the <strong>Warm Professional</strong> approach for content sections and CTAs.
                  </p>
                  <p className="text-sm text-gray-300 mt-3">
                    This gives you: the "wow, this is different" factor from Command Center + the "I trust these people with my business" factor from Warm Professional. Plus the WhatsApp CTA integration is essential for Brazil.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <h3 className="text-sm text-emerald-400 uppercase tracking-wider mb-1">Combo Palette</h3>
                  <PaletteStrip
                    colors={["#0A0A0F", "#0EA5E9", "#38BDF8", "#1E3A5F", "#FAF7F2"]}
                    names={["Background", "Primary", "Accent", "Navy", "Warm White"]}
                  />
                </div>

                <div className="border-t border-white/10 pt-5">
                  <h3 className="text-sm text-amber-400 uppercase tracking-wider mb-1">Why Not The Others?</h3>
                  <ul className="text-sm text-gray-300 space-y-2 mt-2">
                    <li><span className="text-gray-500">Neural Crown:</span> Beautiful but slightly generic — "crown = boss" is obvious</li>
                    <li><span className="text-gray-500">Apex Arrow:</span> Strong but could be any growth company, not specifically AI agents</li>
                    <li><span className="text-gray-500">Nexus Cube:</span> Premium feel but amber palette may feel too "fintech"</li>
                    <li><span className="text-gray-500">Signal Pulse:</span> Most creative but red palette could feel alarming for conservative SMBs</li>
                    <li><span className="text-gray-500">Cyberpunk site:</span> 🔥 for personal brand but risky for enterprise sales</li>
                    <li><span className="text-gray-500">Neo-Gradient:</span> Too safe — looks like every other SaaS</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-5">
              <h3 className="font-bold mb-2">💬 Next Steps</h3>
              <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                <li>Pick your logo favorite (or ask for variations)</li>
                <li>Choose a website direction (or approve the hybrid)</li>
                <li>I'll generate full mockups + assets</li>
                <li>We build the real thing on agentboss.ai</li>
              </ol>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#222] mt-12 py-6 text-center text-xs text-gray-600">
        Built by the Agent Squad 🦀 · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
// Brand concepts gallery deployed
