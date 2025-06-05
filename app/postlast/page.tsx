"use client";

import { Post } from "@/types/posts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostLast() {
  const [postData, setPostData] = useState<Post[]>([]);
  const router = useRouter();
  // ssr 방식에서 렌더링 이전에는 window 객체가 없어 일반적인 방식으로는 불가능
  // useEffect를 사용해 렌더링 이후에 window 객체에 접근하는 방식을 사용
  useEffect(() => {
    const data: Post[] = [];

    for (let i = window.localStorage.length - 1; i >= 0; i--) {
      const key = window.localStorage.key(i);
      if (key !== "isLoggedIn" && key !== null && key !== "favorite-posts") {
        const dataString = window.localStorage.getItem(key);
        if (dataString !== null) {
          try {
            data.push(JSON.parse(dataString));
          } catch (e) {
            console.error(`Invalid JSON at key: ${key}`, e);
          }
        }
      }
    }

    setPostData(data);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold my-4">마지막으로 본 게시글</h2>
      <div className="space-y-4 p-4 bg-neutral-900 rounded shadow">
        {postData.length > 0 ? (
          postData.map(post => (
            <div key={post.id + post.title} className="p-4 bg-black rounded mb-4">
              <p 
              className="font-semibold text-lg cursor-pointer text-gray-400 hover:text-indigo-600 transition-all duration-200"
              onClick={() => router.push(`/posts/${post.id}`)}
              >
                {post.title}
              </p>
              <p>{post.body}</p>
            </div>
          ))
        ) : (
          <div>
            본 게시글이 없습니다. 헤더를 통해서 게시글을 보러 가주세요.
          </div>
        )}
      </div>
    </div>
  );
}