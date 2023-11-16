import { 
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type:'timestamp',
        name:'created_at'
    })
    createdAt: Date;
}