import Joi from 'joi'

export const Category = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  description: Joi.string().min(2).max(250).required()
  // image: '/public/images/global/user.png'
})

export const createCategory = (name, description) => {
  const category = new Category(name, description)
  return category
}

export const validateCategory = async (name, description) => {
  try {
    const { error } = Category.validate({
      name,
      description
    })

    if (error) {
      throw new Error(error.details[0].type)
    }

    return true
  } catch (error) {
    console.error('Validation error:', error.message)
    return false
  }
}
