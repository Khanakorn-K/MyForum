import { DemoComponent } from "@/features/demo/components/DemoComponent";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Next.js Clean Architecture
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A feature-based structure designed for scalability and maintainability.
          Below is a demo feature fetching data from a real API route.
        </p>
      </section>

      <section className="max-w-md mx-auto">
        <DemoComponent />
      </section>
    </div>
  );
}
