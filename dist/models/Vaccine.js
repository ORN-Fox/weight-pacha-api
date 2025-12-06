import { Model, DataTypes } from "sequelize";
// @ts-ignore
class Vaccine extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            injectionDate: DataTypes.DATE,
            reminderDate: DataTypes.DATE,
            description: DataTypes.STRING(2000),
            petRecordId: DataTypes.UUIDV4,
        }, {
            sequelize,
            timestamps: true,
            freezeTableName: false,
            tableName: "Vaccines",
        });
        return this;
    }
    static associate(models) {
        // @ts-ignore
        this.hasOne(models.PetRecord, { foreignKey: "petRecordId" });
    }
}
export default Vaccine;
