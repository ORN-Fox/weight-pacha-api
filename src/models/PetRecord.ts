import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
class PetRecord extends Model<any> {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare specie: number;
  declare breed: string;
  declare sex: number;
  declare color: string;
  declare birthDate: Date;
  declare adoptedDate: Date;
  declare sequelizeDate: Date;
  declare tagNumber: string;
  declare tagRageNumber: string;
  declare description: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static init(sequelize: Sequelize): typeof PetRecord {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        firstName: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        lastName: DataTypes.STRING(100),
        specie: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
        breed: DataTypes.STRING(50),
        sex: DataTypes.TINYINT,
        color: DataTypes.STRING(50),
        birthDate: DataTypes.DATE,
        adoptedDate: DataTypes.DATE,
        sterilize: DataTypes.BOOLEAN,
        sterilizeDate: DataTypes.DATE,
        tagNumber: DataTypes.STRING(50),
        tagRageNumber: DataTypes.STRING(50),
        description: DataTypes.TEXT("long"),
      },
      {
        sequelize,
        timestamps: true
      }
    );

    return this;
  }

  static associate(models: Record<string, any>): void {
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
