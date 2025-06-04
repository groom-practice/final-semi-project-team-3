"use client";

import { fetchPosts } from "@/lib/fakePostsApi";
import { useRef, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function PostScrollList() {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

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

  const toggleFavorite = (postId: number) => {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const allPosts = data?.pages.flat() ?? [];
  const favoritePosts = allPosts.filter((post) => favorites.includes(post.id));
  const otherPosts = allPosts.filter((post) => !favorites.includes(post.id));
  const sortedPosts = [...favoritePosts, ...otherPosts];

  return (
    <div className="space-y-4 p-4 bg-neutral-900 rounded shadow">
      {sortedPosts.flat().map((post) => (
        <div key={post.id} className="p-4 bg-black rounded">
          <div className="flex justify-between items-center mb-2">
            <button
              className="font-semibold text-lg cursor-pointer text-gray-400 hover:text-indigo-600 trainsition-all duration-200"
              onClick={() => router.push(`/posts/${post.id}`)}
            >
              {post.title}
            </button>
            <button
              onClick={() => toggleFavorite(post.id)}
              className={`ml-4 px-2 py-1 text-sm rounded ${
                favorites.includes(post.id)
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-700 text-white"
              }`}
            >
              {favorites.includes(post.id) ? "★" : "☆"}
            </button>
          </div>
          <p>{post.body}</p>
        </div>
      ))}
      <div ref={bottomRef} className="h-10" />
      {isFetchingNextPage && <p>Loading more...</p>}
      {!hasNextPage && (
        <p className="text-center text-gray-400">No more posts</p>
      )}
    </div>
  );
}
