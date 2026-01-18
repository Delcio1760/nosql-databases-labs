// 05_deletes.js
const DB_NAME = "travel_booking";
db = db.getSiblingDB(DB_NAME);

// (Q17) Apagar listings desativados (exemplo de manutencao)
db.listings.deleteMany({ isActive: false });
