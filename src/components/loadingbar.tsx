"use client";
import { useEffect, useState, useRef } from "react";

export default function Loadingbar({ start }: { start: boolean }) {
  const [progress, setProgress] = useState(0);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (start) {
      if (loadingRef.current) {
        loadingRef.current.style.width = "95vw";
        setProgress(95);
      }
    } else {
      setProgress(-1);
    }
  }, [start]);

  useEffect(() => {
    if (progress !== 0 && start) {
      setTimeout(() => {
        setProgress((prevProgress) => {
          let newProgress = prevProgress;
          if (newProgress <= 100) {
            newProgress++;
          }
          return newProgress;
        });
      }, 1000);
    }
  }, [progress]);
  return (
    <>
      <div
        ref={loadingRef}
        className="absolute top-0 left-0 h-1 bg-[#0EAF7D]"
        style={{
          width: `${progress}vw`,
          transition: "ease-in-out 0.6s",
        }}
      ></div>
    </>
  );
}
