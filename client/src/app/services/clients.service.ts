import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  url = 'http://localhost:3000/users/';

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getClients(): Observable<[]> {
    return this.http.get<[]>(this.url + `clients`)
      .pipe(
        retry(2),
        catchError(this.errorHandlerService.handleError));
  }

  createClient(client: any) {
    return this.http.post(this.url, client)
      .pipe(
        retry(2),
        catchError(this.errorHandlerService.handleError));
  }
}
