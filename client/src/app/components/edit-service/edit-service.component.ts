import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {

  constructor(
    private serviceService: ServiceService,
    private dialogRef: MatDialogRef<EditServiceComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  currentService = this.data.currentService;
  clients: any = [];

  editServiceForm = new FormGroup({
    title: new FormControl(this.currentService.title),
    description: new FormControl(this.currentService.description),
    price: new FormControl(this.currentService.price),
  });

  ngOnInit(): void {
  }

  saveService() {
    this.serviceService.createService(this.editServiceForm.value).subscribe((result) => {
      this.dialogRef.close({service: result});
    });
  }

  removeService() {
    this.serviceService.deleteService(this.currentService.id).subscribe(() => {
      this.dialogRef.close({remove: this.currentService.id});
    });
  }

}
