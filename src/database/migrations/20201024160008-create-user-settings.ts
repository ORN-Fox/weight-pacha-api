"use strict";

import { QueryInterface, Sequelize } from "sequelize";

export async function up(queryInterface: QueryInterface, Sequelize: typeof Sequelize): Promise<void> {
  return queryInterface.createTable("UserSettings", {
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
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.dropTable("UserSettings");
}
