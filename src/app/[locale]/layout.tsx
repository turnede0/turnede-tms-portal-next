import React from "react";
import { Poppins } from "@next/font/google";
import clsx from "clsx";
import { notFound } from "next/navigation";
import { createTranslator, NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import "@src/app/[locale]/globals.css";
import Providers from "@src/util/provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const messages = (await import(`@src/messages/${locale}.json`)).default;

  // You can use the core (non-React) APIs when you have to use next-intl
  // outside of components. Potentially this will be simplified in the future
  // (see https://next-intl-docs.vercel.app/docs/next-13/server-components).
  const t = createTranslator({ locale, messages });

  return {
    title: t("LocaleLayout.title"),
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  let messages;
  try {
    messages = (await import(`@src/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html className="h-full" lang={locale}>
      <body
        className={clsx(poppins.className, "flex h-full flex-col")}
        // suppressHydrationWarning={true}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
