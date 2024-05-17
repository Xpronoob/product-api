import { Router } from 'express'
import { categoryRouter } from './category.routes.js'
import { productRouter } from './product.routes.js'

const router = Router()

// Endpoints
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Product API' })
})

router.use(categoryRouter)
router.use(productRouter)

export { router }
