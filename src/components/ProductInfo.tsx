"use client";

import { useState } from "react";
import Link from "next/link";

const SHIPPING_PRICE = 9.95;
const TOTAL_VALUE = 135.00; // 3 products at £45 each

const products = [
  {
    name: "Youth Restore Anti-Aging Serum",
    value: 45.00,
    description: "Advanced retinol & hyaluronic acid formula"
  },
  {
    name: "Radiance Glow Night Cream",
    value: 45.00,
    description: "Intensive overnight skin renewal treatment"
  },
  {
    name: "Collagen Boost Eye Complex",
    value: 45.00,
    description: "Target wrinkles, dark circles & puffiness"
  }
];

export default function ProductInfo() {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCart = localStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];

    // Add new item or update quantity
    const productIndex = cart.findIndex((item: any) => item.id === 1);
    if (productIndex >= 0) {
      cart[productIndex].quantity += quantity;
    } else {
      cart.push({
        id: 1,
        name: "Complete Anti-Aging Skincare System",
        variant: "3-Product Complimentary Set",
        price: SHIPPING_PRICE,
        quantity: quantity,
        image: "/product.png",
      });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 5000);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Limited Release Badge */}
      <div className="inline-flex items-center gap-2 self-start border border-[#6B7A64] px-4 py-2 rounded-full">
        <div className="w-2 h-2 rounded-full bg-[#6B7A64]"></div>
        <span className="text-xs tracking-widest uppercase text-[#6B7A64] font-light">Batch 04: Limited Release</span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex text-[#B89E88]">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-[#6B7A64] font-light">4.8 / 5.0 <span className="text-xs">(2,847 reviews)</span></span>
      </div>

      {/* Title */}
      <div>
        <div className="inline-block border-b border-[#A8B5A0] pb-1 mb-4">
          <span className="text-xs tracking-[0.2em] uppercase text-[#6B7A64] font-light">Complimentary Experience Set</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#2C2A27] leading-[1.1] tracking-tight">
          Professional Grade Skin, Simplified
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#6B7A64] font-light leading-relaxed">
          A curated trio of clinical-strength formulations designed to restore, renew, and reveal your most radiant complexion.
        </p>
      </div>

      {/* Bento Grid - Product Display */}
      <div className="grid grid-cols-1 gap-3">
        {products.map((product, index) => (
          <div key={index} className="group relative overflow-hidden rounded-2xl bg-[#F4EFE6] border border-[#E8E3DC] p-5 transition-all hover:border-[#A8B5A0]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-serif font-medium text-[#2C2A27] mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-[#6B7A64] font-light leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#6B7A64] line-through">£{product.value.toFixed(2)}</p>
                <p className="text-sm font-medium text-[#A8B5A0]">Included</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="border-t border-b border-[#E8E3DC] py-6 space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-sm tracking-wide uppercase text-[#6B7A64] font-light">Collection Value</span>
          <span className="text-lg text-[#2C2A27] line-through font-light">£{TOTAL_VALUE.toFixed(2)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-sm tracking-wide uppercase text-[#6B7A64] font-light">Your Investment</span>
          <span className="text-2xl font-serif font-medium text-[#2C2A27]">£{SHIPPING_PRICE}</span>
        </div>
        <p className="text-xs text-[#A8B5A0] font-light italic pt-2">
          Experience set complimentary — you cover fulfillment only
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center py-4 border border-[#E8E3DC] rounded-xl">
          <svg className="h-8 w-8 mx-auto mb-2 text-[#A8B5A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className="text-xs tracking-wide uppercase text-[#6B7A64] font-light">Dermatologist</p>
          <p className="text-xs tracking-wide uppercase text-[#6B7A64] font-light">Tested</p>
        </div>
        <div className="text-center py-4 border border-[#E8E3DC] rounded-xl">
          <svg className="h-8 w-8 mx-auto mb-2 text-[#A8B5A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-xs tracking-wide uppercase text-[#6B7A64] font-light">Clinical</p>
          <p className="text-xs tracking-wide uppercase text-[#6B7A64] font-light">Results</p>
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="text-sm font-medium text-gray-700">Quantity</label>
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-gray-200 text-xl font-medium transition-colors active:bg-gray-100"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-10 text-center text-lg font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-gray-200 text-xl font-medium transition-colors active:bg-gray-100"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex flex-col gap-4">
        {addedToCart ? (
          <>
            <Link
              href="/basket"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#A8B5A0] py-5 text-base sm:text-lg font-light tracking-wide text-white transition-all duration-300 hover:bg-[#6B7A64] shadow-lg"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Added! View Basket
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <button
              onClick={handleAddToCart}
              className="w-full rounded-full border-2 border-[#E8E3DC] bg-white py-4 text-base font-light tracking-wide text-[#6B7A64] transition-all duration-300 hover:border-[#A8B5A0] hover:bg-[#F4EFE6]"
            >
              Add Another Set
            </button>
          </>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full rounded-full bg-[#2C2A27] py-4 sm:py-5 text-base sm:text-lg font-light tracking-wide text-white transition-all duration-300 hover:bg-[#6B7A64]"
          >
            Claim Your Set — £{(SHIPPING_PRICE * quantity).toFixed(2)}
          </button>
        )}
        <p className="text-xs text-center text-[#A8B5A0] font-light">
          30-Day Results Guarantee · Complimentary Returns
        </p>
      </div>

      {/* The Philosophy */}
      <div className="rounded-2xl bg-[#F4EFE6] border border-[#E8E3DC] p-6 sm:p-8">
        <h3 className="text-sm tracking-[0.2em] uppercase text-[#6B7A64] font-light mb-4">
          Our Invitation
        </h3>
        <p className="text-sm text-[#2C2A27] font-light leading-relaxed mb-4">
          We believe extraordinary skincare should be accessible to everyone. This complimentary experience set allows you to discover professional-grade formulations without the department store markup.
        </p>
        <p className="text-sm text-[#6B7A64] font-light leading-relaxed italic">
          "Radiant skin is not a luxury. It&apos;s a fundamental expression of self-care and confidence."
        </p>
        <div className="mt-6 pt-6 border-t border-[#E8E3DC] space-y-2 text-xs text-[#6B7A64] font-light">
          <p>✓ Full-size professional formulations</p>
          <p>✓ 30-day visible results guarantee</p>
          <p>✓ Complimentary skincare consultation</p>
          <p>✓ Free returns & exchanges</p>
        </div>
      </div>

      {/* Subtle Trust Footer */}
      <div className="flex flex-wrap justify-center gap-6 text-xs text-[#A8B5A0] font-light">
        <span>Worldwide Shipping</span>
        <span>·</span>
        <span>Cruelty Free</span>
        <span>·</span>
        <span>Clean Ingredients</span>
      </div>
    </div>
  );
}
