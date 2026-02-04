export default function TrustBadges() {
  return (
    <section className="border-t border-gray-100 bg-white py-10 sm:py-12">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {/* Free Shipping */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-6 w-6 sm:h-7 sm:w-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold text-gray-900">Free UK Delivery</h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">On all orders</p>
          </div>

          {/* Secure Payment */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-6 w-6 sm:h-7 sm:w-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold text-gray-900">Secure Payment</h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">256-bit SSL</p>
          </div>

          {/* 30-Day Returns */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-6 w-6 sm:h-7 sm:w-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold text-gray-900">30-Day Returns</h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">No questions asked</p>
          </div>

          {/* 24/7 Support */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-6 w-6 sm:h-7 sm:w-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold text-gray-900">24/7 Support</h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">Expert help anytime</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mx-auto mt-8 sm:mt-12 max-w-7xl flex flex-wrap items-center justify-center gap-4 sm:gap-6 border-t border-gray-100 pt-6 sm:pt-8">
          <span className="text-xs sm:text-sm text-gray-500">We accept:</span>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Visa */}
            <div className="flex h-7 w-11 sm:h-8 sm:w-12 items-center justify-center rounded bg-gray-100 text-[10px] sm:text-xs font-bold text-blue-600">
              VISA
            </div>
            {/* Mastercard */}
            <div className="flex h-7 w-11 sm:h-8 sm:w-12 items-center justify-center rounded bg-gray-100">
              <div className="flex">
                <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-red-500 opacity-80" />
                <div className="-ml-1.5 sm:-ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-yellow-500 opacity-80" />
              </div>
            </div>
            {/* Amex */}
            <div className="flex h-7 w-11 sm:h-8 sm:w-12 items-center justify-center rounded bg-blue-500 text-[10px] sm:text-xs font-bold text-white">
              AMEX
            </div>
            {/* PayPal */}
            <div className="flex h-7 w-12 sm:h-8 sm:w-14 items-center justify-center rounded bg-gray-100 text-[10px] sm:text-xs font-bold text-blue-800">
              PayPal
            </div>
            {/* Apple Pay */}
            <div className="flex h-7 w-12 sm:h-8 sm:w-14 items-center justify-center rounded bg-black text-[10px] sm:text-xs font-bold text-white">
              Pay
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
