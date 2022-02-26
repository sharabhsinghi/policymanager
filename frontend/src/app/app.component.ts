import { Component } from '@angular/core';
import { AppdataService } from './services/appdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'policies';
  showNavbar: boolean = true;
  loggedIn: boolean = false;
  loginError = null;
  username = null;

  constructor(private appdataservice: AppdataService) { }

  login(event){
    this.loginError = null;
    this.username = event['username']
    this.appdataservice.login(event).subscribe(
      (response) => {
        localStorage.token = response["token"]
        localStorage.username = this.username;
        this.loggedIn = true;
      },
      (exception) => {
        this.loginError = "UnAuthorized !";
        console.log(exception)
      }
    );
  }
}
