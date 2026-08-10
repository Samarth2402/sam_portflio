"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";

const sequences = [
  "INITIALIZING EXPERIENCE...",
  "LOADING ENVIRONMENT...",
  "SYSTEM READY."
];

export default function Loader({ onLoaded }: { onLoaded: () => void }) {
  const [text, setText] = useState(sequences[0]);
  
  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx < sequences.length) {
        setText(sequences[currentIdx]);
      } else {
        clearInterval(interval);
        // Fade out
        gsap.to(".loader-container", {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: onLoaded
        });
      }
    }, 800);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div className="loader-container fixed inset-0 z-50 flex items-center justify-center bg-background text-primary font-mono text-sm tracking-widest uppercase">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-t-2 border-primary border-solid rounded-full animate-spin"></div>
        <div className="animate-pulse">{text}</div>
      </div>
    </div>
  );
}
