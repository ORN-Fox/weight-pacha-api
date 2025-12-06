"use strict";
export async function up(queryInterface, Sequelize) {
    return queryInterface.createTable("Users", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        password_hash: {
            type: Sequelize.STRING,
            allowNull: false,
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
export async function down(queryInterface) {
    return queryInterface.dropTable("Users");
}
