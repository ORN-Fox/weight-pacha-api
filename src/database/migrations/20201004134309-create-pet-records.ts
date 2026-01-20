"use strict";

import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.createTable("PetRecords", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
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
    archivedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.dropTable("PetRecords");
}
