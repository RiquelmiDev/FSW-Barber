import Image from "next/image"
import BarbershopItem from "./_components/barbershop-item"
import BookingItem from "./_components/booking-item"
import Header from "./_components/header"
import Search from "./_components/search"
import { Button } from "./_components/ui/button"
import { quickSearchOptions } from "./_constants/search"
import { db } from "./_lib/prisma"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Sever
export default async function Home() {
  const session = await getServerSession(authOptions)

  // Chamar o banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const ConfirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          userId: (session.user as any).id,
          date: {
            gte: new Date(),
          },
        },
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
    : []

  return (
    <div>
      <Header />
      <div className="p-5">
        {/* Texto */}
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : "Bem Vindo!"}
        </h2>
        <p>
          <span className="capitalize">
            {format(new Date(), "EEEE, dd", { locale: ptBR })}
          </span>
          <span>&nbsp;de&nbsp;</span>
          <span className="capitalize">
            {format(new Date(), "MMMM", { locale: ptBR })}
          </span>
        </p>

        {/* Busca */}
        <div className="mt-6">
          <Search />
        </div>

        {/* Busca Rapida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              className="gap-2"
              variant="secondary"
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* Banner */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/Banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* Agendamento */}

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>

        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {ConfirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      {/* Footer */}

      {/* Fim do Footer */}
    </div>
  )
}
