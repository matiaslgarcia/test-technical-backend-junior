import errorsHelper from "../../helpers/errors.helper.js"
import db from '../../db/getPoolConnection.js'

const main = async (noteId) => {
    try {
        const pool = await db();

        const sqlQuery = 'SELECT * FROM notes as n WHERE id = ?';
        const values = [noteId]

        const [notes] = await pool.query(sqlQuery, values);

        if (notes.length !== 1) {
            errorsHelper.notFoundError('Nota no existente/encontrada', 'NOTE_NOT_FOUND')
        }

        return notes[0];

    } catch (error) {
        errorsHelper.internalServerError(error.message, 'CREATE_USER_ERROR')
    }
}

export default main