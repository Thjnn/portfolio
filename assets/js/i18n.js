/* =========================================================
   CAO PHUC THINH — PORTFOLIO
   i18n.js — chuyển đổi song ngữ Việt / English.
   Tiếng Việt là nguồn gốc (nằm sẵn trong HTML), dưới đây chỉ là bản EN.
   Chạy SAU main.js để bắt được phần tiêu đề hero đã tách ký tự.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const EN = {
    "nav.about": "About",
    "nav.timeline": "Journey",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.cv": "Download CV",

    "hero.eyebrow": "Web Developer · Tien Giang University",
    "hero.status":
      '<span class="status-dot"></span> Open to Internship / Fresher roles — available now',
    "hero.greeting": "Hi, I'm",
    "hero.subtitle":
      "Third-year Web Development student — building products that are <strong>clean, fast and technically deep</strong>, from complex backends to striking motion interfaces.",
    "hero.viewProjects": "View projects",
    "hero.cv": "Download CV",
    "hero.stat1": "AI integrations in ZomZop",
    "hero.stat2": "Years using Git & GitHub",
    "hero.stat3": "Projects on GitHub",
    "hero.badge": "21 tables · Gemini AI · Realtime",

    "kpi.heading": "The <strong>ZomZop</strong> graduation project in numbers",
    "kpi.l1": "Database tables",
    "kpi.l2": "Permission roles",
    "kpi.l3": "AI features (menu suggestions & face recognition)",
    "kpi.l4": "Laravel Reverb & PWA support",

    "about.tag": "01 — About",
    "about.role": "Web Developer · Tien Giang, Vietnam",
    "about.h2":
      "Combining systems thinking with<br /> an eye for interface aesthetics.",
    "about.p1":
      "I'm Thinh, a third-year Information Technology student at Tien Giang University. I focus on two parallel tracks: building solid backends with Laravel/MySQL, and crafting motion-rich, emotional frontends with GSAP.",
    "about.p2":
      "My graduation project <strong>ZomZop</strong> — a multi-branch fast-food ordering system — reflects how I approach problems: breaking a large task (21 tables, 6 roles, face-recognition attendance, AI menu suggestions) into manageable pieces.",
    "about.now.t": "Now",
    "about.now.d": "Finishing the backend of my ZomZop graduation project",
    "about.pass.t": "Passion",
    "about.pass.d": "Cinematic UI, scroll animation, 3D on the web",
    "about.learn.t": "Learning",
    "about.learn.d": "Operating systems, A* search AI, Android development",

    "timeline.tag": "02 — Journey",
    "timeline.h2": "Education & experience.",
    "tl.e1.t": "Tien Giang University — Information Technology",
    "tl.e1.d":
      "Started the IT bachelor program, focusing on programming fundamentals, databases and web development.",
    "tl.e2.t": "Petio — Pet care website",
    "tl.e2.d":
      "A multi-page project in vanilla HTML/CSS/JS: shop, spa booking, blog, login. Sharpening frontend fundamentals.",
    "tl.e3.t": "UniStyle — Sales management system",
    "tl.e3.d":
      "Built a full admin dashboard with PHP/MySQL, designing an 18-table database: orders, inventory, promotions, banners.",
    "tl.e4.t": "ZomZop — Graduation project",
    "tl.e4.d":
      "A multi-branch ordering system with Laravel 13, Gemini AI, Laravel Reverb realtime, face-recognition attendance, PWA.",
    "tl.expected": "(expected)",
    "tl.e5.t": "Graduation & work",
    "tl.e5.d":
      "Ready for an Internship / Fresher Web Developer role, eager to learn in a real-world environment.",
    "tl.note": "* Dates are illustrative — please adjust them to be accurate.",

    "skills.tag": "03 — Skills",
    "skills.h2": "The tools I use to turn ideas into products.",
    "skill3.h": "AI & device integration",
    "skill3.p": "Gemini API, face-api.js, real-time face recognition",
    "skill4.h": "Tools & workflow",
    "skill4.p": "Git/GitHub, PWA, Mermaid ERD, basic Figma",
    "skill5.h": "Coding with AI",
    "skill5.p":
      "Using Claude & AI coding assistants to speed up development, debug and learn new tech effectively",

    "projects.tag": "04 — Projects",
    "projects.h2": "A few projects I've built.",
    "proj1.p":
      "A multi-branch fast-food ordering system — my graduation project. Laravel 13, MySQL, Gemini AI menu suggestions, Laravel Reverb realtime, face-recognition attendance, PWA support.",
    "proj2.p":
      "A sales management system and website for a stationery & fashion store — managing orders, inventory, promotions and ad banners on a full admin dashboard, with an 18-table ERD.",
    "proj3.p":
      "A pet shop & grooming website — a multi-page site with shop, spa booking, blog, sign in/up and contact, built entirely in vanilla HTML/CSS/JS.",
    "proj.github": "View on GitHub",
    "proj.case": "View case study",
    "proj.demo": "Live demo",

    "case.tag": "05 — Case study",
    "case.h2": "ZomZop — from a big problem to a working system.",
    "case.problem.t": "Problem",
    "case.problem.d":
      "A fast-food chain needs to manage multiple branches and roles (owner, manager, cashier, kitchen, shipper, customer), with instant order updates and transparent staff attendance.",
    "case.solution.t": "Solution",
    "case.solution.d":
      "Split the system into clear roles & modules; use Laravel Reverb to push order status in realtime; integrate Gemini AI for menu suggestions and face-api.js for face-based attendance; ship it as a PWA.",
    "case.arch.t": "Architecture",
    "case.arch.d":
      "A 21-table database designed with an ERD (Mermaid); Laravel 13 + MySQL for backend & REST API; queues & websockets for realtime; 6 roles secured via middleware.",
    "case.result.t": "Result",
    "case.result.d":
      "A complete system for the graduation project: realtime ordering, AI suggestions, automated attendance — proving the ability to decompose and own a complex problem end to end.",

    "contact.tag": "06 — Contact",
    "contact.h2": "Let's talk about your next project.",
    "contact.text":
      "I'm always happy to chat about internships, freelance projects, or simply frontend animation.",
    "contact.cv": "Download CV (PDF)",

    "footer.top": "Back to top ↑",
  };

  const nodes = document.querySelectorAll("[data-i18n]");
  // Lưu bản tiếng Việt gốc (đã render)
  nodes.forEach((el) => {
    el.dataset.viHtml = el.innerHTML;
  });

  // Tiêu đề hero đã bị main.js tách thành các <span> ký tự (mang inline
  // opacity:0 của GSAP). Lưu bản tiếng Việt dưới dạng TEXT thuần để khi
  // chuyển ngôn ngữ không vô tình khôi phục các span đang ẩn.
  const greet = document.querySelector('[data-i18n="hero.greeting"]');
  if (greet) greet.dataset.viHtml = greet.textContent.trim();

  const toggle = document.getElementById("langToggle");
  const currentEl = toggle && toggle.querySelector(".lang-current");
  const otherEl = toggle && toggle.querySelector(".lang-other");

  function apply(lang) {
    document.documentElement.lang = lang;
    nodes.forEach((el) => {
      const key = el.dataset.i18n;
      if (lang === "en") {
        el.innerHTML = EN[key] !== undefined ? EN[key] : el.dataset.viHtml;
      } else {
        el.innerHTML = el.dataset.viHtml;
      }
    });
    if (currentEl && otherEl) {
      currentEl.textContent = lang === "en" ? "EN" : "VI";
      otherEl.textContent = lang === "en" ? "VI" : "EN";
    }
    localStorage.setItem("lang", lang);
  }

  let lang = localStorage.getItem("lang") || "vi";
  if (lang === "en") {
    apply("en");
  } else {
    // Giữ nguyên tiếng Việt đang render để animation tách chữ ở hero chạy;
    // chỉ cập nhật nhãn nút, không apply lại (tránh clobber các span của GSAP).
    if (currentEl && otherEl) {
      currentEl.textContent = "VI";
      otherEl.textContent = "EN";
    }
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      lang = lang === "en" ? "vi" : "en";
      apply(lang);
    });
  }
});
