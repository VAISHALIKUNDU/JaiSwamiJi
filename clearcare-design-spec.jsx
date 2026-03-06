import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["How it Works", "Features", "Who It's For", "About"];

const STATS = [
  { value: "27M+", label: "Uninsured Americans" },
  { value: "$2,500", label: "Avg. surprise bill" },
  { value: "580K+", label: "H1B visa holders" },
  { value: "3x", label: "Price variance per zip" },
];

const STEPS = [
  {
    number: "01",
    title: "Enter your zip code",
    body: "We locate every licensed provider, clinic, and hospital within your area — instantly.",
  },
  {
    number: "02",
    title: "Tell us what you need",
    body: "Search by symptom, specialist, or procedure. No medical jargon required.",
  },
  {
    number: "03",
    title: "See exact costs",
    body: "We pull directly from CMS price transparency data. No estimates. No surprises.",
  },
  {
    number: "04",
    title: "Compare and decide",
    body: "Side-by-side costs with insurance, without insurance, and across providers.",
  },
];

const FEATURES = [
  {
    icon: "◎",
    title: "Exact Pricing",
    body: "Powered by federally-mandated CMS hospital price data. What you see is what you pay.",
  },
  {
    icon: "⊕",
    title: "Provider Search",
    body: "Find affordable, highly-rated providers near you — sorted by cost, not just distance.",
  },
  {
    icon: "⊞",
    title: "Plan Comparator",
    body: "Compare ACA, employer, and short-term plans with your true projected annual cost.",
  },
  {
    icon: "◈",
    title: "H1B & Immigrant Guide",
    body: "Dedicated eligibility and coverage guidance for visa holders navigating US healthcare.",
  },
  {
    icon: "⊟",
    title: "With or Without Insurance",
    body: "Every procedure shown in both scenarios so you can make the smartest financial choice.",
  },
  {
    icon: "◉",
    title: "No Account Required",
    body: "Access real pricing information immediately. No signup, no tracking, no friction.",
  },
];

const PERSONAS = [
  {
    label: "Uninsured",
    name: "Maria, 34",
    role: "Freelance designer, Texas",
    quote: "I avoided doctors for two years because I had no idea what anything would cost. ClearCare showed me a $45 urgent care visit three blocks away.",
  },
  {
    label: "H1B Visa",
    name: "Arjun, 29",
    role: "Software engineer, California",
    quote: "Switching jobs meant losing my health plan for 3 weeks. I found a $60 telehealth option and compared three ACA plans in under 10 minutes.",
  },
  {
    label: "Insured",
    name: "David, 52",
    role: "HR manager, Ohio",
    quote: "My high-deductible plan meant I was effectively uninsured for most of the year. Now I know exactly what I owe before I walk into any appointment.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function ClearCare() {
  const [scrolled, setScrolled] = useState(false);
  const [activePersona, setActivePersona] = useState(0);
  const [heroRef, heroIn] = useInView(0.1);
  const [statsRef, statsIn] = useInView(0.2);
  const [stepsRef, stepsIn] = useInView(0.1);
  const [featRef, featIn] = useInView(0.1);
  const [personaRef, personaIn] = useInView(0.1);
  const [ctaRef, ctaIn] = useInView(0.2);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#FFFFFF", color: "#0A0A0A", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #0A0A0A; color: #fff; }
        .fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1); }
        .fade-up.in { opacity: 1; transform: translateY(0); }
        .fade-up.d1 { transition-delay: 0.1s; }
        .fade-up.d2 { transition-delay: 0.2s; }
        .fade-up.d3 { transition-delay: 0.3s; }
        .fade-up.d4 { transition-delay: 0.4s; }
        .nav-link { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; color: #555; text-decoration: none; letter-spacing: 0.02em; transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: #0A0A0A; }
        .feature-card { border: 1px solid #E8E8E8; padding: 36px 32px; transition: border-color 0.3s, box-shadow 0.3s; background: #fff; }
        .feature-card:hover { border-color: #0A0A0A; box-shadow: 0 8px 40px rgba(0,0,0,0.06); }
        .persona-tab { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; padding: 10px 20px; border: 1px solid #E8E8E8; background: transparent; cursor: pointer; transition: all 0.2s; color: #888; }
        .persona-tab.active { background: #0A0A0A; color: #fff; border-color: #0A0A0A; }
        .btn-primary { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.05em; background: #0A0A0A; color: #fff; border: none; padding: 14px 32px; cursor: pointer; transition: opacity 0.2s; }
        .btn-primary:hover { opacity: 0.75; }
        .btn-ghost { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.05em; background: transparent; color: #0A0A0A; border: 1px solid #D0D0D0; padding: 14px 32px; cursor: pointer; transition: border-color 0.2s; }
        .btn-ghost:hover { border-color: #0A0A0A; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 48px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #F0F0F0" : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(.16,1,.3,1)",
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, letterSpacing: "0.02em" }}>
          ClearCare
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {NAV_LINKS.map(l => <span key={l} className="nav-link">{l}</span>)}
        </div>
        <button className="btn-primary" style={{ padding: "9px 22px", fontSize: 12 }}>Join Waitlist</button>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "120px 48px 80px", textAlign: "center",
        background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025,
          backgroundImage: "linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)",
          backgroundSize: "60px 60px", pointerEvents: "none",
        }} />

        <div className={`fade-up${heroIn ? " in" : ""}`} style={{ marginBottom: 20 }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
            letterSpacing: "0.15em", textTransform: "uppercase", color: "#888",
            borderBottom: "1px solid #D0D0D0", paddingBottom: 4,
          }}>Healthcare Transparency Platform</span>
        </div>

        <h1 className={`fade-up d1${heroIn ? " in" : ""}`} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(52px, 8vw, 96px)",
          fontWeight: 300, lineHeight: 1.05,
          letterSpacing: "-0.02em", maxWidth: 900, marginBottom: 12,
        }}>
          Know what healthcare<br /><em style={{ fontStyle: "italic" }}>actually costs.</em>
        </h1>

        <p className={`fade-up d2${heroIn ? " in" : ""}`} style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 300,
          lineHeight: 1.7, color: "#555", maxWidth: 520, marginBottom: 48,
        }}>
          Exact pricing. Real providers. For every American — insured, uninsured, or navigating coverage for the first time.
        </p>

        <div className={`fade-up d3${heroIn ? " in" : ""}`} style={{ display: "flex", gap: 12 }}>
          <button className="btn-primary">Join the Waitlist</button>
          <button className="btn-ghost">See How It Works</button>
        </div>

        <div className={`fade-up d4${heroIn ? " in" : ""}`} style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(180deg, transparent, #C0C0C0)", margin: "0 auto" }} />
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} style={{ borderTop: "1px solid #F0F0F0", borderBottom: "1px solid #F0F0F0", padding: "56px 48px", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {STATS.map((s, i) => (
            <div key={i} className={`fade-up d${i + 1}${statsIn ? " in" : ""}`} style={{
              textAlign: "center", padding: "0 24px",
              borderRight: i < 3 ? "1px solid #E8E8E8" : "none",
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 44, fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#888", marginTop: 8, letterSpacing: "0.04em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section ref={stepsRef} style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className={`fade-up${stepsIn ? " in" : ""}`} style={{ marginBottom: 64, textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 16 }}>Process</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, letterSpacing: "-0.01em" }}>How ClearCare works</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
            {STEPS.map((s, i) => (
              <div key={i} className={`fade-up d${i + 1}${stepsIn ? " in" : ""}`} style={{ padding: "0 32px", textAlign: "center", borderRight: i < 3 ? "1px solid #E8E8E8" : "none" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", border: "1px solid #0A0A0A",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.05em",
                }}>{s.number}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#666", lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featRef} style={{ padding: "100px 48px", background: "#FAFAFA", borderTop: "1px solid #F0F0F0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className={`fade-up${featIn ? " in" : ""}`} style={{ marginBottom: 64, textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 16 }}>Features</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, letterSpacing: "-0.01em" }}>Everything you need to decide</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "#E8E8E8" }}>
            {FEATURES.map((f, i) => (
              <div key={i} className={`feature-card fade-up d${(i % 3) + 1}${featIn ? " in" : ""}`}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#666", lineHeight: 1.75 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section ref={personaRef} style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className={`fade-up${personaIn ? " in" : ""}`} style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 16 }}>Who It's For</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, letterSpacing: "-0.01em" }}>Built for every American</h2>
          </div>
          <div className={`fade-up d1${personaIn ? " in" : ""}`} style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
            {PERSONAS.map((p, i) => (
              <button key={i} className={`persona-tab${activePersona === i ? " active" : ""}`} onClick={() => setActivePersona(i)}>{p.label}</button>
            ))}
          </div>
          <div className={`fade-up d2${personaIn ? " in" : ""}`} style={{ border: "1px solid #E8E8E8", padding: "52px 56px" }}>
            <blockquote style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontWeight: 300, fontStyle: "italic",
              lineHeight: 1.55, marginBottom: 32,
            }}>
              "{PERSONAS[activePersona].quote}"
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 18 }}>
                {PERSONAS[activePersona].name[0]}
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500 }}>{PERSONAS[activePersona].name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#888", marginTop: 2 }}>{PERSONAS[activePersona].role}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} style={{ padding: "120px 48px", textAlign: "center", background: "#0A0A0A", color: "#fff" }}>
        <div className={`fade-up${ctaIn ? " in" : ""}`} style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginBottom: 24 }}>Early Access</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 24 }}>
            Healthcare costs<br /><em>should not be a mystery.</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#888", lineHeight: 1.7, marginBottom: 40 }}>
            Join our waitlist and be the first to know when ClearCare launches in your area.
          </p>
          <div style={{ display: "flex", maxWidth: 420, margin: "0 auto" }}>
            <input type="email" placeholder="your@email.com" style={{
              flex: 1, padding: "14px 20px",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              background: "#1A1A1A", border: "1px solid #333",
              borderRight: "none", color: "#fff", outline: "none",
            }} />
            <button style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
              letterSpacing: "0.05em", background: "#fff", color: "#0A0A0A",
              border: "none", padding: "14px 24px", cursor: "pointer", whiteSpace: "nowrap",
            }}>Join Waitlist</button>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#444", marginTop: 16 }}>No spam. No commitment. Just early access.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 48px", borderTop: "1px solid #1A1A1A", background: "#0A0A0A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#fff" }}>ClearCare</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#444", letterSpacing: "0.05em" }}>© 2026 ClearCare · Built by Vaishali Kundu · clearcarehealth.org</div>
      </footer>
    </div>
  );
}
