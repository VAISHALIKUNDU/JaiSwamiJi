import { useState } from "react";

const sections = [
  {
    id: "overview",
    label: "Product Overview",
    icon: "🏥",
    color: "#00C49A",
  },
  {
    id: "users",
    label: "User Personas",
    icon: "👥",
    color: "#3B82F6",
  },
  {
    id: "features",
    label: "Feature Roadmap",
    icon: "🗺️",
    color: "#8B5CF6",
  },
  {
    id: "screens",
    label: "Key Screens",
    icon: "📱",
    color: "#F59E0B",
  },
  {
    id: "data",
    label: "Data & APIs",
    icon: "🔌",
    color: "#EF4444",
  },
  {
    id: "tech",
    label: "Tech Stack",
    icon: "⚙️",
    color: "#06B6D4",
  },
  {
    id: "mvp",
    label: "MVP Checklist",
    icon: "✅",
    color: "#10B981",
  },
];

const features = [
  {
    priority: 1,
    phase: "MVP",
    name: "Nearby Affordable Provider Finder",
    description:
      "Search by zip code, specialty, or symptom. Real-time results sorted by cost, distance, and rating. Filters for insurance accepted, language, availability.",
    status: "must-have",
    complexity: "High",
  },
  {
    priority: 2,
    phase: "MVP",
    name: "Insurance Plan Comparator",
    description:
      "Side-by-side comparison of ACA marketplace, employer, and short-term plans. Inputs: age, zip, income, health usage. Output: true annual cost breakdown.",
    status: "must-have",
    complexity: "High",
  },
  {
    priority: 3,
    phase: "MVP",
    name: "With / Without Insurance Cost Estimator",
    description:
      "For any procedure or visit type, show the cash-pay price vs. insured price by zip code. Pull from CMS price transparency data.",
    status: "must-have",
    complexity: "Medium",
  },
  {
    priority: 4,
    phase: "V2",
    name: "Exact Out-of-Pocket Cost Lookup",
    description:
      "Hospital-specific pricing (required by CMS 2021 rule). Procedure code lookup (CPT codes). Deductible/OOP max tracker per user profile.",
    status: "high-value",
    complexity: "Very High",
  },
  {
    priority: 5,
    phase: "V2",
    name: "H1B / Immigrant Health Guide",
    description:
      "Eligibility checker for ACA, Medicaid, CHIP by visa status. Guides for navigating employer-sponsored vs. marketplace plans.",
    status: "differentiator",
    complexity: "Medium",
  },
  {
    priority: 6,
    phase: "V3",
    name: "Rx Drug Cost Optimizer",
    description:
      "Compare drug prices across pharmacies by zip. GoodRx-style coupons. Generic alternatives shown.",
    status: "nice-to-have",
    complexity: "Medium",
  },
  {
    priority: 7,
    phase: "V3",
    name: "Medical Bill Dispute Assistant",
    description:
      "AI-guided tool to identify billing errors and draft dispute letters.",
    status: "nice-to-have",
    complexity: "High",
  },
];

const personas = [
  {
    name: "Arjun",
    tag: "H1B Software Engineer",
    age: 29,
    situation:
      "Just switched jobs, in between employer health plans. Needs to quickly understand marketplace options and what he'd pay out of pocket for an urgent care visit.",
    painPoints: [
      "Confused by plan jargon (deductible vs. OOP max)",
      "Doesn't know if he qualifies for subsidies on H1B",
      "Scared of surprise bills",
    ],
    needs: ["Insurance comparison", "Immigrant eligibility guide", "Cost estimator"],
    color: "#3B82F6",
  },
  {
    name: "Maria",
    tag: "Uninsured Gig Worker",
    age: 34,
    situation:
      "Freelance designer in Texas. No employer plan, earns too much for Medicaid but subsidies are confusing. Avoids doctors due to cost fear.",
    painPoints: [
      "No idea what a visit will cost before going",
      "Has been surprised by bills 3x",
      "Doesn't trust 'estimates'",
    ],
    needs: ["Exact cash-pay prices", "Nearby affordable clinics", "ACA plan help"],
    color: "#EC4899",
  },
  {
    name: "David",
    tag: "Insured but Confused",
    age: 52,
    situation:
      "HR manager in Ohio with employer insurance. High deductible plan — never knows what he actually owes until the EOB arrives 6 weeks later.",
    painPoints: [
      "Can't predict costs before appointments",
      "Doesn't understand EOBs",
      "Wants to compare in-network vs. out-of-network costs",
    ],
    needs: ["Deductible tracker", "Provider cost lookup", "Procedure price comparison"],
    color: "#F59E0B",
  },
];

const screens = [
  {
    name: "Home / Search",
    desc: "Zip code input + 3 quick paths: 'Find a Provider', 'Compare Plans', 'Look Up a Procedure Cost'. Clean, zero-jargon entry point.",
    elements: ["Zip input", "3 CTA cards", "Recent searches", "Trust indicators (data sources)"],
  },
  {
    name: "Provider Results",
    desc: "Map + list split view. Each card shows: name, specialty, distance, estimated visit cost (cash + insured), accepted insurances, next available slot.",
    elements: ["Map view toggle", "Cost sort filter", "Insurance filter", "Provider card", "Save to profile"],
  },
  {
    name: "Plan Comparator",
    desc: "Step-by-step wizard: enter your details → see ranked plans with projected TRUE annual cost (premium + expected OOP based on usage profile).",
    elements: ["Multi-step form", "Usage profile slider", "Plan comparison table", "Save & share"],
  },
  {
    name: "Procedure Cost Lookup",
    desc: "Search by symptom or procedure. Returns: cash price range for zip, price at specific hospitals, with-insurance estimated OOP.",
    elements: ["Symptom/CPT search", "Zip-level pricing bar", "Hospital breakdown table", "CMS data badge"],
  },
  {
    name: "User Profile & Dashboard",
    desc: "Store insurance details, deductible progress, saved providers, cost history. Optional — no account required for basic use.",
    elements: ["Deductible tracker", "Saved providers", "Plan summary card", "Cost history"],
  },
];

const apis = [
  {
    name: "CMS Price Transparency",
    use: "Hospital-specific procedure prices (federally mandated since 2021)",
    availability: "Free / Public",
    complexity: "High — raw MRF files need parsing",
  },
  {
    name: "Healthcare.gov / HealthSherpa API",
    use: "ACA plan data, subsidy eligibility, plan comparison",
    availability: "Free (gov) / Paid (HealthSherpa)",
    complexity: "Medium",
  },
  {
    name: "Google Maps / Mapbox",
    use: "Provider map, distance, directions",
    availability: "Paid",
    complexity: "Low",
  },
  {
    name: "NPI Registry (NPPES)",
    use: "Provider database — name, specialty, address",
    availability: "Free / Public",
    complexity: "Low",
  },
  {
    name: "GoodRx API",
    use: "Drug pricing by pharmacy and zip",
    availability: "Partnership required",
    complexity: "Low (once approved)",
  },
  {
    name: "Amino / Ribbon Health",
    use: "Enriched provider data — cost, quality, insurance accepted",
    availability: "Paid B2B",
    complexity: "Low (well-documented)",
  },
];

const mvpChecklist = [
  { category: "Research", items: ["Validate CMS price transparency data quality for 5 metro zip codes", "Interview 5 uninsured or H1B users about their #1 pain", "Competitive audit: Turquoise Health, Ribbon, Healthcare Bluebook"] },
  { category: "Design", items: ["Wireframes for 5 key screens", "Design system: colors, type, components", "Usability test with 3 target users", "Accessibility audit (WCAG 2.1 AA)"] },
  { category: "Data Pipeline", items: ["Parse CMS MRF files for 10 pilot zip codes", "Stand up NPI provider database", "Healthcare.gov API integration for plan data", "Zip-code normalization layer"] },
  { category: "Product", items: ["Provider search with cost sort (MVP feature #1)", "Basic plan comparator wizard", "Cash vs. insured price lookup", "Mobile-responsive web app (no native app yet)"] },
  { category: "Legal / Trust", items: ["Data source citations on every price shown", "Disclaimer: prices are estimates unless CMS-sourced", "Privacy policy (HIPAA considerations)", "Terms of service"] },
];

const statusColors = {
  "must-have": { bg: "#DCFCE7", text: "#166534", label: "Must Have" },
  "high-value": { bg: "#DBEAFE", text: "#1E40AF", label: "High Value" },
  "differentiator": { bg: "#F3E8FF", text: "#6B21A8", label: "Differentiator" },
  "nice-to-have": { bg: "#F1F5F9", text: "#475569", label: "Nice to Have" },
};

export default function DesignSpec() {
  const [active, setActive] = useState("overview");
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (key) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalItems = mvpChecklist.reduce((a, c) => a + c.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#F8FAFC", minHeight: "100vh", display: "flex" }}>
      {/* Sidebar */}
      <div style={{
        width: 220, background: "#0F172A", color: "#fff", padding: "32px 0",
        display: "flex", flexDirection: "column", gap: 4, flexShrink: 0,
        position: "sticky", top: 0, height: "100vh", overflowY: "auto"
      }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1E293B" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#64748B", textTransform: "uppercase", marginBottom: 6 }}>Design Spec</div>
          <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2, color: "#00C49A" }}>ClearCare</div>
          <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>Healthcare Affordability Platform</div>
        </div>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            style={{
              background: active === s.id ? "#1E293B" : "transparent",
              border: "none", color: active === s.id ? "#fff" : "#94A3B8",
              padding: "10px 20px", textAlign: "left", cursor: "pointer",
              fontSize: 13, display: "flex", alignItems: "center", gap: 10,
              borderLeft: active === s.id ? `3px solid ${s.color}` : "3px solid transparent",
              transition: "all 0.15s",
            }}
          >
            <span>{s.icon}</span> {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "40px 48px", maxWidth: 900, overflowY: "auto" }}>

        {active === "overview" && (
          <div>
            <Tag color="#00C49A">Product Overview</Tag>
            <h1 style={h1}>ClearCare — Transparent Healthcare Costs for Every American</h1>
            <p style={lead}>A web platform that makes healthcare costs genuinely knowable — not estimated — for uninsured Americans, people navigating insurance choices, and immigrants on work visas.</p>

            <Grid2>
              <InfoCard title="The Problem" accent="#EF4444">
                The US healthcare system is uniquely opaque. A CT scan can cost $400 at one facility and $4,000 at another across the street. Patients — especially uninsured and H1B workers — make decisions blind, and are routinely surprised by bills.
              </InfoCard>
              <InfoCard title="The Solution" accent="#00C49A">
                ClearCare aggregates CMS price transparency data, NPI provider records, and ACA plan APIs to give users <strong>exact or zip-level accurate costs</strong> before they walk into any facility.
              </InfoCard>
            </Grid2>

            <SectionTitle>Core Value Propositions</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["🔍 Find nearby providers, sorted by actual cost — not just distance or rating"],
                ["📊 Compare insurance plans with TRUE projected annual cost (not just premium)"],
                ["💵 See cash price vs. insured price for any procedure, by zip code"],
                ["🏥 Access CMS-mandated hospital price files — exact prices, not guesses"],
                ["🌐 Dedicated guidance for H1B / immigrant workers navigating US health coverage"],
              ].map(([v], i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 18px", fontSize: 14, color: "#1E293B" }}>{v}</div>
              ))}
            </div>

            <SectionTitle>Market Context</SectionTitle>
            <Grid3>
              <StatCard value="27M+" label="Uninsured Americans" color="#EF4444" />
              <StatCard value="580K+" label="H1B visa holders" color="#3B82F6" />
              <StatCard value="$2,500" label="Avg. annual surprise bill" color="#F59E0B" />
            </Grid3>
          </div>
        )}

        {active === "users" && (
          <div>
            <Tag color="#3B82F6">User Personas</Tag>
            <h1 style={h1}>Who We're Designing For</h1>
            <p style={lead}>Three distinct users — all united by a common need: knowing what healthcare will actually cost before they commit.</p>
            {personas.map((p) => (
              <div key={p.name} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: 28, marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>
                    {p.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: "#0F172A" }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: p.color, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{p.tag} · Age {p.age}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, marginBottom: 16 }}>{p.situation}</p>
                <div style={{ display: "flex", gap: 24 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#94A3B8", textTransform: "uppercase", marginBottom: 8 }}>Pain Points</div>
                    {p.painPoints.map((pt, i) => (
                      <div key={i} style={{ fontSize: 13, color: "#374151", marginBottom: 6, display: "flex", gap: 8 }}>
                        <span style={{ color: "#EF4444" }}>✕</span> {pt}
                      </div>
                    ))}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#94A3B8", textTransform: "uppercase", marginBottom: 8 }}>Needs from ClearCare</div>
                    {p.needs.map((n, i) => (
                      <div key={i} style={{ fontSize: 13, color: "#374151", marginBottom: 6, display: "flex", gap: 8 }}>
                        <span style={{ color: "#00C49A" }}>✓</span> {n}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {active === "features" && (
          <div>
            <Tag color="#8B5CF6">Feature Roadmap</Tag>
            <h1 style={h1}>Features, Prioritized</h1>
            <p style={lead}>Ordered by user-validated priority. MVP = launch target. V2/V3 = post-validation.</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {Object.entries(statusColors).map(([k, v]) => (
                <span key={k} style={{ background: v.bg, color: v.text, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{v.label}</span>
              ))}
            </div>
            {features.map((f, i) => {
              const sc = statusColors[f.status];
              return (
                <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "20px 24px", marginBottom: 14, display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#0F172A", fontSize: 15, flexShrink: 0 }}>
                    {f.priority}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: "#0F172A" }}>{f.name}</span>
                      <span style={{ background: sc.bg, color: sc.text, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{sc.label}</span>
                      <span style={{ background: "#F1F5F9", color: "#64748B", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>Phase: {f.phase}</span>
                      <span style={{ background: "#FEF3C7", color: "#92400E", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>Complexity: {f.complexity}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {active === "screens" && (
          <div>
            <Tag color="#F59E0B">Key Screens</Tag>
            <h1 style={h1}>Screen-by-Screen Breakdown</h1>
            <p style={lead}>Five core screens for MVP. Each defined by purpose, content, and required UI elements.</p>
            {screens.map((s, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 14, padding: 26, marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ background: "#0F172A", color: "#fff", width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>{i + 1}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#0F172A" }}>{s.name}</div>
                </div>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, marginBottom: 14 }}>{s.desc}</p>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#94A3B8", textTransform: "uppercase", marginBottom: 8 }}>UI Elements</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {s.elements.map((el, j) => (
                    <span key={j} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", color: "#475569", fontSize: 12, padding: "4px 10px", borderRadius: 6 }}>{el}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {active === "data" && (
          <div>
            <Tag color="#EF4444">Data & APIs</Tag>
            <h1 style={h1}>Data Sources & Integrations</h1>
            <p style={lead}>The quality of ClearCare depends on the quality of its data. Here's the full stack of sources needed.</p>
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "14px 18px", marginBottom: 24, fontSize: 13, color: "#991B1B" }}>
              ⚠️ <strong>Key challenge:</strong> CMS price transparency MRF files are massive (often 5–50GB per hospital). You'll need a dedicated ETL pipeline to parse, normalize, and serve this data efficiently by zip code and CPT code.
            </div>
            {apis.map((a, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "18px 22px", marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#0F172A" }}>{a.name}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ background: "#F0FDF4", color: "#166534", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{a.availability}</span>
                    <span style={{ background: "#FEF3C7", color: "#92400E", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>Complexity: {a.complexity.split(" — ")[0]}</span>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}><strong>Used for:</strong> {a.use}</p>
                {a.complexity.includes("—") && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 6, marginBottom: 0 }}>⚠️ {a.complexity.split(" — ")[1]}</p>}
              </div>
            ))}
          </div>
        )}

        {active === "tech" && (
          <div>
            <Tag color="#06B6D4">Tech Stack</Tag>
            <h1 style={h1}>Recommended Tech Stack</h1>
            <p style={lead}>Optimized for rapid MVP delivery, data-heavy backend needs, and mobile-first frontend.</p>
            <Grid2>
              <StackCard title="Frontend" color="#06B6D4" items={[
                ["Framework", "Next.js (React) — SSR for SEO on provider pages"],
                ["Styling", "Tailwind CSS + shadcn/ui"],
                ["Maps", "Mapbox GL JS (better cost control than Google)"],
                ["State", "Zustand or React Query"],
              ]} />
              <StackCard title="Backend" color="#8B5CF6" items={[
                ["API", "Node.js + Fastify or Python FastAPI"],
                ["Auth", "Clerk or Supabase Auth (optional — no login for basic use)"],
                ["Database", "PostgreSQL (Supabase) for provider/plan data"],
                ["Search", "Elasticsearch or Typesense for fast provider search"],
              ]} />
              <StackCard title="Data Pipeline" color="#EF4444" items={[
                ["ETL", "Apache Spark or dbt for CMS MRF processing"],
                ["Storage", "AWS S3 + RDS or Supabase"],
                ["Caching", "Redis for zip-level price lookups"],
                ["Scheduling", "Prefect or Airflow for weekly data refresh"],
              ]} />
              <StackCard title="Infrastructure" color="#F59E0B" items={[
                ["Hosting", "Vercel (frontend) + Railway or Render (backend)"],
                ["CDN", "Cloudflare"],
                ["Monitoring", "Sentry + Posthog (analytics)"],
                ["CI/CD", "GitHub Actions"],
              ]} />
            </Grid2>
          </div>
        )}

        {active === "mvp" && (
          <div>
            <Tag color="#10B981">MVP Checklist</Tag>
            <h1 style={h1}>Launch Readiness Checklist</h1>
            <p style={lead}>Everything needed to ship a credible, useful MVP. Check off as you go.</p>
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "16px 22px", marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#64748B", marginBottom: 6 }}>Overall Progress</div>
                <div style={{ background: "#F1F5F9", borderRadius: 99, height: 10, overflow: "hidden" }}>
                  <div style={{ background: "#10B981", width: `${(checkedCount / totalItems) * 100}%`, height: "100%", borderRadius: 99, transition: "width 0.3s" }} />
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#10B981" }}>{checkedCount}/{totalItems}</div>
            </div>
            {mvpChecklist.map((cat) => (
              <div key={cat.category} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "20px 24px", marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#0F172A", marginBottom: 14, textTransform: "uppercase", letterSpacing: 1, fontSize: 12 }}>
                  {cat.category}
                </div>
                {cat.items.map((item) => {
                  const key = `${cat.category}:${item}`;
                  return (
                    <div
                      key={key}
                      onClick={() => toggleCheck(key)}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0",
                        borderBottom: "1px solid #F1F5F9", cursor: "pointer",
                        opacity: checkedItems[key] ? 0.5 : 1, transition: "opacity 0.2s"
                      }}
                    >
                      <div style={{
                        width: 20, height: 20, borderRadius: 6, border: checkedItems[key] ? "none" : "2px solid #CBD5E1",
                        background: checkedItems[key] ? "#10B981" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1
                      }}>
                        {checkedItems[key] && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 14, color: "#374151", textDecoration: checkedItems[key] ? "line-through" : "none", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Shared styles
const h1 = { fontSize: 28, fontWeight: 800, color: "#0F172A", margin: "8px 0 12px", lineHeight: 1.2 };
const lead = { fontSize: 16, color: "#475569", lineHeight: 1.7, marginBottom: 28 };

function Tag({ color, children }) {
  return <div style={{ display: "inline-block", background: color + "20", color, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20, marginBottom: 12 }}>{children}</div>;
}
function SectionTitle({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#94A3B8", textTransform: "uppercase", margin: "28px 0 14px" }}>{children}</div>;
}
function InfoCard({ title, accent, children }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 22, borderTop: `3px solid ${accent}` }}>
      <div style={{ fontWeight: 700, fontSize: 14, color: "#0F172A", marginBottom: 10 }}>{title}</div>
      <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, margin: 0 }}>{children}</p>
    </div>
  );
}
function Grid2({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>{children}</div>;
}
function Grid3({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>{children}</div>;
}
function StatCard({ value, label, color }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "20px", textAlign: "center" }}>
      <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>{label}</div>
    </div>
  );
}
function StackCard({ title, color, items }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 22 }}>
      <div style={{ fontWeight: 700, fontSize: 14, color, marginBottom: 14, textTransform: "uppercase", letterSpacing: 1, fontSize: 12 }}>{title}</div>
      {items.map(([k, v], i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600 }}>{k}</div>
          <div style={{ fontSize: 13, color: "#374151" }}>{v}</div>
        </div>
      ))}
    </div>
  );
}
