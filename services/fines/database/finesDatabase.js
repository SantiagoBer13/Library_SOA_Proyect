import {createPool} from "mysql2/promise"
import dbConfig from "../config/dbConfig.js"

export const pool = createPool(dbConfig)