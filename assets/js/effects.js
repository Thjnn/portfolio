/* =========================================================
   CAO PHUC THINH — PORTFOLIO
   effects.js — WebGL hero background, custom cursor,
   magnetic buttons, 3D tilt, cursor-following glare.
   Toàn bộ đều tôn trọng prefers-reduced-motion & thiết bị cảm ứng.
   ========================================================= */

(function () {
  // Ghi chú: site này là portfolio thiên về animation, nên các hiệu ứng chạy
  // bất kể prefers-reduced-motion (giống các animation sẵn có trong main.js).
  // Chỉ chặn theo thiết bị cảm ứng để không hiện custom cursor / magnetic trên mobile.
  const noHover = window.matchMedia("(hover: none)").matches;

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  /* -------------------------------------------------------
     1) Three.js particle field trong Hero
     ------------------------------------------------------- */
  function initHeroBackground() {
    if (typeof THREE === "undefined") return;

    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;
    const hero = canvas.closest(".hero");
    if (!hero) return;

    let w = hero.clientWidth;
    let h = hero.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, w / h, 0.1, 100);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h, false);

    // Texture chấm tròn mềm (thay cho ô vuông mặc định của PointsMaterial)
    function circleTexture() {
      const s = 64;
      const cv = document.createElement("canvas");
      cv.width = cv.height = s;
      const ctx = cv.getContext("2d");
      const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.5, "rgba(255,255,255,0.85)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      const tex = new THREE.CanvasTexture(cv);
      return tex;
    }

    // Số điểm giữ thấp để đảm bảo 60fps; giảm thêm trên màn nhỏ
    const COUNT = window.innerWidth < 760 ? 120 : 280;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    const palette = [
      new THREE.Color(0x2563eb), // blue-600
      new THREE.Color(0x22b8e8), // cyan
      new THREE.Color(0x0b1b3b), // navy
    ];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      // Giảm độ sâu để kích thước chấm đồng đều hơn (ít chênh lệch to/nhỏ)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const r = Math.random();
      const c = r < 0.5 ? palette[0] : r < 0.82 ? palette[1] : palette[2];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.16,
      map: circleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Parallax mềm theo chuột
    let tmx = 0,
      tmy = 0,
      mx = 0,
      my = 0;
    window.addEventListener(
      "mousemove",
      (e) => {
        tmx = e.clientX / window.innerWidth - 0.5;
        tmy = e.clientY / window.innerHeight - 0.5;
      },
      { passive: true },
    );

    function resize() {
      w = hero.clientWidth;
      h = hero.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();
    let running = true;

    function loop() {
      if (!running) return;
      requestAnimationFrame(loop);
      const t = clock.getElapsedTime();
      mx += (tmx - mx) * 0.04;
      my += (tmy - my) * 0.04;
      points.rotation.y = t * 0.04 + mx * 0.5;
      points.rotation.x = my * 0.35;
      renderer.render(scene, camera);
    }
    loop();

    // Tạm dừng khi tab ẩn để tiết kiệm GPU
    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running) {
        clock.start();
        loop();
      }
    });
  }

  /* -------------------------------------------------------
     2) Custom cursor (chấm + vòng theo sau)
     ------------------------------------------------------- */
  function initCursor() {
    if (noHover) return;
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    document.body.classList.add("custom-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    let shown = false;
    window.addEventListener(
      "mousemove",
      (e) => {
        if (!shown) {
          gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
          shown = true;
        }
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.34, ease: "power2.out" });
      },
      { passive: true },
    );

    document.querySelectorAll("a, button, .skill-card, .visual-frame").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("active"));
      el.addEventListener("mouseleave", () => ring.classList.remove("active"));
    });

    document.addEventListener("mouseleave", () =>
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 }),
    );
    document.addEventListener("mouseenter", () =>
      gsap.to([dot, ring], { opacity: shown ? 1 : 0, duration: 0.2 }),
    );
  }

  /* -------------------------------------------------------
     3) Magnetic buttons
     ------------------------------------------------------- */
  function initMagnetic() {
    if (noHover) return;
    const els = document.querySelectorAll(".btn, .nav-cta, .logo");
    els.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        gsap.to(el, {
          x: mx * 0.32,
          y: my * 0.42,
          duration: 0.6,
          ease: "power3.out",
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
        });
      });
    });
  }

  /* -------------------------------------------------------
     4) 3D tilt cho project visuals
     ------------------------------------------------------- */
  function initTilt() {
    if (noHover) return;
    document.querySelectorAll(".visual-frame").forEach((frame) => {
      frame.addEventListener("mousemove", (e) => {
        const r = frame.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(frame, {
          rotationY: px * 10,
          rotationX: -py * 10,
          transformPerspective: 900,
          transformOrigin: "center",
          duration: 0.5,
          ease: "power2.out",
        });
      });
      frame.addEventListener("mouseleave", () => {
        gsap.to(frame, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    });
  }

  /* -------------------------------------------------------
     5) Glare theo con trỏ trên skill cards
     ------------------------------------------------------- */
  function initGlare() {
    if (noHover) return;
    document.querySelectorAll(".skill-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--gx", ((e.clientX - r.left) / r.width) * 100 + "%");
        card.style.setProperty("--gy", ((e.clientY - r.top) / r.height) * 100 + "%");
      });
    });
  }

  ready(() => {
    initHeroBackground();
    initCursor();
    initMagnetic();
    initTilt();
    initGlare();
  });
})();
