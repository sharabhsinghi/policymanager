import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AppdataService } from 'src/app/services/appdata.service';
import {MatSort} from '@angular/material/sort';


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

  constructor(private appdataservice: AppdataService) { }

  @ViewChild(MatTable) table: MatTable<PolicyElement>;
  @ViewChild(MatSort) sort: MatSort;
  policiesData: PolicyElement[] = [];
  dataSource = new MatTableDataSource(this.policiesData);
  displayedColumns: string[] = ['company', 'policy_number', 'policy_holder', 'premium_amount', 'premium_end_date'];
  policyDataError: boolean = false;
  policyDataErrorMessage = "Could not load Policies Data !"

  ngAfterViewInit(): void {
    // this.loadDummyData();
    this.loadMyPoliciesData();
    this.dataSource.sort = this.sort;
  }

  loadDummyData() {
    this.policiesData = [
      {
        company: 'Aegon', policy_number: '123', policy_holder: 'aa', insured: '',
        start_date: new Date(), premium_end_date: new Date(), date_of_maturity: new Date,
        maturity_amount: 300, covered_amount: 0, premium_amount: 100
      },
      {
        company: 'LIC', policy_number: '456', policy_holder: 'bb', insured: 'hh',
        start_date: new Date(), premium_end_date: new Date(), date_of_maturity: new Date,
        maturity_amount: 400, covered_amount: 0, premium_amount: 200
      },
      {
        company: 'Birla', policy_number: '789', policy_holder: 'cc', insured: '',
        start_date: new Date(), premium_end_date: new Date(), date_of_maturity: new Date,
        maturity_amount: 500, covered_amount: 0, premium_amount: 300
      },
      {
        company: 'HDFC', policy_number: '135', policy_holder: 'dd', insured: 'ii',
        start_date: new Date(), premium_end_date: new Date(), date_of_maturity: new Date,
        maturity_amount: 600, covered_amount: 0, premium_amount: 400
      },
      {
        company: 'ICICI', policy_number: '246', policy_holder: 'ee', insured: '',
        start_date: new Date(), premium_end_date: new Date(), date_of_maturity: new Date,
        maturity_amount: 700, covered_amount: 0, premium_amount: 500
      },
      {
        company: 'LIC', policy_number: '357', policy_holder: 'ff', insured: 'jj',
        start_date: new Date(), premium_end_date: new Date(), date_of_maturity: new Date,
        maturity_amount: 800, covered_amount: 0, premium_amount: 600
      },
      {
        company: 'HDFC', policy_number: '680', policy_holder: 'gg', insured: '',
        start_date: new Date(), premium_end_date: new Date(), date_of_maturity: new Date,
        maturity_amount: 900, covered_amount: 0, premium_amount: 700
      },
    ];
    this.dataSource = new MatTableDataSource(this.policiesData);
    this.table.renderRows();

  }

  loadMyPoliciesData() {
    let params = {};
    this.appdataservice.getMyPolicies(params).subscribe(
      (response: PolicyElement[]) => {
        this.policiesData = response;
        this.dataSource = new MatTableDataSource(this.policiesData);
        this.table.renderRows();
      },
      (exception) => {
        this.policyDataError = true;
        console.log(exception)
      }
    );

  }

}
