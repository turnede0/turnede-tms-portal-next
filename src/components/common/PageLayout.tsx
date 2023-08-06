"use client";
import React, { Suspense, useState } from "react";
import Header from "@src/components/common/Header";
import Sidebar from "@src/components/common//Sidebar";
import { ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import Loader from "@src/components/common/Loader";

type Props = {
  children?: ReactNode;
  title?: ReactNode;
};

export default function PageLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <>
      {isSignedIn ? (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {/* <!-- ===== Page Wrapper Start ===== --> */}
          <div className="flex h-screen overflow-hidden">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Content Area Start ===== --> */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {/* <!-- ===== Header Start ===== --> */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Header End ===== --> */}

              {/* <!-- ===== Main Content Start ===== --> */}
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  <Suspense fallback={<Loader />}>{children}</Suspense>
                </div>
              </main>
              {/* <!-- ===== Main Content End ===== --> */}
            </div>
            {/* <!-- ===== Content Area End ===== --> */}
          </div>
          {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
      ) : (
        <>
          <Loader /> {/* */}
          {/* 
              Route matches, but no user is signed in. 
              Redirect to the sign in page.
            */}
          {/* <RedirectToSignIn /> */}
        </>
      )}
    </>
  );
}
