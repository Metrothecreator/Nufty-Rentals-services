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

/**
 * Scroll-driven image sequence with crossfade + Ken Burns drift.
 * Progress 0..1 maps across the keyframes; between keyframes we crossfade
 * and slowly zoom/pan so the scene appears to "flow" as the user scrolls.
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

    const clamped = Math.min(1, Math.max(0, p));
    const scaled = clamped * (count - 1);
    const i = Math.floor(scaled);
    const j = Math.min(count - 1, i + 1);
    const t = scaled - i;

    const a = imagesRef.current[i];
    const b = imagesRef.current[j];

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#12100c";
    ctx.fillRect(0, 0, w, h);

    // draw helper with cover-fit + subtle drift/zoom based on progress
    const paint = (img: HTMLImageElement | null | undefined, alpha: number, drift: number) => {
      if (!img) return;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = w / h;
      const zoom = 1.06 + drift * 0.06;
      const dw = w * zoom;
      const dh = h * zoom;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (ir > cr) { sw = sh * (dw / dh); sx = (img.naturalWidth - sw) / 2; }
      else { sh = sw / (dw / dh); sy = (img.naturalHeight - sh) / 2; }
      const ox = (w - dw) / 2 + drift * 10;
      const oy = (h - dh) / 2 - drift * 6;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, sx, sy, sw, sh, ox, oy, dw, dh);
      ctx.globalAlpha = 1;
    };

    paint(a, 1, t);
    if (b && j !== i && t > 0.005) paint(b, t, t);
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
