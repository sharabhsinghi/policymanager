import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AppdataService } from 'src/app/services/appdata.service';
import { DialogData, PaymentComponent } from '../payment/payment.component';


export interface PolicyPaymentElement {
  notes: Text,
  policy_number: string,
  payment_amount: number,
  payment_date: Date,
}

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  constructor(private appdataservice: AppdataService,
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  @ViewChild(MatTable) table: MatTable<PolicyPaymentElement>;
  @ViewChild(MatSort) sort: MatSort;
  policyPaymentData: PolicyPaymentElement[] = [];
  dataSource = new MatTableDataSource(this.policyPaymentData);
  displayedColumns: string[] = ['payment_amount', 'payment_date', 'notes'];
  policyDataError: boolean = false;
  policyDataErrorMessage = "No Payment details found !"

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadPolicyPaymentData();
    this.dataSource.sort = this.sort;
  }

  loadPolicyPaymentData() {
    let params = {"policy_number": this.data.policy_number};
    this.appdataservice.getPolicyPayments(params).subscribe(
      (response: PolicyPaymentElement[]) => {
        this.policyPaymentData = response;
        if (this.policyPaymentData.length > 0) {
          this.dataSource = new MatTableDataSource(this.policyPaymentData);
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}
