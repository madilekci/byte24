# BYTE24 Candidate Assignment

Welcome to the BYTE24 assignment demo repository

This repository is a **stripped-down version** of what BYTE24 uses internally. It’s designed to help you get familiar with our stack and development approach.

---

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Set up PostgreSQL
You can run PostgreSQL using **Docker Compose** or install it manually from the [official PostgreSQL website](https://www.postgresql.org/download/).

If using Docker Compose:
```bash
docker compose up -d
```

---

## Monorepo Structure

This is a **monorepo** containing multiple applications:

```
apps/
  ├── api/          # Backend service (Prisma, Node.js)
  └── dashboard/    # Frontend (React)
```

Each app has an `env.example` file.  
Copy and rename it to `.env` inside both the `api` and `dashboard` folders:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/dashboard/.env.example apps/dashboard/.env
```

In the **api** `.env` file, make sure to set your `DATABASE_URL` to point to your PostgreSQL instance, for example:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/byte24"
```

---

## Installation & Setup

### 1. Install dependencies
From the root directory:
```bash
yarn install
```

### 2. Migrate the database
Inside the `apps/api` folder:
```bash
cd apps/api
yarn prisma migrate dev
```

### 3. Seed the database
Still inside `apps/api`:
```bash
yarn seed
```

### 4. Start the applications
From the root:
```bash
yarn dev
```

Both the API and Dashboard should now be running.

---

## Default Login

You can log in with the following credentials:

- **Email:** `candidate@byte24.nl`  
- **Password:** `Test123ae`

After logging in, you should see the **Dashboard** view.

---

## The Assignment

Your task is to **implement a task management system under a company**.

### Requirements:
- Add a new **tab** on the **Company Detail** page (`/companies/:id`) called **Tasks**.
- Each **Task** should include:
  - Title  
  - Description  
  - Deadline  
  - Assigned users (one or multiple)  
  - Status (e.g., To Do, In Progress, Done)
- Each Task can have **one or more sub-tasks**.

### What to build:
1. **Backend**
   - Create the necessary **service/controller** logic in the `api` application.
   - Ensure tasks and subtasks are properly persisted and retrievable via the API.

2. **Frontend**
   - Implement the **Tasks** UI in the `dashboard` application.
   - Integrate with your backend API.
   - Reuse existing components wherever possible.

---

## 💡 Tips

- Review how existing features are structured before building your own.
- Keep your code modular, clean, and consistent with the repository style.
- Focus on functionality first — polish later.

---

## Tech Stack Overview

- **Backend:** Node.js, Prisma, PostgreSQL  
- **Frontend:** React (dashboard)  
- **Environment:** Monorepo with Yarn workspaces  
- **Database:** PostgreSQL (Docker or local install)

---

Good luck!  
We’re excited to see how you approach the problem and structure your solution. 

If you have any questions, feel free to contact me at **luc@byte24.nl**.
