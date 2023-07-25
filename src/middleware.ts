import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "zh"],
  defaultLocale: "en",
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

// import { authMiddleware } from "@clerk/nextjs";
// export default authMiddleware({
//   // locales: ["en", "zh"],
//   // defaultLocale: "en",
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
