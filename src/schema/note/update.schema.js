import joi from "joi";

const createSchema = joi.object({
    title: joi.string().required(),
    text: joi.string().required(),
    category: joi.number().required(),
    id: joi.number().required()
})

export default createSchema