import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";
import { stackMiddleware } from "./stackMiddleware";

const withIntl = () =>
  createMiddleware({
    locales: ["en", "zh"],
    defaultLocale: "en",
  });

const withAuthorization = () =>
  authMiddleware({
    publicRoutes: ["/"],
  });

const middlewares = [withIntl, withAuthorization];

export default stackMiddleware(middlewares);

// export default authMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
