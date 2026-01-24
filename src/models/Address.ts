import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
class Address extends Model {
  declare id: string;
  declare city: string;
  declare state: string;
  declare neighborhood: string;
  declare country: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static init(sequelize: Sequelize): typeof Address {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        neighborhood: DataTypes.STRING,
        country: DataTypes.STRING,
      },
      {
        sequelize,
        timestamps: true,
      },
    );

    return this;
  }

  static associate(models: Record<string, unknown>): void {
    // @ts-ignore
    this.belongsToMany(models.User, {
      through: models.UserAddress,
      foreignKey: "addressId",
      otherKey: "userId",
      as: "Users",
    });
  }
}

export default Address;
