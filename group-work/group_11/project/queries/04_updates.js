// 04_updates.js
const DB_NAME = "travel_booking";
db = db.getSiblingDB(DB_NAME);

function d(s) { return ISODate(s); }

const uDelcio = db.users.findOne({ email: "delcio@example.com" })._id;
const uMarcio = db.users.findOne({ email: "marcio@example.com" })._id;

const destLisboa = db.destinations.findOne({ name: "Lisboa" })._id;
const destPorto  = db.destinations.findOne({ name: "Porto" })._id;

const lisbonHotel = db.listings.findOne({ title: "Hotel Central Lisboa" })._id;
const portoApt = db.listings.findOne({ title: "Apartamento na Ribeira" })._id;

// (Q13) Criar 1 booking (write) — para termos dados transacionais
db.bookings.insertOne({
  userId: uDelcio,
  listingId: lisbonHotel,
  destinationId: destLisboa,
  dates: { checkIn: d("2026-02-10T00:00:00Z"), checkOut: d("2026-02-13T00:00:00Z") },
  guests: 2,
  status: "pending",
  pricing: { currency: "EUR", subtotal: 360, taxes: 30, total: 390 },
  payment: { method: "mbway", status: "unpaid" },
  createdAt: new Date(),
  updatedAt: new Date()
});

// (Q14) Confirmar booking pendente do Delcio
db.bookings.updateMany(
  { userId: uDelcio, status: "pending" },
  { $set: { status: "confirmed", updatedAt: new Date() } }
);

// (Q15) Marcar pagamento como paid (no booking confirmado do Delcio)
db.bookings.updateOne(
  { userId: uDelcio, status: "confirmed" },
  { $set: { "payment.status": "paid", "payment.paidAt": new Date(), updatedAt: new Date() } }
);

// (Q16) Desativar um listing (ex.: apartamento do Porto indisponível)
db.listings.updateOne(
  { _id: portoApt },
  { $set: { isActive: false, "availability.isAvailable": false } }
);
