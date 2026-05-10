const joi = require("joi");


const registerValidation = joi.object({

    name:joi.string().min(3).max(10).required().messages({
        "string.empty":"Name is required",
        "string.min":"Name must be at least 3 characters"
    }),
    email:joi.string().email().required().messages({
        "string.email":"Invalid email"
    }),
    password:joi.string().min(3).required().messages({
        "string.min":"Password must at least 3 characters"
    })
});

const loginValidation = joi.object({
    email:joi.string().email().required().messages({
        "string.email":"Invalid email",
        "string.empty":"Email is required"
    }),
    password:joi.string().required().messages({
        "string.empty":"Password is required",
        "any.required":"Password is required"
    })
})







module.exports = { registerValidation , loginValidation };