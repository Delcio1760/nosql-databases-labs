// 01_indexes.js
const DB_NAME = "travel_booking";
db = db.getSiblingDB(DB_NAME);

print("A criar indices...");

// (Q01) users: email unico
db.users.createIndex({ email: 1 }, { unique: true });

// (Q02) destinations: country + city (pesquisa)
db.destinations.createIndex({ country: 1, city: 1 });

// (Q03) listings: filtrar por destino e ativo
db.listings.createIndex({ destinationId: 1, isActive: 1 });

print("Indices criados.");

