# Klar

Klar is an AI tutor for students. You can chat without login, or create an account to unlock saved conversations, verification-based auth, and the full dashboard experience.

Live site: https://klar.abdulrdeveloper.me

## What It Does

- Instant chat without signup
- 6 model modes: Flash, Smart, Thinking, Speed, Coder, Deep
- Logged-in chat history with per-conversation storage
- Email verification, login, logout, forgot-password, and reset-password flows
- Supports English, Roman Urdu, and Urdu script
- Built for school prep, coding help, and fast explanations

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Vercel AI SDK
- Drizzle ORM + PostgreSQL
- Groq + Mistral model routing
- Resend for transactional email
- JWT session cookies

## Project Structure

- `src/app/page.tsx` - landing page
- `src/app/dashboard/page.tsx` - chat dashboard
- `src/app/auth/*` - auth screens
- `src/app/api/*` - auth, chat, me, and conversation routes
- `src/lib/*` - auth, validation, and chat runtime logic
- `src/db/*` - database connection and schema

## Getting Started

1. Clone the repo

```bash
git clone https://github.com/abdulrdeveloper/klar.git
cd klar
```

2. Install dependencies

```bash
pnpm install
```

3. Create a `.env.local` file in the project root

```bash
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_long_random_secret
GROQ_API_KEY=your_groq_api_key
MISTRAL_API_KEY=your_mistral_api_key
RESEND_API_KEY=your_resend_api_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
APP_URL=https://klar.abdulrdeveloper.me
```

4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Useful Notes

- Dashboard routes are protected by middleware.
- Logged-in conversations are stored in PostgreSQL.
- Chat generation falls back across providers based on the selected mode.
- Email verification is required before login completes.
- Upstash Redis rate limits chat, registration, login, password-reset emails, and verification emails.
- Set `APP_URL` to the trusted public URL so authentication links cannot be redirected by request headers.

## License

MIT