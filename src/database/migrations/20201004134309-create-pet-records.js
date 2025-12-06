"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("PetRecords", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      firstName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      specie: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      breed: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      sex: {
        type: Sequelize.TINYINT,
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      adoptedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      sterilize: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      sterilizeDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      tagNumber: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      tagRageNumber: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT("long"),
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
    }),

  down: (queryInterface) => queryInterface.dropTable("PetRecords"),
};
