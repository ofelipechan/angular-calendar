import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar.component';
import { NewReminderComponent } from './new-reminder/new-reminder.component';

describe('CalendarComponent', () => {
    let component: CalendarComponent;
    let fixture: ComponentFixture<CalendarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CalendarComponent,
                NewReminderComponent
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
              ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
