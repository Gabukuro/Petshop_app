import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { Job } from "./entities/job.entity";

@EntityRepository(Job)
export class JobsRepository extends Repository<Job> {
      
    async createJob(
        createJobDto: CreateJobDto
    ): Promise<Job> {
        const { notes, totalPrice, pet, user, scheduleTo, services } = createJobDto;

        let job = this.create();
        job.notes = notes;
        job.totalPrice = totalPrice;
        job.pet = pet;
        job.user = user;
        job.scheduleTo = scheduleTo;
        job.services = services;
        try {
            await job.save();
            return job;
        } catch(error) {
            throw new InternalServerErrorException("Error trying to create a job");
        }
    }

    async updateJob(
        id: string,
        updateJobDto: UpdateJobDto
    ): Promise<Job> {
        const { notes, totalPrice, pet, user, scheduleTo, services } = updateJobDto;

        let job = await this.findOne(id);
        job.notes = notes;
        job.totalPrice = totalPrice;
        job.pet = pet;
        job.user = user;
        job.scheduleTo = scheduleTo;
        job.services = services;
        try {
            await job.save();
            return job;
        } catch(error) {
            throw new InternalServerErrorException("Error trying to create a job");
        }
    }
}