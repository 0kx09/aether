"use client";

import { useState } from "react";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Complete Anti-Aging Skincare System",
    variant: "3-Product Complimentary Set",
    price: 9.95,
    quantity: 1,
    image: "/product.png",
  },
];

export default function BasketPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const productValue = 135.00; // Value of the 3 products
  const shippingCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const total = shippingCost;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setPromoApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#E8E3DC] bg-[#FAF8F5]/95 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-4 sm:py-5 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-[#6B7A64] hover:text-[#2C2A27] transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-light tracking-wide">Continue Shopping</span>
          </Link>
          <h1 className="text-xl font-serif font-medium text-[#2C2A27]">Basket</h1>
          <div className="w-32" />
        </div>
      </header>

      {cartItems.length === 0 ? (
        /* Empty Cart */
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F4EFE6]">
            <svg className="h-10 w-10 text-[#A8B5A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="mt-6 text-xl font-serif font-medium text-[#2C2A27]">Your basket is empty</h2>
          <p className="mt-2 text-center text-sm text-[#6B7A64] font-light">
            Discover your most radiant skin with our complimentary experience set.
          </p>
          <Link
            href="/"
            className="mt-8 rounded-full bg-[#2C2A27] px-8 py-3.5 text-sm font-light tracking-wide text-white transition-all duration-300 hover:bg-[#6B7A64]"
          >
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Cart Items */}
          <div className="rounded-3xl border border-[#E8E3DC] bg-white/50 backdrop-blur-sm overflow-hidden">
            <div className="divide-y divide-[#E8E3DC]">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 p-5 sm:p-6">
                  {/* Product Image */}
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-[#F4EFE6]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm sm:text-base font-serif font-medium text-[#2C2A27]">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-[#A8B5A0] font-light">{item.variant}</p>
                        <p className="mt-1 text-xs text-[#6B7A64] font-light italic">Collection value: £135.00</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[#A8B5A0] transition-colors hover:bg-[#F4EFE6] hover:text-[#6B7A64]"
                        aria-label="Remove item"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E3DC] text-[#6B7A64] transition-colors hover:border-[#A8B5A0] hover:bg-[#F4EFE6]"
                          aria-label="Decrease quantity"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 text-center text-sm font-light text-[#2C2A27]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E3DC] text-[#6B7A64] transition-colors hover:border-[#A8B5A0] hover:bg-[#F4EFE6]"
                          aria-label="Increase quantity"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-base font-serif font-medium text-[#2C2A27]">
                        £{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-4 rounded-3xl border border-[#E8E3DC] bg-white/50 backdrop-blur-sm p-5 sm:p-6">
            <h2 className="text-base sm:text-lg font-serif font-medium text-[#2C2A27]">Order Summary</h2>
            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7A64] font-light">Experience Set Value</span>
                <span className="font-light text-[#2C2A27] line-through">£{productValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#A8B5A0] font-light">Collection Discount</span>
                <span className="font-light text-[#A8B5A0]">-£{productValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7A64] font-light">Fulfillment & Shipping</span>
                <span className="font-light text-[#2C2A27]">£{shippingCost.toFixed(2)}</span>
              </div>
              <div className="border-t border-[#E8E3DC] pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-serif font-medium text-[#2C2A27]">Your Investment</span>
                  <span className="text-2xl font-serif font-medium text-[#2C2A27]">£{total.toFixed(2)}</span>
                </div>
                <p className="mt-2 text-xs text-[#A8B5A0] font-light italic">Complimentary products · You cover shipping only</p>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="sticky bottom-0 mt-6 bg-[#FAF8F5]/95 backdrop-blur-lg p-4 sm:p-6 border-t border-[#E8E3DC]">
            <Link
              href="/checkout"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2C2A27] py-4 text-base font-light tracking-wide text-white transition-all duration-300 hover:bg-[#6B7A64]"
            >
              Complete Your Order
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#A8B5A0] font-light">
              <span>30-Day Guarantee</span>
              <span>·</span>
              <span>Secure Checkout</span>
              <span>·</span>
              <span>Complimentary Returns</span>
            </div>
          </div>

          {/* Bottom spacer for mobile */}
          <div className="h-4" />
        </div>
      )}
    </div>
  );
}
