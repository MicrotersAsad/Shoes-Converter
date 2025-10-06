// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// public files (images, css, js) match হলে middleware বাদ
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req /** @type {NextRequest} */) {
  const { pathname, search, origin } = req.nextUrl;

  // _next, api, public assets বাদ
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // যদি /en বা /en/... থাকে → /en সরিয়ে **redirect** (URL বদলাবে)
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const newPath = pathname.replace(/^\/en(\/?)/, '/');
    const url = new URL(newPath + search, origin);
    return NextResponse.redirect(url, 308); // permanent redirect
  }

  return NextResponse.next();
}

// সব রুটে চালাও, কিন্তু static/API বাদ
export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
