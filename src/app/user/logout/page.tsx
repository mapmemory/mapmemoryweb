"use client";

import { removeFromLocalStorage } from "@/utils/requests/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogOut() {
  const router = useRouter();
  useEffect(() => {
    removeFromLocalStorage();
    router.push("/about");
  });
  return <div>Carregando...</div>;
}
