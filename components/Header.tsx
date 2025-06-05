"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const initLogin = useAuthStore((state) => state.initLogin);
  const [showModal, setShowModal] = useState(false);

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

  const handleProtectedRoute = (e: React.MouseEvent, path: string) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    } else {
      router.push(path);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-screen flex justify-between bg-indigo-800 px-8 py-4 z-1000">
      <nav className="flex gap-5">
        <Link
          href={"/"}
          className="text-white hover:scale-105 hover:text-blue-200"
        >
          Home
        </Link>
        <a
          href="/photos"
          onClick={(e) => handleProtectedRoute(e, "/photos")}
          className="text-white hover:scale-105 hover:text-blue-200 cursor-pointer"
        >
          Photos
        </a>
        <a
          href="/posts"
          onClick={(e) => handleProtectedRoute(e, "/posts")}
          className="text-white hover:scale-105 hover:text-blue-200 cursor-pointer"
        >
          Posts
        </a>
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

      {showModal && (
        <div className="fixed bottom-30 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-lg font-medium px-8 py-3 rounded shadow-lg transition-opacity duration-300 z-[9999]">
          로그인이 필요합니다.
        </div>
      )}
    </header>
  );
}
