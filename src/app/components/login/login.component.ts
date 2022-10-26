import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {User} from "../../core/models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  hasError: boolean;
  error: string;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    if (this.activatedRoute.snapshot.queryParams.hasOwnProperty("token"))
    {
      let user = new User();
      user.token = this.activatedRoute.snapshot.queryParamMap.get('token');
      this.authService.validateEmail(user)
        .subscribe(() =>
        {});
    }
  }

  goToRecovery()
  {
    this.router.navigate(["recovery"]);
  }

  public submit()
  {
    if(this.userForm.valid)
    {
      let user = {
        username: this.userForm.get('username').value,
        password: this.userForm.get('password').value,
      }

      this.authService.login(user)
        .subscribe((logged) =>
        {
          console.log(logged ? "logged in!" : "invalid credentials");
          if(logged)
          {
            this.router.navigate(['users']);
          }
        })
    }
  }
}
