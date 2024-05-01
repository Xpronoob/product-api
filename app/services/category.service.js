import { PrismaClient } from '@prisma/client'
import { validateCategory } from '../models/category.model.js'

const prisma = new PrismaClient()

export const getMany = async (req, res) => {
  try {
    const result = await prisma.category.findMany()
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getOne = async (req, res) => {
  const categoryId = parseInt(req.params.id)

  if (isNaN(categoryId)) {
    return res.status(400).json({ error: 'Invalid category ID' })
  }

  try {
    const result = await prisma.category.findFirst({
      where: {
        id: categoryId
      }
    })

    if (!result) {
      return res.status(404).json({ message: 'Category not found' })
    }
    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const create = async (req, res) => {
  const { name, description } = req.body

  try {
    const validate = await validateCategory(name, description)
    if (!validate) {
      return res.status(400).json({ message: 'Invalid category data' })
    }

    const result = await prisma.category.create({
      data: {
        name,
        description
      }
    })

    res.status(200).json(result)
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
      return res.status(400).json({ error: 'Category name already exists' })
    } else {
      console.error('Error creating category:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export const update = async (req, res) => {
  const categoryId = parseInt(req.params.id)
  const { name, description } = req.body

  try {
    // Verificar si la categoría existe
    const existingCategory = await prisma.category.findUnique({
      where: {
        id: categoryId
      }
    })

    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' })
    }

    // Verificar si el nuevo nombre de la categoría ya existe
    const categoryExists = await prisma.category.findFirst({
      where: {
        name: name,
        NOT: {
          id: categoryId
        }
      }
    })

    if (categoryExists) {
      return res.status(400).json({ error: 'Category name already exists' })
    }

    // Actualizar la categoría
    const result = await prisma.category.update({
      where: {
        id: categoryId
      },
      data: {
        name,
        description
      }
    })

    res.status(200).json(result)
  } catch (error) {
    console.error('Error updating category:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const destroy = async (req, res) => {
  const categoryId = parseInt(req.params.id)

  try {
    // Verificar si la categoría existe
    const existingCategory = await prisma.category.findUnique({
      where: {
        id: categoryId
      }
    })

    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' })
    }

    // Eliminar la categoría
    await prisma.category.delete({
      where: {
        id: categoryId
      }
    })

    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
