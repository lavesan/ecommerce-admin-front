import { WeekDay } from "@enums/WeekDay.enum";
import { IEnterpriseCreateOrEditFormSchedule } from "@models/forms/IEnterpriseCreateOrEditForm";

export const filterWeekDay = (
  arr: IEnterpriseCreateOrEditFormSchedule[],
  weekDay: WeekDay
) => arr.filter(({ weekDay }) => weekDay === weekDay);
