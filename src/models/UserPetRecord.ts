import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
class UserPetRecord extends Model<any> {
  declare userId: string;
  declare petRecordId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static init(sequelize: Sequelize): typeof UserPetRecord {
    super.init(
      {
        userId: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
        },
        petRecordId: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
        },
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
    this.belongsTo(models.User, { foreignKey: "userId", as: "User" });
    // @ts-ignore
    this.belongsTo(models.PetRecord, { foreignKey: "petRecordId", as: "PetRecord" });
  }
}

export default UserPetRecord;
