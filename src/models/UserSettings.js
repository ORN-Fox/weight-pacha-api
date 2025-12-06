import Sequelize, { Model, UUIDV4 } from "sequelize";

class UserSettings extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUIDV4,
          primaryKey: true
        },
        locale: Sequelize.STRING,
        theme: Sequelize.STRING,
        calendarViewFormat: Sequelize.STRING,
        itemsPerPage: Sequelize.TINYINT,
        weightUnit: Sequelize.TINYINT,
        userId: Sequelize.UUIDV4
      },
      {
        sequelize,
        timestamps: true,
        freezeTableName: false, //If it's false, it will use the table name in the plural. Ex: Users
        tableName: 'UserSettings' //Define table name
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.User, { foreignKey: "userId" });
  }
}

export default UserSettings;
