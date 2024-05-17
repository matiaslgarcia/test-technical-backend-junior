import bcrypt from 'bcrypt';

import userService from '../../services/user/index.service.js'
import validateHelper from '../../helpers/validate.helper.js'
import createSchema from '../../schema/user/create.schema.js';

const main = async (req, res, next) => {
    try {
        await validateHelper(createSchema, req.body)

        req.body.password = await bcrypt.hash(req.body.password, 10);

        await userService.create(req.body)

        res.send('Usuario creado con exito');
    } catch (error) {
        next(error);
    }
}

export default main