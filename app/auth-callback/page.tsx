"use client"

import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { getAuthStatus } from "./actions";
import { useRouter } from "next/navigation";
import { RoutesPaths } from "@/types/enums";
import { Loader2 } from "lucide-react";

const AuthCallbackPage: NextPage = () => {
  const router = useRouter();
  const [configId, setConfigId] = useState<string | null>(null);

  useEffect(() => {
    const configurationId = window.localStorage.getItem("configuration");
    if (!!configurationId) setConfigId(configurationId);
  })

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  })

  if (data?.success) {
    if (configId) {
      window.localStorage.removeItem("configuration")
      router.push(`${RoutesPaths.ConfigurePreview}?id=${configId}`);
    } else {
      router.push(RoutesPaths.Home)
    }
  }

  return (
    <div
      className="w-full mt-24 flex justify-center"
    >
      <div
        className="flex flex-col items-center gap-2"
      >
        <Loader2
          className="font-semibold animate-spin text-zinc-500"
        />
        <h3
          className="font-semibold text-xl"
        >
          Logging you in...
        </h3>
        <p>
          You will be redirected automatically.
        </p>
      </div>
    </div>
  )
}

export default AuthCallbackPage;