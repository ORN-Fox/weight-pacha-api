import { Sequelize, Model } from "sequelize";
declare class Measure extends Model<any> {
    id: string;
    date: Date;
    weight: number;
    petRecordId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static init(sequelize: Sequelize): typeof Measure;
    static associate(models: Record<string, any>): void;
}
export default Measure;
