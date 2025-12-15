import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
class CalendarEvent extends Model<any> {
  declare id: string;
  declare title: string;
  declare startDate: Date;
  declare description: string;
  declare petRecordId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static init(sequelize: Sequelize): typeof CalendarEvent {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: DataTypes.STRING(),
        startDate: DataTypes.DATE,
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
    this.hasOne(models.PetRecord, { foreignKey: "id", as: "PetRecord" });
  }
}

export default CalendarEvent;
