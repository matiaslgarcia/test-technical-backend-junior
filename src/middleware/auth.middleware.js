import jwt from 'jsonwebtoken'
import errorHelper from '../helpers/errors.helper.js'

const main = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            errorHelper.notAuthorizedError('Token requerido');
        }

        let tokenInfo;

        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET_KEY)
            req.user = tokenInfo;
            next();
        } catch (error) {
            errorHelper.notAuthorizedError('Token invalido')
        }
    } catch (error) {
        next(error);
    }
}

export default main;