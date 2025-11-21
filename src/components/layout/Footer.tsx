export const Footer = () => {
  return (
    <footer className="border-t py-8 mt-auto bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} khanakorn. All rights reserved.</p>
      </div>
    </footer>
  );
};
