import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {House} from "../model/house";
import {environment} from "../../enviroments/environment";
import {Image} from "../model/Image";
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<House[]> {
    return this.httpClient.get<House[]>(API_URL + `/house/list`);
  }

  saveHouse(house: House, id: number): Observable<House> {
    return this.httpClient.post<House>(API_URL + `/house/create/${id}`, house);

    }
    findById(id: number): Observable<House> {
      return this.httpClient.get<House>(`${API_URL}/house/imageString/${id}`);
    }
    findImageByHouseId(id: number): Observable<Image[]>{
      return  this.httpClient.get<Image[]>(`${API_URL}/image/house/${id}`);
    }
    updateStatus(id: number, idStatus: number): Observable<House> {
      return this.httpClient.put<House>(`${API_URL}/house/updateStatus/${id}/${idStatus}`, id );
    }

}
