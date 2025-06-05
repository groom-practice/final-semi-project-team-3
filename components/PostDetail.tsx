export default function PostDetail({ postId }: { postId: number }) {
  console.log("id", postId);

  return (
    <div className="p-4 space-y-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold"></h1>
      <p className="text-gray-700"></p>

      <div>
        <h2 className="font-semibold mt-4 text-blue-700">작성자</h2>
      </div>

      <div>
        <h2 className="font-semibold mt-4 text-blue-700">댓글</h2>
      </div>
    </div>
  );
}
