# MindCare - Database Schema

## Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────┐
│                        USERS                            │
├─────────────────────────────────────────────────────────┤
│ _id              : ObjectId (PK)                        │
│ name             : String (required)                    │
│ email            : String (required, unique)            │
│ password         : String (required, hashed)            │
│ bio              : String (optional)                    │
│ favoriteExercise : String (optional)                    │
│ createdAt        : Date (auto)                          │
│ updatedAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘
                            │
                            │ 1:N (One user has many sessions)
                            │
┌─────────────────────────────────────────────────────────┐
│                      SESSIONS                           │
├─────────────────────────────────────────────────────────┤
│ _id              : ObjectId (PK)                        │
│ userId           : ObjectId (FK → users._id, required)  │
│ exerciseType     : String (required)                    │
│                    enum: ['Box Breathing',              │
│                           '4-7-8 Breathing',            │
│                           'Deep Breathing']             │
│ duration         : Number (required, in minutes)        │
│ mood             : String (required)                    │
│                    enum: ['Calm', 'Happy', 'Relaxed',   │
│                           'Peaceful', 'Energized',      │
│                           'Stressed', 'Anxious']        │
│ notes            : String (optional)                    │
│ createdAt        : Date (auto)                          │
│ updatedAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                      FEEDBACK                           │
├─────────────────────────────────────────────────────────┤
│ _id              : ObjectId (PK)                        │
│ userId           : ObjectId (FK → users._id, optional)  │
│ name             : String (required)                    │
│ email            : String (required)                    │
│ message          : String (required)                    │
│ createdAt        : Date (auto)                          │
│ updatedAt        : Date (auto)                          │
└─────────────────────────────────────────────────────────┘
```

---

## Detailed Schema Definitions

### 1. Users Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Antonio Enriquez",
  email: "antonio@example.com",
  password: "$2b$10$K3W1...", // Hashed with bcrypt
  bio: "Mindfulness enthusiast learning daily",
  favoriteExercise: "Box Breathing",
  createdAt: ISODate("2025-11-24T10:00:00.000Z"),
  updatedAt: ISODate("2025-11-24T10:00:00.000Z")
}
```

**Indexes:**
- `email`: Unique index for fast lookup and preventing duplicates
- `_id`: Default primary key index

**Validations:**
- `name`: Required, min length 2, max length 50
- `email`: Required, valid email format, unique
- `password`: Required, min length 6 (hashed before storage)
- `bio`: Optional, max length 500
- `favoriteExercise`: Optional, must be valid exercise type

---

### 2. Sessions Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  userId: ObjectId("507f1f77bcf86cd799439011"),
  exerciseType: "Box Breathing",
  duration: 5,
  mood: "Calm",
  notes: "Felt very relaxed after this session",
  createdAt: ISODate("2025-11-24T14:30:00.000Z"),
  updatedAt: ISODate("2025-11-24T14:30:00.000Z")
}
```

**Indexes:**
- `userId`: Index for efficient queries by user
- `createdAt`: Index for date-based sorting and filtering
- Compound index: `{ userId: 1, createdAt: -1 }` for user's recent sessions

**Validations:**
- `userId`: Required, must reference existing user
- `exerciseType`: Required, enum validation
- `duration`: Required, number between 1-60 minutes
- `mood`: Required, enum validation
- `notes`: Optional, max length 500

**Relationships:**
- Belongs to User (userId foreign key)
- Cascade delete: When user is deleted, all their sessions are deleted

---

### 3. Feedback Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439013"),
  userId: ObjectId("507f1f77bcf86cd799439011"), // Optional
  name: "Antonio Enriquez",
  email: "antonio@example.com",
  message: "Great app! Would love to see more exercises.",
  createdAt: ISODate("2025-11-24T15:00:00.000Z"),
  updatedAt: ISODate("2025-11-24T15:00:00.000Z")
}
```

**Indexes:**
- `userId`: Index for linking feedback to users (when authenticated)
- `createdAt`: Index for sorting feedback by date

**Validations:**
- `userId`: Optional (can submit feedback without login in future)
- `name`: Required, min length 2, max length 50
- `email`: Required, valid email format
- `message`: Required, min length 10, max length 1000

---

## Database Queries & Performance

### Common Queries

1. **Get User Sessions (Most Frequent)**
```javascript
db.sessions.find({ userId: ObjectId("...") })
  .sort({ createdAt: -1 })
  .limit(50)
```
**Optimization**: Compound index on `{ userId: 1, createdAt: -1 }`

2. **Calculate User Stats**
```javascript
db.sessions.aggregate([
  { $match: { userId: ObjectId("...") } },
  { $group: {
      _id: null,
      totalSessions: { $sum: 1 },
      totalMinutes: { $sum: "$duration" }
    }
  }
])
```
**Optimization**: Index on `userId`

3. **Get Recent Sessions (Last 7 days)**
```javascript
db.sessions.find({
  userId: ObjectId("..."),
  createdAt: {
    $gte: new Date(Date.now() - 7*24*60*60*1000)
  }
}).sort({ createdAt: -1 })
```
**Optimization**: Compound index on `{ userId: 1, createdAt: -1 }`

---

## Data Integrity Rules

1. **User Deletion**
   - Cascade delete all user's sessions
   - Soft delete feedback (keep userId but anonymize)

2. **Password Management**
   - Always hash with bcrypt before storage
   - Never include password in query responses (use `.select('-password')`)
   - Minimum 6 characters

3. **Session Data**
   - Cannot create session without valid userId
   - Duration must be positive number
   - Mood must match predefined enum values

4. **Email Uniqueness**
   - Enforced at database level with unique index
   - Validated at application level before insert

---

## Backup Strategy

### MongoDB Atlas Automatic Backups
- **Frequency**: Continuous backup (point-in-time recovery)
- **Retention**: 7 days for free tier, configurable for paid tiers
- **Recovery**: Restore to any point in the last 7 days

### Manual Export (for local development)
```bash
# Export all collections
mongodump --uri="mongodb+srv://..." --out=./backup

# Restore from backup
mongorestore --uri="mongodb+srv://..." ./backup
```

---

## Scaling Considerations

### Current Setup (MVP)
- Single MongoDB Atlas cluster (Free tier: M0)
- 512 MB storage
- Suitable for 100-1000 users

### Future Scaling Options

1. **Horizontal Scaling**
   - Upgrade to M10+ tier for replica sets
   - Automatic failover
   - Read replicas for query distribution

2. **Sharding** (10,000+ users)
   - Shard key: `userId`
   - Distribute data across multiple servers

3. **Caching Layer** (future optimization)
   - Redis cache for frequently accessed data
   - Cache user sessions for 5 minutes
   - Reduce database read load by 70%

---

## Sample Data

### User Document
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Antonio Enriquez",
  "email": "antonio@example.com",
  "password": "$2b$10$K3W1.../L0EJOu0Q3w3XkO",
  "bio": "Mindfulness enthusiast",
  "favoriteExercise": "Box Breathing",
  "createdAt": "2025-11-24T10:00:00.000Z",
  "updatedAt": "2025-11-24T10:00:00.000Z"
}
```

### Session Documents (Last 3 sessions)
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "exerciseType": "Box Breathing",
    "duration": 5,
    "mood": "Calm",
    "notes": "Very relaxing",
    "createdAt": "2025-11-24T14:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "exerciseType": "Deep Breathing",
    "duration": 10,
    "mood": "Happy",
    "notes": "Feeling energized",
    "createdAt": "2025-11-23T09:15:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439011",
    "exerciseType": "4-7-8 Breathing",
    "duration": 5,
    "mood": "Peaceful",
    "notes": "Great for sleep prep",
    "createdAt": "2025-11-22T21:00:00.000Z"
  }
]
```

### Feedback Document
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "userId": "507f1f77bcf86cd799439011",
  "name": "Antonio Enriquez",
  "email": "antonio@example.com",
  "message": "Love the app! More exercises would be great.",
  "createdAt": "2025-11-24T15:00:00.000Z"
}
```