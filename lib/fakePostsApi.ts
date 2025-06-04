import { Post } from "@/types/posts";
import axios from "axios";

export const fetchPosts = async ({ pageParam = 1 }): Promise<Post[]> => {
  const res = await axios.get<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
  );
  return res.data;
};

export const fetchPostById = async (id: number): Promise<Post> => {
  const res = await axios.get<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return res.data;
};