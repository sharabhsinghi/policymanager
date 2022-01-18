import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyPoliciesComponent } from './components/my-policies/my-policies.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mypolicies', component: MyPoliciesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
