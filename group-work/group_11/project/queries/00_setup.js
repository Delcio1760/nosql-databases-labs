// 00_setup.js
//seleciona DB e limpa para repetir testes.

const DB_NAME = "travel_booking";
db = db.getSiblingDB(DB_NAME);

print("DB selecionada:", DB_NAME);

// Se nao quiserem apagar, comentem estas linhas:
db.users.drop();
db.destinations.drop();
db.listings.drop();
db.bookings.drop();
db.reviews.drop();

print("Colecoes limpas (se existiam).");

