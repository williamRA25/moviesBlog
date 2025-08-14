import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3001/posts';

  constructor(private http: HttpClient) {}

  // Trae todos los posts y los adapta al modelo del frontend
  getAll(): Observable<Post[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data) =>
        data.map((item) => ({
          id: item._id,
          title: item.title,
          content: item.content,
          image:
            item.image || 'https://via.placeholder.com/300x420?text=No+Image',
          category: item.category?.name || 'Sin categoría',
          summary:
            item.content?.length > 100
              ? item.content.slice(0, 100) + '...'
              : item.content,
        }))
      )
    );
  }

  // Trae un post por id y lo adapta al modelo del frontend
  getById(id: string): Observable<Post> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((item) => ({
        id: item._id,
        title: item.title,
        content: item.content,
        image:
          item.image || 'https://via.placeholder.com/300x420?text=No+Image',
        category: item.category?.name || 'Sin categoría',
        summary:
          item.content?.length > 100
            ? item.content.slice(0, 100) + '...'
            : item.content,
      }))
    );
  }

  // Filtro por categoría (cliente)
  getByCategory(category: string | 'all'): Observable<Post[]> {
    return this.getAll().pipe(
      map((posts) => {
        if (category === 'all') return posts;
        return posts.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );
      })
    );
  }
}
