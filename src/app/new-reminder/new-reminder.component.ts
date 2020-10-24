import { Reminder } from './../models/reminder';
import { EventEmitter, HostListener } from '@angular/core';
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

  @HostListener('document:keydown.escape', ['$event']) onEscKeyPressed(event: KeyboardEvent) {
    this.exit();
  }

  buildForm() {
    this.reminderForm = new FormGroup({
      title: new FormControl(''),
      date: new FormControl(moment(this.selectedDay).format('YYYY-MM-DD')),
      time: new FormControl(''),
      city: new FormControl(''),
      description: new FormControl('')
    });
  }

  onSubmit() {
    const title = this.reminderForm.get('title').value;
    const formDate = this.reminderForm.get('date').value;
    const formTime = this.reminderForm.get('time').value;
    const city = this.reminderForm.get('city').value;
    const description = this.reminderForm.get('description').value;
    const date = new Date(`${formDate} ${formTime}`);
    const valuesToSubmit = new Reminder(date, title, description, city);
    this.submitReminder.emit(valuesToSubmit);
  }

  exit() {
    this.changeVisibility.emit(false);
  }
}
