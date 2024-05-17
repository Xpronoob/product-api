import { Router } from 'express'
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js'

export const productRouter = Router()

productRouter.get('/products', getProducts)
productRouter.get('/products/:id', getProduct)
productRouter.post('/products', createProduct)
productRouter.put('/products/:id', updateProduct)
productRouter.delete('/products/:id', deleteProduct)
