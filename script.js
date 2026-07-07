// =====================================================================
// Riyanshi Kedia — clean portfolio
// Renders content + scroll-reveal animations.
// =====================================================================
(function () {
  "use strict";
  const GH = "https://github.com/riyanshikedia10";

  /* ---------------- Featured projects ---------------- */
  const featured = [
    { name: "Project ORBIT", tag: "Agentic AI", year: "2024",
      desc: "Production agentic AI platform automating private-equity intelligence for 50 Forbes AI companies — a multi-agent MCP workflow with ReAct reasoning, 5,000+ docs/month at 95% accuracy.",
      stack: ["FastAPI", "GPT-4o", "MCP", "Airflow", "Pinecone"], link: GH + "/project_orbit" },
    { name: "Project Meridian", tag: "Multi-agent", year: "2024",
      desc: "Multi-agent trading intelligence — 8 GPT-4 agents across a 5-phase pipeline with an adversarial debate loop that cut hallucination 40%. Streaming Next.js reasoning dashboard.",
      stack: ["Next.js", "FastAPI", "GPT-4", "GCP"], link: GH + "/project-meridian" },
    { name: "Project Aurelia", tag: "RAG", year: "2025",
      desc: "Production-grade RAG microservice with 4 search strategies, cross-encoder reranking, and PII filtering — 85%+ relevance, 1.5–4s streaming responses behind Nginx.",
      stack: ["FastAPI", "Pinecone", "Docker", "Nginx"], link: GH + "/project-aurelia" },
    { name: "TradeTransition", tag: "MLOps", year: "2025",
      desc: "End-to-end forecasting & MLOps over 2.5M+ trade records — ensemble models at 85% accuracy with drift detection and automated weekly retraining.",
      stack: ["Scikit-learn", "Flask", "Docker"], link: GH + "/TradeTransition" },
    { name: "DeepLip", tag: "Deep learning", year: "2024",
      desc: "Multimodal audio-visual lip-reading (visual + audio CNN, late fusion) reaching 90%+ transcription on LRS2/LRS3 — a 12% WER improvement over baseline.",
      stack: ["PyTorch", "CNN", "LSTM", "OpenCV"], link: GH + "/DeepLip" },
    { name: "PDF Parser", tag: "NLP", year: "2025",
      desc: "Multi-engine financial-document extraction (pdfplumber, Tesseract, LayoutLMv3) at 94% accuracy across 10-K/10-Q filings, cutting manual entry 85% with HITL review.",
      stack: ["Python", "OCR", "NLP", "DVC"], link: GH + "/pdf-parser" },
  ];

  /* ---------------- Remaining repos ---------------- */
  const more = [
    { name: "Investment Report Extractor", desc: "Airflow-orchestrated crawler over 15+ financial sites, 5,000+ docs/month", link: GH + "/investment-report-extractor" },
    { name: "SmartPortfolio AI", desc: "Stock selection & return prediction across 500+ S&P 500 equities", link: GH + "/smartportfolio" },
    { name: "HRGraph", desc: "KaLLM workshop @ ACL 2024 — LLM knowledge graphs", link: GH + "/HRGraph" },
    { name: "Python MCP Demo", desc: "Hands-on Model Context Protocol demo in Python", link: GH + "/python-mcp-demo" },
    { name: "Prismiq", desc: "Python project", link: GH + "/Prismiq" },
    { name: "DataBI", desc: "Business-intelligence analysis notebooks", link: GH + "/DataBI" },
    { name: "Food Inspection DataBI", desc: "BI analysis of food-inspection datasets", link: GH + "/Food_Inspection_DataBI" },
    { name: "DMDD — Group 1", desc: "Data Modeling & Database Design project", link: GH + "/DMDD_Group-1" },
    { name: "Group Lab · Team 11", desc: "Java team lab project", link: GH + "/Group_Lab_1_Team_11" },
  ];

  /* ---------------- Skills ---------------- */
  const skills = [
    { group: "AI / Machine Learning", items: ["PyTorch", "TensorFlow", "Scikit-learn", "GPT-4o / LLMs", "RAG", "LangChain", "MCP", "Multi-Agent Systems", "CNN / LSTM", "NLP", "Computer Vision", "Prophet"] },
    { group: "Data Engineering & MLOps", items: ["Apache Airflow", "FastAPI", "Flask", "Docker", "CI/CD", "GitHub Actions", "GCP", "AWS S3", "Pinecone", "PostgreSQL", "ETL", "DVC"] },
    { group: "Analytics & Visualization", items: ["Power BI", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Streamlit", "SPSS", "Excel", "Statistics"] },
    { group: "Languages", items: ["Python", "SQL", "Java", "R", "C", "C++", "JavaScript", "PHP"] },
  ];

  /* ---------------- Experience + education ---------------- */
  const rows = [
    { role: "Operations & Data Analyst", org: "Satguru Sai Traders", place: "Nagpur, India", date: "2024",
      desc: "Automated invoice processing (−70% time), built predictive models across 14 sites saving $50K+, and shipped KPI dashboards cutting reporting 8 hrs → 30 min." },
    { role: "Global Analytics & Reporting Intern", org: "D.E. Shaw", place: "Hyderabad, India", date: "2023",
      desc: "Analyzed 300,000+ applications in Power BI, built 8 automated dashboards saving 40 hrs/month, and cut hiring turnaround 33%, impacting 5,000+ annual hires." },
    { role: "MS, Information Systems", org: "Northeastern University", place: "Boston, MA", date: "2024–27",
      desc: "Data Science, Machine Learning, Big Data Analytics, Database Design, Statistics.", edu: true },
    { role: "BCA, Computer Science", org: "Vellore Institute of Technology", place: "Vellore, India", date: "2020–24",
      desc: "GPA 3.73/4.0 · Ranked 6th of 200+ graduates · Academic Merit Scholarship.", edu: true },
  ];

  /* =====================================================================
     RENDER
     ===================================================================== */
  const esc = (s) => s.replace(/&/g, "&amp;");

  document.getElementById("workGrid").innerHTML = featured.map((p, i) => `
    <a class="card reveal" style="--d:${(i % 2) * 60}ms" href="${p.link}" target="_blank" rel="noopener">
      <div class="card__top">
        <span class="card__tag">${p.tag}</span>
        <span class="card__year">${p.year}</span>
      </div>
      <h3 class="card__name">${esc(p.name)}</h3>
      <p class="card__desc">${esc(p.desc)}</p>
      <div class="card__foot">
        <ul class="chips">${p.stack.map((s) => `<li>${s}</li>`).join("")}</ul>
        <span class="card__link">View code ↗</span>
      </div>
    </a>`).join("");

  document.getElementById("moreList").innerHTML = more.map((m) => `
    <li class="reveal"><a href="${m.link}" target="_blank" rel="noopener">
      <span class="more__name">${esc(m.name)}</span>
      <span class="more__desc">${esc(m.desc)}</span>
      <span class="more__arrow">↗</span>
    </a></li>`).join("");

  document.getElementById("skillsGrid").innerHTML = skills.map((s) => `
    <div class="skill reveal">
      <h3 class="skill__group">${esc(s.group)}</h3>
      <ul class="skill__items">${s.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
    </div>`).join("");

  document.getElementById("expList").innerHTML = rows.map((r) => `
    <div class="row reveal">
      <div class="row__date">${r.date}${r.edu ? '<span class="row__badge">edu</span>' : ""}</div>
      <div class="row__main">
        <h3 class="row__role">${esc(r.role)}</h3>
        <p class="row__org">${esc(r.org)} · <span>${esc(r.place)}</span></p>
        <p class="row__desc">${esc(r.desc)}</p>
      </div>
    </div>`).join("");

  /* =====================================================================
     INTERACTIONS
     ===================================================================== */
  // scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // active nav link
  const navLinks = [...document.querySelectorAll(".nav__links a")];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => spy.observe(s));

  // shrink nav on scroll
  const nav = document.querySelector(".nav");
  addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 20), { passive: true });

  document.getElementById("toTop").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  document.getElementById("year").textContent = new Date().getFullYear();
})();
