"use strict";

import { QueryInterface, Sequelize } from "sequelize";

export async function up(queryInterface: QueryInterface, Sequelize: typeof Sequelize): Promise<void> {
  return queryInterface.createTable("Wormables", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    injectionDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    reminderDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING(2000),
      allowNull: true,
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
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.dropTable("Wormables");
}
