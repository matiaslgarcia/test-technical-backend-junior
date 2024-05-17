import noteService from '../../services/note/index.service.js'
import validateHelper from '../../helpers/validate.helper.js'
import schema from '../../schema/note/update.schema.js'

const main = async (req, res, next) => {
    try {
        const { noteId } = req.params;

        const note = { ...req.body, id: noteId };

        await validateHelper(schema, note)

        const updateNote = await noteService.updateNote(note, req.user.id)

        res.send({
            message: 'Nota actualizada correctamente',
            data: updateNote
        });
    } catch (error) {
        next(error);
    }
}

export default main