import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../model/order";
import {environment} from "../../enviroments/environment";

const API_URL = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(API_URL + `/orders`);
  }

  createOrder(order: Order, id: number): Observable<Order> {
    return this.httpClient.post<Order>(API_URL + `/orders/${id}`, order);
  }

  showOrderByHouseId(id: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(API_URL + `/orders/house/${id}`);
  }


}
