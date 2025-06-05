import PostDetail from "@/components/PostDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);

  console.log("id", typeof id, typeof postId);
  return <PostDetail postId={postId} />;
}
