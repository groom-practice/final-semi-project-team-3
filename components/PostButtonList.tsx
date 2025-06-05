"use client";

import { fetchPosts } from "@/lib/postApi";
import { Post } from "@/types/posts";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useFavoriteStore } from "@/store/favoriteStore";

export default function PostButtonList() {
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

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

  const handleTitleClick = (e:React.MouseEvent, post:Post) => {

  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const allPosts = data?.pages.flat() ?? [];
  const favoritePosts = allPosts.filter((post) => favorites.includes(post.id));
  const otherPosts = allPosts.filter((post) => !favorites.includes(post.id));
  const sortedPosts = [...favoritePosts, ...otherPosts];

  return (
    <div className="space-y-4 p-4 bg-neutral-900 rounded shadow">
      {sortedPosts.map((post) => (
        <div key={post.id} className="p-4 bg-black rounded">
          <div className="flex justify-between items-center mb-2">
          <p
            className="font-semibold text-lg cursor-pointer text-gray-400 hover:text-indigo-600 trainsition-all duration-200"
            onClick={(e) => handleTitleClick(e, post)}
          >
            {post.title}
          </p>
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

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="mt-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
        >
          {isFetchingNextPage ? "로딩 중" : "더 보기"}
        </button>
      )}
    </div>
  );
}
