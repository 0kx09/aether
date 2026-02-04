import { NextRequest, NextResponse } from "next/server";

/**
 * Helper endpoint to test Telegram bot configuration and get chat ID
 * Visit: http://localhost:3000/api/telegram/test
 */
export async function GET(request: NextRequest) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken) {
      return NextResponse.json(
        { 
          error: "TELEGRAM_BOT_TOKEN is not set",
          instructions: "Add TELEGRAM_BOT_TOKEN to your .env.local file"
        },
        { status: 400 }
      );
    }

    // Get updates from Telegram to find chat IDs
    const updatesUrl = `https://api.telegram.org/bot${botToken}/getUpdates`;
    const updatesResponse = await fetch(updatesUrl);
    
    if (!updatesResponse.ok) {
      const errorData = await updatesResponse.json().catch(() => ({}));
      return NextResponse.json(
        { 
          error: "Failed to connect to Telegram",
          details: errorData.description || "Invalid bot token",
          instructions: "Make sure your TELEGRAM_BOT_TOKEN is correct"
        },
        { status: 400 }
      );
    }

    const updatesData = await updatesResponse.json();
    
    if (!updatesData.ok) {
      return NextResponse.json(
        { 
          error: "Telegram API error",
          details: updatesData.description
        },
        { status: 400 }
      );
    }

    // Extract chat IDs from updates
    const chats = new Map();
    if (updatesData.result && updatesData.result.length > 0) {
      updatesData.result.forEach((update: any) => {
        if (update.message && update.message.chat) {
          const chat = update.message.chat;
          chats.set(chat.id, {
            id: chat.id,
            type: chat.type,
            username: chat.username || "N/A",
            first_name: chat.first_name || "N/A",
            last_name: chat.last_name || "N/A",
          });
        }
      });
    }

    const chatArray = Array.from(chats.values());
    
    return NextResponse.json({
      success: true,
      configuredChatId: chatId || "Not set",
      foundChats: chatArray,
      instructions: chatArray.length === 0 
        ? "No messages found. Send a message to your bot first, then refresh this page."
        : `Found ${chatArray.length} chat(s). Use one of these IDs in your TELEGRAM_CHAT_ID environment variable.`,
      testMessage: chatId && chatArray.length > 0
        ? "You can test sending a message by using the POST endpoint with checkout data."
        : "Set TELEGRAM_CHAT_ID to one of the chat IDs above, then test the checkout."
    });
  } catch (error) {
    console.error("Error testing Telegram:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
