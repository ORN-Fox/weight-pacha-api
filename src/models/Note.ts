import { Sequelize, Model, DataTypes } from "sequelize";

// @ts-ignore
class Note extends Model<any> {
  declare id: string;
  declare name: string;
  declare description: string;
  declare petRecordId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static init(sequelize: Sequelize): typeof Note {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING(2000),
        petRecordId: DataTypes.UUIDV4,
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
    this.hasOne(models.PetRecord, { foreignKey: "petRecordId" });
  }
}

export default Note;
