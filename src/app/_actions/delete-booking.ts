"use server"

import { getServerSession } from "next-auth"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { revalidatePath } from "next/cache"
// Importe método para obter usuário autenticado

//TODO: em vez de deletar ele deve alterar o status do agendamento para cancelado
export const deleteBooking = async (bookingId: string) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Usuário não autenticado")
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as any).id
  console.log(userId)

  // Busca o agendamento e verifica se pertence ao usuário
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    select: { userId: true },
  })

  if (!booking || booking.userId !== userId) {
    throw new Error("Acesso negado")
  }
  //Delata o agendamento caso o id do user logado for igual ao id do user do agendamento
  await db.booking.delete({
    where: { id: bookingId },
  })
  //mantem a interface sincronizada com o estado mais recente dos dados, sem exigir um reload manual ou a reinicialização do servidor.
  revalidatePath("/bookings")
}
