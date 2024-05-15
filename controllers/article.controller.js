import { Article, User } from "../models/index.js"

export const add = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id)
        // On crée un nouvel article avec les informations reçues dans le corps de la requête
        // const article = await Article.create(req.body)
        const article = await user.createArticle(req.body)
        // On renvoie le nouvel article avec un statut 201
        res.status(201).json(article)
    } catch (err) {
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: "Error lors de la création ! 😭" })
    }
}

export const getAll = async (req, res) => {
    try {
        // On récupère tous les articles
        const articles = await Article.findAll()
        // On renvoie les articles avec un statut 200
        res.status(200).json(articles)
    } catch (err) {
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}

export const getById = async (req, res) => {
    try {
        const id = req.params.id;
        // On récupère l'article par son id
        const article = await Article.findByPk(id)
        // On renvoie l'article avec un statut 200
        res.status(200).json(article)
    } catch (err) {
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}

export const updateById = async (req, res) => {
    try {
        // On récupère l'article par son id
        const article = await Article.findByPk(req.params.id)
        // On vérifie que l'utilisateur qui fait la requête est bien l'utilisateur qui a créé l'article
        if (article.UserId === req.user.id) {
            // On met à jour l'article avec les nouvelles informations reçues dans le corps de la requête
            await article.update(req.body)

            // Pour l'update quand on n'a pas encore l'article :
            // await Article.update(req.body, {
            //     where: {
            //         id: req.params.id
            //     }
            // })
            // On renvoie l'article mis à jour avec un statut 200
            return res.status(200).json(article)
        } else {
            // Si l'utilisateur qui fait la requête n'est pas l'utilisateur qui a créé l'article, on renvoie un statut 403
            return res.status(403).json({ error: "Seul le créateur peut modifier !" })
        }
    } catch (err) {
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}

export const deleteById = async (req, res) => {
    try {
        // On récupère l'article par son id
        const article = await Article.findByPk(req.params.id)
        // On vérifie que l'utilisateur qui fait la requête est bien l'utilisateur qui a créé l'article
        if (article.UserId === req.user.id) {
            // On supprime l'article
            await article.destroy()
            // On renvoie un message de confirmation avec un statut 200
            res.status(200).json("Article deleted ! ")
        } else {
            // Si l'utilisateur qui fait la requête n'est pas l'utilisateur qui a créé l'article, on renvoie un statut 403
            return res.status(403).json({ error: "Seul le créateur peut supprimer !" })
        }
    } catch (err) {
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}

export const getByAsc = async (req, res) => {
    try {
        // On récupère tous les articles triés par prix croissant
        const articles = await Article.findAll({ order: [
            ['price', 'ASC']
        ]})
        // On renvoie les articles avec un statut 200
        res.status(200).json(articles)
    } catch (err) {
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: "Erreur lors du tri des articles par price" })
    }
}

export const getByDesc = async (req, res) => {
    try {
        // On récupère tous les articles triés par prix décroissant
        // const articles = await Article.find().sort('-price')
        const articles = await Article.findAll({ order: [
            ['price', 'DESC']
        ]})
        // On renvoie les articles avec un statut 200
        res.status(200).json(articles)
    } catch (err) {
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: "Erreur lors du tri des articles par price" })
    }
}

export const getByUser = async (req, res) => {
    try {
        // On récupère tous les articles de l'utilisateur qui fait la requête
        // const articles = await Article.findAll({ where: { UserId: req.user.id } })
        const user = await User.findByPk(req.user.id, { include: "articles" })
        // On renvoie les articles avec un statut 200
        res.status(200).json(user.articles)
    } catch (err) {
        console.log(err)
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json({ error: "Erreur." })
    }
}

export const getReview = async (req, res) => {
    try {
        // On récupère tous les avis de l'article par son id
        // "populate" est utilisé pour créer une sorte de jointure entre les collections de données MongoDB
        const article = await Article.findByPk(req.params.id, {
            include: 'review'
        })
        // On renvoie les review avec un statut 200
        res.status(200).json(article.review)
    } catch (error) {
        // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
        res.status(500).json(error.message)
    }
}
