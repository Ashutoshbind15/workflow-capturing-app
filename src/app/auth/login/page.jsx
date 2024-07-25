import { LoginForm } from "@/components/blocks/login";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-y-5">
      <LoginForm />
      <Link href={"/auth/signup"} className="underline">
        Sign up
      </Link>
    </div>
  );
};

export default LoginPage;
