import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url = 'http://localhost:3000/services';

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getServices(): Observable<[]> {
    return this.http.get<[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.errorHandlerService.handleError));
  }

  createService(service: any) {
    return this.http.post(this.url, service)
      .pipe(
        retry(2),
        catchError(this.errorHandlerService.handleError));
  }

  deleteService(serviceID: string) {
    return this.http.delete(`${this.url}/${serviceID}`)
      .pipe(
        retry(2),
        catchError(this.errorHandlerService.handleError));
  }
}
