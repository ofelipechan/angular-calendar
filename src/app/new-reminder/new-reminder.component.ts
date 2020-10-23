import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-new-reminder',
  templateUrl: './new-reminder.component.html',
  styleUrls: ['./new-reminder.component.scss']
})
export class NewReminderComponent implements OnInit {
  @Input() dateSelected: Date = new Date();
  // @Output() visible: EventEmitter;

  reminderForm: FormGroup;
  allDay = true;
  changeAllDay = () => this.allDay = !this.allDay;

  constructor() { }

  ngOnInit() {
    this.buildForm();
    this.reminderForm.get('date').setValue(moment(this.dateSelected).format('YYYY-MM-DD'));
  }

  buildForm() {
    this.reminderForm = new FormGroup({
      date: new FormControl('')
    });
  }

  onSubmit() {

  }

  // exit() {
  //   this.visible.emit('false');
  // }
}
