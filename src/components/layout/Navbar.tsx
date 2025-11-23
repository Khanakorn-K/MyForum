"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/Button";
// import SearchBar from "../searchBar";

export const Navbar = () => {
  const session = useSession();

  return (
    <nav className="border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          <Image
            // src="/NavBar/LogoMain.png"
            src={session.data?.user?.image ?? "/d/NavBar/LogoMain.png"}
            alt="LogoMain"
            className="rounded-full"
            width={52}
            height={52}
          />
        </Link>
        {/* <SearchBar /> */}
        <div className="flex items-center gap-2">
          <div className="flex gap-2 items-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Home
            </Link>

            {session.data && (
              <Link
                href="createPost"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                สร้างโพสต์
              </Link>
            )}

            <ModeToggle />
          </div>
          <div className="flex gap-4  items-center">
            {session.data ? (
              <Button variant="destructive" onClick={() => signOut()}>
                Sign out
              </Button>
            ) : (
              <Button className="bg-green-500">
                <Link href="/login" className="text-sm text-white">
                  เข้าสู่ระบบ
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
