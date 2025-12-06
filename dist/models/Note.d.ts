import { Sequelize, Model } from "sequelize";
declare class Note extends Model<any> {
    id: string;
    name: string;
    description: string;
    petRecordId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static init(sequelize: Sequelize): typeof Note;
    static associate(models: Record<string, any>): void;
}
export default Note;
