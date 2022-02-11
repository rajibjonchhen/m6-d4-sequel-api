import { DataTypes } from "sequelize";
import sequelize from "../../utils/db/connect.js";
import Sequelize from "sequelize";
import Cart from "../products/cart-model.js";
import Product from "../products/products-model.js";


const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validation:{
          isEmail:true,
      }
    },
  },
  { underscored: true }
);
Cart.belongsTo(User)
Cart.belongsTo(Product)


export default User;