"use client";

import { theme } from "@/components/PageBottomNavigation";
import { Box, ThemeProvider } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import goBack from "@/img/goback.svg";

import { Carousel } from "react-responsive-carousel";

export default function MemoryPage({ params }: { params: { uuid: string } }) {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/app");
  }

  return (
    <div>
      <button
        className="py-4 px-2"
        onClick={handleGoBack}
      >
        <Image
          src={goBack}
          alt="Voltar"
          width={53}
          priority={true}
          quality={100}
          title="Voltar"
        />
      </button>

      <ThemeProvider theme={theme}>
        <Box
          sx={{ 
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
            maxWidth: 400,
            margin: "0 auto",
          }}
        >
          <h1 className="text-3xl font-black text-[#554FFF] py-3">
            Festividades coloquiais
          </h1>
          {/* https://luisdef.com/mm/img/1.jpg */}

          <Carousel showThumbs={false} infiniteLoop autoPlay transitionTime={1000}>
            <div>
              <Image
                src={"https://luisdef.com/mm/img/1.jpg"}
                alt="Imagem"
                width={200}
                height={80}
                priority={true}
                quality={100}
              />
            </div>
            <div>
              <Image
                src={"https://luisdef.com/mm/img/2.jpg"}
                alt="Imagem"
                width={200}
                height={80}
                priority={true}
                quality={100}
              />
            </div>
            <div>
              <Image
                src={"https://luisdef.com/mm/img/3.jpg"}
                alt="Imagem"
                width={200}
                height={80}
                priority={true}
                quality={100}
              />
            </div>
          </Carousel>

          <p>{params.uuid}</p>
        </Box>
      </ThemeProvider>
    </div>
  );
}
