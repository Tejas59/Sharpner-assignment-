import express from 'express';
import fs from 'fs';
const app = express();



// Function to format message with username
const formatMessage = (username, message) => {
  return `${username}: ${message}\n`;
};

// Load messages from file
const messages = fs.readFileSync('messages.txt', 'utf-8') || '';

// Handle login form submission
app.post('/login', (req, res) => {
  const username = req.body.username;
  localStorage.setItem('username', username);
  res.redirect('/');
});

// Chat room route (uses GET for both login and message submission)
app.get('/', (req, res) => {
  const username = localStorage.getItem('username') || '';

  // Check if username exists in local storage
  if (username) {
    // Send the chat room page with username and message form
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Chat Room</title>
      </head>
      <body>
        <h1>Welcome, ${username}</h1>
        <input type="text" id="message">
        <button id="send-button">Send</button>
        <div id="chat-messages">${messages}</div>
        <script>
          const messageInput = document.getElementById('message');
          const sendButton = document.getElementById('send-button');
          const chatMessages = document.getElementById('chat-messages');

          sendButton.addEventListener('click', () => {
            const message = messageInput.value;
            fetch('/send', {
              method: 'POST',
              body: JSON.stringify({ message })
            })
            .then(() => messageInput.value = '')
            .catch(error => console.error(error));
          });

          // Fetch messages on page load and after sending a message
          fetch('/messages')
            .then(response => response.text())
            .then(data => chatMessages.innerHTML = data)
            .catch(error => console.error(error));
        </script>
      </body>
      </html>
    `);
  } else {
    // If no username in local storage, redirect to login form
    res.redirect('/login');
  }
});

// Handle message submission
app.post('/send', (req, res) => {
  const username = localStorage.getItem('username');
  const message = req.body.message;

  // Format the message with username
  const formattedMessage = formatMessage(username, message);

  // Append the formatted message to the file
  fs.appendFileSync('messages.txt', formattedMessage);

  res.sendStatus(200);
});

// Get all messages
app.get('/messages', (req, res) => {
  const messages = fs.readFileSync('messages.txt', 'utf-8') || '';
  res.send(messages);
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
