// middleware.js
import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req) {
  const { pathname, search } = req.nextUrl;

  // _next, api, public assets বাদ
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // যদি /en বা /en/... থাকে → /en সরিয়ে redirect
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    // /en সরিয়ে নতুন path তৈরি করুন
    const newPath = pathname.replace(/^\/en(\/?)/, '/');
    
    // req.nextUrl clone করে সরাসরি pathname পরিবর্তন করুন
    const url = req.nextUrl.clone();
    url.pathname = newPath;
    
    // 308 permanent redirect
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
};