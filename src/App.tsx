import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

// ════════════════════════════════════════════════════════════════════════════════
// PLANT SVGs — each one completely unique geometry
// ════════════════════════════════════════════════════════════════════════════════

/** Monstera deliciosa — large fenestrated leaf with holes */
function MonsteraLeaf({
  style,
  animClass,
  opacity = 0.13,
  flip = false,
}: {
  style?: React.CSSProperties;
  animClass: string;
  opacity?: number;
  flip?: boolean;
}) {
  return (
    <div
      className={`plant-shadow ${animClass}`}
      style={{ opacity, transform: flip ? "scaleX(-1)" : undefined, ...style }}
    >
      <svg
        viewBox="0 0 340 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Stem */}
        <path d="M170 470 C170 380 168 300 165 240" stroke="#3a5540" strokeWidth="7" strokeLinecap="round" />
        {/* Main big leaf — left lobe */}
        <path
          d="M165 240
             C 120 210 40 190 20 120
             C 0 50 60 10 110 30
             C 145 45 162 110 165 180
             Z"
          fill="#3a5540"
        />
        {/* Fenestration / hole in left lobe */}
        <ellipse cx="85" cy="130" rx="22" ry="14" transform="rotate(-20 85 130)" fill="#f5f0ea" />
        {/* Main big leaf — right lobe */}
        <path
          d="M165 240
             C 210 205 300 185 318 112
             C 336 40 274 0 226 22
             C 194 38 170 110 165 180
             Z"
          fill="#3a5540"
        />
        {/* Fenestration / hole in right lobe */}
        <ellipse cx="256" cy="122" rx="20" ry="13" transform="rotate(22 256 122)" fill="#f5f0ea" />
        {/* Small droop leaf left */}
        <path
          d="M163 280
             C 120 260 70 275 55 252
             C 40 230 58 195 90 198
             C 118 200 148 235 163 280
             Z"
          fill="#3a5540"
        />
        {/* Small droop leaf right */}
        <path
          d="M167 300
             C 215 278 266 292 282 268
             C 298 244 278 208 248 212
             C 220 216 182 252 167 300
             Z"
          fill="#3a5540"
        />
        {/* Center vein */}
        <path d="M165 240 L 165 60" stroke="#4a6b52" strokeWidth="1.5" strokeOpacity="0.4" />
        {/* Left vein */}
        <path d="M165 200 L 50 110" stroke="#4a6b52" strokeWidth="1" strokeOpacity="0.3" />
        {/* Right vein */}
        <path d="M165 200 L 290 108" stroke="#4a6b52" strokeWidth="1" strokeOpacity="0.3" />
      </svg>
    </div>
  );
}

/** Palm frond — thin arching pinnate leaf */
function PalmFrond({
  style,
  animClass,
  opacity = 0.1,
  flip = false,
}: {
  style?: React.CSSProperties;
  animClass: string;
  opacity?: number;
  flip?: boolean;
}) {
  return (
    <div
      className={`plant-shadow ${animClass}`}
      style={{ opacity, transform: flip ? "scaleX(-1)" : undefined, ...style }}
    >
      <svg
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Main arching stem */}
        <path
          d="M200 490 C 195 400 170 300 80 180 C 40 130 10 90 30 40"
          stroke="#3a5540"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left pinnae — lower */}
        <path d="M170 370 C 130 340 80 350 60 330 C 45 315 55 295 80 300 C 110 306 148 340 170 370 Z" fill="#3a5540" />
        {/* Left pinnae — mid */}
        <path d="M148 310 C 100 275 55 280 35 258 C 18 240 30 218 58 224 C 90 231 130 275 148 310 Z" fill="#3a5540" />
        {/* Left pinnae — upper */}
        <path d="M118 245 C 72 205 32 205 16 180 C 3 160 18 138 46 146 C 76 155 104 208 118 245 Z" fill="#3a5540" />
        {/* Left pinnae — top */}
        <path d="M82 188 C 45 148 12 145 2 116 C -6 94 12 72 38 82 C 62 90 78 148 82 188 Z" fill="#3a5540" />
        {/* Right pinnae — lower */}
        <path d="M182 355 C 195 315 225 300 248 312 C 264 320 264 342 248 350 C 228 360 200 360 182 355 Z" fill="#3a5540" />
        {/* Right pinnae — mid */}
        <path d="M160 292 C 178 248 214 234 238 246 C 256 256 254 280 236 288 C 212 298 178 300 160 292 Z" fill="#3a5540" />
        {/* Right pinnae — upper */}
        <path d="M130 228 C 152 182 190 168 214 182 C 232 192 228 216 210 224 C 186 234 152 236 130 228 Z" fill="#3a5540" />
      </svg>
    </div>
  );
}

/** Snake plant / Sansevieria — tall upright spiky leaves */
function SnakePlant({
  style,
  animClass,
  opacity = 0.09,
}: {
  style?: React.CSSProperties;
  animClass: string;
  opacity?: number;
}) {
  return (
    <div className={`plant-shadow ${animClass}`} style={{ opacity, ...style }}>
      <svg
        viewBox="0 0 300 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Leaf 1 — center tall */}
        <path
          d="M148 510 C 142 420 138 300 144 160 C 146 100 152 50 156 10
             C 160 50 164 100 162 160 C 166 300 160 420 152 510 Z"
          fill="#3a5540"
        />
        {/* Leaf 2 — left lean */}
        <path
          d="M130 510 C 110 420 88 310 80 190 C 74 120 80 70 84 30
             C 94 68 100 118 104 188 C 114 308 124 418 136 510 Z"
          fill="#4a6b52"
        />
        {/* Leaf 3 — right lean */}
        <path
          d="M170 510 C 186 420 208 310 216 190 C 222 120 216 70 212 30
             C 202 68 196 118 192 188 C 182 308 174 418 166 510 Z"
          fill="#4a6b52"
        />
        {/* Leaf 4 — far left short */}
        <path
          d="M108 510 C 84 430 62 340 58 240 C 54 170 60 120 66 80
             C 76 118 80 168 84 238 C 90 338 100 428 112 510 Z"
          fill="#3a5540"
          opacity="0.7"
        />
        {/* Horizontal stripe pattern (Sansevieria markings) */}
        <rect x="140" y="100" width="20" height="3" rx="1" fill="#2a3f2e" opacity="0.25" />
        <rect x="140" y="160" width="20" height="3" rx="1" fill="#2a3f2e" opacity="0.25" />
        <rect x="140" y="220" width="20" height="3" rx="1" fill="#2a3f2e" opacity="0.25" />
        <rect x="140" y="280" width="20" height="3" rx="1" fill="#2a3f2e" opacity="0.25" />
      </svg>
    </div>
  );
}

/** Tropical hanging leaf cluster — loose organic bunch */
function LeafCluster({
  style,
  animClass,
  opacity = 0.1,
  flip = false,
}: {
  style?: React.CSSProperties;
  animClass: string;
  opacity?: number;
  flip?: boolean;
}) {
  return (
    <div
      className={`plant-shadow ${animClass}`}
      style={{ opacity, transform: flip ? "scaleX(-1)" : undefined, ...style }}
    >
      <svg
        viewBox="0 0 380 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Hanging vine stem */}
        <path
          d="M60 0 C 70 60 80 120 100 180 C 120 240 150 280 180 330"
          stroke="#3a5540"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Large leaf 1 */}
        <path
          d="M100 180
             C 60 160 10 170 0 140
             C -10 110 20 82 56 92
             C 82 100 100 150 100 180 Z"
          fill="#3a5540"
        />
        {/* Vein on leaf 1 */}
        <path d="M100 180 L 28 116" stroke="#4a6b52" strokeWidth="1" strokeOpacity="0.35" />
        {/* Large leaf 2 */}
        <path
          d="M130 240
             C 170 210 220 220 234 192
             C 248 164 226 132 198 138
             C 170 144 142 200 130 240 Z"
          fill="#3a5540"
        />
        {/* Vein on leaf 2 */}
        <path d="M130 240 L 210 156" stroke="#4a6b52" strokeWidth="1" strokeOpacity="0.35" />
        {/* Small leaf 3 — drooping */}
        <path
          d="M80 130
             C 40 118 12 130 4 108
             C -4 88 16 66 44 72
             C 66 77 82 110 80 130 Z"
          fill="#4a6b52"
        />
        {/* Leaf 4 — side shoot */}
        <path
          d="M155 290
             C 120 275 88 288 78 266
             C 68 246 88 220 116 226
             C 138 230 152 268 155 290 Z"
          fill="#3a5540"
        />
        {/* Leaf 5 — small at tip */}
        <path
          d="M180 330
             C 200 308 236 306 246 280
             C 256 256 238 232 216 238
             C 196 244 180 304 180 330 Z"
          fill="#4a6b52"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

/** Banana leaf — single large dramatically wide leaf */
function BananaLeaf({
  style,
  animClass,
  opacity = 0.08,
  flip = false,
}: {
  style?: React.CSSProperties;
  animClass: string;
  opacity?: number;
  flip?: boolean;
}) {
  return (
    <div
      className={`plant-shadow ${animClass}`}
      style={{ opacity, transform: flip ? "scaleX(-1) rotate(-5deg)" : "rotate(-5deg)", ...style }}
    >
      <svg
        viewBox="0 0 500 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Petiole/stem */}
        <path
          d="M240 350 C 242 300 244 250 246 200"
          stroke="#3a5540"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        {/* Giant banana leaf blade */}
        <path
          d="M246 200
             C 220 180 120 160 40 180
             C -20 195 -30 230 20 248
             C 80 268 200 248 246 200
             Z"
          fill="#3a5540"
        />
        <path
          d="M246 200
             C 272 178 370 152 448 168
             C 508 180 518 218 466 238
             C 402 260 278 244 246 200
             Z"
          fill="#3a5540"
        />
        {/* Midrib */}
        <path d="M246 200 L 30 210" stroke="#2a3f2e" strokeWidth="3" strokeOpacity="0.3" />
        <path d="M246 200 L 460 210" stroke="#2a3f2e" strokeWidth="3" strokeOpacity="0.3" />
        {/* Lateral veins left */}
        <path d="M200 192 L 60 225" stroke="#2a3f2e" strokeWidth="1" strokeOpacity="0.2" />
        <path d="M160 194 L 30 230" stroke="#2a3f2e" strokeWidth="1" strokeOpacity="0.2" />
        <path d="M120 198 L 20 240" stroke="#2a3f2e" strokeWidth="1" strokeOpacity="0.2" />
        {/* Lateral veins right */}
        <path d="M296 192 L 440 225" stroke="#2a3f2e" strokeWidth="1" strokeOpacity="0.2" />
        <path d="M340 194 L 470 232" stroke="#2a3f2e" strokeWidth="1" strokeOpacity="0.2" />
        {/* Tear marks — characteristic of banana leaf */}
        <path d="M100 208 L 95 220" stroke="#f5f0ea" strokeWidth="2" strokeOpacity="0.15" />
        <path d="M140 205 L 134 218" stroke="#f5f0ea" strokeWidth="2" strokeOpacity="0.15" />
        <path d="M360 208 L 366 220" stroke="#f5f0ea" strokeWidth="2" strokeOpacity="0.15" />
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// CUSTOM CURSOR
// ════════════════════════════════════════════════════════════════════════════════
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch
    const cursor = cursorRef.current!;
    const follower = followerRef.current!;
    let mx = 0, my = 0, fx = 0, fy = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      gsap.to(cursor, { x: mx, y: my, duration: 0.08, ease: "none" });
    };
    const animate = () => {
      fx += (mx - fx) * 0.09; fy += (my - fy) * 0.09;
      gsap.set(follower, { x: fx, y: fy });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const addHover = () => { cursor.classList.add("hovering"); follower.classList.add("hovering"); };
    const removeHover = () => { cursor.classList.remove("hovering"); follower.classList.remove("hovering"); };
    document.querySelectorAll("a, button, [data-hover]").forEach(el => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// PARTICLE CANVAS
// ════════════════════════════════════════════════════════════════════════════════
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });

    const N = 65;
    const particles = Array.from({ length: N }, () => {
      const kind = Math.random();
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.1 - 0.05,
        alpha: Math.random() * 0.45 + 0.08,
        life: Math.random(),
        hue: kind > 0.6 ? 140 : kind > 0.3 ? 20 : 35,
        sat: kind > 0.6 ? 28 : 34,
        light: kind > 0.6 ? 52 : 62,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const f = ((120 - dist) / 120) * 0.25;
          p.vx += (dx / dist) * f; p.vy += (dy / dist) * f;
        }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx; p.y += p.vy;
        p.life += 0.0016;
        if (p.y < -10 || p.life > 1 || p.x < -10 || p.x > canvas.width + 10) {
          p.x = Math.random() * canvas.width; p.y = canvas.height + 10; p.life = 0;
          p.vx = (Math.random() - 0.5) * 0.12; p.vy = -Math.random() * 0.1 - 0.04;
        }
        const a = Math.sin(p.life * Math.PI) * p.alpha;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animId); };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}

// ════════════════════════════════════════════════════════════════════════════════
// SCROLL PROGRESS
// ════════════════════════════════════════════════════════════════════════════════
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="scroll-progress" style={{ scaleX, width: "100%" }} />;
}

// ════════════════════════════════════════════════════════════════════════════════
// AMANDA PHOTO — Organic animated blob
// ════════════════════════════════════════════════════════════════════════════════
function AmandaPhotoBlob() {
  return (
    <div className="amanda-photo-wrap">
      <div className="blob-ring blob-ring-1" />
      <div className="blob-ring blob-ring-2" />
      <div className="blob-layer blob-layer-1" />
      <div className="blob-layer blob-layer-2" />
      <div className="blob-layer blob-layer-3" />
      <div className="blob-dot blob-dot-1" />
      <div className="blob-dot blob-dot-2" />
      <div className="blob-dot blob-dot-3" />
      <div className="blob-leaf" />
      <img src="/fotoAmanda.png" alt="Amanda Giffoni — Psicóloga Perinatal" className="amanda-photo" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const plantTRRef = useRef<HTMLDivElement>(null);
  const plantBLRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const ringsScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const ringsOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from([ring1Ref.current, ring2Ref.current, ring3Ref.current], {
        scale: 0.3, opacity: 0, duration: 2, stagger: 0.2, ease: "power4.out",
      }, 0)
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }, 0.4)
        .from(eyebrowRef.current, { y: 24 }, 0.4)
        .to(titleRef.current, { opacity: 1, y: 0, duration: 1.6, ease: "power4.out" }, 0.6)
        .from(titleRef.current, { y: 80, filter: "blur(18px)" }, 0.6)
        .to(subRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0.95)
        .from(subRef.current, { y: 36 }, 0.95)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 1.2)
        .from(ctaRef.current, { y: 24 }, 1.2)
        .to(hintRef.current, { opacity: 1, duration: 1, ease: "power2.out" }, 1.8);

      // Plants entrance + continuous sway (GSAP, not CSS-only)
      gsap.from(plantTRRef.current, { opacity: 0, x: 60, y: -40, duration: 2.5, ease: "power3.out", delay: 0.8 });
      gsap.from(plantBLRef.current, { opacity: 0, x: -50, y: 40, duration: 2.5, ease: "power3.out", delay: 1.2 });

      // Continuous sway animation using GSAP timeline repeat
      gsap.to(plantTRRef.current, {
        rotation: 3,
        transformOrigin: "80% 0%",
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(plantBLRef.current, {
        rotation: -2.5,
        transformOrigin: "20% 100%",
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" id="inicio">
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-shaft" />

      {/* HERO PLANT SHADOWS — unique SVGs, GSAP-animated */}
      <div className="hero-plant-overlay">
        {/* Top-right: Monstera */}
        <div ref={plantTRRef} className="plant-pos plant-pos-tr">
          <MonsteraLeaf animClass="" opacity={0.12} />
        </div>
        {/* Bottom-left: Palm frond mirrored */}
        <div ref={plantBLRef} className="plant-pos plant-pos-bl">
          <PalmFrond animClass="" opacity={0.1} flip={true} />
        </div>
      </div>

      <motion.div style={{ scale: ringsScale, opacity: ringsOpacity, position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div ref={ring1Ref} className="hero-ring hero-ring-1" />
        <div ref={ring2Ref} className="hero-ring hero-ring-2" />
        <div ref={ring3Ref} className="hero-ring hero-ring-3" />
      </motion.div>

      <span className="vertical-text">Psicologia Perinatal</span>

      <div ref={eyebrowRef} className="hero-eyebrow">
        <span className="hero-eyebrow-line" />
        <span className="hero-eyebrow-text">acolhimento emocional materno</span>
        <span className="hero-eyebrow-line" />
      </div>

      <motion.h1 ref={titleRef} className="hero-title" style={{ y: titleY, opacity: titleOpacity }}>
        Existe uma nova<br />
        versão <em>de você</em><br />
        nascendo.
      </motion.h1>

      <motion.p ref={subRef} className="hero-sub" style={{ y: subY }}>
        A maternidade muda o corpo, os pensamentos, os medos
        e a forma como você enxerga a si mesma.
        Você não precisa atravessar tudo isso sozinha.
      </motion.p>

      <div ref={ctaRef} className="hero-cta-group">
        <a href="#contato" className="btn-primary">Agendar acolhimento</a>
        <a href="#abordagem" className="btn-ghost">Conhecer abordagem</a>
      </div>

      <div ref={hintRef} className="hero-scroll-hint">
        <div className="scroll-line" />
        <span className="scroll-label">Scroll</span>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// MARQUEE
// ════════════════════════════════════════════════════════════════════════════════
function MarqueeStrip() {
  const items = [
    "Gestação", "Puerpério", "Acolhimento", "Vínculo",
    "Maternagem", "Identidade", "Presença", "Cuidado",
    "Gestação", "Puerpério", "Acolhimento", "Vínculo",
    "Maternagem", "Identidade", "Presença", "Cuidado",
  ];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className={`marquee-item ${i % 3 === 0 ? "marquee-item-sage" : ""}`}>
            {item}<span className="marquee-sep">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// GESTAÇÃO
// ════════════════════════════════════════════════════════════════════════════════
function GestacaoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        onEnter: () => {
          gsap.from(textRef.current!.children, { opacity: 0, y: 60, duration: 1.2, stagger: 0.14, ease: "power3.out" });
          gsap.from(panelRef.current, { opacity: 0, scale: 0.96, duration: 1.4, ease: "power3.out", delay: 0.2 });
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="gestation-section" id="abordagem">
      <div ref={textRef} className="gestation-text-side">
        <div className="section-eyebrow">
          <span className="eyebrow-number">01</span>
          <span className="eyebrow-text">Gestação</span>
          <div className="eyebrow-line" />
        </div>
        <h2 className="section-title">
          Gestar também é<br />atravessar mudanças<br /><em>invisíveis.</em>
        </h2>
        <p className="section-body">
          Medos, ansiedade, culpa, cobranças, inseguranças e mudanças
          emocionais profundas. Nem toda transformação aparece no corpo.
          O suporte emocional começa antes do nascimento.
        </p>
        <a href="#contato" className="btn-primary">Quero apoio na gestação</a>
      </div>

      <div className="gestation-visual-wrap">
        <motion.div className="gestation-visual" style={{ y: visualY }}>
          <div ref={panelRef} className="glass-panel">
            <div className="glass-grid" />
            <div className="glass-crosshair" />
            <motion.div className="glass-inner-glow glow-1" style={{ y: glowY }} />
            <motion.div className="glass-inner-glow glow-2" style={{ y: glowY2 }} />
            <div className="glass-inner-glow glow-3" />
            <div className="glass-rings">
              <div className="glass-ring" />
              <div className="glass-ring" />
              <div className="glass-ring" />
              <div className="glass-ring" />
            </div>
          </div>
          <div className="float-label float-label-a">
            <span className="float-label-number">89%</span>
            <span className="float-label-text">Bem-estar</span>
          </div>
          <div className="float-label float-label-b">
            <span className="float-label-number">+7</span>
            <span className="float-label-text">Anos de experiência</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// PUERPÉRIO — with Snake plant + Leaf cluster, each GSAP animated
// ════════════════════════════════════════════════════════════════════════════════
function PuerperioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const plantLRef = useRef<HTMLDivElement>(null);
  const plantRRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgTextX = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const quoteY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const orb1X = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const orb2X = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const containerY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Snake plant on left — tall slow sway
      gsap.fromTo(plantLRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 1.6, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        }
      );
      gsap.to(plantLRef.current, {
        rotation: 2.5, transformOrigin: "50% 100%",
        duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.5,
      });

      // Leaf cluster on right — looser, faster (delay is a tween prop, NOT a scrollTrigger prop)
      gsap.fromTo(plantRRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 1.6, ease: "power3.out", delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        }
      );
      gsap.to(plantRRef.current, {
        rotation: -3, transformOrigin: "50% 10%",
        duration: 7, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.8,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="puerperium-section" id="puerperio">
      {/* Snake plant left */}
      <div ref={plantLRef} className="plant-pos plant-pos-puerp-l" style={{ opacity: 0 }}>
        <SnakePlant animClass="" opacity={0.11} />
      </div>
      {/* Leaf cluster right */}
      <div ref={plantRRef} className="plant-pos plant-pos-puerp-r" style={{ opacity: 0 }}>
        <LeafCluster animClass="" opacity={0.1} flip={true} />
      </div>

      <motion.div className="puerp-orb puerp-orb-1" style={{ x: orb1X }} />
      <motion.div className="puerp-orb puerp-orb-2" style={{ x: orb2X }} />

      <motion.div ref={bgTextRef} className="puerperium-bg-text" style={{ x: bgTextX }} aria-hidden="true">
        Puerpério
      </motion.div>

      <motion.div className="puerperium-inner" style={{ opacity: containerOpacity, y: containerY }}>
        <div className="section-eyebrow" style={{ justifyContent: "center" }}>
          <span className="eyebrow-number">02</span>
          <span className="eyebrow-text">Puerpério</span>
        </div>
        <span className="quote-mark-open">"</span>
        <motion.p ref={quoteRef} className="quote-text" style={{ y: quoteY }}>
          Nascer uma mãe é um processo tão profundo
          quanto nascer um bebê. Exige tempo, escuta
          e, acima de tudo, muito acolhimento.
        </motion.p>
        <span className="quote-attribution">— o vínculo começa aqui</span>
        <p className="puerperium-body">
          Acolhimento emocional para prevenção da depressão pós-parto,
          fortalecimento da identidade feminina e reconstrução emocional.
          Você merece cuidado enquanto aprende a cuidar.
        </p>
      </motion.div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// PILLARS
// ════════════════════════════════════════════════════════════════════════════════
function PillarsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current!.children, {
        opacity: 0, y: 60, duration: 1.2, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 70%", once: true },
      });
      gsap.from(gridRef.current!.children, {
        opacity: 0, y: 80, duration: 1.2, stagger: 0.14, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 75%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const pillars = [
    { n: "01", name: "Escuta", desc: "Um espaço seguro onde cada emoção é recebida sem julgamento. A escuta ativa é a base de todo processo terapêutico." },
    { n: "02", name: "Vínculo", desc: "Fortalecer a conexão consigo mesma e com o bebê. O vínculo saudável começa na presença emocional da mãe." },
    { n: "03", name: "Presença", desc: "Estar presente nas diferentes fases — gestação, parto e puerpério — com cuidado, sensibilidade e competência." },
  ];

  return (
    <section ref={sectionRef} className="pillars-section" id="abordagem-2">
      <div className="pillars-bg" />
      <div className="pillars-noise" />
      <div ref={headerRef} className="pillars-header">
        <div className="pillars-eyebrow">
          <span className="pillars-eyebrow-text">Nossa abordagem</span>
          <div className="pillars-eyebrow-line" />
        </div>
        <h2 className="pillars-title">Cuidado que<br />nasce da <em>escuta.</em></h2>
      </div>
      <div ref={gridRef} className="pillars-grid">
        {pillars.map((p) => (
          <div key={p.n} className="pillar-card pillar-card-sage" data-hover>
            <span className="pillar-number">{p.n}</span>
            <div className="pillar-icon" />
            <h3 className="pillar-name">{p.name}</h3>
            <p className="pillar-desc">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// ABOUT — Amanda photo + Banana leaf
// ════════════════════════════════════════════════════════════════════════════════
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bgTitleRef = useRef<HTMLDivElement>(null);
  const bananaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bgTitleRef.current, {
        xPercent: -5, opacity: 0, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });
      gsap.from(photoRef.current, {
        opacity: 0, x: 60, scale: 0.94, duration: 1.6, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
      });
      gsap.from(textRef.current!.children, {
        opacity: 0, y: 50, duration: 1.2, stagger: 0.13, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true },
      });

      // Banana leaf: slide in from top + slow oscillate
      gsap.fromTo(bananaRef.current,
        { opacity: 0, y: -40, rotation: -8 },
        {
          opacity: 1, y: 0, rotation: -5, duration: 2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );
      gsap.to(bananaRef.current, {
        rotation: -2, transformOrigin: "50% 0%",
        duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.6,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section-sage" id="sobre">
      {/* Banana leaf at top */}
      <div ref={bananaRef} className="plant-pos plant-pos-about-top" style={{ opacity: 0 }}>
        <BananaLeaf animClass="" opacity={0.1} />
      </div>

      <div className="about-sage-accent" />

      <motion.div ref={bgTitleRef} className="about-bg-title" style={{ y: bgY }} aria-hidden="true">
        Amanda
      </motion.div>

      <div className="about-sage-grid">
        <div ref={textRef} className="about-text-col">
          <div className="section-eyebrow">
            <span className="eyebrow-number">03</span>
            <span className="eyebrow-text">A profissional</span>
            <div className="eyebrow-line" />
          </div>
          <div className="about-green-tag">
            <div className="about-green-tag-dot" />
            Psicologia Perinatal
          </div>
          <h2 className="section-title">
            Muito prazer,<br />sou <em>Amanda.</em>
          </h2>
          <p className="section-body">
            Psicóloga especializada em psicologia perinatal. Meu propósito é
            oferecer um espaço seguro para mulheres que estão vivendo as
            transformações da maternidade — da gestação ao puerpério.
          </p>
          <a href="#contato" className="btn-primary">Agendar acolhimento</a>
          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-number">+7</span>
              <span className="about-stat-label">Anos de experiência</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">100%</span>
              <span className="about-stat-label">Online</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">∞</span>
              <span className="about-stat-label">Acolhimento</span>
            </div>
          </div>
        </div>

        <div ref={photoRef} className="about-photo-col">
          <motion.div style={{ scale: photoScale }}>
            <AmandaPhotoBlob />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// CONTACT — with Palm frond corner decorations
// ════════════════════════════════════════════════════════════════════════════════
function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const plantTLRef = useRef<HTMLDivElement>(null);
  const plantBRRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgWordY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(innerRef.current!.children, {
        opacity: 0, y: 70, duration: 1.3, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
      });

      // Contact plants animated
      gsap.fromTo(plantTLRef.current,
        { opacity: 0, x: -20, y: -20 },
        {
          opacity: 1, x: 0, y: 0, duration: 1.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        }
      );
      gsap.to(plantTLRef.current, {
        rotation: 2, transformOrigin: "10% 10%",
        duration: 11, ease: "sine.inOut", yoyo: true, repeat: -1,
      });

      gsap.fromTo(plantBRRef.current,
        { opacity: 0, x: 20, y: 20 },
        {
          opacity: 1, x: 0, y: 0, duration: 1.8, ease: "power3.out", delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        }
      );
      gsap.to(plantBRRef.current, {
        rotation: -2.5, transformOrigin: "90% 90%",
        duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.4,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="contact-section" id="contato">
      {/* Palm frond top-left */}
      <div ref={plantTLRef} className="plant-pos plant-pos-contact-tl" style={{ opacity: 0 }}>
        <PalmFrond animClass="" opacity={0.09} />
      </div>
      {/* Monstera bottom-right */}
      <div ref={plantBRRef} className="plant-pos plant-pos-contact-br" style={{ opacity: 0 }}>
        <MonsteraLeaf animClass="" opacity={0.07} flip={true} />
      </div>

      <motion.div className="contact-bg-word" style={{ y: bgWordY }} aria-hidden="true">
        Contato
      </motion.div>
      <div className="contact-orb" />

      <div ref={innerRef} className="contact-inner">
        <div className="section-eyebrow" style={{ justifyContent: "center" }}>
          <span className="eyebrow-number">04</span>
          <span className="eyebrow-text">Contato</span>
        </div>
        <h2 className="contact-title">
          Dê o primeiro
          <em>passo.</em>
        </h2>
        <p className="contact-sub">
          Agendar é simples. Entre em contato pelo WhatsApp ou
          Instagram e vamos conversar sobre como posso te ajudar.
        </p>
        <div className="contact-links">
          <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="btn-primary">
            WhatsApp
          </a>
          <a href="https://instagram.com/psi.amandagiffoni" target="_blank" rel="noopener noreferrer" className="contact-card" data-hover>
            <span className="contact-card-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </span>
            @psi.amandagiffoni
          </a>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// DIVIDER + FOOTER
// ════════════════════════════════════════════════════════════════════════════════
function Divider() {
  return (
    <div className="section-divider">
      <div className="divider-line" />
      <div className="divider-dot" />
      <div className="divider-line" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-left">
        <span className="footer-logo">Amanda Giffoni</span>
        <span className="footer-tagline">Psicologia Perinatal</span>
      </div>
      <div className="footer-center" />
      <div className="footer-right">
        <span className="footer-copy">© 2025 · Todos os direitos reservados</span>
      </div>
    </footer>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ════════════════════════════════════════════════════════════════════════════════
export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    const header = document.querySelector(".site-header");
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      if (scroll > 60) header?.classList.add("scrolled");
      else header?.classList.remove("scrolled");
    });
    return () => { lenis.destroy(); };
  }, []);

  return (
    <div className="page">
      <CustomCursor />
      <ParticleCanvas />
      <div className="noise" />
      <ScrollProgressBar />

      <header className="site-header">
        <span className="header-logo">Psicologia Perinatal</span>
        <nav className="header-nav">
          <a href="#abordagem">Abordagem</a>
          <a href="#puerperio">Puerpério</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
        <a href="#contato" className="header-cta" data-hover>Agendar</a>
      </header>

      <main>
        <HeroSection />
        <MarqueeStrip />
        <GestacaoSection />
        <Divider />
        <PuerperioSection />
        <Divider />
        <PillarsSection />
        <Divider />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}