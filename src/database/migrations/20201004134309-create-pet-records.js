import { DataTypes } from "sequelize";

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable("PetRecords", {
    id: {
      type: DataTypes.UUID.V4,
      primaryKey: true,
      allowNull: false,
      defaultValue: sql.uuidV4,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    specie: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    sex: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    adoptedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sterilize: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    sterilizeDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tagNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    tagRageNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable("PetRecords");
}
