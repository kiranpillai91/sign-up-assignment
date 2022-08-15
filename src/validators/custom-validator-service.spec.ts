import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomValidatorService } from './custom-validator-service';

describe('CustomValidatorServiceService', () => {
  let service: CustomValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Password minimum of eight characters & contain lower and uppercase letters', () => {
    it('should have "invalidPassword" error if passwords less than eight characters', () => {
      const control = new FormControl('', [service.passwordPatternValidator()]);
      control.setValue('abcde1');
      expect(control?.hasError('invalidPassword')).toBe(true);
    });
    it('should have "invalidPassword" error if passwords does not contain lower and uppercase letters', () => {
      const control = new FormControl('', [service.passwordPatternValidator()]);
      control.setValue('abcdefa1');
      expect(control?.hasError('invalidPassword')).toBe(true);
    });
    it('should be valid if passwords has minimum of eight characters & contain lower and uppercase letters', () => {
      const control = new FormControl('', [service.passwordPatternValidator()]);
      control.setValue('abcdefAa1');
      expect(control?.hasError('invalidPassword')).toBe(false);
    });
  });

  describe('emailDomainValidator', () => {
    it('should have "invalidEmailDomain" error if email domain is present in domain restriction list', () => {
      const control = new FormControl('', [service.emailDomainValidator()]);
      control.setValue('thomas@test.com');
      expect(control?.hasError('invalidEmailDomain')).toBe(true);
    });
    it('should be valid if email input value  does not contain domain from restriction list', () => {
      const control = new FormControl('', [service.emailDomainValidator()]);
      control.setValue('thomas@shelby.co.uk');
      expect(control?.hasError('invalidEmailDomain')).toBe(false);
    });
  });

  describe('passwordContains', () => {
    let frmGrp: FormGroup;
    beforeEach(() => {
      frmGrp = new FormGroup({
        firstName: new FormControl('Thomas'),
        lastName: new FormControl('Shelby'),
        password: new FormControl(''),
      }, service.passwordContains());
    });
    it('should have "passwordContains" error when first name is part of password', () => {
      frmGrp.patchValue({ password: 'abcdefThoMas' });
      expect(frmGrp?.errors?.['passwordContains']).toBe(true);
    });

    it('should have "passwordContains" error when last name is part of password', () => {
      frmGrp.patchValue({ password: 'abcdefSHELBY' });
      expect(frmGrp?.errors?.['passwordContains']).toBe(true);
    });
    it('should be valid when first name, last name both are not part of password', () => {
      frmGrp.patchValue({ password: 'abcdefA1' });
      expect(frmGrp?.errors?.['passwordContains']).toBe(undefined);
    });
  });

});
