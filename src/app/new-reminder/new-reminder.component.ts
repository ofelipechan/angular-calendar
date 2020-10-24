import { Day } from './../models/day';
import { Reminder } from './../models/reminder';
import { EventEmitter, HostListener } from '@angular/core';
import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-new-reminder',
  templateUrl: './new-reminder.component.html',
  styleUrls: ['./new-reminder.component.scss']
})
export class NewReminderComponent implements OnInit {
  @Input() selectedReminder: Reminder = new Reminder();
  @Output() submitReminder: EventEmitter<Reminder> = new EventEmitter();
  @Output() changeVisibility: EventEmitter<boolean> = new EventEmitter();

  editMode = true;

  reminderForm: FormGroup;
  submit = false;

  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  @HostListener('document:keydown.escape', ['$event']) onEscKeyPressed(event: KeyboardEvent) {
    this.exit();
  }

  buildForm() {
    this.reminderForm = new FormGroup({
      title: new FormControl(this.selectedReminder.title, [Validators.required, Validators.maxLength(30)]),
      date: new FormControl(moment(this.selectedReminder.date).format('YYYY-MM-DD'), Validators.required),
      time: new FormControl(moment(new Date()).format('HH:mm'), Validators.required),
      city: new FormControl(this.selectedReminder.city),
      description: new FormControl(this.selectedReminder.description),
      color: new FormControl(this.selectedReminder.color)
    });

    if (this.selectedReminder.creationDate) {
      this.editMode = false;
      this.reminderForm.disable();
    }
  }

  enableFormEdit() {
    this.reminderForm.enable();
  }

  onSubmit() {
    this.submit = true;
    if (!this.reminderForm.valid) {
      return;
    }
    debugger;

    const formDate = this.reminderForm.get('date').value;
    const formTime = this.reminderForm.get('time').value;
    const valuesToSubmit: Reminder = this.reminderForm.value;
    valuesToSubmit.date = new Date(`${formDate} ${formTime}`);
    this.submitReminder.emit({ ...valuesToSubmit, creationDate: new Date() });
  }

  fieldHasError(fieldName: string) {
    return this.submit && !this.reminderForm.get(fieldName).valid;
  }

  exit() {
    this.changeVisibility.emit(false);
  }
}
