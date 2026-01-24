import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
class Invoice extends Model {
  declare id: string;
  declare billingDate: Date;
  declare amount: number;
  declare description: string;
  declare petRecordId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static init(sequelize: Sequelize): typeof Invoice {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        billingDate: DataTypes.DATE,
        amount: DataTypes.FLOAT,
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

export default Invoice;
