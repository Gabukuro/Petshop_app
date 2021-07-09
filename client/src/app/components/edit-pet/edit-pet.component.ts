import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientsService } from 'src/app/services/clients.service';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.scss']
})
export class EditPetComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditPetComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private clientsService: ClientsService,
    private petService: PetService
  ) { }

  currentPet = this.data.currentPet;
  clients: any = [];

  editPetForm = new FormGroup({
    name: new FormControl(this.currentPet.name),
    type: new FormControl(this.currentPet.type),
    breed: new FormControl(this.currentPet.breed),
    gender: new FormControl(this.currentPet.gender),
    birthDate: new FormControl(this.currentPet.birthDate),
    observations: new FormControl(this.currentPet.observations),
    user: new FormControl(this.currentPet.user)
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
    this.petService.updatePet(this.currentPet.id ,this.editPetForm.value).subscribe(result => {
      this.dialogRef.close({pet: result});
    })
  }
}
