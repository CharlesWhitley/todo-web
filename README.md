# Todo Web

Next.js frontend for the Todo app. Connects to the Todo API.

## Prerequisites
- Node.js 18+ (or 20+)
- npm
- The Todo API running locally (default `http://localhost:4000`)

## 1) Setup
```bash
npm install
cp .env.local.example .env.local
```

Set your API URL (the backend you’re running) in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 2) Run
```bash
npm run dev
# open http://localhost:3000
```

## 3) Build & Start (production)
```bash
npm run build
npm start
# open http://localhost:3000
```

## How to Use (UI)
1. **Home** (`/`):
   - **Create Task** button → opens the form
   - **Tasks / Completed** summary
   - Task list:
     - Click the **bubble** to toggle complete/incomplete
     - Left **color bar** & dot reflect the task’s chosen color
     - **Trash** icon deletes a task
     - **Click the task** to edit it

2. **Create** (`/tasks/new`):
   - Enter **Title** (required)
   - Choose a **Color**
   - Click **Add Task** to save → returns to Home

3. **Edit** (`/tasks/:id`):
   - Modify **Title** and **Color**
   - Click **Save** to update → returns to Home

## Environment Variables
- `NEXT_PUBLIC_API_URL` – the base URL of your API (e.g., `http://localhost:4000`)

## Notes / Troubleshooting
- If the app can’t load tasks, make sure API is running and `NEXT_PUBLIC_API_URL` is correct.
