import React from "react";
import Link from "next/link";
import Logo from "@public/logo/turned-e-logo-zh.png";
import Image from "next/image";

const PageNotFound = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center dark:bg-boxdark-2 dark:text-bodydark text-black">
      <Link className="inline-block" href="/">
        <Image className="block w-[300px]" src={Logo} alt="Logo" />
      </Link>
      <span>404 not found</span>
      <a href="/">back to sign in</a>

      <div className="flex flex-row p-5">
        <a
          type="button"
          href="/"
          className="mx-2 inline-flex items-center justify-center bg-company px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Back to Sign in
        </a>

        <a
          type="button"
          href="/main"
          className="mx-2 inline-flex items-center justify-center bg-company px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Back to Main page
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
