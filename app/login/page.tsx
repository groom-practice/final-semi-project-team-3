"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import LoginError from "@/components/LoginError";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    if (id === "mandoo" && pw === "meow") {
      login();
      router.push("/");
    } else {
      setErr(true);
    }
  };

  useEffect(() => {
    if (id === "" || pw === "") {
      setErr(false);
    }
  }, [id, pw]);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="flex flex-col w-120 gap-3 px-10 py-5 border-1 rounded-md border-blue-700"
      >
        <h1 className="text-2xl font-semibold text-white text-center mb-2">
          로그인
        </h1>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="bg-gray-700 border border-gray-600 text-white p-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="아이디를 입력해주세요. (default ID : mandoo)"
        />
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="bg-gray-700 border border-gray-600 text-white p-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="비밀번호를 입력해주세요. (default PW : meow)"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-medium transition-colors duration-200 mt-2"
        >
          로그인
        </button>
      </form>
      {err && <LoginError />}
    </div>
  );
}
