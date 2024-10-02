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
    <div className="flex flex-col items-center justify-start min-h-screen">
      <h1 className="font-bold py-4">Mapa de Memórias 4° TI 2024</h1>

      <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
        <Map posix={[-29.455639, -51.293144]} />
      </div>
    </div>
  );
}
