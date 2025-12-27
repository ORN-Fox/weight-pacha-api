import { Sequelize, Model, DataTypes } from "sequelize";

import Vaccine from "./Vaccine";
import Wormable from "./Wormable";

export enum CalendarEventSource {
  CALENDAR = 0,
  VACCINE,
  WORMABLE
}

// @ts-ignore
class CalendarEvent extends Model<any> {
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
        },
        title: DataTypes.STRING(),
        startDate: DataTypes.DATE,
        description: DataTypes.STRING(2000),
        eventSource: {
          type: DataTypes.TINYINT,
          defaultValue: CalendarEventSource.CALENDAR
        },
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
    this.hasOne(models.PetRecord, { foreignKey: "id", as: "PetRecord" });
  }

  static convertVaccineToFullCalendarModel(vaccine: Vaccine) {
    return {
      id: vaccine.id,
      title: vaccine.name,
      startDate: vaccine.injectionDate,
      description: vaccine.description,
      eventSource: CalendarEventSource.VACCINE,
      petRecordId: vaccine.petRecordId,
      createdAt: vaccine.createdAt,
      updatedAt: vaccine.updatedAt
    }
  }

  static convertWormableToFullCalendarModel(wormable: Wormable) {
    return {
      id: wormable.id,
      title: wormable.name,
      startDate: wormable.injectionDate,
      description: wormable.description,
      eventSource: CalendarEventSource.WORMABLE,
      petRecordId: wormable.petRecordId,
      createdAt: wormable.createdAt,
      updatedAt: wormable.updatedAt
    }
  }
}

export default CalendarEvent;
