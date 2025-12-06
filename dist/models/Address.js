import { Model, DataTypes } from "sequelize";
// @ts-ignore
class Address extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true,
            },
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            neighborhood: DataTypes.STRING,
            country: DataTypes.STRING,
        }, {
            sequelize,
            timestamps: true,
            freezeTableName: false,
            tableName: "Addresses",
        });
        return this;
    }
    static associate(models) {
        // @ts-ignore
        this.belongsToMany(models.User, {
            through: "UserAddress",
            foreignKey: "addressId",
        });
    }
}
export default Address;
