import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
class UserSettings extends Model {
  declare id: string;
  declare locale: string;
  declare theme: string;
  declare calendarViewFormat: string;
  declare itemsPerPage: number;
  declare favoritePetRecordId: string;
  declare userId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static init(sequelize: Sequelize): typeof UserSettings {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        locale: DataTypes.STRING,
        theme: DataTypes.STRING,
        calendarViewFormat: DataTypes.STRING,
        itemsPerPage: DataTypes.TINYINT,
        favoritePetRecordId: DataTypes.STRING,
        userId: DataTypes.UUIDV4,
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
    this.belongsTo(models.User, { foreignKey: "userId", as: "User" });
  }
}

export default UserSettings;
