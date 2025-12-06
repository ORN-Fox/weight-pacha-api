"use strict";

import { QueryInterface, Sequelize } from "sequelize";

export async function up(queryInterface: QueryInterface, Sequelize: typeof Sequelize): Promise<void> {
  return queryInterface.createTable("Addresses", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    city: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    state: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    neighborhood: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    country: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.dropTable("Addresses");
}
