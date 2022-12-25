import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL: String;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.baseURL = environment.BACKEND_URL;
  }

  getOptions() {
    let token = this.auth.getUser().token
    const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return headers;
  }

  // { headers: this.getOptions() }

  get(subURL): Observable<any> {
    return this.http.get(this.baseURL + subURL, { headers: this.getOptions() });
  }

  put(subURL, body = {}): Observable<any> {
    return this.http.put(this.baseURL + subURL, { headers: this.getOptions() });
  }

  patch(subURL, body = {}): Observable<any> {
    return this.http.patch(this.baseURL + subURL, body, { headers: this.getOptions() });
  }

  post(subURL, body = {}): Observable<any> {
    return this.http.post(this.baseURL + subURL, body, { headers: this.getOptions() });
  }

  delete(subURL): Observable<any> {
    return this.http.delete(this.baseURL + subURL, { headers: this.getOptions() });
  }
}
