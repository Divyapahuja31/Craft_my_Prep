# 🎯 Craft My Prep — AI-Powered Interview Preparation Platform

A modern, interactive web application designed to help developers ace their technical interviews with **personalized AI-powered preparation plans**, **practice sessions**, and **comprehensive learning resources**.

---

## 🚀 Overview

**Craft My Prep** is an AI-powered interview preparation tool that tailors study plans to company-specific job descriptions.  
For example:  
> **Input**: “Frontend Developer at Swiggy requiring React, performance optimization, and accessibility.”  
> **Output**: A structured prep plan with React projects, optimization questions, and accessibility tasks.

This project leverages **Google Gemini AI**, **Next.js**, and **NextAuth** to deliver intelligent and dynamic interview prep experiences.

---

## ✨ Features

### 🎨 Design & Experience
- **Glassmorphism UI** — Modern, elegant interface with glass effects  
- **Framer Motion Animations** — Smooth, delightful transitions  
- **Custom Cursor** with hover effects  
- **Lenis Smooth Scrolling**  
- **Paper-Craft Preloader** with animated robot & floating tiles  

### 🚀 Core Functionalities
- 🤖 **AI Plan Generator** — Generate customized interview prep plans from job descriptions  
- 🔐 **NextAuth Authentication** — Secure Google OAuth login  
- 📊 **Dashboard** — Track progress and skill growth  
- 🏆 **Leaderboard** — Compete with peers  
- 📝 **Notes System** — Save and organize personal study notes  
- 📚 **Blog Section** — Technical interview guides & articles  
- 💡 **Career Insights** — Role-based growth guidance  
- 🧪 **API Testing Dashboard** — Verify Gemini AI integrations  

---

## 🧠 AI-Powered Capabilities

- Extracts **key skills and technologies** from job descriptions  
- Generates **personalized interview plans** including:
  - Learning resources
  - Company-relevant projects
  - Coding questions
  - Mock interview suggestions
- Uses **Google Gemini 2.0 Flash** for intelligent text comprehension

---

## 🛠️ Tech Stack

| **Category**       | **Tools**                          |
|---------------------|------------------------------------|
| **Framework**       | Next.js 15.5.4 (App Router)       |
| **Frontend**        | React 19.2.0, TailwindCSS 3.4.4   |
| **Animations**      | Framer Motion 12.23.22, Lenis 1.3.11 |
| **Authentication**  | NextAuth.js (Google OAuth 2.0)    |
| **AI Integration**  | Google Gemini AI 2.0 Flash        |
| **Language**        | JavaScript (ES6+)                 |
| **Fonts**           | Inter, Roboto Mono                |
| **Hosting**         | Vercel                            |

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone <repository-url>
cd Interview_Prep
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Set up environment variables
Create a `.env.local` file:
```env
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-nextauth-secret-key

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GEMINI_API_KEY=your-gemini-api-key
```

### 4️⃣ Run the development server
```bash
npm run dev
```
Then open [http://localhost:3001](http://localhost:3001).

---

## 📁 Project Structure

```
Interview_Prep/
├── app/
│   ├── api/                    
│   │   ├── auth/              
│   │   │   └── [...nextauth]/ 
│   │   ├── generate-plan/     
│   │   ├── generate-plan-stream/
│   │   └── test-gemini/       
│   ├── components/            
│   │   ├── CustomCursor.js    
│   │   ├── LenisProvider.js   
│   │   ├── SessionProvider.js 
│   │   ├── Preloader.jsx      
│   │   └── Sidebar.js         
│   ├── blog/                  
│   ├── dashboard/             
│   ├── generate/              
│   ├── test-api/              
│   ├── login/                 
│   ├── signup/                
│   ├── notes/                 
│   ├── about/                 
│   ├── layout.js              
│   ├── page.js                
│   └── globals.css            
├── public/                    
├── tailwind.config.js         
├── postcss.config.mjs         
└── package.json               
```

---

## 🔌 API Endpoints

| **Endpoint**                  | **Method** | **Description**                     |
|--------------------------------|------------|-------------------------------------|
| `/api/auth/[...nextauth]`      | GET/POST   | Authentication handlers             |
| `/api/generate-plan`           | POST       | Generates AI prep plan              |
| `/api/generate-plan-stream`    | POST       | Streams plan data                   |
| `/api/test-gemini`             | GET/POST   | Gemini connection tests             |

---

## 🎨 Design System

### Color Palette
- **Primary**: `#7ec4b6`
- **Secondary**: `#a8d5ba`
- **Accent**: `#7ba8d4`
- **Background**: Gradient `#a8d5e2 → #fef5e7`

### Typography
- **Fonts**: Inter (sans-serif), Roboto Mono (monospace)

### Animations
- Page transitions  
- Hover effects  
- Floating elements  
- Parallax background  
- Glassmorphism blur layers  

---

## 🧩 Pages Overview

| **Route**       | **Description**            | **Auth Required** |
|------------------|----------------------------|--------------------|
| `/`             | Landing Page               | ❌                 |
| `/generate`     | AI Plan Generator          | ❌                 |
| `/dashboard`    | Progress Dashboard         | ✅                 |
| `/leaderboard`  | Community Rankings         | ❌                 |
| `/notes`        | Notes Management           | ✅                 |
| `/blog`         | Blogs & Guides             | ❌                 |
| `/about`        | About Page                 | ❌                 |
| `/test-api`     | Gemini Test UI             | ❌                 |

---

## 🔒 Security

- ✅ API keys stored securely in `.env`
- ✅ Server-side API calls only
- ✅ NextAuth session management
- ✅ OAuth 2.0 with CSRF protection

---

## 🧪 Testing

To test Gemini API:
```bash
curl -X POST http://localhost:3001/api/generate-plan \
  -H "Content-Type: application/json" \
  -d '{"jobDescription": "Full Stack Developer with React and Node.js"}'
```

---

## 🚀 Deployment

### Recommended: Vercel
1. Push code to GitHub  
2. Import project into Vercel  
3. Add environment variables  
4. Deploy with one click  

---

## 🤝 Contributing

Contributions are welcome!  
Please open a Pull Request for improvements or new features.

---

## 📄 License

Open source under the MIT License.

---

## 🙏 Acknowledgments

- Next.js team  
- Framer Motion  
- TailwindCSS  
- NextAuth.js  
- Google Gemini AI  
- Vercel