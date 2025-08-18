import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  getCommentsByPost(postId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/post/${postId}`);
  }

  addComment(postId: string, content: string): Observable<any> {
    return this.http.post(this.apiUrl, { postId, content });
  }
}
