import { DataTypes } from "sequelize";

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable("Vaccines", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    injectionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reminderDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    petRecordId: {
      type: DataTypes.UUID,
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

export function down(queryInterface) {
  return queryInterface.dropTable("Vaccines");
}
