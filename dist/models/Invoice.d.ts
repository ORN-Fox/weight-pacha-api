import { Sequelize, Model } from "sequelize";
declare class Invoice extends Model<any> {
    id: string;
    billingDate: Date;
    amount: number;
    description: string;
    petRecordId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static init(sequelize: Sequelize): typeof Invoice;
    static associate(models: Record<string, any>): void;
}
export default Invoice;
