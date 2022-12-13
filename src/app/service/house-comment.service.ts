import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../model/status";
import {environment} from "../../enviroments/environment";
import {Comments} from "../model/comment";
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class HouseCommentService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Comments[]> {
    return this.httpClient.get<Comments[]>(API_URL + `/comment/list`);
  }
}
