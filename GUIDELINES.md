# Coding Guidelines & Best Practices

This document outlines the standards and principles for maintaining a clean, scalable, and consistent codebase in this project.

## 1. Project Structure Principles

### Feature-Based Architecture
We group code by **Feature** rather than by technical layer.
-   **Good**: `src/features/auth/components/LoginForm.tsx`
-   **Bad**: `src/components/LoginForm.tsx` (unless it's truly generic)

### Directory Responsibilities
-   **`src/features/`**: Business logic and feature-specific UI.
-   **`src/components/ui/`**: Dumb, stateless UI components (Buttons, Inputs).
-   **`src/lib/`**: Configuration for external libraries (Axios, Firebase).
-   **`src/utils/`**: Pure helper functions (date formatting, math).
-   **`src/types/`**: Global types shared across features.

## 2. Naming Conventions

| Item | Convention | Example |
| :--- | :--- | :--- |
| **Directories** | kebab-case | `user-profile`, `auth` |
| **Components** | PascalCase | `UserProfile.tsx`, `SubmitButton.tsx` |
| **Hooks** | camelCase (prefix `use`) | `useAuth.ts`, `useFetchData.ts` |
| **Functions** | camelCase | `formatDate`, `calculateTotal` |
| **Types/Interfaces** | PascalCase | `User`, `ApiResponse` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `API_URL` |

## 3. Component Guidelines

### Structure
Every component should follow this order:
1.  Imports
2.  Interface/Type definitions (Props)
3.  Component definition
4.  Hooks
5.  Derived state / Variables
6.  Effects (`useEffect`)
7.  Helper functions
8.  Return (JSX)

### Props Interface
Always define a `Props` interface, even if empty.
```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => { ... }
```

### Exporting
Use **Named Exports** instead of Default Exports to ensure consistent naming on import.
-   **Good**: `export const MyComponent = ...`
-   **Bad**: `export default MyComponent`

## 4. State Management

-   **Local State (`useState`)**: Use for UI state that doesn't leave the component (e.g., isModalOpen).
-   **URL State**: Use URL search params for filter/sort/pagination state.
-   **Server State**: Use `react-query` or `swr` (or our `apiClient` with hooks) for data fetching.
-   **Global State**: Avoid unless absolutely necessary (use Context or Zustand).

## 5. Styling (Tailwind CSS)

-   Use the `cn()` utility for conditional classes.
-   Group related classes (layout, spacing, typography, color).
-   Avoid arbitrary values (`w-[123px]`) where possible; use theme values (`w-32`).

```tsx
// Good
<div className={cn("flex items-center p-4", isActive && "bg-blue-500")} />
```

## 6. API & Data Fetching

-   Always use the `apiClient` wrapper (`src/lib/api-client.ts`).
-   Define return types for all API calls.
-   Handle loading and error states in the UI.

## 7. Git Workflow

-   **Commit Messages**: Use conventional commits.
    -   `feat: add login page`
    -   `fix: resolve navigation bug`
    -   `chore: update dependencies`
    -   `docs: update readme`

## 8. Entities & Mocking (Waiting for API)

### Where is the Entity/Model?
In this architecture, the **Type Definitions** in `src/features/[feature]/types/index.ts` serve as your Entities/Models. We don't use class-based models (like OOP) to keep the bundle size small and logic simple.

### How to work before API is ready?
Use the **"Mock First"** strategy:

1.  **Define the Type**: Create the interface in `types/index.ts`.
2.  **Create Mocks**: Create a `mocks.ts` file in your feature folder.
3.  **Build UI**: Use the mock data in your components.
4.  **Connect API**: When the backend is ready, swap the mock data with a real `service` call.

**Example:**
```ts
// src/features/products/mocks.ts
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Product A', price: 100 },
  { id: '2', name: 'Product B', price: 200 },
];
```

