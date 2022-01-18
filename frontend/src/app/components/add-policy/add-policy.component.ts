import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { AppdataService } from 'src/app/services/appdata.service';




@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.css']
})

export class AddPolicyComponent implements OnInit {

  options: FormGroup;
  floatLabelControl = new FormControl('auto');
  company_control: FormControl;
  policy_number_control: FormControl;
  policy_holder_control: FormControl;
  insured_control: FormControl;
  premium_amount_control: FormControl;
  start_date_control: FormControl;
  premium_end_date_control: FormControl;
  date_of_maturity_control: FormControl;
  maturity_amount_control: FormControl;
  covered_amount_control: FormControl;
  policyBrands = ['HDFC Life', 'ICICI Prudential', 'Birla Sunlife', 'LIC', 'Aegon Religare']

  policyAddError: boolean = false;

  constructor(fb: FormBuilder, private appdataservice: AppdataService) {
    this.options = fb.group({
      floatLabel: this.floatLabelControl,
      company: this.company_control,
      policy_number: this.policy_number_control,
      policy_holder: this.policy_holder_control,
      insured: this.insured_control,
      premium_amount: this.premium_amount_control,
      start_date: this.start_date_control,
      premium_end_date: this.premium_end_date_control,
      date_of_maturity: this.date_of_maturity_control,
      maturity_amount: this.maturity_amount_control,
      covered_amount: this.covered_amount_control,
    });
  }


  ngOnInit(): void {
    this.resetForm()
  }

  getPolicyObject(){
    let policy = {
      company: this.company_control.value,
      policy_number: this.policy_number_control.value,
      policy_holder: this.policy_holder_control.value,
      insured: this.insured_control.value,
      premium_amount: this.premium_amount_control.value,
      start_date: this.start_date_control.value,
      premium_end_date: this.premium_end_date_control.value,
      date_of_maturity: this.date_of_maturity_control.value,
      maturity_amount: this.maturity_amount_control.value,
      covered_amount: this.covered_amount_control.value,
    }
    return policy
  }

  resetForm() {
    this.company_control = new FormControl('')
    this.policy_number_control = new FormControl('')
    this.policy_holder_control = new FormControl('')
    this.insured_control = new FormControl('')
    this.premium_amount_control = new FormControl('')
    this.start_date_control = new FormControl('')
    this.premium_end_date_control = new FormControl('')
    this.date_of_maturity_control = new FormControl('')
    this.maturity_amount_control = new FormControl('')
    this.covered_amount_control = new FormControl('')
  }

  submitForm() {
    let policy_params = this.getPolicyObject()

    this.appdataservice.addPolicy(policy_params).subscribe(
      (response: string) => {
        console.log(response)
      },
      (exception) => {
        this.policyAddError = true;
        console.log(exception)
      }
    );
  }

}
