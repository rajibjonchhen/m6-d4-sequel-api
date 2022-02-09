import pool from './connect.js'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

const dirnameSQLFilePath = dirname(fileURLToPath(import.meta.url))
const sqlFilePath = join(dirnameSQLFilePath, 'tables.sql')

const createTables = async (sqlQueryString) => {
    try {
        const sqlQueryAsString = await fs.readFile(sqlFilePath,"utf-8")
        await pool.query(sqlQueryAsString)
        console.log("tables are created")
        await pool.end()
    } catch (error) {
        console.log("tables cannot be created", error)
    }
}

createTables()