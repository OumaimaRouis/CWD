import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'mekla'})
export class Mekla {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({nullable:true})
    fileUrl: string;



}