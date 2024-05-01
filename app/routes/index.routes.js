import { Router } from 'express'
import { authRouter } from './auth.routes.js'
import { categoryRouter } from './category.routes.js'

const router = Router()

// Endpoints
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Ecommerce API' })
})

router.use(authRouter)
router.use(categoryRouter)

export { router }
