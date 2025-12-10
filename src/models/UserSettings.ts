import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
class UserSettings extends Model<any> {
  declare id: string;
  declare locale: string;
  declare theme: string;
  declare calendarViewFormat: string;
  declare itemsPerPage: number;
  declare weightUnit: number;
  declare userId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static init(sequelize: Sequelize): typeof UserSettings {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
        },
        locale: DataTypes.STRING,
        theme: DataTypes.STRING,
        calendarViewFormat: DataTypes.STRING,
        itemsPerPage: DataTypes.TINYINT,
        weightUnit: DataTypes.TINYINT,
        userId: DataTypes.UUIDV4,
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
    this.hasOne(models.User, { foreignKey: "userId" });
  }
}

export default UserSettings;
