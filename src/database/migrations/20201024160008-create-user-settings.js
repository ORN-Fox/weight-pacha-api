"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("UserSettings", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      locale: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      theme: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      calendarViewFormat: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      itemsPerPage: {
        type: Sequelize.TINYINT,
        allowNull: true,
      },
      weightUnit: {
        type: Sequelize.TINYINT,
        allowNull: true,
      },
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

  down: (queryInterface) => queryInterface.dropTable("UserSettings"),
};
