"use client";

import Image from "next/image";
import heroImage from "@/img/CoverHeroImage.png";

export default function About() {
  return (
    <div className="bg-[#554FFF] w-full h-screen">
      {/* Header label */}
      <div className="h-[calc(100vh/5)] w-full py-2 flex items-start justify-center">
        <span className="text-white text-sm">IFRS Campus Feliz</span>
      </div>
      <main className="h-[calc(100vh/3)] w-full text-white px-3">
        <div>
          <h2 className="text-3xl font-black">Mapa de</h2>
          <h1 className="pt-2 pb-5 text-5xl font-black">Memórias</h1>
        </div>

        <div className="w-[80%] flex flex-col gap-3 pt-[7vh]">
          <span className="">
            Guarde suas memórias e compartilhe histórias
          </span>

          <span>
            Reviva momentos inesquecíveis da sua turma
          </span>
        </div>
      </main>
      <div className="h-[calc(100vh/3)] flex items-end justify-center pb-2 px-2">
        <button className="bg-white w-full py-3 rounded-xl text-[#554FFF] font-bold">
          Acessar
        </button>
      </div>


      <Image
        className="absolute top-36 left-36 overflow-hidden"
        src={heroImage}
        alt="heroImage"
        width={400}
      />
    </div>
  );
}
