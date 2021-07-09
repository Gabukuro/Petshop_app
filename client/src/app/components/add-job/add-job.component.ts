import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from 'src/app/services/clients.service';
import { JobsService } from 'src/app/services/jobs.service';
import { PetService } from 'src/app/services/pet.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddJobComponent>,
    private clientsService: ClientsService,
    private petService: PetService,
    private serviceService: ServiceService,
    private jobsService: JobsService
  ) { }

  clients: any = [];
  services: any = [];
  pets: any = [];
  
  newJobForm = new FormGroup({
    notes: new FormControl(''),
    scheduleTo: new FormControl(''),
    totalPrice: new FormControl(0),
    pet: new FormControl(''),
    user: new FormControl(''),
    services: new FormControl('')
  })

  ngOnInit(): void {
    this.getClients();
    this.getServices();
    this.getPets();
  }

  getClients() {
    this.clientsService.getClients().subscribe(result => {
      this.clients = result;
    })
  }

  getServices() {
    this.serviceService.getServices().subscribe((result) => {
      this.services = result;
    })
  }

  getPets() {
    this.petService.getPets().subscribe(result => {
      this.pets = result;
    })
  }

  saveJob() {
    let job = this.newJobForm.value;
    this.services.forEach((service: { id: any; price: string}) => {
      if(job.services.includes(service.id))
        job.totalPrice += service.price;
    });

    this.jobsService.createJob(this.newJobForm.value).subscribe(result => {
      this.dialogRef.close({job: result});
    })
  }

}
