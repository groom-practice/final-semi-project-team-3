"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

type Profile = {
  name: string;
  image: string;
  role: string;
  determination?: string;
  github?: string;
};
// 개인 프로필 내용 작성
const profiles: Profile[] = [
  {
    name: "신유승",
    image: "/profile/mandoo.png",
    role: "프론트엔드 개발자",
    determination: "개인 각오 작성",
    github: "",
  },
  {
    name: "권수영",
    image: "/profile/suyeong.jpeg",
    role: "프론트엔드 개발자",
    determination: "아직 부족한 점이 많지만, 쉽게 포기하지 않는 마음가짐을 유지할 것입니다!",
    github: "https://github.com/ksy21019",
  },
  {
    name: "김호영",
    image: "/profile/hoyoung.jpg",
    role: "프론트엔드 개발자",
    determination:
      "앞으로 진행하게 될 팀 프로젝트 또한, 부지런하고 성실하게 임할 수 있도록 하겠습니다 감사합니다",
    github: "https://github.com/kim-hoyoung",
  },
  {
    name: "김기현",
    image: "/profile/mandoo.png",
    role: "프론트엔드 개발자",
    determination: "개인 각오 작성",
    github: "",
  },
  {
    name: "이예도",
    image: "/profile/mandoo.png",
    role: "프론트엔드 개발자",
    determination: "개인 각오 작성",
    github: "",
  },
  {
    name: "양아름",
    image: "/profile/mandoo.png",
    role: "프론트엔드 개발자",
    determination: "개인 각오 작성",
    github: "",
  },
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
  const [showFull, setShowFull] = useState(false);

  const isLongDetermination =
    profile.determination && profile.determination.length > 80;

  const displayedText =
    isLongDetermination && !showFull
      ? `${profile.determination?.slice(0, 80)}...`
      : profile.determination;

  return (
    // 프로필 사진
    <div className="w-full h-[600px] flex flex-col items-center justify-center bg-gradient-to-b from-[#f8f9ff] to-[#e2e8f0] text-slate-800 text-lg text-center space-y-6 shadow-lg cursor-pointer transition-transform">
      <Image
        src={profile.image}
        alt={`${profile.name} 사진`}
        width={240}
        height={240}
        className="w-60 h-75 rounded-full object-cover border-2 border-white"
      />

      <div className="flex flex-col items-center space-y-2">
        {/* 프로필 이름 */}
        <h2 className="text-2xl font-semibold text-indigo-800">
          {profile.name}
        </h2>
        {/* 프로필 역할 */}
        <p className="text-base text-slate-600">{profile.role}</p>
      </div>

      {/* 프로필 각오 */}
      {profile.determination && (
        <div className="max-w-mg">
          <p className="text-sm italic text-slate-500 px-8 leading-relaxed">
            {displayedText}
          </p>
          {isLongDetermination && (
            <button
              className="mt-1 text-blue-600 text-xs underline cursor-pointer"
              onClick={() => setShowFull(!showFull)}
            >
              {showFull ? "간단히" : "더보기"}
            </button>
          )}
        </div>
      )}

      {/* 프로필 깃 링크 */}
      {profile.github && profile.github !== "" && (
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block px-4 py-2 bg-[#333] text-white rounded-full text-sm hover:bg-[#000] transition-colors"
        >
          🔗 GitHub 방문하기
        </a>
      )}
    </div>
  );
}
