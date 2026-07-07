// =====================================================================
// Riyanshi Kedia — desktop OS portfolio
// Draggable multi-window manager + skill constellation (canvas).
// =====================================================================
(function () {
  "use strict";
  const root = document.documentElement;

  /* ---------------- Theme ---------------- */
  const themeToggle = document.getElementById("themeToggle");
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light"));
  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* =====================================================================
     DATA
     ===================================================================== */
  const projects = [
    { name: "Project ORBIT", badge: ["agentic ai", "green"], sub: "Agentic PE Intelligence · Dec 2024",
      tags: ["FastAPI", "GPT-4o", "MCP", "Airflow", "Pinecone", "GCP"],
      body: [
        "Production-ready agentic AI platform automating private-equity intelligence for 50 Forbes AI companies — 5,000+ docs/month at 95% extraction accuracy.",
        "Multi-agent supervisory workflow via Model Context Protocol (8 tools) using a ReAct thought→action→observation loop for transparent decisions.",
        "Dual-pipeline architecture (Pydantic + RAG/Pinecone) generating standardized 8-section PE dashboards at 94% factual accuracy.",
        "3 Airflow DAGs orchestrating 50GB+ ETL; CI/CD with 80+ pytest tests deploying to GCP Cloud Run at 99.9% uptime.",
      ], link: "#" },
    { name: "Project Meridian", badge: ["multi-agent", "blue"], sub: "Multi-Agent Trading AI · Sept 2024",
      tags: ["Next.js", "FastAPI", "GPT-4", "PostgreSQL", "GCP"],
      body: [
        "Scalable multi-agent system: 8 specialized GPT-4 agents collaborating through a 5-phase pipeline to produce fully-reasoned trade recommendations.",
        "Adversarial 3-round debate between bull/bear researchers cut single-model bias and hallucination by 40%.",
        "Real-time ETL from 4+ APIs (market, financials, news, sentiment) processing 10,000+ articles daily via Airflow.",
        "Interactive Next.js dashboard streaming the full reasoning chain, debate transcripts, and confidence scores.",
      ], link: "#" },
    { name: "Project Aurelia", badge: ["rag", "yellow"], sub: "Production RAG System · Mar 2025",
      tags: ["FastAPI", "Streamlit", "Pinecone", "Docker", "Nginx"],
      body: [
        "Production-grade Retrieval-Augmented Generation system with 4 search strategies (vector, hybrid, cross-encoder rerank, RRF) at 85%+ relevance.",
        "Dual-parser ingestion (Docling + PyMuPDF), 6 chunking strategies, and text-embedding-3-large (3072-dim) stored in Pinecone.",
        "Intelligent query routing, PII filtering (SSN/CC), and Wikipedia fallback for general knowledge.",
        "1.5–4s streaming responses behind an Nginx reverse proxy; containerized with Docker Compose.",
      ], link: "#" },
    { name: "TradeTransition", badge: ["mlops", "green"], sub: "Forecasting & MLOps · Mar 2025",
      tags: ["Scikit-learn", "Flask", "Docker", "Nginx"],
      body: [
        "End-to-end trade-forecasting & MLOps system over 2.5M+ U.S. import records (25GB) across 5 sectors.",
        "Ensemble models (Random Forest, Gradient Boosting, XGBoost) at 85% accuracy with 25+ engineered features.",
        "Flask REST API (8 endpoints, 1,000+ req/hr) behind Nginx with load balancing at 99.9% uptime.",
        "Automated monitoring of 12 metrics, Kolmogorov-Smirnov drift detection, and weekly retraining triggers.",
      ], link: "#" },
    { name: "DeepLip", badge: ["deep learning", "blue"], sub: "Audio-Visual Lip Reading · Dec 2024",
      tags: ["PyTorch", "CNN", "LSTM", "OpenCV"],
      body: [
        "Multimodal deep-learning system transcribing speech from synchronized lip motion + audio via dual-pathway CNN with late fusion.",
        "90%+ transcription accuracy on LRS2/LRS3 with a sequence-to-sequence attention decoder.",
        "3D-CNN + bidirectional LSTM for spatiotemporal lip features; trained on 15 datasets (100+ hrs) with CTC loss.",
        "Achieved a 12% WER improvement over baseline visual-only models (45% → 33%).",
      ], link: "#" },
    { name: "PDF Parser", badge: ["nlp", "yellow"], sub: "Financial Doc Extraction · Jan 2025",
      tags: ["Python", "OCR", "NLP", "DVC", "AWS S3"],
      body: [
        "Multi-engine PDF parsing (pdfplumber, Tesseract OCR, Camelot, LayoutLMv3, Google Document AI) over 10,000+ SEC filings.",
        "94% extraction accuracy across 10-K/10-Q/8-K via confidence scoring and cascading fallback selection.",
        "Human-in-the-loop review for low-confidence extractions cut manual data entry by 85%.",
        "DVC pipeline versioning 50GB+ of documents with S3 sync for a 3-person team.",
      ], link: "#" },
  ];

  const education = [
    { name: "Northeastern University", badge: ["2024–2027", "green"], sub: "MS, Information Systems · Boston, MA",
      tags: ["Data Science", "Machine Learning", "Big Data", "Databases", "Statistics"],
      body: [
        "Master of Science in Information Systems — expected May 2027.",
        "Relevant coursework: Data Science, Statistics, Machine Learning, Database Design, Big Data Analytics, Computer Science.",
      ] },
    { name: "Vellore Institute of Technology", badge: ["2020–2024", "blue"], sub: "BCA, Computer Science · Vellore, India",
      tags: ["GPA 3.73/4.0", "Rank #6 / 200+", "Merit Scholarship"],
      body: [
        "Bachelor of Computer Applications (Computer Science) — GPA 3.73/4.00, May 2024.",
        "Ranked 6th in a graduating class of 200+ students.",
        "Academic Merit Scholarship recipient (Top 8 rank, 2023–24).",
      ] },
  ];

  const experience = [
    { name: "Satguru Sai Traders", badge: ["2024", "orange"], sub: "Operations & Data Analyst · Nagpur, India",
      tags: ["Python", "Excel", "SQL", "Dashboards"],
      body: [
        "Automated invoice processing for 100+ monthly PDFs — cut manual time 70% and eliminated 95% of data-entry errors.",
        "Built a predictive Excel model over 5 years of data across 14 coal-mining sites — reduced forecasting time 60%, saving $50K+.",
        "Analyzed 10,000+ transactional records, improving supply-chain efficiency 18%.",
        "Shipped automated reporting on 15+ KPIs, cutting report generation from 8 hrs → 30 min.",
      ] },
    { name: "D.E. Shaw", badge: ["2023", "blue"], sub: "Global Analytics & Reporting Intern · Hyderabad, India",
      tags: ["Power BI", "Excel", "ETL", "Process Mining"],
      body: [
        "Analyzed 300,000+ candidate applications (2018–2022) across 12 job families and 8 regions.",
        "Designed 8 automated Power BI dashboards, saving 40 hours/month of manual reporting.",
        "Reduced hiring turnaround time 33% (45 → 30 days), impacting 5,000+ annual hires.",
        "A/B tested recruiting strategies across 3 offices, lifting offer-acceptance rates 15%.",
      ] },
    { name: "Leadership & Activities", badge: ["ongoing", "green"], sub: "Beyond the code",
      tags: ["Ops", "Leadership", "Sport"],
      body: [
        "Head of Logistics & Operations, VIT Techfest GraVITas — led 20+ people, $50K+ budget across 30+ events.",
        "Vice-Captain, VIT Women's Tennis Team — 4-time State Championship representative, managed 12 athletes.",
        "Head of Delegate Affairs, Model UN — coordinated logistics for 200+ participants across a 3-day conference.",
      ] },
  ];

  /* =====================================================================
     APP DEFINITIONS
     ===================================================================== */
  const badgeHTML = (b) => `<span class="badge badge--${b[1]}">${b[0]}</span>`;
  const tagsHTML = (t) => `<ul class="tags">${t.map((x) => `<li>${x}</li>`).join("")}</ul>`;

  function detailHTML(item, withLink) {
    return `
      <div class="detail__head">
        <h3>${item.name}</h3>${badgeHTML(item.badge)}
      </div>
      <p class="detail__sub">${item.sub}</p>
      ${tagsHTML(item.tags)}
      <ul class="detail__list">${item.body.map((p) => `<li>${p}</li>`).join("")}</ul>
      ${withLink && item.link ? `<a href="${item.link}" class="link-arrow">View code →</a>` : ""}`;
  }

  function explorerApp(items, withLink) {
    return {
      render() {
        const list = items
          .map((it, i) => `<button class="ex-item${i === 0 ? " is-active" : ""}" data-i="${i}">
              <span class="ex-item__dot ex-item__dot--${it.badge[1]}"></span>
              <span class="ex-item__name">${it.name}</span>
              <span class="ex-item__meta">${it.badge[0]}</span>
            </button>`).join("");
        return `<div class="explorer">
            <aside class="explorer__list">${list}</aside>
            <div class="explorer__detail" data-detail>${detailHTML(items[0], withLink)}</div>
          </div>`;
      },
      onMount(win) {
        const detail = win.querySelector("[data-detail]");
        win.querySelectorAll(".ex-item").forEach((btn) => {
          btn.addEventListener("click", () => {
            win.querySelectorAll(".ex-item").forEach((b) => b.classList.remove("is-active"));
            btn.classList.add("is-active");
            detail.innerHTML = detailHTML(items[+btn.dataset.i], withLink);
            detail.scrollTop = 0;
          });
        });
      },
    };
  }

  const APPS = {
    home: {
      title: "home.mdx", w: 720, h: 0,
      render: () => `
        <div class="app-pad hero">
          <p class="eyebrow">// data scientist &amp; ai engineer</p>
          <h1 class="hero__title">Hi, I'm <span class="hl hl--orange">Riyanshi Kedia</span>.<br>I build AI systems that <span class="hl hl--blue">actually ship</span>.</h1>
          <p class="hero__sub">Master's student at Northeastern building agentic AI, RAG, and ML pipelines end-to-end — from messy data to production deploy.</p>
          <div class="hero__cta">
            <button class="btn btn--primary" data-open="projects">See my work →</button>
            <button class="btn btn--ghost" data-open="skills">Explore my skills ✦</button>
          </div>
          <div class="card card--dark editor hero__card">
            <div class="editor__bar"><span class="editor__dot"></span><span class="editor__dot"></span><span class="editor__dot"></span><span class="editor__file">whoami.ts</span></div>
            <pre class="editor__body"><code><span class="c-key">const</span> <span class="c-var">me</span> = {
  <span class="c-prop">name</span>: <span class="c-str">"Riyanshi Kedia"</span>,
  <span class="c-prop">role</span>: <span class="c-str">"Data Scientist &amp; AI Engineer"</span>,
  <span class="c-prop">stack</span>: [<span class="c-str">"Python"</span>, <span class="c-str">"PyTorch"</span>, <span class="c-str">"FastAPI"</span>],
  <span class="c-prop">based</span>: <span class="c-str">"Boston, MA 🇺🇸"</span>,
  <span class="c-prop">focus</span>: [<span class="c-str">"Agentic AI"</span>, <span class="c-str">"RAG"</span>, <span class="c-str">"MLOps"</span>],
  <span class="c-prop">shipsFast</span>: <span class="c-bool">true</span>,
};
<span class="c-fn">console</span>.log(<span class="c-var">me</span>.<span class="c-prop">name</span>); <span class="c-com">// let's build →</span></code></pre>
          </div>
        </div>`,
    },
    projects: Object.assign({ title: "projects/", w: 860, h: 600 }, explorerApp(projects, true)),
    education: Object.assign({ title: "education/", w: 820, h: 520 }, explorerApp(education, false)),
    experience: Object.assign({ title: "experience.log", w: 840, h: 560 }, explorerApp(experience, false)),
    contact: {
      title: "contact.sh", w: 620, h: 0,
      render: () => `
        <div class="app-pad">
          <div class="cta card card--accent">
            <span class="section__file section__file--onDark">contact.sh</span>
            <h2 class="cta__title">Let's build something.</h2>
            <p class="cta__sub">Looking for an internship or new-grad role, or have a project in mind? I read everything and reply to almost all of it.</p>
            <div class="cta__actions">
              <a href="mailto:riyanshibnkedia@gmail.com" class="btn btn--dark">riyanshibnkedia@gmail.com</a>
              <a href="Riyanshi_Kedia_Resume.pdf" class="btn btn--ghost btn--ghost-onDark" target="_blank" rel="noopener">Download CV</a>
            </div>
            <div class="cta__socials">
              <a href="https://github.com/riyanshikedia" target="_blank" rel="noopener">GitHub</a><span>·</span>
              <a href="https://linkedin.com/in/riyanshikedia" target="_blank" rel="noopener">LinkedIn</a><span>·</span>
              <a href="mailto:riyanshibnkedia@gmail.com">Email</a><span>·</span>
              <a href="tel:+16173960802">Call</a>
            </div>
          </div>
        </div>`,
    },
    skills: {
      title: "skills.viz", w: 900, h: 620, dark: true,
      render: () => `
        <div class="galaxy">
          <canvas class="constellation"></canvas>
          <div class="galaxy__title"><span>skills.viz</span><small>everything I build with — hover a star</small></div>
          <div class="galaxy__legend">
            <strong>DISCIPLINES</strong>
            <span><i style="background:#7FD98F"></i> AI / ML</span>
            <span><i style="background:#E7B24C"></i> Data Engineering</span>
            <span><i style="background:#D9756B"></i> Analytics &amp; Viz</span>
            <span><i style="background:#6FA8FF"></i> Languages</span>
          </div>
        </div>`,
      onMount: (win) => initConstellation(win),
      onDestroy: (win) => {
        if (win._raf) cancelAnimationFrame(win._raf);
        if (win._onResize) window.removeEventListener("resize", win._onResize);
      },
    },
  };

  /* =====================================================================
     WINDOW MANAGER
     ===================================================================== */
  const taskbar = document.getElementById("taskbar");
  const deskHint = document.getElementById("deskHint");
  const openWindows = new Map();
  let zTop = 200;
  let opened = 0;

  function focusWin(win) { win.style.zIndex = ++zTop; }

  function openApp(id) {
    if (deskHint) deskHint.style.display = "none";
    if (openWindows.has(id)) {
      const win = openWindows.get(id);
      win.style.display = "flex";
      win.dataset.min = "";
      focusWin(win);
      updateTaskbar();
      return;
    }
    const app = APPS[id];
    if (!app) return;
    const win = document.createElement("section");
    win.className = "win" + (app.dark ? " win--dark" : "");
    win.dataset.app = id;

    const isMobile = window.innerWidth <= 720;
    win.style.width = isMobile ? "" : app.w + "px";
    if (app.h && !isMobile) win.style.height = app.h + "px";
    const off = (opened % 6) * 30;
    win.style.left = isMobile ? "" : Math.max(120, (window.innerWidth - app.w) / 2 - 60 + off) + "px";
    win.style.top = isMobile ? "" : 70 + off + "px";
    win.style.zIndex = ++zTop;
    opened++;

    win.innerHTML = `
      <header class="win__bar">
        <span class="window-dots" aria-hidden="true"><span class="dot dot--red" data-ctl="close"></span><span class="dot dot--yellow" data-ctl="min"></span><span class="dot dot--green" data-ctl="max"></span></span>
        <span class="win__title">${app.title}</span>
        <span class="win__ctls"><button class="win__ctl" data-ctl="min" aria-label="Minimize">–</button><button class="win__ctl" data-ctl="max" aria-label="Maximize">▢</button><button class="win__ctl" data-ctl="close" aria-label="Close">✕</button></span>
      </header>
      <div class="win__body">${app.render()}</div>`;

    document.body.appendChild(win);
    openWindows.set(id, win);

    // controls
    win.querySelectorAll('[data-ctl]').forEach((el) => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const act = el.dataset.ctl;
        if (act === "close") closeApp(id);
        else if (act === "min") { win.style.display = "none"; win.dataset.min = "1"; updateTaskbar(); }
        else if (act === "max") toggleMax(win);
      });
    });

    win.addEventListener("pointerdown", () => focusWin(win));
    makeDraggable(win, win.querySelector(".win__bar"));
    if (app.onMount) app.onMount(win);
    updateTaskbar();
  }

  function closeApp(id) {
    const win = openWindows.get(id);
    if (!win) return;
    const app = APPS[id];
    if (app.onDestroy) app.onDestroy(win);
    win.remove();
    openWindows.delete(id);
    updateTaskbar();
  }

  function toggleMax(win) {
    if (win.dataset.max === "1") {
      win.dataset.max = "";
      win.style.left = win._px; win.style.top = win._py;
      win.style.width = win._pw; win.style.height = win._ph;
      win.classList.remove("is-max");
    } else {
      win._px = win.style.left; win._py = win.style.top;
      win._pw = win.style.width; win._ph = win.style.height;
      win.dataset.max = "1";
      win.classList.add("is-max");
      win.style.left = ""; win.style.top = ""; win.style.width = ""; win.style.height = "";
    }
    // let canvas resize
    window.dispatchEvent(new Event("resize"));
  }

  function makeDraggable(win, handle) {
    let sx, sy, ox, oy, drag = false;
    handle.addEventListener("pointerdown", (e) => {
      if (e.target.closest("[data-ctl]") || win.classList.contains("is-max")) return;
      drag = true;
      const r = win.getBoundingClientRect();
      ox = r.left; oy = r.top; sx = e.clientX; sy = e.clientY;
      win.classList.add("is-dragging");
      handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener("pointermove", (e) => {
      if (!drag) return;
      let nx = ox + (e.clientX - sx), ny = oy + (e.clientY - sy);
      ny = Math.max(48, Math.min(ny, window.innerHeight - 60));
      nx = Math.max(-win.offsetWidth + 90, Math.min(nx, window.innerWidth - 90));
      win.style.left = nx + "px"; win.style.top = ny + "px";
    });
    const end = () => { drag = false; win.classList.remove("is-dragging"); };
    handle.addEventListener("pointerup", end);
    handle.addEventListener("pointercancel", end);
  }

  function updateTaskbar() {
    taskbar.innerHTML = "";
    openWindows.forEach((win, id) => {
      const btn = document.createElement("button");
      btn.className = "taskbar__item" + (win.dataset.min === "1" ? " is-min" : "");
      btn.textContent = APPS[id].title;
      btn.addEventListener("click", () => {
        if (win.dataset.min === "1" || win.style.display === "none") {
          win.style.display = "flex"; win.dataset.min = ""; focusWin(win);
        } else if (win.style.zIndex == zTop) {
          win.style.display = "none"; win.dataset.min = "1";
        } else focusWin(win);
        updateTaskbar();
      });
      taskbar.appendChild(btn);
    });
    taskbar.style.display = openWindows.size ? "flex" : "none";
  }

  // wire every [data-open] trigger (menubar, docks, in-app buttons via delegation)
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open]");
    if (trigger) { e.preventDefault(); openApp(trigger.dataset.open); }
  });

  // open Home on load
  window.addEventListener("load", () => openApp("home"));

  /* =====================================================================
     SKILL CONSTELLATION (canvas)
     ===================================================================== */
  function initConstellation(win) {
    const canvas = win.querySelector(".constellation");
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const DISC = [
      { key: "AI / ML", color: "#7FD98F", skills: ["PyTorch", "TensorFlow", "GPT-4o", "RAG", "LangChain", "MCP", "CNN / LSTM", "Multi-Agent", "NLP", "Prophet", "Scikit-learn"] },
      { key: "DATA ENG", color: "#E7B24C", skills: ["Airflow", "Docker", "FastAPI", "GCP", "PostgreSQL", "CI/CD", "Pinecone", "MLOps", "ETL", "AWS S3"] },
      { key: "ANALYTICS", color: "#D9756B", skills: ["Power BI", "Pandas", "NumPy", "Streamlit", "Matplotlib", "SPSS", "Statistics", "Excel", "Plotly"] },
      { key: "LANGUAGES", color: "#6FA8FF", skills: ["Python", "SQL", "Java", "R", "C++", "JavaScript", "PHP"] },
    ];

    let W, H, cx, cy, hub, nodes, stars, t = 0;
    let mx = -1, my = -1;

    function build() {
      cx = W / 2; cy = H * 0.52;
      hub = { x: cx, y: cy, r: 26, label: "RK", color: "#EDE7D6" };
      nodes = [];
      const dR = Math.min(W, H) * 0.24;                 // discipline ring radius
      DISC.forEach((d, di) => {
        const a = (-Math.PI / 2) + (di / DISC.length) * Math.PI * 2;
        const dx = cx + Math.cos(a) * dR;
        const dy = cy + Math.sin(a) * dR * 0.82;
        const disc = { x: dx, y: dy, r: 20, label: d.key, color: d.color, disc: true, a0: a };
        nodes.push(disc);
        d.skills.forEach((s, si) => {
          const ring = 1 + (si % 3);
          const sa = a + (si - d.skills.length / 2) * 0.32;
          const rad = 46 + ring * 26 + (si % 2) * 10;
          nodes.push({
            parent: disc, base: sa, rad, ring,
            speed: 0.0006 * (1 + (si % 3) * 0.4) * (si % 2 ? 1 : -1),
            r: 4 + (2 - Math.abs(ring - 2)) * 1.6,
            label: s, color: d.color,
          });
        });
        // dust
        for (let k = 0; k < 22; k++) {
          nodes.push({
            parent: disc, base: a + (Math.random() - 0.5) * 1.6,
            rad: 40 + Math.random() * 120, ring: 0,
            speed: (Math.random() - 0.5) * 0.0004,
            r: Math.random() * 1.8 + 0.5, color: d.color, dust: true,
          });
        }
      });
      stars = Array.from({ length: 140 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.3 + 0.2, tw: Math.random() * Math.PI * 2,
      }));
    }

    function size() {
      const r = canvas.parentElement.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    canvas.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
    });
    canvas.addEventListener("pointerleave", () => { mx = my = -1; });

    function pos(n) {
      if (!n.parent) return n;
      const ang = n.base + t * n.speed;
      return { x: n.parent.x + Math.cos(ang) * n.rad, y: n.parent.y + Math.sin(ang) * n.rad };
    }

    function draw() {
      t += 1;
      ctx.clearRect(0, 0, W, H);

      // faint radial grid
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) { ctx.beginPath(); ctx.arc(cx, cy, i * Math.min(W, H) * 0.11, 0, Math.PI * 2); ctx.stroke(); }

      // stars
      stars.forEach((s) => {
        const a = 0.4 + Math.sin(t * 0.02 + s.tw) * 0.35;
        ctx.globalAlpha = Math.max(0, a); ctx.fillStyle = "#cfd3e0";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;

      // discipline → hub links
      nodes.filter((n) => n.disc).forEach((d) => {
        ctx.strokeStyle = hexA(d.color, 0.25); ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(hub.x, hub.y); ctx.lineTo(d.x, d.y); ctx.stroke();
      });

      // skill/dust nodes + links to their discipline
      let hover = null;
      nodes.forEach((n) => {
        if (n.disc || !n.parent) return;
        const p = pos(n);
        n._x = p.x; n._y = p.y;
        if (!n.dust) {
          ctx.strokeStyle = hexA(n.color, 0.12); ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(n.parent.x, n.parent.y); ctx.lineTo(p.x, p.y); ctx.stroke();
        }
        const hit = mx > 0 && (mx - p.x) ** 2 + (my - p.y) ** 2 < 90;
        if (hit && !n.dust) hover = n;
        const rr = n.r * (hit ? 1.8 : 1);
        // glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rr * 3.5);
        g.addColorStop(0, hexA(n.color, n.dust ? 0.5 : 0.9));
        g.addColorStop(1, hexA(n.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, rr * 3.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = n.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, rr, 0, Math.PI * 2); ctx.fill();
        // label for named skills
        if (!n.dust && (n.ring !== 3 || hit)) {
          ctx.globalAlpha = hit ? 1 : 0.72;
          ctx.fillStyle = hit ? "#fff" : "#c9cdd8";
          ctx.font = (hit ? "600 " : "") + "11px 'Source Code Pro', monospace";
          ctx.fillText(n.label, p.x + rr + 5, p.y + 3);
          ctx.globalAlpha = 1;
        }
      });

      // discipline nodes
      nodes.filter((n) => n.disc).forEach((d) => {
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 2.4);
        g.addColorStop(0, hexA(d.color, 0.85)); g.addColorStop(1, hexA(d.color, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x, d.y, d.r * 2.4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = hexA(d.color, 0.92); ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#1a1a1a"; ctx.font = "700 11px 'IBM Plex Sans', sans-serif";
        ctx.textAlign = "center"; ctx.fillText(d.label, d.x, d.y + 4); ctx.textAlign = "left";
      });

      // hub
      const hg = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, hub.r * 2.6);
      hg.addColorStop(0, "rgba(255,255,255,0.9)"); hg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(hub.x, hub.y, hub.r * 2.6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#EDE7D6"; ctx.beginPath(); ctx.arc(hub.x, hub.y, hub.r, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#1a1a1a"; ctx.font = "700 15px 'IBM Plex Sans', sans-serif";
      ctx.textAlign = "center"; ctx.fillText(hub.label, hub.x, hub.y + 5); ctx.textAlign = "left";

      canvas.style.cursor = hover ? "pointer" : "default";
      win._raf = requestAnimationFrame(draw);
    }

    const onResize = () => size();
    window.addEventListener("resize", onResize);
    win._onResize = onResize;
    size();
    draw();
  }

  function hexA(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }
})();
