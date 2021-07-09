import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  url = 'http://localhost:3000/pets';

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getPets(): Observable<[]> {
    return this.http.get<[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.errorHandlerService.handleError));
  }

  createPet(pet: any) {
    return this.http.post(this.url, pet)
      .pipe(
        retry(2),
        catchError(this.errorHandlerService.handleError));
  }

  updatePet(petId: string, pet: any) {
    return this.http.patch(`${this.url}/${petId}` , pet)
      .pipe(
        retry(2),
        catchError(this.errorHandlerService.handleError));
  }
}
