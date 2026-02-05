"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [email, setEmail] = useState("your email");
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  useEffect(() => {
    // Get email and discount code from sessionStorage if available
    const storedEmail = sessionStorage.getItem("orderEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    const storedDiscountCode = sessionStorage.getItem("discountCode");
    const storedDiscountAmount = sessionStorage.getItem("discountAmount");
    if (storedDiscountCode) {
      setDiscountCode(storedDiscountCode);
    }
    if (storedDiscountAmount) {
      setDiscountAmount(parseFloat(storedDiscountAmount));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#A8B5A0] opacity-20 rounded-full blur-2xl scale-150"></div>
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#A8B5A0] border-4 border-[#FAF8F5] shadow-lg">
              <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="rounded-3xl border border-[#E8E3DC] bg-white/70 backdrop-blur-sm p-8 sm:p-12 text-center">
          {/* Heading */}
          <div className="mb-8">
            <div className="inline-block border-b border-[#A8B5A0] pb-2 mb-4">
              <span className="text-xs tracking-[0.2em] uppercase text-[#6B7A64] font-light">Order Confirmed</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#2C2A27] leading-tight mb-4">
              Welcome to Your Skincare Journey
            </h1>
            <p className="text-base sm:text-lg text-[#6B7A64] font-light leading-relaxed max-w-xl mx-auto">
              Thank you for claiming your complimentary experience set. Your path to radiant, healthy skin begins now.
            </p>
          </div>

          {/* Payment Notice */}
          <div className="rounded-2xl bg-gradient-to-br from-[#A8B5A0]/20 to-[#6B7A64]/10 border-2 border-[#A8B5A0] p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-[#6B7A64]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-serif font-medium text-[#2C2A27] mb-2">Payment Protection</h3>
                <p className="text-sm text-[#2C2A27] font-light leading-relaxed">
                  <strong className="font-medium">Your card will not be charged until your products arrive at your door.</strong> We only process payment upon successful delivery. If there are any issues with your shipment, you won't pay a penny.
                </p>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="space-y-6 mb-8">
            <div className="rounded-2xl bg-[#F4EFE6] border border-[#E8E3DC] p-6 text-left">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <span className="text-lg font-serif font-medium text-[#2C2A27]">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-serif font-medium text-[#2C2A27] mb-2">Check Your Email</h3>
                  <p className="text-sm text-[#6B7A64] font-light leading-relaxed">
                    We've sent a confirmation to <span className="font-medium text-[#2C2A27]">{email}</span>.
                    Please check your inbox and spam folder for order details and tracking information.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F4EFE6] border border-[#E8E3DC] p-6 text-left">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <span className="text-lg font-serif font-medium text-[#2C2A27]">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-serif font-medium text-[#2C2A27] mb-2">Expect Delivery</h3>
                  <p className="text-sm text-[#6B7A64] font-light leading-relaxed">
                    Your collection ships within 24 hours. Standard delivery typically arrives within 2-3 business days. You'll receive tracking details shortly.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F4EFE6] border border-[#E8E3DC] p-6 text-left">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <span className="text-lg font-serif font-medium text-[#2C2A27]">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-serif font-medium text-[#2C2A27] mb-2">Begin Your Ritual</h3>
                  <p className="text-sm text-[#6B7A64] font-light leading-relaxed">
                    Your exclusive skincare guide will arrive with your products. Follow our simple morning and evening routine for optimal results within 7-14 days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="rounded-2xl bg-[#E8E3DC] border border-[#A8B5A0] p-5 mb-8">
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 text-[#6B7A64] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <div className="text-left">
                <p className="text-xs sm:text-sm text-[#2C2A27] font-light leading-relaxed">
                  <span className="font-medium">Important:</span> Our confirmation emails sometimes land in spam or promotions folders.
                  If you don't see it within 5 minutes, please check there first. Add us to your contacts to ensure future updates reach your inbox.
                </p>
              </div>
            </div>
          </div>

          {/* Your Investment Summary */}
          <div className="border-t border-[#E8E3DC] pt-6 mb-8">
            <h3 className="text-sm tracking-[0.15em] uppercase text-[#6B7A64] font-light mb-4">Your Investment</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-[#6B7A64] font-light">Experience Set (3 Products)</span>
                <span className="text-[#A8B5A0] font-light">Complimentary</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7A64] font-light">Collection Value</span>
                <span className="text-[#6B7A64] font-light line-through">£135.00</span>
              </div>
              {discountCode && (
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7A64] font-light">Discount Code ({discountCode})</span>
                  <span className="text-[#A8B5A0] font-light">-£{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-[#E8E3DC]">
                <span className="font-serif font-medium text-[#2C2A27]">Shipping Reserved</span>
                <span className="font-serif font-medium text-[#2C2A27]">£{(9.95 - discountAmount).toFixed(2)}</span>
              </div>
              <p className="text-xs text-[#A8B5A0] font-light italic pt-2">
                * Charged only upon successful delivery
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full rounded-full bg-[#2C2A27] py-4 text-base font-light tracking-wide text-white transition-all duration-300 hover:bg-[#6B7A64]"
            >
              Return to Home
            </Link>
            <p className="text-xs text-[#A8B5A0] font-light">
              Questions? Contact us at hello@aether.com
            </p>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#A8B5A0] font-light">
            <span>30-Day Guarantee</span>
            <span>·</span>
            <span>Dermatologist Tested</span>
            <span>·</span>
            <span>Cruelty Free</span>
          </div>
        </div>
      </div>
    </div>
  );
}
