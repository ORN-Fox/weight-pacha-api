import { Sequelize, Model } from "sequelize";
declare class PetRecord extends Model<any> {
    id: string;
    firstName: string;
    lastName: string;
    specie: number;
    breed: string;
    sex: number;
    color: string;
    birthDate: Date;
    adoptedDate: Date;
    sequelizeDate: Date;
    tagNumber: string;
    tagRageNumber: string;
    description: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static init(sequelize: Sequelize): typeof PetRecord;
    static associate(models: Record<string, any>): void;
}
export default PetRecord;
