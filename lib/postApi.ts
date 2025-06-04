import { Post } from "@/types/post";
import axios from "axios";

export const fetchPosts = async ({ pageParam = 1 }): Promise<Post[]> => {
  const res = await axios.get<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
  );
  return res.data;
};