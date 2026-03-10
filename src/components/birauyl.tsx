"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import Navbar from "./navbar";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import * as THREE from "three";

import BirAuylLogo from "../assets/birauyl-logo.png";
import BirAuylBgVideo from "../assets/birauyl-bg-loop.webm";

// ─── Three.js hook ───────────────────────────────────────────────────────────

function useThreeBox(canvasRef: React.RefObject<HTMLCanvasElement | null>, logoSrc: string) {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const W = canvas.clientWidth, H = canvas.clientHeight;
    renderer.setSize(W, H, false);

    // ── Scene / Camera ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);

    // ── Lights ──
    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 5, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xca733d, 0.9);
    fill.position.set(-4, -2, 2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.55);
    rim.position.set(0, -4, -3);
    scene.add(rim);

    // ── Box geometry (card-box proportions) ──
    const BW = 1.638, BH = 2.34, BD = 0.351;
    const geometry = new THREE.BoxGeometry(BW, BH, BD);

    // ── Front face canvas texture ──
    const faceCanvas = document.createElement("canvas");
    faceCanvas.width = 512; faceCanvas.height = 730;
    const ctx = faceCanvas.getContext("2d")!;

    const grad = ctx.createLinearGradient(0, 0, 512, 730);
    grad.addColorStop(0, "#2a1a0e");
    grad.addColorStop(0.6, "#1e1208");
    grad.addColorStop(1, "#3d1f0a");
    ctx.fillStyle = grad;
    ctx.roundRect(0, 0, 512, 730, 20);
    ctx.fill();

    // subtle geometry
    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    ctx.lineWidth = 1;
    for (let r = 55; r <= 230; r += 44) {
      ctx.beginPath(); ctx.arc(256, 365, r, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.beginPath(); ctx.moveTo(256, 20); ctx.lineTo(500, 710); ctx.lineTo(12, 710); ctx.closePath(); ctx.stroke();

    ctx.font = "500 22px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.textAlign = "center";
    ctx.fillText("КАРТОЧНАЯ ИГРА", 256, 685);

    const faceTex = new THREE.CanvasTexture(faceCanvas);
    faceTex.colorSpace = THREE.SRGBColorSpace;

    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.src = logoSrc;
    logoImg.onload = () => {
      const lw = 290, lh = (lw / logoImg.naturalWidth) * logoImg.naturalHeight;
      ctx.drawImage(logoImg, (512 - lw) / 2, (730 - lh) / 2 - 20, lw, lh);
      faceTex.needsUpdate = true;
    };

    const darkMat = () => new THREE.MeshStandardMaterial({ color: 0x2a1208, roughness: 0.6, metalness: 0.1 });
    const sideMat = new THREE.MeshStandardMaterial({ color: 0x1e0e06, roughness: 0.75, metalness: 0.05 });
    const frontMat = new THREE.MeshStandardMaterial({ map: faceTex, roughness: 0.28, metalness: 0.06 });

    // Three.js BoxGeometry face order: +X, -X, +Y, -Y, +Z (front), -Z (back)
    const materials = [sideMat, sideMat, darkMat(), darkMat(), frontMat, sideMat];

    const box = new THREE.Mesh(geometry, materials);
    scene.add(box);

    // Edge highlight
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 })
    );
    box.add(edges);

    // ── Mouse tracking (global so right-panel movement counts too) ──
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ──
    const current = { x: 0.25, y: -0.15 };
    const LERP = 0.065;
    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      // sensitivity: ±0.45 rad, Y inverted so box tilts toward cursor
      const tx = mouseRef.current.y * 0.495;
      const ty = mouseRef.current.x * 0.495;
      current.x += (tx - current.x) * LERP;
      current.y += (ty - current.y) * LERP;
      box.rotation.x = current.x;
      box.rotation.y = current.y;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      frontMat.dispose();
      sideMat.dispose();
    };
  }, [canvasRef, logoSrc]);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function BirAuyl() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useThreeBox(canvasRef, BirAuylLogo);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar onLogoClick={() => navigate({ to: "/" })} />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07101e",
        }}
      >
        {/* ── Video — properly visible ── */}
        <video
          autoPlay muted loop playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: 0.92,
            filter: "brightness(0.85)",
          }}
        >
          <source src={BirAuylBgVideo} type="video/webm" />
        </video>

        {/* ── Vignette only (no big dark blob) ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 130% 100% at 50% 50%, transparent 25%, rgba(7,16,30,0.65) 100%)",
        }} />

        {/* ── Content ── */}
        <div style={{
          position: "relative", zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "clamp(32px, 7vw, 100px)",
          padding: "0 5vw", flexWrap: "wrap",
          width: "100%", maxWidth: 1100,
        }}>

          {/* LEFT — Three.js canvas */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ flexShrink: 0, width: 328, height: 456 }}
          >
            <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
          </motion.div>

          {/* RIGHT — copy */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: 420, minWidth: 260 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                fontFamily: "Kinetika, sans-serif", fontSize: 10,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)", marginBottom: 16,
                padding: "5px 12px", border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 100, display: "inline-block",
                backdropFilter: "blur(6px)", background: "rgba(0,0,0,0.28)",
              }}
            >
              Карточная игра · AKTOWN
            </motion.span>

            <motion.img
              src={BirAuylLogo} alt="Bir Auyl"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "clamp(150px, 20vw, 260px)", height: "auto",
                objectFit: "contain", marginBottom: 18,
                filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.2)) drop-shadow(0 0 32px rgba(0,0,0,0.2))",
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                fontFamily: "Kinetika, sans-serif",
                fontSize: "clamp(14px, 1.4vw, 17px)",
                lineHeight: 1.75, color: "rgba(255,255,255,0.7)",
                marginBottom: 28, textShadow: "0 1px 8px rgba(0,0,0,0.6)",
              }}
            >
              Настольная карточная игра, вдохновлённая духом единства.<br />
              Объединяй, стратегируй, побеждай — вместе с аулом.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{
                display: "flex", gap: 28, marginBottom: 32,
                borderTop: "1px solid rgba(255,255,255,0.1)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                padding: "14px 0", width: "100%",
              }}
            >
              {[{ value: "2–6", label: "Игроков" }, { value: "30м", label: "Партия" }, { value: "12+", label: "Возраст" }].map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontFamily: "Kinetika, sans-serif", fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 500, color: "#fff", lineHeight: 1, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                    {s.value}
                  </span>
                  <span style={{ fontFamily: "Kinetika, sans-serif", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <a href="#order" style={{ fontFamily: "Kinetika, sans-serif", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1a0d04", background: "#ca733d", padding: "13px 28px", borderRadius: 8, textDecoration: "none", fontWeight: 600, transition: "background 0.15s", display: "inline-block" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#d98040")}
                onMouseLeave={e => (e.currentTarget.style.background = "#ca733d")}
              >
                Заказать игру
              </a>
              <a href="#about" style={{ fontFamily: "Kinetika, sans-serif", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(202,115,61,0.85)", background: "rgba(202,115,61,0.08)", padding: "13px 28px", borderRadius: 8, textDecoration: "none", fontWeight: 500, border: "1px solid rgba(202,115,61,0.35)", backdropFilter: "blur(4px)", transition: "border-color 0.15s, color 0.15s", display: "inline-block" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(202,115,61,0.8)"; e.currentTarget.style.color = "#ca733d"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(202,115,61,0.35)"; e.currentTarget.style.color = "rgba(202,115,61,0.85)"; }}
              >
                Узнать больше
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ThemeProvider>
  );
}
