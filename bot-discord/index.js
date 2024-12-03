require('dotenv').config(); // Charger les variables d'environnement
const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const handleMessage = require('./events/messageCreate'); // Importer le gestionnaire de messages

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Connexion à MongoDB
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connecté à MongoDB 🎉'))
    .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

// Bot prêt
client.once('ready', () => {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
});

// Gestionnaire des messages
client.on('messageCreate', handleMessage);

// Connexion du bot
client.login(process.env.DISCORD_TOKEN);
