import { Component, OnInit } from '@angular/core';
import { Reminder } from '../models/reminder';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  month = [];
  selectedDay = new Date();
  today = new Date();
  reminders: Reminder[] = [];

  constructor() { }

  ngOnInit() {
    this.buildCalendarDays();
  }

  buildCalendarDays() {
    const lastDayToAdd = this.getDayToAddOnCalendar();
    let currentDayToAdd = this.getFirstDayToAddOnCalendar();

    do {
      this.month.push(currentDayToAdd);
      currentDayToAdd = moment(currentDayToAdd).add(1, 'day').toDate();
    } while (currentDayToAdd.toISOString() !== lastDayToAdd.toISOString());
  }

  getFirstDayToAddOnCalendar() {
    const firstDayToAdd = this.getFirstDayOfMonth(this.selectedDay);
    let dayToAddOnCalendar = firstDayToAdd;
    if (firstDayToAdd.getDay() > 0) {
      dayToAddOnCalendar = moment(firstDayToAdd).subtract(firstDayToAdd.getDay(), 'days').toDate();
    }
    return dayToAddOnCalendar;
  }

  getDayToAddOnCalendar() {
    const firstDayOfNextMonth = new Date(this.selectedDay.getFullYear(), this.selectedDay.getMonth() + 1, 1);
    let lastDayToAdd = this.getFirstDayOfMonth(firstDayOfNextMonth);
    if (lastDayToAdd.getDay() > 0) {
      lastDayToAdd = moment(lastDayToAdd).add(7 - lastDayToAdd.getDay(), 'days').toDate();
    }
    return lastDayToAdd;
  }

  getFirstDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  compareDates(dateA: Date, dateB: Date): boolean {
    return moment(dateA).format('YYYY-MM-DD') === moment(dateB).format('YYYY-MM-DD');
  }

}
