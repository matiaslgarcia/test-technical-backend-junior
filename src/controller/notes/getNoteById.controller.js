import noteService from '../../services/note/index.service.js'
import validateHelper from '../../helpers/validate.helper.js'
import schema from '../../schema/note/getOneById.schema.js'
import errorsHelper from '../../helpers/errors.helper.js'

const main = async (req, res, next) => {
    try {
        const { noteId } = req.params

        await validateHelper(schema, req.params)

        const notes = await noteService.getOneById(noteId)

        if (notes.userId !== req.user.id) {
            errorsHelper.notAuthorizedError('Usuario no autorizado para realizar esta accion', 'USER_NOT_AUTHORIZED')
        }

        res.send({
            message: 'Listado de notas propias',
            data: notes
        });
    } catch (error) {
        next(error);
    }
}

export default main