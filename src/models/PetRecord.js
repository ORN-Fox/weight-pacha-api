import Sequelize, { Model } from "sequelize";

class PetRecord extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUIDV4,
          primaryKey: true
        },   
        firstName: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        specie: {
          type: Sequelize.TINYINT,
          allowNull: false,
        },
        breed: Sequelize.STRING(50),
        sex: Sequelize.TINYINT,
        color: Sequelize.STRING(50),
        birthDate: Sequelize.DATE,
        adoptedDate: Sequelize.DATE,
        sequelizeDate: Sequelize.DATE,
        tagNumber: Sequelize.STRING(50),
        tagRageNumber: Sequelize.STRING(50),
        description: Sequelize.TEXT("long")
      },
      {
        sequelize,
        timestamps: true,
        freezeTableName: false, //If it's false, it will use the table name in the plural. Ex: Users
        tableName: 'PetRecords' //Define table name
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: "UserPetRecord",
      foreignKey: "petRecordId",
    });

    this.hasMany(models.CalendarEvent, { foreignKey: "petRecordId" });
    this.hasMany(models.Invoice, { foreignKey: "petRecordId" });
    this.hasMany(models.Measure, { foreignKey: "petRecordId" });
    this.hasMany(models.Note, { foreignKey: "petRecordId" });
    this.hasMany(models.Vaccine, { foreignKey: "petRecordId" });
    this.hasMany(models.Wormable, { foreignKey: "petRecordId" });
  }
}

export default PetRecord;
