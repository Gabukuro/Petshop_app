import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ServiceService } from 'src/app/services/service.service';
import { AddServiceComponent } from '../add-service/add-service.component';
import { EditServiceComponent } from '../edit-service/edit-service.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private serviceService: ServiceService
  ) { }

  services: any = [];

  ngOnInit(): void {
    this.getServices()
  }

  getServices() {
    this.serviceService.getServices().subscribe((result) => {
      this.services = result;
    })
  }

  addService() {
    const dialogRef = this.dialog.open(AddServiceComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.services.push(result.service);
    })
  }

  editService(service: any) {
    const dialogRef = this.dialog.open(EditServiceComponent, {
      data: { currentService: service }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      if(result.hasOwnProperty('remove')) {
        this.services = this.services.filter((item: { id: any; }) => item.id != result.remove);
        return;
      }
      this.services.push(result.service);
    })
  }
}
