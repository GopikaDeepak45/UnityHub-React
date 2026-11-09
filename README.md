# UnityHub — Community Management Platform

A full-stack community management application designed to simplify community administration, member engagement, service management, and communication.

This repository contains the **frontend application**, developed using React, TypeScript, Redux Toolkit, RTK Query, and Socket.IO.

## 🚀 Key Features

### Role-Based User Interfaces
- Separate interfaces for administrators, community administrators, and community members.
- Role-based navigation and access to application features.
- Authentication and user registration workflows.

### Community Administration
- Community management and administration dashboards.
- Member and user management.
- Community image management.
- Group creation and management.

### Community Engagement
- Community posts and interactions.
- Group-based activities and discussions.
- User profiles and community information.

### Real-Time Messaging
- One-to-one messaging using Socket.IO.
- Group messaging using Socket.IO.
- Conversation history retrieval through API integration.
- Message display with sender information and timestamps.

### Service Management
- Building service management.
- User service management and scheduling interfaces.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, TypeScript, Vite |
| State Management | Redux Toolkit, RTK Query |
| Routing | React Router |
| Styling | Tailwind CSS, Radix UI |
| Real-Time Communication | Socket.IO Client |
| API Communication | Axios, RTK Query |
| Form Handling | React Hook Form, Zod |
| Authentication Utilities | JWT Decode |
| Development Tools | Git, GitHub, ESLint |

## 📁 Project Structure

```text
src/
├── assets/
├── components/
├── hooks/
├── layouts/
├── pages/
│   ├── admin/
│   ├── communityAdmin/
│   └── user/
├── redux/
│   └── apiSlices/
├── App.tsx
└── AppRoutes.tsx
```

The application uses reusable React components, role-based page layouts, and Redux-based API integration.

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- A compatible UnityHub backend service

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/GopikaDeepak45/UnityHub-React.git
```

**2. Navigate to the project**

```bash
cd UnityHub-React
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

The frontend requires a running backend for authentication, data retrieval, and real-time messaging. Backend connection settings may need to be configured for your local environment.

## 🖼️ Application Screenshots

Screenshots of the dashboards, community features, and messaging interfaces will be added.

## 🔗 Backend

UnityHub uses a separate backend application for APIs, authentication, database operations, and real-time communication.

Backend repository documentation will be linked here after review.

## 👩‍💻 Developer

**Gopika Deepak**  
Full Stack Developer | React.js | Node.js | TypeScript | MERN Stack

[GitHub Profile](https://github.com/GopikaDeepak45)
