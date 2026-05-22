"use client";
import { useState, useEffect } from "react";

export default function ScrollProgress({ containerRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? (scrollTop / max) * 100 : 0);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [containerRef]);

  return (
    <div className="w-full h-[3px] bg-white/10 shrink-0">
      <div
        className="h-full bg-[#04b4e0] transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
