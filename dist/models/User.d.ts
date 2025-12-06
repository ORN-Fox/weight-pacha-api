import { Sequelize, Model } from "sequelize";
declare class User extends Model<any> {
    id: string;
    username: string;
    email: string;
    password: string;
    password_hash: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    checkPassword(password: string): Promise<boolean>;
    static init(sequelize: Sequelize): typeof User;
    static associate(models: Record<string, any>): void;
}
export default User;
