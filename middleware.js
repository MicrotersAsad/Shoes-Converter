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

  // যদি /en বা /en/... অথবা /default বা /default/... থাকে → redirect
  if (pathname === '/en' || pathname.startsWith('/en/') || 
      pathname === '/default' || pathname.startsWith('/default/')) {
    // /en বা /default সরিয়ে নতুন path তৈরি করুন
    const newPath = pathname.replace(/^\/(en|default)(\/?)/, '/');
    
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