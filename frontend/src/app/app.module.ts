import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LaunchbarComponent } from './components/launchbar/launchbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSliderModule } from '@angular/material/slider'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MyPoliciesComponent } from './components/my-policies/my-policies.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddPolicyComponent } from './components/add-policy/add-policy.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';

import { InterceptorService } from './services/interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LaunchbarComponent,
    MyPoliciesComponent,
    AddPolicyComponent,
    DashboardComponent,
    LoginComponent,
    PaymentComponent,
    PaymentDetailsComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatSliderModule,
    MatSidenavModule, MatIconModule, LayoutModule, MatToolbarModule,
    MatButtonModule, MatListModule, MatTableModule, HttpClientModule,
    MatSortModule, MatGridListModule, MatCardModule, MatMenuModule,
    MatFormFieldModule, MatCheckboxModule, MatSelectModule, MatRadioModule,
    FormsModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
