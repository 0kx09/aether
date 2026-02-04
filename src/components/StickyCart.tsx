"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StickyCart() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-[#E8E3DC] bg-[#FAF8F5]/95 backdrop-blur-lg px-5 py-4 shadow-[0_-2px_20px_rgba(0,0,0,0.05)] transition-all duration-500 md:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      {/* Safe area padding for iPhone notch */}
      <div className="pb-safe">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs tracking-wide uppercase text-[#A8B5A0] font-light">Experience Set</div>
            <div className="text-lg font-serif font-medium text-[#2C2A27]">£9.95</div>
          </div>
          <Link
            href="/checkout"
            className="flex flex-1 items-center justify-center rounded-full bg-[#2C2A27] py-3.5 text-base font-light tracking-wide text-white transition-all duration-300 active:bg-[#6B7A64]"
          >
            Claim Your Set
          </Link>
        </div>
      </div>
    </div>
  );
}
