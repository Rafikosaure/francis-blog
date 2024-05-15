import { Review, Article } from '../models/index.js'; // Importe les modèles Review et Article pour interagir avec la base de données

const create = async (req, res) => {
    try {
        // Récupération de l'article afin de pouvoir créer un avis directement depuis l'article
        const article = await Article.findByPk(req.params.articleId)

        // On crée l'avis depuis l'article récupéré afin de faire la relation
        await 
        
        // Envoie une réponse avec le statut 201 (créé) et un message de réussite
        res.status(201).json("Review add !")
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le statut 500 (erreur interne du serveur) et le message d'erreur
        res.status(500).json({ error: "Erreur lors de la création de l'avis!" })
    }
}

export {
    create
}