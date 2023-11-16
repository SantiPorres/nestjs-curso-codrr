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

    @Column({
        type:'timestamp',
        name:'updated_at'
    })
    updatedAt: Date;
}