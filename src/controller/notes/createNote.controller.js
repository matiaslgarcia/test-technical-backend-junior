import noteService from '../../services/note/index.service.js'
import validateHelper from '../../helpers/validate.helper.js'
import schema from '../../schema/note/create.schema.js'

const main = async (req, res, next) => {
    try {
        await validateHelper(schema, req.body)

        const newNote = await noteService.createNote(req.body, req.user.id)

        res.send({
            message: 'Nota creada exitosamente',
            data: newNote
        });
    } catch (error) {
        next(error);
    }
}

export default main