import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientsService } from 'src/app/services/clients.service';
import { AddClientComponent } from '../add-client/add-client.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(
    private clientsService: ClientsService,
    private dialog: MatDialog
  ) { }

  clients: any = [];

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clientsService.getClients().subscribe(result => {
      this.clients = result;
    })
  }

  addClient() {
    const dialogRef = this.dialog.open(AddClientComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.clients = this.clients.map((pet: { name: any; }) => {
        if(pet.name == result.pet.name) {
          pet = result.pet;
        }
        return pet;        
      });
      console.log(this.clients)
    })
  }
}
