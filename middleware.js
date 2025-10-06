import { NextResponse } from 'next/server';


// সব লোকেল যেগুলো ব্যবহার করছো
const LOCALES = ['en','bn','fr','nl','gu','hi','it','ja','ko','pl','pt','ru','es','de'];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // static, api বা asset পাথ বাদ
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // যদি /en বা /en/... থাকে → / থেকে /en মুছে rewrite করো
  for (const locale of LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      if (locale === 'en') {
        const url = req.nextUrl.clone();
        url.pathname = pathname.replace(`/${locale}`, '') || '/';
        return NextResponse.rewrite(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'], // সব রুটে প্রযোজ্য, স্ট্যাটিক বাদ
};
