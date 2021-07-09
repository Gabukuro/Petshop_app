import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { Service } from "./entities/service.entity";

@EntityRepository(Service)
export class ServicesRepository extends Repository<Service> {
    async createService(
        createServiceDto: CreateServiceDto,
    ): Promise<Service> {
        const {title, description, price} = createServiceDto;

        const service = this.create();
        service.title = title;
        service.description = description;
        service.price = price;
        try {
            await service.save();
            return service;
        } catch (error) {
            throw new InternalServerErrorException('Error trying to create service');
        }
    }

    async updateService(
        id: string,
        updateServiceDto: UpdateServiceDto
    ): Promise<Service> {
        const {title, description, price} = updateServiceDto;

        const service = await this.findOneOrFail(id);
        service.title = title ?? service.title;
        service.description = description ?? service.description;
        service.price = price ?? service.price;
        try {
            await service.save();
            return service;
        } catch (error) {
            throw new InternalServerErrorException('Error trying to update service');
        }
    }
}