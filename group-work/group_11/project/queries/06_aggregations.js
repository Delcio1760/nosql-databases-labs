// 06_aggregations.js
const DB_NAME = "travel_booking";
db = db.getSiblingDB(DB_NAME);

// (Q18) Top destinos por numero de reservas
db.bookings.aggregate([
  { $group: { _id: "$destinationId", totalBookings: { $sum: 1 } } },
  { $sort: { totalBookings: -1 } }
]);

// (Q19) Receita por destino (somar total de reservas pagas)
db.bookings.aggregate([
  { $match: { "payment.status": "paid" } },
  { $group: { _id: "$destinationId", revenue: { $sum: "$pricing.total" }, paidBookings: { $sum: 1 } } },
  { $sort: { revenue: -1 } }
]);

// (Q20) Reservas por estado (KPIs)
db.bookings.aggregate([
  { $group: { _id: "$status", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]);
