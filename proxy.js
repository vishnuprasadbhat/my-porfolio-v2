import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from 'next/server';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
export function proxy(request) {
  const url = request.nextUrl.clone();

  // List of external URLs that should not have the base URL appended
  const externalUrls = ['https://github.com/', 'https://www.linkedin.com/','https://twitter.com/'];

  // Check if the request URL is external
  const isExternal = url.href.indexOf('netlify.app')>-1|| externalUrls.some(externalUrl => url.href.startsWith(externalUrl));

  // If the URL is external, return a response that redirects to the external URL
  if (isExternal) {
    return NextResponse.redirect(url);
  }

  // For internal routes, proceed with normal Next.js routing
  return NextResponse.next();
}
