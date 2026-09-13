# AI Resume Analyzer

AI Resume Analyzer is a full-stack web application that helps users analyze their resumes against a specific job description. It identifies relevant skills, highlights potential skill gaps, generates technical and behavioral insights, and provides a job-specific study plan to help users prepare for their target role.

## Features

- User Registration and Login
- JWT-based Authentication
- Resume Upload
- Job Description Input
- Self-Description Input
- Resume and Job Description Analysis
- Skill Gap Identification
- Technical Assessment
- Behavioral Assessment
- Interview Report Generation
- Job-specific Study Plan
- ATS-friendly Resume Generation
- Protected Routes
- MongoDB-based Data Storage

## Tech Stack

### Frontend

- React.js
- JavaScript
- Vite
- SCSS

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- REST APIs

### AI Integration

- Gemini API

## Project Structure

```text
AI-RESUME-ANALYZER/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── interview.controller.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── file.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── blacklist.model.js
│   │   │   ├── interviewReport.model.js
│   │   │   └── user.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── interview.routes.js
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── Frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   └── Protected.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useAuth.js
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Login.jsx
│   │   │   │   │   └── Register.jsx
│   │   │   │   └── services/
│   │   │   │       └── auth.api.js
│   │   │   │
│   │   │   └── interview/
│   │   │       ├── hooks/
│   │   │       ├── pages/
│   │   │       ├── services/
│   │   │       └── style/
│   │   │
│   │   ├── style/
│   │   │   └── button.scss
│   │   │
│   │   ├── App.jsx
│   │   ├── app.routes.jsx
│   │   ├── auth.context.jsx
│   │   ├── auth.form.scss
│   │   ├── interview.context.jsx
│   │   ├── main.jsx
│   │   └── style.scss
│   │
│   ├── .gitignore
│   ├── .eslintrc.json
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md
```

## How It Works

1. Create an account or log in.
2. Upload your resume.
3. Enter the Job Description for the role you are targeting.
4. Provide a self-description.
5. Generate the interview report.
6. The application analyzes the resume and Job Description.
7. The system identifies relevant skills and potential skill gaps.
8. Technical and behavioral insights are generated.
9. A job-specific study plan is provided to help with preparation.
10. An ATS-friendly resume can be generated based on the target Job Description.

## Running the Project Locally

### Prerequisites

Make sure the following are installed on your system:

- Node.js
- npm
- MongoDB
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Garimaktr/AI-RESUME-ANALYZER.git
cd AI-RESUME-ANALYZER
```

### 2. Setup the Backend

Open a terminal and navigate to the Backend folder:

```bash
cd Backend
```

Install the backend dependencies:

```bash
npm install
```

Create a `.env` file inside the `Backend` folder and configure the required environment variables.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

### 3. Setup the Frontend

Open another terminal while keeping the backend server running.

Navigate to the Frontend folder:

```bash
cd Frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173/
```

### 4. Access the Application

Once both the backend and frontend servers are running, open your browser and visit:

```text
http://localhost:5173/
```

Make sure that both servers are running simultaneously.

## Environment Variables

Create the following file:

```text
Backend/.env
```

Add the required configuration:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Replace the placeholder values with your actual configuration.

> Do not commit your `.env` file or API keys to GitHub.

## Backend

The backend is built using Node.js and Express.js.

Backend development server:

```text
http://localhost:3000
```

Start the backend using:

```bash
cd Backend
npm install
npm run dev
```

## Frontend

The frontend is built using React.js, Vite, and SCSS.

Frontend development server:

```text
http://localhost:5173/
```

Start the frontend using:

```bash
cd Frontend
npm install
npm run dev
```

## Authentication

The application uses JWT-based authentication to secure user-specific resources and protected routes.

Authentication includes:

- User Registration
- User Login
- JWT Token Authentication
- Protected Routes
- Authentication Middleware
- Token Blacklisting

## Database

MongoDB is used for storing application data.

The backend contains models for:

- Users
- Interview Reports
- Blacklisted Tokens

## AI-Powered Analysis

The application integrates the Gemini API to assist with resume and job description analysis.

The system uses the provided resume, Job Description, and self-description to generate structured insights that help users understand their preparation requirements for a target role.

## Future Improvements

- Resume version management
- Resume comparison across multiple Job Descriptions
- Advanced interview preparation
- Job recommendations based on resume skills
- Improved resume scoring
- Additional authentication methods
- Enhanced dashboard and analytics
- Cloud deployment

## Author

**Garima Katiyar**

GitHub: https://github.com/Garimaktr

## Repository

https://github.com/Garimaktr/AI-RESUME-ANALYZER

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.  
       
