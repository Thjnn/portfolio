/* =========================================================
   CAO PHUC THINH — PORTFOLIO
   main.js — scroll reveal, navbar, counter, progress bar
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Lenis smooth scroll ---------- */
  const lenis = new Lenis({
    duration: 1.1, // số lớn hơn = cuộn "nặng" và mượt hơn
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    syncTouch: false, // giữ scroll chạm tự nhiên trên mobile
  });

  // Mỗi lần Lenis cuộn -> báo cho ScrollTrigger cập nhật vị trí
  lenis.on("scroll", ScrollTrigger.update);

  // Đưa Lenis vào ticker của GSAP để cả 2 đồng bộ 1 vòng lặp duy nhất
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Cho phép click vào link nội bộ (#about, #projects...) cuộn mượt qua Lenis
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        lenis.scrollTo(id, { offset: -80 });
      }
    });
  });

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById("navbar");
  const progressBar = document.getElementById("progressBar");

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 10);

    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
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
  gsap
    .timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
    .to(".eyebrow", { opacity: 1, y: 0 })
    .to(".hero-title .line", { opacity: 1, y: 0, stagger: 0.12 }, "-=0.5")
    .to(".hero-subtitle", { opacity: 1, y: 0 }, "-=0.5")
    .to(".hero-actions", { opacity: 1, y: 0 }, "-=0.5")
    .to(".hero-stats", { opacity: 1, y: 0 }, "-=0.5");

  /* ---------- Generic scroll reveal for everything else ---------- */
  const revealEls = gsap.utils
    .toArray(".reveal-up")
    .filter((el) => !el.closest(".hero"));

  revealEls.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
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
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 24;
    const y = (e.clientY / window.innerHeight - 0.5) * 24;
    gsap.to(blobs[0], { x, y, duration: 1.2, ease: "power2.out" });
    gsap.to(blobs[1], { x: -x, y: -y, duration: 1.2, ease: "power2.out" });
  });
});
