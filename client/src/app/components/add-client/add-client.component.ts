import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddClientComponent>,
    private clientsService: ClientsService
  ) { }

  newClientForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('12345'),
    role: new FormControl('CLIENT'),
  });

  ngOnInit(): void {
  }

  saveClient() {
    this.clientsService.createClient(this.newClientForm.value).subscribe(result => {
      this.dialogRef.close({pet: result});
    })
  }

}
