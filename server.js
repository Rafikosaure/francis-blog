import express from 'express'
import { env } from './config.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Connexion MySQL
import './models/index.js'

// ROUTES
import routerMongoUser from './routes/user.js'
import routerArticle from './routes/article.js'

const app = express()

// PORT
const PORT = env.port || 8080

// MIDDLEWARE
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// MIDDLEWARE TO ROUTE
app.use("/api/mongo/user", routerMongoUser)
app.use("/api/article", routerArticle)

// LISTEN
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
})