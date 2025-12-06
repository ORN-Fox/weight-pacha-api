import Sequelize, { Model } from "sequelize";

class Wormable extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: Sequelize.STRING,
        injectionDate: Sequelize.DATE,
        reminderDate: Sequelize.DATE,
        description: Sequelize.STRING(2000),
        petRecordId: Sequelize.UUIDV4()
      },
      {
        sequelize,
        timestamps: true,
        freezeTableName: false, //If it's false, it will use the table name in the plural. Ex: Users
        tableName: 'Wormables' //Define table name
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.PetRecord, { foreignKey: "petRecordId" });
  }
}

export default Wormable;
