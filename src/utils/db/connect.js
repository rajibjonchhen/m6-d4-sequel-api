
import Sequelize from "sequelize";

const { Database_URL, NODE_ENV} = process.env;

const isServerProduction = NODE_ENV === "production"
const sslOption = isServerProduction?   {dialectOptions: {         // IMPORTANT
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
}}:{}
const sequelize = new Sequelize(Database_URL, {
  dialect: "postgres",
  ...sslOption
});

export const authenticateDatabase = async () => {
    try {
      await sequelize.authenticate({ logging: false });
      await sequelize.sync({ alter: true, logging: false });
      console.log("✅ Connection has been established successfully.");
    } catch (error) {
      console.log(error);
      console.error("❌ Unable to connect to the database:", error);
    }
  };
  
  export default sequelize;