"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
  const searchParam = useSearchParams();
  const callbackUrl = searchParam.get("callbackUrl");
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className=" flex items-center w-full gap-x-2">
      <Button
        onClick={() => onClick("google")}
        size={"lg"}
        variant={"outline"}
        className="w-full"
      >
        <FcGoogle className="h-5 w-5" />
        <span className="ml-2">Continue with google</span>
      </Button>
    </div>
  );
};
