import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [null, Validators.required],
      email: [null, Validators.required, Validators.email],
      password: [null, Validators.required],
      plainPassword: [null, Validators.required],
    }, {
      validators: [this.comparisonNewPasswordValidator()]
    });
  }

  public comparisonNewPasswordValidator(): ValidationErrors
  {
    return (group: FormGroup): ValidationErrors => {
      const plainpassword = group.controls['plainPassword'];
      const newPassword = group.controls['password'];

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

  submit()
  {
    let user = new User();
    user.email = this.userForm.get("email").value;
    user.username = this.userForm.get("username").value;
    user.password = this.userForm.get("password").value;
    user.plainPassword = this.userForm.get("plainPassword").value;

    this.userService.insert(user)
      .subscribe(() => this.router.navigate(["users"]));
  }
}
