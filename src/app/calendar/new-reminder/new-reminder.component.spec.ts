import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NewReminderComponent } from './new-reminder.component';

describe('NewReminderComponent', () => {
    let component: NewReminderComponent;
    let fixture: ComponentFixture<NewReminderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewReminderComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewReminderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should write a 30 character reminder and submit successfuly', () => {
        const title: HTMLInputElement = fixture.debugElement.query(By.css('#title')).nativeElement;
        title.value = '123456789012345678901234567890'; // 30 characters
        title.dispatchEvent(new Event('input'));
        const titleForm = component.reminderForm.get('title').value;
        expect(titleForm).toBe(title.value);
        expect(component.reminderForm.valid).toBeTruthy();

        spyOn(component.submitReminder, 'emit');
        fixture.detectChanges();
        const submitButton: HTMLInputElement = fixture.debugElement.query(By.css('#btn-submit')).nativeElement;
        submitButton.click();

        expect(component.submitReminder.emit).toHaveBeenCalledTimes(1);
    });

    it('should not allow submitting reminder with more than 30 chars', () => {
        const title: HTMLInputElement = fixture.debugElement.query(By.css('#title')).nativeElement;
        title.value = '1234567890123456789012345678901'; // 31 characters
        title.dispatchEvent(new Event('input'));
        const titleForm = component.reminderForm.get('title').value;
        expect(titleForm).toBe(title.value);
        expect(component.reminderForm.valid).toBeFalsy();

        spyOn(component.submitReminder, 'emit');
        fixture.detectChanges();
        const submitButton: HTMLInputElement = fixture.debugElement.query(By.css('#btn-submit')).nativeElement;
        submitButton.click();

        expect(component.submitReminder.emit).not.toHaveBeenCalled();
    });
});
