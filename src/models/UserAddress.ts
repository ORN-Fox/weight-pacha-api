import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
class UserAddress extends Model<any> {
  declare userId: string;
  declare addressId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static init(sequelize: Sequelize): typeof UserAddress {
    super.init(
      {
        userId: DataTypes.UUIDV4,
        addressId: DataTypes.UUIDV4,
      },
      {
        sequelize,
        timestamps: true,
        freezeTableName: true
      }
    );

    return this;
  }

  static associate(models: Record<string, any>): void {
    // @ts-ignore
    this.belongsTo(models.User, { foreignKey: "userId" });
    // @ts-ignore
    this.belongsTo(models.Address, { foreignKey: "addressId" });
  }
}

export default UserAddress;
