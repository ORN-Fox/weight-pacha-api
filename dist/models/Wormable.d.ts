import { Sequelize, Model } from "sequelize";
declare class Wormable extends Model<any> {
    id: string;
    name: string;
    injectionDate: Date;
    reminderDate: Date;
    description: string;
    petRecordId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static init(sequelize: Sequelize): typeof Wormable;
    static associate(models: Record<string, any>): void;
}
export default Wormable;
