# VotePath AI
**Smart Personalized Election Guidance Platform**

VotePath AI is a highly polished, interactive, and intelligent web application designed to eliminate voter confusion, democratize election information, and ensure every eligible citizen can confidently exercise their right to vote. 

---

## 🎯 Problem Statement
The election process in many regions is fragmented, confusing, and overwhelming. From complex eligibility laws and strict deadlines to locating polling stations, the friction of simply figuring out *how* to vote leads to massive drop-offs in civic participation, particularly among first-time voters, elderly citizens, and underserved communities.

## 💡 Why This Problem Matters
Voting is the bedrock of democracy. When the process is inaccessible or confusing, certain voices are structurally silenced. By removing the informational barriers to voting, we empower citizens, increase voter turnout, and strengthen democratic representation.

## 🌟 Why This Project Stands Out (Innovation)
This is not just another static election chatbot. VotePath AI is a **personalized civic guidance platform**:
- **Dynamic Onboarding:** A smart, customized journey that adapts to user age, state, and voting history.
- **Voice-Enabled Assistance:** Native browser Web Speech API integration provides a hands-free, inclusive experience.
- **Intelligent Reminders:** The system auto-suggests context-aware deadlines (e.g., registration cutoffs, election day).
- **Zero-Friction Design:** Operates natively in the browser without requiring heavy SDKs, maintaining blazing fast performance.

## ✨ Key Features
1. **Personalized Voter Roadmap:** Generates actionable, step-by-step guidance based on user profile.
2. **Instant Eligibility Checker:** Instantly validates federal and state-level requirements.
3. **Multilingual AI Chat Assistant:** Ask questions via text or voice in English, Hindi, and Gujarati.
4. **Interactive Election Timeline:** Visualizes critical election milestones.
5. **Premium Dashboard:** A centralized command center tracking user readiness, saved conversations, and upcoming deadlines.
6. **Mock Polling Booth Locator:** Interactive mapping UI simulating nearby voting centers.

## ♿ Accessibility First
VotePath AI was built from the ground up to be accessible:
- **Speech-to-Text & Text-to-Speech** interaction models.
- Deep blue / high-contrast cyan palettes for visual clarity.
- Fully semantic, keyboard-navigable HTML structure.
- Micro-animations to guide user attention without causing motion sickness.

## 📂 Technical Architecture
Built for scale, speed, and reliability:
- **Frontend Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS, Framer Motion (Glassmorphism UI)
- **Backend Infrastructure:** Next.js API Routes
- **Database ORM:** Prisma
- **Database Engine:** SQLite (Local/Hackathon Mode)

## 🛠️ Mock Google Service Integrations
To maintain a fast, self-contained hackathon environment under strict repository constraints, VotePath AI creatively simulates complex external SDKs:
- **Google Gemini API:** Simulated via intelligent Next.js Route Handlers (`/api/chat`).
- **Google Maps API:** Simulated via the Polling Locator UI component.
- **Google Calendar API:** Simulated via the Smart Reminder API and Dashboard.
- **Firebase Authentication & Firestore:** Simulated via React Context API and robust `localStorage` persistence.

## 🚀 Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd votepath-ai
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials
- **Email:** `demo@votepath.ai`
*(Note: Authentication is mocked locally. Simply click 'Sign In' or use the Dashboard auto-login feature to view the personalized experience.)*

## 🔮 Future Scope & Scalability
- **True Cloud Integration:** Connect Prisma to a managed PostgreSQL database (e.g., Supabase/Vercel Postgres).
- **Live Google Civic API:** Replace mock polling data with real-time official election data.
- **Native Mobile Application:** Wrap the responsive web app using React Native or Capacitor for App Store distribution.
- **Push Notifications:** Implement Service Workers for push alerts regarding election deadlines.
