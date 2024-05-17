import errorsHelper from "../../helpers/errors.helper.js"
import db from '../../db/getPoolConnection.js'

const main = async (userId) => {
    try {
        const pool = await db();

        const sqlQuery = 'SELECT n.title FROM notes as n WHERE userId = ?';
        const values = [userId]

        const [notes] = await pool.query(sqlQuery, values);

        return notes

    } catch (error) {
        errorsHelper.internalServerError(error.message, 'CREATE_USER_ERROR')
    }
}

export default main