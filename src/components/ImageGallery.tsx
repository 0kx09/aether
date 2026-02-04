"use client";

import { useState, useRef } from "react";

const images = [
  {
    id: 1,
    src: "/product.png",
    alt: "Complete Anti-Aging Skincare Bundle - All 3 Products",
  },
  {
    id: 2,
    src: "/product.png",
    alt: "Youth Restore Anti-Aging Serum",
  },
  {
    id: 3,
    src: "/product.png",
    alt: "Radiance Glow Night Cream",
  },
  {
    id: 4,
    src: "/product.png",
    alt: "Collagen Boost Eye Complex",
  },
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Swipe threshold
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
    if (isRightSwipe && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const goToImage = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Main Image - Swipeable on mobile */}
      <div
        ref={containerRef}
        className="relative aspect-square overflow-hidden rounded-3xl bg-[#F4EFE6]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image Container with slide effect */}
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${selectedImage * 100}%)` }}
        >
          {images.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              className="h-full w-full flex-shrink-0 object-cover"
              draggable={false}
            />
          ))}
        </div>

        {/* Mobile Swipe Indicators (dots) */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                selectedImage === index
                  ? "w-8 bg-[#2C2A27]"
                  : "w-1.5 bg-[#2C2A27]/30"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Desktop Arrow Navigation */}
        <button
          onClick={() => selectedImage > 0 && setSelectedImage(selectedImage - 1)}
          className={`absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all sm:block ${
            selectedImage === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white hover:scale-110"
          }`}
          disabled={selectedImage === 0}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => selectedImage < images.length - 1 && setSelectedImage(selectedImage + 1)}
          className={`absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all sm:block ${
            selectedImage === images.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-white hover:scale-110"
          }`}
          disabled={selectedImage === images.length - 1}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail Gallery - Scrollable on mobile */}
      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-2xl transition-all duration-300 ${
              selectedImage === index
                ? "ring-2 ring-[#6B7A64] ring-offset-2 ring-offset-[#FAF8F5]"
                : "opacity-50 hover:opacity-100 active:opacity-100"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
