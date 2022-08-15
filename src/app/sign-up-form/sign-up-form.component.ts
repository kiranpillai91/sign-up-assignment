import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CustomValidatorService } from '../../validators/custom-validator-service';
import { SignUpService } from '../../services/sign-up.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {

  isLoading = false;
  isServiceError = false;

  signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$"),
    this.customValidatorService.emailDomainValidator()]),
    password: new FormControl('', [Validators.required, this.customValidatorService.passwordPatternValidator()])
  },
    {
      validators: [this.customValidatorService.passwordContains()]
    });

  constructor(private signUpService: SignUpService, private customValidatorService: CustomValidatorService) { }

  onSignUp = () => {
    this.isLoading = true;
    this.signUpService.signUp(this.signUpForm.value)
      .subscribe(() => {
        this.isLoading = false;
      }, () => {
        this.isServiceError = true;
        this.isLoading = false;
      });
  }

  closeToast = () => {
    this.isServiceError = false;
  }

}
