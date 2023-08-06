"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";

import { ChangeEvent } from "react";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  async function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    // let a = `/${event.target.value}${pathname}`;
    console.log("change locale=", event.target.value);
    router.push(pathname, { locale: event.target.value });
    setTimeout(() => window.location.reload(), 200);
  }

  return (
    <label className="relative text-gray-400">
      <p className="sr-only">{t("label")}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={locale}
        onChange={onSelectChange}
      >
        {["en", "zh"].map((cur) => (
          <option key={cur} value={cur}>
            {t("locale", { locale: cur })}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute top-[8px] right-2">⌄</span>
    </label>
  );
}
