import userService from '../../services/user/index.service.js'
import validateHelper from '../../helpers/validate.helper.js'
import loginSchema from '../../schema/user/login.schema.js';

const main = async (req, res, next) => {
    try {
        await validateHelper(loginSchema, req.body)

        const token = await userService.login(req.body)

        await userService.login(req.body)

        res.send(token);
    } catch (error) {
        next(error);
    }
}

export default main