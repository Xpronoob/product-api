import { Router } from 'express'
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller.js'

export const categoryRouter = Router()

categoryRouter.get('/categories', getCategories)
categoryRouter.get('/categories/:id', getCategory)
categoryRouter.post('/categories', createCategory)
categoryRouter.put('/categories/:id', updateCategory)
categoryRouter.delete('/categories/:id', deleteCategory)
