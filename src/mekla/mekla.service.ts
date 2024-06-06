import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Mekla } from "./mekla.entity";
import { Repository } from "typeorm";
import { CreateMeklaDto } from "./dtos/create-mekla.dtos";

@Injectable()
export class MeklaService{
    constructor(@InjectRepository(Mekla) private readonly meklaRepository: Repository<Mekla>) {}

    async create (dto: CreateMeklaDto){
        const mekla = this.meklaRepository.create(dto); 

        return await this.meklaRepository.save(mekla);
    }

    findMany(){
        return this.meklaRepository.find({});
    }

    findById(id: number){
        return this.meklaRepository.findOne({ where: {id} });
    }

    async update(id: number, dto: CreateMeklaDto) {
        const mekla = await this.meklaRepository.findOne({ where: {id} });

        Object.assign(mekla, dto);

        return this.meklaRepository.save(mekla);

    }

    async delete(id: number) {
        const mekla = await this.meklaRepository.findOne({ where: {id} });

        return this.meklaRepository.remove(mekla);

    }

}