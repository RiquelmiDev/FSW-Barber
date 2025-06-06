import { PrismaAdapter } from "@auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import { db } from "./prisma"
import { Adapter } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      // ID do cliente Google, vindo das variáveis de ambiente
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      // Segredo do cliente Google, vindo das variáveis de ambiente
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // Callback para incluir o ID do usuário no token JWT
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id, // Adiciona o ID do usuário à sessão
      } as typeof session.user & { id: string } //as any
      return session
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
}
