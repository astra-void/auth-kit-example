import { prisma } from "@/app/lib/prismadb";
import { AuthKit } from "@astra-void/auth-kit";
import { PrismaAdapter } from "@astra-void/auth-kit/adapters";
 
const handler = AuthKit({
  adapter: PrismaAdapter(prisma),
});
 
export { handler as GET, handler as POST };