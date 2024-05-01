import {
  getMany,
  create,
  getOne,
  update,
  destroy
} from '../services/category.service.js'

export const getCategories = (req, res) => {
  getMany(req, res)
}

export const getCategory = (req, res) => {
  getOne(req, res)
}

export const createCategory = (req, res) => {
  create(req, res)
}

export const updateCategory = (req, res) => {
  update(req, res)
}

export const deleteCategory = (req, res) => {
  destroy(req, res)
}
