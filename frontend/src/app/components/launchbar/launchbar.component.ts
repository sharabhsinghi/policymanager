import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-launchbar',
  templateUrl: './launchbar.component.html',
  styleUrls: ['./launchbar.component.css']
})
export class LaunchbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  PAGE: any = {};

  homePage = {title: "Dashboard", component: "dashboard"}
  myPoliciesPage = {title: "My Policies", component: "my-policies"}
  addPolicyPage = {title: "Add Policy", component: "add-policy"}

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.navHomePage();
  }

  navHomePage(){
    this.PAGE = this.homePage;
  }

  navMyPolicies(){
    this.PAGE = this.myPoliciesPage;
  }

  navAddPolicy(){
    this.PAGE = this.addPolicyPage;
  }

}
