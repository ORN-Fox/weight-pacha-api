import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
class Measure extends Model {
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
        weight: DataTypes.FLOAT,
        petRecordId: DataTypes.UUIDV4,
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
    this.hasOne(models.PetRecord, { foreignKey: "id", as: "PetRecord" });
  }
}

export default Measure;
