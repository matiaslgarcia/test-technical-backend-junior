import getDb from './getPoolConnection.js'


const main = async () => {
    const pool = await getDb();

    console.log('Borrando tablas');
    await pool.query('DROP TABLE IF EXISTS categories, notes, users');



    console.log('Creando tablas');
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(250) UNIQUE NOT NULL,
            password VARCHAR(250) UNIQUE NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updateAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
    `)

    await pool.query(`
        CREATE TABLE IF NOT EXISTS categories (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) UNIQUE NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updateAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
    `)

    await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(250) UNIQUE NOT NULL,
        text TEXT NOT NULL,
        userId INT UNSIGNED NOT NULL,
        categoryId INT UNSIGNED NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updateAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (categoryId) REFERENCES categories(id)

    )
    `)
    console.log('Tablas creadas')
}

main();