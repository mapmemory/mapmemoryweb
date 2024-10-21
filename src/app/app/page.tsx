import PageBottomNavigation from "@/components/PageBottomNavigation";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default async function Home() {
  const Map = useMemo(() => dynamic(
    () => import("@/components/Map"),
    {
      loading: () => <p>Carregando...</p>,
      ssr: false
    }
  ), []);

  return (
    <div className="flex flex-col items-center justify-start h-full">
      <div className="bg-gradient-to-b from-[#554FFF] to-transparent h-[25px] w-full"></div>

      <div id="mapAreaRendered" className="bg-white-700">
        <Map posix={[-29.455639, -51.293144]} />
      </div>

      <PageBottomNavigation />
    </div>
  );
}
