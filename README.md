# Bookmark Manager

A real-time bookmark manager with tagging, filtering, and Google authentication.

## Project Structure

```
├── src/                    # Frontend (React + Vite + TypeScript)
│   ├── components/         # UI components (Dashboard, BookmarkList, etc.)
│   ├── hooks/              # Custom hooks (useAuth, useBookmarks)
│   ├── integrations/       # Lovable Cloud client & types
│   ├── pages/              # Route pages
│   └── index.css           # Global styles & design tokens
│
├── supabase/               # Backend (Lovable Cloud)
│   ├── functions/          # Edge functions (serverless API endpoints)
│   ├── migrations/         # Database schema migrations
│   └── config.toml         # Backend configuration
│
└── public/                 # Static assets
```

## Running the Frontend

```sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The frontend will be available at `http://localhost:8080`.

## Backend (Lovable Cloud)

The backend is powered by **Lovable Cloud** and includes:

- **Database**: Stores bookmarks with Row Level Security (each user only sees their own data)
- **Authentication**: Google OAuth sign-in
- **Real-time**: Live sync across tabs via WebSocket subscriptions
- **Edge Functions**: Serverless functions in `supabase/functions/`

The backend is **deployed and managed automatically** — no manual setup needed. Edge functions and database migrations are applied when you push changes through Lovable.

> **Note:** You do not need to run the backend locally. It's always available as a hosted service.
>Challenges Faced and How I Solved Them

During the development of this project, I faced a few challenges while setting up authentication and integrating services.

1. Google OAuth Configuration

The hardest part was configuring Google OAuth login correctly. I encountered errors such as redirect URI mismatch, which happened because the callback URL in Google Cloud did not exactly match the Supabase callback URL.

Solution:
I fixed this by:

Copying the exact callback URL from Supabase.

Updating the Authorized Redirect URIs in Google Cloud.

Adding my application URL in Supabase URL Configuration

## Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Lovable Cloud (Database, Auth, Realtime, Edge Functions)
- **State Management**: TanStack React Query
