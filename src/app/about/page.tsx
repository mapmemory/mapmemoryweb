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

      {/* Header label */}
      <div className="h-[calc(100vh/5)] w-full py-2 flex items-start justify-center">
        <span className="text-white text-sm lg:text-[1.5vw]">IFRS Campus Feliz</span>
      </div>

      <main className="absolute h-[calc(100vh/3)] w-full text-white px-2 z-50">
        <div>
          <h2 id="tt2-abt" className="text-[10vw] font-bold lg:pl-[10%] lg:text-[4vw]">Mapa de</h2>
          <h1 id="tt1-abt" className="text-[18vw] pt-1 font-black lg:pl-[10%] lg:text-[8vw]">Memórias</h1>
        </div>

        <div className="flex flex-col gap-1 absolute w-[80%]">
          <span className="lg:text-[1.5vw] lg:pl-[13%]">
            Guarde suas memórias e compartilhe histórias
          </span>

          <span className="lg:text-[1.5vw] lg:pl-[13%]">
            Reviva momentos inesquecíveis da sua turma
          </span>
        </div>
      </main>

      <Image
        className="absolute right-0 top-[20%] w-[180px] z-[1] opacity-60 select-none lg:w-[20vw]"
        src={heroImage}
        alt="heroImage"
        width={400}
        priority={false}
        quality={100}
      />

      <div className="absolute bottom-4 w-full flex items-end justify-center pb-2 px-2 lg:bottom-[10%] lg:justify-start lg:pl-[10%]">
        <button onClick={handleAccess} className="bg-white w-full py-3 rounded-xl text-[#554FFF] font-bold max-w-[300px] lg:text-[1.5vw] lg:py-[.7vw]">
          Acessar
        </button>
      </div>
    </div>
  );
}
