import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  getStudentList(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(environment.getApiUrl + "/students/getall");
  }

  getStudent(id: number): Observable<Student> {
    return this.httpClient.get<Student>(environment.getApiUrl + '/students/getbyid?id='+id)
  }

  addStudent(student: Student): Observable<any> {
    return this.httpClient.post(environment.getApiUrl + '/students/', student, { responseType: 'text' });
  }

  updateStudent(student: Student): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/students/', student, { responseType: 'text' });
  }

  deleteStudent(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/students/', { body: { Id: id } });
  }
}
