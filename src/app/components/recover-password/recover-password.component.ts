import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserRecovery} from "../../core/models/user-recovery";
import {AuthService} from "../../core/services/auth.service";
import {User} from "../../core/models/user.model";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  token: string;
  forgotPasswordForm: FormGroup;
  passwordRecoveryForm: FormGroup;
  isForgotForm = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams.hasOwnProperty("recovery_token"))
    {
      this.isForgotForm = false;
      this.token = this.activatedRoute.snapshot.queryParamMap.get('recovery_token');
    }

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.passwordRecoveryForm = this.formBuilder.group({
      plainPassword: [null, Validators.required],
      password: [null, Validators.required],
    }, {
      validators: [this.comparisonNewPasswordValidator()]
    });
  }

  public comparisonNewPasswordValidator(): ValidationErrors
  {
    return (group: FormGroup): ValidationErrors => {
      const plainpassword = group.controls['plainPassword'];
      const newPassword = group.controls['password'];

      if(!plainpassword && !newPassword)
      {
        return null;
      }

      plainpassword.setErrors(null);
      newPassword.setErrors(null);

      if (plainpassword.value !== newPassword.value) {
        plainpassword.setErrors({ custom: "password missmatch!" });
      } else {
        plainpassword.setErrors(null);
      }
      return null;
    };
  }

  submitForgotPassword()
  {
    let user = new User();
    user.email = this.forgotPasswordForm.get("email").value;

    this.authService.forgotPassword(user)
      .subscribe(() =>
      {
        this.router.navigate(["login"]);
      });
  }

  submitPasswordRecovery()
  {
    let user = new UserRecovery();
    user.password = this.passwordRecoveryForm.get("password").value;
    user.token = this.token;

    this.authService.recoverPassword(user)
      .subscribe(() =>
      {
        this.router.navigate(["login"]);
      });
  }
}
