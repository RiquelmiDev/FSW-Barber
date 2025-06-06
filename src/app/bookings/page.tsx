import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"

type SessionUser = {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    //TODO: Redirecionar para a página de login
    return notFound()
  }

  const user = session.user as SessionUser

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: user.id,
      date: {
        gte: new Date(),
      },
    }, //join na tabela de serviços
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  const concluedBookings = await db.booking.findMany({
    where: {
      userId: user.id,
      date: {
        lt: new Date(),
      },
    }, //join na tabela de serviços
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {confirmedBookings.length === 0 && concluedBookings.length === 0 && (
          <p className="text-gray-400">Você não possui agendamentos.</p>
        )}
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}
        {concluedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            {concluedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Bookings
