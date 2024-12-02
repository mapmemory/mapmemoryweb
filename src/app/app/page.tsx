"use client";

import PageBottomNavigation from "@/components/PageBottomNavigation";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!document.cookie.includes("sawTutorial=true")) {
      router.push("/tutorial/step/1");
    }
  });

  const Map = useMemo(() => dynamic(
    () => import("@/components/Map"),
    {
      loading: () => <p className="text-white">Carregando...</p>,
      ssr: false
    }
  ), []);

  return (
    <div className="flex flex-col items-center justify-start h-full">
      <div className="py-5 w-full bg-[#554fff] absolute top-[-1.4rem] left-0 z-20 opacity-50 rounded-[50%]"></div>

      <div id="mapAreaRendered" className="bg-slate-400">
        <Map posix={[-29.455639, -51.293144]} />
      </div>

      <PageBottomNavigation />
    </div>
  );
}
