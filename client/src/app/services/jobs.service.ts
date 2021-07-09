import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  url = 'http://localhost:3000/jobs';

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getJobs(): Observable<[]> {
    return this.http.get<[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.errorHandlerService.handleError));
  }

  createJob(job: any) {
    return this.http.post(this.url, job)
      .pipe(
        retry(2),
        catchError(this.errorHandlerService.handleError));
  }

  updatePet(jobId: string, job: any) {
    return this.http.patch(`${this.url}/${jobId}` , job)
      .pipe(
        retry(2),
        catchError(this.errorHandlerService.handleError));
  }
}
