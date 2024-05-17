import errorsHelper from "../../helpers/errors.helper.js"
import db from '../../db/getPoolConnection.js'

const main = async (note, userId) => {
    try {
        const pool = await db();

        const [notes] = await pool.query('SELECT * FROM notes as n WHERE n.id = ?', [note.id]);


        if (notes.length !== 1) {
            errorsHelper.notFoundError('Nota no encontrada', 'NOT_NOT_FOUND')
        }

        if (notes[0].userId !== userId) {
            errorsHelper.notAuthorizedError('Usuario no autorizado para editar esta nota')
        }

        const sqlQuery = 'UPDATE notes SET title = ?, text = ?, categoryId = ? WHERE id = ?';
        const values = [note.title, note.text, note.category, note.id]


        const [response] = await pool.query(sqlQuery, values);

        if (response.affectedRows !== 1) {
            errorsHelper.conflictError('Error al actualizar la nota', 'UPDATE_NOTE_ERROR');
        }

        return response.insertId;

    } catch (error) {
        errorsHelper.internalServerError(error.message, 'UPDATE_NOTE_ERROR')
    }
}

export default main