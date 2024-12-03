const mongoose = require('mongoose');

const maisonSchema = new mongoose.Schema({
    nom: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 }  // Points globaux de la maison
});

const Maison = mongoose.model('Maison', maisonSchema);
module.exports = Maison;
