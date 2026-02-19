## 🏋️ **MVP Workflow (No Code, Just Flow)**

### **1. User Onboarding**
```
Visitor lands on marketing page
    ↓
Clicks "Get Started"
    ↓
Sign up with email/password
    ↓
Choose role: Athlete (free) or Coach (trial)
    ↓
Complete profile:
    - Name, weight class, experience level
    - Current max lifts (optional)
    ↓
Land on dashboard
```

### **2. Athlete Core Journey**
```
Dashboard shows:
    - Today's workout (if any)
    - Past workouts
    - Progress overview
    ↓
Click "Start Workout"
    ↓
See workout with exercises:
    - Exercise name, sets, reps
    - Input weight for each set
    - Rate perceived effort (RPE)
    ↓
Complete workout
    ↓
Auto-calculates:
    - Volume lifted
    - Estimated 1RM
    - Personal records detected
    ↓
View post-workout summary
    ↓
Share to social (optional)
```

### **3. Coach Journey**
```
Coach signs up
    ↓
Creates profile (specialization, credentials)
    ↓
Dashboard shows:
    - My athletes
    - Create program
    - Athlete requests
    ↓
Click "Create Program"
    ↓
Build workout template:
    - Name program (e.g., "Strength Phase 1")
    - Add weeks/days
    - Assign exercises, sets, reps
    - Set progression rules
    ↓
Assign to athlete(s)
    ↓
Athlete gets notification
```

### **4. Data Flow**
```
Athlete completes workout
    ↓
Data saves to database
    ↓
System calculates:
    - Volume PR? → Badge awarded
    - Strength increase → Update 1RM
    - Consistency streak → Update streak counter
    ↓
Coach dashboard updates
    ↓
Progress charts refresh
```

## 📊 **MVP Data Models (Conceptual)**

### **Core Entities**
```
USER
- Email/password
- Role (athlete/coach)
- Profile data
- Subscription tier

WORKOUT
- Date
- User ID
- Notes
- Exercises[] (nested)

EXERCISE
- Name
- Muscle group
- Demo video

PROGRAM
- Coach ID
- Name
- Weeks/Days structure
- Assigned athletes[]

PROGRESS
- User ID
- Date
- Weight
- Body fat %
- Photo URL
```

## 🔄 **Key User Flows**

### **Athlete Flow**
```
Sign Up → Set Goals → Follow Program → Log Workout → See Progress → Share
```

### **Coach Flow**
```
Sign Up → Create Program → Assign Athletes → Monitor Progress → Adjust Program
```

## 🎯 **MVP Scope (First Version)**

### **Include:**
- ✅ User signup/login
- ✅ Athlete can log workouts
- ✅ Basic exercise library
- ✅ Simple progress charts
- ✅ Coach can create programs
- ✅ Coach can assign programs

### **Exclude (V2):**
- ❌ Payment/subscriptions
- ❌ Social features
- ❌ Mobile apps
- ❌ Advanced analytics
- ❌ AI recommendations

## 🚀 **User Story Example**

> *"Mark is an intermediate lifter. He signs up, selects 'athlete', and enters his current maxes. The app suggests a beginner program. Mark starts his first workout: Squat 3x5. He logs 225lbs for all sets. After finishing, he sees his total volume and a 'New PR!' badge for squats. His coach, Sarah, gets a notification that Mark completed his workout and checks his form via notes."*

## 💡 **The MVP Mindset**

| Question | Answer |
|----------|--------|
| What's the ONE thing? | Log workouts and track progress |
| Who uses it first? | Solo lifters wanting structure |
| What's the pain? | No good free tracking apps |
| Why Payload? | Admin for coaches, API for future apps |

