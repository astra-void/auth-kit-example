import { prisma } from "@/app/lib/prismadb";
import { AuthKit } from "@astra-void/auth-kit";
import { PrismaAdapter } from "@astra-void/auth-kit/adapters";
import { CredentialsProvider, MagiclinkProvider } from "@astra-void/auth-kit/providers";
 
const handler = AuthKit({
  adapter: PrismaAdapter(prisma),
  algorithm: 'argon2',
  providers: [
    CredentialsProvider(),
    MagiclinkProvider(),
  ],
});
 
export { handler as GET, handler as POST };