import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from 'src/app/services/clients.service';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddPetComponent>,
    private petService: PetService,
    private clientsService: ClientsService 
  ) { }

  clients: any = [];

  newPetForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    breed: new FormControl(''),
    gender: new FormControl(''),
    birthDate: new FormControl(''),
    observations: new FormControl(''),
    user: new FormControl('')
  })

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clientsService.getClients().subscribe(result => {
      this.clients = result;
    })
  }

  savePet() {
    this.petService.createPet(this.newPetForm.value).subscribe(result => {
      this.dialogRef.close({pet: result});
    })
  }
}
