import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default async function middleware(req: NextRequest) {
  return withAuth(req);
}

export const config = {
  matcher: [
    // Match all request paths except for "/login" and "/signup"
    // Negative lookahead to exclude "/login" and "/signup"
    '/((?!login|signup|api).*)',
  ],
};
