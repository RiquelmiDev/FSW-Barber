"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

interface CreateBookingParams {
  userId: string
  serviceId: string
  date: Date
}

// Tudo que eu criar aqui vai ser executado no servidor
// Isso é útil para ações que precisam acessar o banco de dados ou fazer chamadas de API
export const createBooking = async (params: CreateBookingParams) => {
  await db.booking.create({
    data: params,
  })
  revalidatePath("/barbershops/[id]") // Revalida a rota para atualizar os dados
}
