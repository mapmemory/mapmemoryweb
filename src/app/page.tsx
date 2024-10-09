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
    <div className="flex flex-col items-center justify-start">
      <h1 className="font-bold py-2 text-slate-800">Mapa de Memórias</h1>

      <div
        id="mapAreaRendered"
        style={{
          width: "100%",
          height: "800px",
        }}
        className="bg-white-700"
      >
        <Map posix={[-29.455639, -51.293144]} />
      </div>
      <PageBottomNavigation />
    </div>
  );
}
