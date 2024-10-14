"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import heroImage from "@/img/CoverHeroImage.png";

export default function About() {
  const router = useRouter();

  const handleAccess = () => {
    const oneWeekLast = 7 * 24 * 3600;
    document.cookie = `sawAbout=true; path=/; max-age=${oneWeekLast}`;
    router.push("/");
  }

  return (
    <div className="bg-[#554FFF] w-full h-screen overflow-hidden">

      <Image
        className="absolute right-0 top-[20%] w-[280px] z-[1] opacity-60 select-none"
        src={heroImage}
        alt="heroImage"
        width={400}
        priority={true}
        quality={50}
      />

      {/* Header label */}
      <div className="h-[calc(100vh/5)] w-full py-1 flex items-start justify-center">
        <span className="text-white text-sm">IFRS Campus Feliz</span>
      </div>

      <main className="h-[calc(100vh/3)] w-full text-white px-2 z-50">
        <div>
          <h2 id="tt2-abt" className="text-[10vw] font-bold">Mapa de</h2>
          <h1 id="tt1-abt" className="text-[18vw] pt-1 font-black">Memórias</h1>
        </div>

        <div className="w-[80%] flex flex-col gap-3 lg:hidden">
          <span className="">
            Guarde suas memórias e compartilhe histórias
          </span>

          <span>
            Reviva momentos inesquecíveis da sua turma
          </span>
        </div>
      </main>

      <div className="h-[calc(100vh/3)] flex items-end justify-center pb-2 px-2">
        <button onClick={handleAccess} className="bg-white w-full py-3 rounded-xl text-[#554FFF] font-bold max-w-[300px]">
          Acessar
        </button>
      </div>
    </div>
  );
}
