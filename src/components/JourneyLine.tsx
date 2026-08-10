"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function JourneyLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current || !glowPathRef.current || !containerRef.current) return;

    const path = pathRef.current;
    const glowPath = glowPathRef.current;
    const length = path.getTotalLength();

    // Setup initial state: dash array and offset both equal to path length (so it's hidden)
    gsap.set([path, glowPath], {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 60%", // Start animation when the top of the container hits 60% down the viewport
      end: "bottom 40%", // End animation when the bottom hits 40%
      scrub: 1, // Smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      animation: gsap.to([path, glowPath], {
        strokeDashoffset: 0,
        ease: "none"
      })
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute left-0 top-0 bottom-0 w-12 hidden md:block z-0 pointer-events-none">
      {/* SVG Container extending the full height of the Experience section */}
      <svg 
        className="w-full h-full overflow-visible" 
        viewBox="0 0 40 800" 
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Glow behind the main line */}
        <path
          ref={glowPathRef}
          d="M 20 0 L 20 250 C 20 300, 40 300, 40 350 C 40 400, 20 400, 20 450 L 20 800"
          stroke="#2ED9A0"
          strokeWidth="8"
          strokeLinecap="round"
          className="opacity-20 blur-sm"
        />
        {/* Main solid journey line */}
        <path
          ref={pathRef}
          d="M 20 0 L 20 250 C 20 300, 40 300, 40 350 C 40 400, 20 400, 20 450 L 20 800"
          stroke="#2ED9A0"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Node 1 - Top Job */}
        <circle cx="20" cy="80" r="6" fill="#07090C" stroke="#2ED9A0" strokeWidth="3" />
        {/* Node 2 - Bottom Job */}
        <circle cx="20" cy="550" r="6" fill="#07090C" stroke="#2ED9A0" strokeWidth="3" />
      </svg>
    </div>
  );
}
