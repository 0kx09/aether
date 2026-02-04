const features = [
  {
    icon: (
      <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Clinical-Grade Retinol",
    description: "Professional strength retinol in Youth Restore Serum erases wrinkles and fine lines.",
  },
  {
    icon: (
      <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    title: "Overnight Transformation",
    description: "Radiance Glow Night Cream works while you sleep for morning radiance.",
  },
  {
    icon: (
      <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Eye Area Specialist",
    description: "Collagen Boost Eye Complex targets dark circles, bags, and crow's feet.",
  },
  {
    icon: (
      <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Hyaluronic Acid Infused",
    description: "Deep hydration plumps skin and fills fine lines for instant results.",
  },
  {
    icon: (
      <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Visible in 7 Days",
    description: "See dramatic improvements in just one week - guaranteed results or money back.",
  },
  {
    icon: (
      <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "All Skin Types",
    description: "Dermatologist-tested, cruelty-free formula safe for sensitive skin.",
  },
];

export default function Features() {
  return (
    <section id="ingredients" className="py-16 sm:py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block border-b border-[#A8B5A0] pb-1 mb-6">
            <span className="text-xs tracking-[0.2em] uppercase text-[#6B7A64] font-light">Clinical Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#2C2A27] leading-tight">
            Science Meets Simplicity
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#6B7A64] font-light leading-relaxed">
            Each formulation is developed with dermatologists and backed by clinical research to deliver visible, lasting results.
          </p>
        </div>

        <div className="mx-auto mt-12 sm:mt-16 grid max-w-7xl gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-3xl border border-[#E8E3DC] bg-white/50 backdrop-blur-sm p-6 sm:p-8 transition-all duration-500 hover:border-[#A8B5A0] hover:bg-white"
            >
              <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center text-[#A8B5A0]">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-serif font-medium text-[#2C2A27] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6B7A64] font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
