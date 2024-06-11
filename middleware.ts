import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authCookie = req.cookies.get("vego-token");
  if (!authCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: ["/", "/recipe", "/recipe/:slug*"],
};
