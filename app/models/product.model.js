import Joi from 'joi'

export const ProductSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().min(2).max(255).required(),
  price: Joi.number().precision(2).positive().required(),
  stock: Joi.number().integer().min(0).required(),
  categoryId: Joi.number().integer().positive().required()
})

export const createProduct = ({
  name,
  description,
  price,
  stock,
  categoryId
}) => {
  const product = {
    name,
    description,
    price,
    stock,
    categoryId
  }
  return product
}

export const validateProduct = async ({
  name,
  description,
  price,
  stock,
  categoryId
}) => {
  try {
    const { error } = ProductSchema.validate({
      name,
      description,
      price,
      stock,
      categoryId
    })

    if (error) {
      throw new Error(error.details[0].message)
    }

    return true
  } catch (error) {
    console.error('Validation error:', error.message)
    return false
  }
}
