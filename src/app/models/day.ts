import { Reminder } from './reminder';
import * as moment from 'moment';

export class Day {
    date: Date;
    reminders?: Reminder[];
    currentDay?: boolean;

    constructor(date: Date, reminders?: Reminder[]) {
        this.date = date;
        this.currentDay = moment(date).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD');
        if (reminders) {
            this.reminders = reminders;
        }
    }

    getDay() {
        return this.date.getDay();
    }
    getFullYear() {
        return this.date.getFullYear();
    }
    getMonth() {
        return this.date.getMonth();
    }
}
