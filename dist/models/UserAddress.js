import { Model, DataTypes } from "sequelize";
// @ts-ignore
class UserAddress extends Model {
    static init(sequelize) {
        super.init({
            userId: DataTypes.UUIDV4,
            addressId: DataTypes.UUIDV4,
        }, {
            sequelize,
            timestamps: true,
            tableName: "UserAddress",
        });
        return this;
    }
    static associate(models) {
        // @ts-ignore
        this.belongsTo(models.User, { foreignKey: "userId" });
        // @ts-ignore
        this.belongsTo(models.Address, { foreignKey: "addressId" });
    }
}
export default UserAddress;
