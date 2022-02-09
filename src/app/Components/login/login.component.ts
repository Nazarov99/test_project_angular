import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../Services/notification.service";
import {InternalApiService} from "../../Services/internal-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isSubmitted = false;
  public loader: boolean;
  public errorLogin = false;

  constructor(private formBuilder: FormBuilder,
              private notification: NotificationService,
              private internalApi: InternalApiService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.checkLogin();
  }

  checkLogin() {
    const token = localStorage.getItem('token');

    if (token) {
      this.internalApi.checkLogin()
        .subscribe((res) => {
          this.router.navigate(['/shelf']);
        })
    }
  }

  login() {
    this.isSubmitted = true;

    if(this.form.invalid) {
      return this.notification.error('Введен неверный логин или пароль');
    }

    this.loader = true;

    const formData = this.form.getRawValue();
    const data = {
      username: formData.email,
      password: formData.password,
      client_id: 2,
      grant_type: 'password',
      client_secret: 'g7LPp2zogusLtbpHtWfwSjCdRWCmvrZaUxgt2cSI',
      scope: '*'
    };

    this.internalApi.login(data)
      .subscribe((result: any) => {
        localStorage.setItem('token', result.access_token);
        this.internalApi.checkLogin()
          .subscribe((res) => {
            this.loader = false;
            this.router.navigate(['/home']);
          })
      }, error => {
        this.loader = false;
        this.notification.error('Неправильный логин или пароль!');
        this.errorLogin = true;
      })
  }



}
