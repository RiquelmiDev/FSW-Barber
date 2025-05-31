import { authOptions } from "@/app/_lib/auth"
import NextAuth from "next-auth"

// Cria o handler de autenticação configurando o provedor Google
const handler = NextAuth(authOptions)

// Exporta o handler para os métodos GET e POST da rota de autenticação
export { handler as GET, handler as POST }
