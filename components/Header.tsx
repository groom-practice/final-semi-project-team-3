"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const initLogin = useAuthStore((state) => state.initLogin);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    const isLoggedInState = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedInState) {
      initLogin(isLoggedInState);
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-screen flex justify-between bg-indigo-800 px-8 py-4">
      <nav className="flex gap-4">
        <Link
          href={"/"}
          className="text-white hover:scale-105 hover:text-blue-200"
        >
          Home
        </Link>
        <Link
          href={"/photos"}
          className="text-white hover:scale-105 hover:text-blue-200"
        >
          Photos
        </Link>
        <Link
          href={"/posts"}
          className="text-white hover:scale-105 hover:text-blue-200"
        >
          Posts
        </Link>
      </nav>
      <nav>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-white hover:scale-105 hover:text-blue-200 cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <Link
            href={"/login"}
            className="text-white hover:scale-105 hover:text-blue-200"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
