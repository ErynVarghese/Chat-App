# Chat App

A full-stack real-time chat application built with **Next.js**, **Express.js**, **Socket.io**, and **MongoDB**. Support for direct messaging, group conversations, presence detection, typing indicators, and message read receipts.

## ✨ Features

### Authentication & User Management
- User registration with email verification
- Secure JWT-based authentication
- Password reset flow via email
- Email verification tokens
- Password change functionality
- User search across the platform

### Direct Messaging
- One-on-one instant messaging
- Auto-create conversations on first message
- Conversation history persistence
- Search through existing direct conversations

### Group Chat
- Create group conversations with multiple participants
- Custom group names and admin management
- Add/manage group participants
- Group message history
- Search for groups by name

### Real-time Features (Socket.io)
- **Instant Messages**: Real-time message delivery using WebSocket
- **Typing Indicators**: See when others are typing in a conversation
- **Online/Offline Status**: Live presence detection for all connected users
- **Read Receipts**: Visual indicators when messages are read
- **Message Ordering**: Chronologically ordered messages with date separators

### User Experience
- WhatsApp-style date separators in chat history
- Last message preview in sidebar conversations
- User online status indicator (green dot for online users)
- Smooth real-time updates via Socket.io
- Toast notifications for user actions
- Responsive design optimized for all screen sizes

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ React Components (SideBar, Messages, Auth)           │  │
│  │ Context API (Global State & Socket Management)       │  │
│  │ Tailwind CSS (Styling)                               │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP & WebSocket
┌────────────────────────▼────────────────────────────────────┐
│                   Backend (Express.js)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ RESTful API (Authentication, Conversations, Users)   │  │
│  │ Socket.io Server (Real-time Events)                  │  │
│  │ JWT Middleware (Protected Routes)                    │  │
│  │ Email Service (Verification, Password Reset)         │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ MongoDB Connection
┌────────────────────────▼────────────────────────────────────┐
│                  Database (MongoDB)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ User Schema (Profile, Auth Data)                     │  │
│  │ Token Schema (JWT, Verification, Reset Tokens)       │  │
│  │ Message Schema (Content, Metadata, Read Status)      │  │
│  │ GroupChat Schema (Participants, Group Info)          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** — React framework with App Router
- **React** — UI components and hooks
- **Tailwind CSS** — Utility-first CSS framework
- **Socket.io Client** — Real-time communication
- **Axios** — HTTP client for API requests
- **React Hot Toast** — Toast notifications
- **React Icons** — Icon library

### Backend
- **Express.js** — Node.js web framework
- **Socket.io** — Real-time bidirectional communication
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB object modeling
- **JWT** — JSON Web Tokens for authentication
- **bcryptjs** — Password hashing
- **nodemailer** — Email service
- **dotenv** — Environment variable management

## 📁 Project Structure

```
chat-app/
├── backend/
│   ├── server.js                 # Express server entry point
│   ├── package.json              # Backend dependencies
│   ├── .env                      # Environment variables (create this)
│   ├── socket/
│   │   └── socket.js             # Socket.io initialization & event handlers
│   └── src/
│       ├── controllers/          # Business logic
│       │   ├── MessageController.js
│       │   ├── ChatUserController.js
│       │   └── auth/
│       │       ├── AdminController.js
│       │       └── UserController.js
│       ├── models/               # Database schemas
│       │   ├── auth/
│       │   │   ├── UserModel.js
│       │   │   └── Token.js
│       │   └── Chat/
│       │       ├── GroupChat.js
│       │       └── MessageModel.js
│       ├── routes/               # API endpoints
│       │   └── userRoutes.js
│       ├── middleware/           # Custom middleware
│       │   └── authMiddleware.js
│       ├── helpers/              # Utility functions
│       │   ├── ErrorHandle.js
│       │   ├── generateToken.js
│       │   ├── HashToken.js
│       │   └── SendEmail.js
│       ├── db/
│       │   └── connect.js        # MongoDB connection
│       └── views/                # Email templates
│           ├── EmailVerifTemplate.hbs
│           └── PasswordResetTemplate.hbs
├── client/
│   ├── app/
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── globals.css           # Global styles
│   │   ├── Components/
│   │   │   ├── auth/             # Authentication forms
│   │   │   │   ├── LoginForm/
│   │   │   │   ├── RegisterForm/
│   │   │   │   ├── ForgotPasswordForm/
│   │   │   │   ├── ResetForm/
│   │   │   │   └── ChangePasswordForm/
│   │   │   ├── SideBar/          # Conversation list & search
│   │   │   │   ├── SideBar.tsx
│   │   │   │   ├── Conversations.jsx
│   │   │   │   ├── Conversation.jsx
│   │   │   │   ├── SearchInput.jsx
│   │   │   │   ├── GroupModal.jsx
│   │   │   │   └── LogoutButton.tsx
│   │   │   └── Messages/         # Chat interface
│   │   │       ├── ChatContainer.jsx
│   │   │       ├── Messages.jsx
│   │   │       ├── Message.jsx
│   │   │       └── MessageInput.jsx
│   │   └── Routes/               # Page routes
│   │       ├── login/
│   │       ├── register/
│   │       ├── forgot-password/
│   │       ├── reset-password/
│   │       └── verify-email/
│   ├── context/
│   │   └── UserContext.js        # Global state management
│   ├── hooks/
│   │   ├── useUserRedirect.tsx
│   │   └── extractTime.js
│   ├── providers/
│   │   └── UserProvider.tsx
│   ├── package.json              # Frontend dependencies
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── tailwind.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **MongoDB** instance (local or cloud-hosted like MongoDB Atlas)
- **Gmail account** (for email service)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server
PORT=8000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/chat-app
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/chat-app

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Email Service (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
# Generate app password: https://myaccount.google.com/apppasswords

# Frontend URL
CLIENT_URL=http://localhost:3000
```

### Running the Application

**Terminal 1 - Start the backend server:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:8000`

**Terminal 2 - Start the frontend dev server:**
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:3000`

Open your browser and navigate to `http://localhost:3000`

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/v1/auth/register` | Register new user | ❌ |
| POST | `/api/v1/auth/login` | User login | ❌ |
| POST | `/api/v1/auth/verify-email` | Verify email address | ❌ |
| POST | `/api/v1/auth/forgot-password` | Request password reset | ❌ |
| POST | `/api/v1/auth/reset-password` | Reset password with token | ❌ |
| POST | `/api/v1/auth/change-password` | Change password (logged in) | ✅ |
| POST | `/api/v1/auth/logout` | User logout | ✅ |

### Conversation Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/v1/conversations` | Get all user conversations | ✅ |
| POST | `/api/v1/conversations/direct` | Create/find direct conversation | ✅ |
| POST | `/api/v1/conversations/group` | Create group conversation | ✅ |

### Message Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/v1/messages/:conversationId` | Get messages in conversation | ✅ |
| POST | `/api/v1/messages/send` | Send message | ✅ |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/v1/users/search?query=name` | Search users | ✅ |
| GET | `/api/v1/users/profile` | Get current user profile | ✅ |

## 🔌 Socket.io Events

### Client → Server

**newMessage**
```javascript
socket.emit('newMessage', {
  conversationId: "conv_123",
  message: "Hello!",
  senderName: "John"
});
```

**typing**
```javascript
socket.emit('typing', {
  conversationId: "conv_123"
});
```

**messageRead**
```javascript
socket.emit('messageRead', {
  conversationId: "conv_123",
  messageId: "msg_123"
});
```

### Server → Client

**newMessage**
```javascript
socket.on('newMessage', ({
  conversationId,
  message,
  sender,
  createdAt
}) => {
  // Update chat UI
});
```

**typing**
```javascript
socket.on('typing', ({
  conversationId,
  userId
}) => {
  // Show typing indicator
});
```

**getOnlineUsers**
```javascript
socket.on('getOnlineUsers', (onlineUserIds) => {
  // Update presence status
});
```

**messageRead**
```javascript
socket.on('messageRead', ({
  conversationId,
  messageId
}) => {
  // Update read receipt
});
```

## 💾 Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  isEmailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Message Schema
```javascript
{
  conversationId: ObjectId (ref: GroupChat),
  sender: ObjectId (ref: User),
  content: String,
  isRead: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### GroupChat Schema
```javascript
{
  groupName: String (optional),
  isGroup: Boolean,
  participants: [ObjectId] (ref: User),
  groupAdmin: ObjectId (ref: User),
  messages: [ObjectId] (ref: Message),
  lastMessage: ObjectId (ref: Message),
  createdAt: Date,
  updatedAt: Date
}
```

### Token Schema
```javascript
{
  userId: ObjectId (ref: User),
  token: String (hashed),
  type: String (verification | reset),
  expiresAt: Date,
  createdAt: Date
}
```

## 🔐 Authentication Flow

1. **Registration**
   - User enters email, password, name
   - Backend hashes password with bcryptjs
   - Verification token sent to email
   - User must verify email before accessing app

2. **Login**
   - User enters email and password
   - Backend validates credentials
   - JWT token generated and sent
   - Token stored in client (httpOnly cookie recommended)

3. **Protected Routes**
   - All API requests include JWT in Authorization header
   - Middleware verifies token validity
   - Expired tokens return 401 Unauthorized

4. **Password Reset**
   - User requests password reset with email
   - Reset token sent to email
   - User clicks link, enters new password
   - Password updated and reset token invalidated

## 📱 Screenshots

### Login Page
![Login Page](https://via.placeholder.com/800x600?text=Login+Page)

### Chat Interface - Direct Messages
![Chat Interface](https://via.placeholder.com/800x600?text=Chat+Interface)

### Chat Interface - Group Chat
![Group Chat](https://via.placeholder.com/800x600?text=Group+Chat)

### Create Group Modal
![Create Group](https://via.placeholder.com/800x600?text=Create+Group+Modal)

### User Search
![User Search](https://via.placeholder.com/800x600?text=User+Search)

### Online Status & Presence
![Presence Status](https://via.placeholder.com/800x600?text=Online+Status)

### Typing Indicators
![Typing Indicators](https://via.placeholder.com/800x600?text=Typing+Indicators)

### Read Receipts
![Read Receipts](https://via.placeholder.com/800x600?text=Read+Receipts)

## 🎯 Features in Detail

### Date Separators
Messages are grouped by date with visual separators (e.g., "Today", "Yesterday", "March 15"). Improves readability of conversation history.

### Online Status
Green dot indicates user is currently online. Status updates in real-time as users connect/disconnect.

### Typing Indicators
"[User] is typing..." message appears when another user is actively typing in the conversation.

### Read Receipts
Checkmark icon appears next to sent messages. Double checkmark indicates recipient has read the message.

### Group Conversations
- Create groups with custom names and multiple participants
- Admin manages group settings
- All members see full conversation history
- Real-time updates for all participants

## 🐛 Troubleshooting

### Messages not appearing
- Verify Socket.io connection in browser console
- Check browser network tab for WebSocket connection
- Ensure backend server is running on correct port

### Emails not sending
- Verify Gmail app password is correct
- Check spam folder for verification emails
- Enable "Less secure app access" if using regular Gmail password

### MongoDB connection error
- Verify MONGO_URI is correct
- Check if MongoDB server is running
- For MongoDB Atlas, whitelist your IP address

## 📚 Dependencies

See `backend/package.json` and `client/package.json` for complete lists.

### Key Backend Dependencies
- express
- socket.io
- mongoose
- jsonwebtoken
- bcryptjs
- nodemailer

### Key Frontend Dependencies
- next
- react
- tailwindcss
- axios
- socket.io-client
- react-hot-toast

## 📝 License

This project is provided as-is for learning and development purposes. Feel free to use, modify, and distribute as needed.

## 👤 Author

Built with ❤️ for learning real-time chat applications.

---

**Last Updated**: May 2026
