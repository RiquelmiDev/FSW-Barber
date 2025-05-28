import Image from "next/image"
import BarbershopItem from "./_components/barbershop-item"
import BookingItem from "./_components/booking-item"
import Header from "./_components/header"
import Search from "./_components/search"
import { Button } from "./_components/ui/button"
import { quickSearchOptions } from "./_constants/search"
import { db } from "./_lib/prisma"

// Sever
export default async function Home() {
  // Chamar o banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      <Header />
      <div className="p-5">
        {/* Texto */}
        <h2 className="text-xl font-bold">Olá, Riquelmi</h2>
        <p>Sabado, 17 de Maio.</p>

        {/* Busca */}
        <div className="mt-6">
          <Search />
        </div>

        {/* Busca Rapida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button key={option.title} className="gap-2" variant="secondary">
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
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

        <BookingItem />

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
