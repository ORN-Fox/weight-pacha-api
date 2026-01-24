import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
class Wormable extends Model {
  declare id: string;
  declare name: string;
  declare injectionDate: Date;
  declare reminderDate: Date;
  declare description: string;
  declare petRecordId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static init(sequelize: Sequelize): typeof Wormable {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
        injectionDate: DataTypes.DATE,
        reminderDate: DataTypes.DATE,
        description: DataTypes.STRING(2000),
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

export default Wormable;
