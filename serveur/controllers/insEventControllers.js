import Event from "../models/eventModel.js";
import InsEvent from "../models/insEventModel.js";

export const createInsEvent = async (req, res) => {
    try {
        console.log("Body reçu :", req.body);

        const { email } = req.body;
        const { id_user, id_event } = req.params;
        console.log("PARAMS :", req.params);



        // Vérification des champs obligatoires
        if (!email ) {
            return res.status(400).json({ message: "Veuillez remplir tous les champs." });
        }

        // Vérifier si l'utilisateur est déjà inscrit à cet événement
        const exist = await InsEvent.findOne({ id_user, id_event });
        if (exist) {
            return res.status(400).json({ message: "Vous êtes déjà inscrit à cet événement." });
        }

        // Enregistrer l'inscription
        const newInsEvent = new InsEvent({
            email,
            id_user,
            id_event,
        });

        const saved = await newInsEvent.save();
        res.status(201).json(saved);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

//récupère tous les événements auxquels un utilisateur est inscrit.
export const getInsEventByUser = async (req, res) => {
    try {
        const id_user = req.params.id_user;

        const events = await InsEvent.find({ id_user });

        if (!events || events.length === 0) {
            return res.status(404).json({ message: "evenement non trouvés" });
        }

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// cet code ne passe pas 
export const getEventsWithParticipants = async (req, res) => {
    try {
        console.log("Body reçu :", req.body);
        const { id_user } = req.params;

        // Récupérer tous les événements de l'utilisateur
        const events = await Event.find({ id_user: userId });

        // Vérifier si des événements existent
        if (!events.length) return res.status(200).json([]);

        // Récupérer tous les participants pour ces événements en une seule requête
        const eventIds = events.map(event => event._id);
        const participants = await InsEvent.find({ id_event: { $in: eventIds } });

        // Associer les participants à chaque événement
        const eventsWithParticipants = events.map(event => {
            const eventParticipants = participants.filter(p => p.id_event.toString() === event._id.toString());
            return { ...event.toObject(), participants: eventParticipants };
        });

        res.status(200).json(eventsWithParticipants);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
