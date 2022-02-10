import { DataTypes } from "sequelize";

import sequelize from "../../utils/db/connect.js";

import Sequelize from "sequelize";
import Product from "../products/products-model.js";
import User from "../users/users-model.js";

const Review = sequelize.define(
  "reviews",
  {
    id: {
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
    onDelete:"CASCADE"
})
// Review.belongsTo(User)
// User.hasMany(Review,{
//     onDelete:"CASCADE"
// })

export default Review;