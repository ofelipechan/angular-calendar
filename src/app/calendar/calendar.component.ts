import { Day } from './../models/day';
import { Component, OnInit } from '@angular/core';
import { Reminder } from '../models/reminder';
import * as moment from 'moment';
import { debug } from 'console';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  month: Day[];
  selectedDay = new Date(2020, 9, 31);
  today = new Date(2020, 9, 31);
  reminders: Reminder[] = [];
  reminderModalVisible = false;

  constructor() {
    if (!localStorage.getItem('reminders')) {
      localStorage.setItem('reminders', JSON.stringify([
        new Reminder(new Date(2020, 8, 27).toISOString(), 'Test 789'),
        new Reminder(new Date(2020, 9, 12).toISOString(), 'Test 456'),
        new Reminder(new Date(2020, 9, 15).toISOString(), 'Test 123'),
      ]));
    }
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
    const firstDayToAdd = moment(this.selectedDay).startOf('month').toDate();
    let dayToAddOnCalendar = firstDayToAdd;
    if (firstDayToAdd.getDay() > 0) {
      dayToAddOnCalendar = moment(firstDayToAdd).subtract(firstDayToAdd.getDay(), 'days').toDate();
    }
    return dayToAddOnCalendar;
  }

  getDayToAddOnCalendar() {
    const nextMonth = moment(this.selectedDay).add(1, 'month');
    let lastDayToAdd = moment(nextMonth).startOf('month').toDate();
    if (lastDayToAdd.getDay() > 0) {
      lastDayToAdd = moment(lastDayToAdd).add(7 - lastDayToAdd.getDay(), 'days').toDate();
    }
    return lastDayToAdd;
  }

  compareDates(dateA: Date, dateB: Date): boolean {
    return moment(dateA).format('L') === moment(dateB).format('L');
  }

  showOtherMonth(type: 'previous' | 'next') {
    const firstDay = moment(this.selectedDay).startOf('month').toDate();
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

  onReminderModalSubmit(newReminder: Reminder) {
    this.reminderModalVisible = false;
    this.addNewReminder(newReminder);
  }

  addNewReminder(reminder: Reminder) {
    this.reminders = this.addReminderToList(reminder, this.reminders);
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
    const dayIndex = this.month.findIndex((day: Day) => this.compareDates(day.date, reminder.date));
    this.month[dayIndex].reminders = this.addReminderToList(reminder, this.month[dayIndex].reminders);
  }

  addReminderToList(reminder: Reminder, reminders: Reminder[]): Reminder[] {
    let indexToAdd = 0;
    reminders.forEach((rem, index) => {
      if (moment(reminder.date).isSameOrAfter(rem.date)) {
        indexToAdd = index + 1;
      }
    });
    reminders.splice(indexToAdd, 0, reminder);
    return reminders;
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
