"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#FAF8F5]/95 backdrop-blur-lg">
      {/* Press Bar */}
      <div className="bg-[#2C2A27] px-4 py-2 text-center text-[11px] sm:text-xs tracking-wide text-stone-200">
        <span className="uppercase font-light">
          As Featured In: Vogue • Elle • Harpers Bazaar • The Cut
        </span>
      </div>

      <nav className="flex items-center justify-between px-4 py-4 sm:py-5 max-w-7xl mx-auto">
        {/* Logo */}
        <a href="/" className="text-xl sm:text-2xl font-serif font-semibold tracking-tight text-[#2C2A27]">
          AETHER
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#ingredients" className="text-sm font-light tracking-wide text-[#6B7A64] transition-colors hover:text-[#2C2A27]">
            Ingredients
          </a>
          <a href="#results" className="text-sm font-light tracking-wide text-[#6B7A64] transition-colors hover:text-[#2C2A27]">
            Results
          </a>
          <a href="#ritual" className="text-sm font-light tracking-wide text-[#6B7A64] transition-colors hover:text-[#2C2A27]">
            Ritual
          </a>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Cart - Visible on all screens */}
          <Link
            href="/basket"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 active:bg-gray-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
              1
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 active:bg-gray-200 md:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`fixed inset-0 top-[89px] z-50 bg-white transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-6 py-8">
          <nav className="flex flex-col gap-2">
            <a
              href="#features"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-xl px-4 py-4 text-lg font-medium text-gray-900 transition-colors active:bg-gray-100"
            >
              Features
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#reviews"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-xl px-4 py-4 text-lg font-medium text-gray-900 transition-colors active:bg-gray-100"
            >
              Reviews
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#faq"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-xl px-4 py-4 text-lg font-medium text-gray-900 transition-colors active:bg-gray-100"
            >
              FAQ
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </nav>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl px-4 py-4 text-gray-600 transition-colors active:bg-gray-100"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl px-4 py-4 text-gray-600 transition-colors active:bg-gray-100"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Help & Support
            </a>
          </div>

          {/* Mobile Menu CTA */}
          <div className="mt-auto pb-8">
            <button className="w-full rounded-xl bg-black py-4 text-base font-semibold text-white transition-all active:scale-[0.98]">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
