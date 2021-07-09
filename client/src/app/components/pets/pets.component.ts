import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PetService } from 'src/app/services/pet.service';
import { AddPetComponent } from '../add-pet/add-pet.component';
import { EditPetComponent } from '../edit-pet/edit-pet.component';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private petService: PetService
  ) { }

  pet = {
    name: String,
    type: String,
    breed: String,
    gender: String,
    birthDate: Date,
    observations: String,
  }

  pets: any = [];

  ngOnInit(): void {
    this.getPets();
  }

  getPets() {
    this.petService.getPets().subscribe(result => {
      this.pets = result;
    })
  }

  addPet() {
    const dialogRef = this.dialog.open(AddPetComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.pets.push(result.pet);
    })
  }

  editPet(currentPet: any) {
    const dialogRef = this.dialog.open(EditPetComponent, {
      data: { currentPet: currentPet }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.pets = this.pets.map((pet: { id: string; }) => {
        if(pet.id == result.pet.id) {
          pet = result.pet;
        }
        return pet;        
      });
      console.log(this.pets)
    })
  }

}
