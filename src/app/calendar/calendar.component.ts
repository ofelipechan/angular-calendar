import { Day } from './../models/day';
import { Component, OnInit } from '@angular/core';
import { Reminder } from '../models/reminder';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  month: Day[];
  selectedDay = new Date();
  today = new Date();
  reminders: Reminder[] = [];
  reminderModalVisible = false;

  constructor() {
    localStorage.setItem('reminders', JSON.stringify([
      new Reminder(new Date(2020, 9, 15), 'Test 123'),
      new Reminder(new Date(2020, 9, 12), 'Test 456'),
      new Reminder(new Date(2020, 8, 27), 'Test 789'),
    ]));
  }

  ngOnInit() {
    const reminders = localStorage.getItem('reminders');
    if (reminders) {
      this.reminders = JSON.parse(reminders);
    }
    this.buildCalendarDays();
  }

  buildCalendarDays() {
    this.month = [];
    const lastDayToAdd = this.getDayToAddOnCalendar();
    let currentDayToAdd = this.getFirstDayToAddOnCalendar();

    do {
      const currentDayReminders = this.reminders.filter(r => this.compareDates(r.date, currentDayToAdd));
      this.month.push(new Day(currentDayToAdd, currentDayReminders));
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

  showOtherMonth(type: 'previous' | 'next') {
    const firstDay = this.getFirstDayOfMonth(this.selectedDay);
    if (type === 'previous') {
      this.selectedDay = moment(firstDay).subtract(1, 'month').toDate();
    } else {
      this.selectedDay = moment(firstDay).add(1, 'month').toDate();
    }
    this.buildCalendarDays();
  }

  createNewReminder(day: Day) {
    this.selectedDay = day.date;
    this.reminderModalVisible = true;
  }

  onReminderModalSubmit(event) {
    this.reminderModalVisible = false;
  }

  onChangeReminderVisibility(newValue) {
    this.reminderModalVisible = newValue;
  }

  isWeekend(value) {
    return new Date(value).getDay() === 0 || new Date(value).getDay() === 6;
  }

  isDayFromOtherMonth(value) {
    return new Date(value).getMonth() !== this.selectedDay.getMonth();
  }
}
