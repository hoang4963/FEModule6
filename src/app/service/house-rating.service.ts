import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comments} from "../model/comment";
import {environment} from "../../enviroments/environment";
import {Rating} from "../model/rating";
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class HouseRatingService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Rating[]> {
    return this.httpClient.get<Rating[]>(API_URL + `/rating/list`);
  }
}
