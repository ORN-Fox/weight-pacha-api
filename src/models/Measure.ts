import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
class Measure extends Model<any> {
  declare id: string;
  declare date: Date;
  declare weight: number;
  declare petRecordId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static init(sequelize: Sequelize): typeof Measure {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
        },
        date: DataTypes.DATE,
        weight: DataTypes.INTEGER,
        petRecordId: DataTypes.UUIDV4,
      },
      {
        sequelize,
        timestamps: true,
        freezeTableName: false,
        tableName: "Measures",
      }
    );

    return this;
  }

  static associate(models: Record<string, any>): void {
    // @ts-ignore
    this.hasOne(models.PetRecord, { foreignKey: "petRecordId" });
  }
}

export default Measure;
