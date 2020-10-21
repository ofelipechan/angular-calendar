import { Component, OnInit } from '@angular/core';
import { Day } from '../models/day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  today = new Date();
  month = [];
  day: Day;

  constructor() { }

  ngOnInit() {
    this.buildCalendarDays();
  }

  buildCalendarDays() {
    this.month.push(this.getFirstWeek());
    const weeksInMonth = this.weekCount();

    for (let i = 1; i < weeksInMonth; i++) {

    }
  }

  getFirstWeek(): Array<any> {
    const lastDayOfLastMonth = this.getLastDayOfLastMonth(this.today);
    const firstWeek: Day[] = [];

    let daysAdded = 0;
    const subtractWeekday = 7 - (lastDayOfLastMonth.getDay() + 1);
    let currentDay = lastDayOfLastMonth.getUTCDate() - subtractWeekday;
    do {
      firstWeek.push({
        dayNumber: currentDay,
        currentDay: this.today.getUTCDate() === (currentDay)
      });
      daysAdded++;

      if (currentDay < lastDayOfLastMonth.getUTCDate()) {
        currentDay++;
        continue;
      }
      currentDay = 1;
    } while (daysAdded < 7);
    return firstWeek;
  }

  weekCount() {
    const firstOfMonth = this.getFirstDayOfMonth(this.today);
    const lastOfMonth = this.getLastDayOfLastMonth(this.today);
    const used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil(used / 7);
  }

  getFirstDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  getLastDayOfLastMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 0);
  }

}
