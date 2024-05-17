import { PrismaClient } from '@prisma/client'
import { validateProduct } from '../models/product.model.js'

const prisma = new PrismaClient()

export const getMany = async (req, res) => {
  try {
    const result = await prisma.product.findMany()
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getOne = async (req, res) => {
  const productId = parseInt(req.params.id)

  if (isNaN(productId)) {
    return res.status(400).json({ error: 'Invalid product ID' })
  }

  try {
    const result = await prisma.product.findFirst({
      where: {
        id: productId
      }
    })

    if (!result) {
      return res.status(404).json({ message: 'Product not found' })
    }
    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const create = async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body

  try {
    const validate = await validateProduct({
      name,
      description,
      price,
      stock,
      categoryId
    })
    if (!validate) {
      return res.status(400).json({ message: 'Invalid product data' })
    }

    const result = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        categoryId
      }
    })

    res.status(201).json(result)
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
      return res.status(400).json({ error: 'Product name already exists' })
    } else {
      console.error('Error creating product:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export const update = async (req, res) => {
  const productId = parseInt(req.params.id)
  const { name, description, price, stock, categoryId } = req.body

  try {
    // Verificar si el producto existe
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId
      }
    })

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Verificar si el nuevo nombre del producto ya existe
    const productExists = await prisma.product.findFirst({
      where: {
        name: name,
        NOT: {
          id: productId
        }
      }
    })

    if (productExists) {
      return res.status(400).json({ error: 'Product name already exists' })
    }

    // Actualizar el producto
    const result = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        name,
        description,
        price,
        stock,
        categoryId
      }
    })

    res.status(200).json(result)
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const destroy = async (req, res) => {
  const productId = parseInt(req.params.id)

  try {
    // Verificar si el producto existe
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId
      }
    })

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Eliminar el producto
    await prisma.product.delete({
      where: {
        id: productId
      }
    })

    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
