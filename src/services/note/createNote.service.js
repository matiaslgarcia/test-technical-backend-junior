import errorsHelper from "../../helpers/errors.helper.js"
import db from '../../db/getPoolConnection.js'

const main = async (note, userId) => {
    try {
        const pool = await db();

        const sqlQuery = 'INSERT INTO notes (title, text, userId, categoryId) VALUES (?, ?, ?, ?)';
        const values = [note.title, note.text, userId, note.category]

        const [response] = await pool.query(sqlQuery, values);

        if (response.affectedRows !== 1) {
            errorsHelper.conflictError('Error al crear una nota', 'CREATE_NOTE_ERROR');
        }

        return response.insertId;

    } catch (error) {
        errorsHelper.internalServerError(error.message, 'CREATE_NOTE_ERROR')
    }
}

export default main