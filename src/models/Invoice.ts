import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
class Invoice extends Model<any> {
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
        },
        billingDate: DataTypes.DATE,
        amount: DataTypes.INTEGER,
        description: DataTypes.STRING(2000),
        petRecordId: DataTypes.UUIDV4,
      },
      {
        sequelize,
        timestamps: true
      }
    );

    return this;
  }

  static associate(models: Record<string, any>): void {
    // @ts-ignore
    this.hasOne(models.PetRecord, { foreignKey: "petRecordId" });
  }
}

export default Invoice;
