import {
  getMany,
  create,
  getOne,
  update,
  destroy
} from '../services/product.service.js'

export const getProducts = (req, res) => {
  getMany(req, res)
}

export const getProduct = (req, res) => {
  getOne(req, res)
}

export const createProduct = (req, res) => {
  create(req, res)
}

export const updateProduct = (req, res) => {
  update(req, res)
}

export const deleteProduct = (req, res) => {
  destroy(req, res)
}
