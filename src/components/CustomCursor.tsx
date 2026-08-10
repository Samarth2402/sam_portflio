"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      // Move dot instantly
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0,
        });
      }
      
      // Move ring with lag
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          x: e.clientX - 16,
          y: e.clientY - 16,
          duration: 0.15,
          ease: "power2.out",
        });
      }
    };

    const onMouseEnter = () => {
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          scale: 1.5,
          backgroundColor: "rgba(46, 217, 160, 0.2)",
          borderColor: "rgba(46, 217, 160, 0)",
          duration: 0.3,
        });
      }
    };

    const onMouseLeave = () => {
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.5)",
          duration: 0.3,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Add hover effects to all links and buttons
    const attachHoverEvents = () => {
      const clickables = document.querySelectorAll("a, button, .cursor-pointer");
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
        // Remove default cursor from clickables too
        (el as HTMLElement).style.cursor = "none";
      });
    };

    // Initial attach
    attachHoverEvents();

    // Re-attach on DOM mutations (simple observer)
    const observer = new MutationObserver(() => attachHoverEvents());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.style.cursor = "auto";
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#2ED9A0] rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[99] box-border"
      />
    </>
  );
}
