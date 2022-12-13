import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {House} from "../model/house";
import {EmailDetails} from "../model/emailDetails";
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }
  sendMail(emailDetails: EmailDetails): Observable<EmailDetails> {
  return this.httpClient.post<EmailDetails>(API_URL + `/sendMail`, emailDetails );
}

}
