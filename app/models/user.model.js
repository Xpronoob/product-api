import Joi from 'joi'

export const User = Joi.object({
  email: Joi.string()
    .min(7)
    .max(40)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  password: Joi.string().min(6).max(40).required(),
  // repeat_password: Joi.ref('password'),
  name: Joi.string().min(2).max(30),
  lastName: Joi.string().min(3).max(30)
  // image: '/public/images/global/user.png'
})

export const createUser = (email, password) => {
  const user = new User(email, password)
  return user
}

export const validateAccount = (email, password) => {
  try {
    const { error } = User.validate({
      email,
      password
    })

    // console.log(error.details[0].type)
    if (error) {
      throw new Error(error.details[0].type)
    } else {
      // console.log('valid pass')
    }
    return true
  } catch (error) {
    console.error('Validation error:', error.message)
    return false
  }
}
