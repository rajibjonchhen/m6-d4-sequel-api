import { DataTypes } from "sequelize";

import sequelize from "../utils/db/connect.js";

import Sequelize from "sequelize";

const Product = sequelize.define(
  "products",
  {
    product_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    product_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_Url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://i.pravatar.cc/300",
      validate: {
        isURL: true,
      },
    },
  },
  { underscored: true }
);

export default Product;