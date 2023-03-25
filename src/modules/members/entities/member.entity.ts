import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  import { MemberStatus, MemberNotificationStatus } from 'src/common/enum';


@Entity()  
export class Member {

  // get the id from cognito registerd username
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 64, unique: true })
  wallet_address: string;

  @Column({ type: 'varchar', length: 64, nullable: true})
  username: string;

  @Column({ type: 'varchar', length: 128, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 32, nullable: true})
  phone_number: string;

  @Column({ type: 'varchar', length: 8, nullable: true})
  phone_confirm_code: string;

  @Column({ type: 'boolean', default: false})
  is_phone_confirmed: boolean;

  @Column({ type: 'varchar', length: 256, nullable: true})
  profile_image_url: string;

  @Column({ type: 'varchar', length: 256, nullable: true})
  bio: string;

  @Column({ type: 'boolean', default: false})
  is_admin: boolean;

  @Column({ type: 'json', nullable: true})
  social_medias: JSON;

  @Column({ type: 'boolean', default: false})
  is_muted: boolean;

  @Column({
    type: "enum",
    enum: MemberStatus,
    default: MemberStatus.CREATE,
  })
  status: MemberStatus;

  @Column({
    type: "enum",
    enum: MemberNotificationStatus,
    default: MemberNotificationStatus.EMAILON,
  })
  notification_status: MemberNotificationStatus;

  @CreateDateColumn({ type: 'timestamp' })
  sign_up_date: Date;

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
