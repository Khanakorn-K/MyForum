# Project Name

## Project Structure (Clean Architecture / Feature-Based)

This project follows a **Feature-Based** architecture to keep code organized and scalable.

### Directory Overview

- **`src/features/`**: The core of the application. Each feature (e.g., `auth`, `profile`) has its own folder containing:
  - `components/`: UI components specific to this feature.
  - `hooks/`: Logic and state management (custom hooks).
  - `services/`: API calls and data fetching.
  - `types/`: TypeScript interfaces for this feature.

- **`src/components/`**: Shared UI components used across multiple features.
  - `ui/`: Generic building blocks (Buttons, Inputs, Cards).
  - `layout/`: Global layout components (Navbar, Footer).

- **`src/lib/`**: Configuration for third-party libraries (e.g., Axios, Firebase, Stripe).

- **`src/utils/`**: Pure utility functions (helpers) that are logic-free and stateless (e.g., date formatting).

- **`src/types/`**: Global TypeScript types shared across the application.

- **`src/app/`**: Next.js App Router. Should primarily contain routing logic and page entry points that import features.

### Architecture Layers (How it works)

This project separates concerns into 4 main layers to ensure maintainability:

1.  **Presentation Layer (UI)**
    -   **Location**: `src/features/[feature]/components`
    -   **Responsibility**: Renders HTML/CSS. Receives data via props or hooks. **No business logic here.**
    -   **Example**: `DemoComponent.tsx` displays the list of items.

2.  **Business Logic Layer (Domain)**
    -   **Location**: `src/features/[feature]/hooks`
    -   **Responsibility**: Manages state, handles user interactions, and stitches data together.
    -   **Example**: `useDemo.ts` calls the service and manages `loading` state.

3.  **Data Access Layer (Data)**
    -   **Location**: `src/features/[feature]/services`
    -   **Responsibility**: Communicates with external APIs or databases. Knows *how* to fetch data.
    -   **Example**: `api.ts` uses `apiClient` to GET/POST data.

4.  **Entity Layer (Model)**
    -   **Location**: `src/features/[feature]/types`
    -   **Responsibility**: Defines the shape of data (Interfaces/Types).
    -   **Example**: `index.ts` defines `DemoData` interface.

### Example Usage

Check `src/features/demo` for a complete example of how to structure a feature.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
