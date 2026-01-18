// 03_finds.js
const DB_NAME = "travel_booking";
db = db.getSiblingDB(DB_NAME);

// (Q07) Listar destinos ativos em Portugal
db.destinations.find(
  { country: "Portugal", isActive: true },
  { name: 1, city: 1, tags: 1 }
);

// (Q08) Procurar destinos por tag
db.destinations.find(
  { tags: "cultura", isActive: true },
  { name: 1, country: 1, city: 1, tags: 1 }
);

// (Q09) Listar listings de Lisboa (ordenado por preco)
const destLisboa = db.destinations.findOne({ name: "Lisboa" })._id;
db.listings.find(
  { destinationId: destLisboa, isActive: true },
  { title: 1, type: 1, capacity: 1, "price.perNight": 1 }
).sort({ "price.perNight": 1 });

// (Q10) Listar listings com capacidade >= 3
db.listings.find(
  { capacity: { $gte: 3 }, isActive: true },
  { title: 1, capacity: 1, destinationId: 1 }
);

// (Q11) Procurar user pelo email (login)
db.users.findOne(
  { email: "delcio@example.com" },
  { name: 1, email: 1, status: 1 }
);

// (Q12) Explain de pesquisa por destino (para mostrar indice)
db.listings.find({ destinationId: destLisboa, isActive: true }).explain("executionStats");
