import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next();
  },
  {
    loginPath: "/auth", 
  }
);

export const config = {
  matcher: [
    "/user/:path*"
  ],
};
