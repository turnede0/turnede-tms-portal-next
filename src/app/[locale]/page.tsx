"use client";
import SignIn from "@src/components/SignIn";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("alex key", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
    console.log("alex key", process.env.CLERK_SECRET_KEY);
  }, []);

  return (
    <main>
      <SignIn />
    </main>
  );
}
