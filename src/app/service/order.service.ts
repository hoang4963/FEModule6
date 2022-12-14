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


  showOrderById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${API_URL}/orders/${id}`);
  }
  showOrderByHouseId(id: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(API_URL + `/orders/house/${id}`);
  }
  getOrderPast(id: number, start: number): Observable<Order[]>{
    return this.httpClient.get<Order[]>( `${API_URL}/ordersPast/${id}/${start}`);
  }
  getOrderByUserId(id: number): Observable<Order[]>{
    return this.httpClient.get<Order[]>( `${API_URL}/ordersByUser/${id}`);
  }


  // showOrderById(id: number): Observable<Order> {
  //   return this.httpClient.get<Order>(${API_URL}+`/orders/${id}`);
  // }
  getBookingByUserID(id: number): Observable<Order>{
    return this.httpClient.get<Order>(API_URL+`/user/house/orders/${id}`)
  }
  changeOderStatus(id: number, statusId: number) :Observable<Order>{
    return this.httpClient.put<Order>(API_URL+`/orders/changeStatus/${id}/${statusId}`, id )
  }
}
