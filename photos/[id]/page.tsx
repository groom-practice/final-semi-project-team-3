import { getPhoto } from "@/lib/fakeImageApi";
import { Photo } from "@/types/photo";
import { notFound } from "next/navigation";

type PageParams = Promise<{ id: string }>;

const PhotoPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;
  const response = await getPhoto(id);

  if (response.status === 404) {
    notFound();
  }

  const photo = (await response.json()) as Photo;

  return <div>Loading...</div>;
};

export default PhotoPage;
