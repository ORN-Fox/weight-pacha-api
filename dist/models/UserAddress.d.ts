import { Sequelize, Model } from "sequelize";
declare class UserAddress extends Model<any> {
    userId: string;
    addressId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static init(sequelize: Sequelize): typeof UserAddress;
    static associate(models: Record<string, any>): void;
}
export default UserAddress;
