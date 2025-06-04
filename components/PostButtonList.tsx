"use client";

import { fetchPosts } from "@/lib/postApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function PostButtonList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts-button"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= 10 ? nextPage : undefined;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-4 p-4 bg-neutral-900 rounded shadow">
      {data?.pages.flat().map(post => (
        <div key={post.id} className="p-4 bg-black rounded">
          <Link href={`/posts/${post.id}`} className="font-semibold text-lg cursor-pointer text-gray-400 hover:text-indigo-600 trainsition-all duration-200">
            {post.title}
          </Link>
          <p>{post.body}</p>
        </div>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} className="mt-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 disabled:cpacity-50 cursor-pointer">
          {isFetchingNextPage ? "로딩 중" : "더 보기"}
        </button>
      )}
    </div>
  );
}