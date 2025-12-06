import Sequelize, { Model } from "sequelize";

class CalendarEvent extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUIDV4,
          primaryKey: true
        },
        title: Sequelize.STRING(),
        startDate: Sequelize.DATE,
        description: Sequelize.STRING(2000),
        petRecordId: Sequelize.UUIDV4
      },
      {
        sequelize,
        timestamps: true,
        freezeTableName: false, //If it's false, it will use the table name in the plural. Ex: Users
        tableName: 'CalendarEvents' //Define table name
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.PetRecord, { foreignKey: "petRecordId" });
  }
}

export default CalendarEvent;
