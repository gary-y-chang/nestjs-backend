import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  import { GroupStatus } from 'src/common/enum';

@Entity()  
export class Group {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 128, unique: true })
    name: string;

    @Column({
        type: "enum",
        enum: GroupStatus,
        default: GroupStatus.REQUEST,
    })
    status: GroupStatus;

    @Column({ type: 'varchar', length: 256, nullable: true })
    description?: string;

    @Column({ type: 'text', nullable: true })
    about_community?: string;

    @Column({ type: 'text', nullable: true })
    about_token?: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    header_image_url?: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    icon_image_url?: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    symbol_icon_url?: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    abbreviation?: string;

    @Column({ type: 'boolean'})
    is_top_request: boolean;

    @Column({ type: 'int', default: 1})
    staff_pick_priority: number;

    @Column({ type: 'float', default: 0, nullable: true})
    reward_by_referal: number

    @Column({ type: 'float', default: 0, nullable: true})
    reward_by_join: number

    @Column({ type: 'varchar', length: 256, nullable: true })
    token_url?: string;

    @Column({ type: 'boolean', default: false})
    is_launched: boolean;

    //FK to Language id
    //lang_id

    @Column({ type: 'varchar', length: 40, nullable: true })
    merge_to: string

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed User with id', this.id);
    }
}
