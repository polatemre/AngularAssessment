import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Assign } from '../models/assign';

@Injectable({
  providedIn: 'root'
})
export class AssignService {

  constructor(private httpClient: HttpClient) { }

  getAssignList(): Observable<Assign[]> {
    return this.httpClient.get<Assign[]>(environment.getApiUrl + "/assigns/getall");
  }

  getAssign(id: number): Observable<Assign> {
    return this.httpClient.get<Assign>(environment.getApiUrl + '/assigns/getbyid?id='+id)
  }

  addAssign(assign: Assign): Observable<any> {
    return this.httpClient.post(environment.getApiUrl + '/assigns/', assign, { responseType: 'text' });
  }

  updateAssign(assign: Assign): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/assigns/', assign, { responseType: 'text' });
  }

  deleteAssign(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/assigns/', { body: { Id: id } });
  }
}
