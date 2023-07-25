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
    </div>
  );
};

export default PageNotFound;
