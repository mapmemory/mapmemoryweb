"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Initial() {
  const router = useRouter();

  useEffect(() => {
    if (document.cookie.includes("sawAbout=true")) {
      router.push("/app");
    } else {
      router.push("/about");
    }
  });

  return (<span className="font-bold w-full text-center block py-4">Loading...</span>);
}
