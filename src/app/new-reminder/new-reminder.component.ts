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
  @Output() events: EventEmitter<any> = new EventEmitter();

  reminderForm: FormGroup;
  allDay = true;
  changeAllDay = () => this.allDay = !this.allDay;

  constructor() { }

  ngOnInit() {
    console.log('created reminder component')
    this.buildForm();
  }

  ngOnChanges(changes) {
    console.log(changes);
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
    console.log(this.reminderForm.value);
  }

  exit() {
    this.events.emit('invisible');
  }
}
