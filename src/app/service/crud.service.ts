import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private baseUrl = "https://jsonplaceholder.typicode.com/posts"

  constructor(private http: HttpClient) { }

  postData(data:any){
    return this.http.post(this.baseUrl, JSON.stringify(data)).pipe(map(
    (response:any) =>{
      return response
    }
    ))
  }

  getData(){
    return this.http.get(this.baseUrl).pipe(map((response:any)=>{
      return response
    }))
  }

  updateData(data:any,id:number){
    return this.http.patch(`${this.baseUrl}/${id}`,data).pipe(map(
      (response:any) =>{
        return response;
      }
    ))
  }

  deleteData(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(map(
      (response:any)=>{
        return response;
      }
    ))
  }
}
