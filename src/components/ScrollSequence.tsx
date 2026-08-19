"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export type ScrollSequenceHandle = { render: (progress: number) => void };

type Frame = { src: string; alt?: string };

const loadImg = (src: string) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// Ease the local segment so the dissolve feels like motion, not a swap.
const ease = (t: number) => t * t * (3 - 2 * t);

/**
 * Scroll-driven image sequence with a continuous camera move.
 *
 * - The camera (zoom + pan) advances smoothly across the WHOLE scroll,
 *   so the scene is always drifting — never static between frames.
 * - Adjacent frames crossfade over a short eased window; with many frames
 *   the result reads as one continuous flowing animation.
 */
const ScrollSequence = forwardRef<
  ScrollSequenceHandle,
  { frames: Frame[]; className?: string }
>(function ScrollSequence({ frames, className = "" }, ref) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  const count = frames.length;

  const draw = (p: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    const { w, h } = sizeRef.current;
    if (!w || !h) return;

    const clamped = clamp01(p);

    // Continuous camera motion across the entire sequence (0 → 1):
    const zoom = 1.04 + clamped * 0.14;              // slow push-in
    const panX = Math.sin(clamped * Math.PI) * 12;   // gentle lateral sway
    const panY = -clamped * 8;                        // slow rise

    // Map progress → eased frame position for a smoother flow.
    const scaled = clamped * (count - 1);
    const i = Math.floor(scaled);
    const j = Math.min(count - 1, i + 1);
    const t = ease(clamp01(scaled - i));

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0e0d0b";
    ctx.fillRect(0, 0, w, h);

    const paint = (img: HTMLImageElement | null | undefined, alpha: number) => {
      if (!img || alpha <= 0) return;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = w / h;
      const dw = w * zoom;
      const dh = h * zoom;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (ir > cr) { sw = sh * (dw / dh); sx = (img.naturalWidth - sw) / 2; }
      else { sh = sw / (dw / dh); sy = (img.naturalHeight - sh) / 2; }
      const ox = (w - dw) / 2 + panX;
      const oy = (h - dh) / 2 + panY;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, sx, sy, sw, sh, ox, oy, dw, dh);
      ctx.globalAlpha = 1;
    };

    paint(imagesRef.current[i], 1);
    if (j !== i) paint(imagesRef.current[j], t);
  };

  useImperativeHandle(ref, () => ({
    render: (p: number) => {
      progressRef.current = p;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        draw(progressRef.current);
      });
    },
  }));

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const loaded = await Promise.all(frames.map((f) => loadImg(f.src)));
      if (cancelled) return;
      imagesRef.current = loaded;
      setReady(true);
      draw(progressRef.current);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(progressRef.current);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    window.addEventListener("orientationchange", resize);
    return () => { ro.disconnect(); window.removeEventListener("orientationchange", resize); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <canvas
        ref={canvasRef}
        className={`h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        role="img"
        aria-label="Scroll-controlled showcase of Cubix projects"
      />
      {!ready && <div className="absolute inset-0 bg-ink" />}
    </div>
  );
});

export default ScrollSequence;
