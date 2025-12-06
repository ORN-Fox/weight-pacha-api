import { Model, DataTypes } from "sequelize";
// @ts-ignore
class PetRecord extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true,
            },
            firstName: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            specie: {
                type: DataTypes.TINYINT,
                allowNull: false,
            },
            breed: DataTypes.STRING(50),
            sex: DataTypes.TINYINT,
            color: DataTypes.STRING(50),
            birthDate: DataTypes.DATE,
            adoptedDate: DataTypes.DATE,
            sequelizeDate: DataTypes.DATE,
            tagNumber: DataTypes.STRING(50),
            tagRageNumber: DataTypes.STRING(50),
            description: DataTypes.TEXT("long"),
        }, {
            sequelize,
            timestamps: true,
            freezeTableName: false,
            tableName: "PetRecords",
        });
        return this;
    }
    static associate(models) {
        // @ts-ignore
        this.belongsToMany(models.User, {
            through: "UserPetRecord",
            foreignKey: "petRecordId",
        });
        // @ts-ignore
        this.hasMany(models.CalendarEvent, { foreignKey: "petRecordId" });
        // @ts-ignore
        this.hasMany(models.Invoice, { foreignKey: "petRecordId" });
        // @ts-ignore
        this.hasMany(models.Measure, { foreignKey: "petRecordId" });
        // @ts-ignore
        this.hasMany(models.Note, { foreignKey: "petRecordId" });
        // @ts-ignore
        this.hasMany(models.Vaccine, { foreignKey: "petRecordId" });
        // @ts-ignore
        this.hasMany(models.Wormable, { foreignKey: "petRecordId" });
    }
}
export default PetRecord;
