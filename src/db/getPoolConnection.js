import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB, MYSQL_PORT } = process.env

let pool

const main = async () => {
    try {
        if (!pool) {
            const poolTemplate = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                port: MYSQL_PORT,
            })

            await poolTemplate.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`)

            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                port: MYSQL_PORT,
                connectionLimit: 10,
                timezone: 'Z'
            })
        }

        return pool
    } catch (error) {
        console.log(error)
    }
}

export default main;