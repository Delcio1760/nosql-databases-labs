// 02_inserts.js
const DB_NAME = "travel_booking";
db = db.getSiblingDB(DB_NAME);

function d(s) { return ISODate(s); }

// (Q04) Inserir users
db.users.insertMany([
  { name: "Delcio Cunha", email: "delcio@example.com", status: "active", createdAt: d("2026-01-06T10:00:00Z") },
  { name: "Marcio Tavares", email: "marcio@example.com", status: "active", createdAt: d("2026-01-06T10:01:00Z") },
  { name: "Thiago Luz", email: "thiago@example.com", status: "active", createdAt: d("2026-01-06T10:02:00Z") }
]);

// (Q05) Inserir destinations
db.destinations.insertMany([
  {
    name: "Lisboa", country: "Portugal", city: "Lisboa",
    tags: ["cultura", "gastronomia"],
    location: { type: "Point", coordinates: [-9.1393, 38.7223] },
    basePricePerNight: 85, currency: "EUR", isActive: true, createdAt: d("2026-01-06T10:05:00Z")
  },
  {
    name: "Porto", country: "Portugal", city: "Porto",
    tags: ["vinho", "cultura"],
    location: { type: "Point", coordinates: [-8.6291, 41.1579] },
    basePricePerNight: 75, currency: "EUR", isActive: true, createdAt: d("2026-01-06T10:06:00Z")
  },
  {
    name: "Madrid", country: "Espanha", city: "Madrid",
    tags: ["noite", "cultura"],
    location: { type: "Point", coordinates: [-3.7038, 40.4168] },
    basePricePerNight: 95, currency: "EUR", isActive: true, createdAt: d("2026-01-06T10:07:00Z")
  }
]);

const destLisboa = db.destinations.findOne({ name: "Lisboa" })._id;
const destPorto  = db.destinations.findOne({ name: "Porto" })._id;

const uDelcio = db.users.findOne({ email: "delcio@example.com" })._id;
const uMarcio = db.users.findOne({ email: "marcio@example.com" })._id;

// (Q06) Inserir listings(ofertas)
db.listings.insertMany([
  {
    destinationId: destLisboa, type: "hotel", title: "Hotel Central Lisboa",
    provider: { name: "Central Group" },
    capacity: 2,
    amenities: ["wifi", "pequeno-almoço"],
    price: { perNight: 120, currency: "EUR" },
    availability: { isAvailable: true },
    isActive: true, createdAt: d("2026-01-06T10:10:00Z")
  },
  {
    destinationId: destPorto, type: "apartment", title: "Apartamento na Ribeira",
    provider: { name: "Porto Stay" },
    capacity: 3,
    amenities: ["wifi", "cozinha"],
    price: { perNight: 90, currency: "EUR" },
    availability: { isAvailable: true },
    isActive: true, createdAt: d("2026-01-06T10:12:00Z")
  }
]);

const lisbonHotel = db.listings.findOne({ title: "Hotel Central Lisboa" })._id;
const portoApt = db.listings.findOne({ title: "Apartamento na Ribeira" })._id;


print("Users, destinations e listings inseridos.");
