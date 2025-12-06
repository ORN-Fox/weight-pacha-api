import { Model, DataTypes } from "sequelize";
// @ts-ignore
class Invoice extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true,
            },
            billingDate: DataTypes.DATE,
            amount: DataTypes.INTEGER,
            description: DataTypes.STRING(2000),
            petRecordId: DataTypes.UUIDV4,
        }, {
            sequelize,
            timestamps: true,
            freezeTableName: false,
            tableName: "Invoices",
        });
        return this;
    }
    static associate(models) {
        // @ts-ignore
        this.hasOne(models.PetRecord, { foreignKey: "petRecordId" });
    }
}
export default Invoice;
