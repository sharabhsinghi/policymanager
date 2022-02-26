import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AppdataService } from 'src/app/services/appdata.service';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import { AddPolicyComponent } from '../add-policy/add-policy.component';
import { PaymentDetailsComponent } from '../payment-details/payment-details.component';


export interface PolicyElement {
  company: string,
  policy_number: string,
  policy_holder: string,
  insured: string,
  premium_amount: number,
  start_date: Date,
  premium_end_date: Date,
  date_of_maturity: Date,
  maturity_amount: number,
  covered_amount: number
}

@Component({
  selector: 'app-my-policies',
  templateUrl: './my-policies.component.html',
  styleUrls: ['./my-policies.component.css']
})
export class MyPoliciesComponent implements AfterViewInit {

  constructor(private appdataservice: AppdataService, public dialog: MatDialog) { }

  @ViewChild(MatTable) table: MatTable<PolicyElement>;
  @ViewChild(MatSort) sort: MatSort;
  policiesData: PolicyElement[] = [];
  dataSource = new MatTableDataSource(this.policiesData);
  displayedColumns: string[] = ['company', 'policy_number', 'policy_holder', 'premium_amount', 'premium_end_date',
  'insured', 'start_date', 'date_of_maturity', 'maturity_amount', 'covered_amount', 'actions'];
  policyDataError: boolean = false;
  policyDataErrorMessage = "No Policies !"

  ngAfterViewInit(): void {
    this.loadMyPoliciesData();
    this.dataSource.sort = this.sort;
  }

  loadMyPoliciesData() {
    let params = {};
    this.appdataservice.getMyPolicies(params).subscribe(
      (response: PolicyElement[]) => {
        this.policiesData = response;
        if (this.policiesData.length >0) {
          this.dataSource = new MatTableDataSource(this.policiesData);
          this.table.renderRows();
        } else {
          this.policyDataError = true;
        }
      },
      (exception) => {
        this.policyDataError = true;
        console.log(exception)
      }
    );

  }

  openPaymentDialog(policy): void {
    const dialogRef = this.dialog.open(PaymentComponent, {
      // width: '250px',
      data: {policy_number: policy.policy_number,
             company: policy.company,
             premium_amount: policy.premium_amount},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let paymentDate = result;
      this.addedPayment(policy, paymentDate)
    });
  }

  addedPayment(policy, paymentDate) {
    console.log("Added date: " + paymentDate + " for policy " + policy.policy_number)
  }

  addPolicyPopup(): void {
    const dialogRef = this.dialog.open(AddPolicyComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let isAdded = result;
    });
  }

  paymentDetailsPopup(policy): void{
    const dialogRef = this.dialog.open(PaymentDetailsComponent, {
      data: {policy_number: policy.policy_number,
             company: policy.company},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let isAdded = result;
    });
  }

}
