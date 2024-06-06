import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { MeklaService } from "./mekla.service";
import { CreateMeklaDto } from "./dtos/create-mekla.dtos";

@Controller("mekla")
export class MeklaController {
    constructor(private readonly meklaService: MeklaService) {}

    @Post()
    create(@Body() dto: CreateMeklaDto) {
        return this.meklaService.create(dto);
    }

    @Get()
    findMany() {
        return this.meklaService.findMany();
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.meklaService.findById(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: CreateMeklaDto) {
        return this.meklaService.update(id,dto);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.meklaService.delete(id);
    }


    }
