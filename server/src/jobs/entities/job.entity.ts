import { Pet } from "src/pets/entities/pet.entity";
import { Service } from "src/services/entities/service.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Job extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    notes: string;

    @Column("double")
    totalPrice: number;

    @Column()
    scheduleTo: Date;

    @ManyToOne(type => User, user => user.jobs) user: User
    @ManyToOne(type => Pet, pet => pet.jobs) pet: Pet
    @ManyToMany(() => Service)
    @JoinTable()
    services: Service[]
}
