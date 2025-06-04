"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Profile = {
  name: string;
  image: string;
  role: string;
};

const profiles: Profile[] = [
  { name: "신유승", image: "/profile/mandoo.png", role: "프론트엔드 개발자" },
  { name: "권수영", image: "/profile/mandoo.png", role: "프론트엔드 개발자" },
  { name: "김호영", image: "/profile/mandoo.png", role: "프론트엔드 개발자" },
  { name: "김기현", image: "/profile/mandoo.png", role: "프론트엔드 개발자" },
  { name: "이예도", image: "/profile/mandoo.png", role: "프론트엔드 개발자" },
  { name: "양아름", image: "/profile/mandoo.png", role: "프론트엔드 개발자" },
];

export default function Page() {
  return (
    <div className="p-10 w-screen h-screen bg-black text-white text-sm">
      <Swiper
        pagination={{ type: "progressbar" }}
        modules={[Pagination]}
        className="w-full h-full"
      >
        {profiles.map((profile) => (
          <SwiperSlide key={profile.name}>
            <SlideContent profile={profile} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function SlideContent({ profile }: { profile: Profile }) {
  return (
    <div className="w-full h-[600px] flex flex-col items-center justify-center bg-gradient-to-b from-[#f8f9ff] to-[#e2e8f0] text-slate-800 text-lg text-center space-y-8 shadow-lg cursor-pointer transition-transform">
      <Image
        src={profile.image}
        alt={`${profile.name} 사진`}
        width={260}
        height={260}
        className="w-60 h-60 rounded-full object-cover border-4 border-[#007aff] shadow-md"
      />
      <h2 className="text-2xl font-semibold text-indigo-800">{profile.name}</h2>
      <p className="text-base text-slate-600">{profile.role}</p>
    </div>
  );
}
