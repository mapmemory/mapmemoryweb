"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Box, ThemeProvider } from "@mui/material";

import { theme } from "@/components/PageBottomNavigation";
import goBack from "@/img/goback.svg";
import CheckBox from "@mui/icons-material/Check";
import Back from "@mui/icons-material/ArrowBack";

export default function Login() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/app");
  }

  return (
    <div>
      <button
        className="py-1 px-2"
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
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 1,
            maxWidth: 400,
            margin: "0 auto",
          }}
        >
          <div className="text-xl w-fit font-black text-[#FFF] bg-[#554FFF] py-2 px-3 rounded-xl fixed top-4 right-4">4/4</div>
          
          <h1 className="text-3xl font-black text-[#554FFF] py-3">
            Não é necessário fazer login para visualizar as memórias, porém é necessário para criar.
          </h1>

          <h1 className="text-3xl font-black text-[#554FFF] py-3">
            Faça bom proveito! 😊
          </h1>

          <div
            className="text-xl w-fit font-black text-[#FFF] bg-[#554FFF] py-2 px-3 pb-3 rounded-xl fixed bottom-4 right-4 hover:cursor-pointer"
            onClick={()=> {router.push("/app")}}
          >
            <CheckBox />
          </div>

          <div
            className="text-xl w-fit font-black text-[#FFF] bg-[#554FFF] py-2 px-3 pb-3 rounded-xl fixed bottom-4 left-4 hover:cursor-pointer"
            onClick={()=> {router.push("/tutorial/step/3")}}
          >
            <Back />
          </div>
        </Box>
      </ThemeProvider>
    </div>
  );
}
