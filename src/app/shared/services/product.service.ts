import { Injectable } from '@angular/core';
import { data } from '../data/smart-data-table';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) { }

  getCategories() {
    return new Promise((resolve, reject) => {
      this.apiService.get("/api/category/",).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  postCategory(data) {
    return new Promise((resolve, reject) => {
      this.apiService.post("/api/category/create", data).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  updateCategory(data) {
    return new Promise((resolve, reject) => {
      this.apiService.put(`/api/category/${data._id}`, data).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  deleteCategory(id) {
    return new Promise((resolve, reject) => {
      this.apiService.delete(`/api/category/${id}`).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  getShopTypes() {
    return new Promise((resolve, reject) => {
      this.apiService.get("/api/shopType/",).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  postShopType(data) {
    return new Promise((resolve, reject) => {
      this.apiService.post("/api/shopType/", data).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  updateShopType(data) {
    return new Promise((resolve, reject) => {
      this.apiService.put(`/api/shopType/${data._id}`, data).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  deleteShopType(id) {
    return new Promise((resolve, reject) => {
      this.apiService.delete(`/api/shopType/${id}`).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  getCloudinrayImage(file) {
    return new Promise((resolve, reject) => {
      this.apiService.post(`/api/product/image`, file).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  saveProduct(file) {
    return new Promise((resolve, reject) => {
      this.apiService.post(`/api/product`, file).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      this.apiService.get(`/api/product`).subscribe((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  }

}
