import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import ProductInfo from "@/components/ProductInfo";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";
import StickyCart from "@/components/StickyCart";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Header />

      {/* Hero / Product Section */}
      <main className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Image Gallery */}
          <div className="animate-fade-in">
            <ImageGallery />
          </div>

          {/* Product Info */}
          <div className="animate-fade-in delay-200">
            <ProductInfo />
          </div>
        </div>
      </main>

      {/* Features Section */}
      <div id="features">
        <Features />
      </div>

      {/* Reviews Section */}
      <div id="reviews">
        <Reviews />
      </div>

      {/* FAQ Section */}
      <div id="faq">
        <FAQ />
      </div>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Cart - adds bottom padding */}
      <StickyCart />

      {/* Spacer for sticky cart on mobile */}
      <div className="h-20 md:hidden" />
    </div>
  );
}
