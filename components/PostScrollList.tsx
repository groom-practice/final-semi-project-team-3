"use client";

import { fetchPosts } from "@/lib/fakePostsApi";
import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function PostScrollList() {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts-scroll"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= 10 ? nextPage : undefined;
    },
  });

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [bottomRef, hasNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-4 p-4 bg-neutral-900 rounded shadow">
      {data?.pages.flat().map((post) => (
        <div key={post.id} className="p-4 bg-black rounded">
          <button
            className="font-semibold text-lg cursor-pointer text-gray-400 hover:text-indigo-600 trainsition-all duration-200"
            onClick={() => router.push(`/posts/${post.id}`)}
          >
            {post.title}
          </button>
          <p>{post.body}</p>
        </div>
      ))}
      <div ref={bottomRef} className="h-10" />
      {isFetchingNextPage && <p>Loading more...</p>}
      {!hasNextPage && (
        <p className="text-center text-gray-400">No more posts</p>
      )}
    </div>
  )
}