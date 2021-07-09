import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobsService } from 'src/app/services/jobs.service';
import { AddJobComponent } from '../add-job/add-job.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private jobsService: JobsService
  ) { }

  jobs: any = [];

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs() {
    this.jobsService.getJobs().subscribe(result => {
      this.jobs = result;
    })
  }

  addJob() {
    const dialogRef = this.dialog.open(AddJobComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.jobs.push(result.job);
    })
  }

  editJob(job: any) {
  }

}
