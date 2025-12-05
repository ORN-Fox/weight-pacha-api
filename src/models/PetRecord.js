import Sequelize, { Model } from "sequelize";

class PetRecord extends Model {
  static init(sequelize) {
    super.init(
      {
        firstName: Sequelize.STRING(100),
        lastName: Sequelize.STRING(100),
        specie: Sequelize.TINYINT,
        breed: Sequelize.STRING(50),
        sex: Sequelize.TINYINT,
        color: Sequelize.STRING(50),
        birthDate: Sequelize.DATE,
        adoptedDate: Sequelize.DATE,
        sequelizeDate: Sequelize.DATE,
        tagNumber: Sequelize.STRING(50),
        tagRageNumber: Sequelize.STRING(50),
        description: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true,
      }
    );

    return this;
  }

  // TODO user relation
}

export default PetRecord;
