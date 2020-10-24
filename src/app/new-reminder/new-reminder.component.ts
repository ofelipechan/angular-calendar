import { Reminder } from './../models/reminder';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-new-reminder',
  templateUrl: './new-reminder.component.html',
  styleUrls: ['./new-reminder.component.scss']
})
export class NewReminderComponent implements OnInit, OnChanges {
  @Input() selectedDay: Date = new Date();
  @Output() submitReminder: EventEmitter<Reminder> = new EventEmitter();
  @Output() changeVisibility: EventEmitter<boolean> = new EventEmitter();

  reminderForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes) {
    if (changes.selectedDay) {
      this.selectedDay = changes.selectedDay.currentValue;
    }
  }

  buildForm() {
    this.reminderForm = new FormGroup({
      title: new FormControl(''),
      date: new FormControl(moment(this.selectedDay).format('YYYY-MM-DD')),
      time: new FormControl(''),
      location: new FormControl('')
    });
  }

  onSubmit() {
    debugger;
    this.submitReminder.emit(this.reminderForm.value);
  }

  exit() {
    this.changeVisibility.emit(false);
  }
}
