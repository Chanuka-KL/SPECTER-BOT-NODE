// Import the necessary module
const TelegramBot = require('node-telegram-bot-api');

// Load environment variables (make sure to have dotenv installed if using local .env file)
// require('dotenv').config();

// Use your environment variable for the bot token
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot instance using polling mode
const bot = new TelegramBot(token, { polling: true });

// Welcome message when the user starts the bot
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'User';
  
  // Send a message to the user when they use /start
  bot.sendMessage(chatId, `Hello, ${userName}! Welcome to Specter Bot! 🤖`);
});

// Help command for user guidance
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  // Send a list of commands to the user
  bot.sendMessage(chatId, `
  Available Commands:
  /start - Welcome message
  /help - List of available commands
  `);
});

// Handle any text message (not a command)
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userText = msg.text;

  // Respond to users with a custom message
  if (userText && !userText.startsWith('/')) {
    bot.sendMessage(chatId, `You said: "${userText}"`);
  }
});

// Example of a custom command: /info
bot.onText(/\/info/, (msg) => {
  const chatId = msg.chat.id;
  const infoMessage = `
  Specter Bot is a simple bot created to interact with Telegram users.
  It's capable of:
  - Greeting users
  - Responding to commands like /start and /help
  - Echoing text messages
  `;
  
  // Send an info message when user types /info
  bot.sendMessage(chatId, infoMessage);
});

// Example of handling unknown commands
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userText = msg.text;

  // Check if the message starts with "/"
 and isn't a known command
  if (userText.startsWith("/") && !["/start", "/help", "/info"].includes(userText)) {
    bot.sendMessage(chatId, `Unknown command: ${userText}. Try /help for available commands.`);
  }
});

// Optional: Add inline keyboard or callback buttons if needed
// Example of sending a message with a button
bot.onText(/\/button/, (msg) => {
  const chatId = msg.chat.id;
  
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Visit Website', url: 'https://your-website.com' }
        ]
      ]
    }
  };
  
  bot.sendMessage(chatId, 'Click below to visit our website:', options);
});
