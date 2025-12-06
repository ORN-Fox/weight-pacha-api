import { Sequelize, Model } from "sequelize";
declare class CalendarEvent extends Model<any> {
    id: string;
    title: string;
    startDate: Date;
    description: string;
    petRecordId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static init(sequelize: Sequelize): typeof CalendarEvent;
    static associate(models: Record<string, any>): void;
}
export default CalendarEvent;
