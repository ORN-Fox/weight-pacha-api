import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.createTable("Measures", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
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
  return queryInterface.dropTable("Measures");
}
