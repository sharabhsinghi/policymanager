import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppdataService } from 'src/app/services/appdata.service';

export interface DialogData {
  policy_number: string;
  company: string;
  premium_amount: number;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private appdataservice: AppdataService,
              public dialogRef: MatDialogRef<PaymentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  paymentDate: Date;
  paymentAmount: number;
  paymentNotes: Text;
  paymentAddError: boolean = false;
  modalReturn: boolean = true;

  ngOnInit(): void {
    this.paymentAmount = this.data.premium_amount;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getPaymentObject() {
    return {
      policy_number: this.data.policy_number,
      payment_amount: this.paymentAmount,
      notes: this.paymentNotes,
      payment_date: this.paymentDate
    }
  }

  savePayment() {
    let payment_params = this.getPaymentObject()
    this.paymentAddError = false;
    this.appdataservice.addPayment(payment_params).subscribe(
      (response: string) => {
        console.log(response)
        this.modalReturn = true;
        this.onNoClick();
      },
      (exception) => {
        this.paymentAddError = true;
        console.log(exception)
        this.modalReturn = false;
        this.onNoClick();
      }
    );
  }

}
