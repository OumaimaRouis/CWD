import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StrictMatchKeysAndValues } from "typeorm";
import { Mekla } from "./mekla.entity";
import { MeklaController } from "./mekla.controller";
import { MeklaService } from "./mekla.service";

@Module({
    imports: [TypeOrmModule.forFeature([Mekla])],
    controllers: [MeklaController],
    providers: [MeklaService],
})
export class MeklaModule{
    


}