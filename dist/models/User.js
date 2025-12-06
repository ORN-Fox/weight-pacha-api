import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
// @ts-ignore
class User extends Model {
    async checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true,
            },
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.VIRTUAL,
            password_hash: DataTypes.STRING,
        }, {
            sequelize,
            timestamps: true,
            freezeTableName: false,
            tableName: "Users",
        });
        this.addHook("beforeSave", async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        return this;
    }
    static associate(models) {
        // @ts-ignore
        this.belongsToMany(models.Address, {
            through: "UserAddress",
            foreignKey: "userId",
        });
        // @ts-ignore
        this.belongsToMany(models.PetRecord, {
            through: "UserPetRecord",
            foreignKey: "userId",
        });
    }
}
export default User;
