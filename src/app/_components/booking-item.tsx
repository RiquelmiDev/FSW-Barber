import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"

//TODO: Receber agendamentos como props
const BookingItem = () => {
  return (
    <>
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Agendamentos
      </h2>

      <Card>
        <CardContent className="flex justify-between p-0">
          {/* Esquerda */}
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png" />
              </Avatar>
              <p className="text-sm">Barbearia Do Alfonso</p>
            </div>
          </div>
          {/* Direita */}
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm">Maio</p>
            <p className="text-2xl">17</p>
            <p className="text-sm">08:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
