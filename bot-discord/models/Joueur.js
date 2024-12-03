const mongoose = require('mongoose');

const joueurSchema = new mongoose.Schema({
    tupperName: { type: String, required: true, unique: true },
    maison: { type: String, enum: ['Gryffondor', 'Serpentard', 'Poufsouffle', 'Serdaigle'], required: false },
    points: { type: Number, default: 0 },
    sorts: { type: [String], default: [] },
});

module.exports = mongoose.model('Joueur', joueurSchema);
