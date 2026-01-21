import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const cities = [
  {
    name: "São Paulo",
    country: "Brasil",
    imagePath:
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Rio de Janeiro",
    country: "Brasil",
    imagePath:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Brasília",
    country: "Brasil",
    imagePath:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Lisboa",
    country: "Portugal",
    imagePath:
      "https://images.unsplash.com/photo-1523867574998-1a336b6ded04?auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    imagePath:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1170&q=80",
  },
]

const planes = [
  { producer: "Airbus", model: "A320" },
  { producer: "Boeing", model: "737-800" },
  { producer: "Embraer", model: "E195" },
  { producer: "Airbus", model: "A330" },
]

const users = [
  {
    name: "Admin PI2",
    email: "admin@pi2.com",
    password: "Admin@123",
    isAdmin: true,
  },
  {
    name: "Maria Souza",
    email: "maria@pi2.com",
    password: "Maria@123",
    isAdmin: false,
  },
  {
    name: "Carlos Lima",
    email: "carlos@pi2.com",
    password: "Carlos@123",
    isAdmin: false,
  },
]

const trips = [
  {
    from: "São Paulo",
    to: "Rio de Janeiro",
    departureTime: "08:00:00",
    basePrice: 320.5,
    availableSeats: 120,
  },
  {
    from: "Rio de Janeiro",
    to: "São Paulo",
    departureTime: "18:30:00",
    basePrice: 310.0,
    availableSeats: 120,
  },
  {
    from: "São Paulo",
    to: "Brasília",
    departureTime: "09:15:00",
    basePrice: 450.0,
    availableSeats: 98,
  },
  {
    from: "Brasília",
    to: "Lisboa",
    departureTime: "22:10:00",
    basePrice: 2400.0,
    availableSeats: 210,
  },
  {
    from: "Lisboa",
    to: "Buenos Aires",
    departureTime: "13:40:00",
    basePrice: 1800.0,
    availableSeats: 180,
  },
]

const toTime = (time: string) => new Date(`1970-01-01T${time}.000Z`)

const ensurePlane = async (producer: string, model: string) => {
  const existing = await prisma.plane.findFirst({
    where: {
      producer,
      model,
    },
  })

  if (!existing) {
    await prisma.plane.create({
      data: {
        producer,
        model,
      },
    })
  }
}

const ensureTrip = async (data: {
  fromCityId: number
  toCityId: number
  departureDate: Date
  returnDate?: Date | null
  basePrice: number
  availableSeats: number
}) => {
  await prisma.trip.upsert({
    where: {
      fromCityId_toCityId_departureDate: {
        fromCityId: data.fromCityId,
        toCityId: data.toCityId,
        departureDate: data.departureDate,
      },
    },
    create: data,
    update: {
      basePrice: data.basePrice,
      availableSeats: data.availableSeats,
      returnDate: data.returnDate ?? null,
    },
  })
}

const main = async () => {
  const createdCities = [] as { id: number; name: string }[]

  for (const city of cities) {
    const saved = await prisma.city.upsert({
      where: { name: city.name },
      update: {
        country: city.country,
        imagePath: city.imagePath,
      },
      create: city,
    })

    createdCities.push({ id: saved.id, name: saved.name })
  }

  for (const plane of planes) {
    await ensurePlane(plane.producer, plane.model)
  }

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10)

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        password: hashedPassword,
        isAdmin: user.isAdmin,
      },
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        isAdmin: user.isAdmin,
      },
    })
  }

  const cityByName = new Map(createdCities.map((city) => [city.name, city.id]))

  for (const trip of trips) {
    const fromCityId = cityByName.get(trip.from)
    const toCityId = cityByName.get(trip.to)

    if (!fromCityId || !toCityId) {
      continue
    }

    await ensureTrip({
      fromCityId,
      toCityId,
      departureDate: toTime(trip.departureTime),
      returnDate: null,
      basePrice: trip.basePrice,
      availableSeats: trip.availableSeats,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
