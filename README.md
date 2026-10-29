# AI Resume Analyzer

AI Resume Analyzer helps you prepare for a specific job by comparing its description with your resume and optional self-description. It generates an interview-preparation report with a match score, skill gaps, technical and behavioral questions, and a five-day preparation roadmap.

## Features

- Register and log in to a personal account.
- Paste a target job description and upload a resume, enter a self-description, or provide both.
- Generate and revisit saved, role-specific interview reports.
- Review a match score, skill gaps, technical questions, behavioral questions, and suggested answers.
- Follow a five-day preparation plan.

## Technology

- **Frontend:** React, Vite, React Router, SCSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **AI:** Google Gemini API (`@google/genai`)
- **Authentication:** JWT in an HTTP cookie

## Requirements

- Node.js and npm
- MongoDB, either local or MongoDB Atlas
- A Google Gemini API key

## Run locally

### 1. Get the code

```bash
git clone https://github.com/Garimaktr/AI-RESUME-ANALYZER.git
cd AI-RESUME-ANALYZER
```

### 2. Configure and start the backend

Create `Backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/ai-resume-analyzer
JWT_SECRET=replace-with-a-long-random-secret
GOOGLE_GENAI_API_KEY=your-google-gemini-api-key
FRONTEND_URL=http://localhost:5173
```

Install dependencies and run the server:

```bash
cd Backend
npm install
npm run dev
```

The backend listens on `http://localhost:3000`.

### 3. Configure and start the frontend

In a second terminal, create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Then install dependencies and start Vite:

```bash
cd Frontend
npm install
npm run dev
```

Open the URL printed by Vite (by default, `http://localhost:5173`).

Keep both servers running while using the app. The frontend sends credentialed requests to the backend; set `FRONTEND_URL` to the frontend origin. For multiple allowed origins, separate them with commas.

## Environment variables

| Variable | Location | Purpose |
| --- | --- | --- |
| `MONGO_URI` | `Backend/.env` | MongoDB connection string. |
| `JWT_SECRET` | `Backend/.env` | Secret used to sign authentication tokens. |
| `GOOGLE_GENAI_API_KEY` | `Backend/.env` | Google Gemini API key used to generate reports. |
| `FRONTEND_URL` | `Backend/.env` | Allowed frontend origin(s) for credentialed CORS requests. Defaults to `http://localhost:5173`. |
| `VITE_API_URL` | `Frontend/.env` | Backend base URL used by the frontend, such as `http://localhost:3000`. |

The backend currently listens on port `3000`. Keep environment files and API keys private; do not commit them.

## Resume uploads

The backend accepts uploads up to **3 MB**. PDF files are parsed for their text; other files are read as UTF-8 text. Use a PDF or plain-text resume for reliable results. You can also generate a report using only a self-description.

## API overview

All endpoints are served by the backend at `http://localhost:3000`.

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Create an account. |
| `POST` | `/api/auth/login` | Public | Log in and establish an authentication cookie. |
| `GET` | `/api/auth/logout` | Public | Log out and clear the authentication cookie. |
| `GET` | `/api/auth/get-me` | Authenticated | Get the current user. |
| `POST` | `/api/interview` | Authenticated | Generate a report. Send `jobDescription`, `selfDescription`, and an optional `resume` file as multipart form data. |
| `GET` | `/api/interview` | Authenticated | List the signed-in user's reports. |
| `GET` | `/api/interview/report/:interviewId` | Authenticated | Retrieve one of the signed-in user's reports. |

## Project layout

```text
AI-RESUME-ANALYZER/
├── Backend/
│   ├── src/
│   │   ├── config/          # MongoDB connection
│   │   ├── controllers/     # Authentication and interview handlers
│   │   ├── middlewares/     # Authentication and file upload
│   │   ├── models/          # Users, reports, and token blacklist
│   │   ├── routes/          # Express API routes
│   │   └── services/        # Gemini report generation
│   ├── package.json
│   └── server.js
├── Frontend/
│   ├── src/
│   │   ├── features/        # Authentication and interview screens
│   │   ├── App.jsx
│   │   └── app.routes.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Scripts

Run these commands from the relevant project directory:

| Directory | Command | Description |
| --- | --- | --- |
| `Backend` | `npm run dev` | Start the backend with nodemon. |
| `Frontend` | `npm run dev` | Start the Vite development server. |
| `Frontend` | `npm run build` | Create a production frontend build. |
| `Frontend` | `npm run lint` | Run Oxlint. |

## Author

**Garima Katiyar**
[GitHub](https://github.com/Garimaktr)
