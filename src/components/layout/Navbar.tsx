import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          <Image
            src="/NavBar/LogoMain.png"
            alt="LogoMain"
            className="rounded-full"
            width={52}
            height={52}
          />
        </Link>

        <div className="flex gap-4  items-center">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/post"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            post
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
