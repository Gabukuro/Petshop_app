import { Job } from "src/jobs/entities/job.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pet extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    breed: string;

    @Column()
    gender: string;

    @Column()
    birthDate: Date;

    @Column("text")
    observations: string;

    @ManyToOne(type => User, user => user.pets) user: User;
    @OneToMany(type => Job, job => job.pet) jobs: Job[];
}
