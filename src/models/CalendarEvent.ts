import { Sequelize, Model, DataTypes } from "sequelize";

import Vaccine from "./Vaccine";
import Wormable from "./Wormable";

export enum CalendarEventSource {
  CALENDAR = 0,
  VACCINE,
  WORMABLE,
}

// @ts-ignore
class CalendarEvent extends Model {
  declare id: string;
  declare title: string;
  declare startDate: Date;
  declare description: string;
  declare eventSource: number;
  declare petRecordId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static init(sequelize: Sequelize): typeof CalendarEvent {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        title: DataTypes.STRING(),
        startDate: DataTypes.DATE,
        description: DataTypes.STRING(2000),
        petRecordId: DataTypes.UUIDV4,
      },
      {
        sequelize,
        timestamps: true,
      },
    );

    return this;
  }

  static associate(models: Record<string, unknown>): void {
    // @ts-ignore
    this.hasOne(models.PetRecord, { foreignKey: "id", as: "PetRecord" });
  }

  static convertVaccineToFullCalendarModel(vaccine: Vaccine) {
    return {
      id: vaccine.id,
      title: vaccine.name,
      startDate: vaccine.injectionDate,
      reminderDate: vaccine.reminderDate,
      description: vaccine.description,
      eventSource: CalendarEventSource.VACCINE,
      petRecordId: vaccine.petRecordId,
      createdAt: vaccine.createdAt,
      updatedAt: vaccine.updatedAt,
    };
  }

  static convertWormableToFullCalendarModel(wormable: Wormable) {
    return {
      id: wormable.id,
      title: wormable.name,
      startDate: wormable.injectionDate,
      reminderDate: wormable.reminderDate,
      description: wormable.description,
      eventSource: CalendarEventSource.WORMABLE,
      petRecordId: wormable.petRecordId,
      createdAt: wormable.createdAt,
      updatedAt: wormable.updatedAt,
    };
  }
}

export default CalendarEvent;
