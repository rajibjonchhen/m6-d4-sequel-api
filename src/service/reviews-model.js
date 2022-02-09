import { DataTypes, HasOne } from "sequelize";

import sequelize from "../utils/db/connect.js";

import Sequelize from "sequelize";
import Product from "./products-model.js";

const Review = sequelize.define(
  "reviews",
  {
    review_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { underscored: true }
);
Review.belongsTo(Product)
Product.hasMany(Review,{
    onDelete:"CASCADe"
})

export default Review;