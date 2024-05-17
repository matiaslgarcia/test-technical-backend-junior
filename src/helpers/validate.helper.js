import errorsHelper from "./errors.helper.js";

const main = async (schema, data) => {
    try {
        await schema.validateAsync(data);
    } catch (error) {
        errorsHelper.badRequestError(error.details[0]?.message)
    }
}

export default main