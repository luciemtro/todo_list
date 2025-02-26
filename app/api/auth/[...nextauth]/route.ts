import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // ✅ On importe `authOptions` depuis `lib/auth.ts`

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
