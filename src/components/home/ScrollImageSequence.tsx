"use client";

import {forwardRef,useEffect,useImperativeHandle,useRef,useState} from "react";
import type {GalleryImage} from "@/lib/assets";

export type ScrollImageSequenceHandle={render:(progress:number)=>void};
const FRAME_COUNT=240;
const PAD=4;
const url=(base:string,i:number)=>`${base}/frame_${String(i).padStart(PAD,"0")}.jpg`;
const load=(src:string)=>new Promise<HTMLImageElement|null>(resolve=>{const img=new Image();img.decoding="async";img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src=src;});

function cover(ctx:CanvasRenderingContext2D,img:HTMLImageElement,w:number,h:number,alpha=1){
 const ir=img.naturalWidth/img.naturalHeight, cr=w/h; let sx=0,sy=0,sw=img.naturalWidth,sh=img.naturalHeight;
 if(ir>cr){sw=sh*cr;sx=(img.naturalWidth-sw)/2}else{sh=sw/cr;sy=(img.naturalHeight-sh)/2}
 ctx.globalAlpha=alpha;ctx.drawImage(img,sx,sy,sw,sh,0,0,w,h);ctx.globalAlpha=1;
}

const ScrollImageSequence=forwardRef<ScrollImageSequenceHandle,{framesBasePath:string;fallbackImages:GalleryImage[];className?:string;onReady?:()=>void}>(function ScrollImageSequence({framesBasePath,fallbackImages,className="",onReady},ref){
 const canvasRef=useRef<HTMLCanvasElement|null>(null);const imagesRef=useRef<(HTMLImageElement|null)[]>([]);const sizeRef=useRef({w:0,h:0,dpr:1});const progressRef=useRef(0);const rafRef=useRef<number|null>(null);const [ready,setReady]=useState(false);const [pct,setPct]=useState(0);const [failed,setFailed]=useState(false);
 const draw=(progress:number)=>{const canvas=canvasRef.current,images=imagesRef.current;if(!canvas||!images.length)return;const ctx=canvas.getContext("2d");if(!ctx)return;const {w,h}=sizeRef.current;if(!w||!h)return;const scaled=Math.min(1,Math.max(0,progress))*(images.length-1);const i=Math.floor(scaled);const j=Math.min(images.length-1,i+1);const t=scaled-i;ctx.clearRect(0,0,w,h);const a=images[i]||images[j];if(a)cover(ctx,a,w,h,1);if(j!==i&&t>.02&&images[j])cover(ctx,images[j]!,w,h,t);};
 useImperativeHandle(ref,()=>({render:(p:number)=>{progressRef.current=p;if(rafRef.current)return;rafRef.current=requestAnimationFrame(()=>{rafRef.current=null;draw(progressRef.current)})}}));
 useEffect(()=>{let cancelled=false;const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const run=async()=>{if(reduced){const img=await load(url(framesBasePath,FRAME_COUNT));if(cancelled)return;if(img){imagesRef.current=[img];setPct(100);setReady(true);onReady?.();draw(1)}else setFailed(true);return;}
   const urls=Array.from({length:FRAME_COUNT},(_,i)=>url(framesBasePath,i+1));
   const results:(HTMLImageElement|null)[]=new Array(FRAME_COUNT).fill(null);let cursor=0,loaded=0;
   const worker=async()=>{while(true){const i=cursor++;if(i>=urls.length)return;results[i]=await load(urls[i]);loaded++;if(!cancelled)setPct(Math.round(loaded/urls.length*100));}};
   await Promise.all(Array.from({length:6},worker));if(cancelled)return;
   if(results.every(x=>!x)){const fallbacks=await Promise.all(fallbackImages.map(x=>load(x.src)));imagesRef.current=fallbacks;setReady(fallbacks.some(Boolean));if(fallbacks.some(Boolean))onReady?.();else setFailed(true);return;}
   imagesRef.current=results;setReady(true);onReady?.();draw(progressRef.current);
  };run();return()=>{cancelled=true;imagesRef.current=[]};
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[framesBasePath]);
 useEffect(()=>{const canvas=canvasRef.current,parent=canvas?.parentElement;if(!canvas||!parent)return;const resize=()=>{const dpr=Math.min(window.devicePixelRatio||1,2),w=parent.clientWidth,h=parent.clientHeight;sizeRef.current={w,h,dpr};canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=`${w}px`;canvas.style.height=`${h}px`;const ctx=canvas.getContext("2d");if(ctx)ctx.setTransform(dpr,0,0,dpr,0,0);draw(progressRef.current)};resize();const ro=new ResizeObserver(resize);ro.observe(parent);window.addEventListener("orientationchange",resize);return()=>{ro.disconnect();window.removeEventListener("orientationchange",resize)}},[]);
 return <div className={`relative h-full w-full ${className}`}><canvas ref={canvasRef} className={`h-full w-full transition-opacity duration-700 ${ready?"opacity-100":"opacity-0"}`} role="img" aria-label="Scroll-controlled Nufty canopy transformation"/>{!ready&&!failed&&<div className="absolute inset-0 flex items-center justify-center bg-ink"><div className="text-center"><div className="mx-auto h-7 w-7 animate-spin rounded-full border border-white/15 border-t-gold"/><p className="label mt-4 text-[8px] text-white/45">Preparing the scene · {pct}%</p></div></div>}{failed&&<div className="absolute inset-0 flex items-center justify-center bg-ink"><p className="label text-[9px] text-white/45">Nufty Rental Service</p></div>}</div>;
});
export default ScrollImageSequence;
