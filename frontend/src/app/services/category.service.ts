import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3001/categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<string[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(item => item.name))
    );
  }
}
