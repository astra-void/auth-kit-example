import { prisma } from "@/app/lib/prismadb";
import redis from "@/app/lib/redis";
import { AuthKit } from "@astra-void/auth-kit";
import { PrismaAdapter } from "@astra-void/auth-kit/adapters";
import { RedisChallengeStore } from "@astra-void/auth-kit/store";
 
const handler = AuthKit({
  adapter: PrismaAdapter(prisma),
  passkey: {
    rpId: "localhost",
    rpName: "Example Passkey",
    mode: "credential",
    challengeStore: RedisChallengeStore(redis)
  }
});

export { handler as GET, handler as POST };