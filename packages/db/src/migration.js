import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { migrate } from "drizzle-orm/neon-http/migrator"
import dotenv from "dotenv";


dotenv.config({
  path: "../../../.env"
});


const sql = neon(process.env.DB_URL)
const db = drizzle(sql)

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "./migration/"
    })
    console.log("migration success")
  } catch (error) {
    console.log(error)
  }
}

main()

