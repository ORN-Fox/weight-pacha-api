"use strict";

import { QueryInterface, Sequelize } from "sequelize";

export async function up(queryInterface: QueryInterface, Sequelize: typeof Sequelize): Promise<void> {
  return queryInterface.createTable("UserPetRecord", {
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
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.dropTable("UserPetRecord");
}
