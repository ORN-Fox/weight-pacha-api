"use strict";
export async function up(queryInterface, Sequelize) {
    return queryInterface.createTable("Invoices", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        billingDate: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        amount: {
            type: Sequelize.INTEGER,
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
export async function down(queryInterface) {
    return queryInterface.dropTable("Invoices");
}
