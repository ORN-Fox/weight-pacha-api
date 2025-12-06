import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
class Address extends Model<any> {
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
        },
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        neighborhood: DataTypes.STRING,
        country: DataTypes.STRING,
      },
      {
        sequelize,
        timestamps: true,
        freezeTableName: false,
        tableName: "Addresses",
      }
    );

    return this;
  }

  static associate(models: Record<string, any>): void {
    // @ts-ignore
    this.belongsToMany(models.User, {
      through: "UserAddress",
      foreignKey: "addressId",
    });
  }
}

export default Address;
