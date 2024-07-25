import { LoginForm } from "@/components/blocks/login";
import { SignupForm } from "@/components/blocks/signup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-y-5">
      <SignupForm />

      <Link href={"/auth/login"} className="underline">
        Login
      </Link>
    </div>
  );
};

export default LoginPage;
