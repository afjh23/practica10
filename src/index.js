import express from 'express'
import { PORT } from './config/config.js'
import morgan from 'morgan'
import usersRoutes from './routes/users_routes.js'

const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.use(express.static('public'))

app.use('/api/users', usersRoutes)

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' })
})

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`))
