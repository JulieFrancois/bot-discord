const Joueur = require('../models/Joueur'); // Modèle joueur

let nomTupper = ''; // Variable globale pour stocker le nom du Tupper

module.exports = async (message) => {
    // Détection des messages émis par un webhook (Tupperbot)
    if (message.webhookId) {
        console.log("Message émis par un webhook détecté.");
        nomTupper = message.author.username; // Récupère le nom du Tupper
        console.log("Nom du Tupper détecté :", nomTupper);

        // Affiche le contenu du message pour vérifier le format
        console.log("Contenu du message :", message.content);

        // Vérifie si le message contient une commande valide (avec ou sans ':')
        if (message.content.startsWith('!')) {
            const commande = message.content.trim(); // On suppose que le message est une commande complète
            console.log("Commande détectée :", commande);

            // Commande pour attribuer une maison aléatoire
            if (commande === '!maison') {
                console.log('Attribution d\'une maison...');
                const maisons = ['Gryffondor', 'Serpentard', 'Poufsouffle', 'Serdaigle'];
                const maison = maisons[Math.floor(Math.random() * maisons.length)];
                console.log('Maison attribuée :', maison);

                try {
                    let joueur = await Joueur.findOne({ tupperName: nomTupper });
                    if (!joueur) {
                        joueur = new Joueur({ tupperName: nomTupper, maison });
                        await joueur.save();
                        message.channel.send(`Bienvenue à ${maison}, ${nomTupper} !`);
                    } else {
                        message.channel.send(`${nomTupper} est déjà dans ${joueur.maison} !`);
                    }
                } catch (err) {
                    console.error("Erreur MongoDB :", err);
                    message.channel.send("Une erreur s'est produite. 🧙‍♂️");
                }
            }

            // Commande pour retirer une maison
            if (commande === '!enleverMaison') {
                console.log('Commande !enleverMaison reçue. Suppression de la maison...');

                try {
                    const joueur = await Joueur.findOne({ tupperName: nomTupper });
                    if (joueur) {
                        joueur.maison = null;
                        await joueur.save();
                        message.channel.send(`${nomTupper} n'a plus de maison.`);
                    } else {
                        message.channel.send(`${nomTupper} n'est pas encore enregistré.`);
                    }
                } catch (err) {
                    console.error("Erreur MongoDB :", err);
                    message.channel.send("Erreur lors de la suppression de la maison.");
                }
            }

            // Commande pour attribuer une maison spécifique
            if (commande.startsWith('!attribuerMaison')) {
                console.log('Commande !attribuerMaison reçue. Attribution manuelle de la maison...');
                const args = commande.split(' ').slice(1); // Récupère le mot après la commande
                const maison = args[0];
                const maisonsValides = ['Gryffondor', 'Serpentard', 'Poufsouffle', 'Serdaigle'];

                if (!maisonsValides.includes(maison)) {
                    message.channel.send("Maison invalide. Choisissez parmi : Gryffondor, Serpentard, Poufsouffle, Serdaigle.");
                    return;
                }

                try {
                    let joueur = await Joueur.findOne({ tupperName: nomTupper });
                    if (!joueur) {
                        joueur = new Joueur({ tupperName: nomTupper, maison });
                        await joueur.save();
                        message.channel.send(`${nomTupper} a été assigné à ${maison}.`);
                    } else {
                        joueur.maison = maison;
                        await joueur.save();
                        message.channel.send(`${nomTupper} a été assigné à ${maison}.`);
                    }
                } catch (err) {
                    console.error("Erreur MongoDB :", err);
                    message.channel.send("Erreur lors de l'attribution de la maison.");
                }
            }
        } else {
            console.log("Aucune commande valide détectée.");
        }
    } else {
        console.log("Message non émis par un webhook. Ignoré.");
    }
};
