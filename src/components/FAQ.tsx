"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Why is this FREE? What's the catch?",
    answer: "There's NO catch! We're so confident you'll love our products that we're giving you the entire £135 bundle FREE - you only pay £9.95 to cover shipping and handling. Once you experience the incredible results, we know you'll become a loyal customer and tell your friends!",
  },
  {
    question: "How do I use the 3 products together?",
    answer: "Simple! Morning: Apply Youth Restore Serum, then Collagen Boost Eye Complex around eyes. Evening: Cleanse, apply Youth Restore Serum, then Radiance Glow Night Cream. Apply Eye Complex around eyes. Use daily for best results - most customers see dramatic improvements within 7-14 days!",
  },
  {
    question: "When will I see results?",
    answer: "Most customers notice visible improvements within 7 days! Fine lines soften, skin looks plumper and more radiant, and dark circles fade. By week 4, you'll see dramatic transformation - wrinkles reduced, skin glowing, and a more youthful appearance. Results improve with continued use.",
  },
  {
    question: "Is this suitable for my skin type?",
    answer: "Absolutely! Our formulas are dermatologist-tested and safe for ALL skin types - dry, oily, combination, sensitive, and mature skin. The products are hypoallergenic, cruelty-free, and made with premium ingredients. If you have specific concerns, consult your dermatologist.",
  },
  {
    question: "What if I'm not satisfied?",
    answer: "We offer a 30-day money-back guarantee! If you're not completely thrilled with your results, simply return the products for a full refund - no questions asked. We're so confident you'll love them, we'll take all the risk!",
  },
  {
    question: "How long will shipping take?",
    answer: "UK orders ship within 24 hours and typically arrive in 3-5 business days. We use tracked shipping so you can monitor your package. International shipping available - delivery times vary by location.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="ritual" className="py-16 sm:py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block border-b border-[#A8B5A0] pb-1 mb-6">
            <span className="text-xs tracking-[0.2em] uppercase text-[#6B7A64] font-light">Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#2C2A27] leading-tight">
            Everything You Need to Know
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#6B7A64] font-light leading-relaxed">
            We&apos;re here to guide you on your skincare journey.
          </p>
        </div>

        <div className="mx-auto mt-12 sm:mt-16 max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-[#E8E3DC] bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-[#A8B5A0]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-5 sm:px-8 sm:py-6 text-left"
              >
                <span className="pr-4 text-sm sm:text-base font-serif font-medium text-[#2C2A27]">{faq.question}</span>
                <svg
                  className={`h-5 w-5 flex-shrink-0 text-[#A8B5A0] transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-5 sm:px-8 sm:pb-6 text-sm sm:text-base text-[#6B7A64] font-light leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
