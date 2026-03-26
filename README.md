# 🏌️ GoCharity - Play Fast. Give Faster.

[![Next.js version](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React version](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-11.9-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Genkit AI](https://img.shields.io/badge/Genkit-1.28-blue?style=flat-square&logo=google-gemini)](https://firebase.google.com/docs/genkit)

**GoCharity** is a premier express golf impact platform designed for golfers who want to play with purpose. We bridge the gap between sports performance and social impact, offering verified scores, instant prizes, and hyper-local charity funding in a high-fidelity, premium interface.

---

## ✨ Key Features

- **🏆 High-Impact Subscriptions**: Choose from "Basic Birdie", "Pro Eagle", and "Elite Albatross" membership tiers to scale your impact.
- **⏱️ Express Verification**: 10-minute AI-powered verification protocol for golf rounds and impact audits.
- **💰 Direct Charity Contributions**: A guaranteed percentage of every membership fee goes directly to verified local charities.
- **🎟️ Instant Draw Pools**: Eligibility for live prize pools as soon as you activate your impact status.
- **🤖 AI-Driven Performance Insights**: Real-time analysis of your golf performance using custom Google Genkit flows.
- **📊 Personalized Dashboard**: Track your global impact, scores, and membership status in a unified, premium hub.
- **📱 Responsive & Elegant Design**: A glassmorphic, dynamic interface built with Framer Motion and Shadcn UI.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15.5](https://nextjs.org/), [React 19](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Animation/Interactivity**: [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/)
- **Backend/Database**: [Firebase (Firestore)](https://firebase.google.com/docs/firestore)
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth)
- **AI Engine**: [Google Genkit](https://firebase.google.com/docs/genkit) with Gemini models
- **Visualization**: [Recharts](https://recharts.org/)
- **State Management/Validation**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (Latest LTS recommended)
- A Firebase project
- A Google Cloud/Genkit API Key (Gemini)

### 2. Installation
```bash
git clone https://github.com/mohanbaragi009/Golf_Charity_Subscription.git
cd Golf_Charity_Subscription
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add the following keys:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Genkit (GenAI)
GOOGLE_GENAI_API_KEY=your_google_ai_key
```

### 4. Running the App
```bash
# Start the development server
npm run dev

# Start the Genkit Developer UI
npm run genkit:dev
```

---

## 📁 Project Structure

- `src/app/`: Next.js App Router (pages and layouts).
- `src/ai/`: Genkit AI flows and configuration.
- `src/components/`: Reusable UI components (shadcn/ui, layout components).
- `src/firebase/`: Firebase configuration and custom hooks (`useUser`, `useCollection`).
- `src/lib/`: Utility functions and core logic.
- `src/hooks/`: Custom React hooks for global functionality.

---

## 🤖 AI Flows

GoCharity leverages advanced AI flows to enhance the golfing experience:
- **Performance Analysis**: Provides personalized feedback on golf rounds based on uploaded performance logs.
- **Winner Selection**: A transparent, AI-verified algorithm for prize pool draws.

---

## 🤝 Contributing

We welcome contributions! Please feel free to open a Pull Request or report issues. 

1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/impact`).
3. Commit your changes (`git commit -m 'Add new impact feature'`).
4. Push to the branch (`git push origin feature/impact`).
5. Open a Pull Request.

---

## 📄 License

This project is private and for demonstration purposes.

---

*Built with ❤️ for the golfing community by [Mohan Baragi](https://github.com/mohanbaragi009).*
