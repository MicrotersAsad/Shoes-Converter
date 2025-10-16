import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  console.log('Requested Path:', pathname);  // লগ করুন

  // _next, api, public assets বাদ
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
   
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // যদি /en বা /default থাকে → রিডিরেক্ট
  if (pathname === '/en' || pathname.startsWith('/en/') || 
      pathname === '/default' || pathname.startsWith('/default/')) {
    const newPath = pathname.replace(/^\/(en|default)(\/?)/, '/');
    console.log('Redirecting to:', newPath); // লগ করুন
    const url = req.nextUrl.clone();
    url.pathname = newPath;
    
    // 308 permanent redirect
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}
