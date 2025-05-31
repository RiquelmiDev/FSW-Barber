import { db } from "@/app/_lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { Adapter } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"

// Cria o handler de autenticação configurando o provedor Google
const handler = NextAuth({
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
})

// Exporta o handler para os métodos GET e POST da rota de autenticação
export { handler as GET, handler as POST }
