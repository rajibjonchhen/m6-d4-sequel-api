
import Sequelize from "sequelize";

const { POSTGRES_URI, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  dialect: "postgres",
});

export const authenticateDatabase = async () => {
    try {
      await sequelize.authenticate({ logging: false });
      await sequelize.sync({ force: true, logging: false });
      console.log("✅ Connection has been established successfully.");
    } catch (error) {
      console.log(error);
      console.error("❌ Unable to connect to the database:", error);
    }
  };
  
  export default sequelize;