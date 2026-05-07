
## 💾 Database Schema


## User

```js
{
  name: String,
  email: String,
  password: String, // hashed using bcrypt
  photo: String,
  bio: String,
  role: String, // user | admin | creator
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Notes
- Passwords are hashed before saving using bcrypt middleware
- Email validation and uniqueness enforced through Mongoose schema validation

---

## Message

```js
{
  senderId: ObjectId,       // ref: User
  receiverId: ObjectId,     // ref: User
  conversationId: ObjectId, // ref: GroupChat
  message: String,
  isRead: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Notes
- Messages are linked to conversations through `conversationId`
- `isRead` enables read receipt functionality

---

## GroupChat / Conversation

```js
{
  participants: [ObjectId], // ref: User
  messages: [ObjectId],     // ref: Message
  isGroup: Boolean,
  groupName: String,
  groupAdmin: ObjectId,     // ref: User
  lastMessage: ObjectId,    // ref: Message
  createdAt: Date,
  updatedAt: Date
}
```

### Notes
- Supports both direct and group conversations
- `isGroup` determines conversation type
- `lastMessage` is used for sidebar previews and sorting

---

## Token

```js
{
  userId: ObjectId, // ref: User
  verificationToken: String,
  passwordResetToken: String,
  createdAt: Date,
  expiresAt: Date
}
```

### Notes
- Used for email verification and password reset flows
- Tokens are validated against their expiration time