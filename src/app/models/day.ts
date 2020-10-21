import { Reminder } from './reminder';

export class Day {
    dayNumber: number;
    currentDay = false;
    reminders?: Reminder[];
}