import { Sequelize, Model } from "sequelize";
declare class UserSettings extends Model<any> {
    id: string;
    locale: string;
    theme: string;
    calendarViewFormat: string;
    itemsPerPage: number;
    weightUnit: number;
    userId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static init(sequelize: Sequelize): typeof UserSettings;
    static associate(models: Record<string, any>): void;
}
export default UserSettings;
