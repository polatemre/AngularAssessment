import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  getBookList(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(environment.getApiUrl + "/books/getall");
  }

  getBook(id: number): Observable<Book> {
    return this.httpClient.get<Book>(environment.getApiUrl + '/books/getbyid?id='+id)
  }

  addBook(book: Book): Observable<any> {
    return this.httpClient.post(environment.getApiUrl + '/books/', book, { responseType: 'text' });
  }

  updateBook(book: Book): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/books/', book, { responseType: 'text' });
  }

  deleteBook(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/books/', { body: { Id: id } });
  }
}
