"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("UserPetRecord", {
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      petRecordId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "PetRecords",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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

  down: (queryInterface) => queryInterface.dropTable("UserPetRecord"),
};
