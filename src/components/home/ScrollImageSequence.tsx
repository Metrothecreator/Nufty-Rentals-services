"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/assets";

export type ScrollImageSequenceHandle = { render: (progress: number) => void };

const FRAME_COUNT = 240;
const PAD = 4;
// How many frames to load before we consider the sequence "interactive"
// 30 frames = first ~12% of scroll — enough to feel instant
const READY_THRESHOLD = 30;

const url = (base: string, i: number) =>
  `${base}/frame_${String(i).padStart(PAD, "0")}.jpg`;

const loadImg = (src: string) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

function cover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
  alpha = 1
) {
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = w / h;
  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
  if (ir > cr) { sw = sh * cr; sx = (img.naturalWidth - sw) / 2; }
  else         { sh = sw / cr; sy = (img.naturalHeight - sh) / 2; }
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  ctx.globalAlpha = 1;
}

const ScrollImageSequence = forwardRef<
  ScrollImageSequenceHandle,
  {
    framesBasePath: string;
    fallbackImages: GalleryImage[];
    className?: string;
    onReady?: () => void;
  }
>(function ScrollImageSequence({ framesBasePath, fallbackImages, className = "", onReady }, ref) {
  const canvasRef   = useRef<HTMLCanvasElement | null>(null);
  const imagesRef   = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const sizeRef     = useRef({ w: 0, h: 0, dpr: 1 });
  const progressRef = useRef(0);
  const rafRef      = useRef<number | null>(null);
  const readyRef    = useRef(false);
  const [visible, setVisible] = useState(false); // canvas shown?
  const [failed,  setFailed]  = useState(false);

  // ── Draw ─────────────────────────────────────────────────────────
  const draw = (progress: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Higher-quality upsampling for large desktop viewports where the
    // 720px-wide source frames get stretched to full width.
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    const { w, h } = sizeRef.current;
    if (!w || !h) return;

    const clamped = Math.min(1, Math.max(0, progress));
    const scaled  = clamped * (FRAME_COUNT - 1);
    const i = Math.floor(scaled);
    const j = Math.min(FRAME_COUNT - 1, i + 1);
    const t = scaled - i;

    // Find nearest available frame going backwards if this one isn't loaded yet
    let frameA = images[i];
    if (!frameA) {
      for (let k = i - 1; k >= 0; k--) { if (images[k]) { frameA = images[k]; break; } }
    }
    const frameB = images[j];

    ctx.clearRect(0, 0, w, h);
    if (frameA) cover(ctx, frameA, w, h, 1);
    if (frameB && j !== i && t > 0.02) cover(ctx, frameB, w, h, t);
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

  // ── Load sequence ─────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = async () => {
      if (reduced) {
        // Just show the last frame statically
        const img = await loadImg(url(framesBasePath, FRAME_COUNT));
        if (cancelled) return;
        if (img) {
          imagesRef.current[FRAME_COUNT - 1] = img;
          setVisible(true);
          onReady?.();
          draw(1);
        } else {
          setFailed(true);
        }
        return;
      }

      // ── Strategy: load frame 1 first → show instantly → load rest ──
      const first = await loadImg(url(framesBasePath, 1));
      if (cancelled) return;

      if (!first) {
        // Frame 1 failed — fall back to static images
        const fallbacks = await Promise.all(fallbackImages.map(x => loadImg(x.src)));
        if (cancelled) return;
        if (fallbacks.some(Boolean)) {
          // Use fallbacks as evenly-spaced keyframes
          const sparse = fallbacks.filter(Boolean) as HTMLImageElement[];
          const step = Math.floor(FRAME_COUNT / sparse.length);
          sparse.forEach((img, idx) => {
            imagesRef.current[idx * step] = img;
          });
          setVisible(true);
          readyRef.current = true;
          onReady?.();
          draw(progressRef.current);
        } else {
          setFailed(true);
        }
        return;
      }

      // Frame 1 loaded — show canvas immediately
      imagesRef.current[0] = first;
      setVisible(true);
      draw(0);

      // Load the rest in 8 parallel workers, lowest-index first
      // so scroll always has the nearest frame available
      const results = imagesRef.current; // same ref
      let cursor = 1; // frame 1 already done
      let loadedCount = 1;

      const worker = async () => {
        while (true) {
          const i = cursor++;
          if (i >= FRAME_COUNT) return;
          const img = await loadImg(url(framesBasePath, i + 1));
          if (cancelled) return;
          results[i] = img;
          loadedCount++;

          // Trigger ready after READY_THRESHOLD frames — sequence is responsive
          if (!readyRef.current && loadedCount >= READY_THRESHOLD) {
            readyRef.current = true;
            onReady?.();
          }

          // Redraw if user is already mid-scroll and this frame is near current position
          const currentFrame = Math.floor(progressRef.current * (FRAME_COUNT - 1));
          if (Math.abs(i - currentFrame) <= 8) {
            draw(progressRef.current);
          }
        }
      };

      await Promise.all(Array.from({ length: 8 }, worker));
      if (cancelled) return;

      if (!readyRef.current) { onReady?.(); readyRef.current = true; }
      draw(progressRef.current);
    };

    run();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [framesBasePath]);

  // ── Resize ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width  = `${w}px`;
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
  }, []);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <canvas
        ref={canvasRef}
        className={`h-full w-full transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        role="img"
        aria-label="Scroll-controlled Nufty canopy transformation"
      />
      {/* Fallback: dark background while frame 1 fetches — usually <200ms on 5G */}
      {!visible && !failed && (
        <div className="absolute inset-0 bg-ink" />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink">
          <p className="label text-[9px] text-white/45">Nufty Rental Service</p>
        </div>
      )}
    </div>
  );
});

export default ScrollImageSequence;
