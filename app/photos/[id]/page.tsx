import PhotoDetails from "@/components/PhotoDetails";
import { getPhoto } from "@/lib/fakeImageApi";
import { Photo } from "@/types/photo";
import { notFound } from "next/navigation";

type PageParams = Promise<{ id: string }>;

const PhotoPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;

  try {
    const response = await getPhoto(id);

    if (response.status === 404) {
      notFound();
    }

    const photo = (await response.json()) as Photo;

    return (
      <div className="p-6">
        <PhotoDetails
          src={photo.download_url}
          alt={photo.author}
          photographer={{
            name: photo.author,
          }}
        />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch photo:", error);
    notFound();
  }
};

export default PhotoPage;
