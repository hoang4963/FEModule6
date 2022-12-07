import {Injectable} from '@angular/core';
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/users');
  }

  findById(id: number) {
    return this.http.get<User>(`${API_URL}/users/${id}`);
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(API_URL + `/users`, user);
  }

  delete(id: number | undefined): Observable<User> {
    return this.http.delete<User>(`${API_URL}/users/${id}`);
  }

  editUser(id: number, temp: User) {
    return this.http.put<User>(`${API_URL}/users/${id}`, temp);
  }
}
