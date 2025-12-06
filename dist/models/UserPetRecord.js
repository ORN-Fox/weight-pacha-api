import { Model, DataTypes } from "sequelize";
// @ts-ignore
class UserPetRecord extends Model {
    static init(sequelize) {
        super.init({
            userId: DataTypes.UUIDV4,
            petRecordId: DataTypes.UUIDV4,
        }, {
            sequelize,
            timestamps: true,
            tableName: "UserPetRecord",
        });
        return this;
    }
    static associate(models) {
        // @ts-ignore
        this.belongsTo(models.User, { foreignKey: "userId" });
        // @ts-ignore
        this.belongsTo(models.PetRecord, { foreignKey: "petRecordId" });
    }
}
export default UserPetRecord;
