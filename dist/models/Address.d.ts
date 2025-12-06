import { Sequelize, Model } from "sequelize";
declare class Address extends Model<any> {
    id: string;
    city: string;
    state: string;
    neighborhood: string;
    country: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static init(sequelize: Sequelize): typeof Address;
    static associate(models: Record<string, any>): void;
}
export default Address;
