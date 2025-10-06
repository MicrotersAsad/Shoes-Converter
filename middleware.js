import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();

  // শুধু en-prefixed URL redirect করো
  if (url.pathname.startsWith('/en/')) {
    url.pathname = url.pathname.replace(/^\/en/, '');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/en/:path*'], 
};
