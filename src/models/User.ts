import { Sequelize, Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

// @ts-ignore
class User extends Model {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare password_hash: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash);
  }

  static init(sequelize: Sequelize): typeof User {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
      },
      {
        sequelize,
        timestamps: true,
      },
    );

    this.addHook("beforeSave", async (user: User) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models: Record<string, unknown>): void {
    // @ts-ignore
    this.belongsToMany(models.Address, {
      through: models.UserAddress,
      foreignKey: "userId",
      otherKey: "addressId",
      as: "Addresses",
    });
    // @ts-ignore
    this.belongsToMany(models.PetRecord, {
      through: models.UserPetRecord,
      foreignKey: "userId",
      otherKey: "petRecordId",
      as: "PetRecords",
    });
    // @ts-ignore
    this.hasOne(models.UserSettings, { foreignKey: "userId", as: "Settings" });
  }
}

export default User;
