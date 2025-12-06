import { Sequelize, Model } from "sequelize";
declare class UserPetRecord extends Model<any> {
    userId: string;
    petRecordId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static init(sequelize: Sequelize): typeof UserPetRecord;
    static associate(models: Record<string, any>): void;
}
export default UserPetRecord;
