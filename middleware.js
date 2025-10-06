// middleware.js
import { NextResponse } from "next/server";


export function middleware() {
  const url = req.nextUrl.clone();

  // যদি URL /en দিয়ে শুরু হয়, তাহলে /en সরিয়ে rewrite করো
  if (url.pathname.startsWith("/en")) {
    url.pathname = url.pathname.replace(/^\/en/, "") || "/";
    return NextResponse.rewrite(url); // ✅ rewrite, redirect নয়
  }

  return NextResponse.next();
}

// কেবল /en/* path গুলোর জন্য কাজ করবে
export const config = {
  matcher: ["/en/:path*"],
};
