# Architecture – Travel Booking Platform (MongoDB)

## 1. Visão Geral

Este projeto implementa uma **Plataforma de Reservas de Viagens (Travel Booking Platform)** com MongoDB.  
O sistema permite **listar destinos**, **consultar ofertas (alojamento/tours)** e **criar/gerir reservas**.  
O modelo foi pensado para suportar consultas comuns (ex.: “minhas reservas”, “destinos mais reservados”), mantendo boa performance através de **índices** e um desenho equilibrado entre **referências** e **embeddings**.

---

## 2. Coleções

### 2.1 `users`
Guarda os dados dos utilizadores (clientes).

**Campos principais**
- `_id` (ObjectId)
- `name` (string)
- `email` (string, único)
- `phone` (string, opcional)
- `status` (string: `active | blocked`)
- `preferences` (object, opcional): `currency`, `language`
- `createdAt` (date)

**Exemplo**
```js
{
  _id: ObjectId("..."),
  name: "Delcio Cunha",
  email: "delcio@example.com",
  phone: "+351900000000",
  status: "active",
  preferences: { currency: "EUR", language: "pt-PT" },
  createdAt: ISODate("2026-01-06T10:00:00Z")
}

2.2 destinations

Representa o catálogo de destinos (cidade/país + atributos de pesquisa).

Campos principais

_id (ObjectId)

name (string) – nome do destino (ex.: “Lisboa”)

country (string)

city (string)

tags (array<string>) – ex.: ["praia","cultura"]

description (string)

location (GeoJSON Point) – para pesquisa por proximidade

basePricePerNight (number)

currency (string)

isActive (bool)

{
  _id: ObjectId("..."),
  name: "Lisboa",
  country: "Portugal",
  city: "Lisboa",
  tags: ["cultura", "gastronomia", "cidade"],
  description: "Destino urbano com atrações históricas.",
  location: { type: "Point", coordinates: [-9.1393, 38.7223] },
  basePricePerNight: 85,
  currency: "EUR",
  isActive: true,
  createdAt: ISODate("2026-01-06T10:05:00Z")
}

2.3 listings

Representa as ofertas reserváveis (hotel, apartamento, tour), associadas a um destino.

Campos principais

_id (ObjectId)

destinationId (ObjectId → destinations._id)

type (string: hotel | apartment | tour)

title (string)

provider (object): name, contactEmail (opcional)

capacity (int)

amenities (array<string>)

price (object): perNight (number), currency (string)

availability (object): isAvailable (bool)

isActive (bool)

createdAt (date)


{
  _id: ObjectId("..."),
  destinationId: ObjectId("DEST_ID"),
  type: "hotel",
  title: "Hotel Central Lisboa",
  provider: { name: "Central Group", contactEmail: "contact@centralgroup.com" },
  capacity: 2,
  amenities: ["wifi", "pequeno-almoço", "ar condicionado"],
  price: { perNight: 120, currency: "EUR" },
  availability: { isAvailable: true },
  isActive: true,
  createdAt: ISODate("2026-01-06T10:10:00Z")
}



2.4 bookings

Regista as reservas (entidade transacional principal).
Aqui ficam as datas, estado, pagamento e valores finais.

Campos principais

_id (ObjectId)

userId (ObjectId → users._id)

listingId (ObjectId → listings._id)

destinationId (ObjectId → destinations._id) (redundância controlada para facilitar queries por destino)

dates (object): checkIn, checkOut (date)

guests (int)

status (string: pending | confirmed | cancelled | completed)

pricing (object): currency, subtotal, taxes, total

payment (object): method, status, paidAt (opcional)

createdAt (date)

updatedAt (date)


{
  _id: ObjectId("..."),
  userId: ObjectId("USER_ID"),
  listingId: ObjectId("LISTING_ID"),
  destinationId: ObjectId("DEST_ID"),
  dates: {
    checkIn: ISODate("2026-02-10T00:00:00Z"),
    checkOut: ISODate("2026-02-13T00:00:00Z")
  },
  guests: 2,
  status: "confirmed",
  pricing: { currency: "EUR", subtotal: 360, taxes: 30, total: 390 },
  payment: { method: "mbway", status: "paid", paidAt: ISODate("2026-01-06T10:20:00Z") },
  createdAt: ISODate("2026-01-06T10:20:00Z"),
  updatedAt: ISODate("2026-01-06T10:20:00Z")
}


2.5 reviews (opcional, recomendado)

Avaliações depois da viagem, ligadas ao utilizador e ao destino/oferta.

Campos principais

_id (ObjectId)

userId (ObjectId → users._id)

listingId (ObjectId → listings._id)

destinationId (ObjectId → destinations._id)

rating (int 1–5)

comment (string)

createdAt (date)


{
  _id: ObjectId("..."),
  userId: ObjectId("USER_ID"),
  listingId: ObjectId("LISTING_ID"),
  destinationId: ObjectId("DEST_ID"),
  rating: 5,
  comment: "Muito bom, recomendo!",
  createdAt: ISODate("2026-02-20T12:00:00Z")
}


Relações e Cardinalidades

destinations (1) → listings (N)
Um destino pode ter várias ofertas reserváveis.

users (1) → bookings (N)
Um utilizador pode fazer várias reservas.

listings (1) → bookings (N)
Uma oferta pode ser reservada várias vezes ao longo do tempo.

users (1) → reviews (N) e destinations/listings (1) → reviews (N)
Várias reviews podem existir para o mesmo destino/oferta.




4. Decisões de Modelação
Embedding vs Referencing

Referencing (principal)

bookings.userId, bookings.listingId, listings.destinationId

Motivo: evita duplicação e facilita manutenção dos dados, porque estas entidades têm relações N e podem crescer muito.

Embedding (pontual)

bookings.pricing e bookings.payment

listings.price, listings.provider, listings.availability

Motivo: são subestruturas pequenas e normalmente são lidas/escritas junto com o documento principal.

Redundância controlada

Guardar destinationId também no bookings (além de existir no listing)

Motivo: permite queries e agregações por destino de forma mais rápida, reduzindo dependência de $lookup.




5. Índices e Performance

Índices planeados para suportar as consultas principais:

users
Email único (login/identificação)
db.users.createIndex({ email: 1 }, { unique: true })

destinations
Pesquisa por país/cidade
db.destinations.createIndex({ country: 1, city: 1 })



Geoespacial (proximidade)
db.destinations.createIndex({ location: "2dsphere" })

listings
Filtrar ofertas por destino e estado
db.listings.createIndex({ destinationId: 1, isActive: 1 })

bookings
Dashboard “minhas reservas”
db.bookings.createIndex({ userId: 1, createdAt: -1 })


Gestão por oferta e datas (simplificado)
db.bookings.createIndex({ listingId: 1, "dates.checkIn": 1, "dates.checkOut": 1 })


Análises por destino
db.bookings.createIndex({ destinationId: 1, status: 1 })

reviews 
db.reviews.createIndex({ destinationId: 1, createdAt: -1 })
db.reviews.createIndex({ listingId: 1, createdAt: -1 })



6. Regras de Validação (exemplos)
Regras principais esperadas (podem ser aplicadas com JSON Schema e/ou scripts):
users.email obrigatório e único
bookings.dates.checkIn deve ser antes de bookings.dates.checkOut
bookings.status deve ser um dos valores permitidos
reviews.rating deve estar entre 1 e 5
bookings.guests deve ser >= 1


7. Workloads Suportados (consultas esperadas)

Este modelo suporta as necessidades típicas do sistema, por exemplo:
Listar destinos por país/cidade/tags
Listar ofertas (listings) por destino com filtros (capacidade, preço, tipo)
Criar reservas e atualizar o estado/pagamento
Consultar “Minhas Reservas” por utilizador, ordenadas por data
Agregações: destinos mais reservados, receita por destino, reservas por mês
Reviews por destino/listing e média de rating