import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppdataService } from 'src/app/services/appdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private appdataservice: AppdataService) { }

  loginError: any = false;
  isRegister: boolean = false;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  signupForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    password_copy: new FormControl(''),
    email: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

  signup(){
    this.loginError = false;
    this.appdataservice.signup(this.signupForm.value).subscribe(
      (response) => {
        console.log("Success !!")
      },
      (exception) => {
        this.loginError = "UnAuthorized !";
        console.log(exception)
      }
    );
    }

  flipCards(){
    this.isRegister = !this.isRegister;
  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

}
