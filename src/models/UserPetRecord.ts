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
        userId: DataTypes.UUIDV4,
        petRecordId: DataTypes.UUIDV4,
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
    this.belongsTo(models.PetRecord, { foreignKey: "petRecordId" });
  }
}

export default UserPetRecord;
