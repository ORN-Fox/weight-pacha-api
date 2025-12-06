import { DataTypes } from "sequelize";

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable("UserSettings", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    calendarViewFormat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    itemsPerPage: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    weightUnit: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
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

export function down(queryInterface) {
  return queryInterface.dropTable("UserSettings");
}
