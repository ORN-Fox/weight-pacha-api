import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.createTable("UserAddress", {
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
    addressId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Addresses",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.dropTable("UserAddress");
}
