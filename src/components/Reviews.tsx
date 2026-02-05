"use client";

import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Emma L.",
    avatar: "E",
    rating: 5,
    date: "1 day ago",
    title: "I only paid £9.50 and got £135 worth of products!",
    content: "I honestly thought this was a scam - how could they give away £135 worth of premium skincare for just shipping costs?! But it's REAL! The serum made my wrinkles vanish in 2 weeks, the night cream is LUXURIOUS, and the eye complex eliminated my dark circles. I've spent THOUSANDS on skincare and this FREE bundle beats everything! Ordered 3 more for friends. DO NOT MISS THIS!",
    verified: true,
    helpful: 1247,
  },
  {
    id: 2,
    name: "Sophie M.",
    avatar: "S",
    rating: 5,
    date: "2 days ago",
    title: "Better than my £200 department store creams!",
    content: "I was using La Mer and other £200+ products. This FREE bundle is BETTER! The retinol serum is professional-grade, the night cream is so rich and hydrating, and the eye complex actually WORKS. My husband can't believe I only paid £9.50 shipping. My skin looks 10 years younger in just 3 weeks. This is the deal of the CENTURY!",
    verified: true,
    helpful: 983,
  },
  {
    id: 3,
    name: "Charlotte R.",
    avatar: "C",
    rating: 5,
    date: "4 days ago",
    title: "My friends are begging me to tell them my secret!",
    content: "Everyone keeps asking what I'm doing - they think I got Botox or fillers! Nope, just this AMAZING free bundle. The Youth Restore Serum erased my forehead lines, the Radiance Glow Cream makes me look dewy and fresh, and the eye complex got rid of my crows feet. For £9.50?! This is INSANE value. Already claimed 2 more bundles!",
    verified: true,
    helpful: 856,
  },
  {
    id: 4,
    name: "Jessica K.",
    avatar: "J",
    rating: 5,
    date: "5 days ago",
    title: "Cancelled my £300 dermatologist appointment!",
    content: "I was about to spend £300 on prescription retinol from my dermatologist when I found this offer. Thought why not try it - worst case I'm out £9.50. BEST DECISION EVER! The serum is pharmaceutical-grade quality. My acne scars faded, my skin is glowing, and I look YEARS younger. This would easily cost £300+ at a clinic. GET IT NOW!",
    verified: true,
    helpful: 729,
  },
  {
    id: 5,
    name: "Olivia T.",
    avatar: "O",
    rating: 5,
    date: "1 week ago",
    title: "People think I'm my daughter's SISTER at 48!",
    content: "I'm 48 and strangers literally think I'm in my early 30s now! This 3-product system transformed my aging skin. The hyaluronic acid serum plumped everything up, the night cream reversed sun damage, and my under-eyes look INCREDIBLE. I can't believe this is FREE - it's better than my £500 spa facials. Claimed 4 bundles for my family. THANK YOU!",
    verified: true,
    helpful: 694,
  },
];

const ratingBreakdown = [
  { stars: 5, percentage: 94 },
  { stars: 4, percentage: 4 },
  { stars: 3, percentage: 1 },
  { stars: 2, percentage: 0.5 },
  { stars: 1, percentage: 0.5 },
];

export default function Reviews() {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section id="results" className="bg-[#F4EFE6] py-16 sm:py-20 lg:py-28">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block border-b border-[#A8B5A0] pb-1 mb-6">
            <span className="text-xs tracking-[0.2em] uppercase text-[#6B7A64] font-light">Real Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#2C2A27] leading-tight">
            Transformations That Speak
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#6B7A64] font-light leading-relaxed">
            Stories from our community of 2,800+ users who discovered their most radiant skin.
          </p>
        </div>

        <div className="mx-auto mt-12 sm:mt-16 max-w-7xl grid gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Rating Summary */}
          <div className="rounded-3xl border border-[#E8E3DC] bg-white/50 backdrop-blur-sm p-8 lg:col-span-1">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-serif font-medium text-[#2C2A27]">4.8</div>
              <div className="mt-4 flex justify-center text-[#B89E88]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-3 text-sm text-[#6B7A64] font-light">2,847 verified reviews</p>
            </div>

            <div className="mt-8 space-y-3">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="w-6 text-xs text-[#6B7A64] font-light">{item.stars}</span>
                  <div className="h-1.5 flex-1 rounded-full bg-[#E8E3DC]">
                    <div
                      className="h-1.5 rounded-full bg-[#A8B5A0] transition-all duration-700"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-10 text-xs text-[#6B7A64] font-light text-right">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6 lg:col-span-2">
            {displayedReviews.map((review) => (
              <div key={review.id} className="rounded-3xl border border-[#E8E3DC] bg-white/50 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-[#A8B5A0] hover:bg-white">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#F4EFE6] text-lg font-serif font-medium text-[#6B7A64]">
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif font-medium text-[#2C2A27]">{review.name}</span>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-[10px] tracking-wide uppercase text-[#A8B5A0] font-light">
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex text-[#B89E88]">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-3.5 w-3.5 ${i < review.rating ? "fill-current" : "fill-[#E8E3DC]"}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-[#A8B5A0] font-light">{review.date}</span>
                    </div>
                  </div>
                </div>
                <h4 className="mt-5 font-serif font-medium text-[#2C2A27] text-base sm:text-lg leading-relaxed">&ldquo;{review.title}&rdquo;</h4>
                <p className="mt-3 text-sm text-[#6B7A64] font-light leading-relaxed">{review.content}</p>
              </div>
            ))}

            {!showAll && reviews.length > 3 && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full rounded-full border border-[#E8E3DC] py-4 text-sm font-light tracking-wide text-[#6B7A64] transition-all duration-300 hover:border-[#A8B5A0] hover:bg-white"
              >
                Read More Stories
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
