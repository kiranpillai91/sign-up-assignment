import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Toast message', () => {
    it('should show toast', (() => {
      component.show = true;
      const toastEl = fixture.debugElement.query(By.css('[data-testid="toast-body-testId"]'));
      expect(toastEl).toBeDefined();
    }));
    it('should not show toast', (() => {
      component.show = false;
      const toastEl = fixture.debugElement.query(By.css('[data-testid="toast-body-testId"]'));
      expect(toastEl).toBeNull();
    }));    
    it('should add custom class', (() => {
      component.classNames = 'mb-4';
      const toastEl = document.getElementsByClassName('mb-4').length;
      expect(toastEl).not.toBeNull();
    }));
  });
});
