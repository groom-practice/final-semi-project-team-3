import Image from "next/image";
import type { FC } from "react";

interface PhotoDetailsProps {
  src: string;
  alt: string;
  photographer: {
    name: string;
  };
}

const PhotoDetails: FC<PhotoDetailsProps> = ({ src, alt, photographer }) => {
  return (
    <div className="overflow-hidden bg-white flex flex-col md:flex-row justify-between gap-4">
      <div className="flex-1">
        <Image
          src={src}
          width={800}
          height={600}
          alt={alt}
          className="w-full h-auto object-cover rounded-lg"
          priority
        />
      </div>

      <div className="md:w-1/3 p-4 flex flex-col justify-center">
        <span className="text-sm text-gray-500 mb-2">Photo by</span>
        <h3 className="text-2xl font-semibold text-gray-800">
          {photographer.name}
        </h3>
      </div>
    </div>
  );
};

export default PhotoDetails;
