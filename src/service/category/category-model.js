import { DataTypes } from "sequelize";

import sequelize from "../../utils/db/connect.js";

import Sequelize from "sequelize";

const Product = sequelize.define(
  "category",
  {  
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    category:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);

export default Product;