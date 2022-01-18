import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppdataService {

  constructor(private http: HttpClient) { }

  login(params={}) {
    return this.http.post("http://127.0.0.1:5000/login", params);
  }

  getMyPolicies(params={}) {
    return this.http.get("http://127.0.0.1:5000/policy", {params: params});
  }

  addPolicy(data={}) {
    return this.http.post("http://127.0.0.1:5000/policy", data);
  }
}
