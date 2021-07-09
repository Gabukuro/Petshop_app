import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddServiceComponent>,
    private serviceService: ServiceService
  ) { }

  newServiceForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0),
  });

  ngOnInit(): void {
  }

  saveService() {
    this.serviceService.createService(this.newServiceForm.value).subscribe((result) => {
      this.dialogRef.close({service: result});
    });
  }
}
