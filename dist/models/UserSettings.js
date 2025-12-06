import { Model, DataTypes } from "sequelize";
// @ts-ignore
class UserSettings extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true,
            },
            locale: DataTypes.STRING,
            theme: DataTypes.STRING,
            calendarViewFormat: DataTypes.STRING,
            itemsPerPage: DataTypes.TINYINT,
            weightUnit: DataTypes.TINYINT,
            userId: DataTypes.UUIDV4,
        }, {
            sequelize,
            timestamps: true,
            freezeTableName: false,
            tableName: "UserSettings",
        });
        return this;
    }
    static associate(models) {
        // @ts-ignore
        this.hasOne(models.User, { foreignKey: "userId" });
    }
}
export default UserSettings;
