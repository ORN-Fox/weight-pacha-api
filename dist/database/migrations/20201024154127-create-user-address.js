"use strict";
export async function up(queryInterface, Sequelize) {
    return queryInterface.createTable("UserAddress", {
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
        addressId: {
            type: Sequelize.UUID,
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
export async function down(queryInterface) {
    return queryInterface.dropTable("UserAddress");
}
