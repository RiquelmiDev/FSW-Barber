"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

interface CreateBookingParams {
  serviceId: string
  date: Date
}

// Tudo que eu criar aqui vai ser executado no servidor
// Isso é útil para ações que precisam acessar o banco de dados ou fazer chamadas de API
export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Usuário não autenticado")
  }

  await db.booking.create({
    data: {
      ...params,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userId: (user.user as any).id, // Usa o ID do usuário autenticado
    },
  })
  revalidatePath("/barbershops/[id]") // Revalida a rota para atualizar os dados
  revalidatePath("/bookings")
}
