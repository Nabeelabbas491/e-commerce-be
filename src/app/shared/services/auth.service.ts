import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.BACKEND_URL + "/api/user/register", user).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  login(user) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.BACKEND_URL + "/api/user/login", user).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  forgotPassword(data) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.BACKEND_URL + "/api/user/forgot", data).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  resetPassword(data) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.BACKEND_URL + "/api/user/reset-password", data).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  setUser(user) {
    localStorage.setItem("admin", JSON.stringify(user))
  }

  getUser() {
    let user = JSON.parse(localStorage.getItem("admin"))
    return user;
  }

}
