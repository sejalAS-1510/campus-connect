# CampusConnect — Smart Campus Management Platform

> **DevFusion 4.0 Hackathon Submission**  
> **Problem Statement 1**: Smart Campus Management Platform  
> **Domain**: EdTech • SaaS • Productivity  

CampusConnect is a centralized, production-ready Smart Campus Platform built to streamline college academic operations, event management, placement drives, attendance tracking, and student-faculty coordination into a single unified web portal.

---

## 🔗 Submission Links

- **Live Production URL**: `https://campus-connect.vercel.app` *(Replace with your live Vercel URL)*
- **Public GitHub Repository**: `https://github.com/sejalAS-1510/campus-connect`

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Next.js API Route Handlers
- **Database**: MongoDB Atlas with Mongoose ORM
- **Authentication**: JWT signed tokens stored in `httpOnly` secure cookies, `bcryptjs` password hashing
- **UI & UX**: `react-hot-toast` notifications, Tailwind dark/light theme, custom glassmorphism components
- **Containerization**: Docker & Docker Compose (`Dockerfile` included for containerized deployment)

---

## 🌟 Key Features & Built Modules

### 1. 👥 Multi-Role Permission System (4 Roles)
- **Student**: View live attendance %, submit assignments, register for campus events, apply for job drives with resume links, and consult the AI Assistant.
- **Faculty**: Create attendance sessions per subject/date, mark attendance, post assignments with deadlines, and review student submission text/links.
- **Coordinator**: Publish campus events/fests, manage registration seat limits, and post placement drives with CTC packages.
- **Admin**: System-wide oversight, user role management, and analytical tracking across all departments.

### 2. 📊 Attendance Module
- Faculty create sessions by subject & date and mark students present/absent atomically.
- Students view real-time attendance percentage breakdown per subject with visual indicator bars (75% exam eligibility warning threshold).

### 3. 📚 Assignment Portal & Submissions Review
- Faculty post assignments with description, subject, and deadline date.
- Students submit GitHub repository URLs or written responses.
- Faculty have an interactive **Submissions Viewer** to inspect student names, roll numbers, submission timestamps, and live submission links.

### 4. 🎟️ Campus Events & Club Management
- Coordinators/Faculty post events specifying title, venue, date, registration deadline, and available seats.
- Students register for events and instantly receive a **Digital Ticket Pass Code**.

### 5. 💼 Placement Notices & Job Application Drives
- Coordinators post placement opportunities specifying company name, role, CTC package, eligibility criteria, and deadline.
- Students apply directly by submitting their resume link and track application status.

### 6. 🤖 Smart Campus AI Assistant Chatbot
- Embedded AI Assistant on all dashboard pages that answers live database queries (upcoming events on specific dates, open placement drives, pending assignments, student attendance status) as well as campus policies (exam grading, hostel rules, library hours, IT Wi-Fi support, helpline numbers).

---

## 🔑 Test Credentials (For Judges & Evaluation)

You can use the following test accounts to explore all 4 roles on the live platform (or create your own via `/signup`):

| Role | Email | Password | Access / Capabilities |
|---|---|---|---|
| **Student** | `student@campus.edu` | `student123` | View attendance, submit assignments, register events, apply placements |
| **Faculty** | `faculty@campus.edu` | `faculty123` | Create attendance, mark present/absent, post assignments, review submissions |
| **Coordinator** | `coordinator@campus.edu` | `coord123` | Publish events with seat limits, post placement drives with CTC |
| **Admin** | `admin@campus.edu` | `admin123` | Full administrative oversight across all campus modules |

---

## 🚀 Step-by-Step Local Setup Instructions

### Prerequisites
- **Node.js**: v18.x or v20.x
- **MongoDB**: Local MongoDB or free MongoDB Atlas cluster

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/campus-connect.git
   cd campus-connect
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a file named `.env.local` in the project root directory:
   ```env
   # MongoDB Atlas Connection String
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/campus-connect?retryWrites=true&w=majority

   # Secret Key used to sign JWT Tokens
   JWT_SECRET=super_secret_campus_connect_key_2026
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🐳 Docker Deployment (Optional)

To run the application using Docker:

```bash
# Build Docker image
docker build -t campus-connect .

# Run Docker container
docker run -p 3000:3000 -e MONGODB_URI="your_mongodb_uri" -e JWT_SECRET="your_jwt_secret" campus-connect
```

---

## 👥 Team Members & Roles

| Member Name | Role | Responsibilities |
|---|---|---|
| **Sejal Anil Shinkar** | Full-Stack Developer & Lead Architect | System architecture, Next.js App Router API design, database schemas, RBAC auth, UI/UX implementation |

---

## 🔍 Known Limitations & Transparency

- **File Uploads**: Resume and assignment submission attachments currently accept URL links (Google Drive / GitHub / LinkedIn) instead of direct AWS S3 / Cloudinary binary uploads.
- **Third-Party Email Verification**: Auth uses JWT cookies with standard email + password verification. Live SMTP email verification is disabled in development mode.
