/* =========================================================
   CAO PHUC THINH — PORTFOLIO
   main.js — navbar, counter, progress bar, hero entrance, scroll reveal
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Đăng ký ScrollTrigger với GSAP
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Smooth anchor scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById("navbar");
  const progressBar = document.getElementById("progressBar");

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 10);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    progressBar.style.width = progress + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  /* ---------- Hero entrance ---------- */
  gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
    .to(".eyebrow", { opacity: 1, y: 0 })
    .to(".hero-title .line", { opacity: 1, y: 0, stagger: 0.12 }, "-=0.5")
    .to(".hero-subtitle", { opacity: 1, y: 0 }, "-=0.5")
    .to(".hero-actions", { opacity: 1, y: 0 }, "-=0.5")
    .to(".hero-stats", { opacity: 1, y: 0 }, "-=0.5");

  /* ---------- Scroll reveal — Hiệu ứng 2 chiều mượt mà (Cuộn xuống hiện / Cuộn lên ẩn) ---------- */
  const REVEAL_TYPES = {
    "reveal-up":     { opacity: 1, y: 0 },
    "reveal-left":   { opacity: 1, x: 0 },
    "reveal-right":  { opacity: 1, x: 0 },
    "reveal-scale":  { opacity: 1, scale: 1 },
    "clip-reveal":   { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
  };

  // Khởi tạo trạng thái ẩn ban đầu bằng GSAP để tránh xung đột hoặc ẩn vĩnh viễn trong CSS
  gsap.set(".reveal-up", { opacity: 0, y: 36 });
  gsap.set(".reveal-left", { opacity: 0, x: -40 });
  gsap.set(".reveal-right", { opacity: 0, x: 40 });
  gsap.set(".reveal-scale", { opacity: 0, scale: 0.92 });
  gsap.set(".clip-reveal", { clipPath: "inset(0 0 100% 0)" });

  Object.entries(REVEAL_TYPES).forEach(([className, vars]) => {
    // Lọc bỏ các phần tử nằm trong .hero vì đã chạy hiệu ứng ở Hero entrance timeline riêng phía trên
    const els = gsap.utils.toArray("." + className).filter(
      (el) => !el.closest(".hero")
    );
    
    if (!els.length) return;

    // Gom nhóm theo data-stagger để tạo hiệu ứng chạy so le nếu cần
    const groups = new Map();
    els.forEach((el) => {
      const parent = el.closest("[data-stagger]") || el.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });

    groups.forEach((groupEls, triggerParent) => {
      const delay = parseFloat(triggerParent.dataset.staggerDelay) || 0.08;
      
      if (groupEls.length === 1) {
        gsap.to(groupEls[0], {
          ...vars,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: groupEls[0],
            start: "top 88%",                     // Kích hoạt khi đỉnh phần tử chạm 88% màn hình từ trên xuống
            end: "bottom 10%",                   // Điểm chốt kết thúc khi phần tử cuộn ngược vượt hẳn lên trên
            toggleActions: "play reverse play reverse", // Hiệu ứng 2 chiều phản hồi theo hướng cuộn
          },
        });
      } else {
        gsap.to(groupEls, {
          ...vars,
          duration: 0.9,
          stagger: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: triggerParent,
            start: "top 88%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse", // Áp dụng hiệu ứng cuộn ngược cho cả nhóm so le
          },
        });
      }
    });
  });

  /* ---------- Stat counters ---------- */
  document.querySelectorAll(".stat-number").forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          innerText: target,
          duration: 1.4,
          ease: "power1.out",
          snap: { innerText: 1 },
          onUpdate() {
            el.innerText = Math.round(this.targets()[0].innerText);
          },
        });
      },
    });
  });

  /* ---------- Skill bars fill on view ---------- */
  document.querySelectorAll(".skill-card").forEach((card) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      once: true,
      onEnter: () => card.classList.add("in-view"),
    });
  });

  /* ---------- Subtle hero blob parallax on mouse move ---------- */
  const blobs = document.querySelectorAll(".blob");
  if (blobs.length >= 2) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      gsap.to(blobs[0], { x, y, duration: 1.2, ease: "power2.out" });
      gsap.to(blobs[1], { x: -x, y: -y, duration: 1.2, ease: "power2.out" });
    });
  }
});