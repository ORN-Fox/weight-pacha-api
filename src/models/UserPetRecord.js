import Sequelize, { Model } from "sequelize";

class UserPetRecord extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: Sequelize.UUIDV4,
        petRecordId: Sequelize.UUIDV4
      },
      {
        sequelize,
        timestamps: true,
        tableName: "UserPetRecord"
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId" });
    this.belongsTo(models.PetRecord, { foreignKey: "petRecordId" });
  }
}

export default UserPetRecord;
