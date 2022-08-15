import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { delay, of, throwError } from 'rxjs';
import { SignUpService } from '../../services/sign-up.service';

import { SignUpFormComponent } from './sign-up-form.component';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;
  let signUpServiceSpy = jasmine.createSpyObj('SignUpService', ['signUp']);
  signUpServiceSpy.signUp.and.returnValue(of());


  const setFormValue = (firstName = "", lastName = "", email = "", password = "") => {
    component.signUpForm.setValue({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpFormComponent],
      providers: [
        {
          provide: SignUpService, useValue: signUpServiceSpy
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('Validating Sign Up Form', () => {
    it('form should be invalid if no field value entered', () => {
      setFormValue();
      expect(component.signUpForm.valid).toEqual(false);
    });
    it('form should be valid if form values are valid', () => {
      setFormValue("Bob", "T", "test@fdx.com", "abcdeF12");
      expect(component.signUpForm.valid).toEqual(true);
    });
  });

  describe('Submitting Sign Up Form', () => {
    it('should call sign up service when form is valid', () => {
      setFormValue("Bob", "T", "test@fdx.com", "abcdeF12");
      expect(component.signUpForm.valid).toEqual(true);
      const el = fixture.debugElement.query(By.css('[data-testid="sign-up-form"]'));
      el.triggerEventHandler('ngSubmit', null);
      expect(signUpServiceSpy.signUp).toHaveBeenCalledWith({
        firstName: "Bob",
        lastName: "T",
        email: "test@fdx.com",
        password: "abcdeF12"
      });
    });
    it('should show loader when for is submitting and hide loader on success', fakeAsync(() => {
      setFormValue("Bob", "T", "test@fdx.com", "abcdeF12");
      signUpServiceSpy.signUp.and.callFake(() => {
        return of([{ postId: 100 }]).pipe(delay(2000));
      });
      const el = fixture.debugElement.query(By.css('[data-testid="sign-up-form"]'));
      el.triggerEventHandler('ngSubmit', null);
      tick(1000);
      expect(component.isLoading).toEqual(true);
      tick(1000);
      expect(component.isLoading).toEqual(false);
    }));
    it('should show toast on service error', (() => {
      setFormValue("Bob", "T", "test@fdx.com", "abcdeF12");
      signUpServiceSpy.signUp.and.returnValue(throwError(() => new Error('API ERROR')));
      const el = fixture.debugElement.query(By.css('[data-testid="sign-up-form"]'));
      el.triggerEventHandler('ngSubmit', null);
      const toastEl = fixture.debugElement.query(By.css('[data-testid="toast-body-testId"]'));
      expect(toastEl).toBeDefined();
      expect(component.isServiceError).toBe(true);
    }));
  });
});
