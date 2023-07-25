"use client";
import { useTranslations } from "next-intl";
import SignIn from "@src/components/SignIn";

export default function Home() {
  const t = useTranslations("Index");
  return (
    <main>
      <SignIn />
    </main>
  );
}
