import { prisma } from "@/app/lib/prismadb";
import redis from "@/app/lib/redis";
import { AuthKit } from "@astra-void/auth-kit";
import { PrismaAdapter } from "@astra-void/auth-kit/adapters";
import { CredentialsProvider, PasskeyProvider } from "@astra-void/auth-kit/providers";
import { RedisChallengeStore } from "@astra-void/auth-kit/store";
 
const handler = AuthKit({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider(),
    PasskeyProvider({
      rpId: "localhost",
      rpName: "Example Passkey",
      mode: "credential",
      challengeStore: RedisChallengeStore(redis)
    })
  ]
});

export { handler as GET, handler as POST };