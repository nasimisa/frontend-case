# Frontend Case

A frontend application built with **Next.js App Router** that demonstrates authentication, form handling, and efficient rendering of large, server-side paginated datasets (1M+ records).

The project focuses on **real-world frontend architecture**, performance, and clean separation between server and client responsibilities.

---

## 🚀 Tech Stack

- **Next.js 15 (App Router)**
- **React 18**
- **TypeScript**
- **Chakra UI** (theming, dark/light mode)
- **TanStack React Query** (data fetching & caching)
- **React Hook Form + Yup** (forms & validation)
- **Axios** (API client)
- **Netlify** (deployment)

---

## ✅ Requirements Coverage

### Authentication
- Login with client-side validation
- Token-based authentication (access + refresh)
- Automatic token refresh on 401 responses
- Logout clears tokens and cached user state
- Protected routes with redirect for unauthenticated users
- Authenticated user displayed in header

### Form Page
- 10 validated fields matching backend rules
- Conditional validation (phone required based on contact method)
- Real-time validation feedback
- Loading & disabled states during submission
- Duplicate submissions prevented

### Data Table (1M+ Records)
- Server-side pagination (10 / 25 / 50 / 100)
- Server-side sorting with visual indicators
- Debounced search across multiple fields
- Debounced filters (crop, country, region, variety, status)
- URL-synced state (page, filters, sorting)
- Responsive UI during loading

### UI / UX

- Dark / light mode
- Semantic theming tokens
- Accessible form controls
- Clear loading & empty states

---

## 🧠 Architectural Decisions

### App Router & Client / Server Separation

- Pages and layouts are **server components**
- Browser-dependent logic is isolated into **client components**
- Hooks using `useSearchParams`, `window`, or React Query never execute on the server
- `<Suspense>` is used where required to avoid CSR bailout errors

This avoids hydration issues, build-time crashes, and unnecessary client rendering.

---

### Authentication Strategy

- Access & refresh tokens stored in `localStorage` (although it is not secure)
- Axios interceptor attaches access token automatically
- Refresh token logic retries failed requests once
- Auth-guarded layout prevents unauthorized UI flicker

> Note: Storing tokens in httpOnly cookies would be more secure, but the backend API does not support this. Given the constraints, client-side token storage with guarded rendering was chosen as a pragmatic solution. Ideally it is better to store access tokens in memory and refresh tokens in httpOnly cookies

---

### Data Fetching & Performance

- React Query is used for:
  - Caching
  - Background refetching
  - Loading/error states
- Server-side pagination ensures scalability
- Filters & search are debounced to avoid network load
- Table state is URL-driven (bookmarkable & shareable)

---

## 🛠️ Setup & Run

### Prerequisites

- Node.js **18+**
- npm or pnpm

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### 🔑 Test Credentials

```bash
Username: testuser
Password: Test1234!
```

---
### 🌍 API Reference

Backend API is provided and hosted at:

- Base URL: https://backendcase.infodecs.dev
- Swagger UI: https://backendcase.infodecs.dev/api/docs/
- ReDoc: https://backendcase.infodecs.dev/api/redoc/

---
### 🔮 Possible Improvements

- Move auth tokens to httpOnly cookies (backend support required)
- Make the app more responsive for small screens (e.g. infinite scrolling logic for small screens instead of table)
- We can move filters to separate modal
- Row detail view on click with modal opening
- Sign up page
- Unit tests