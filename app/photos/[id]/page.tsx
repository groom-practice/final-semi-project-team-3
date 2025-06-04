type PageParams = Promise<{ id: string }>;

const PhotoPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;
  const response = await getPhoto(id);

  return <div>Loading...</div>;
};

export default PhotoPage;
