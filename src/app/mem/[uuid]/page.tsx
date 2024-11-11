"use client";

import PageBottomNavigation, { theme } from "@/components/PageBottomNavigation";
import { Box, ThemeProvider } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import goBack from "@/img/goback.svg";
import { useEffect, useState } from "react";
import { getMapSpotByGuid, MapSpot } from "@/utils/requests/MapSpot";

import happyImg from "@/img/emoji-happy.svg";
import sadImg from "@/img/emoji-sad.svg";
import angryImg from "@/img/emoji-angry.svg";

export default function MemoryPage({ params }: { params: { uuid: string } }) {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/app");
  }

  const [marker, setMarker] = useState<MapSpot | null>(null);
  const [isHappy, setIsHappy] = useState<boolean>(false);
  const [isSad, setIsSad] = useState<boolean>(false);
  const [isAngry, setIsAngry] = useState<boolean>(false);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await getMapSpotByGuid(params.uuid);
        setMarker(response);
        if (response?.type === 0) {
          setIsHappy(true);
        } else if (response?.type === 1) {
          setIsSad(true);
        } else if (response?.type === 2) {
          setIsAngry(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (marker === null) fetchMarkers();
  });

  return (
    <div>
      <button
        className="py-4 px-2"
        onClick={handleGoBack}
      >
        <Image src={goBack} alt="Voltar" width={53} priority={true} quality={100} title="Voltar" />
      </button>

      <ThemeProvider theme={theme}>
        <Box
          sx={{ 
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
            paddingBottom: 12,
            maxWidth: 380,
            margin: "0 auto",
          }}
        >
          <div className="flex items-center text-3xl font-black text-[#554FFF] py-3">
            {isHappy ? <Image className="inline pr-2" src={happyImg} alt="Humor" width={43} priority={true} quality={65} /> : ""}
            {isSad ? <Image className="inline pr-2" src={sadImg} alt="Humor" width={43} priority={true} quality={65} /> : ""}
            {isAngry ? <Image className="inline pr-2" src={angryImg} alt="Humor" width={43} priority={true} quality={65} /> : ""}
            <h1>Memória de <span className="underline px-1">{`${marker?.name}`}</span></h1>
          </div>

          <div className="">
            {marker?.picture ? 
              <Image
                className="rounded-md border-[#554FFF] border-1 shadow-xl"
                src={`http://luisdef.com/mm/img/${marker.picture}`}
                alt="Imagem"
                width={380}
                height={100}
                priority={true}
                quality={100}
              />
              : ""
            }
          </div>
            
          <p className="border-l-[2px] border-l-[#282594] bg-slate-200 p-4 rounded-e-xl  pl-2 text-[#282594] font-bold">{marker?.description}</p>
        </Box>
      </ThemeProvider>
      
      <PageBottomNavigation />
    </div>
  );
}
