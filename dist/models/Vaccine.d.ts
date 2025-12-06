import { Sequelize, Model } from "sequelize";
declare class Vaccine extends Model<any> {
    id: string;
    name: string;
    injectionDate: Date;
    reminderDate: Date;
    description: string;
    petRecordId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static init(sequelize: Sequelize): typeof Vaccine;
    static associate(models: Record<string, any>): void;
}
export default Vaccine;
