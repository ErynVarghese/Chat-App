## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/v1/register` | Register new user | ❌ |
| POST | `/api/v1/login` | User login | ❌ |
| GET | `/api/v1/logout` | User logout | ✅ |
| GET | `/api/v1/user` | Get current user profile | ✅ |
| PATCH | `/api/v1/user` | Update current user profile | ✅ |
| GET | `/api/v1/login-status` | Check login status | ❌ |
| POST | `/api/v1/verify-email` | Send verification email | ✅ |
| POST | `/api/v1/verify-user/:verificationToken` | Verify user email | ❌ |
| POST | `/api/v1/forgot-password` | Request password reset | ❌ |
| POST | `/api/v1/reset-password/:ResetPasswordToken` | Reset password | ❌ |
| PATCH | `/api/v1/change-password` | Change password | ✅ |

### Conversation Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/v1/conversations` | Get user conversations | ✅ |
| POST | `/api/v1/conversations/direct` | Create/find direct conversation | ✅ |
| POST | `/api/v1/conversations/group` | Create group conversation | ✅ |

### Message Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/v1/messages/:id` | Get conversation messages | ✅ |
| POST | `/api/v1/messages/send/:id` | Send message | ✅ |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/v1/users` | Get sidebar users | ✅ |
| GET | `/api/v1/users/search` | Search users | ✅ |