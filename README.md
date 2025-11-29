# 🏥 MediQueue Pro – Patient & Clinic Management System

A React-based capstone project focused on digitizing patient intake, triage, and facility workflow coordination.

## 📖 Overview

MediQueue Pro is a Single Page Application designed for clinics that need a structured way to manage waiting rooms, triage levels, and basic patient records. It demonstrates the logic and architecture behind a lightweight medical dashboard: authentication simulation, validated intake forms, persistent local storage, and dynamic searching/filtering.

---

## ✨ Core Features

### 🔐 Authentication

- Login/signup flow using Context API.
- Protected routes to prevent access without a session.
- LocalStorage persistence so sessions survive page reloads.

### 📋 Patient Workflow

- Add, update, and discharge patients.
- Triage tagging with **Critical** or **Stable** status.
- Individual patient profiles with vitals and notes.
- Deletion safeguards to avoid accidental data loss.

### 📊 Dashboard

- Real-time counts of total, critical, and stable patients.
- Quick search by name.
- Status filtering for faster triage decisions.

### ⚙️ Technical Capabilities

- Initial mock data from the RandomUser API.
- Form logic built with React Hook Form + Yup.
- Responsive layout using CSS variables and grid.

---

## 🛠️ Tech Stack

| Category      | Tool             | Purpose                       |
| ------------- | ---------------- | ----------------------------- |
| Framework     | React (Vite)     | SPA environment               |
| State Mgmt    | Context API      | Auth + Patient global state   |
| Routing       | React Router DOM | Navigation + protected routes |
| Forms         | React Hook Form  | Efficient form handling       |
| Validation    | Yup              | Schema-based validation       |
| Styling       | CSS3             | Layout + theming              |
| Notifications | React Hot Toast  | Lightweight feedback          |
| Data Source   | RandomUser API   | Mock patient data             |

---

## 🚀 Getting Started

### Prerequisites

- Node.js installed.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mediqueue-pro.git
   cd mediqueue-pro
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Access the app at:
   `http://localhost:5173`

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── ...
├── context/
│   ├── AuthContext.jsx
│   └── PatientContext.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── AddPatient.jsx
│   ├── PatientDetails.jsx
│   └── Login/Signup.jsx
└── main.jsx
```

---

## 📸 How to Use

1. On first load, the app fetches mock records so the dashboard isn’t empty.
2. Create an account or log in with any credentials.
3. Add a patient and try submitting incomplete fields to see validation.
4. Mark a patient as Critical and note the UI change.
5. Filter the dashboard by status or search by name.
6. Reload the page to confirm LocalStorage persistence.

---

## 👤 Author

**Usman Abubakar Abdulkadir**
Capstone Project

---
