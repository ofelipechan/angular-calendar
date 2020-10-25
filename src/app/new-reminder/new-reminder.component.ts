import { WeatherService } from './../services/weather.service';
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
  cityAutoComplete = [];
  weatherForecast = null;
  reminderForm: FormGroup;
  submit = false;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  @HostListener('document:keydown.escape', ['$event']) onEscKeyPressed(event: KeyboardEvent) {
    this.exit();
  }

  buildForm() {
    const date = moment(this.selectedReminder.date).format('YYYY-MM-DD');

    this.reminderForm = new FormGroup({
      title: new FormControl(this.selectedReminder.title, [Validators.required, Validators.maxLength(30)]),
      date: new FormControl(date, Validators.required),
      time: new FormControl(moment(this.selectedReminder.date).format('HH:mm'), Validators.required),
      city: new FormControl(this.selectedReminder.city),
      description: new FormControl(this.selectedReminder.description),
      color: new FormControl(this.selectedReminder.color || 'default')
    });

    if (this.selectedReminder.id) {
      this.editMode = false;
      this.reminderForm.disable();
    }
    if (this.selectedReminder.city) {
      this.getWeatherForecast(this.selectedReminder.city, date);
    }
  }

  enableFormEdit() {
    this.editMode = !this.editMode;
    this.reminderForm.enable();
  }

  onSubmit() {
    this.submit = true;
    if (!this.reminderForm.valid) {
      return;
    }

    const formDate = this.reminderForm.get('date').value;
    const formTime = this.reminderForm.get('time').value;
    const valuesToSubmit = new Reminder(
      new Date(`${formDate} ${formTime}`),
      this.reminderForm.value.title,
      this.reminderForm.value.description,
      this.reminderForm.value.city,
      this.reminderForm.value.color,
      this.reminderForm.value.forecast
    );
    if (this.selectedReminder.id) {
      valuesToSubmit.id = this.selectedReminder.id;
    }
    this.submitReminder.emit({ ...valuesToSubmit });
  }

  fieldHasError(fieldName: string) {
    return this.submit && !this.reminderForm.get(fieldName).valid;
  }

  async onCityFieldType(city: string) {
    this.weatherForecast = null;
    if (city.length > 2) {
      const response = await this.weatherService.autoComplete(city);
      this.cityAutoComplete = response.splice(0, 4);
      return;
    }
    this.cityAutoComplete = [];
  }

  onClickAutoCompleteCity(location: string) {
    this.reminderForm.get('city').setValue(location);
    this.cityAutoComplete = [];

    const formDate = this.reminderForm.get('date').value;
    const formTime = this.reminderForm.get('time').value;
    const date = new Date(`${formDate} ${formTime}`);
    const formattedDate = moment(date).format('YYYY-MM-DD');
    this.getWeatherForecast(location, formattedDate);
  }

  async getWeatherForecast(city: string, date: string) {
    const differenceDays = moment(date).diff(new Date(), 'days');
    if (differenceDays > 15 || differenceDays < 0) {
      return;
    }
    try {
      const respone: any = await this.weatherService.getWeatherForecast(city, date);
      this.weatherForecast = respone;
    } catch (error) {
      throw error;
    }
  }

  exit() {
    this.changeVisibility.emit(false);
  }
}
