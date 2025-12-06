"use strict";
export async function up(queryInterface, Sequelize) {
    return queryInterface.createTable("CalendarEvents", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        startDate: {
            type: Sequelize.DATE,
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
    return queryInterface.dropTable("CalendarEvents");
}
